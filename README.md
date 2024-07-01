# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:

- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:

- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск

Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```

## Сборка

```
npm run build
```

или

```
yarn build
```

# Данные и типы данных, используемые в приложении

### Интерфейс для единицы товара

```

export interface IItemsProducts {
	id: string; - идентификатор карточки
	description: string; - описание карточки
	image: string; - ссылка на изображение
	title: string; - название товара
	category: Tcategory; - категория товара
	price: number; - цена товара
}
```

### Интерфейс для данных о пользователе

```
export interface IUser{
    email: string; - почта
	mobile: string; - телефон
	adress: string; - адрес
	typePay: ChoicePay; - выбранный способ оплаты
	products: string[]; - массив продуктов
	total: number | null; - общая сумма товаров, добавленных в корзину
	checkValidation(data: Record<keyof TForm, string | number>): boolean; - проверка валидации формы
}
```

### Интерфейс состояния сайта

```
export interface ChechedState {
	products: IItemsProducts[]; - массив карточек
	show: string | null; - указатель на ту карточку, которую мы хотим просмотреть
	basket: IItemsProducts[]; - массив карточек в корзине;
	order: IUser; - данные пользователя
	showOneItem: (product: IItemsProducts[], id: string) => void; - открываем карточку для просмотра по id
	addItems: (productId: string, payloader: Function | null) => void; - добавляем карточку в корзину используя id
	updateItem: (product: IItemsProducts, payloader: Function | null) => void; - обновляем карточку
	saveItemsProduct: () => IItemsProducts[]; - сохраняем массив карточек
	removeItemsInBasket: (productId: string, payloader: Function | null) => void; - удаляем карточку из корзины используя id
	clearBasket: () => void; //очищаем корзину
}
```

### Интерфейс для получения итогов заказа

```
export interface IResOred {
	id: string; // идентификатор заказа
	total: number | null; //общая сумма товаров, добавленных в корзину
}
```

# Общие типы для приложения

### Принимаемый тип данных для опции выбора способа оплаты

```

export type ChoicePay = 'card' | 'cash';

```

### Принимаемый тип данных для категории товара

```

export type Tcategory =
| 'софт-скилл'
| 'другое'
| 'дополнительное'
| 'кнопка'
| 'хард-скилл';

```

# Архитектура приложения

## Код приложения разделен на слои согласно парадигме MVP:

- _слой данных_, `Model` Модель отвечает за бизнес-логику приложения, управление данными и операции с данными, такие как загрузка, сохранение и изменение данных. Модель не зависит от пользовательского интерфейса и не содержит логику отображения, что делает ее переиспользуемой в различных интерфейсах.
- _слой отображения_, `View`отвечает за отображение данных пользователю и взаимодействие с пользователем. Оно получает данные, которые необходимо отобразить, от Presenter'а и просто реализует логику их визуализации, без ведения каких-либо операций над данными.

- _презентер_,`Presenter` отвечает за управление логикой приложения и обмен данными между моделью (Model) и представлением (View).

# Основные классы приложения

## Класс Component

Данный класс является `абстактным` и облегчает взаимодействие с DOM-элементами в рамках компонентов, а также способствует более простой разработке интерфейса, предоставляя возможности для создания и контроля над компонентами на сайте. Благодаря классу Component, который может служить основой для других компонентов в приложении, они получают доступ к стандартному набору инструментов для манипуляций с DOM.

В `constructor` принимает `container` и сохраняет его. Конструктор защищен, что означает, что нельзя создавать экземпляры этого класса напрямую в объекте, но его можно вызывать из подклассов.

### Component содержит следующие методы:

- render() - данный метод способствует отображению данных и обновлению данных экземпляра класса, копируя свойства из data в текущий объект с использованием Object.assign.
- setImageElement - устанавливает источник изображения, а также в случае не прогрузки изображения отображает альтернативный текст.
- setTextElement - устанавливает текстовое содержимое элемента.
- toggleClassElement - переключения класса у элемента. Использует classList.toggle для добавления или удаления класса.
- setDisabledElement - добавляет/удаляет атрибут disabled у элемента.
- setVisibleElement - отображает элемент.
- setHidenElement - скрыает элемент.

## Класс Api

Содержит в себе базовую логику отправки запросов. В конструктор передается базовый адрес сервера и опциональный объект с заголовками запросов.

`constructor(baseUrl: string, options: RequestInit = {})` - принимает базовый URL и глобальные опции для всех запросов(опционально).

Реализует логику работы с сервером. Содержит конструктор для создания объекта со свойствами базового url адреса и хэдеров запроса. Также содержит `get` и `post` методы.

`get` - _выполняет GET запрос на переданный в параметрах ендпоинт и возвращает промис с объектом, которым ответил сервер_

`post` - _принимает объект с данными, которые будут переданы в JSON в теле запроса, и отправляет эти данные на ендпоинт переданный как параметр при вызове метода. По умолчанию выполняется POST запрос, но метод запроса может быть переопределен заданием третьего параметра при вызове._

## Класс `EventEmitter`

Данный класс - является брокером событий, который позволяет отправлять события, а также подписываться на события, происходящие в системе. Конструктор создает пустой объект `Map`, который будет хранить события и их подписчиков. Класс используется в презентере для обработки событий и в слоях приложения для генерации событий.

## Основные методы, реализуемые классом описаны интерфейсом `IEvents`:

метод `on` - Установливает обработчик на событие;

метод `of` - Снимает обработчик с события;

метод `emit` - Инициирует событие с данными;

метод `onAll` - Устанавливает слушатель на все события;

метод `offAll` - удаляет все обработчики для всех событий;

метод `trigger` - создает и возвращает функцию-триггер, которая в свою очередь генерирует событие с указанным именем и данными.

# Слой данных `Model`

## Класс UserData

Данный класс отвечает за данные пользователя и логику работы с этими данными.
Функция-конструктор принимает инстанс брокера событий
Содержит следующие поля:

```

    email: string - хранит данные почты пользователя
    mobile: string - хранит данные телефона пользователя
    adress: string - хранит адрес пользователя
    typePay: ChoicePay - хранит выбранный способ оплаты пользователя

