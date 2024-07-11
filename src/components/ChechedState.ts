import { Model } from './base/model';
import {
	IItemsProducts,
	IUser,
	IResOred,
	IFormValidateErrors,
	TForm,
	IChechedState,
} from '../types';
import { EventEmitter, IEvents } from './base/events';

export class ChechedState extends Model<IChechedState> {
	products: IItemsProducts[] = [];
	show: IItemsProducts;
	basket: IItemsProducts[] = [];
	total: number | null = null;
	order: IUser = {
		email: '', // почта
		mobile: '', // телефон
		adress: '', // адрес
		typePay: '', // выбранный способ оплаты
		products: [], // массив продуктов
		total: 0, // итоговая сумма
	};

	showOneItem(product: IItemsProducts[], id: string) {
		return (this.show = product.filter((item) => item.id === id)[0]);
	}

	addItemInBasket(item: IItemsProducts) {
		this.basket.push(item);
		this.emitChanges('basketData:changed', { basket: this.basket });
	}

	removeItemInBasket(id: string) {
		this.basket = this.basket.filter((item) => item.id !== id);
		this.emitChanges('basketData:changed', { basket: this.basket });
	}

	clearBasket() {
		this.basket = [];
		this.emitChanges('basketData:changed', { basket: this.basket });
	}

	getCounterBasket(): number {
		return this.basket.length;
	}

	set _total(value: number) {
		this.total = value;
	}

	getTotalPrice(): number {
		let price = 0;
		this.basket.forEach((item) => {
			price += item.price;
		});
		return price;
	}

	//очищает данные заказа после его успешного завершения
	clearAfterOrder() {
		this.order.typePay = 'cash';
		this.order.adress = '';
		this.order.email = '';
		this.order.mobile = '';
	}
	setProductItems(items: IItemsProducts[]) {
		this.products = items;
		this.emitChanges('Info: loaded', { productList: this.products });
	}
}
