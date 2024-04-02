const fs = require('fs');

// Blocks the event loop
const solution = JSON.parse(fs.readFileSync("../sampleSolution.json"));

console.log(solution);

// Try printing a course from the solution
const course = solution.course_list[0];
console.log("Course 0 is", course)
console.log("Course 0 timeslot is", course.timeslot.id, course.timeslot.day_of_week, course.timeslot.start_time, course.timeslot.end_time);
console.log("Course 0 room is", course.room.id, course.room.name, course.room.type)


