import Popup from "./Popup.js";

export default class PopupDeleteCard extends Popup {
  constructor(popupSelector, api, card) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__content');
    this._api = api;
    this._card = card;
  }

  //Установить слушатели
  setEventListeners() {
    super.setEventListeners();
    const delCard = (evt) => {
      evt.preventDefault();
      this._api
      .then(() => {
        document.querySelector(this._card).remove();
      });
      this._form.removeEventListener('submit', delCard);
      this.close();
    };
    this._form.addEventListener('submit', delCard);
  }

}
