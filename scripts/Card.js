import {openPopup} from './index.js';
const popupPhoto = document.querySelector('.popup__photo');
const popupSignature = document.querySelector('.popup__signature');
const popupImageElement = document.querySelector('.popup_image');


export default class Card {
  constructor (data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.elements__element')
    .cloneNode(true);

    return cardElement;
  }

  // Лайк
  _likeButton(evt) { 
    evt.target.classList.toggle('elements__group_active');
  };

  // Добавление карточек
  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.elements__mask-group');

    this._element.querySelector('.elements__title').textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    
    this._element.querySelector('.elements__group').addEventListener('click', this._likeButton);


    // Удаление карточки
    this._element.querySelector('.elements__delete').addEventListener('click', () => {
    this._element.remove();
    this._element = null;
  });

    // Попап Image
    this._cardImage.addEventListener('click', () => { 
      openPopup(popupImageElement);
      popupPhoto.src = this._link;
      popupSignature.textContent = this._name;
      popupPhoto.alt = this._name;
    });

    return this._element;
  }

}
