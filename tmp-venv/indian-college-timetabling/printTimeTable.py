import json
import datetime
from functools import reduce
import jsonpickle


from domain import TimeTable, Course, Timeslot, Room

def print_timetable_json_format(solution, filename = None):
    # Dump solution in JSON format

    # Note that the score field is not pickled properly since it is
    # ia HardSoftScore class object not defined by us
    # So, we will stuff it inside another member (score_str) which is
    # a string
    # print("Solution.score is", solution.score)
    # solution.score_str = str(solution.score.toString())
    pickledJson = jsonpickle.encode(solution, unpicklable=False)

    if (filename == None):
        print("### JSON SOLUTION BEGINS ###")
        print(pickledJson)
        print("### JSON SOLUTION ENDS ###")
    else:
        # Dump to file
        outFile = open("sampleSolution.json", "w")
        pickledJsonObj = json.loads(pickledJson)
        json.dump(pickledJsonObj, outFile, indent=4)
        outFile.close()


def print_generic_line(course_map, timeslot_start_end, dow_list, member_chain, timeslot_present: False):
    # print("### In print_generic_line", member_chain)
    out = "| "

    if timeslot_present:
        ts = timeslot_start_end
    else:
        ts = " "

    out += "{:11}".format(ts) + " "

    # Split the member chain to get the nested attributes in the Course object
    nested_member_names = member_chain.split(".")

    # For each day of week
    for dow in dow_list:

        if dow in course_map[timeslot_start_end]:
            curr_courses = course_map[timeslot_start_end][dow]
            # print("Curr Courses", list(map(lambda the_course: the_course.__str__(), curr_courses)))
                            
            if curr_courses != None and len(curr_courses) !=0:
               
                out_str = ""
                curr_nested_obj = curr_courses[0]

                # Special for debugging
                # if member_chain == "subject":
                #     out_str += curr_nested_obj + getattr(curr_nested_obj, "slot")
                #     print("Subject handling", out_str)

                for mem in nested_member_names:
                    curr_nested_obj = getattr(curr_nested_obj, mem)

                out_str += curr_nested_obj
                


                out += "| " + "{:11}".format(out_str) + " "
            else:
                out += "| " + "{:11}".format(" ") + " "

        else:
            out += "| " + "{:11}".format(" ") + " "

    out += "|"
    print(out)

