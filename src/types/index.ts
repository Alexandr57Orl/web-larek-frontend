//Интерфейс для карточки продукта
export interface IItemsProducts {
	id: string; // идентификатор карточки
	description: string; // описание карточки
	image: string; // ссылка на изображение
	title: string; // название товара
	category: Tcategory; // категория товара
	price: number | null; // цена товара
}

// Интерфейс для данных о  пользователе
export interface IUser {
	email: string; // почта
	mobile: string; // телефон
	adress: string; // адрес
	typePay: TChoicePay; // выбранный способ оплаты
	products: string[]; // массив продуктов
	total: number | null; //общая сумма товаров, добавленных в корзину
}

// интерфейс состояния сайта

export interface IChechedState {
	products: IItemsProducts[]; // массив карточек
	show: string | null; // указатель на ту карточку, которую мы хотим просмотреть
	basket: IItemsProducts[]; // массив карточек в корзине;
	order: IUser; // данные пользователя
	showOneItem: (product: IItemsProducts[], id: string) => void; //открываем карточку для просмотра по id
	addItemInBasket: (productId: string, payloader: Function | null) => void; //добавляем карточку в корзину используя id
	updateItem: (product: IItemsProducts, payloader: Function | null) => void; //обновляем карточку
	saveItemsProduct: () => IItemsProducts[]; //сохраняем массив карточек
	removeItemInBasket: (productId: string, payloader: Function | null) => void; //удаляем карточку из корзины используя id
	clearBasket: () => void; //очищаем корзину
}

// интерфейс корзины

export interface IBasket {
	items: IItemsProducts[];
	total: number | null;
	resetBasket(): void; //очищаем корзину
}

//Интерфейс для получения итогов заказа
export interface IResOred {
	id: string; // идентификатор заказа
	total: number | null; //общая сумма товаров, добавленных в корзину
}

// Интерфейс карточки

export interface ICard {
	title: string;
	price: number | null;
	id: string;
	description: string;
	image?: string;
	category?: Tcategory;
	deleteItemBtn?: string;
	indexCard?: number;
}

export interface IPage {
	catalog: HTMLElement[];
	basket: HTMLElement;
	counter: HTMLElement;
	locked: boolean;
}

export interface IModalData {
	content: HTMLElement;
}

export interface IFormState {
	valid: boolean;
	errors: string[];
}

export interface IBasketCheck {
	items: HTMLElement[];
	total: number;
}

export interface ISuccefullPopap {
	total: number;
}

export interface ISuccessActions {
	onClick: () => void;
}
// принимаемый тип данных для опции выбора способа оплаты
export type TChoicePay = 'card' | 'cash' | '';

//интерфейс для валидации ошибок
export type IFormValidateErrors = Partial<Record<keyof IUser, string>>;

// принимаемый тип данных для категории товара
export type Tcategory =
	| 'софт-скилл'
	| 'другое'
	| 'дополнительное'
	| 'кнопка'
	| 'хард-скилл';

// принимаемый тип данных для модального окна с информацией о пользователе
export type TForm = Pick<IUser, 'email' | 'mobile' | 'adress' | 'typePay'>;

// принимаемый тип данных для отображения модального окна с успшойм совершением заказа
export type TResult = Pick<IResOred, 'total'>;
