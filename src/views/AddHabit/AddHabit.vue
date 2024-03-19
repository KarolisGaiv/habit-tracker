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
  <div>
    <h1>Add new habit to your day</h1>
    <h3>selected day is {{ id }}</h3>
  </div>
</template>
