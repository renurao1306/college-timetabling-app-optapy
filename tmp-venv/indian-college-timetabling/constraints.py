from optapy import constraint_provider
from optapy.score import HardSoftScore
from optapy.constraint import ConstraintFactory, Joiners, ConstraintCollectors
from domain import Course, Room
from datetime import datetime, date, time, timedelta

# Trick since timedelta only works with datetime instances
today = date.today()


def within_60_minutes(course1: Course, course2: Course):
    between = datetime.combine(today, course1.timeslot.end_time) - datetime.combine(today, course2.timeslot.start_time)
    return timedelta(minutes=0) <= between <= timedelta(minutes=60)

   
def get_score_type(type):
    return HardSoftScore.ONE_HARD if type == "hard" else HardSoftScore.ONE_SOFT

def curry_define_constraints_with_input(constraints_data):

    # Type annotation not needed, but allows you to get autocompletion
    @constraint_provider
    def define_constraints(constraint_factory: ConstraintFactory):

        print("### In define_constraints, input data is", constraints_data)

        # Add the constraints to the return array by calling the "conflict" functions
        # dynamically

        constraints_array = []
        for cons in constraints_data:
            print(cons["name"], cons["enabled"], cons["type"], cons["weight"], cons["params"])
            
            # If enabled, then call the "conflict function", and add the return value to the
            # constraints_array
            if int(cons["enabled"]) == 1:
                conf_name = cons["name"]
                constraints_array.append(globals()[conf_name](constraint_factory, cons["type"], cons["weight"], cons["params"]))
                                 
        print("### Len of constraints array", len(constraints_array))

        return constraints_array

        # return [
        #     # Hard constraints
        #     room_conflict(constraint_factory),
        #     teacher_conflict(constraint_factory),
        #     student_group_conflict(constraint_factory),
        #     lab_in_classroom_conflict(constraint_factory),
        #     lab_slots_not_back_to_back_conflict(constraint_factory),
        #     # Soft constraints
        #     teacher_room_stability(constraint_factory),
        #     teacher_time_efficiency(constraint_factory),
        #     student_group_subject_variety(constraint_factory)
        # ]
    
    return define_constraints

@constraint_provider
def temp_define_constraints(constraint_factory: ConstraintFactory):

    print("### In define_constraints, input data is")

    # Add the constraints to the return array by calling the "conflict" functions
    # dynamically

    constraints_array = []
    constraints_array.append(globals()["lab_slots_not_back_to_back_conflict"](constraint_factory, "hard", 100, None))
                                
    print("### Len of constraints array", len(constraints_array))

    return constraints_array


# The below constraint provider is only used for testing constraints as of now
# We will remove this once we refactor by curring the conflict function
# (this is different from currying the constraint provider as above function)
@constraint_provider
def simple_define_constraints(constraint_factory: ConstraintFactory):
    return [
        # Hard constraints
        old_fixed_slot_conflict(constraint_factory),
        fixed_slot_conflict(constraint_factory),
        fixed_room_conflict(constraint_factory),
        room_conflict(constraint_factory),
        not_more_than_n_hours_coursework_per_day_conflict(constraint_factory),
        not_more_than_n_hours_in_college_per_day_conflict(constraint_factory),
        teacher_conflict(constraint_factory),
        student_group_conflict(constraint_factory),
        room_type_conflict(constraint_factory),
        lab_slots_not_back_to_back_conflict(constraint_factory),
        # Soft constraints
        teacher_room_stability(constraint_factory),
        teacher_time_efficiency(constraint_factory),
        student_group_subject_variety(constraint_factory)
    ]


# def print_join_result_temp(course1: Course, course2: Course):
#     print("#### In Join Result", course1, course2)
#     return True

# Below conflict does not work as expected
# Still, leaving it just for reference
def old_fixed_slot_conflict(constraint_factory: ConstraintFactory, type="hard", weight=1, params=None):


    print("In old_fixed_slot_conflict", type, weight, params)

    # A fixed slot course cannot be overridden by a non-fixed course
    return constraint_factory \
        .for_each(Course) \
        .join(Course,
              # ... in the same timeslot ...
              Joiners.equal(lambda course: course.timeslot),
              ) \
        .filter(lambda c1, c2: c1.fixed != c2.fixed) \
        .penalize("Old fixed slot onflict", get_score_type(type), lambda c1, c2: weight)

