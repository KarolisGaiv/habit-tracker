<script setup>
import { ref } from 'vue';
import storageUtility from '../../utils/storageUtility';

const allHabits = ref(storageUtility.getData())

</script>

<template>
  <h1>Your Habit List</h1>
    <ul>
      <li class="habit-card" v-for="(habit, index) in allHabits" :key="index">
        {{ habit.name }}
      </li>
    </ul>
</template>

<style scoped>

ul {
  list-style: none;
  padding: 0;
  margin: 2rem 0;
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

</style>
