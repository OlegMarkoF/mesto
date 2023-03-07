export default class Card {
  constructor (data, templateSelector, popupImage) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._popupImage = popupImage;
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
  _likeCard(evt) { 
    this._likeButton.classList.toggle('elements__group_active');
  }; // Это все моя невнимательность:( Но я над этим работаю!

  // Удаление карточки
  _deleteCard() {
    this._element.remove();
    this._element = null;
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
    
    this._likeButton.addEventListener('click', () => this._likeCard());
    this._deleteButton.addEventListener('click', () => this._deleteCard());  
    this._cardImage.addEventListener('click', () => this._popupImage(this._name, this._link));

    return this._element;
  }

}
