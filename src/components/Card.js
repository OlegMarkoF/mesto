export default class Card {
  constructor ({data, handleCardClick, handleLikeClick, confirmDelete}, templateSelector, userId) {
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._confirmDelete = confirmDelete;
    this._userId = userId;
    this.setData(data);
  }

  setData(data) {
    this._id = data._id;
    this._name = data.name;
    this._link = data.link;
    this._ownerId = data.owner._id;
    this._likes = data.likes;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.elements__element')
    .cloneNode(true);

    return cardElement;
  }
  
  // Добавление карточек
  generateCard() {
    this._element = this._getTemplate(); 
    this._cardImage = this._element.querySelector('.elements__mask-group');
    this._deleteButton = this._element.querySelector('.elements__delete');
    this._likeCounter = this._element.querySelector('.elements__counter');
    this._likeButton = this._element.querySelector('.elements__group');
    this._element.querySelector('.elements__title').textContent = this._name;
    this._likeCounter.textContent = this._likes.length;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    
    this._setEventListeners();

    if (!(this._ownerId === this._userId)) {
      this._deleteButton.style.display = 'none';
    }

    if (this._likes.find((obj) => this._userId === obj._id)) {
      this._likeButton.classList.add('elements__group_active');
    }

    return this._element;
  }

  likeCard() {
    return this._likes.find((obj) => this._userId === obj._id);
  }

  likeCount(data) {
    this._likeCounter.textContent = data.length;
    if (this.likeCard()) {
      this.addLikeCard();
    } else {
      this.disLikeCard();
    }
  }

  handleLikeView(like) {
    if (like) {
      this._likeButton.classList.add('elements__group_active');
    } else {
      this._likeButton.classList.remove('elements__group_active');
    }
    this._likeCounter.textContent = this._likes.length;
  }

  // Удаление карточки
  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  getID() {
    return this._id;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick(this)
    });

    this._deleteButton.addEventListener('click', () => {
      this._confirmDelete(this)
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link)
    });
  }

}