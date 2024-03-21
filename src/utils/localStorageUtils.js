export function getLocalStorageData(key = 'user') {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error('Error parsing localStorage data', err);
    return [];
  }
}

export function test() {
  console.log('placeholder');
}
