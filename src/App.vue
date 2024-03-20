<script setup>
import { RouterView } from 'vue-router';
import DayNavigation from './components/DayNavigation/DayNavigation.vue';
</script>

<template>
  <header>
    <div class="wrapper">
      <DayNavigation />
    </div>
  </header>
  <RouterView />
</template>
