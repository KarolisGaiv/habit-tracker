<script setup>
import { onMounted, ref, watchEffect } from 'vue';
import { getDayInformation } from '../../utils/localStorage';

const { id } = defineProps({
  id: {
    type: String,
    default: new Date().toDateString()
  }
});

const habitName = ref('');
const habits = ref();

onMounted(() => {
  const storedHabits = getDayInformation(id) || [];
  habits.value = storedHabits;
});

const saveHabit = () => {
  const newHabit = { id, name: habitName.value, done: false };
  if (habits.value.length === 0) {
    setDayHabits(newHabit);
  } else {
    habits.value.push({ id, habits: [newHabit] });
  }
  habitName.value = '';
  setDayHabits(habits.value);
};

watchEffect(() => {
  setDayHabits(habits.value);
});

// const saveHabit = () => {
//   const newHabit = { name: habitName.value, done: false, id: props.id };
//   const dayInformation = habits.value.find((habit) => habit.id === props.id);
//   if (dayInformation) {
//     dayInformation.habits.push(newHabit);
//   } else {
//     habits.value.push({ id: props.id, habits: [newHabit] });
//   }
//   habitName.value = '';
//   localStorage.setItem('user', JSON.stringify(habits.value));
// };

// watchEffect(() => {
//   localStorage.setItem('user', JSON.stringify(habits.value));
// });
</script>

<template>
  <h1>Add new habit to your day</h1>
  <p>selected day is {{ id }}</p>
  <form class="wrapper" @submit.prevent="saveHabit">
    <label for="habitName">New habit</label>
    <input type="text" id="habitName" placeholder="Enter new habit" v-model="habitName" />
    <button type="submit">Add Habit</button>
  </form>
</template>
