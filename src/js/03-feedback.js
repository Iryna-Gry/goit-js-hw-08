var throttle = require('lodash.throttle');
const STORAGE_KEY = 'feedback-form-state';
const form = document.querySelector('form');
function populateInputValues() {
  const savedUserData = localStorage.getItem(STORAGE_KEY);
  if (savedUserData) {
    const parsedUserData = JSON.parse(savedUserData);
    if (parsedUserData.email) {
      form.email.value = parsedUserData.email;
    }
    //   else {
    //       form.email.value = '';
    //   }
    if (parsedUserData.message) {
      form.message.value = parsedUserData.message;
    }
  }
}

form.addEventListener('input', throttle(onInputChange, 500));
form.addEventListener('submit', onFormSubmit);
populateInputValues();
const userFeedbackData = {};
function onInputChange(evt) {
  if (evt.target.name === 'email') {
    onEmailInputChange(evt);
  } else if (evt.target.name === 'message') {
    onMessageInputChange(evt);
  } else {
    return;
  }
  const stringifiedUserFeedbackData = JSON.stringify(userFeedbackData);
  localStorage.setItem(STORAGE_KEY, stringifiedUserFeedbackData);
}
function onEmailInputChange(evt) {
  return (userFeedbackData.email = evt.target.value);
}
function onMessageInputChange(evt) {
  return (userFeedbackData.message = evt.target.value);
}
function onFormSubmit(evt) {
  evt.preventDefault();
  console.log('Form has been sent', {
    email: evt.currentTarget.email.value,
    message: evt.currentTarget.message.value,
  });

  localStorage.removeItem(STORAGE_KEY);
  evt.currentTarget.reset();
}
