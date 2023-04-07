export default class Popup {
  constructor (popupSelector) {
    this._popupSelector = popupSelector;
    this._popup = document.querySelector(this._popupSelector);
    this._handleEscape = (evt) => this._handleEscClose(evt);
  }

  // Oткрытиe попап
  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keyup', this._handleEscape);
  }
  
  // Закрытиe попап
  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keyup', this._handleEscape);
  }

  // Закрытиe попап по Esc
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close')) {
        this.close();
      }
    });
  }

}