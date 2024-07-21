import './scss/styles.scss';

import { EventEmitter } from './components/base/events';
import { ensureElement,cloneTemplate,createElement } from './utils/utils';
import { AppApi } from './components/AppApi';
import { API_URL, CDN_URL, settings } from './utils/constants';
import { Card,parametrsWithCategory } from './components/Card';
import { CheckedState } from './components/CheckedState';
import type { IItemsProducts, TForm } from './types/index';

import { Page } from './components/Page'
import { Modal } from './components/Modal';
import { Basket } from './components/Basket';
import { ChoicePayAndAdress } from './components/ChoicePayAndAdress';
import { UserDataForm } from './components/UserDataForm'; 
import { SuccessfulOrder } from './components/SuccessfulOrder'; 

const events = new EventEmitter();
const gallery = document.querySelector('.gallery');
const modalContainer = ensureElement<HTMLElement>('.modal');

const cardTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const succesTemplate = ensureElement<HTMLTemplateElement>('#success');
const cardCatalogTemplaye = ensureElement<HTMLTemplateElement>('#card-catalog');
const previewCardTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const justBasketTemplate = ensureElement<HTMLTemplateElement>('#basket');


// создаем объекты форм и компонентов на основе классов

// const userPayAndDress = new ChoicePayAndAdress(cloneTemplate(orderTemplate), events);
// const contactsForm = new UserDataForm(cloneTemplate(contactsTemplate), events);
// const successfulOrder = new SuccessfulOrder(cloneTemplate(succesTemplate), events);

const page = new Page(document.body, events);
const modal = new Modal(modalContainer, events);
const checkedState = new CheckedState({}, events);
const basket = new Basket(cloneTemplate(justBasketTemplate), events);


// массив карточек с сервера получаем с помощью API (Postman)

const api = new AppApi(CDN_URL, API_URL);

api.getProducts()
  .then((res) => {
    checkedState.setProductItems(res)
  })
  .catch(err => {
    console.log(err)
    modal.render({
    content: createElement<HTMLParagraphElement>('p', {
      textContent: 'Ошибка подключения к серверу. Повторите попытку позднее.'
        })
      })
    }
  );

// отрисовка карточек на главном экране сайта

events.on('Info: loaded', () => {
    checkedState.products.forEach(item => {
        const card = new Card('card', cloneTemplate(cardTemplate), events)
      
        const catalog = card.render({
            title: item.title,
            image: item.image,
            price: item.price,
            description: item.description,
            category: item.category,
            id: item.id,
        });
        gallery.appendChild(catalog);
    })
})


// попап карточки при клике

events.on('card:selected', (data:{id:string})=>{
checkedState.setPreviewPopap( data.id)
})
    
events.on("preview:changed",()=>{
    const card = new Card('card', cloneTemplate(previewCardTemplate), events)
    const showPreview = checkedState.getPreviewPopap();
    const itemsInBasket = checkedState.getItemsBasket();

    itemsInBasket.find(item => item.id === showPreview.id) ? card.textButton = 'Удалить' : card.textButton = 'В Корзину'

    const addCardElement = card.render({
        title: showPreview.title,
        image: showPreview.image,
        price: showPreview.price,
        description: showPreview.description,
        category: showPreview.category,
        id: showPreview.id,
    });
    modal.render({content: addCardElement});
})

// попап корзины при клике на главной странице

//ОТКРЫТИЕ МОДАЛЬНОГО ОКНА СО СПИСКОМ ТОВАРОВ ПРИ КЛИКЕ НА ИКОНКУ КОРЗИНЫ НА ГЛАВНОЙ
events.on('basketList:opened', (ItemsProducts: {basketList: IItemsProducts[]}) => {
  const ArrayProductsInBasket: HTMLElement[] = checkedState.basketItems.map((item, index) => {
      const cardInBasket = new Card('card', cloneTemplate(cardBasketTemplate), events);
        return cardInBasket.render({
          title: item.title,
          price: item.price,
          indexCard: index +1,
          id: item.id
      })
  })
  const totalInBasket = checkedState.getTotalPrice()
modal.render({
  content: basket.render({
    items: ArrayProductsInBasket,
  total: totalInBasket
  })
  })
})


// попап корзины с добавленным товаром

const basketItems: HTMLElement[] = checkedState.basketItems.map((item, index) => {
  const basketCardItem = new Card('card', cloneTemplate(cardBasketTemplate), events);
    return basketCardItem.render({
      indexCard: index +1,
      title: item.title,
      price: item.price,
      id: item.id
  })
})

const totalFullPrice = checkedState.getTotalPrice()
modal.render({
      content: basket.render({
      items: basketItems,
      total: totalFullPrice 
      })
  })

//ДОБАВЛЕНИЕ/УДАЛЕНИЕ ТОВАРА В СПИСОК/ИЗ СПИСКА ТОВАРОВ ПРИ КЛИКЕ НА КНОПКУ  
events.on('item:updateBasket',  () => {
  const preview = checkedState.getPreviewPopap();
  const basketItem = checkedState.getItemsBasket();

  if (!basketItem.find(item => {return item.id === preview.id})) {
      checkedState.addItemtoBasket(preview);
  } else {
      checkedState.removeItemFromBasket(preview.id);
  }
  checkedState.setPreviewPopap(preview.id);
}) 

events.on('item:addToBasket',  () => {
  const preview = checkedState.getPreviewPopap();
  const basketItems = checkedState.getItemsBasket();

  if (!basketItems.find(item => {return item.id === preview.id})) {
      checkedState.addItemtoBasket(preview);
      checkedState.setPreviewPopap(preview.id)
  }
})

events.on('item:rmFromBasket',  (data: {id: string}) => {
  checkedState.removeItemFromBasket(data.id)
})





//   // Добавление товара по id в корзину
// events.on('orderItems:added', () => {
//   checkedState.addOrderId()
//   const totalFullPrice = checkedState.getTotalPrice();
//   checkedState.order.total = totalFullPrice;
// })


