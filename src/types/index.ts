import exp from 'constants';

//Интерфейс для карточки продуктов
export interface IItemsProduct {
	id: string; // идентификатор карточки
	description: string; // описание карточки
	image: string; // ссылка на изображение
	title: string; // название товара
	category: Tcategory; // категория товара
	price: number; // цена товара
}

//Интерфейс открытой для просмотра карточки товара

export interface ICardsData {
	produts: IItemsProduct[]; // массив карточек
	show: string | null; // указатель на ту карточку, которую мы хотим просмотреть
}
// Интерфейс для модели данных пользователя
export interface IUserData {
	email: string; // почта
	mobile: string; // телефон
	adress: string; // адрес
	typePay: ChoicePay; // выбранный способ оплаты
	getUserData: IUserData; // данные пользователя
}

// интерфейс для каталога товара

export interface ICatalog {
	products: IItemsProduct[]; // массив карточек
	show: string | null; // указатель на ту карточку, которую мы хотим просмотреть
	getCatalog: ICatalog;
	showOneItem(item: string): void; //открываем карточку для просмотра по id
	getItemsProduct(): IItemsProduct[]; //получаем массив карточек с сервера
	saveItemsProduct(): IItemsProduct[]; //сохраняем массив карточек
}

// Интерфейс для корзины
export interface IBasket {
	items: IItemsProduct[]; // карточки в корзине
	add(id: string): void; // добавить карточку в корзину
	remove(id: string): void; // удалить карточку из корзины
	resetBasket(): void; // очистить корзину
}

//Интерфейс для  заказа
export interface IResOred {
	typePay: ChoicePay; // тип оплаты
	adress: string; // адрес доставки
	email: string; // почта
	mobile: string; // телефон
	items: IItemsProduct[]; // массив карточек
	total: number | null; // итого, что находится в корзине
}

// принимаемый тип данных для опции выбора способа оплаты
export type ChoicePay = 'card' | 'cash';

// принимаемый тип данных для категории товара
export type Tcategory =
	| 'софт-скилл'
	| 'другое'
	| 'дополнительное'
	| 'кнопка'
	| 'хард-скилл';

//Работа с модальным окном

// принимаемый тип данных  для модального окна со способом оплаты
export type IPaymentModal = Pick<IUserData, `adress`>;

//принимаемый тип данных для модального окна с информацией о пользователе
export type IUserModal = Pick<IUserData, `email` | `mobile`>;

//принимаемый тип данных  для модального окна с информацией о успешном совершении заказа
export type IOrderSuccessPopup = Pick<IResOred, 'total'>;

//принимаемый тип данных для отображения добавленного товара(карточки) в корзине
export type IPopupItemInBacket = Pick<IItemsProduct, 'title' | 'price'>;
