import './index.css';
import Api from '../components/Api.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupDeleteCard from '../components/PopupDeleteCard.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';

import {
  addFormElement,
  editFormElement,
  avatarFormElement,
  formValidationConfig,
  popupOpenAddButtonElement,
  popupOpenEditButtonElement,
  popupOpenEditAvatar,
  nameInput,
  jobInput,
  //deleteButton
} from '../utils/constants.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-62/',
  headers: {
    authorization: 'f19d5955-fde2-4669-b21e-ba1c6a5901ef',
    'Content-Type': 'application/json'
  }
});

const editFormPopup = new FormValidator (formValidationConfig, editFormElement);
editFormPopup.enableValidation();

const addFormPopup = new FormValidator (formValidationConfig, addFormElement);
addFormPopup.enableValidation();

const avatarFormPopup = new FormValidator (formValidationConfig, avatarFormElement);
avatarFormPopup.enableValidation();


const userInfo = new UserInfo({
  profileName: '.profile__title',
  profileJob: '.profile__text',
  profileAvatar: '.profile__avatar',
});

let cardList;

// Добавление карточек из массива
api.getInitialCards().then((data) => {
    cardList = new Section({
      renderer: (item) => {
        cardList.addItem(createCard(item));
      },
      containerSelector: '.elements'
    });
    cardList.renderItems(data);
  })
  .catch((err) => {
    console.log(err);
  });

function createCard(item) {
  const card = new Card({
    data: item, 
    handleCardClick: () => popupImage.open(item), 
    handleLikeClick: () => card.likeCard(),
    confirmDelete: () => {
      const delForm = new PopupDeleteCard(
        '.popup_delete',
        api.deleteCard(item._id),
        item
        );
      delForm.open();
    },
  }, 
  '#elements-template',
  api,
  userId
  );
  return card.generateCard();
}

let userId;

api.getUserInfo()
  .then((userData) => {
    userInfo.setUserInfo(userData)
    userId = userData._id
  })
  .catch((err) => {
    console.log(err);
  });

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

// Попап аватарки
function openAvatarPopup() {
  avatarFormPopup.resetValidation();
  avatarForm.open();
}

const popupImage = new PopupWithImage('.popup_image');
popupImage.setEventListeners();



const editForm = new PopupWithForm({
  popupSelector: '.popup_edit', 
  handleSubmitForm: () => {
    editForm.renderLoading(true);
    const inputValues = editForm.getInputValues();
    api.newUserInfo(inputValues)
    .then((newData) => {
      userInfo.setUserInfo(newData);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      editForm.renderLoading(false);
      editForm.close();
    })
  }
}); 
editForm.setEventListeners();

const addForm = new PopupWithForm({
  popupSelector: '.popup_add',
  handleSubmitForm: (item) => {
    addForm.renderLoading(true);
    api.addCard(item)
    .then((added) => {
      cardList.addItem(createCard(added));
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      addForm.renderLoading(false);
      addForm.close();
    })
  }
});
addForm.setEventListeners();

const avatarForm = new PopupWithForm({
  popupSelector: '.popup_avatar',
  handleSubmitForm: (data) => {
    avatarForm.renderLoading(true);
    api.editAvatar(data)
    .then((data) => {
      userInfo.setUserAvatar(data);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      avatarForm.renderLoading(false)
      avatarForm.close();
    })
  }
});
avatarForm.setEventListeners();

popupOpenEditButtonElement.addEventListener('click', openPopupProfile);
popupOpenAddButtonElement.addEventListener('click', openCardPopup);
popupOpenEditAvatar.addEventListener('click', openAvatarPopup);

