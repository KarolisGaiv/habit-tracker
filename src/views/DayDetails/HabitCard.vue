<script setup>
const props = defineProps({
  habit: Object,
  toggleHabitCompletionStatus: Function,
  isHabitCompletedToday: Function,
  countCompletedOccurrences: Function,
  countStreak: Function
});
</script>

<template>
  <div class="habit-card">
    <div class="habit-card-details">
      <h4>{{ habit.name }}</h4>
      <h5>Completed Today: {{ isHabitCompletedToday(habit) ? 'Yes' : 'No' }}</h5>
      <h5>Total times completed: {{ countCompletedOccurrences(habit) }}</h5>
      <div>
        <h5>Longest streak: {{ countStreak(habit).longestStreak }}</h5>
        <h5>Current streak: {{ countStreak(habit).currentStreak }}</h5>
      </div>
    </div>
    <button
      class="complete-btn"
      @click="props.toggleHabitCompletionStatus(props.habit)"
      type="button"
    >
      {{ props.isHabitCompletedToday(props.habit) ? 'Mark as Incomplete' : 'Mark as Completed' }}
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
