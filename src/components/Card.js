export default class Card {
  constructor ({data, handleCardClick, handleLikeClick, confirmDelete}, templateSelector, api, userId) {
    this._api = api;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._confirmDelete = confirmDelete;
    this._userId = userId;
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

  _saveItem = () => {
    this._api
      .addCard({name: text, link: url})
      .then((data) => this.generateCard(data.name, data.link))
      .catch((err) => console.log(err));
  };

  // Добавление карточек
  generateCard() {
    this._element = this._getTemplate(); 
    this._cardImage = this._element.querySelector('.elements__mask-group');
    this._deleteButton = this._element.querySelector('.elements__delete');

    this._element.querySelector('.elements__title').textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector('.elements__counter').textContent = this._likes.length;

    this._setEventListeners();

    if (!(this._ownerId === this._userId)) {
      this._element.querySelector('.elements__delete').style.display = 'none';
    }

    if (this._likes.find((obj) => this._userId === obj._id)) {
      this._element.querySelector('.elements__group').classList.add('elements__group_active');
    }

    return this._element;
  }

  // Лайк 
  likeCard() {
    const likeCounter = this._element.querySelector('.elements__counter');
    const likeButton = this._element.querySelector('.elements__group');
    
    if (!(likeButton.classList.contains('elements__group_active'))) {
      this._api.likeCard(this._id)
      .then((data) => {
        likeButton.classList.add('elements__group_active');
        likeCounter.textContent = data.likes.length;
      })
      .catch((err) => console.log(err));
    } else {
      this._api.disLikeCard(this._id)
        .then((data) => {
          likeButton.classList.remove('elements__group_active');
          likeCounter.textContent = data.likes.length;
        })
        .catch((err) => console.log(err));
    }
  };   
/*
  // Удаление карточки
  deleteCard() {
    this._element.closest('.elements__element').remove();
    this._element = null;
  }
*/
  _setEventListeners() {
    this._element.querySelector('.elements__group')
    .addEventListener('click', () => {
      this._handleLikeClick()
    });

    this._deleteButton.addEventListener('click', () => {
      this._confirmDelete()
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link)
    });
  }

}