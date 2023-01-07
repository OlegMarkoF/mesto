
const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');

const openPopup = function(event) {
  popupElement.classList.add('popup_opened');}

const closePopup = function () {
  popupElement.classList.remove('popup_opened');}

const closePopupByClickOnOverlay = function(event) {
  if (event.target == event.currentTarget) {
    closePopup();
  }
}

//const editProfileTitle = function(event) {
//  if (event.target == event.currentTarget) {
//    closePopup();
//  }
//}

popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
popupElement.addEventListener('click', closePopupByClickOnOverlay);


let formElement = document.querySelector('.popup__content');
let nameInput = document.querySelector('.popup__field_tipe_name');
let jobInput = document.querySelector('.popup__field_tipe_job');

let profileTitleElement = document.querySelector('.profile__title');
let profileTextElement = document.querySelector('.profile__text');

nameInput.value = profileTitleElement.textContent;
jobInput.value = profileTextElement.textContent;

function handleFormSubmit (evt) {
    evt.preventDefault();

    

    profileTitleElement.textContent = nameInput.value;
    profileTextElement.textContent = jobInput.value;

    // Получите значение полей jobInput и nameInput из свойства value

    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
}

formElement.addEventListener('submit', handleFormSubmit);