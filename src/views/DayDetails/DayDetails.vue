<script setup>
import { ref, watchEffect } from 'vue';

const props = defineProps({
  id: {
    type: String,
    default: () => new Date().toISOString().slice(0, 10)
  }
});

const recordedHabits = ref([]);

function loadDayData(dayID) {
  const data = localStorage.getItem('user');
  if (data) {
    const days = JSON.parse(data);
    const dayInfo = days.find((day) => day.id === dayID);
    recordedHabits.value = dayInfo ? [dayInfo] : [];
  } else {
    recordedHabits.value = [];
  }
}

watchEffect(() => {
  loadDayData(props.id);
});
</script>

<template>
  <main>
    <h1>{{ props.id }}</h1>
    <h3>Daily Habits</h3>
    <div v-if="recordedHabits.length > 0">
      <ul>
        <li v-for="(habit, index) in recordedHabits[0].habits" :key="index">
          {{ habit.name }} - {{ habit.completed }}
        </li>
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
  height: 80vh;
  border: 1px solid orange;
  border-radius: 5px;
}

.btn-wrapper {
  border: 1px solid red;
  border-radius: 5px;
  margin-top: 2rem;
}
</style>
