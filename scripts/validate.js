/*const formValidationConfig = {
  formElement: '.popup__content',
  formInput: '.popup__field',
  inputErrorClass: 'popup__field_tipe-error',
};
*/

const formInput = document.querySelector('.popup__field');
const formError = formElement.querySelector(`.${formInput.id}-error`);

// Добавляем класс с ошибкой
function showInputError(formElement, formInput, errorMessage) {
  const formError = formElement.querySelector(`#${formInput.id}-error`);
  formError.textContent = errorMessage;
};

// Удаляем класс с ошибкой
function hideInputError(formElement, formInput) {
  const formError = formElement.querySelector(`#${formInput.id}-error`);
  formInput.classList.remove('popup__field_tipe-error');
  //formError.classList.remove('popup__field_tipe-error_active');
  formError.textContent = '';
}; 

// Проверяем валидность поля
function isValid(formElement, formInput) {
  if (!formInput.validity.valid) {
    showInputError(formElement, formInput, formInput.validationMessage);
  } else {
    hideInputError(formElement, formInput);
  }
}; 

function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.popup__field'));
  const formButton = formElement.querySelector('.popup__button-save');
  toggleButtonState(inputList, formButton);
  
  inputList.forEach((formInput) => {
    formInput.addEventListener('input', () => {
      isValid(formElement, formInput);
      toggleButtonState(inputList, formButton);
    });
  });
}; 

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__content'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement);
  });
};

enableValidation(); 

function hasInvalidInput(inputList) {
  return inputList.some((formInput) => {
  return !formInput.validity.valid;
});
}

// Делаем кнопку не активной
function toggleButtonState(inputList, formButton) {
  const isFormValid = formElement.checkValidity();
  formButton.disabled = !isFormValid;

  if (hasInvalidInput(inputList)) {
    formButton.classList.add('popup__button-save_disabled', !isFormValid);
  } else {
    formButton.classList.remove('popup__button-save_disabled');
  }
}
