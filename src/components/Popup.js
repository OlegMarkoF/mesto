export default class Popup {
  constructor (popupSelector) {
    this._popupSelector = popupSelector;
    this._popup = document.querySelector(this._popupSelector);
    this._closeButton = (evt) => this._handleEscape(evt);
  }

  // Oткрытиe попап
  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keyup', this._closeButton);
    
    this.setEventListeners();
  } 
  
  // Закрытиe попап
  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keyup', this._closeButton);
  }

  // Закрытиe попап по Esc
  _handleEscape(evt) {
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