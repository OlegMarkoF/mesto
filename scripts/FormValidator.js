export const formValidationConfig = {
  formSelector: '.popup__content',
  inputSelector: '.popup__field',
  inputErrorClass: 'popup__field-error',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  errorClass: 'popup__field_tipe_error'
};

export default class FormValidator {
  constructor (data, formElement) {
    this._formElement = formElement;
    this._formSelector = data.formSelector;
    this._inputSelector = data.inputSelector;
    this._inputErrorClass = data.inputErrorClass;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._errorClass = data.errorClass;

  };

  
  enableValidation() {
    const formList = Array.from(document.querySelectorAll(this._formSelector));
    formList.forEach((form) => {
      const buttonSaveForm = form.querySelector(this._submitButtonSelector);
      
      this._addInputListeners(form, buttonSaveForm);
      this._toggleButtonState(form, buttonSaveForm);
    });
  }

  // Показать сообщение об ошибке
  _showInputError(item) {
    const inputId = item.id;
    const errorElement = document.querySelector(`#${inputId}-error`);
    item.classList.add(this._errorClass);
    errorElement.textContent = item.validationMessage;
  };

  // Скрыть сообщение об ошибке
  _hideInputError(item) {
    const inputId = item.id;
    const errorElement = document.querySelector(`#${inputId}-error`);
    item.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  // Проверяем валидность инпута
  _handleFormInput(item) {
    if (item.validity.valid) {
      this._hideInputError(item);
    } else {
      this._showInputError(item);
    }
  };

  // Делаем кнопку не активной
  _toggleButtonState(form, buttonSaveForm) {

    const isFormValid = form.checkValidity();
    buttonSaveForm.disabled = !isFormValid;
    buttonSaveForm.classList.toggle(this._inactiveButtonClass, !isFormValid);
  }

  _addInputListeners(form, buttonSaveForm) {
    const inputList = Array.from(document.querySelectorAll(this._inputSelector));
    
    inputList.forEach((item) => {
      item.addEventListener('input', () => {
        this._handleFormInput(item);
        this._toggleButtonState(form, buttonSaveForm);
      });
    });
  }

      
}

const addForm = document.forms['popup__content_tipe_add'];
const addFormPopup = new FormValidator (formValidationConfig, addForm);
addFormPopup.enableValidation();
