export const createCard = function (
  element,
  userId,
  removeCardCallback,
  likeCardCallback,
  openImageCallback
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const buttonLike = card.querySelector(".card__like-button");
  const likeModifier = "card__like-button_is-active"; 

  const cardImage = card.querySelector(".card__image");
  const cardTitle = card.querySelector(".card__title");
  const removeButton = card.querySelector(".card__delete-button");
  const likesCount = card.querySelector(".card__likes-count");

  cardImage.src = element.link;
  cardImage.alt = element.name;
  cardTitle.textContent = element.name;

  const renderLikes = (data, userId) => {
    console.log(data);
    const isLiked = data.likes.some((like) => like._id === userId);
    buttonLike.classList.toggle(likeModifier, isLiked);
    likesCount.textContent = data.likes.length; 
  };

  if (element.owner._id === userId) {
    removeButton.addEventListener("click", () => removeCardCallback(element._id, card))
  } else {
    removeButton.remove();
  }

  buttonLike.addEventListener('click', () => likeCardCallback(element._id, userId, buttonLike.classList.contains(likeModifier), renderLikes));
  cardImage.addEventListener("click", () => openImageCallback(element.link, element.name));
  return card;
};

