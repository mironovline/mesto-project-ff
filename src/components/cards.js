export const createCard = function (
  cardData,
  userId,
  removeCardCallback,
  likeCardCallback,
  openImageCallback
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const buttonLike = card.querySelector(".card__like-button");
  // const likeModifier = "card__like-button_is-active";

  const cardImage = card.querySelector(".card__image");
  const cardTitle = card.querySelector(".card__title");
  const removeButton = card.querySelector(".card__delete-button");
  const likesCount = card.querySelector(".card__likes-count");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  const cardID = cardData._id;
  const isLiked = cardData.likes.some((like) => like._id === userId);
  if (isLiked) {
    buttonLike.classList.add("card__like-button_is-active");
  }
  if (cardData.owner._id === userId) {
    removeButton.addEventListener("click", () =>
      removeCardCallback(cardID, card)
    );
  } else {
    removeButton.remove();
  }
  buttonLike.addEventListener("click", () =>
    likeCardCallback(cardID, buttonLike, likesCount)
  );
  cardImage.addEventListener("click", () =>
    openImageCallback(cardData.link, cardData.name)
  );
  return card;
};
