const popupList = document.querySelectorAll('.popup');
const popupEditElement = document.querySelector('.popup_edit');
const popupAddElement = document.querySelector('.popup_add');
const popupImageElement = document.querySelector('.popup_image');
const popupCloseAddButtonElement = popupAddElement.querySelector('.popup__close_add');
const popupCloseEditButtonElement = popupEditElement.querySelector('.popup__close_edit');
const popupCloseImageButtonElement = popupImageElement.querySelector('.popup__close_image');
const popupOpenEditButtonElement = document.querySelector('.profile__edit-button');
const popupOpenAddButtonElement = document.querySelector('.profile__add-button');
const formEditElement = document.querySelector('.popup__content_tipe_edit');
const formAddElement = document.querySelector('.popup__content_tipe_add');
const nameInput = formEditElement.querySelector('.popup__field_tipe_name');
const jobInput = formEditElement.querySelector('.popup__field_tipe_job');
const placeInput = formAddElement.querySelector('.popup__field_tipe_place');
const linkInput = formAddElement.querySelector('.popup__field_tipe_link');
const popupPhoto = document.querySelector('.popup__photo');
const profileTitleElement = document.querySelector('.profile__title');
const profileTextElement = document.querySelector('.profile__text');
const elementsTemplate = document.querySelector('#elements-template').content;
const elementsElement = document.querySelector('.elements__element');
const sectionElement = document.querySelector('.elements');
const addButton = popupAddElement.querySelector('.popup__button-save_add');
const popupSignature = document.querySelector('.popup__signature');
const popupFigure = document.querySelector('.popup__figure');
const cardFormSubmit = document.querySelector('.popup__content_tipe_add');
const buttonCloseList = document.querySelectorAll('.popup__close');


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

// Функция добавления карточек
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
    popupPhoto.src = item.link;
    popupSignature.textContent = item.name;
    popupPhoto.alt = item.name;
  });

  // Удаление карточки
  cardElement.querySelector('.elements__delete').addEventListener('click', function(evt){
    cardElement.remove();
  });

  return cardElement;
}

// Добавление карточек из массива.
initialCards.forEach(function (item) {
  sectionElement.append(createCard(item));
})

// Добавление карточки через Popup
cardFormSubmit.addEventListener('submit', function(evt) {
  evt.preventDefault();
  const newCard = createCard({name: placeInput.value, link: linkInput.value});

  sectionElement.prepend(newCard);
  closePopup(popupAddElement);
  evt.submitter.classList.add('popup__button-save_disabled');
  evt.submitter.disabled = true;
})

// Данные профиля = данные попап
function handleEditFormSubmit(evt) {
  evt.preventDefault();

  profileTitleElement.textContent = nameInput.value;
  profileTextElement.textContent = jobInput.value;

  closePopup(popupEditElement);
}

// Функии открытия попап
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByPressOnEscape);
}

// Функии закрытия попап
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByPressOnEscape);
}

//Функии закрытия попап по Overlay
function closePopupByClickOnOverlay(evt) {
  if (evt.target == evt.currentTarget) {
    const closePopupByOverlay = document.querySelector('.popup_opened');
    closePopup(closePopupByOverlay);
  }
}

//Функии закрытия попап по Escape
function closePopupByPressOnEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

//Спасибо. Это очень круто!! Надеюсь я научусь мыслить похожим образом
buttonCloseList.forEach(btn => {
  const popup = btn.closest('.popup');
  btn.addEventListener('click', () => closePopup(popup));
  popup.addEventListener('mousedown', closePopupByClickOnOverlay);
});
popupOpenEditButtonElement.addEventListener('click', () => {
  nameInput.value = profileTitleElement.textContent;
  jobInput.value = profileTextElement.textContent;
  openPopup(popupEditElement)
});
popupOpenAddButtonElement.addEventListener('click', () => openPopup(popupAddElement));
formEditElement.addEventListener('submit', handleEditFormSubmit);
