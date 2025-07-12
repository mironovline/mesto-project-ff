import "./pages/index.css";
import { createCard, removeCard, likeCard } from "./components/cards";
import { openModal, closeModal, addListeners } from "./components/modal";
import { initialCards } from "./scripts/cards";
import { enableValidation, clearValidation, configValidation } from "./components/validation";

// @todo: DOM узлы
const cardList = document.querySelector(".places__list");
const popupImageContainer = document.querySelector(".popup_type_image");
const popupCaption = popupImageContainer.querySelector(".popup__caption");
const popupImage = popupImageContainer.querySelector(".popup__image");
const popupProfileEdit = document.querySelector(".popup_type_edit");
const popupCardAdd = document.querySelector(".popup_type_new-card");

const cards = document.querySelector(".places__list");

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

const cardFormElement = document.forms["new-place"];
const cardName = cardFormElement.elements["place-name"];
const cardLink = cardFormElement.elements.link;

const profileFormElement = document.forms["edit-profile"];
const nameInput = profileFormElement.elements.name;
const jobInput = profileFormElement.elements.description;

// @todo: Вывести карточки на страницу
initialCards.forEach((cardData) => {
  const card = createCard(cardData, removeCard, likeCard, openImage);
  cardList.append(card);
});

function openImage(imgSrc, imgAlt) {
  popupImage.src = imgSrc;
  popupImage.alt = imgAlt;
  popupCaption.textContent = imgAlt;
  openModal(popupImageContainer);
}

function cardFormSubmit(evt) {
  evt.preventDefault();
  const newData = {
    name: cardName.value,
    link: cardLink.value,
  };
  cards.prepend(createCard(newData, removeCard, likeCard, openImage));
  cardFormElement.reset();
  closeModal(popupCardAdd);
}

cardFormElement.addEventListener("submit", cardFormSubmit);

function profileFormSubmit(evt) {
  evt.preventDefault();
  const name = nameInput.value;
  const job = jobInput.value;
  const profileTitle = document.querySelector(".profile__title");
  profileTitle.textContent = name;
  const profileDescription = document.querySelector(".profile__description");
  profileDescription.textContent = job;
  closeModal(popupProfileEdit);
}

profileFormElement.addEventListener("submit", profileFormSubmit);

editButton.addEventListener("click", () => {
  openModal(popupProfileEdit);
  nameInput.value = document.querySelector(".profile__title").textContent;
  jobInput.value = document.querySelector(".profile__description").textContent;
  clearValidation(popupProfileEdit, configValidation);
  //profileFormElement.reset();
});
addButton.addEventListener("click", () => {
  openModal(popupCardAdd);
  //cardFormElement.reset();
});

addListeners(popupProfileEdit);
addListeners(popupCardAdd);
addListeners(popupImageContainer);
enableValidation(configValidation);