const storageUtility = {
  getData(key = 'user') {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : [];
    } catch (err) {
      console.error('Error parsing localStorage data', err);
      return [];
    }
  },

  saveData(data, key = 'user') {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (err) {
      console.error('Error updating habits in localStorage', err);
    }
  }
};

export default storageUtility;
