import { ref } from 'vue';

export const setDayHabits = (day) => localStorage.setItem('user', JSON.stringify(day));

// export const getDayInformation = useStorage('user', []);
// export const test = 'test';

// export function getDayInformation(date) {
//   const data = useStorage('user', []);

//   let dayInfo = data.value.find((day) => day.id === date);

//   if (!dayInfo) {
//     dayInfo = { id: date, habits: [] };
//     data.value.push(dayInfo);
//   }

//   return ref(dayInfo);
// }

// export const setDayHabits = (day) => localStorage.setItem('user', JSON.stringify(day));

// export const getDayInformation = (date) => {
//   let data = localStorage.getItem('user');
//   if (data === null) {
//     data = [];
//     localStorage.setItem('user', JSON.stringify(data));
//   } else {
//     data = JSON.parse(data);
//   }
//   const dayInformation = data.find((day) => day.id === date);
//   return dayInformation || { id: date, habits: [] };
// };
