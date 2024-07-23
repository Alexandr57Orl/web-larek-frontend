import { Model } from './base/model';
import {
	IItemsProducts,
	IUser,
	IFormValidateErrors,
	TForm,
	IChechedState,
} from '../types';

export class CheckedState extends Model<IChechedState> {
	products: IItemsProducts[] = [];
	show: IItemsProducts;
	basketItems: IItemsProducts[] = [];
	total: number | null;
	order: IUser = {
		email: '', // почта
		phone: '', // телефон
		address: '', // адрес
		payment: '', // выбранный способ оплаты
		items: [], // массив продуктов
		total: 0, // итоговая сумма
	};

	formErrors: IFormValidateErrors = {};

	//отображение карточки
	showOneItem(product: IItemsProducts[], id: string) {
		return (this.show = product.filter((item) => item.id === id)[0]);
	}

	//добавление карточки в корзину
	addItemtoBasket(item: IItemsProducts) {
		this.basketItems.push(item);
		this.emitChanges('basketData:changed', { basketList: this.basketItems });
	}

	//удаление товара из корзины
	removeItemFromBasket(id: string) {
		this.basketItems = this.basketItems.filter((item) => item.id !== id);
		this.emitChanges('basketData:changed', { basketList: this.basketItems });
	}

	//получаем продукты в корзине
	getItemsBasket(): IItemsProducts[] {
		return this.basketItems;
	}

	//очищаем корзину
	clearBasket() {
		this.basketItems = [];
		this.emitChanges('basketData:changed', { basket: this.basketItems });
	}

	//получаем количество продуктов в корзине
	getCounterBasket(): number {
		return this.basketItems.length;
	}

	//получаем итоговую сумму
	getTotalPrice(): number {
		let sum = 0;
		this.basketItems.forEach((item) => {
			sum += item.price;
		});
		return sum;
	}

	//очищает данные заказа после его успешного завершения
	clearAfterOrder() {
		this.order.payment = '';
		this.order.address = '';
		this.order.email = '';
		this.order.phone = '';
	}

	//получаем список продуктов
	setProductItems(items: IItemsProducts[]) {
		this.products = items;
		this.emitChanges('Info: loaded', { productList: this.products });
	}

	//показываем карточку
	setPreviewPopap(id: string) {
		const cardItem = this.showOneItem(this.products, id);
		this.show = cardItem;
		this.emitChanges('preview:changed');
	}

	//добавление id продукта в область заказа
	setOrder() {
		if (this.basketItems.length !== 0) {
			this.order.items = this.basketItems.map((item) => item.id);
			this.emitChanges('datapaymentform:opened');
		}
	}

	getPreviewPopap() {
		return this.show;
	}

	//получаем выбранный способ оплаты
	setDataPay(isvalue: string) {
		this.order.payment = isvalue;
		this.emitChanges('paymentType:buttonSelected', { payment: this.total });
	}

	// Сразу же делаем валидацию для вводимых данных

	//проверка на заполненность полей данными о способе оплаты адресе телефона и почты
	infoUserValidation(): boolean {
		//проверка заполненности телефона
		const errors: typeof this.formErrors = {};
		//проверка заполненности почты
		if (!this.order.payment) {
			errors.payment = 'Не указан способ оплаты'; //Если  отсутствует, то добавляется ключ  со значением "Неуказан способ оплаты"
		}
		//проверка заполненности адреса
		else if (!this.order.address) {
			//проверка заполненности адреса
			errors.address = 'Не указан адрес';
			//проверка заполненности почты
		} else if (!this.order.email) {
			errors.email = 'Не указан email';
		}
		//проверка заполненности телефона
		else if (!this.order.phone) {
			errors.phone = 'Не указан телефон';
		}

		//Сохраняем ошибки в свойство formErrors
		this.formErrors = errors;
		this.events.emit('formErrors:change', this.formErrors); // вызываем событие "formErrors:change" и передаем в него объект errors
		return Object.keys(errors).length === 0; // возвращаем true, если объект errors пустой
	}

	setOrderFields(field: keyof TForm, value: string) {
		this.order[field] = value;

		//проверка на заполненность полей данными о способе оплаты адресе телефона и почты
		if (this.infoUserValidation()) {
			this.events.emit('order:ready', this.order);
		}
	}

	//добавляем данные заказа
	addOrderId() {
		if (this.basketItems.length !== 0) {
			this.order.items = this.basketItems.map((item) => {
				return item.id;
			}, this.emitChanges('datapaymentform:opened'));
		}
	}

	//получаем выбранный тип оплаты
	get payment() {
		return this.order.payment;
	}

	set _price(value: number) {
		this.total = value;
	}
}
