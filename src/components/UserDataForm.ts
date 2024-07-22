import { Form } from './Form';
import { IEvents } from './base/events';
import { TForm } from '../types';

export class UserDataForm extends Form<TForm> {
	protected _email: HTMLInputElement;
	protected _phone: HTMLInputElement;
	constructor(protected container: HTMLFormElement, protected events: IEvents) {
		super(container, events);

		this._email = container.querySelector('input[name="email"]');
		this._phone = container.querySelector('input[name="phone"]');
	}

	get mobile(): string {
		return this._phone.value;
	}

	set mobile(value: string) {
		this._phone.value = value;
	}

	set email(value: string) {
		this._email.value = value;
	}

	get email(): string {
		return this._email.value;
	}

	resetInformation() {
		this._phone.value = '';
		this._email.value = '';
	}
}
