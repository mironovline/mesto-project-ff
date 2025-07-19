import "./pages/index.css";
import { createCard, handleLikeIconClick } from "./components/cards";
import { openModal, closeModal, addListeners } from "./components/modal";
import { enableValidation, clearValidation } from "./components/validation";
import {
  getCard,
  postCard,
  deleteCard,
  getProfile,
  patchProfile,
  setUserAvatar,
  toggleLikePromise,
} from "./components/api";

const cardList = document.querySelector(".places__list");
const popupImageContainer = document.querySelector(".popup_type_image");
const popupCaption = popupImageContainer.querySelector(".popup__caption");
const popupImage = popupImageContainer.querySelector(".popup__image");
const popupProfileEdit = document.querySelector(".popup_type_edit");
const popupCardAdd = document.querySelector(".popup_type_new-card");
const popupTypeDelete = document.querySelector(".popup_type_delete");
const popupTypeAvatar = document.querySelector(".popup_type_avatar");

const cards = document.querySelector(".places__list");

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

const cardFormElement = document.forms["new-place"];
const cardFormButton = cardFormElement.querySelector(".popup__button");
const formConfirmation = document.forms["delete"];
const deleteButton = formConfirmation.querySelector(".popup__button");
const avatarForm = document.forms["new__avatar"];
const urlAvatarInput = avatarForm.elements.link;
const avatarSaveButton = avatarForm.querySelector(".popup__button");
const cardName = cardFormElement.elements["place-name"];
const cardLink = cardFormElement.elements.link;

const profileFormElement = document.forms["edit-profile"];
const nameInput = profileFormElement.elements.name;
const jobInput = profileFormElement.elements.description;
const profileButtonSave = profileFormElement.querySelector(".popup__button");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

let userId = null;
let cardForDelete = {};

const handleDeleteCard = (cardID, cardElement) => {
  cardForDelete = {
    id: cardID,
    cardElement,
  };
  openModal(popupTypeDelete);
};

const openImage = function (imgSrc, imgAlt) {
  popupImage.src = imgSrc;
  popupImage.alt = imgAlt;
  popupCaption.textContent = imgAlt;
  openModal(popupImageContainer);
};

function renderLoading(isLoading, buttonElement) {
  if (isLoading) {
    buttonElement.textContent = "Сохранение...";
    buttonElement.disabled = true;
  } else {
    buttonElement.textContent = "Сохранить";
    buttonElement.disabled = false;
  }
}

const handleDeleteCardSubmit = (evt) => {
  evt.preventDefault();
  if (!cardForDelete.cardElement) return;
  renderLoading(true, deleteButton);
  deleteCard(cardForDelete.id)
    .then(() => {
      cardForDelete.cardElement.remove();
      closeModal(popupTypeDelete);
      cardForDelete = {};
    })
    .catch((err) => {
      console.error(`Ошибка при удалении карточки: ${err}`);
    })
    .finally(() => {
      renderLoading(false, deleteButton);
    });
};

formConfirmation.addEventListener("submit", handleDeleteCardSubmit);

function cardFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, cardFormButton);
  postCard(cardName.value, cardLink.value)
    .then((cardObj) => {
      const card = createCard(
        cardObj,
        userId,
        handleDeleteCard,
        onLikeClick,
        openImage
      );
      cards.prepend(card);
      cardFormElement.reset();
      closeModal(popupCardAdd);
    })
    .catch((err) => {
      console.error(`Ошибка добавления карточки: ${err}`);
    })
    .finally(() => renderLoading(false, cardFormButton));
}

cardFormElement.addEventListener("submit", cardFormSubmit);

const profileFormSubmit = function (evt) {
  evt.preventDefault();
  renderLoading(true, profileButtonSave);
  const name = nameInput.value;
  const job = jobInput.value;
  const profileTitle = document.querySelector(".profile__title");
  profileTitle.textContent = name;
  const profileDescription = document.querySelector(".profile__description");
  profileDescription.textContent = job;
  patchProfile(name, job)
    .then((result) => {
      profileTitle.textContent = result.name;
      profileDescription.textContent = result.about;
      closeModal(popupProfileEdit);
    })
    .catch((err) =>
      console.log(`Ошибка изменения профиля пользователя: ${err}`)
    )
    .finally(() => renderLoading(false, profileButtonSave));
};

profileFormElement.addEventListener("submit", profileFormSubmit);

const editProfileImageSubmit = function (evt) {
  evt.preventDefault();
  renderLoading(true, avatarSaveButton);
  const urlAvatar = urlAvatarInput.value;
  setUserAvatar(urlAvatar)
    .then((result) => {
      profileImage.style.backgroundImage = `url(${result.avatar})`;
      closeModal(popupTypeAvatar);
    })
    .catch((err) =>
      console.log(`Ошибка изменения изображения пользователя: ${err}`)
    )
    .finally(() => renderLoading(false, avatarSaveButton));
};

avatarForm.addEventListener("submit", editProfileImageSubmit);

editButton.addEventListener("click", () => {
  clearValidation(popupProfileEdit, validationConfig);
  profileFormElement.reset();
  openModal(popupProfileEdit);
  nameInput.value = document.querySelector(".profile__title").textContent;
  jobInput.value = document.querySelector(".profile__description").textContent;
});

addButton.addEventListener("click", () => {
  clearValidation(popupCardAdd, validationConfig);
  cardFormButton.disabled = true;
  cardFormButton.classList.add(validationConfig.inactiveButtonClass);
  cardFormElement.reset();
  openModal(popupCardAdd);
});

profileImage.addEventListener("click", () => {
  clearValidation(popupTypeAvatar, validationConfig);
  avatarSaveButton.disabled = true;
  avatarSaveButton.classList.add(validationConfig.inactiveButtonClass);
  avatarForm.reset();
  openModal(popupTypeAvatar);
});

addListeners(popupProfileEdit);
addListeners(popupCardAdd);
addListeners(popupImageContainer);
addListeners(popupTypeDelete);
addListeners(popupTypeAvatar);
enableValidation(validationConfig);

const onLikeClick = handleLikeIconClick(toggleLikePromise);

Promise.all([getProfile(), getCard()])
  .then(([user, cards]) => {
    profileTitle.textContent = user.name;
    profileDescription.textContent = user.about;
    profileImage.style["background-image"] = `url(${user.avatar})`;
    userId = user._id;
    cards.forEach((data) => {
      const card = createCard(
        data,
        userId,
        handleDeleteCard,
        onLikeClick,
        openImage
      );
      cardList.append(card);
    });
  })
  .catch((err) => {
    console.error(`Ошибка получения данных: ${err}`);
  });
