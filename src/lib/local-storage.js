const STORAGE_KEY = "fastcart-categories"

export function saveCategories(categories) {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(categories))
  }
}

export function loadCategories() {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        return JSON.parse(stored)
      } catch (error) {
        console.error("Error parsing stored categories:", error)
      }
    }
  }
  return []
}
