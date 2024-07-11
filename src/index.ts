import './scss/styles.scss';

import { EventEmitter } from './components/base/events';
import { AppApi } from './components/AppApi';
import { API_URL, CDN_URL } from './utils/constants';
// import { cloneTemplate, createElement, ensureElement } from './utils/utils';

// import type { IItemsProducts, TForm } from './types/index';

// const events = new EventEmitter();

// const api = new AppApi(CDN_URL, API_URL);

// const gallery = document.querySelector('.gallery');

// const cardTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
// const adressPaymentTemplate = ensureElement<HTMLTemplateElement>('#order');
// const contactsFormTemplate = ensureElement<HTMLTemplateElement>('#contacts');
// const successOrderTemplate = ensureElement<HTMLTemplateElement>('#success');
// const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
// const modalContainer = ensureElement<HTMLElement>('.modal');
// const basket = ensureElement<HTMLTemplateElement>('#basket');
// const cardInBasket = ensureElement<HTMLTemplateElement>('#card-basket');

//ПОЛУЧЕНИЕ МАССИВА КАРТОЧЕК С СЕРВЕРА
// api
// 	.getProducts()
// 	.then((res) => {
// 		dataHandler.setProductList(res);
// 	})
// 	.catch((err) => {
// 		console.log(err);
// 		modal.render({
// 			content: createElement<HTMLParagraphElement>('p', {
// 				textContent: 'Ошибка сервера. Повторите попытку позже.',
// 			}),
// 		});
// 	});

let api = new AppApi(CDN_URL, API_URL);

console.log(api.getProducts());
