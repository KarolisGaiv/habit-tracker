<script setup>
import { RouterView } from 'vue-router';
import DayNavigation from './components/DayNavigation/DayNavigation.vue';
</script>

<template>
  <header>
    <DayNavigation />
  </header>
  <RouterView />
</template>
