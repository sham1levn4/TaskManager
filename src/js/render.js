import { getTasks, saveTasks } from "./storage.js";

export function drawProgress(canvas, status) {
  const ctx = canvas.getContext("2d");
  const radius = 18;
  const center = 20;

  ctx.clearRect(0, 0, 40, 40);

  // Фон круга
  ctx.strokeStyle = "#eee";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(center, center, radius, 0, 2 * Math.PI);
  ctx.stroke();

  // Прогресс (0% или 100%)
  if (status === "Завершено") {
    ctx.strokeStyle = "#4caf50"; // зеленый
    ctx.beginPath();
    ctx.arc(center, center, radius, -Math.PI / 2, 2 * Math.PI - Math.PI / 2);
    ctx.stroke();
  }
}

export function animateIn(card) {
  card.classList.add("enter");
  requestAnimationFrame(() => {
    card.classList.add("enter-active");
    card.classList.remove("enter");
  });
}

export function renderTasks(taskList, filters) {
  let tasks = getTasks();

  const status = filters.filterStatus || "all";
  const priority = filters.filterPriority || "all";
  const due = filters.filterDue || "all";

  if (status !== "all") {
    tasks = tasks.filter((task) => task.status === status);
  }

  if (priority !== "all") {
    tasks = tasks.filter((task) => task.priority === priority);
  }

  if (due === "soonest") {
    tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  } else if (due === "latest") {
    tasks.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));
  }

  tasks.sort((a, b) => (a.status === "Завершено" ? 1 : -1));

  taskList.innerHTML = "";
  tasks.forEach((task) => {
    const card = document.createElement("div");
    card.className = "task-card";
    if (task.status === "Завершено") {
      card.classList.add("completed-task");
    }
    card.innerHTML = `
      <h3 class="task-header">
        <canvas class="progress-circle" width="40" height="40" data-status="${task.status}"></canvas>
        <input class="edit-title" data-id="${task.id}" value="${task.title}" placeholder="Название задачи" ${
      task.status === "Завершено" ? "disabled" : ""
    } />
      </h3>
      <textarea class="edit-desc" data-id="${task.id}" placeholder="Описание" ${
        task.status === "Завершено" ? "disabled" : ""
      }>${task.desc}</textarea>
      <p><strong>Приоритет:</strong>
        <select class="edit-priority" data-id="${task.id}" ${
          task.status === "Завершено" ? "disabled" : ""
        }>
          <option ${task.priority === "важное и срочное" ? "selected" : ""}>важное и срочное</option>
          <option ${task.priority === "важное, но не срочное" ? "selected" : ""}>важное, но не срочное</option>
          <option ${task.priority === "срочное, но неважное" ? "selected" : ""}>срочное, но неважное</option>
          <option ${task.priority === "неважное и не срочное" ? "selected" : ""}>неважное и не срочное</option>
        </select>
      </p>
      <p><strong>Срок:</strong>
        <input type="date" class="edit-date" data-id="${task.id}" value="${task.dueDate}" ${
      task.status === "Завершено" ? "disabled" : ""
    } />
      </p>
      <p><strong>Статус:</strong> ${task.status}</p>
      <div class="task-actions">
        ${
          task.status !== "Завершено"
            ? `<button data-id="${task.id}" class="save-btn">Сохранить</button>`
            : ""
        }
        <button data-id="${task.id}" class="delete-btn">Удалить</button>
        <button data-id="${task.id}" class="toggle-status-btn">
          ${task.status === "В процессе" ? "Завершить" : "Возобновить"}
        </button>
      </div>
    `;
    taskList.appendChild(card);

    const canvas = card.querySelector(".progress-circle");
    if (canvas) {
      drawProgress(canvas, task.status);
    }

    animateIn(card);
  });
}
