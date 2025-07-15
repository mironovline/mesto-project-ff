export const createCard = function (
  element,
  removeCardCallback,
  likeCardCallback,
  openImageCallback
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const buttonLike = card.querySelector(".card__like-button");
  const likeModifier = ".card__like-button_is-active";

  const cardImage = card.querySelector(".card__image");
  const cardTitle = card.querySelector(".card__title");
  const removeButton = card.querySelector(".card__delete-button");
  const likesCount = card.querySelector(".card__likes-count");

  cardImage.src = element.link;
  cardImage.alt = element.name;
  cardTitle.textContent = element.name;

   function renderLikes(element) {
    const isLiked = element.map((user) => user._id).includes(userId);
    buttonLike.classList.toggle(likeModifier, isLiked)
    likesCount.textContent = element.likes.length; 
  };
  buttonLike.addEventListener('click', () => likeCardCallback(element._id, buttonLike.classList.contains(likeModifier), renderLikes));
  removeButton.addEventListener("click", () => removeCardCallback(card));
  cardImage.addEventListener("click", () => openImageCallback(element.link, element.name));
  return card;
};

export const removeCard = function (card) {
  card.remove();
};