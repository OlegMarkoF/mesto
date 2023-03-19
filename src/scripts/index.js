import '../pages/index.css';
import Card from './Card.js';
import Popup from './Popup.js';
import FormValidator from './FormValidator.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';
import Section from './Section.js';

import {
  initialCards,
  formValidationConfig,
  popupOpenAddButtonElement,
  popupOpenEditButtonElement,
  profileTitleElement,
  profileTextElement,
  nameInput,
  jobInput
} from '../constants/constants.js';


function createCard(item) {
  const card = new Card(item, '#elements-template', () => {popupImage.open(item)});
  return card.generateCard();
}

// Добавление карточек из массива.
const createCardList = new Section({
  renderer: (item) => {
    createCardList.addItem(createCard(item));
  },
  containerSelector: '.elements'
});
createCardList.renderItems(initialCards);

// Попап профиля
function profilePopup() {
  nameInput.value = profileTitleElement.textContent;
  jobInput.value = profileTextElement.textContent;
  editFormPopup.resetValidation();
  editForm.open();
};

// Попап создания новой карточки
function newCardPopup() {
  addFormPopup.resetValidation();
  addForm.open();
};

const popupImage = new PopupWithImage('.popup_image');

const userInfo = new UserInfo({
  profileName: '.profile__title',
  profileJob: '.profile__text',
});


const editForm = new PopupWithForm({
  popupSelector: '.popup_edit', 
  handleSubmitForm: (data) => {
    userInfo.setUserInfo(data);
  }
}); 
editForm.setEventListeners();

const addForm = new PopupWithForm({
  popupSelector: '.popup_add',
  handleSubmitForm: (item) => {
    createCardList.addItem(createCard(item));
  }
});
addForm.setEventListeners();

const editFormElement = document.querySelector('.popup__content_tipe_edit');
const editFormPopup = new FormValidator (formValidationConfig, editFormElement);
editFormPopup.enableValidation();

const addFormElement = document.querySelector('.popup__content_tipe_add');
const addFormPopup = new FormValidator (formValidationConfig, addFormElement);
addFormPopup.enableValidation();

popupOpenEditButtonElement.addEventListener('click', profilePopup);
popupOpenAddButtonElement.addEventListener('click', newCardPopup);