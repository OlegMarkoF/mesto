export default class Card {
  constructor (data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
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
  _likeCard() { 
    this._element.querySelector('.elements__group').classList.toggle('elements__group_active');
  };

  // Удаление карточки
  _deleteCard() {
    this._element.remove();
    this._element = null;
  }
  
  // Добавление карточек
  generateCard() {
    this._element = this._getTemplate();

    this._setEventListeners();

    this._cardImage = this._element.querySelector('.elements__mask-group');

    this._element.querySelector('.elements__title').textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
        
    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.elements__group').addEventListener('click', () => this._likeCard());
    this._element.querySelector('.elements__delete').addEventListener('click', () => this._deleteCard());  
    this._element.querySelector('.elements__mask-group').addEventListener('click', () => this._handleCardClick(this._name, this._link));
  }

}