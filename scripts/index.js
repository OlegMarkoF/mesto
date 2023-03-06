import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const popupEditElement = document.querySelector('.popup_edit');
const popupAddElement = document.querySelector('.popup_add');
const popupOpenEditButtonElement = document.querySelector('.profile__edit-button');
const popupOpenAddButtonElement = document.querySelector('.profile__add-button');
const formEditElement = document.querySelector('.popup__content_tipe_edit');
const formAddElement = document.querySelector('.popup__content_tipe_add');
const nameInput = formEditElement.querySelector('.popup__field_tipe_name');
const jobInput = formEditElement.querySelector('.popup__field_tipe_job');
const placeInput = formAddElement.querySelector('.popup__field_tipe_place');
const linkInput = formAddElement.querySelector('.popup__field_tipe_link');
const profileTitleElement = document.querySelector('.profile__title');
const profileTextElement = document.querySelector('.profile__text');
const sectionElement = document.querySelector('.elements');
const cardFormSubmit = document.querySelector('.popup__content_tipe_add');
const buttonCloseList = document.querySelectorAll('.popup__close');

const formValidationConfig = {
  formSelector: '.popup__content',
  inputSelector: '.popup__field',
  inputErrorClass: 'popup__field-error',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  errorClass: 'popup__field_tipe_error'
};

const initialCards = [
  {
    name: 'Шир',
    link: 'https://new-world-rpg.ru/wp-content/uploads/1/e/7/1e76dbd97fb3ddb92b0e4eb86989d553.jpeg'
  },
  {
    name: 'Пандора',
    link: 'https://blogmickey.com/wp-content/uploads/2017/05/Pandora-environment-05072017-9.jpg'
  },
  {
    name: 'Эребор',
    link: 'https://i.pinimg.com/originals/d8/88/48/d8884896b364a4751c4b3233e2f6dda3.jpg'
  },
  {
    name: '10 Королевство',
    link: 'https://cdn.smartfacts.ru/387147/desyatoe-korolevstvo_0.jpg'
  },
  {
    name: 'Аграба',
    link: 'https://images.stopgame.ru/uploads/images/262791/form/1397645241.jpg'
  },
  {
    name: 'Изумрудный город',
    link: 'https://pic.rutubelist.ru/video/7b/fe/7bfec09506d0c8529b093d6c691ee3df.jpg'
  }
];

function createCard(item) {
  const card = new Card(item, '#elements-template');
  return card.generateCard();
}

// Добавление карточек из массива.
initialCards.forEach(function (item) {
  const cardElement = createCard(item);
  sectionElement.append(cardElement);
});

// Добавление карточки через Popup
cardFormSubmit.addEventListener('submit', function(evt) {
  evt.preventDefault();
  const dataPopup = {
    name: placeInput.value,
    link: linkInput.value
  };
  const newCard = createCard(dataPopup);
  sectionElement.prepend(newCard);
  evt.target.reset();
  closePopup(popupAddElement);
  
})

// Данные профиля = данные попап
function handleEditFormSubmit(evt) {
  evt.preventDefault();

  profileTitleElement.textContent = nameInput.value;
  profileTextElement.textContent = jobInput.value;

  closePopup(popupEditElement);
}


// Функция открытия попап
export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByPressOnEscape);
  addFormPopup._resetValidation();
  editFormPopup._resetValidation();
}

// Функция закрытия попап
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByPressOnEscape);
  
}

// Функция закрытия попап по Overlay
function closePopupByClickOnOverlay(evt) {
  if (evt.target == evt.currentTarget) {
    closePopup(evt.target);
  }
}

// Функция закрытия попап по Escape
function closePopupByPressOnEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

buttonCloseList.forEach(btn => {
  const popup = btn.closest('.popup');
  btn.addEventListener('click', () => closePopup(popup));
  popup.addEventListener('mousedown', closePopupByClickOnOverlay);
});

popupOpenEditButtonElement.addEventListener('click', () => {
  nameInput.value = profileTitleElement.textContent;
  jobInput.value = profileTextElement.textContent;
  openPopup(popupEditElement);
});

popupOpenAddButtonElement.addEventListener('click', () => openPopup(popupAddElement));
formEditElement.addEventListener('submit', handleEditFormSubmit);


const editForm = document.querySelector('.popup__content_tipe_edit'); 
const editFormPopup = new FormValidator (formValidationConfig, editForm);
editFormPopup.enableValidation();

const addForm = document.querySelector('.popup__content_tipe_add');
const addFormPopup = new FormValidator (formValidationConfig, addForm);
addFormPopup.enableValidation();