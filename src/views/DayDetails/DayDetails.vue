<script setup>
import { ref, watch, watchEffect } from 'vue';
import { getDayInformation } from '../../utils/localStorage';

const { id } = defineProps({
  id: {
    type: String,
    default: new Date().toDateString()
  }
});

const recordedHabits = ref({});

watchEffect(() => {
  recordedHabits.value = getDayInformation(id);
});

// watchEffect(
//   () => id.value,
//   (newId) => {
//     recordedHabits.value = getDayInformation(newId);
//   }
// );
</script>

<template>
  <main>
    <h1>{{ id }}</h1>
    <h3>
      <p>this is from localStorage</p>
      {{ recordedHabits }}
    </h3>
    <div>No habits for this day</div>
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
  justify-content: space-between;
  height: 80vh;
  border: 1px solid orange;
  border-radius: 5px;
}

.btn-wrapper {
  border: 1px solid red;
  border-radius: 5px;
  margin-top: 2rem;
}
</style>
