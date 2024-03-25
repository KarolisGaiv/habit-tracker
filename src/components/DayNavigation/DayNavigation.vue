<script setup>
import { ref, computed } from 'vue';
import { RouterLink } from 'vue-router';
import { format, parseISO } from 'date-fns';

const selectedDate = ref(new Date());

const historicalWeek = computed(() => {
  const days = [];
  for (let i = 0; i < 7; i += 1) {
    const day = new Date(selectedDate.value);
    day.setDate(day.getDate() - i);
    days.push(day.toISOString().slice(0, 10));
  }

  return days.reverse();
});

const formatDay = (date) => {
  return format(parseISO(date), 'EEE d');
};

const currentMonth = computed(() => {
  return format(selectedDate.value, 'MMMM');
});
</script>

<template>
  <div class="wrapper">
    <div class="calendar-container">
      <label for="calendar"></label>
      <input type="date" id="calendar" v-model="selectedDate" />
    </div>
    <span class="month-indicator">{{ currentMonth }}</span>
    <div class="days-container">
      <ul>
        <li v-for="(day, index) in historicalWeek" :key="index" class="day-wrapper">
          <RouterLink :to="{ name: 'DayDetails', params: { id: day } }">
            {{ formatDay(day) }}</RouterLink
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  margin-bottom: 2rem;
}

.calendar-container {
  margin-bottom: 1rem;
}

ul {
  display: flex;
  padding: 0;
}

.day-wrapper {
  border: 1px solid black;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  list-style-type: none;
  cursor: pointer;
  text-align: center;
}

.day-wrapper:hover {
  background: goldenrod;
}

.router-link-active {
  background-color: #e0f155;
}
</style>
