// Local storage keys
export const STORAGE_KEYS = {
  USER: 'user',
  TOKEN: 'token',
};

export const loadState = (key) => {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) {
      return undefined;
    }
    return key === STORAGE_KEYS.USER ? JSON.parse(serializedState) : serializedState;
  } catch (err) {
    return undefined;
  }
};

export const saveState = (key, state) => {
  try {
    const serializedState = key === STORAGE_KEYS.USER ? JSON.stringify(state) : state;
    localStorage.setItem(key, serializedState);
  } catch (err) {
    // Ignore write errors
  }
};

export const clearState = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    // Ignore remove errors
  }
};