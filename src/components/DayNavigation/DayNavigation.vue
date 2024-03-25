<script setup>
import { ref, computed, watch } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { format, parseISO } from 'date-fns';

const selectedDate = ref(new Date());
const route = useRoute();
const router = useRouter();

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

const isDayDetailsOpened = computed(() => route.name === 'DayDetails');

const todayDate = computed(() => {
  return format(new Date(), 'yyyy-MM-dd');
});

watch(selectedDate, (newValue) => {
  const formattedDate = format(newValue, 'yyyy-MM-dd');
  router.push({ name: 'DayDetails', params: { id: formattedDate } });
});
</script>

<template>
  <div class="navigation-wrapper">
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
    <div class="calendar-container" v-if="isDayDetailsOpened">
      <label for="calendar">Choose Another Date:</label>
      <input type="date" id="calendar" v-model="selectedDate" :max="todayDate" />
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  margin-bottom: 2rem;
}

.calendar-container {
  align-items: center;
  display: flex;
  background-color: white;
  border-radius: 5px;
  padding: 0.5rem;
  justify-content: space-between;
  margin: 1rem 0;
}

.month-indicator {
  margin-bottom: 0.5rem;
}

input {
  border: none;
  padding: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  outline: none;
}

input:focus {
  background-color: #fafafa;
}

input:hover {
  background-color: #f5f5f5;
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

@media (width >= 750px) {
  .navigation-wrapper {
    display: flex;
    flex-direction: column;
  }

  .calendar-container {
    max-width: 60%;
    margin-left: auto;
  }
}

@media (width >= 1024px) {
  .month-indicator {
    font-size: 2.5rem;
  }

  .calendar-container {
    margin-left: auto;
  }
}
</style>
