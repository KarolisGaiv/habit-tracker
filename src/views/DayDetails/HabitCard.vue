<script setup>
import { computed } from 'vue';
import { differenceInDays, parseISO } from 'date-fns';
import storageUtility from '../../utils/storageUtility';
import { findHabitByName, findHabitDateEntry } from '../../utils/habitUtils';

const props = defineProps({
  habit: {
    type: Object,
    default: () => ({})
  },
  date: {
    type: String,
    default: () => new Date().toISOString().slice(0, 10)
  },
  allHabits: {
    type: Object,
    default: () => ({})
  }
});

function isHabitCompletedToday(habit, date) {
  const todayEntry = findHabitDateEntry(habit, date);
  return todayEntry ? todayEntry.completed : false;
}

function countCompletedOccurrences(habit) {
  const habitDetails = findHabitByName(props.allHabits, habit.name);
  const completedCount = habitDetails.dates.reduce((acc, date) => {
    return acc + (date.completed ? 1 : 0);
  }, 0);
  return completedCount;
}

function toggleHabitCompletionStatus() {
  const currentHabit = findHabitByName(props.allHabits, props.habit.name);
  let currentHabitDateEntry = findHabitDateEntry(currentHabit, props.date);

  if (currentHabitDateEntry) {
    currentHabitDateEntry.completed = !currentHabitDateEntry.completed;
  } else {
    currentHabitDateEntry = {
      date: props.date,
      completed: true
    };
    currentHabit.dates.push(currentHabitDateEntry);
  }

  // sync changes in localStorage
  storageUtility.saveData(props.allHabits);
}

function countStreak() {
  const matchingHabit = findHabitByName(props.allHabits, props.habit.name);

  if (!matchingHabit || matchingHabit.dates.length === 0) {
    return { longestStreak: 0, currentStreak: 0 };
  }

  // sort dates from oldest to newest, also filter only completed habits
  const sortedDates = matchingHabit.dates
    .filter((date) => date.completed && date.date <= props.date)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  if (sortedDates.length === 0) {
    return { longestStreak: 0, currentStreak: 0 };
  }

  let longestStreak = 1;
  let currentStreak = 1;
  let previousDate = sortedDates[0].date;

  for (let i = 1; i < sortedDates.length; i += 1) {
    const diffDDays = differenceInDays(parseISO(sortedDates[i].date), parseISO(previousDate));

    if (diffDDays === 1) {
      currentStreak += 1;
      longestStreak = Math.max(longestStreak, currentStreak);
    } else {
      currentStreak = 1;
    }
    longestStreak = Math.max(longestStreak, currentStreak);
    previousDate = sortedDates[i].date;
  }

  const viewedDayIsAfterLastCompletion =
    differenceInDays(parseISO(props.date), parseISO(previousDate)) > 0;
  if (viewedDayIsAfterLastCompletion) {
    currentStreak = 0; // Reset current streak if the viewed day has no completion
  }

  return { longestStreak, currentStreak };
}

const streakInfo = computed(() => countStreak());
</script>

<template>
  <div class="habit-card">
    <div class="habit-card-details">
      <h4>{{ habit.name }}</h4>
      <h5>Completed Today: {{ isHabitCompletedToday(props.habit, props.date) ? 'Yes' : 'No' }}</h5>
      <h5>Total times completed: {{ countCompletedOccurrences(props.habit) }}</h5>
      <div>
        <h5>Longest streak: {{ streakInfo.longestStreak }}</h5>
        <h5>Current streak: {{ streakInfo.currentStreak }}</h5>
      </div>
    </div>
    <button
      class="complete-btn"
      @click="toggleHabitCompletionStatus(props.habit, props.date)"
      type="button"
    >
      {{
        isHabitCompletedToday(props.habit, props.date) ? 'Mark as Incomplete' : 'Mark as Completed'
      }}
    </button>
  </div>
</template>

<style scoped>
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
</style>
