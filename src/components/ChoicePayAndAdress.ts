import { IEvents } from './base/events';
import { Form } from './Form';
import { TForm } from '../types';

export class ChoicePayAndAdress extends Form<TForm> {
	protected _card: HTMLButtonElement;
	protected _cash: HTMLButtonElement;
	protected _address: HTMLInputElement;

	constructor(protected container: HTMLFormElement, protected events: IEvents) {
		super(container, events);

		// находим темлейт карты
		this._card = container.querySelector('button[name="card"]');
		this._card.addEventListener('click', () => this.paymentChange('card'));

		// находим темлейт адреса
		this._address = container.querySelector('input[name="address"]');
		this._address.addEventListener('input', () =>
			this.events.emit('edit-adress:input')
		);

		// находим темлейт при получении
		this._cash = container.querySelector('button[name="cash"]');
		this._cash.addEventListener('click', () => this.paymentChange('cash'));
	}

	// активация класса active при выборе оплаты в виде при получении
	choiceCash(value: boolean) {
		this.toggleClass(this._cash, 'button_alt-active', value);
	}

	// активация класса active при выборе оплаты в виде карты
	choiceCard(value: boolean) {
		this.toggleClass(this._card, 'button_alt-active', value);
	}

	// метод выбора оплаты
	paymentChange(payment: string) {
		const isCardSelected = payment === 'card';
		const isCashSelected = payment === 'cash';

		this.choiceCard(isCardSelected);
		this.choiceCash(isCashSelected);

		if (isCardSelected) {
			this.events.emit('paymentOnLine:selected');
		} else if (isCashSelected) {
			this.events.emit('paymentCash:selected');
		}
	}

	// очистка адреса
	resetAddress() {
		this._address.value = '';
	}
}
