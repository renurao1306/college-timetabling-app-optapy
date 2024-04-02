# In this sample, we are showing how to access members of a 
# class dynamically knowing only its name as a string (e.g., "subject" of a Course
# object).

# We will also handle the case where we want a nested member's member (e.g., "name" of
# a "room" inside a Course object)

import os
import sys

# Some jugglery here since the classes are in domain.py in parent directory
parent_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(parent_dir)

from domain import Course, Room

# Create the inner Room object first
r1 = Room(11, "CR-47", "Classroom")
          
# Access the name member of the room using a string
member_name = "name"
val = getattr(r1, member_name)
print("Room", member_name, "is", val)

# Get the type of the room
member_name = "type"
val = getattr(r1, member_name)
print("Room", member_name, "is", val)


# Now, create a nested object containing the Room object (timeslot is None)
c1 = Course(12, "Python Programming", "Mr. Serpent", "Classroom", "MCA-SEM1", None, r1)

# Now, write a small function to decode member names of the form "x.y.z.a"
# Below will work even for non-nested members (e.g., room's name)
def get_nested_attr(obj, member_name):
    mem_names = member_name.split(".")
    for i in mem_names:
        obj = getattr(obj, i)

    return obj

# Test that it works
member_name = "room.name"
val = get_nested_attr(c1, member_name)
print("Course", member_name, "is", val)



