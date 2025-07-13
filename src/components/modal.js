export const openModal = function (m) {
  m.classList.add("popup_is-opened");
  document.addEventListener("keyup", handleEscKeyUp);
};

const handleEscKeyUp = (evt) => {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened"); // находим открытый попап
    closeModal(popup);
  }
};

export const closeModal = function (m) {
  m.classList.remove("popup_is-opened");
  document.removeEventListener("keyup", handleEscKeyUp);
};

export const addListeners = function (popupElement) {
  const closeButton = popupElement.querySelector(".popup__close");
  closeButton.addEventListener("click", () => closeModal(popupElement));
  popupElement.addEventListener("mousedown", (evt) => {
    if (evt.target === evt.currentTarget) closeModal(popupElement);
  });
};
