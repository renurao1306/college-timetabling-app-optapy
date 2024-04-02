import datetime

import optapy
from optapy import problem_fact, planning_id, planning_entity, planning_variable, \
    planning_solution, planning_entity_collection_property, \
    problem_fact_collection_property, \
    value_range_provider, planning_score
from optapy.types import HardSoftScore
from datetime import time


@problem_fact
class Room:
    id: int
    name: str
    type: str

    def __init__(self, id, name, type):
        self.id = id
        self.name = name
        self.type = type

    @planning_id
    def get_id(self):
        return self.id

    def __str__(self):
        return f"Room(id={self.id}, name={self.name}, type={self.type})"


@problem_fact
class Timeslot:
    id: int
    day_of_week: str
    start_time: datetime.time
    end_time: datetime.time

    def __init__(self, id, day_of_week, start_time, end_time):
        self.id = id
        self.day_of_week = day_of_week
        self.start_time = start_time
        self.end_time = end_time

    @planning_id
    def get_id(self):
        return self.id

    def __str__(self):
        return (
                f"Timeslot("
                f"id={self.id}, "
                f"day_of_week={self.day_of_week}, "
                f"start_time={self.start_time}, "
                f"end_time={self.end_time})"
        )


@planning_entity
class Course:
    id: int
    subject: str
    teacher: str
    type: str
    student_group: str
    timeslot: Timeslot
    room: Room
    # Below fields are used if the user has predecided the timeslot and / or room
    fixed: int
    fixed_timeslot: Timeslot
    fixed_room: Room

    def __init__(self, id, subject, teacher, type, student_group, timeslot=None,
                 room=None, slot=1, fixed=0, fixed_timeslot=None, fixed_room=None):
        self.id = id
        self.subject = subject
        self.teacher = teacher
        self.type = type
        self.student_group = student_group
        self.timeslot = timeslot
        self.room = room
        self.slot = slot
        self.fixed = fixed
        self.fixed_timeslot = fixed_timeslot
        self.fixed_room = fixed_room

        # print("\t### Created new Course object", str(self))

    @planning_id
    def get_id(self):
        return self.id

    @planning_variable(Timeslot, ["timeslotRange"])
    def get_timeslot(self):
        return self.timeslot

    def set_timeslot(self, new_timeslot):
        self.timeslot = new_timeslot

    @planning_variable(Room, ["roomRange"])
    def get_room(self):
        return self.room

    def set_room(self, new_room):
        self.room = new_room

    def get_slot(self):
        return self.slot
    
    def set_slot(self, slot):
        self.slot = slot

    def get_fixed(self):
        return self.fixed
    
    def set_fixed(self, fixed):
        self.fixed = fixed

    def get_fixed_timeslot(self):
        return self.fixed_timeslot
    
    def set_fixed_timeslot(self, fixed_timeslot):
        self.fixed_timeslot = fixed_timeslot

    def get_fixed_room(self):
        return self.fixed_room
    
    def set_fixed_room(self, fixed_room):
        self.fixed_room = fixed_room

    def __str__(self):
        return (
            f"Course("
            f"id={self.id}, "
            f"timeslot={self.timeslot}, "
            f"room={self.room}, "
            f"teacher={self.teacher}, "
            f"type={self.type}, "
            f"subject={self.subject}, "
            f"student_group={self.student_group}, "
            f"slot={self.slot}, "
            f"fixed={self.fixed}, "
            f"fixed_timeslot={self.fixed_timeslot}, "
            f"fixed_room={self.fixed_room} "
            f")"
        )



def format_list(a_list):
    return ',\n'.join(map(str, a_list))


@planning_solution
class TimeTable:
    timeslot_list: list[Timeslot]
    room_list: list[Room]
    course_list: list[Course]
    score: HardSoftScore
    # Below member is required for pickling to JSON
    # since the "score" member is pickled as empty object
    # because it is of a type not defined in Python
    score_str: str

    def __init__(self, timeslot_list, room_list, course_list, score=None):
        self.timeslot_list = timeslot_list
        self.room_list = room_list
        self.course_list = course_list
        self.score = score
        self.score_str = "" if self.score is None else str(self.score.toString())

    @problem_fact_collection_property(Timeslot)
    @value_range_provider("timeslotRange")
    def get_timeslot_list(self):
        return self.timeslot_list

    @problem_fact_collection_property(Room)
    @value_range_provider("roomRange")
    def get_room_list(self):
        return self.room_list

    @planning_entity_collection_property(Course)
    def get_course_list(self):
        return self.course_list

    @planning_score(HardSoftScore)
    def get_score(self):
        return self.score

    def set_score(self, score):
        self.score = score

        # Also, fill the score_str, but take care of exceptions
        # that may be occurring during initialization
        try:
            self.score_str = str(self.score.toString()) if self.score is not None else 'None'
        except:
            self.score_str = ""
     
    def get_score_str(self):
         return self.score_str

    def set_score_str(self, score_str):
        self.score_str = score_str
        
    
    def __str__(self):
        return (
            f"TimeTable("
            f"timeslot_list={format_list(self.timeslot_list)},\n"
            f"room_list={format_list(self.room_list)},\n"
            f"course_list={format_list(self.course_list)},\n"
            f"score={str(self.score.toString()) if self.score is not None else 'None'}\n",
            f"score_str={str(self.score.toString()) if self.score is not None else 'None'}",
            f")"
        )

