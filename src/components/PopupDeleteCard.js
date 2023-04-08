import Popup from "./Popup.js";

export default class PopupDeleteCard extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__content');
    this._handleFormSubmit = handleFormSubmit;
    this._buttonSave = this._form.querySelector('.popup__button-save');
    this._textButton = this._buttonSave.textContent;
  }

  open(card) {
    super.open();
    this._card = card;
  }
  
  //Установить слушатели
  setEventListeners() {
    super.setEventListeners();
    const delCard = (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._card);
    };
    this._form.addEventListener('submit', delCard);
  }

  //Отобразить состояние загрузки
  renderLoading(isLoading) {
    if (isLoading) {
      this._buttonSave.textContent = `Удаление...`;
    } else {
      this._buttonSave.textContent = this._textButton;
    }
  }

}