# def test_filter_for_fixed_slot_conflict(c1: Course):
#     print("\t### In test_filter_for_fixed_slot_confict", c1)
#     ret = (c1.fixed == 1) and (c1.fixed_timeslot != None) and \
#                 (c1.timeslot.start_time != c1.fixed_timeslot.start_time) and \
#                 (c1.timeslot.end_time != c1.fixed_timeslot.end_time)
#     print("\t### Returning", ret)
#     return ret


def fixed_slot_conflict(constraint_factory: ConstraintFactory, type="hard", weight=1000, params=None):

    print("In fixed_slot_conflict", type, weight, params)

    # A fixed slot course cannot be overridden by a non-fixed course
    return constraint_factory \
        .for_each(Course) \
        .filter(lambda c1: (c1.fixed == 1) and (c1.fixed_timeslot != None) and \
            (c1.timeslot.start_time != c1.fixed_timeslot.start_time) and \
            (c1.timeslot.end_time != c1.fixed_timeslot.end_time)) \
        .penalize("Fixed slot onflict", get_score_type(type), lambda c1: weight)
  
        
# def test_filter_for_fixed_room_conflict(c1: Course):
#     print("\t### In test_filter_for_fixed_room_confict", c1)
#     ret = (c1.fixed == 1) and (c1.fixed_room != None) and (c1.room.id != c1.fixed_room.id)
#     print("\t### Returning", ret)
#     return ret

def fixed_room_conflict(constraint_factory: ConstraintFactory, type="hard", weight=1000, params=None):

    print("In fixed_room_conflict", type, weight, params)

    # A fixed room course cannot be scheduled in a different room
    return constraint_factory \
        .for_each(Course) \
        .filter(lambda c1: (c1.fixed == 1) and (c1.fixed_room != None) and (c1.room.id != c1.fixed_room.id)) \
        .penalize("Fixed room onflict", get_score_type(type), lambda c1: weight)
        

def room_conflict(constraint_factory: ConstraintFactory, type="hard", weight=1, params=None):

    print("In room_conflict", type, weight, params)

    # A room can accommodate at most one course at the same time.
    return constraint_factory \
        .for_each(Course) \
        .join(Course,
              # ... in the same timeslot ...
              Joiners.equal(lambda course: course.timeslot),
              # ... in the same room ...
              Joiners.equal(lambda course: course.room),
              # ...not the same course ...
              ) \
        .filter(lambda c1, c2: c1.id != c2.id) \
        .penalize("Room conflict", get_score_type(type), lambda c1, c2: weight)


def teacher_conflict(constraint_factory: ConstraintFactory, type="hard", weight=1, params=None):
    # A teacher can teach at most one course at the same time.
    return constraint_factory \
        .for_each(Course) \
        .join(Course,
              Joiners.equal(lambda course: course.timeslot),
              Joiners.equal(lambda course: course.teacher)
              ) \
        .penalize("Teacher conflict", get_score_type(type), lambda c1, c2: weight)


def student_group_conflict(constraint_factory: ConstraintFactory, type="hard", weight=1, params=None):
    # A student can attend at most one course at the same time.
    return constraint_factory \
        .for_each(Course) \
        .join(Course,
              Joiners.equal(lambda course: course.timeslot),
              Joiners.equal(lambda course: course.student_group)
        ) \
        .penalize("Student group conflict", get_score_type(type), lambda c1, c2: weight)

def room_type_conflict(constraint_factory: ConstraintFactory, ttype="hard", weight=100, params=None):
    # A course of type lab can only be held in a lab room, and so on
    return constraint_factory \
        .for_each(Course) \
        .filter(lambda course1: course1.type != course1.room.type) \
        .penalize("Room type conflict", get_score_type(type), lambda c: weight)

# def dummy_func(dow, hrs_in_day):
#     print("### In dummy_func", dow, hrs_in_day)
#     ret = hrs_in_day > (5 * 60 * 60)
#     print("### Returning", ret)
#     return ret

def min_hours_per_subject_week_conflict(constraint_factory: ConstraintFactory, type, weight, params):
       return constraint_factory \
        .for_each(Course) \
        .group_by(lambda course: course.id,
            ConstraintCollectors.sum(lambda course: get_duration_in_secs(course).total_seconds())) \
        .filter(lambda course_id, hrs_in_day: hrs_in_day < (int(params["min_hrs_per_week"]) * 60 * 60)) \
        .penalize("Min hours per subject per week conflict", get_score_type(type), lambda course_id, hrs: weight)

