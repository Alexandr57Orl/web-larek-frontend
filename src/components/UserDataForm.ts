import { Form } from './Form';
import { IEvents } from './base/events';
import { TForm } from '../types';
import { ensureElement } from '../utils/utils';

export class UserDataForm extends Form<TForm> {
	protected _mobile: HTMLInputElement;
	protected _email: HTMLInputElement;
	constructor(protected container: HTMLFormElement, protected events: IEvents) {
		super(container, events);

		this._mobile = ensureElement<HTMLInputElement>(
			`input[name=mobile]`,
			this.container
		);
		this._email = ensureElement<HTMLInputElement>(
			`input[name=email]`,
			this.container
		);
	}

	get mobile(): string {
		return this._mobile.value;
	}

	set mobile(value: string) {
		this._mobile.value = value;
	}

	get email(): string {
		return this._email.value;
	}

	set email(value: string) {
		this._email.value = value;
	}

	resetInformation() {
		this._mobile.value = '';
		this._email.value = '';
	}
}
