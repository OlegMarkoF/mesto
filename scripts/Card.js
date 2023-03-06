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
  _cardLike(evt) { 
    evt.target.classList.toggle('elements__group_active');
 // this._likeButton.classList.toggle('elements__group_active'); Не смог разобраться.
 // Если я пишу так, то this._likeButton is undefined. Оставил как есть.
  };

  // Удаление карточки
  _deleteCard() {
    this._element.remove();
    this._element = null;
  }
  
  // Попап Image
  _popupImage() {
    openPopup(popupImageElement);
    popupPhoto.src = this._link;
    popupSignature.textContent = this._name;
    popupPhoto.alt = this._name;

  }

  // Добавление карточек
  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.elements__mask-group');
    this._likeButton = this._element.querySelector('.elements__group');
    this._deleteButton = this._element.querySelector('.elements__delete');

    this._element.querySelector('.elements__title').textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    
    this._likeButton.addEventListener('click', this._cardLike);
    this._deleteButton.addEventListener('click', () => this._deleteCard());  
    this._cardImage.addEventListener('click', () => this._popupImage());

    return this._element;
  }

}