```

Класс UserDate также имеет следующие методы:

```

checkValidation(data: Record<keyof TForm, string | number>): boolean - Проверка валидации формы
функция get() - для доступа и set() - для работы со свойствами объекта-инстанса этого класса

```

## Класс ChechedStateData

Класс отвечает за хранение и логику работы с данными карточки продукта.
Конструктор класса принимает инстант брокера событий.
В полях класса хранятся следующие данные:

```

    products: IItemsProducts[] - массив карточек
    show: string | null - указатель на ту карточку, которую мы хотим просмотреть
    basket: IItemsProducts[] - массив карточек в корзине;
    order: IUser - данные пользователя

```

### Методы класса для взаимодействия с данными:

- showOneItem: (product: IItemsProducts[], id: string) => void - Открываем карточку для просмотра по id
- addItems: (productId: string, payloader: Function | null) => void - Добавляем карточку в корзину используя id
- updateItem: (product: IItemsProducts, payloader: Function | null) => void - Обновляем карточку
- saveItemsProduct: () => IItemsProducts[]; - сохраняем массив карточек
- removeItemsInBasket: (productId: string, payloader: Function | null) => void - Удаляем карточку из корзины используя id
- clearBasket: () => void; - Очищаем корзину

- функции get(), set() - Для доступа и работы со свойствами объекта-инстанса этого класса

# Слой отображения `View`

### Данный слой используется для отображения данных на экране.

## Класс `Card`

Это класс, отвечающий за отображение карточек на главной странице, в модальном окне просмотра карточки и в корзине.
В конструкторе класса передается DOM элемент темплейта, что позволяет при необходимости формировать карточки разных вариантов верстки.
В классе устанавливаются слушатели на все интерактивные элементы, в результате взаимодействия с которыми пользователя генерируются соответствующие события.
Поля класса содержат элементы разметки карточки.
Конструктор, кроме темплейта, принимает экземпляр EventEmitter для инициации событий.

### Методы класса:

#### Сеттеры

- title устанавливает наименование заголовка
- description устанавливает текст описания
- image устанавливает URL изображения.
- price устанавливает цену. Если цена равна null, кнопка действия блокируется, и текст цены устанавливается в "Бесценно"
- id устанавливает идентификатор товара
- category устанавливает категорию товара и добавляет соответствующий CSS класс

## Класс `Page`

Этот класс управляет показом блока карточек на стартовой странице. Конструктор принимает элемент и экземпляр EventEmitter, вызывает конструктор базового класса Component

### Методы класса:

```
set counter(value: number) - Устанавливает значение элемента счетчика

set catalog(items: HTMLElement[]) - управление массивом карточек

set locked(value: boolean) - управление блокировкой для прокрутки при открытии модального окна
```

## Класс `Basket`

Отображает список выбранных пользователем товаром, с возможностью их удаления из корзины, а также итоговую стоимость продуктов в корзине. Наследуется от класса Component.

Класс имеет следующие поля:

```
_list: HTMLElement - Список товаров в корзине
_total: HTMLElement - Общее количество товаров в корзине
_button:HTMLButtonElement - Кнопка для оформления заказа
```

### Методы данного класса:

```
set total(total: number) - Устанавливает общую сумму заказа

set items(items: HTMLElement[]) - Устанавливает товары в корзине, заменяет содержимое списка товаров новыми элементами или сообщением об отсутствии товаров в корзине
```

## Класс Form

`Используется для создания и управления формами в приложении, реализовывает логику обработки данных формы, включая валидацию и обработку ошибок. Наследуется от класса Component`

Конструктор выглядит следующим образом:
`constructor(protected container: HTMLFormElement, protected events: IEvents)`

Используется для создания и управления формами в приложении, реализует логику обработки данных формы, включая валидацию и обработку ошибок.

### Методы данного класса:

```
set errors(value: string) - Устанавливает текстовое отображение ошибки, в зависимости от value.

