export function findHabitByName(habits, name) {
  return habits.find((habit) => habit.name === name);
}

export function findHabitDateEntry(habit, date) {
  return habit.dates.find((entry) => entry.date === date);
}
