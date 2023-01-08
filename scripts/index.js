
const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');
const formElement = document.querySelector('.popup__content');
const nameInput = document.querySelector('.popup__field_tipe_name');
const jobInput = document.querySelector('.popup__field_tipe_job');
const profileTitleElement = document.querySelector('.profile__title');
const profileTextElement = document.querySelector('.profile__text');


const openPopup = function(event) {
  nameInput.value = profileTitleElement.textContent;
  jobInput.value = profileTextElement.textContent;
  popupElement.classList.add('popup_opened');}

const closePopup = function () {
  popupElement.classList.remove('popup_opened');}

const closePopupByClickOnOverlay = function(event) {
  if (event.target == event.currentTarget) {
    closePopup();
  }
}


function handleFormSubmit (evt) {
    evt.preventDefault();

    profileTitleElement.textContent = nameInput.value;
    profileTextElement.textContent = jobInput.value;

    closePopup();
}

popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
popupElement.addEventListener('click', closePopupByClickOnOverlay);
formElement.addEventListener('submit', handleFormSubmit);
