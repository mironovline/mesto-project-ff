// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;      //в переменную cardTemplate записали содержимое шаблона

// @todo: DOM узлы
const cardList = document.querySelector('.places__list');                   //это куда будем вставлять карточки

// @todo: Функция создания карточки
const addCard = function (element) {                                        //функция принимает элемент (объект) из массива объектов исходных данных карточек
        const card = cardTemplate.querySelector('.card').cloneNode(true);   //клонируем шаблон карточки, помещаем его в переменную card, далее будем наполнять
        const cardImage = card.querySelector('.card__image');               //выбираем внутри спарсенного шаблона карточки изображение
        cardImage.src = element.link;                                       //выбираем ключ 'link' у объекта из массива исходных карточек и присваиваем его атрибуту 'src' у выбранного ранее изображения
        cardImage.alt = element.name;                                       //выбираем ключ 'name' у объекта из массива исходных карточек и присваиваем его атрибуту 'alt' у выбранного ранее изображения (иного описания изображения нам не дано)
        const cardTitle = card.querySelector('.card__title');               //выбираем заголовок внутри спарсенного шаблона карточки
        cardTitle.textContent = element.name;                               //выбираем ключ 'name' у объекта из массива исходных карточек и присваиваем его атрибуту 'src' у выбранного ранее изображения
        const removeButton = card.querySelector('.card__delete-button');    //выбираем кнопку внутри спарсенного шаблона карточки и записываем ее как объект в переменную removeButton
        removeButton.addEventListener('click', () => removeCard(card));     //вешаем на кнопку слушатель событий, который по клику запускает функцию удаления карточки
        return card;                                                        //функция возвращает наполненную карточку
}
// @todo: Функция удаления карточки
 const removeCard = function (card) {                                       //функция удаления карточки, принимает карточку в качестве аргумента
     card.remove();                                                         //удаляем карточку
 }
// @todo: Вывести карточки на страницу
initialCards.forEach(element => {                                           //цикл идет по массиву initialCards, на каждой итерации берет объект element из этого массива
    const card = addCard(element, removeCard);                              //вызываем функцию addCard и передаем ей объект element из массива исходных карточек и колбек удаления карточек и присваиваем результат ее выполнения переменной card
    cardList.append(card);                                                  //добавляем в конец cardList полученную card
})

