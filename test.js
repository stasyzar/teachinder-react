import {
  formatTeachers,
  validateTeacher,
  filterTeachers,
  sortTeachers,
  findTeacher,
  getTeacherPercentage,
} from "./src/services/teacherService.js";

console.log("========================================");
console.log("TASK 1: Format & Deduplicate Teachers");
console.log("========================================");
const teachers = formatTeachers();
console.log("Total normalized teachers:", teachers.length);
console.log("Sample teacher:", {
  id: teachers[0].id,
  full_name: teachers[0].full_name,
  gender: teachers[0].gender,
  course: teachers[0].course,
  age: teachers[0].age,
  country: teachers[0].country,
  phone: teachers[0].phone,
});

console.log("");
console.log("========================================");
console.log("TASK 2: Validate Teachers");
console.log("========================================");
const validTeachers = teachers.filter(validateTeacher);
console.log("Valid teachers:", validTeachers.length + " / " + teachers.length);
console.log("Validate first teacher:", validateTeacher(teachers[0]));
console.log("Validate invalid teacher (negative age):", validateTeacher({ ...teachers[0], age: -5 }));
console.log("Validate invalid teacher (invalid email):", validateTeacher({ ...teachers[0], email: "invalid-email" }));

console.log("");
console.log("========================================");
console.log("TASK 3: Filter Teachers");
console.log("========================================");
const germanyTeachers = filterTeachers(teachers, { country: "Germany" });
console.log("Filter { country: 'Germany' } count:", germanyTeachers.length);
console.log("Names:", germanyTeachers.map((t) => t.full_name));

const femaleTeachers = filterTeachers(teachers, { gender: "Female" });
console.log("Filter { gender: 'Female' } count:", femaleTeachers.length);

const favoriteTeachers = filterTeachers(teachers, { favorite: true });
console.log("Filter { favorite: true } count:", favoriteTeachers.length);

console.log("");
console.log("========================================");
console.log("TASK 4: Sort Teachers");
console.log("========================================");
const sortedByName = sortTeachers(teachers, "full_name", "asc");
console.log("Sorted by full_name (asc, top 3):", sortedByName.slice(0, 3).map((t) => t.full_name));

const sortedByAgeDesc = sortTeachers(teachers, "age", "desc");
console.log(
  "Sorted by age (desc, top 3):",
  sortedByAgeDesc.slice(0, 3).map((t) => t.full_name + " (" + t.age + ")")
);

const sortedByDate = sortTeachers(teachers, "b_date", "asc");
console.log(
  "Sorted by b_date (asc, top 3):",
  sortedByDate.slice(0, 3).map((t) => t.full_name + " (" + (t.b_date ? t.b_date.slice(0, 10) : "") + ")")
);

console.log("");
console.log("========================================");
console.log("TASK 5: Find Teacher");
console.log("========================================");
const foundByName = findTeacher(teachers, "Norbert");
console.log("Search 'Norbert':", foundByName ? foundByName.full_name + ", age " + foundByName.age : null);

const foundByAge = findTeacher(teachers, 65);
console.log("Search 65 (number):", foundByAge ? foundByAge.full_name + ", age " + foundByAge.age : null);

const foundByAgeStr = findTeacher(teachers, "65");
console.log("Search '65' (string):", foundByAgeStr ? foundByAgeStr.full_name + ", age " + foundByAgeStr.age : null);

const notFound = findTeacher(teachers, "NonExistentUser123");
console.log("Search 'NonExistentUser123':", notFound);

console.log("");
console.log("========================================");
console.log("TASK 6: Teacher Percentage");
console.log("========================================");
const percentAgeOver30 = getTeacherPercentage(teachers, (t) => t.age > 30);
console.log("Percentage age > 30:", percentAgeOver30 + "%");

const percentNorbert = getTeacherPercentage(teachers, "Norbert");
console.log("Percentage query 'Norbert':", percentNorbert + "%");

const percentAge65 = getTeacherPercentage(teachers, 65);
console.log("Percentage query 65:", percentAge65 + "%");

console.log("Percentage without condition:", getTeacherPercentage(teachers) + "%");
console.log("========================================");
