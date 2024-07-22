import { IEvents } from './base/events';
import { Form } from './Form';
import { TForm } from '../types';

export class ChoicePayAndAdress extends Form<TForm> {
	protected _adress: HTMLInputElement;
	protected _cash: HTMLInputElement;
	protected _card: HTMLInputElement;

	constructor(protected container: HTMLFormElement, protected events: IEvents) {
		super(container, events);
		this._cash = container.querySelector('button[name="cash"]');
		this._adress = container.querySelector('input[name="address"]');
		this._card = container.querySelector('button[name="card"]');

		this._cash.addEventListener('click', () => this.choosePaymethod('cash'));
		this._card.addEventListener('click', () => this.choosePaymethod('card'));
		this._adress.addEventListener('input', () =>
			this.events.emit('edit-adress:input')
		);
	}

	clickCard(isvalue: boolean) {
		this.toggleClass(this._card, 'button_alt-active', isvalue);
	}

	clickCash(isvalue: boolean) {
		this.toggleClass(this._cash, 'button_alt-active', isvalue);
	}

	choosePaymethod(typePay: string) {
		const methodCash = this._card.classList.contains('button_alt-active');
		const methodCard = this._cash.classList.contains('button_alt-active');
		if (typePay === 'cash') {
			this.clickCash(methodCash);
			this.clickCard(!methodCash);
			this.events.emit('paymentOnLine:selected');
		} else if (typePay === 'card') {
			this.clickCard(methodCard);
			this.clickCash(!methodCard);
			this.events.emit('paymentCash:selected');
		}
	}

	resetAddress() {
		this._adress.value = '';
	}
}
