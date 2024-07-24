import { ISuccessActions } from '../types';
import { Component } from './base/Component';
import { ensureElement } from '../utils/utils';
import { IEvents } from './base/events';

export class SuccessfulOrder extends Component<ISuccessActions> {
	protected _total: HTMLElement;
	protected _close: HTMLButtonElement;

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);
		this._close = ensureElement<HTMLButtonElement>(
			'.order-success__close',
			this.container
		);
		this._total = ensureElement<HTMLElement>(
			'.order-success__description',
			this.container
		);

		this._close.addEventListener('click', () => {
			this.events.emit('order:created');
		});
	}
	set totalPrice(value: string) {
		this.setText(this._total, `Списано  ${value}  синапсов`);
	}
}
