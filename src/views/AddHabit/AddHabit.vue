<script setup>
import { ref } from 'vue';

const props = defineProps({
  id: {
    type: String,
    default: new Date().toDateString()
  }
});

const newHabit = ref('');

function addHabit() {
  if (!newHabit.value.trim()) {
    alert("Habit can't be empty");
    return;
  }

  const newHabitObject = { name: newHabit.value, completed: false };

  const data = JSON.parse(localStorage.getItem('user')) || [];
  const todayData = data.find((entry) => entry.id === props.id);

  if (todayData) {
    todayData.habits.push(newHabitObject);
  } else {
    data.push({ id: props.id, habits: [newHabitObject] });
  }

  localStorage.setItem('user', JSON.stringify(data));
  newHabit.value = '';
}
</script>

<template>
  <h1>Add new habit to your day</h1>
  <p>selected day is {{ id }}</p>
  <form class="wrapper" @submit.prevent="addHabit">
    <label for="habitName">New habit</label>
    <input type="text" id="habitName" placeholder="Enter new habit" v-model="newHabit" />
    <button type="submit">Add Habit</button>
  </form>
</template>
