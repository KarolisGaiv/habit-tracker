<template>
    <main>
    <h2>404</h2>
    <h3>Page Not Found</h3>
    <RouterLink :to="{name: 'Dashboard'}"><button type='button' class='home-btn'>Go Home</button></RouterLink>
</main>
  </template>

  <style scoped>
main {
    align-items: center;
    display: flex;
    flex-direction: column;
}

h3 {
    margin: 1rem;
}

.home-btn {
  background-color: rgb(38, 186, 38);
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease;
  outline: none;
  padding: 0 1rem;
  border-radius: 5px;
  border: none;
  height: 100%;
  padding: 1rem;
}

.home-btn:focus,
.home-btn:hover {
  background-color: rgb(28, 125, 28);
}
</style>