import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor ({popupSelector, handleSubmitForm}) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._form = this._popup.querySelector('.popup__content');
    this._inputList = this._form.querySelectorAll('.popup__field');
    
  }

  _getInputValues() {
    this._inputValues = {};
    this._inputList.forEach((item) => {
      this._inputValues[item.name] = item.value;
    });
    return this._inputValues;
  }

  _submitForm = (evt) => {
    evt.preventDefault();
    this._handleSubmitForm(this._getInputValues());
    console.log(this._getInputValues());
    this._form.removeEventListener('submit', this._submitForm);
    this.close();
  };

  //Установить слушатели
  setEventListeners() {
    super.setEventListeners();
    //this._submitForm();
    this._form.addEventListener('submit', this._submitForm);
  }
  
  //Открыть Попап
  open() {
    super.open();
  }
  
  //Закрыть Попап
  close() {
    super.close();
    this._form.reset();
  }

}
