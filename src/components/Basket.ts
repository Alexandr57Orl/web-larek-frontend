import { Component } from './base/Component';
import { createElement, ensureElement } from '.././utils/utils';
import { IEvents } from './base/events';
import { IBasketCheck } from '../types/index';

export class Basket extends Component<IBasketCheck> {
	protected _list: HTMLElement;
	protected _total: HTMLElement;
	protected _button: HTMLElement;

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);

		this._list = ensureElement<HTMLElement>('.basket__list', this.container);
		this._total = this.container.querySelector('.basket__price') as HTMLElement;
		this._button = this.container.querySelector(
			'.basket__button'
		) as HTMLElement;

		if (this._button) {
			this._button.addEventListener('click', () => {
				events.emit('orderItems:added');
			});
		}

		this.items = [];
	}

	set items(items: HTMLElement[]) {
		if (items.length) {
			this._list.replaceChildren(...items);
			this.setDisabled(this._button, false);
		} else {
			this._list.replaceChildren(
				createElement<HTMLParagraphElement>('p', {
					textContent: 'На данный момент корзина пуста',
				})
			);
			this.setDisabled(this._button, true);
		}
	}

	set total(total: number) {
		this.setText(this._total, `Итого: ${total} синаптов`);
	}
}
