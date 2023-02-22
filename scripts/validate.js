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

    addInputListeners(form, config, buttonSaveForm);
    toggleButtonState(form, config, buttonSaveForm);
  });
}

// Показать сообщение об ошибке
function showInputError(item, config) {
  const inputId = item.id;
  const errorElement = document.querySelector(`#${inputId}-error`);

  item.classList.add(config.errorClass);
  errorElement.textContent = item.validationMessage;
};

// Скрыть сообщение об ошибке
function hideInputError(item, config) {
  const inputId = item.id;
  const errorElement = document.querySelector(`#${inputId}-error`);
  console.log(inputId)
  item.classList.remove(config.errorClass);
  errorElement.textContent = '';
};

// Проверяем валидность поля
function handleFormInput(item, config) {
  
  if (item.validity.valid) {
    hideInputError(item, config);
  } else {
    showInputError(item, config);
  }
};

// Делаем кнопку не активной
function toggleButtonState(form, config, buttonSaveForm) {

  const isFormValid = form.checkValidity();
  buttonSaveForm.disabled = !isFormValid;
  buttonSaveForm.classList.toggle(config.inactiveButtonClass, !isFormValid);
}

function addInputListeners(form, config, buttonSaveForm) {
  const inputList = Array.from(document.querySelectorAll(config.inputSelector));
  
  inputList.forEach(function (item) {
    item.addEventListener('input', (evt) => {
      handleFormInput(item, config);
      toggleButtonState(form, config, buttonSaveForm);
    });
  });
}

enableValidation(formValidationConfig);