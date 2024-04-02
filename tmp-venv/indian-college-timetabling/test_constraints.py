#############################################
# Note: Please refer to https://www.optapy.org/docs/latest/constraint-streams/constraint-streams.html#constraintStreamsTesting
# for how to test constraints in OptaPy. Specifically, note that individual constraints
# as well as all constraints together can be tested
#############################################

import sys
import datetime

from optapy.test import constraint_verifier_build
from optapy.score import HardSoftScore

from domain import TimeTable, Course, generate_problem
from domain import TimeTable, Course, generate_problem

from constraints import curry_define_constraints_with_input, simple_define_constraints
from constraints import old_fixed_slot_conflict, fixed_slot_conflict, fixed_room_conflict, \
    not_more_than_n_hours_coursework_per_day_conflict, room_conflict, teacher_conflict, student_group_conflict, \
    not_more_than_n_hours_in_college_per_day_conflict, room_type_conflict, \
    lab_slots_not_back_to_back_conflict, \
    teacher_room_stability, teacher_time_efficiency, student_group_subject_variety
from readInputData import readInputData
# # Temp for debugging
# from constraints import get_duration_in_secs


if len(sys.argv) != 3:
    print(f"Usage: python3 {sys.argv[0]} <input JSON filepath> <output format: json/human>")
    sys.exit(-1)
else:
    inputFileName = sys.argv[1]
    output_format = sys.argv[2]

data = readInputData(inputFileName)
tt = generate_problem(data["domain_data"])

# "Curry" the define_constraints function with the constraints data
curried_define_constraints = curry_define_constraints_with_input(data["plan_run_params"]["constraints"])

# constraint_verifier = constraint_verifier_build(curried_define_constraints, TimeTable, Course)
constraint_verifier = constraint_verifier_build(simple_define_constraints, TimeTable, Course)

ts_list = tt.get_timeslot_list()
room_list = tt.get_room_list()
course_list = tt.get_course_list()

print(ts_list[0])
print(room_list[0])
print(course_list[0], course_list[1])

def test_room_conflict():
    # Choose one course, and assign room and timeslot
    first_course = course_list[0]
    first_course.set_room(room_list[0])
    first_course.set_timeslot(ts_list[0])

    # Choose another course, and assign same room and timeslot
    conflicting_course = course_list[3]
    conflicting_course.set_room(room_list[0])
    conflicting_course.set_timeslot(ts_list[0])

    # Choose yet another course, and assign a different room and timeslot
    non_conflicting_course = course_list[2]
    non_conflicting_course.set_room(room_list[1])
    non_conflicting_course.set_timeslot(ts_list[1])

    constraint_verifier.verify_that(room_conflict) \
        .given(first_course, conflicting_course, non_conflicting_course) \
        .penalizes_by(2) # Penalizes by 2 because of self join (A,B and B,A)

def test_fixed_slot_conflict():

    # Choose any fixed slot course (like "Lunch Break")
    fixed_slot_courses = list(filter(lambda c: c.fixed == 1 and c.fixed_timeslot != None, course_list))
    

    # Store the timeslot for checking by choosing one course
    fixed_ts = fixed_slot_courses[0].timeslot

    fixed_slot_courses[0].set_timeslot(ts_list[0])

    print("### Checking the following course", fixed_slot_courses[0], "for fixed ts", fixed_ts)
    print("### Fixed ts", fixed_ts.start_time, fixed_ts.end_time)
    print("### Fixed ts", fixed_ts.start_time != datetime.time(13, 0, 0), fixed_ts.end_time != datetime.time(14, 0, 0))
        
    constraint_verifier.verify_that(fixed_slot_conflict) \
        .given(fixed_slot_courses[0]) \
        .penalizes_by(1000)

def test_fixed_room_conflict():

    # Choose any fixed room course (like "Lunch Break")
    fixed_room_courses = list(filter(lambda c: c.fixed == 1 and c.fixed_room != None, course_list))
    
    # Set the room to some random one
    fixed_room_courses[0].set_room(room_list[0])

    print("### Checking the following course", fixed_room_courses[0], "for fixed room", fixed_room_courses[0].fixed_room)
        
    constraint_verifier.verify_that(fixed_room_conflict) \
        .given(fixed_room_courses[0]) \
        .penalizes_by(1000)        

