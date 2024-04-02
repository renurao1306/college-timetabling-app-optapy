from functools import reduce
import sys

from optapy import solver_factory_create
from optapy.types import SolverConfig, Duration
from domain import TimeTable, Course, generate_problem
from domain import TimeTable, Course, generate_problem
from constraints import curry_define_constraints_with_input
from optapy import score_manager_create
from readInputData import readInputData
from printTimeTable import print_timetable_json_format, print_timetable_indian_style

if len(sys.argv) != 3:
    print(f"Usage: python3 {sys.argv[0]} <input JSON filepath> <output format: json/human>")
    sys.exit(-1)
else:
    inputFileName = sys.argv[1]
    output_format = sys.argv[2]


def print_timetable(timetable: TimeTable):
    room_list = timetable.room_list
    course_list = timetable.course_list
    timeslot_room_course_triple_list = list(map(lambda the_course: (the_course.timeslot, the_course.room, the_course),
                                                filter(lambda the_course:
                                                       the_course.timeslot is not None and
                                                       the_course.room is not None,
                                                course_list)))
    course_map = dict()
    for timeslot, room, course in timeslot_room_course_triple_list:
        if timeslot in course_map:
            if room in course_map[timeslot]:
                course_map[timeslot][room].append(course)
            else:
                course_map[timeslot][room] = [course]
        else:
            course_map[timeslot] = {room: [course]}

    print("|" + ("------------|" * (len(room_list) + 1)))



    print(reduce(lambda a, b: a + b + " | ",
                 map(lambda the_room: "{:<10}".format(the_room.name)[0:10], room_list),
                 "|            | "))
    print("|" + ("------------|" * (len(room_list) + 1)))

    print("---- End of Part 1 ----")
    
    for timeslot in timetable.timeslot_list:
        cell_list = list(map(lambda the_room: course_map.get(timeslot, {}).get(the_room, []),
                             room_list))
        out = "| " + (timeslot.day_of_week[0:3] + " " + str(timeslot.start_time))[0:10] + " | "
        for cell in cell_list:
            if len(cell) == 0:
                out += "           | "
            else:
                out += "{:<10}".format(reduce(lambda a, b: a + "," + b,
                                              map(lambda assigned_course: assigned_course.subject,
                                                  cell)))[0:10] + " | "
        print(out)
        print("---- End of Part 2 ----")

        out = "|            | "
        for cell in cell_list:
            if len(cell) == 0:
                out += "           | "
            else:
                out += "{:<10}".format(reduce(lambda a, b: a + "," + b,
                                              map(lambda assigned_course: assigned_course.teacher,
                                                  cell)))[0:10] + " | "
        print(out)

        print("---- End of Part 3 ----")

        out = "|            | "
        for cell in cell_list:
            if len(cell) == 0:
                out += "           | "
            else:
                out += "{:<10}".format(reduce(lambda a, b: a + "," + b,
                                              map(lambda assigned_course: assigned_course.student_group,
                                                  cell)))[0:10] + " | "
        print(out)

        print("---- End of Part 3 ----")

        print("|" + ("------------|" * (len(room_list) + 1)))

    unassigned_courses = list(
        filter(lambda unassigned_course: unassigned_course.timeslot is None or unassigned_course.room is None,
               course_list))
    if len(unassigned_courses) > 0:
        print()
        print("Unassigned courses")
        for course in unassigned_courses:
            print(" " + course.subject + " - " + course.teacher + " - " + course.student_group)



data = readInputData(inputFileName)

# print("Runtime in secs", data["plan_run_params"]["runtime_in_secs"])
# print("Constraints", data["plan_run_params"]["constraints"])
# print(data["plan_run_params"]["constraints"][0]["constraint"]["type"])
# print("Domain data", data["domain_data"])

# "Curry" the define_constraints function with the constraints data
curried_define_constraints = curry_define_constraints_with_input(data["plan_run_params"]["constraints"])

solver_config = SolverConfig().withEntityClasses(Course) \
    .withSolutionClass(TimeTable) \
    .withConstraintProviderClass(curried_define_constraints) \
    .withTerminationSpentLimit(Duration.ofSeconds(data["plan_run_params"]["runtime_in_secs"]))

solver_factory = solver_factory_create(solver_config)
solver = solver_factory.buildSolver()

solution = solver.solve(generate_problem(data["domain_data"]))

# print("Score is", solution.score)
# print("Score in string is", solution.get_score_str())

if output_format == "human":
    # print("Solution is", solution)
    # # print_timetable(solution)
    print("Score is", solution.score)
    print_timetable_indian_style(solution)
elif output_format == "json":
    print_timetable_json_format(solution)
else:
    print("Cannot output in format", output_format, "Currently, only \"json\" or \"human\" is supported")

# from constraints import get_duration
# from datetime import timedelta
# print("Duration = ", solution.course_list[0], get_duration(solution.course_list[0]).total_seconds() >= 3600)


print("\n\nScore Explanation:\n\n")

score_manager = score_manager_create(solver_factory)
print(score_manager.explainScore(solution))

