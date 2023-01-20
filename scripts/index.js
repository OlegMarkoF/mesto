const popup = document.querySelector('.popup');
const popups = document.querySelectorAll('.popup');
const popupEditElement = document.querySelector('.popup_edit');
const popupAddElement = document.querySelector('.popup_add');
const popupImageElement = document.querySelector('.popup_image');
const popupCloseButtonElement = popup.querySelector('.popup__close');
const popupCloseAddButtonElement = popupAddElement.querySelector('.popup__close_add');
const popupCloseEditButtonElement = popupEditElement.querySelector('.popup__close_edit');
const popupCloseImageButtonElement = popupImageElement.querySelector('.popup__close_image');
const popupOpenEditButtonElement = document.querySelector('.profile__edit-button');
const popupOpenAddButtonElement = document.querySelector('.profile__add-button');
const formElement = document.querySelector('.popup__content');
const addFormElement = document.querySelector('.popup__content_tipe_add');
const nameInput = document.querySelector('.popup__field_tipe_name');
const jobInput = document.querySelector('.popup__field_tipe_job');
const placeInput = document.querySelector('.popup__field_tipe_place');
const linkInput = document.querySelector('.popup__field_tipe_link');
const popupPhoto = document.querySelector('.popup__photo');
const profileTitleElement = document.querySelector('.profile__title');
const profileTextElement = document.querySelector('.profile__text');
const elementsTemplate = document.querySelector('#elements-template').content;
const elementsElement = document.querySelector('.elements__element');
const sectionElements = document.querySelector('.elements');
const addButton = popupAddElement.querySelector('.popup__button-save_add');
const deleteButton = document.querySelectorAll('.elements__delete');
const popupSignature = document.querySelector('.popup__signature');
const popupFigure = document.querySelector('.popup__figure');
const maskGroupElement = document.querySelectorAll('.elements__mask-group');
const titleElement = document.querySelectorAll('.elements__title');
const cardFormSubmit = document.querySelector('.popup__content_tipe_add');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function createCard(item) {
  const cardElement = elementsTemplate.querySelector('.elements__element').cloneNode(true);

  cardElement.querySelector('.elements__title').textContent = item.name;
  cardElement.querySelector('.elements__mask-group').src = item.link;
  cardElement.querySelector('.elements__mask-group').alt = item.name;

  // Лайк
  cardElement.querySelector('.elements__group').addEventListener('click', function(evt){ 
    evt.target.classList.toggle('elements__group_active');
  });
  // Попап Image
  cardElement.querySelector('.elements__mask-group').addEventListener('click', function(evt){ 
    openPopup(popupImageElement);
    popupPhoto.src = cardElement.querySelector('.elements__mask-group').src;
    popupSignature.textContent = cardElement.querySelector('.elements__mask-group').alt;
  });
  // Удаление карточки
  cardElement.querySelector('.elements__delete').addEventListener('click', function(evt){
    cardElement.remove();
  });

  return cardElement;
}

// Добавление карточек из массива.
initialCards.forEach(function (item) {
  sectionElements.append(createCard(item));
})


// Добавление карточки через Попап
cardFormSubmit.addEventListener('submit', function(evt) {
  evt.preventDefault();
  const addCard = elementsTemplate.querySelector('.elements__element').cloneNode(true);

  addCard.querySelector('.elements__title').textContent = placeInput.value;
  addCard.querySelector('.elements__mask-group').src = linkInput.value;
  addCard.querySelector('.elements__mask-group').alt = placeInput.value;
  
  // Лайк
  addCard.querySelector('.elements__group').addEventListener('click', function(evt){ 
    evt.target.classList.toggle('elements__group_active');
    });
  // Попап Image
  addCard.querySelector('.elements__mask-group').addEventListener('click', function(evt){ 
    openPopup(popupImageElement);
    popupPhoto.src = addCard.querySelector('.elements__mask-group').src;
    popupSignature.textContent = addCard.querySelector('.elements__mask-group').alt;
    });
  // Удаление карточки
  addCard.querySelector('.elements__delete').addEventListener('click', function(evt){
    addCard.remove();
  });
  sectionElements.prepend(addCard);
  closePopup(popupAddElement);
  evt.target.reset();
})




// Данные профиля = данные попап
function handleFormSubmit(evt) {
  evt.preventDefault();

  profileTitleElement.textContent = nameInput.value;
  profileTextElement.textContent = jobInput.value;

  closePopup(popup);
}

// Функии открытия попап
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

// Функии закрытия попап
function closePopup(popup) {
  popup.classList.remove('popup_opened');}

//Функии закрытия попап по Overlay
function closePopupByClickOnOverlay(evt) {
  if (event.target == event.currentTarget) {
    closePopup(popupEditElement);
    closePopup(popupAddElement);
    closePopup(popupImageElement);}
}

popupOpenEditButtonElement.addEventListener('click', () => {
  nameInput.value = profileTitleElement.textContent;
  jobInput.value = profileTextElement.textContent;
  openPopup(popupEditElement)});
popupOpenAddButtonElement.addEventListener('click', () => openPopup(popupAddElement));
popupCloseEditButtonElement.addEventListener('click', () => closePopup(popupEditElement));
popupCloseAddButtonElement.addEventListener('click',() => closePopup(popupAddElement));
popupCloseImageButtonElement.addEventListener('click',() => closePopup(popupImageElement));
popupEditElement.addEventListener('mousedown', closePopupByClickOnOverlay);
popupAddElement.addEventListener('mousedown', closePopupByClickOnOverlay);
popupImageElement.addEventListener('mousedown', closePopupByClickOnOverlay);
formElement.addEventListener('submit', handleFormSubmit);