def filter_for_lab_slots(course1, course2):

    # WARNING: Note that we cannot directly print the course objects. It results
    # in a problem for the filter

    # print("\t### In test_filter_for_lab_slots", course1.__str__(), course2.__str__())

    if (course1.type != "Lab" or course2.type != "Lab"):
        # print("\t###Not of type Lab, returning False")
        return False
    else:
        # Only Labs with subjects same here
        if (course1.slot == course2.slot or course1.slot == 2):
            # print("\t###Slots are same, returning False")
            return False
        elif (course1.slot == 2):
            # We want the first slot to be course1
            return True
        else:
            # print("\t###dow", course1.timeslot.day_of_week, course2.timeslot.day_of_week)

            # Slots of labs are different. Check the timeslots
            ret = course1.timeslot.day_of_week == course2.timeslot.day_of_week and \
                course1.timeslot.end_time == course2.timeslot.start_time
            
            # We are taking the negation of the above since a True return value means filter will
            # return it, and penalty will be applied. We want it the other way.

            # If the above condition is True, we don't want the penalty
            ret = not ret
            # print("\t###Returning", ret)
            return ret
    

def lab_slots_not_back_to_back_conflict(constraint_factory: ConstraintFactory, type="hard", weight=100, params=None):
    # Both 1 hour slots of a lab have to be back to back
    return constraint_factory \
        .for_each(Course) \
        .join(Course,
              Joiners.equal(lambda course: course.subject),
              Joiners.equal(lambda course: course.type)
        ) \
        .filter(filter_for_lab_slots) \
        .penalize("Lab slots not back to back conflict", get_score_type(type), lambda c1, c2: weight)


#### Used only temporarily
###### TODO: Remove hard coding
# def test_filter(dow, secs_in_day):
#     print("\t### In test_filter [", dow, secs_in_day, "]")
#     # ret = secs_in_day > (3 * 60 * 60)
#     ret = secs_in_day > 0
#     print("\t### Returning", ret)
#     return ret

# def test_filter(dow, hrs):
#     # print("\t### In test_filter [", dow, hrs, "]")
#     ret = hrs > 5
#     # print("\t### Returning", ret)
#     return ret


# def test_get_duration_of_course(course):
#     print("\t##### In test_get_duration_of_course", course)
#     ret = get_duration(course).total_seconds()
#     # ret = 1
#     print("\t##### Returning", ret)
#     return ret

# def test_get_course_dow(course):
#     print("\t### In test_get_course for", course)
#     ret = course.timeslot.day_of_week
#     print("\t### Returing", ret)
#     return ret

# Below for temporary testing ONLY
def check_duration_in_college(dow, courses_on_a_day_list):

    # HARD CODE FOR NOW

    # Just in case someone specified it as a string in the input data JSON
    max_hrs_in_day = 4
    max_hrs_in_day = float(max_hrs_in_day)
    
    # print("\t### In get_duration_in_colege", max_hrs_in_day)
    # print("\t\t###", *courses_on_a_day_list, sep="\n")

    # Sort the list as per start_time of timeslot of the courses
    # All the courses in the list will be from the same day
    courses_on_a_day_list.sort(key=lambda course: course.timeslot.start_time)

    # print("\t### Sorted list", *courses_on_a_day_list, sep="\n")

    from datetime import date, datetime, timedelta
    today = date.today()
   
    print("\t### Checking", courses_on_a_day_list[-1].timeslot.end_time, courses_on_a_day_list[0].timeslot.start_time)
    between = datetime.combine(today, courses_on_a_day_list[-1].timeslot.end_time) \
                                - datetime.combine(today, courses_on_a_day_list[0].timeslot.start_time)
    print("\t### Between = ", between)
    ret = between > timedelta(minutes=(max_hrs_in_day * 60))
    
    print("\t### Returning = ", ret)
    return ret

