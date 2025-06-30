export const createCard = function (
  element,
  removeCardCallback,
  likeCardCallback,
  openImageCallback
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const buttonLike = card.querySelector(".card__like-button");

  const cardImage = card.querySelector(".card__image");
  const cardTitle = card.querySelector(".card__title");
  const removeButton = card.querySelector(".card__delete-button");

  cardImage.src = element.link;
  cardImage.alt = element.name;
  cardTitle.textContent = element.name;

  removeButton.addEventListener("click", () => removeCardCallback(card));
  buttonLike.addEventListener("click", likeCardCallback);
  cardImage.addEventListener("click", () => openImageCallback(element.link, element.name));
  return card;
};

export const removeCard = function (card) {
  card.remove();
};

export const likeCard = function (e) {
  e.target.classList.toggle("card__like-button_is-active");
};
