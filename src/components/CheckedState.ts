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
	total: number | null = null;
	order: IUser = {
		email: '', // почта
		phone: '', // телефон
		address: '', // адрес
		typePay: '', // выбранный способ оплаты
		products: [], // массив продуктов
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
		let price = 0;
		this.basketItems.forEach((item) => {
			price += item.price;
		});
		return price;
	}

	//очищает данные заказа после его успешного завершения
	clearAfterOrder() {
		this.order.typePay = 'cash';
		this.order.address = 'Москоу';
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

	//добавление id продукта в поле заказа
	setOrder() {
		if (this.basketItems.length !== 0) {
			this.order.products = this.basketItems.map((item) => item.id);
			this.emitChanges('datapaymentform:opened');
		}
	}

	getPreviewPopap() {
		return this.show;
	}

	//получаем выбранный способ оплаты
	setDataPay(value: string) {
		this.order.typePay = value;
		this.emitChanges('paymentType:buttonSelected', { typePay: this.typePay });
	}

	// Сразу же делаем валидацию для вводимых данных

	//проверка на заполненность полей данными о способе оплаты и адресе
	infoUserValidation(): boolean {
		const errors: typeof this.formErrors = {};
		if (!this.order.typePay) {
			//проверяет есть ли сво-во typePay в объекте this.order
			errors.typePay = 'Не указан способ оплаты'; //Если typepay отсутствует, то добавляется ключ typePay со значением "Неуказан способ оплаты"
		} else if (!this.order.address) {
			//проверяет есть ли сво-во adress в объекте this.order
			errors.address = 'Не указан адрес'; //Если adress отсутствует, то добавляется ключ adress со значением "Неуказан адрес"
		} else if (!this.order.email) {
			//проверяет есть ли сво-во email в объекте this.order
			errors.email = 'Не указан email'; //Если email отсутствует, то добавляется ключ email со значением "Неуказан email"
		} else if (!this.order.phone) {
			//проверяет есть ли сво-во phone в объекте this.order
			errors.phone = 'Не указан телефон'; //Если phone отсутствует, то добавляется ключ phone со значением "Неуказан телефон"
		}
		this.formErrors = errors; //ошибки валидации сохраняются в свойство formErrors.
		this.events.emit('formErrors:change', this.formErrors); //Событие form-payment:validation отправляется с объектом this.formErrors в качестве аргумента. Это событие обрабатывается в другой части приложения для отображения ошибок пользователю

		return Object.keys(errors).length === 0; //возвращает количество ключей в объекте errors, и если это значение равно нулю, то ошибок нет
	}

	//получаем данные о пользователе
	setOrderFields(field: keyof TForm, value: string) {
		this.order[field] = value;

		// Проверка наличия всех необходимых данных и отправка события, если они есть
		if (this.infoUserValidation()) {
			this.events.emit('order:ready', this.order);
		}
	}

	//добавляем данные заказа
	addOrderId() {
		if (this.basketItems.length !== 0) {
			this.order.products = this.basketItems.map((item) => {
				return item.id;
			}, this.emitChanges('datapaymentform:opened'));
		}
	}

	//получаем выбранный тип оплаты
	get typePay() {
		return this.order.typePay;
	}

	set _total(value: number) {
		this.total = value;
	}
}
