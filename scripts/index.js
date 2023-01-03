const groupActiveElement = document.querySelector('.elements__group');

const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');

const activeElement = function(event) {
  groupActiveElement.classList.add('elements__group_active');}

const openPopup = function(event) {
  popupElement.classList.add('popup_opened');
  console.log('open popup clicked');}

const closePopup = function () {
  popupElement.classList.remove('popup_opened');}

const closePopupByClickOnOverlay = function(event) {
  console.log(event.target, event.currentTarget);
  if (event.target == event.currentTarget) {
    closePopup();
  }
}

groupActiveElement.addEventListener('click', activeElement);

popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
popupElement.addEventListener('click', closePopupByClickOnOverlay);