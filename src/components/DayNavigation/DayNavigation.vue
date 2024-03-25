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
  return {
    month: format(parseISO(date), 'EEE'),
    day: format(parseISO(date), 'd')
  };
};

const currentMonth = computed(() => {
  return format(selectedDate.value, 'MMMM');
});
</script>

<template>
  <div class="wrapper">
    <!-- <div class="calendar-container">
      <label for="calendar"></label>
      <input type="date" id="calendar" v-model="selectedDate" />
    </div> -->
    <h2 class="month-indicator">{{ currentMonth }}</h2>
    <div class="days-container">
      <ul>
        <li v-for="(day, index) in historicalWeek" :key="index" class="day-wrapper">
          <RouterLink :to="{ name: 'DayDetails', params: { id: day } }">
            <span>{{ formatDay(day).month }}</span>
            <span>{{ formatDay(day).day }}</span>
          </RouterLink>
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

.month-indicator {
  margin-bottom: 0.5rem;
}

ul {
  display: flex;
  padding: 0;
}

.day-wrapper {
  flex: 1;
  border: 1px solid #ccc;
  border-radius: 5px;
  list-style-type: none;
  justify-content: center;
  cursor: pointer;
  text-align: center;
  background-color: white;
  transition:
    background-color 0.3s ease,
    transform 0.2s ease;
}

.day-wrapper:hover {
  background: goldenrod;
}

a {
  display: flex;
  flex-direction: column;
}

.router-link-active {
  background-color: #e0f155;
}
</style>
