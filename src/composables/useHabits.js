import storageUtility from '../utils/storageUtility';
import { findHabitByName } from '../utils/habitUtils';

export function useToggleHabitCompletion(userHabits) {
  const toggleHabitCompletionStatus = (habitToToggle, propsID) => {
    const currentHabit = findHabitByName(userHabits.value, habitToToggle.name);
    let currentHabitDateEntry = currentHabit.dates.find((entry) => entry.date === propsID);

    if (currentHabitDateEntry) {
      currentHabitDateEntry.completed = !currentHabitDateEntry.completed;
    } else {
      currentHabitDateEntry = {
        date: propsID,
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

export function test() {}
