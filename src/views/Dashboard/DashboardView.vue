<script setup>
import { ref } from 'vue';
import storageUtility from '../../utils/storageUtility';

const allHabits = ref([])

function loadAllData() {
  allHabits.value = storageUtility.getData()
}

function deleteHabit(habitName) {
  storageUtility.deleteHabit(habitName)
  loadAllData()
}
loadAllData()

</script>

<template>
  <h1>Your Habit List</h1>
    <ul>
      <li class="habit-card" v-for="(habit, index) in allHabits" :key="index">
        {{ habit.name }}
        <button @click="deleteHabit(habit.name)" type="button" class="delete-btn">Delete habit</button>
      </li>
    </ul>
</template>

<style scoped>

ul {
  list-style: none;
  padding: 0;
  margin: 2rem 0;
}

.habit-card {
  background: rgb(0 128 128);
  border-radius: 5px;
  color: white;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  margin: 0.5rem 0;
}

.delete-btn {
  background-color: #ff6347;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease;
  outline: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  border: none;
}

.complete-btn:hover,
.complete-btn:focus {
  background-color: #e55a3c;
}

</style>
