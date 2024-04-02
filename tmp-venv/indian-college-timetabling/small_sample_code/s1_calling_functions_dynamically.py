# This sample code demonstrates how we can use a string (representing a conflict function)
# to be called dynamically.

# This will help us take the "conflict function name" from the input JSON and
# dynamically call it adding its return value to the array of constraints as
# required by constraint factory

def room_conflict(p1):
    print("room_conflict called with parameter", p1)
    return "This is return value from room_conflict"

def teacher_conflict(p1):
    print("teacher_conflict called with parameter", p1)
    return "This is return value from teacer_conflict"


conf_name = "room_conflict"
ret = globals()[conf_name](123)
print(conf_name, "returned", ret)

conf_name = "teacher_conflict"
globals()[conf_name](345)
print(conf_name, "returned", ret)