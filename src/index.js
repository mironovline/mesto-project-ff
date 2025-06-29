import './pages/index.css';
import { addCard, removeCard, likeCard, openImage } from './components/cards';
import { openModal, closeModal, addListeners } from './components/modal';
import { initialCards } from './scripts/cards';

// @todo: DOM узлы
const cardList = document.querySelector(".places__list");
const popupImageContainer = document.querySelector('.popup_type_image');
const popupImage = popupImageContainer.querySelector('.popup__image');
const popupProfileEdit = document.querySelector('.popup_type_edit');
const popupCardAdd = document.querySelector('.popup_type_new-card');

const cards = document.querySelector('.places__list');

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const cardFormElement = document.forms['new-place'];
const cardName = cardFormElement.elements['place-name'];
const cardLink = cardFormElement.elements.link;

const profileFormElement = document.forms['edit-profile'];
const nameInput = profileFormElement.elements.name;
const jobInput = profileFormElement.elements.description;

// @todo: Вывести карточки на страницу
initialCards.forEach((cardData) => {                                       
  const card = addCard(cardData, removeCard, likeCard, openImage);                              
  cardList.append(card);                                                  
});

function cardFormSubmit(evt) {
  evt.preventDefault();
  const newData = {
    name: cardName.value,
    link: cardLink.value
  };
  cards.prepend(addCard(newData, removeCard, likeCard, openImage));
  // popupCardAdd.classList.remove('popup_is-opened');
  cardFormElement.reset();
  closeModal(popupCardAdd);
}

cardFormElement.addEventListener('submit', cardFormSubmit);

function profileFormSubmit(evt) {
  evt.preventDefault();
  const name = nameInput.value;
  const job = jobInput.value;
  const profileTitle = document.querySelector('.profile__title');
  profileTitle.textContent = name;
  const profileDescription = document.querySelector('.profile__description');
  profileDescription.textContent = job;
  closeModal(popupProfileEdit);
}

profileFormElement.addEventListener('submit', profileFormSubmit);

editButton.addEventListener('click', () => {
      openModal(popupProfileEdit);
  });
addButton.addEventListener('click', () => {
      openModal(popupCardAdd);
  });
  
cards.addEventListener('click', () => {
      openModal(popupImage);
  });

addListeners(popupProfileEdit);
addListeners(popupCardAdd);
addListeners(popupImageContainer);