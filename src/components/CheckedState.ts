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

export class CheckedState extends Model<IChechedState> {
	products: IItemsProducts[] = [];
	show: IItemsProducts;
	basketItems: IItemsProducts[] = [];
	total: number | null = null;
	order: IUser = {
		email: '', // почта
		mobile: '', // телефон
		adress: '', // адрес
		typePay: '', // выбранный способ оплаты
		products: [], // массив продуктов
		total: 0, // итоговая сумма
	};

	formErrors: IFormValidateErrors = {};

	showOneItem(product: IItemsProducts[], id: string) {
		return (this.show = product.filter((item) => item.id === id)[0]);
	}


	//добавление карточки в корзину
	addItemtoBasket(item: IItemsProducts) {
        this.basketItems.push(item)
        this.emitChanges('basketData:changed', {basketList: this.basketItems} );
    }
        
    //удаление товара из корзины
    removeItemFromBasket(id: string) {
        this.basketItems = this.basketItems.filter(item => item.id !== id);
        this.emitChanges('basketData:changed', {basketList: this.basketItems} );
    }  


	 

	getItemsBasket(): IItemsProducts[] {
		return this.basketItems;
	}
	clearBasket() {
		this.basketItems = [];
		this.emitChanges('basketData:changed', { basket: this.basketItems });
	}

	getCounterBasket(): number {
		return this.basketItems.length;
	}

	set _total(value: number) {
		this.total = value;
	}

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
		this.order.adress = '';
		this.order.email = '';
		this.order.mobile = '';
	}
	setProductItems(items: IItemsProducts[]) {
		this.products = items;
		this.emitChanges('Info: loaded', { productList: this.products });
	}

	setPreviewPopap(id: string){
		const cardItem = this.showOneItem(this.products, id)
		this.show = cardItem;
		this.emitChanges('preview:changed');
	}  
	
getPreviewPopap() {
	return this.show;
}

addOrderId() {
	if(this.basketItems.length !== 0) {
		this.order.products = this.basketItems.map((item) => {
			return item.id
		},
		this.emitChanges('datapaymentform:opened'),
	)
	}
}

}
