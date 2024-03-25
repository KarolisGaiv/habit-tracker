const storageUtility = {
  getData(key = 'user') {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : [];
    } catch (err) {
      return [];
    }
  },

  saveData(data, key = 'user') {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (err) {
      console.error('Error updating habits in localStorage', err);
    }
  },

  deleteHabit(habitToDelete) {
    try {
      const data = this.getData();
      const updatedHabits = data.filter((habit) => habit.name !== habitToDelete);
      this.saveData(updatedHabits);
    } catch (err) {
      console.error('Error while trying to delete habit', err);
    }
  }
};

export default storageUtility;
