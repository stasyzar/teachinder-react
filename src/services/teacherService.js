import { randomUserMock, additionalUsers } from "../data/FE4U-Lab2-mock.js";
import _ from "lodash";

const COURSES = [
  "Mathematics",
  "Physics",
  "English",
  "Computer Science",
  "Dancing",
  "Chess",
  "Biology",
  "Chemistry",
  "Law",
  "Art",
  "Medicine",
  "Statistics",
];

function getRandomCourse() {
  const index = Math.floor(Math.random() * COURSES.length);
  return COURSES[index];
}

function calculateAge(dateString) {
  if (!dateString) return null;
  const birth = new Date(dateString);
  if (isNaN(birth.getTime())) return null;
  const diff = Date.now() - birth.getTime();
  const ageDate = new Date(diff);
  return ageDate.getUTCFullYear() - 1970;
}

function normalizeUser(user, index) {
  const fullName = user.full_name || (user.name ? `${user.name.first} ${user.name.last}` : null);
  const bDate = user.b_date || user.b_day || user.dob?.date || null;
  const age = typeof user.age === "number" ? user.age : (user.dob?.age ?? calculateAge(bDate));
  const course = user.course || getRandomCourse();
  const id = user.id?.value || (typeof user.id === "string" ? user.id : user.login?.uuid || `user_${index + 1}`);

  return {
    id,
    gender: user.gender ? user.gender[0].toUpperCase() + user.gender.slice(1) : null,
    title: user.title || user.name?.title || null,
    full_name: fullName,
    city: user.city || user.location?.city || null,
    state: user.state || user.location?.state || null,
    country: user.country || user.location?.country || null,
    postcode: user.postcode || user.location?.postcode || null,
    coordinates: user.coordinates || user.location?.coordinates || null,
    timezone: user.timezone || user.location?.timezone || null,
    email: user.email || null,
    b_date: bDate,
    age,
    phone: user.phone || null,
    picture_large: user.picture_large || user.picture?.large || null,
    picture_thumbnail: user.picture_thumbnail || user.picture?.thumbnail || null,
    favorite: typeof user.favorite === "boolean" ? user.favorite : false,
    course,
    bg_color: user.bg_color || "#ffffff",
    note: user.note || null,
  };
}

export function formatTeachers(primUsers = randomUserMock, secUsers = additionalUsers) {
  const map = new Map();
  const allUsers = [...secUsers, ...primUsers];

  allUsers.forEach((user, index) => {
    const normalized = normalizeUser(user, index);
    const key = normalized.full_name ? normalized.full_name.toLowerCase() : normalized.id;

    if (!map.has(key)) {
      map.set(key, normalized);
    } else {
      const existing = map.get(key);
      for (const prop in normalized) {
        if (!existing[prop] && normalized[prop]) {
          existing[prop] = normalized[prop];
        }
      }
    }
  });

  return Array.from(map.values());
}

const phoneFormats = {
  Germany: /^\d{4}-\d{7}$/,
  Ireland: /^\d{3}-\d{3}-\d{4}$/,
  Australia: /^\d{2}-\d{4}-\d{4}$/,
  "United States": /^\(\d{3}\)-\d{3}-\d{4}$/,
  Finland: /^\d{2}-\d{3}-\d{3}$/,
  Turkey: /^\(\d{3}\)-\d{3}-\d{4}$/,
  Switzerland: /^\d{3}\s\d{3}\s\d{2}\s\d{2}$/,
  "New Zealand": /^\(\d{3}\)-\d{3}-\d{4}$/,
  Spain: /^\d{3}-\d{3}-\d{3}$/,
  Norway: /^\d{8}$/,
  Denmark: /^\d{8}$/,
  Iran: /^\d{3}-\d{8}$/,
  Canada: /^\d{3}-\d{3}-\d{4}$/,
  France: /^\d{2}-\d{2}-\d{2}-\d{2}-\d{2}$/,
  Netherlands: /^\(\d{3}\)-\d{3}-\d{4}$/,
  Ukraine: /^\d{3}-\d{3}-\d{2}-\d{2}$/,
  "United Kingdom": /^\(\d{3}\)-\d{3}-\d{4}$/,
  Brazil: /^\(\d{2}\)\s\d{4}-\d{4}$/,
  Italy: /^\d{3}-\d{3}-\d{4}$/,
  Mexico: /^\(\d{3}\)\s\d{3}-\d{4}$/,
  Sweden: /^\d{3}-\d{2}-\d{2}$/,
  Belgium: /^\(\d{3}\)\s\d{3}-\d{4}$/,
  Austria: /^\(\d{3}\)\s\d{3}-\d{4}$/,
  Poland: /^\(\d{3}\)\s\d{3}-\d{4}$/,
  Portugal: /^\(\d{3}\)\s\d{3}-\d{4}$/,
  Greece: /^\(\d{3}\)\s\d{3}-\d{4}$/,
  Japan: /^\(\d{3}\)\s\d{3}-\d{4}$/,
  China: /^\(\d{3}\)\s\d{3}-\d{4}$/,
  India: /^\(\d{3}\)\s\d{3}-\d{4}$/,
  SouthKorea: /^\(\d{3}\)\s\d{3}-\d{4}$/,
};

