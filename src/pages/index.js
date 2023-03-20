import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';

import {
  initialCards,
  formValidationConfig,
  popupOpenAddButtonElement,
  popupOpenEditButtonElement,
  profileTitleElement,
  profileTextElement,
  nameInput,
  jobInput
} from '../utils/constants.js';


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
function openPopupProfile() {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.about;
  editFormPopup.resetValidation();
  editForm.open();
};

// Попап создания новой карточки
function openCardPopup() {
  addFormPopup.resetValidation();
  addForm.open();
};

const popupImage = new PopupWithImage('.popup_image');
popupImage.setEventListeners();

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

popupOpenEditButtonElement.addEventListener('click', openPopupProfile);
popupOpenAddButtonElement.addEventListener('click', openCardPopup);