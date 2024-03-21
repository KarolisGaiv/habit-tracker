export function findHabitByName(habits, name) {
  return habits.find((habit) => habit.name === name);
}
