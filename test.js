import {
  formatTeachers,
  validateTeacher,
  filterTeachers,
  sortTeachers,
  findTeacher,
  getTeacherPercentage,
} from "./src/services/teacherService.js";

const LIMIT = 10;

const teachers = formatTeachers();

console.log("================================================================================");
console.log("TASK 1: FORMAT & DEDUPLICATE TEACHERS");
console.log("================================================================================");
console.log("Merged teachers count:", teachers.length, "(duplicates Norbert Weishaupt and Claude Payne removed)");
console.log("");
console.log("Unified fields in each teacher object (" + Object.keys(teachers[0]).length + " fields):");
console.log(Object.keys(teachers[0]));
console.log("");
const allIdenticalKeys = teachers.every(
  (t) => JSON.stringify(Object.keys(t)) === JSON.stringify(Object.keys(teachers[0]))
);
console.log("Do all " + teachers.length + " objects have the exact same structure?", allIdenticalKeys);
console.log("");
console.log("Data types sample of first object:");
for (const [key, value] of Object.entries(teachers[0])) {
  const type = Array.isArray(value) ? "array" : typeof value;
  console.log("  " + key + ": " + type + " -> " + JSON.stringify(value));
}
console.log("");
console.log("Displaying first " + LIMIT + " formatted teacher objects:");
console.dir(teachers.slice(0, LIMIT), { depth: null });

console.log("");
console.log("================================================================================");
console.log("TASK 2: VALIDATE TEACHERS");
console.log("================================================================================");
const validTeachers = teachers.filter(validateTeacher);
const invalidTeachers = teachers.filter((t) => !validateTeacher(t));
console.log("Valid teachers count:", validTeachers.length + " / " + teachers.length);
console.log("Invalid teachers count:", invalidTeachers.length);
console.log("Sample invalid teachers (why invalid: phone format doesn't match country regex):");
invalidTeachers.slice(0, LIMIT).forEach((t, i) => {
  console.log("  " + (i + 1) + ". " + t.full_name + " (" + t.country + ") - phone: " + t.phone + " -> validate: " + validateTeacher(t));
});
console.log("");
console.log("Unit test validations:");
console.log("  Valid teacher (Norbert):", validateTeacher(teachers[0]));
console.log("  Invalid teacher (age = -5):", validateTeacher({ ...teachers[0], age: -5 }));
console.log("  Invalid teacher (email = 'bad_email'):", validateTeacher({ ...teachers[0], email: "bad_email" }));
console.log("  Invalid teacher (gender = 'male' lowercase):", validateTeacher({ ...teachers[0], gender: "male" }));

console.log("");
console.log("================================================================================");
console.log("TASK 3: FILTER TEACHERS (LOGICAL AND)");
console.log("================================================================================");
const germanyTeachers = filterTeachers(teachers, { country: "Germany" });
console.log("Filter { country: 'Germany' } -> " + germanyTeachers.length + " teachers:");
germanyTeachers.slice(0, LIMIT).forEach((t, i) => {
  console.log("  " + (i + 1) + ". " + t.full_name + ", " + t.gender + ", " + t.age + " y.o., " + t.country + ", Course: " + t.course);
});

const femaleTeachers = filterTeachers(teachers, { gender: "Female" });
console.log("");
console.log("Filter { gender: 'Female' } -> " + femaleTeachers.length + " teachers (first " + LIMIT + "):");
femaleTeachers.slice(0, LIMIT).forEach((t, i) => {
  console.log("  " + (i + 1) + ". " + t.full_name + ", " + t.age + " y.o., " + t.country);
});

const favoriteTeachers = filterTeachers(teachers, { favorite: true });
console.log("");
console.log("Filter { favorite: true } -> " + favoriteTeachers.length + " teachers");

console.log("");
console.log("================================================================================");
console.log("TASK 4: SORT TEACHERS");
console.log("================================================================================");
const sortedByName = sortTeachers(teachers, "full_name", "asc");
console.log("Sorted by full_name (asc, first " + LIMIT + "):");
sortedByName.slice(0, LIMIT).forEach((t, i) => {
  console.log("  " + (i + 1) + ". " + t.full_name + " (" + t.country + ")");
});

const sortedByAgeDesc = sortTeachers(teachers, "age", "desc");
console.log("");
console.log("Sorted by age (desc, first " + LIMIT + "):");
sortedByAgeDesc.slice(0, LIMIT).forEach((t, i) => {
  console.log("  " + (i + 1) + ". " + t.full_name + " (" + t.age + " y.o.)");
});

const sortedByDate = sortTeachers(teachers, "b_date", "asc");
console.log("");
console.log("Sorted by b_date (asc, first " + LIMIT + "):");
sortedByDate.slice(0, LIMIT).forEach((t, i) => {
  console.log("  " + (i + 1) + ". " + t.full_name + " (Birth date: " + (t.b_date ? t.b_date.slice(0, 10) : "null") + ")");
});

console.log("");
console.log("================================================================================");
console.log("TASK 5: FIND TEACHER");
console.log("================================================================================");
const found1 = findTeacher(teachers, "Norbert");
console.log("Search 'Norbert' (string):");
console.log(found1);

console.log("");
const found2 = findTeacher(teachers, 65);
console.log("Search 65 (number):");
console.log(found2 ? found2.full_name + ", age " + found2.age + ", country " + found2.country : null);

console.log("");
const found3 = findTeacher(teachers, "65");
console.log("Search '65' (string age):");
console.log(found3 ? found3.full_name + ", age " + found3.age + ", country " + found3.country : null);

console.log("");
const found4 = findTeacher(teachers, "NonExistentUser123");
console.log("Search 'NonExistentUser123':", found4);

console.log("");
console.log("================================================================================");
console.log("TASK 6: PERCENTAGE OF TEACHERS");
console.log("================================================================================");
console.log("Percentage age > 30:", getTeacherPercentage(teachers, (t) => t.age > 30) + "%");
console.log("Percentage query 'Norbert':", getTeacherPercentage(teachers, "Norbert") + "%");
console.log("Percentage query 65:", getTeacherPercentage(teachers, 65) + "%");
console.log("Percentage without condition:", getTeacherPercentage(teachers) + "%");
console.log("================================================================================");
