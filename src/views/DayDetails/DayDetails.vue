<script setup>
import { ref, watchEffect } from 'vue';
import { RouterLink } from 'vue-router';
import storageUtility from '../../utils/storageUtility';
import HabitCard from './HabitCard.vue';

const props = defineProps({
  id: {
    type: String,
    default: () => new Date().toISOString().slice(0, 10)
  }
});

const userHabits = ref([]);
const recordedDayHabits = ref([]);

function loadDayData() {
  const data = storageUtility.getData();

  userHabits.value = data;
  recordedDayHabits.value = data.filter((habit) => habit.dateAdded <= props.id);
}

watchEffect(() => {
  loadDayData();
});
</script>

<template>
  <main class="day-container">
    <div class="day-header">
      <h1>Daily Habits</h1>
      <RouterLink :to="{ name: 'Dashboard' }"
        ><button type="button" class="home-btn">Home</button></RouterLink
      >
    </div>
    <div v-if="recordedDayHabits.length > 0" class="habits-wrapper">
      <ul>
        <HabitCard
          v-for="(habit, index) in recordedDayHabits"
          :key="index"
          :habit="habit"
          :date="props.id"
          :allHabits="userHabits"
        />
      </ul>
    </div>
    <div v-else>This day has no recorded habits</div>
  </main>

  <div class="bottom-wrapper">
    <RouterLink :to="{ name: 'AddHabit', params: { id } }"
      ><button type="button" class="add-habit-btn">Add habit</button></RouterLink
    >
  </div>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  margin-top: 3rem;
}

.day-header {
  display: flex;
  justify-content: space-between;
}

.home-btn,
.add-habit-btn {
  background-color: rgb(38 186 38);
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease;
  outline: none;
  padding: 1rem;
  border-radius: 5px;
  border: none;
  height: 100%;
}

.home-btn:focus,
.home-btn:hover,
.add-habit-btn:focus,
.add-habit-btn:hover {
  background-color: rgb(28 125 28);
}

.habits-wrapper {
  margin: 1rem 0;
}

ul {
  list-style: none;
  padding: 0;
}

.bottom-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}
</style>
