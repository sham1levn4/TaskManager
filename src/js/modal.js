export function openModal(modal, overlay) {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
}

export function closeModal(modal, overlay, form, editingIdInput) {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
    form.reset();
    if (editingIdInput) editingIdInput.value = "";
}