def print_timetable_indian_style(timetable: TimeTable):
    room_list = timetable.room_list
    course_list = timetable.course_list
    timeslot_list = timetable.timeslot_list

    # print("##### Timeslot List is", timeslot_list)

    timeslot_room_course_triple_list = list(map(lambda the_course: (the_course.timeslot, the_course.room, the_course),
                                                filter(lambda the_course:
                                                       the_course.timeslot is not None and
                                                       the_course.room is not None,
                                                course_list)))

    
    course_map = dict()
    for timeslot, room, course in timeslot_room_course_triple_list:

        # Drop seconds part
        timeslot_string = timeslot.start_time.strftime("%H:%M") + "-" + timeslot.end_time.strftime("%H:%M")

        # print("Timeslot strings", timeslot_string)

        if timeslot_string in course_map:
            # print("Timeslot is in dict")
            if timeslot.day_of_week in course_map[timeslot_string]:
                course_map[timeslot_string][timeslot.day_of_week].append(course)
            else:
                course_map[timeslot_string][timeslot.day_of_week] = [course]
        else:
            course_map[timeslot_string] = {timeslot.day_of_week: [course]}

    # print(course_map)

    # Day of weeklist
    # Some jugglery here to get the unique days of week (can also be hard coded)

    # Print days of week at the top
    dow_list = list(set(map(lambda a: a.day_of_week, timeslot_list)))

    # However, Python set will not be sorted as per day of week
    # We will have to sort it manually, but this is hard coded for English
    # TODO: Internationalize these days of the week
    dow_order = {"SUNDAY": 0, "MONDAY": 1, "TUESDAY": 2, "WEDNESDAY": 3,
                 "THURSDAY": 4, "FRIDAY": 5, "SATURDAY": 6}
    dow_list = sorted(dow_list, key=dow_order.get)


    print((("|" + ("-" * 13)) * (len(dow_list) + 1)) + "|")

    print(reduce(lambda a, b: a + b + "|",
                 map(lambda dow: "{:13}".format(" " + dow)[0:13], dow_list),
                 "|" + (" " * 13) + "|"))
    print((("|" + ("-" * 13)) * (len(dow_list) + 1)) + "|")


    # Print as per timeslots
    # print("### Printing as per timeslots...")

    # Keys are timeslots (sort them just to be sure)
    timeslots_list = list(course_map.keys())
    timeslots_list.sort()

    for timeslot_start_end in timeslots_list:
 
        
        # print(course_map[timeslot_start_end])
        #     print("Checking for", dow, timeslot_start_end)

        # Print course name with timeslot
        # print_line1(course_map, timeslot_start_end, dow_list)
        print_generic_line(course_map, timeslot_start_end, dow_list, "subject", True)

        # Print room name without timeslot
        # print_line2(course_map, timeslot_start_end, dow_list)
        print_generic_line(course_map, timeslot_start_end, dow_list, "room.name", False)

        # Print teacher name without timeslot
        # print_line3(course_map, timeslot_start_end, dow_list)
        print_generic_line(course_map, timeslot_start_end, dow_list, "teacher", False)
        
        print((("|" + ("-" * 13)) * (len(dow_list) + 1)) + "|")

        
    unassigned_courses = list(
    filter(lambda unassigned_course: unassigned_course.timeslot is None or unassigned_course.room is None,
            course_list))
    if len(unassigned_courses) > 0:
        print()
        print("Unassigned courses")
        for course in unassigned_courses:
            print(" " + course.subject + " - " + course.teacher + " - " + course.student_group)

        

    

def find_similar_object(a_list, obj):
    filtered_list = list(filter(lambda elem: elem if elem.__str__() == obj.__str__() else None, a_list))
    return filtered_list


def load_solution():
    inFile = open("sampleSolution.json")
    data = json.load(inFile)
    inFile.close()

    timeslot_list = []
    for ts in data["timeslot_list"]:
        start_time = datetime.datetime.strptime(ts["start_time"], "%H:%M:%S").time()
        end_time = datetime.datetime.strptime(ts["end_time"], "%H:%M:%S").time()

        timeslot_list.append(Timeslot(ts["id"], ts["day_of_week"], start_time, end_time))

    # print("Got timeslot list", list(map(lambda ts: ts.__str__(), timeslot_list)))

    room_list = []
    for r in data["room_list"]:
        room_list.append(Room(r["id"], r["name"], r["type"]))

    # print("Got room list", list(map(lambda ts: ts.__str__(), room_list)))

    course_list = []
    for l in data["course_list"]:
        ts = l["timeslot"]

        start_time = datetime.datetime.strptime(ts["start_time"], "%H:%M:%S").time()
        end_time = datetime.datetime.strptime(ts["end_time"], "%H:%M:%S").time()

        curr_timeslot = Timeslot(ts["id"], ts["day_of_week"], start_time, end_time)

        # Find the corresponding reference of object in timeslot_list
        filtered_list = find_similar_object(timeslot_list, curr_timeslot)

        # Use the one returned as the reference
        curr_timeslot = filtered_list[0]


        r = l["room"]
        curr_room = Room(r["id"], r["name"], r["type"])

        # Find the corresponding reference of object in room_list
        filtered_list = find_similar_object(room_list, curr_room)

        # print(filtered_list[0].__str__())

        # Use the one returned as the reference
        curr_room = filtered_list[0]



        curr_course = Course(l["id"], l["subject"], l["teacher"], l["type"], l["student_group"], curr_timeslot, curr_room)

        course_list.append(curr_course)
        # print("Adding curr course", curr_course.__str__())

    timetable = TimeTable(timeslot_list, room_list, course_list)
    
    return timetable


def main():
    timetable = load_solution()
    print_timetable_indian_style(timetable)
    # print_timetable(timetable)

if __name__ == "__main__":
    main()
