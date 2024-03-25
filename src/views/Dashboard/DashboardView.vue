<script setup>
import { ref } from 'vue';
import storageUtility from '../../utils/storageUtility';

const allHabits = ref([]);

function loadAllData() {
  allHabits.value = storageUtility.getData();
}

function deleteHabit(habitName) {
  storageUtility.deleteHabit(habitName);
  loadAllData();
}
loadAllData();
</script>

<template>
  <h1>Your Habit List</h1>
  <transition-group name="habit-list" tag="ul" v-if="allHabits.length > 0">
    <li class="habit-card" v-for="(habit, index) in allHabits" :key="index">
      <div class="habit-details">
        <h2>{{ habit.name }}</h2>
        <h4>First time added: {{ habit.dateAdded }}</h4>
      </div>
      <button @click="deleteHabit(habit.name)" type="button" class="delete-btn">
        Delete habit
      </button>
    </li>
  </transition-group>
  <div v-else class="information-msg">
    <h3>Currently You have no habits saved</h3>
    <h4>Select day to add a habit</h4>
  </div>
</template>

<style scoped>
h1 {
  text-align: center;
}

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

.information-msg {
  text-align: center;
  margin-top: 1rem;
}

.habit-details {
  max-width: 60%;
  overflow-wrap: break-word;
}

.habit-list-enter-active,
.habit-list-leave-active {
  transition: opacity 0.5s;
}

.habit-list-enter,
.habit-list-leave-to {
  opacity: 0;
}
</style>
