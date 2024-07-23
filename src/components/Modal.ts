import { Component } from './base/Component';
import { ensureElement } from '../utils/utils';
import { IEvents } from './base/events';
import { IModalData } from '../types/index';

export class Modal extends Component<IModalData> {
	protected _closeButton: HTMLButtonElement;
	protected _content: HTMLElement;

	constructor(container: HTMLElement, protected events?: IEvents) {
		super(container);

		this._closeButton = ensureElement<HTMLButtonElement>(
			'.modal__close',
			container
		);
		this._closeButton.addEventListener('click', this.closeModal.bind(this));

		this._content = ensureElement<HTMLElement>('.modal__content', container);
		this._content.addEventListener('click', (event) => event.stopPropagation());

		this.container.addEventListener('click', this.closeModal.bind(this));
	}
	set content(value: HTMLElement) {
		this._content.replaceChildren(value);
	}
	openModal() {
		this.toggleClass(this.container, 'modal_active', true);
		this.events.emit('modal:open');
		document.addEventListener('keydown', this.enterEscape);
	}

	closeModal() {
		this.toggleClass(this.container, 'modal_active', false);
		this.events.emit('modal:close');
		document.removeEventListener('keydown', this.enterEscape);
	}

	//закрывать попап с помощью Escape
	enterEscape = (evt: KeyboardEvent) => {
		if (evt.key === 'Escape') {
			this.closeModal();
		}
	};

	render(data: IModalData): HTMLElement {
		super.render(data);
		this.openModal();
		return this.container;
	}
}
