//Вариант 2

const formValidationConfig = {
  formSelector: '.popup__content',
  inputSelector: '.popup__field',
  inputErrorClass: 'popup__field-error',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  errorClass: 'popup__field_tipe_error'
};


function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  
  formList.forEach((form) => {
    const buttonSaveForm = form.querySelector(config.submitButtonSelector);
    form.addEventListener('input', (evt) => {
      handleFormInput(evt, config);
      toggleButtonState(form, config, buttonSaveForm);

    });
    addInputListeners(form, config);
    toggleButtonState(form, config, buttonSaveForm);
  });

}

function handleFormInput(evt, config) {
  const input = evt.target;
  const inputId = input.id;
  const errorElement = document.querySelector(`#${inputId}-error`);
  
  if (input.validity.valid) {
    input.classList.remove(config.errorClass);
    errorElement.textContent = '';
  } else {
    input.classList.add(config.errorClass);
    errorElement.textContent = input.validationMessage;
    
  }
}

// Делаем кнопку не активной
function toggleButtonState(form, config, buttonSaveForm) {

  const isFormValid = form.checkValidity();
  buttonSaveForm.disabled = !isFormValid;
  buttonSaveForm.classList.toggle('popup__button-save_disabled', !isFormValid);
}

function addInputListeners(formList, config) {
  const inputList = Array.from(document.querySelectorAll(config.inputSelector));
  
  inputList.forEach(function (item) {
    item.addEventListener('input', (evt) => {
      handleFormInput(evt, config);
    });
  });
}


enableValidation(formValidationConfig);

/* Вариант 1. (удалить после проверки варианта 2)

// Добавляем класс с ошибкой
function showInputError(formSelector, inputSelector, errorMessage) {
  const formError = formSelector.querySelector(`#${inputSelector.id}-error`);
  formError.textContent = errorMessage;
};

// Удаляем класс с ошибкой
function hideInputError(formSelector, inputSelector) {
  const formError = formSelector.querySelector(`#${inputSelector.id}-error`);
  inputSelector.classList.remove('popup__field-error');
  //formError.classList.remove('popup__field_tipe-error_active');
  formError.textContent = '';
}; 

// Проверяем валидность поля
function isValid(formSelector, inputSelector) {
  if (!inputSelector.validity.valid) {
    showInputError(formSelector, inputSelector, inputSelector.validationMessage);
  } else {
    hideInputError(formSelector, inputSelector);
  }
}; 

function setEventListeners(formSelector) {
  const inputList = Array.from(formSelector.querySelectorAll('.popup__field'));
  const formButton = formSelector.querySelector('.popup__button-save');
  toggleButtonState(inputList, formButton);
  
  inputList.forEach((inputSelector) => {
    inputSelector.addEventListener('input', () => {
      isValid(formSelector, inputSelector);
      toggleButtonState(inputList, formButton);
    });
  });
}; 

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__content'));
  formList.forEach((formSelector) => {
    
    setEventListeners(formSelector);
  });
};


function hasInvalidInput(inputList) {
  return inputList.some((inputSelector) => {
  return !inputSelector.validity.valid;
});
}


// Делаем кнопку не активной
function toggleButtonState(inputList, formButton) {
  const isFormValid = formEditElement.checkValidity() || formAddElement.checkValidity();
  formButton.disabled = !isFormValid;
  if (hasInvalidInput(inputList)) {
    formButton.classList.toggle('popup__button-save_disabled', true);
  } else { 
    formButton.classList.toggle('popup__button-save_disabled', false); 
  }
}

*/