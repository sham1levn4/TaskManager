// main.js
import { getFilters } from "./storage.js";
import { renderTasks } from "./render.js";
import { setupEventListeners } from "./events.js";

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modal");
  const overlay = document.getElementById("overlay");
  const openModalBtn = document.getElementById("open-modal-btn");
  const taskForm = document.getElementById("task-form");
  const taskList = document.querySelector(".task-list");
  const editingIdInput = document.getElementById("editing-id");

  const filterStatus = document.getElementById("filter-status");
  const filterPriority = document.getElementById("filter-priority");
  const filterDue = document.getElementById("filter-due");

  // Инициализация фильтров из localStorage
  const filters = getFilters();
  if (filterStatus) filterStatus.value = filters.filterStatus;
  if (filterPriority) filterPriority.value = filters.filterPriority;
  if (filterDue) filterDue.value = filters.filterDue;

  renderTasks(taskList, filters);

  setupEventListeners({
    modal,
    overlay,
    openModalBtn,
    taskForm,
    taskList,
    editingIdInput,
    filterStatus,
    filterPriority,
    filterDue,
  });
});
