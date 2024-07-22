import { Component } from './base/Component';
import { ensureElement } from '../utils/utils';
import { IEvents } from './base/events';
import { ICard } from '../types';

export const parametrsWithCategory = {
	'софт-скил': 'soft',
	другое: 'other',
	дополнительное: 'additional',
	кнопка: 'button',
	'хард-скил': 'hard',
};

export class Card extends Component<ICard> {
	protected _title: HTMLElement;
	protected _description?: HTMLElement;
	protected _image?: HTMLImageElement;
	protected _price: HTMLElement;
	protected _category?: HTMLElement;
	protected _button: HTMLButtonElement;
	protected _indexCard?: HTMLElement;
	protected _id: string;
	protected event?: IEvents;
	protected _deleteButton?: HTMLButtonElement;

	constructor(
		protected blockName: string,
		container: HTMLElement,
		event: IEvents
	) {
		super(container);

		this._category = container.querySelector(`.${blockName}__category`);
		this._button = container.querySelector(`.${blockName}__button`);
		this._indexCard = container.querySelector(`.basket__item-index`);
		this._deleteButton = container.querySelector(`.basket__item-delete`);
		this._title = ensureElement<HTMLElement>(`.${blockName}__title`, container);
		this._description = container.querySelector(`.${blockName}__text`);
		this._image = container.querySelector(`.${blockName}__image`);
		this._price = container.querySelector(`.${blockName}__price`);

		this.event = event;

		if (this._button) {
			if (this._deleteButton) {
				this._button.addEventListener('click', () => {
					this.event.emit('item:removeItemBasket', { id: this.id });
				});
			} else {
				this._button.addEventListener('click', () => {
					this.event.emit('item:correctBasket', { id: this._id });
				});
			}
		} else {
			this.container.addEventListener('click', () => {
				this.event.emit('card:selected', { id: this._id });
			});
		}
	}

	set title(value: string) {
		this.setText(this._title, value);
	}
	get cardButton(): HTMLButtonElement {
		if (this._button) {
			return this._button;
		} else {
			console.log('error');
		}
	}

	set textButton(value: string) {
		if (this._button) {
			this.setText(this._button, value);
		}
	}
	set description(value: string) {
		this.setText(this._description, value);
	}

	set image(value: string) {
		this.setImage(this._image, value);
	}

	set price(value: number | null) {
		if (value === null) {
			this.setDisabled(this._button, true);
			this.setText(this._price, 'Бесценно');
		} else {
			this.setText(this._price, `${value + ' ' + 'синапсов'}`);
		}
	}

	set category(value: string) {
		this.categoryColor(
			parametrsWithCategory[value as keyof typeof parametrsWithCategory]
		);
		this.setText(this._category, value);
	}

	categoryColor(value: string) {
		const className = `${this.blockName}__category_${value}`;
		this.toggleClass(this._category, className, true);
	}

	set id(id) {
		this._id = id;
	}

	get id() {
		return this._id;
	}

	get title(): string {
		return this._title.textContent || '';
	}

	set indexCard(value: number) {
		this.setText(this._indexCard, value.toString());
	}
}
