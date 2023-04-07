import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor ({popupSelector, handleSubmitForm}) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._form = this._popup.querySelector('.popup__content');
    this._inputList = this._form.querySelectorAll('.popup__field');
    this._buttonSave = this._form.querySelector('.popup__button-save');
    this._textButton = this._buttonSave.textContent;
  }

  getInputValues() {
    this._inputValues = {};
    this._inputList.forEach((item) => {
      this._inputValues[item.name] = item.value;
    });
    return this._inputValues;
  }

  _submitForm = (evt) => {
    evt.preventDefault();
    this._handleSubmitForm(this.getInputValues());
    this.close();
  };

  //Установить слушатели
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._submitForm);
  }

  //Отобразить состояние загрузки
  renderLoading(isLoading) {
    if (isLoading) {
      this._buttonSave.textContent = `Сохранение...`;
    } else {
      this._buttonSave.textContent = this._textButton;
    }
  }

  //Закрыть Попап
  close() {
    super.close();
    this._form.reset();
  }

}
