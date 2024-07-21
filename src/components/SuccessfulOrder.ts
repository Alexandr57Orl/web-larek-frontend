import { ISuccefullPopap } from '../types';
import { Component } from './base/Component';
import { ensureElement } from '../utils/utils';
import { IEvents } from './base/events';

export class SuccessfulOrder extends Component<ISuccefullPopap> {
	protected _close: HTMLButtonElement;
	protected _total: HTMLElement;

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);
		this._close = ensureElement<HTMLButtonElement>(
			'order-success__close',
			this.container
		);
		this._total = ensureElement<HTMLElement>(
			'order-success__description',
			this.container
		);
		this._close.addEventListener('click', () => {
			events.emit('order:ready');
		});
	}
	set totalPrice(value: string) {
		this.setText(this._total, `Списано  ${value}  синапсов`);
	}
}
