const popupElement = document.querySelector('.popup');
const popupEditElement = document.querySelector('.popup_edit');
const popupAddElement = document.querySelector('.popup_add');
const popupImageElement = document.querySelector('.popup_image');
const popupCloseButtonElement = popupElement.querySelector('.popup__close');
const popupCloseAddButtonElement = popupAddElement.querySelector('.popup__close_add');
const popupCloseEditButtonElement = popupEditElement.querySelector('.popup__close_edit');
const popupCloseImageButtonElement = popupImageElement.querySelector('.popup__close_image');
const popupOpenEditButtonElement = document.querySelector('.profile__edit-button');
const popupOpenAddButtonElement = document.querySelector('.profile__add-button');
const formElement = document.querySelector('.popup__content');
const nameInput = document.querySelector('.popup__field_tipe_name');
const jobInput = document.querySelector('.popup__field_tipe_job');
const popupPhoto = document.querySelector('.popup__photo');
const profileTitleElement = document.querySelector('.profile__title');
const profileTextElement = document.querySelector('.profile__text');
const elementsTemplate = document.querySelector('#elements-template').content;
const elementsElement = document.querySelector('.elements__element');
//const signatureElement = document.querySelector('.elements__signature');
const sectionElements = document.querySelector('.elements');
const addButton = popupAddElement.querySelector('.popup__button-save_add');
const deleteButton = document.querySelectorAll('.elements__delete');
const popupSignature = document.querySelector('.popup__signature');
const popupFigure = document.querySelector('.popup__figure');
const maskGroupElement = document.querySelectorAll('.elements__mask-group');
const titleElement = document.querySelectorAll('.elements__title');

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

// Добавление карточек из массива.
initialCards.forEach(function (element) {
  const cardElement = elementsTemplate.querySelector('.elements__element').cloneNode(true);
  
  cardElement.querySelector('.elements__title').textContent = element.name;
  cardElement.querySelector('.elements__mask-group').src = element.link;
  cardElement.querySelector('.elements__group').addEventListener('click', function(evt){ 
    evt.target.classList.toggle('elements__group_active');
  });
  cardElement.querySelector('.elements__mask-group').addEventListener('click', function(evt){ 
    evt.target.classList.add(openPopup(popupImageElement));
    popupPhoto.src = cardElement.querySelector('.elements__mask-group').src;
    popupSignature.textContent = cardElement.querySelector('.elements__title').textContent;
  });
  
  sectionElements.append(cardElement);
})

// Кнопка удаления карточкию Не реботает!! 
/*deleteButton.addEventListener('click', () => {
  const elementsElement = deleteButton.closest('.elements__element');
  let index = elementsElement.indexof(elementsElement);
    elementsElement.splice(index, 1);
  });*/


//Данные профиля
function handleFormSubmit(evt) {
    evt.preventDefault();

    profileTitleElement.textContent = nameInput.value;
    profileTextElement.textContent = jobInput.value;

    closePopup(popupEditElement);
}

//Попап профиля (общий openPopup)
function openPopup(popupElement) {
  nameInput.value = profileTitleElement.textContent;
  jobInput.value = profileTextElement.textContent;
  popupElement.classList.add('popup_opened');
}

//Попап Image Опен
/*function imageFormSubmit() {

  cardElement.querySelector('.popup__photo').src = element.link;
  cardElement.querySelector('.elements__signature').textContent = element.name;
  
}*/


//Функии закрытия попап
function closePopup(popupAddElement) {
  popupAddElement.classList.remove('popup_opened');}

function closePopup(popupEditElement) {
  popupEditElement.classList.remove('popup_opened');}

function closePopup(popupImageElement) {
  popupImageElement.classList.remove('popup_opened');}

//Функии закрытия попап по Overlay
function closePopupByClickOnOverlay(evt) {
  if (event.target == event.currentTarget) {
    closePopup(popupEditElement);
    closePopup(popupAddElement);
    closePopup(popupImageElement);}
}


popupOpenEditButtonElement.addEventListener('click', () => openPopup(popupEditElement));
popupOpenAddButtonElement.addEventListener('click', () => openPopup(popupAddElement));
popupCloseEditButtonElement.addEventListener('click', () => closePopup(popupEditElement));
popupCloseAddButtonElement.addEventListener('click',() => closePopup(popupAddElement));
popupCloseImageButtonElement.addEventListener('click',() => closePopup(popupImageElement));
popupEditElement.addEventListener('click', closePopupByClickOnOverlay);
popupAddElement.addEventListener('click', closePopupByClickOnOverlay);
popupImageElement.addEventListener('click', closePopupByClickOnOverlay);
formElement.addEventListener('submit', handleFormSubmit);
//maskGroupElement.addEventListener('click', openPopup(popupImageElement));