function isCapitalized(value) {
  if (!_.isString(value) || _.isEmpty(value)) return false;
  return /^[\p{Lu}\p{Lo}]/u.test(value);
}

export function validateTeacher(teacher) {
  if (!_.isObject(teacher)) return false;

  const stringFields = ["full_name", "gender", "state", "city", "country"];
  const allStringsValid = _.every(stringFields, (field) => isCapitalized(teacher[field]));
  
  if (!allStringsValid) return false;

  if (!_.isNil(teacher.note) && !isCapitalized(teacher.note)) {
    return false;
  }
  if (!_.isNumber(teacher.age) || _.isNaN(teacher.age) || teacher.age <= 0) {
    return false;
  }
  if (!_.isString(teacher.email) || !_.includes(teacher.email, "@")) {
    return false;
  }

  if (!_.isString(teacher.phone)) {
    return false;
  }
  const format = phoneFormats[teacher.country];
  if (format && !format.test(teacher.phone)) {
    return false;
  }
  return true;
}

export function filterTeachers(teachers, filters = {}) {
  if (!_.isArray(teachers)) return [];
  return _.filter(teachers, (teacher) => {
    if (filters.country && filters.country !== "All" && _.toLower(teacher.country) !== _.toLower(filters.country)) {
      return false;
    }
    if (filters.gender && filters.gender !== "All" && _.toLower(teacher.gender) !== _.toLower(filters.gender)) {
      return false;
    }
    if (!_.isNil(filters.age) && filters.age !== "All") {
      if (_.isNumber(filters.age)) {
        if (teacher.age !== filters.age) return false;
      } else if (filters.age === "18-31") {
        if (!_.inRange(teacher.age, 18, 32)) return false;
      } else if (filters.age === "32-45") {
        if (!_.inRange(teacher.age, 32, 46)) return false;
      } else if (filters.age === "46+") {
        if (teacher.age < 46) return false;
      }
    }
    if (filters.favorite && !teacher.favorite) {
      return false;
    }
    if (filters.hasPhoto && !teacher.picture_large) {
      return false;
    }
    return true;
  });
}

export function sortTeachers(teachers, sortBy = "full_name", order = "asc") {
  return _.orderBy(teachers, [sortBy], [order]);
}

export function findTeacher(teachers, query) {
const q = String(query).toLowerCase();
  return _.find(teachers, (teacher) =>
    _.includes(_.toLower(teacher.full_name), q) ||
    _.includes(_.toLower(teacher.note), q) ||
    teacher.age == query
  );
}

export function getTeacherPercentage(teachers, condition) {
  if (!teachers || teachers.length === 0 || !condition) return 0;

  const matched = teachers.filter((teacher) => {
    if (_.isFunction(condition)) {
      return condition(teacher);
    }
    const q = String(condition).toLowerCase();
    return (
      _.includes(_.toLower(teacher.full_name), q) ||
      _.includes(_.toLower(teacher.note), q) ||
      teacher.age == condition
    );
  });

  return Math.round((matched.length / teachers.length) * 100);
}
