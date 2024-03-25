<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  id: {
    type: String,
    default: new Date().toDateString()
  }
});

const newHabit = ref('');
const habitAddedMessage = ref('');
const router = useRouter();

function addHabit() {
  if (!newHabit.value.trim()) {
    alert("Habit can't be empty");
    return;
  }

  const newHabitObject = {
    name: newHabit.value.trim(),
    dateAdded: props.id,
    dates: []
  };

  const data = JSON.parse(localStorage.getItem('user')) || [];
  const doesHabitExist = data.some((habit) => habit.name === newHabitObject.name);

  if (!doesHabitExist) {
    data.push(newHabitObject);
    localStorage.setItem('user', JSON.stringify(data));
    newHabit.value = '';
    habitAddedMessage.value = 'Habit added successfully!';

    setTimeout(() => {
      habitAddedMessage.value = '';
    }, 2000);
  } else {
    alert('Habit already exist');
  }
}

function goBack() {
  router.go(-1);
}
</script>

<template>
  <h1>Add Habit To Your Day</h1>
  <transition name="fade">
    <div v-if="habitAddedMessage" class="success-msg">
      <p>{{ habitAddedMessage }}</p>
    </div>
  </transition>
  <form class="wrapper" @submit.prevent="addHabit">
    <label for="habitName">Enter new habit</label>
    <div class="form-bottom">
      <input type="text" id="habitName" placeholder="Your new habit" v-model="newHabit" />
      <button class="add-btn" type="submit">Add Habit</button>
    </div>
  </form>
  <div class="bottom-wrapper">
    <button @click="goBack" type="button" class="go-back-btn">Go Back</button>
  </div>
</template>

<style scoped>
h1 {
  text-align: center;
}

.wrapper {
  max-width: 360px;
  margin: 2rem auto;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgb(0 0 0 / 5%);
}

label {
  font-size: 1rem;
  color: #555;
  margin-bottom: 0.5rem;
  display: block;
}

input {
  padding: 12px;
  border: 2px solid #f0f0f0;
  border-radius: 0.5rem;
  transition: border-color 0.3s;
}

input:focus {
  border-color: #a0a0a0;
  outline: none;
}

.add-btn {
  background-color: #ff6b6b;
  color: #fff;
  padding: 12px 1.5rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-left: 0.5rem;
  flex: 1;
}

.add-btn:hover {
  background-color: #e25555;
}

.go-back-btn {
  background-color: #f8f9fa;
  color: #6c757d;
  cursor: pointer;
  border: 1px solid #dee2e6;
  border-radius: 0.5rem;
  padding: 1rem;
}

.go-back-btn:hover {
  background-color: #e2e6ea;
  color: #5a6268;
}

.form-bottom {
  display: flex;
  margin-bottom: 1rem;
}

.success-msg {
  align-items: center;
  display: flex;
  justify-content: center;
  color: #38a169;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.bottom-wrapper {
  display: flex;
  justify-content: center;
}
</style>
