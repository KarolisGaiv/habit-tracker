import { differenceInDays, parseISO } from 'date-fns';
import storageUtility from '../utils/storageUtility';
import { findHabitByName, findHabitDateEntry } from '../utils/habitUtils';

export function useToggleHabitCompletion(userHabits) {
  const toggleHabitCompletionStatus = (habitToToggle, currentViewedDay) => {
    const currentHabit = findHabitByName(userHabits, habitToToggle.name);
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
    const habitInStorage = userHabits.find((habit) => habit.name === habitToToggle.name);
    habitInStorage.dates = currentHabit.dates;
    storageUtility.saveData(userHabits);
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
    const habitDetails = findHabitByName(userHabits, habit.name);
    const completedCount = habitDetails.dates.reduce((acc, date) => {
      return acc + (date.completed ? 1 : 0);
    }, 0);
    return completedCount;
  };
  return { countCompletedOccurrences };
}

export function useHabitStreak(habit, allHabits, currentDate) {
  const countStreak = () => {
    const matchingHabit = findHabitByName(allHabits, habit.name);

    if (!matchingHabit || matchingHabit.dates.length === 0) {
      return { longestStreak: 0, currentStreak: 0 };
    }

    // sort dates from olders to newest, also filter only completed habits
    const sortedDates = matchingHabit.dates
      .filter((date) => date.completed && date.date <= currentDate)
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    if (sortedDates.length === 0) {
      return { longestStreak: 0, currentStreak: 0 };
    }

    let longestStreak = 1;
    let currentStreak = 1;
    let previousDate = sortedDates[0].date;

    for (let i = 1; i < sortedDates.length; i += 1) {
      const diffDays = differenceInDays(parseISO(sortedDates[i].date), parseISO(previousDate));

      if (diffDays === 1) {
        currentStreak += 1;
        longestStreak = Math.max(longestStreak, currentStreak);
      } else {
        currentStreak = 1;
      }
      longestStreak = Math.max(longestStreak, currentStreak);
      previousDate = sortedDates[i].date;
    }
    const viewedDayIsAfterLastCompletion =
      differenceInDays(parseISO(currentDate), parseISO(previousDate)) > 0;
    if (viewedDayIsAfterLastCompletion) {
      currentStreak = 0; // Reset current streak if the viewed day has no completion
    }
    return { longestStreak, currentStreak };
  };

  return { countStreak };
}
