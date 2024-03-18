<script setup>
import { ref, computed } from 'vue';

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
        <li v-for="(day, index) in historicalWeek" :key="index">{{ day }}</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  border: 1px solid black;
  border-radius: 5px;
  margin-bottom: 2rem;
  padding: 1rem;
}

.calendar-container {
  margin-bottom: 1rem;
}
</style>
