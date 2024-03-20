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

function toggleHabitStatus(index) {
  const habit = recordedHabits.value[0].habits[index];
  habit.completed = !habit.completed;

  const data = JSON.parse(localStorage.getItem('user'));
  const currentDayData = data.find((day) => day.id === props.id);

  currentDayData.habits = recordedHabits.value[0].habits;
  localStorage.setItem('user', JSON.stringify(data));
}

watchEffect(() => {
  loadDayData(props.id);
});
</script>

<template>
  <main class="day-container">
    <h3>Daily Habits</h3>
    <div v-if="recordedHabits.length > 0" class="habits-wrapper">
      <ul>
        <li class="habit-card" v-for="(habit, index) in recordedHabits[0].habits" :key="index">
          <div class="habit-card-details">
            <h4>{{ habit.name }}</h4>
            <h5>Completed: {{ habit.completed ? 'Yes' : 'No' }}</h5>
          </div>
          <button @click="toggleHabitStatus(index)" type="button">toggle status</button>
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
}

.habits-wrapper {
  margin: 1rem 0;
}

ul {
  list-style: none;
  padding: 0;
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

.btn-wrapper {
  border: 1px solid red;
  border-radius: 5px;
  margin-top: 2rem;
}
</style>
