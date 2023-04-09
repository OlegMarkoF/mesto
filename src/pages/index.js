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
  jobInput
} from '../utils/constants.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-62/',
  headers: {
    authorization: 'f19d5955-fde2-4669-b21e-ba1c6a5901ef',
    'Content-Type': 'application/json'
  }
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cardsData]) => {
    userInfo.setUserInfo(userData)
    userId = userData._id;
    cardList.renderItems(cardsData);
  })
  .catch((err) => {
    console.log(err);
  });

const editFormPopup = new FormValidator (formValidationConfig, editFormElement);
editFormPopup.enableValidation();

const addFormPopup = new FormValidator (formValidationConfig, addFormElement);
addFormPopup.enableValidation();

const avatarFormPopup = new FormValidator (formValidationConfig, avatarFormElement);
avatarFormPopup.enableValidation();

const formConfirmDeletion = new PopupDeleteCard ('.popup_delete', handleDeleteSubmit);
formConfirmDeletion.setEventListeners();

function handleDeleteSubmit(card) {
  formConfirmDeletion.renderLoading(true);
  api.deleteCard(card._id)
  .then(() => {
    card.deleteCard();
    formConfirmDeletion.close();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    formConfirmDeletion.renderLoading(false);
  })
}

const userInfo = new UserInfo({
  profileName: '.profile__title',
  profileJob: '.profile__text',
  profileAvatar: '.profile__avatar',
});

let cardList;
let userId;

// Добавление карточек из массива
cardList = new Section({
  renderer: (item) => {
    cardList.addItem(createCard(item));
    },
    containerSelector: '.elements'
  });

function createCard(item) {
  const card = new Card({
    data: item, 
    handleCardClick: () => popupImage.open(item), 
    handleLikeClick: () => {
      if (!card.likeCard()) {
        api.likeCard(card.getID())
        .then((data) => {
          card.setData(data);
          card.handleLikeView(true);
        }) 
        .catch((err) => console.log(err));
      } else {
        api.disLikeCard(card.getID())
        .then((data) => {
          card.setData(data);
          card.handleLikeView(false);
        }) 
        .catch((err) => console.log(err));
      }
    },
    confirmDelete: () => {
      formConfirmDeletion.open(card);
    }
  }, 
  '#elements-template',
  userId
  );
  return card.generateCard();
}

// Попап профиля
function openPopupProfile() {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.about;
  editFormPopup.resetValidation();
  formEditProfile.open();
};

// Попап создания новой карточки
function openCardPopup() {
  addFormPopup.resetValidation();
  formAddCard.open();
};

// Попап аватарки
function openAvatarPopup() {
  avatarFormPopup.resetValidation();
  avatarForm.open();
}

const popupImage = new PopupWithImage('.popup_image');
popupImage.setEventListeners();



const formEditProfile = new PopupWithForm({
  popupSelector: '.popup_edit', 
  handleSubmitForm: () => {
    formEditProfile.renderLoading(true);
    const inputValues = formEditProfile.getInputValues();
    api.newUserInfo(inputValues)
    .then((newData) => {
      userInfo.setUserInfo(newData);
      formEditProfile.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      formEditProfile.renderLoading(false);
    })
  }
}); 
formEditProfile.setEventListeners();

const formAddCard = new PopupWithForm({
  popupSelector: '.popup_add',
  handleSubmitForm: (item) => {
    formAddCard.renderLoading(true);
    api.addCard(item)
    .then((added) => {
      cardList.addItem(createCard(added));
      formAddCard.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      formAddCard.renderLoading(false);
    })
  }
});
formAddCard.setEventListeners();

const avatarForm = new PopupWithForm({
  popupSelector: '.popup_avatar',
  handleSubmitForm: (data) => {
    avatarForm.renderLoading(true);
    api.editAvatar(data)
    .then((data) => {
      userInfo.setUserAvatar(data);
      avatarForm.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      avatarForm.renderLoading(false);
    })
  }
});
avatarForm.setEventListeners();

popupOpenEditButtonElement.addEventListener('click', openPopupProfile);
popupOpenAddButtonElement.addEventListener('click', openCardPopup);
popupOpenEditAvatar.addEventListener('click', openAvatarPopup);

