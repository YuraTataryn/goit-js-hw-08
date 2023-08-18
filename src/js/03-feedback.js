
const feedbackForm = document.querySelector('.feedback-form');
const emailInput = feedbackForm.querySelector('input[name="email"]');
const messageTextarea = feedbackForm.querySelector('textarea[name="message"]');

const storageKey = 'feedback-form-state';
let feedbackState = {};

const saveStateToLocalStorage = _.throttle(() => {
  localStorage.setItem(storageKey, JSON.stringify(feedbackState));
}, 500);

const loadStateFromLocalStorage = () => {
  const storedState = localStorage.getItem(storageKey);
  if (storedState) {
    feedbackState = JSON.parse(storedState);
    emailInput.value = feedbackState.email || '';
    messageTextarea.value = feedbackState.message || '';
  }
};

emailInput.addEventListener('input', () => {
  feedbackState.email = emailInput.value;
  saveStateToLocalStorage();
});

messageTextarea.addEventListener('input', () => {
  feedbackState.message = messageTextarea.value;
  saveStateToLocalStorage();
});

feedbackForm.addEventListener('submit', (event) => {
  event.preventDefault();
  console.log('Submitted:', feedbackState);
  feedbackState = {};
  localStorage.removeItem(storageKey);
  emailInput.value = '';
  messageTextarea.value = '';
});

loadStateFromLocalStorage();
