import { IEvents } from './base/events';
import { Form } from './Form';
import { TForm } from '../types';

export class ChoicePayAndAdress extends Form<TForm> {
	protected _adress: HTMLInputElement;
	protected _cash: HTMLInputElement;
	protected _card: HTMLInputElement;

	constructor(protected container: HTMLFormElement, protected events: IEvents) {
		super(container, events);
		this._adress = container.querySelector(
			'input[name=adress]'
		) as HTMLInputElement;
		this._cash = container.querySelector(
			'input[name=cash]'
		) as HTMLInputElement;
		this._card = container.querySelector(
			'input[name=card]'
		) as HTMLInputElement;
	}

	clickCash(isvalue: boolean) {
		this.toggleClass(this._cash, 'active', isvalue);
	}

	clickCard(isvalue: boolean) {
		this.toggleClass(this._card, 'active', isvalue);
	}

	choosePaymethod(pay: string) {
		const methodCash = this._cash.classList.contains('button_alt-active');
		const methodCard = this._cash.classList.contains('button_alt-active');
		if (pay === 'cash') {
			this.clickCash(methodCash);
			this.clickCard(!methodCard);
			this.events.emit('paymentOnLine:selected');
		} else if (pay === 'card') {
			this.clickCard(methodCard);
			this.clickCash(!methodCash);
			this.events.emit('paymentCash:selected');
		}
	}

	resetAddress() {
		this._adress.value = '';
	}
}
