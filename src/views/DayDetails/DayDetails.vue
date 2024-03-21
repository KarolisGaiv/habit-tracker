<script setup>
import { ref, watchEffect } from 'vue';
import { differenceInDays, parseISO } from 'date-fns';
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

function toggleHabitCompletionStatus(habitToToggle) {
  const currentHabit = recordedDayHabits.value.find((habit) => habit.name === habitToToggle.name);

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
  const habitInStorage = userHabits.value.find((habit) => habit.name === habitToToggle.name);

  habitInStorage.dates = currentHabit.dates;
  storageUtility.saveData(userHabits.value);
}

function isHabitCompletedToday(habit) {
  const todayEntry = habit.dates.find((entry) => entry.date === props.id);
  return todayEntry ? todayEntry.completed : false;
}

function countCompletedOccurrences(targetedHabit) {
  const matchingHabit = userHabits.value.find((hab) => hab.name === targetedHabit.name);
  const completedCount = matchingHabit.dates.reduce((accumulator, date) => {
    return accumulator + (date.completed ? 1 : 0);
  }, 0);
  return completedCount;
}

function countStreak(targetedHabit) {
  const matchingHabit = userHabits.value.find((hab) => hab.name === targetedHabit.name);

  if (!matchingHabit || matchingHabit.dates.length === 0) {
    return { longestStreak: 0, currentStreak: 0 };
  }

  // sort dates from oldest to newest, but also filter only completed habits
  const sortedDates = matchingHabit.dates
    .filter((date) => date.completed && date.date <= props.id)
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
    <div v-if="recordedDayHabits.length > 0" class="habits-wrapper">
      <ul>
        <HabitCard
          v-for="(habit, index) in recordedDayHabits"
          :key="index"
          :habit="habit"
          :toggleHabitCompletionStatus="toggleHabitCompletionStatus"
          :isHabitCompletedToday="isHabitCompletedToday"
          :countCompletedOccurrences="countCompletedOccurrences"
          :countStreak="countStreak"
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
../../utils/storageUtility
