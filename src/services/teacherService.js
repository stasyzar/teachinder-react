import { randomUserMock, additionalUsers } from "../data/FE4U-Lab2-mock.js";

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
  const index = Math.floor(Math.random()*COURSES.length);
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

function normalizeUser(user, index){
  const fullName = user.full_name || (user.name ? `${user.name.first} ${user.name.last}` : null);
  const bDate = user.b_date || user.b_day || user.dob?.date || null;
  const age = typeof user.age === "number" ?  user.age :(user.dob?.age ?? calculateAge(bDate));
  const course = user.course || getRandomCourse();
  const id = user.id?.value || (typeof user.id==="string" ? user.id : user.login?.uuid || `user_${index + 1}`);

  return{
    id,
    gender: user.gender ? user.gender[0].toUpperCase() + user.gender.slice(1) : null,
    title: user.title || user.name?.title || null,
    full_name:fullName,
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
  const map  = new Map();
  const allUsers = [...primUsers, ...secUsers];

  allUsers.forEach((user, index) => {
    const normalized = normalizeUser(user,index);
    const key = normalized.full_name ? normalized.full_name.toLowerCase() : normalized.id;

    if(!map.has(key)){
      map.set(key, normalized);
    }
  });

  return Array.from(map.values());
}
