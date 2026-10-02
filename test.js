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
console.log("Total normalized teachers:", teachers.length);
console.log("First " + LIMIT + " teachers:");
console.table(
  teachers.slice(0, LIMIT).map((t) => ({
    Name: t.full_name,
    Gender: t.gender,
    Age: t.age,
    Country: t.country,
    Course: t.course,
    Phone: t.phone,
  }))
);

console.log("");
console.log("================================================================================");
console.log("TASK 2: VALIDATE TEACHERS");
console.log("================================================================================");
const validTeachers = teachers.filter(validateTeacher);
const invalidTeachers = teachers.filter((t) => !validateTeacher(t));
console.log("Valid teachers:", validTeachers.length + " / " + teachers.length);
console.log("Invalid teachers count:", invalidTeachers.length);
console.log("Sample invalid teachers (failed phone format or missing fields):");
console.table(
  invalidTeachers.slice(0, LIMIT).map((t) => ({
    Name: t.full_name,
    Country: t.country,
    Phone: t.phone,
    Valid: validateTeacher(t),
  }))
);
console.log("Validate first teacher:", validateTeacher(teachers[0]));
console.log("Validate fake teacher (age = -5):", validateTeacher({ ...teachers[0], age: -5 }));
console.log("Validate fake teacher (invalid email):", validateTeacher({ ...teachers[0], email: "not-an-email" }));

console.log("");
console.log("================================================================================");
console.log("TASK 3: FILTER TEACHERS (LOGICAL AND)");
console.log("================================================================================");
const germanyTeachers = filterTeachers(teachers, { country: "Germany" });
console.log("Filter: { country: 'Germany' } -> found " + germanyTeachers.length);
console.table(
  germanyTeachers.slice(0, LIMIT).map((t) => ({
    Name: t.full_name,
    Gender: t.gender,
    Age: t.age,
    Country: t.country,
    Course: t.course,
  }))
);

const femaleTeachers = filterTeachers(teachers, { gender: "Female" });
console.log("Filter: { gender: 'Female' } -> found " + femaleTeachers.length + " (showing first " + LIMIT + ")");
console.table(
  femaleTeachers.slice(0, LIMIT).map((t) => ({
    Name: t.full_name,
    Gender: t.gender,
    Age: t.age,
    Country: t.country,
  }))
);

console.log("");
console.log("================================================================================");
console.log("TASK 4: SORT TEACHERS");
console.log("================================================================================");
const sortedByName = sortTeachers(teachers, "full_name", "asc");
console.log("Sort: full_name (asc, first " + LIMIT + "):");
console.table(
  sortedByName.slice(0, LIMIT).map((t) => ({
    Name: t.full_name,
    Age: t.age,
    Country: t.country,
  }))
);

const sortedByAgeDesc = sortTeachers(teachers, "age", "desc");
console.log("Sort: age (desc, first " + LIMIT + "):");
console.table(
  sortedByAgeDesc.slice(0, LIMIT).map((t) => ({
    Name: t.full_name,
    Age: t.age,
    Country: t.country,
  }))
);

const sortedByDate = sortTeachers(teachers, "b_date", "asc");
console.log("Sort: b_date (asc, first " + LIMIT + "):");
console.table(
  sortedByDate.slice(0, LIMIT).map((t) => ({
    Name: t.full_name,
    BirthDate: t.b_date ? t.b_date.slice(0, 10) : null,
    Age: t.age,
  }))
);

console.log("");
console.log("================================================================================");
console.log("TASK 5: FIND TEACHER");
console.log("================================================================================");
const searchTests = [
  { label: "Search by name 'Norbert'", result: findTeacher(teachers, "Norbert") },
  { label: "Search by age number 65", result: findTeacher(teachers, 65) },
  { label: "Search by age string '65'", result: findTeacher(teachers, "65") },
  { label: "Search non-existent", result: findTeacher(teachers, "NonExistentUser123") },
];
console.table(
  searchTests.map((st) => ({
    Test: st.label,
    FoundName: st.result ? st.result.full_name : "null",
    FoundAge: st.result ? st.result.age : "null",
    FoundCountry: st.result ? st.result.country : "null",
  }))
);

console.log("");
console.log("================================================================================");
console.log("TASK 6: PERCENTAGE OF TEACHERS");
console.log("================================================================================");
const percentageTests = [
  { Condition: "Age > 30", Percentage: getTeacherPercentage(teachers, (t) => t.age > 30) + "%" },
  { Condition: "Query: 'Norbert'", Percentage: getTeacherPercentage(teachers, "Norbert") + "%" },
  { Condition: "Query: 65", Percentage: getTeacherPercentage(teachers, 65) + "%" },
  { Condition: "No condition", Percentage: getTeacherPercentage(teachers) + "%" },
];
console.table(percentageTests);
console.log("================================================================================");
