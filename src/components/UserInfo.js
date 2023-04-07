export default class UserInfo {
  constructor ({profileName, profileJob, profileAvatar}) {
    this._profileName = profileName;
    this._profileJob = profileJob;
    this._profileAvatar = profileAvatar;
    this._userName = document.querySelector(this._profileName);
    this._userJob = document.querySelector(this._profileJob);
    this._userAvatar = document.querySelector(this._profileAvatar);
  }

  getUserInfo() {
    this._userInfo = {};
    this._userInfo.name = this._userName.textContent;
    this._userInfo.about = this._userJob.textContent;
    return this._userInfo;
  }

  // Данные профиля = данные попап
  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userJob.textContent = data.about;
    this.setUserAvatar(data);
  }

  setUserAvatar(data) {
    this._userAvatar.src = data.avatar;
  }

}