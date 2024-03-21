<script setup>
import { ref, watchEffect } from 'vue';
import { differenceInDays, parseISO } from 'date-fns';

const props = defineProps({
  id: {
    type: String,
    default: () => new Date().toISOString().slice(0, 10)
  }
});

const recordedHabits = ref([]);

function loadDayData() {
  const data = JSON.parse(localStorage.getItem('user')) || [];

  recordedHabits.value = data.filter((habit) => habit.dateAdded <= props.id);
}

function toggleHabitCompletionStatus(habitToToggle) {
  const currentHabit = recordedHabits.value.find((habit) => habit.name === habitToToggle.name);

  let currentHabitDateEntry = currentHabit.dates.find((entry) => entry.date === props.id);

  if (currentHabitDateEntry) {
    currentHabitDateEntry.completed = !currentHabitDateEntry.completed;
  } else {
    currentHabitDateEntry = {
      date: props.id,
      completed: true
    };
    currentHabit.dates.push(currentHabitDateEntry);
  }

  // sync changes in localStorage
  const storedHabits = JSON.parse(localStorage.getItem('user'));
  const habitInStorage = storedHabits.find((habit) => habit.name === habitToToggle.name);

  habitInStorage.dates = currentHabit.dates;
  localStorage.setItem('user', JSON.stringify(storedHabits));
}

function isHabitCompletedToday(habit) {
  const todayEntry = habit.dates.find((entry) => entry.date === props.id);
  return todayEntry ? todayEntry.completed : false;
}

function countCompletedOccurrences(targetedHabit) {
  const allHabits = JSON.parse(localStorage.getItem('user'));
  const matchingHabit = allHabits.find((hab) => hab.name === targetedHabit.name);
  const completedCount = matchingHabit.dates.reduce((accumulator, date) => {
    return accumulator + (date.completed ? 1 : 0);
  }, 0);
  return completedCount;
}

function countStreak(targetedHabit) {
  const allHabits = JSON.parse(localStorage.getItem('user'));
  const matchingHabit = allHabits.find((hab) => hab.name === targetedHabit.name);

  if (!matchingHabit || matchingHabit.dates.length === 0) {
    return { longestStreak: 0, currentStreak: 0 };
  }

  // sort dates from oldest to newest, but also filter only completed habits
  const sortedDates = matchingHabit.dates
    .filter((date) => date.completed)
    .filter((date) => date.date <= props.id)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  if (sortedDates.length === 0) {
    return { longestStreak: 0, currentStreak: 0 };
  }

  let longestStreak = 1;
  let currentStreak = 1;
  let previousDate = sortedDates[0].date;

  for (let i = 1; i < sortedDates.length; i += 1) {
    const diffDays = differenceInDays(parseISO(sortedDates[i].date), parseISO(previousDate));

    if (diffDays === 1) {
      currentStreak += 1;
      longestStreak = Math.max(longestStreak, currentStreak);
    } else {
      currentStreak = 1;
    }
    longestStreak = Math.max(longestStreak, currentStreak);
    previousDate = sortedDates[i].date;
  }

  const viewedDayIsAfterLastCompletion =
    differenceInDays(parseISO(props.id), parseISO(previousDate)) > 0;
  if (viewedDayIsAfterLastCompletion) {
    currentStreak = 0; // Reset current streak if the viewed day has no completion
  }

  return { longestStreak, currentStreak };
}

watchEffect(() => {
  loadDayData();
});
</script>

<template>
  <main class="day-container">
    <h3>Daily Habits</h3>
    <div v-if="recordedHabits.length > 0" class="habits-wrapper">
      <ul>
        <li class="habit-card" v-for="(habit, index) in recordedHabits" :key="index">
          <div class="habit-card-details">
            <h4>{{ habit.name }}</h4>
            <h5>Completed Today: {{ isHabitCompletedToday(habit) ? 'Yes' : 'No' }}</h5>
            <h5>Total times completed: {{ countCompletedOccurrences(habit) }}</h5>
            <div>
              <h5>Longest streak: {{ countStreak(habit).longestStreak }}</h5>
              <h5>Current streak: {{ countStreak(habit).currentStreak }}</h5>
            </div>
          </div>

          <button class="complete-btn" @click="toggleHabitCompletionStatus(habit)" type="button">
            {{ isHabitCompletedToday(habit) ? 'Mark as Incomplete' : 'Mark as Completed' }}
          </button>
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

.complete-btn {
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

.btn-wrapper {
  border: 1px solid red;
  border-radius: 5px;
  margin-top: 2rem;
}
</style>
