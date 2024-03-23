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

  const newHabitObject = {
    name: newHabit.value.trim(),
    dateAdded: props.id,
    dates: []
  };

  const data = JSON.parse(localStorage.getItem('user')) || [];
  const doesHabitExist = data.some((habit) => habit.name === newHabitObject.name);

  if (!doesHabitExist) {
    data.push(newHabitObject);
    localStorage.setItem('user', JSON.stringify(data));
    newHabit.value = '';
  } else {
    alert('Habit already exist');
  }
}
</script>

<template>
  <h1>Add Habit To Your Day</h1>
  <form class="wrapper" @submit.prevent="addHabit">
    <label for="habitName">Enter new habit</label>
    <div class="form-bottom">
      <input type="text" id="habitName" placeholder="Your new habit" v-model="newHabit" />
    <button type="submit">Add Habit</button>
    </div>
    
  </form>
</template>

<style scoped>
h1 {
  text-align: center;
}

.wrapper {
  max-width: 360px; 
  margin: 40px auto; 
  padding: 20px;
  background-color: #ffffff; 
  border: 1px solid #eaeaea; 
  border-radius: 12px; 
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05); 
}

label {
  font-size: 1rem; 
  color: #555; 
  margin-bottom: 0.5rem; 
  display: block; 
}

input {
  padding: 12px; 
  border: 2px solid #f0f0f0; 
  border-radius: 0.5rem; 
  transition: border-color 0.3s;
}

input:focus {
  border-color: #a0a0a0; 
  outline: none; 
}

button {
  background-color: #FF6B6B; 
  color: #ffffff; 
  padding: 12px 1.5rem; 
  border: none; 
  border-radius: 0.5rem; 
  cursor: pointer;
  transition: background-color 0.3s; 
  margin-left: 0.5rem;
}

button:hover {
  background-color: #E25555;
}

.form-bottom {
  display: flex;
  margin-bottom: 1rem;
}
</style>
