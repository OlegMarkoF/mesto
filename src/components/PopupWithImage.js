import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor (popupSelector) {
    super(popupSelector);
    this._popupPhoto = this._popup.querySelector('.popup__photo');
    this._popupSignature = this._popup.querySelector('.popup__signature');
  }

  open({name, link}) {
    super.open();
    this._popupPhoto.src = link;
    this._popupSignature.textContent = name;
    this._popupPhoto.alt = name;
  }

}