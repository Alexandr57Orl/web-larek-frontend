import exp from 'constants';

//Интерфейс для карточки продукта
export interface IItemsProducts {
	id: string; // идентификатор карточки
	description: string; // описание карточки
	image: string; // ссылка на изображение
	title: string; // название товара
	category: Tcategory; // категория товара
	price: number; // цена товара
}

// Интерфейс для данных о  пользователе
export interface IUser {
	email: string; // почта
	mobile: string; // телефон
	adress: string; // адрес
	typePay: ChoicePay; // выбранный способ оплаты
	products: string[]; // массив продуктов
	total: number | null; //общая сумма товаров, добавленных в корзину
	checkValidation(data: Record<keyof TForm, string | number>): boolean; //проверка валидации формы
}

// интерфейс состояния сайта

export interface ChechedState {
	products: IItemsProducts[]; // массив карточек
	show: string | null; // указатель на ту карточку, которую мы хотим просмотреть
	basket: IItemsProducts[]; // массив карточек в корзине;
	order: IUser; // данные пользователя
	showOneItem: (product: IItemsProducts[], id: string) => void; //открываем карточку для просмотра по id
	addItems: (productId: string, payloader: Function | null) => void; //добавляем карточку в корзину используя id
	updateItem: (product: IItemsProducts, payloader: Function | null) => void; //обновляем карточку
	saveItemsProduct: () => IItemsProducts[]; //сохраняем массив карточек
	removeItemsInBasket: (productId: string, payloader: Function | null) => void; //удаляем карточку из корзины используя id
	clearBasket: () => void; //очищаем корзину
}

//Интерфейс для получения итогов заказа
export interface IResOred {
	id: string; // идентификатор заказа
	total: number | null; //общая сумма товаров, добавленных в корзину
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

// принимаемый тип данных для модального окна с информацией о пользователе
export type TForm = Pick<IUser, 'email' | 'mobile' | 'adress' | 'typePay'>;

// принимаемый тип данных для отображения модального окна с успшойм совершением заказа
export type TResult = Pick<IResOred, 'total'>;
