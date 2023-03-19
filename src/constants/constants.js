export const initialCards = [
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

export const formValidationConfig = {
  formSelector: '.popup__content',
  inputSelector: '.popup__field',
  inputErrorClass: 'popup__field-error',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  errorClass: 'popup__field_tipe_error'
};

export const popupEditElement = document.querySelector('.popup_edit');
export const popupAddElement = document.querySelector('.popup_add');
export const popupOpenEditButtonElement = document.querySelector('.profile__edit-button');
export const popupOpenAddButtonElement = document.querySelector('.profile__add-button');
export const profileTitleElement = document.querySelector('.profile__title');
export const profileTextElement = document.querySelector('.profile__text');
export const buttonCloseList = document.querySelectorAll('.popup__close');
export const nameInput = document.querySelector('.popup__field_tipe_name');
export const jobInput = document.querySelector('.popup__field_tipe_job');