def test_not_more_than_n_hours_in_college_per_day_conflict():

    # Choose some non fixed slot courses
    non_fixed_slot_courses = list(filter(lambda c: c.fixed == 0, course_list))

    # Assign courses so that students get more than 4 hours per day of 
    # course work

    # IMPORTANT: Remember to assign the room even though it is not used for this test
    # This is because all planning variables (room and timeslot) must be initialized
    # otherwise, they will be dropped
    non_fixed_slot_courses[0].set_timeslot(ts_list[7])
    non_fixed_slot_courses[0].set_room(room_list[0])
    non_fixed_slot_courses[1].set_timeslot(ts_list[0])
    non_fixed_slot_courses[1].set_room(room_list[0])
    non_fixed_slot_courses[2].set_timeslot(ts_list[1])
    non_fixed_slot_courses[2].set_room(room_list[0])
    non_fixed_slot_courses[3].set_timeslot(ts_list[4])
    non_fixed_slot_courses[3].set_room(room_list[0])
    non_fixed_slot_courses[4].set_timeslot(ts_list[5])
    non_fixed_slot_courses[4].set_room(room_list[0])
    non_fixed_slot_courses[5].set_timeslot(ts_list[6])
    non_fixed_slot_courses[5].set_room(room_list[0])
    

    print("### Checking the following courses", *non_fixed_slot_courses[0:6], sep="\n")
  
    # Note: "*" below is used as a Python spread operator
    constraint_verifier.verify_that(not_more_than_n_hours_in_college_per_day_conflict) \
        .given(*non_fixed_slot_courses[0:6]) \
        .penalizes_by(10)

    # constraint_verifier.verify_that(not_more_than_n_hours_in_college_per_day_conflict) \
    #     .given(non_fixed_slot_courses[1]) \
    #     .penalizes_by(0)

def test_not_more_than_n_hours_coursework_per_day_conflict():
    # Choose some non fixed slot courses
    non_fixed_slot_courses = list(filter(lambda c: c.fixed == 0, course_list))

    # Assign courses so that students get more than 4 hours per day of 
    # course work
    non_fixed_slot_courses[0].set_timeslot(ts_list[0])
    non_fixed_slot_courses[0].set_room(room_list[0])
    non_fixed_slot_courses[1].set_timeslot(ts_list[1])
    non_fixed_slot_courses[1].set_room(room_list[0])
    non_fixed_slot_courses[2].set_timeslot(ts_list[2])
    non_fixed_slot_courses[2].set_room(room_list[0])
    non_fixed_slot_courses[3].set_timeslot(ts_list[3])
    non_fixed_slot_courses[3].set_room(room_list[0])
    non_fixed_slot_courses[4].set_timeslot(ts_list[4])
    non_fixed_slot_courses[4].set_room(room_list[0])
    non_fixed_slot_courses[5].set_timeslot(ts_list[5])
    non_fixed_slot_courses[5].set_room(room_list[0])
    

    print("### Checking the following courses", *non_fixed_slot_courses[0:6], sep="\n")
  
    # Note: "*" below is used as a Python spread operator
    constraint_verifier.verify_that(not_more_than_n_hours_coursework_per_day_conflict) \
        .given(*non_fixed_slot_courses[0:6]) \
        .penalizes_by(10)
        
def test_room_type_conflict():

    # Get the list of courses of various types
    lab_courses = list(filter(lambda c: c.type == "Lab", course_list))
    classroom_courses = list(filter(lambda c: c.type == "Classroom", course_list))
    canteen_courses = list(filter(lambda c: c.type == "Canteen", course_list))

    # Similarly, get the list of room of various types
    lab_rooms = list(filter(lambda c: c.type == "Lab", room_list))
    classroom_rooms = list(filter(lambda c: c.type == "Classroom", room_list))
    canteen_rooms = list(filter(lambda c: c.type == "Canteen", room_list))

    # Now, choose courses and assign the rooms as per okay or not okay

    classroom_course_non_conf = classroom_courses[0]
    classroom_course_conf = classroom_courses[1]

    lab_course_non_conf = lab_courses[0]
    lab_course_conf = lab_courses[1]

    classroom_1 = classroom_rooms[0]
    classroom_2 = classroom_rooms[1]

    lab_room_1 = lab_rooms[0]
    lab_room_2 = lab_rooms[1]

    # Only 1 canteen usually
    canteen_room = canteen_rooms[0]

    # Schedule one classroom course in a lab
    classroom_course_non_conf.set_room(classroom_1)
    classroom_course_non_conf.set_timeslot(ts_list[0])

    classroom_course_conf.set_room(lab_room_2)
    classroom_course_conf.set_timeslot(ts_list[0])

    # Similarly, schedule one lab course in a classroom
    lab_course_non_conf.set_room(lab_room_1)
    lab_course_non_conf.set_timeslot(ts_list[0])

    lab_course_conf.set_room(classroom_2)
    lab_course_conf.set_timeslot(ts_list[0])
   

    constraint_verifier.verify_that(room_type_conflict) \
        .given(classroom_course_non_conf, classroom_course_conf, lab_course_non_conf, lab_course_conf) \
        .penalizes_by(200)