set valid(isValid: boolean) - Устанавливает состояние кнопки отправки  в зависимости от значения isValid
```

## Класс UserInformationForm

Этот класс является производным от базового класса `Form` и используется для обработки контактной информации. В него входят методы, которые позволяют управлять и очищать данные в полях для электронной почты и номера телефона.

### Методы данного класса:

```
get mobile(): string - Позволяет получить и вернуть текущие значение поля телефона

get email(): string  - Позволяет получить и вернуть текущие значение поля  почты

set mobile (value: string) - Устанавливает новое значение для поля телефона

set email(value: string) - Устанавливает новое значение для поля электронной почты

clearUserInformationForm() - делает сброс полей, возвращаясь к исходным (пустым)
```

## Класс Modal

Реализует модальное окно, содержит методы `open и close` для управления отображением модального окна. Устанавливает слушатели на клавиатуру для закрытия модального окна по клику на оверлей или крестик. Класс наследуется от абстрактного класса Component

Конструктор:

`constructor(container: HTMLElement, events: IEvents) - наследуется от абстрактного класса` Component

### Методы класса:

```
set Content() - присваивает контен модальному окну

openModalWindow() - управляет отображением модального окна - показывает на странице

closeModalWindow() - управляет отображением модального окна - скрывает со страницы

render() - наследует и расширяет метод родительского класса. Возвращает заполненный данными корневой DOM-элемен
```

## Класс ChoicePayAndAdress

Этот класс расширяет базовый класс `Form`, добавляя возможности управления формой, которая позволяет выбирать метод оплаты и вводить адрес. В классе реализована логика обработки событий для элементов управления выбором способа оплаты и ввода адреса, а также предусмотрены методы для изменения состояния и стиля кнопок.

Конструктор наследуется от базового класса Form:

`constructor(protected container: HTMLFormElement, protected events: IEvents)`

### Методы класса:

```
paymentSwitch(payment: string) - Определяет, какой способ оплаты выбран, и переключает соответствующие классы для кнопок.

clearAddressField() - Очищает значение поля _address
```

## Класс SuccessfulOrder

Расширяет класс Component. Предназначен для реализации модального окна с формой, содержащей сообщение об успешном оформлении заказа, в которое передаётся полная стоимость товара в корзине.

Вызывает конструктор базового класса Component с переданным контейнером.

`constructor(container: HTMLElement, events: IEvents)`

### Методы класса:

`set Total() - устанавливает значение в поле общей суммы заказа`

# Слой Коммуникации `Presenter` отвечающий за взаимодействие компнонетов

## Класс AppApi

Принимает в конструктор экземпляр класса Api

`baseUrl` Базовый URL для API;

`options` Опциональные настройки для запросов и предоставляет методы реализующие взаимодействие с бэкендом сервиса.

Методы данного класса:

- getItemsElement - Отправляет GET-запрос на путь /product/ и обрабатывает полученные данные.
- response(): Обработка ответа от сервера
- createOrder - Отправляет POST-запрос с данными заказа на путь /order и возвращает промис

`Взаимодействие Компонентов` осуществляется за счет событий, генерируемых с помощью брокера событий и их обработчиков описанных в events.ts
В events.ts сначала создаются экземпляры всех необходимых классов, а затем настраивается обработка событий.

Список событий, которые могут генерироваться в системе:

```

-cardsItems:changed - изменение массива карточек товаров.

-basket:open- открытие модального окна с содержимым корзины.

-basketData:changed - изменение данных в корзине товаров

-userInfoUpgrade - изменение данных о пользователе (adress,mobile,email)

```

### События изменения данных (генерируются из модели данных)

- ProductsData:changed - изменение массива карточек
- ProductsData:selected - изменение открываемой в модальном окне карточки
- basketData:changed - изменение данных в корзине товаров
- userData:changed - изменение данных пользователя
- datapaymentform:opened - добавление id продукта в поле заказа
- order:ready - формирование данных для заказа
- preview:changed - изменение данных в поле preview
- Info: loaded - произошла успешная загрузка серверных данных
- item:addToBasket - добавление товара в список корзины
- item:rmFromPreorder - удаление товара из списка корзины
- orderItems:added - добавление id выбранных товаров в заказ
- paymentOnLine:selected - выбран способ оплаты картой
- paymentCash:selected - выбран способ оплаты наличными

События интерфейса (генерируются из классов представления)

- modal:open - модальное окно открыто
- modal:close - модальное окно закрыто
- card:selected - клик по карточке на главной
- basketList:opened - открытие модального окна со списком товаров при клике на иконку корзины на главной
- Product:updateBasket - добавление/удаление товара при клике на кнопку в превью карточки
- datapayOpen:opened - открытие модального окна с формой оплаты
- contacts:submit - отправка заказа
- formErrors:change - событие валидации данных формы
