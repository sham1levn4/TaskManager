export function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

export function getTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

export function saveFilters(filters) {
  Object.entries(filters).forEach(([key, val]) => {
    localStorage.setItem(key, val);
  });
}

export function getFilters() {
  return {
    filterStatus: localStorage.getItem("filterStatus") || "all",
    filterPriority: localStorage.getItem("filterPriority") || "all",
    filterDue: localStorage.getItem("filterDue") || "all",
  };
}
