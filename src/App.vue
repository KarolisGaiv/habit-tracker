<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <p>placeholder for calendar picker</p>
        <div>
          <p>placeholder for day picker</p>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/about">About</RouterLink>
        </div>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
.wrapper {
  border: 1px solid black;
  border-radius: 5px;
}
</style>
