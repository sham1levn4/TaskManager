const API_URL = "https://jsonplaceholder.typicode.com/posts";

export async function syncTaskToServer(task) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    const result = await response.json();
    console.log("Task synced to server:", result);
  } catch (error) {
    console.error("Ошибка при синхронизации задачи:", error);
  }
}