def temp_check_duration(dow, courses_on_a_day_list, max_hrs_in_day):

    # print("\t### In temp_check_duration", dow, max_hrs_in_day)

    courses_on_a_day_list = sorted(courses_on_a_day_list, key=lambda course: str(course.timeslot.start_time))
    # print("\t####Type is", type(courses_on_a_day_list))

    # print("\t### Sorted list for", dow, end=" | ")
    # for c in courses_on_a_day_list:
    #     print(c.__str__(), end=" | ")
    # print("\t=====")
   
    # print("\t### Checking", courses_on_a_day_list[-1].timeslot.end_time, courses_on_a_day_list[0].timeslot.start_time)
    between = datetime.combine(today, courses_on_a_day_list[-1].timeslot.end_time) \
                                - datetime.combine(today, courses_on_a_day_list[0].timeslot.start_time)
    # print("\t### Between = " + str(between))

    # max_hrs_in_day = 3
    ret = between > timedelta(minutes=max_hrs_in_day * 60) or between < timedelta(minutes=0)
    # print("### Returning...", ret)
    return ret
    


def not_more_than_n_hours_in_college_per_day_conflict(constraint_factory: ConstraintFactory, type="hard", weight=10, params={"max_hrs_in_day": 4}):
    
    print("\t### In not_more_than_n_hours_in_college_per_day_conflict****", type, weight, params)

    return constraint_factory \
        .for_each(Course) \
        .group_by(lambda course: course.timeslot.day_of_week,
            ConstraintCollectors.to_list()) \
        .filter(lambda dow, courses_on_a_day_list: temp_check_duration(dow, courses_on_a_day_list, params["max_hrs_in_day"])) \
        .penalize("Not more than n hours in college per day conflict", get_score_type(type), lambda dow, courses_on_a_day_list: weight)
        
def get_duration_in_secs(course: Course):
    between = datetime.combine(today, course.timeslot.end_time) - datetime.combine(today, course.timeslot.start_time)
    # print("\t#### In get_duration, returning", between)
    return between.total_seconds()

# def test_filter_for_coursework_hrs(dow, hrs, max_hrs_in_day):
#     # print("\t### In test_filter_for_coursework_hrs", dow, hrs, max_hrs_in_day)
#     ret = (hrs > float(max_hrs_in_day))
#     # print("\t### Returning", ret)
#     return ret

def not_more_than_n_hours_coursework_per_day_conflict(constraint_factory: ConstraintFactory, type="hard", weight=10, params={"max_hrs_in_day": 4}):
    # Only n hours per day slots can be held

    # print("\t### In not_more_than_n_hours_coursework_per_day_conflict****", type, weight, params)

    return constraint_factory \
        .for_each(Course) \
        .group_by(lambda course: course.timeslot.day_of_week,
            ConstraintCollectors.sum(lambda course: (get_duration_in_secs(course) / (60 * 60)))) \
        .filter(lambda dow, hrs: (hrs > float(params["max_hrs_in_day"]))) \
        .penalize("Not more than n hours per day conflict", get_score_type(type), lambda dow, hrs: weight) 
        # .filter(lambda dow, hrs: test_filter_for_coursework_hrs(dow, hrs, params["max_hrs_in_day"])) \
        
def teacher_room_stability(constraint_factory: ConstraintFactory, type="soft", weight=1, params=None):
    # A teacher prefers to teach in a single room.
    return constraint_factory \
        .for_each(Course) \
        .join(Course,
              Joiners.equal(lambda course: course.teacher)
              ) \
        .filter(lambda course1, course2: course1.room != course2.room) \
        .penalize("Teacher room stability", get_score_type(type), lambda c1, c2: weight)

def teacher_time_efficiency(constraint_factory: ConstraintFactory, type="soft", weight=1, params=None):
    # A teacher prefers to teach sequential courses and dislikes gaps between courses.
    return constraint_factory \
        .for_each(Course) \
        .join(Course,
              Joiners.equal(lambda course: course.teacher),
              Joiners.equal(lambda course: course.timeslot.day_of_week)
              ) \
        .filter(within_60_minutes) \
        .reward("Teacher time efficiency", get_score_type(type), lambda c1, c2: weight)


def student_group_subject_variety(constraint_factory: ConstraintFactory, type="soft", weight=1, params=None):
    # A student group dislikes sequential courses on the same subject.
    return constraint_factory \
        .for_each(Course) \
        .join(Course,
              Joiners.equal(lambda course: course.subject),
              Joiners.equal(lambda course: course.student_group),
              Joiners.equal(lambda course: course.timeslot.day_of_week)
              ) \
        .filter(within_60_minutes) \
        .penalize("Student group subject variety", get_score_type(type), lambda c1, c2: weight)