# Below function unused since it is now taken from the input JSON file
# Leaving it here just in case for reference in the future
def fill_lunch_slots(course_list, room_list, timeslot_list):
    days_of_week = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"]

    lb_id = 60000

    canteen_room = Room(60000, "Canteen", "Canteen")

    room_list.append(canteen_room)


    for dow in days_of_week:
        lunch_break = Course(lb_id, "Lunch Break", "Chefs", "Canteen", "MCA-SEM1")
        course_list.append(lunch_break)

        start_time = datetime.datetime.strptime("13:00:00", "%H:%M:%S").time()
        end_time = datetime.datetime.strptime("14:00:00", "%H:%M:%S").time()

        lb_timeslot = Timeslot(lb_id, dow, start_time, end_time)

        timeslot_list.append(lb_timeslot)


        lunch_break.set_timeslot(lb_timeslot)
        lunch_break.set_room(canteen_room)

        lb_id = lb_id + 1

def filter_list_by_id(input_list, input_obj, member_name):
        curr_obj_id = input_obj[member_name]

        filtered_list = list(filter(lambda c: c if c.id == curr_obj_id else None, input_list))
        # Take the first element (ideally exception should be thrown if there is no element or
        # more than one element with a match, but OptaPlanner itself will complain about duplicate
        # ids)
        return filtered_list[0] if len(filtered_list) != 0 else None

def fill_fixed_slot_list(course_list, room_list, timeslot_list, fixed_slot_list):
    # Fixed slots are those courses whose timeslots and / or rooms are already decided
    # by the user (e.g., "Lunxh Breaks" in "Canteen" between "13:00 - 14:00" on all days)

    # A set later used to delete the courses that have fixed slots determined
    to_delete_courses_set = set()

    # We need to map the course id, and fil up the timeslots and rooms with their references
    for fixed_course in fixed_slot_list:
        
        if fixed_course["enabled"] != 1:
            continue

        filtered_course_ref = filter_list_by_id(course_list, fixed_course, "course_id")

        # Add the course id to the set to delete later
        to_delete_courses_set.add(filtered_course_ref)

        # Now, create a "new" Course which has its timeslot and room filled
        curr_course_ref = Course(fixed_course["new_course_id"],
                                filtered_course_ref.subject,
                                filtered_course_ref.teacher,
                                filtered_course_ref.type,
                                filtered_course_ref.student_group,
                                filtered_course_ref.slot,
                                filtered_course_ref.fixed
                                )
        
        curr_course_ref.fixed = 1

        # Find the room reference similarly
        curr_room_ref = filter_list_by_id(room_list, fixed_course, "room_id")

        # Find the timeslot reference similarly
        curr_timeslot_ref = filter_list_by_id(timeslot_list, fixed_course, "timeslot_id")
        
        # Set the references in the course object
        curr_course_ref.set_room(curr_room_ref)
        curr_course_ref.set_timeslot(curr_timeslot_ref)
        curr_course_ref.set_fixed_room(curr_room_ref)
        curr_course_ref.set_fixed_timeslot(curr_timeslot_ref)


        # Add it to the course_list
        course_list.append(curr_course_ref)
    
    # print("### Courses to be deleted", to_delete_courses_set)
    # Delete the courses to be deleted
    for course_to_delete in to_delete_courses_set:
        # print("### Deleting course", course_to_delete)
        course_list.remove(course_to_delete)




def generate_problem(domain_data):

    data = domain_data

    timeslot_list = []
    for ts in data["timeslot_list"]:
        if int(ts["enabled"]) == 1:
            start_time = datetime.datetime.strptime(ts["start_time"], "%H:%M:%S").time()
            end_time = datetime.datetime.strptime(ts["end_time"], "%H:%M:%S").time()

            timeslot_list.append(Timeslot(int(ts["id"]), ts["day_of_week"], start_time, end_time))
    
    
    room_list = []
    for r in data["room_list"]:
        if int(r["enabled"]) == 1:
            room_list.append(Room(int(r["id"]), r["name"], r["type"]))
    
    course_list = []
    for l in data["course_list"]:
        if int(l["enabled"]) == 1:
            course_list.append(Course(int(l["id"]), l["subject"], l["teacher"], l["type"], l["student_group"], slot=l["slot"]))
    
    # Speical treatment for lunch breaks for now (later it should come via the input JSON file)
    # fill_lunch_slots(course_list, room_list, timeslot_list)

    # Create fixed slots from input JSON
    fill_fixed_slot_list(course_list, room_list, timeslot_list, data["fixed_slot_list"])

    # print("### Course list size", len(course_list))
    # print("### Courses:")

    # for c in course_list:
    #     print("\t####### ", c)

    # import sys
    # sys.exit(-1)

   

    # lesson = lesson_list[0]
    # lesson.set_timeslot(timeslot_list[0])
    # lesson.set_room(room_list[0])

    return TimeTable(timeslot_list, room_list, course_list)
