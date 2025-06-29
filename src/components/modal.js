export const openModal = function (m) {
    const profileFormElement = document.forms['edit-profile'];
    const nameInput = profileFormElement.elements.name;
    const jobInput = profileFormElement.elements.description;
    m.classList.add('popup_is-animated');
    m.classList.add('popup_is-opened');
    document.addEventListener('keyup', handleEscKeyUp);
    nameInput.value = document.querySelector('.profile__title').textContent;
    jobInput.value = document.querySelector('.profile__description').textContent; 
};

const handleEscKeyUp = (evt) => {
    if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened"); // находим открытый попап
    closeModal(popup);
    }
};

export const closeModal = function (m) {
    m.classList.remove('popup_is-opened');
    m.classList.remove('popup_is-animated');
    document.removeEventListener('keyup', handleEscKeyUp);
};
  
export const addListeners = function (popupElement) {
    const closeButton = popupElement.querySelector('.popup__close');
    closeButton.addEventListener('click', () => closeModal(popupElement));
    popupElement.addEventListener('mousedown', (evt) => {
    if (evt.target === evt.currentTarget)
        closeModal(popupElement);
    });
}