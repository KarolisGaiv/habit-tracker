import storageUtility from '../utils/storageUtility';
import { findHabitByName, findHabitDateEntry } from '../utils/habitUtils';

export function useToggleHabitCompletion(userHabits) {
  const toggleHabitCompletionStatus = (habitToToggle, currentViewedDay) => {
    const currentHabit = findHabitByName(userHabits.value, habitToToggle.name);
    let currentHabitDateEntry = findHabitDateEntry(currentHabit, currentViewedDay);

    if (currentHabitDateEntry) {
      currentHabitDateEntry.completed = !currentHabitDateEntry.completed;
    } else {
      currentHabitDateEntry = {
        date: currentViewedDay,
        completed: true
      };
      currentHabit.dates.push(currentHabitDateEntry);
    }

    // sync changes in localStorage
    const habitInStorage = userHabits.value.find((habit) => habit.name === habitToToggle.name);
    habitInStorage.dates = currentHabit.dates;
    storageUtility.saveData(userHabits.value);
  };

  return { toggleHabitCompletionStatus };
}

export function useHabitCompletion() {
  const isHabitCompletedToday = (habit, date) => {
    const todayEntry = findHabitDateEntry(habit, date);
    return todayEntry ? todayEntry.completed : false;
  };

  return { isHabitCompletedToday };
}

export function useHabitCompletionCounting(userHabits) {
  const countCompletedOccurrences = (habit) => {
    const habitDetails = findHabitByName(userHabits.value, habit.name);
    const completedCount = habitDetails.dates.reduce((acc, date) => {
      return acc + (date.completed ? 1 : 0);
    }, 0);
    return completedCount;
  };
  return { countCompletedOccurrences };
}
