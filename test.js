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
console.log("TASK 1");
console.log("================================================================================");
console.log("Displaying first " + LIMIT + " formatted teacher objects:");
console.dir(teachers.slice(0, LIMIT), { depth: null });

console.log("");
console.log("================================================================================");
console.log("TASK 2");
console.log("================================================================================");
const validTeachers = teachers.filter(validateTeacher);
const invalidTeachers = teachers.filter((t) => !validateTeacher(t));
console.log("Valid teachers count:", validTeachers.length + " / " + teachers.length);
console.log("Invalid teachers count:", invalidTeachers.length);
console.log("Sample invalid teachers:");
invalidTeachers.slice(0, LIMIT).forEach((t, i) => {
  console.log("  " + (i + 1) + ". " + t.full_name + " (" + t.country + ") - phone: " + t.phone + " -> validate: " + validateTeacher(t));
});
console.log("");
console.log("Test validations:");
console.log("  Valid teacher:", validateTeacher(teachers[0]));
console.log("  Invalid teacher (age = -5):", validateTeacher({ ...teachers[0], age: -5 }));
console.log("  Invalid teacher (email = 'bad_email'):", validateTeacher({ ...teachers[0], email: "bad_email" }));
console.log("  Invalid teacher (gender = 'male' lowercase):", validateTeacher({ ...teachers[0], gender: "male" }));

console.log("");
console.log("================================================================================");
console.log("TASK 3");
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

console.log("");
console.log("================================================================================");
console.log("TASK 4");
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
console.log("TASK 5");
console.log("================================================================================");
const found1 = findTeacher(teachers, "Norbert");
console.log("Search 'Norbert':");
console.log(found1);

console.log("");
const found2 = findTeacher(teachers, 65);
console.log("Search 65:");
console.log(found2 ? found2 : null);

console.log("");
const found3 = findTeacher(teachers, "65");
console.log("Search '65':");
console.log(found3 ? found3 : null);

console.log("");
const found4 = findTeacher(teachers, "NonExistentUser123");
console.log("Search 'NonExistentUser123':", found4);

console.log("");
console.log("================================================================================");
console.log("TASK 6");
console.log("================================================================================");
console.log("Percentage age > 30:", getTeacherPercentage(teachers, (t) => t.age > 30) + "%");
console.log("Percentage query 'Norbert':", getTeacherPercentage(teachers, "Norbert") + "%");
console.log("Percentage query 65:", getTeacherPercentage(teachers, 65) + "%");
console.log("================================================================================");