def test_lab_slots_not_back_to_back_conflict():

    # Get some lab courses (each lab course is represented by 2 courses with different ids but same names)
    wt_lab_courses = list(filter(lambda c: c.type == "Lab" and c.subject == "WT-Lab", course_list))
    dbms_lab_courses = list(filter(lambda c: c.type == "Lab" and c.subject == "DBMS-Lab", course_list))
    jp_lab_courses = list(filter(lambda c: c.type == "Lab" and c.subject == "JP-Lab", course_list))

    print("\t### Lab courses", *wt_lab_courses, *dbms_lab_courses, *jp_lab_courses, sep="\n")

    # Similarly, get the list of room of various types
    lab_rooms = list(filter(lambda c: c.type == "Lab", room_list))

    print("\t### Lab rooms", *lab_rooms)

    # Assign lab timeslots and lab rooms

    wt_lab_courses[0].set_timeslot(ts_list[0])
    wt_lab_courses[0].set_room(lab_rooms[0])
    # Immediately following above one
    wt_lab_courses[1].set_timeslot(ts_list[1])
    wt_lab_courses[1].set_room(lab_rooms[0])
   
    dbms_lab_courses[0].set_timeslot(ts_list[2])
    dbms_lab_courses[0].set_room(lab_rooms[1])
    # Not immediately following above one
    dbms_lab_courses[1].set_timeslot(ts_list[4])
    dbms_lab_courses[1].set_room(lab_rooms[1])

    # Check with a next timeslot but on the next day
    jp_lab_courses[0].set_timeslot(ts_list[8])
    jp_lab_courses[0].set_room(lab_rooms[2])

    # Second slot is scheduled for next day, but right timeslot
    jp_lab_courses[1].set_timeslot(ts_list[17])
    jp_lab_courses[1].set_room(lab_rooms[2])

    print("Timeslots on next day", ts_list[8], ts_list[17])

    constraint_verifier.verify_that(lab_slots_not_back_to_back_conflict) \
        .given(*wt_lab_courses, *dbms_lab_courses, *jp_lab_courses) \
        .penalizes_by(300)

def test_teacher_room_stability():

    # Get a couple of courses
    course1 = course_list[0]
    course2 = course_list[1]

    course1.set_timeslot(ts_list[0])
    course2.set_timeslot(ts_list[1])
    
    # Set the teacher to be the same
    course2.teacher = course1.teacher

    # Set the rooms to be different
    course1.set_room(room_list[0])
    course2.set_room(room_list[1])

    constraint_verifier.verify_that(teacher_room_stability) \
        .given(course1, course2) \
        .penalizes_by(2)

def test_teacher_time_efficiency():

    # Get a couple of courses
    course1 = course_list[0]
    course2 = course_list[1]
    course3 = course_list[2]

    course1.set_timeslot(ts_list[0])
    course2.set_timeslot(ts_list[1])
    course3.set_timeslot(ts_list[5])
    
    # Set the teacher to be the same for all 3
    course2.teacher = course1.teacher
    course3.teacher = course1.teacher

    # Set the rooms to be different
    course1.set_room(room_list[0])
    course2.set_room(room_list[1])
    course3.set_room(room_list[2])

    constraint_verifier.verify_that(teacher_time_efficiency) \
        .given(course1, course2, course3) \
        .rewards(4)

def test_student_group_subject_variety():

    # Get a couple of courses
    course1 = course_list[0]
    course2 = course_list[1]
    course3 = course_list[2]

    course1.set_timeslot(ts_list[0])
    course2.set_timeslot(ts_list[1])
    course3.set_timeslot(ts_list[5])
    
    # Set the rooms to be different
    course1.set_room(room_list[0])
    course2.set_room(room_list[0])
    course3.set_room(room_list[0])

    constraint_verifier.verify_that(student_group_subject_variety) \
        .given(course1, course2, course3) \
        .penalizes_by(3)

# print("### Testing room conflict")
# test_room_conflict()

# print("### Testing fixed slot conflict")
# test_fixed_slot_conflict()

# print("### Testing fixed room conflict")
# test_fixed_room_conflict()

# print("### Testing not more than n hours coursework per day conflict")
# test_not_more_than_n_hours_coursework_per_day_conflict()

# print("### Testing not more than n hours in college per day conflict")
# test_not_more_than_n_hours_in_college_per_day_conflict()

# print("### Testing room type conflict")
# test_room_type_conflict()

# print("### Testing lab slots not back-to-back conflict")
# test_lab_slots_not_back_to_back_conflict()

print("### Testing teacher room stability")
test_teacher_room_stability()

print("### Testing teacher time efficiency")
test_teacher_time_efficiency()

print("### Testing student group subject variety")
test_student_group_subject_variety()

# from constraints import filter_for_lab_slots
# wt_lab_courses = list(filter(lambda c: c.type == "Lab" and c.subject == "WT-Lab", course_list))
# dbms_lab_courses = list(filter(lambda c: c.type == "Lab" and c.subject == "DBMS-Lab", course_list))

# print("After filtering, got DBMS-Lab", *dbms_lab_courses, sep="\n")

# print(ts_list[9])

# dbms_lab_courses[0].set_timeslot(ts_list[0])
# dbms_lab_courses[1].set_timeslot(ts_list[9])

# BELOW FOR TEMP TESTING ONLY
# from constraints import check_duration_in_college

# for i in range(0, 6):
#     course_list[i].set_timeslot(ts_list[5 - i])
#     course_list[i].set_room(room_list[0])

# print(*course_list[0:6], sep="\n")
# print("\t### Check duration",check_duration_in_college(ts_list[0].day_of_week, course_list[0:4]))

# tmp_list = course_list[0:6]
# sorted(tmp_list, key=lambda c: c.timeslot.start_time)

# print(*tmp_list, sep="\n")

