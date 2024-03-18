<script setup>
import { RouterLink, RouterView } from 'vue-router';
import DayNavigation from './components/DayNavigation/DayNavigation.vue';
</script>

<template>
  <header>
    <div class="wrapper">
      <DayNavigation />
      <!-- <nav>
        <div>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/about">About</RouterLink>
        </div>
      </nav> -->
    </div>
  </header>

  <RouterView />
</template>

<style scoped></style>
