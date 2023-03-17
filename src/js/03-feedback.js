import throttle from "lodash.throttle";

const form = document.querySelector(".feedback-form");
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');
const storageKey = "feedback-form-state";

function saveStateToLocalStorage() {
  const state = {
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.setItem(storageKey, JSON.stringify(state));
}

function restoreStateFromLocalStorage() {
  const state = JSON.parse(localStorage.getItem(storageKey));
  if (state) {
    emailInput.value = state.email || "";
    messageInput.value = state.message || "";
  }
}

function clearStateFromLocalStorage() {
  localStorage.removeItem(storageKey);
}

function handleSubmit(event) {
  event.preventDefault();

  const state = {
    email: emailInput.value,
    message: messageInput.value,
  };

  console.log(state);

  clearStateFromLocalStorage();
  emailInput.value = "";
  messageInput.value = "";
}

const throttledSaveStateToLocalStorage = throttle(saveStateToLocalStorage, 500);
emailInput.addEventListener("input", throttledSaveStateToLocalStorage);
messageInput.addEventListener("input", throttledSaveStateToLocalStorage);

form.addEventListener("submit", handleSubmit);

restoreStateFromLocalStorage();

