<script setup>
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  id: {
    type: String,
    default: new Date()
  }
});
</script>

<template>
  <main>
    <h1>{{ id }}</h1>
    <div>
      <ul>
        <li>Habit #1</li>
        <li>Habit #2</li>
        <li>Habit #3</li>
        <li>Habit #4</li>
        <li>Habit #5</li>
      </ul>
    </div>

    <div class="btn-wrapper">
      <p>placeholder for add habit btn</p>
      <button type="button">Add habit</button>
    </div>
  </main>
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
