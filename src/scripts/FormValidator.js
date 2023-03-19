export default class FormValidator {
  constructor (config, formElement) {
    this._formElement = formElement;
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._inputErrorClass = config.inputErrorClass;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._errorClass = config.errorClass;
    this._buttonSaveForm = this._formElement.querySelector(this._submitButtonSelector);
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
  };

  enableValidation() {
    this._addInputListeners();
  }

  // Сброс ошибок формы
  resetValidation() {
    this._toggleButtonState();
    this._inputList.forEach((item) => {
      this._hideInputError(item)
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
  _toggleButtonState() {
    const isFormValid = this._formElement.checkValidity();
    this._buttonSaveForm.disabled = !isFormValid;
    this._buttonSaveForm.classList.toggle(this._inactiveButtonClass, !isFormValid);
  }

  // Добавляем слушатель инпутов
  _addInputListeners() {
    this._inputList.forEach((item) => {
      this.resetValidation();
      item.addEventListener('input', () => {
        this._handleFormInput(item);
        this._toggleButtonState();
      });
    });
  }

  
}


