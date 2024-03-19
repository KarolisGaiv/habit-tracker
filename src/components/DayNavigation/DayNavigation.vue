<script setup>
import { ref, computed } from 'vue';
import { RouterLink } from 'vue-router';

const date = ref(new Date());

const historicalWeek = computed(() => {
  const days = [];
  for (let i = 0; i < 7; i += 1) {
    const day = new Date(date.value);
    day.setDate(day.getDate() - i);
    days.push(day.toDateString());
  }

  return days.reverse();
});
</script>

<template>
  <div class="wrapper">
    <div class="calendar-container">
      <label for="calendar"></label>
      <input
        type="date"
        id="calendar"
        v-model="date"
        @input="date.value = new Date($event.target.value)"
      />
    </div>
    <div class="days-container">
      <ul>
        <li v-for="(day, index) in historicalWeek" :key="index" class="day-wrapper">
          <RouterLink :to="{ name: 'DayDetails', params: { id: day } }">{{ day }}</RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  border: 1px solid black;
  border-radius: 5px;
  margin-bottom: 2rem;
  padding: 0.5rem;
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
}

.day-wrapper:hover {
  background: goldenrod;
}
</style>
