export function saveToLocalStorage<T>(key: string, value: T): void {
  try {
    const storeValue = JSON.stringify(value);
    localStorage.setItem(key, storeValue);
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
}

export function getFromLocalStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : defaultValue;
  } catch (error) {
    console.error("Error getting from localStorage:", error);
    return defaultValue;
  }
}

export function removeFromLocalStorage(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing from localStorage:", error);
  }
}
