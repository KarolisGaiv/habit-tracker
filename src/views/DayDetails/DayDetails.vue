<script setup>
import { ref, watchEffect } from 'vue';
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
    <h3>Daily Habits</h3>
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

  <div class="btn-wrapper">
    <p>placeholder for add habit btn</p>
    <RouterLink :to="{ name: 'AddHabit', params: { id } }"
      ><button type="button">Add habit</button></RouterLink
    >
  </div>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
}

.habits-wrapper {
  margin: 1rem 0;
}

ul {
  list-style: none;
  padding: 0;
}

.btn-wrapper {
  border: 1px solid red;
  border-radius: 5px;
  margin-top: 2rem;
}
</style>
