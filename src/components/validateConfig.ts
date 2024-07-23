// хотел валидацию сделать отдельно если это как-то возможно, для развития поясните пожалуйста

// import { TForm } from '../types/index';
// import { events } from '../index';
// import { payAndDress, contactsForm } from '..';
// import { checkedState } from '..';

// // сначала валидируем все формы контакты и адрес
// events.on('formErrors:change', (errors: Partial<TForm>) => {
// 	const { email, phone, address, payment } = errors;
// 	payAndDress.valid = !address && !payment;
// 	payAndDress.errors = Object.values({ address, payment })
// 		.filter((i) => !!i)
// 		.join('; ');
// 	contactsForm.valid = !email && !phone;
// 	contactsForm.errors = Object.values({ phone, email })
// 		.filter((i) => !!i)
// 		.join('; ');
// });

// events.on('formErrors:change', (errors: Partial<TForm>) => {
// 	const { email, phone, address, payment } = errors;
// 	payAndDress.valid = !address && !payment;
// 	payAndDress.errors = Object.values({ address, payment })
// 		.filter((i) => !!i)
// 		.join('; ');
// 	contactsForm.valid = !email && !phone;
// 	contactsForm.errors = Object.values({ phone, email })
// 		.filter((i) => !!i)
// 		.join('; ');
// });

// // регистрируем изменения в формах
// events.on(
// 	/^order\..*:change/,
// 	(data: { field: keyof TForm; value: string }) => {
// 		checkedState.setOrderFields(data.field, data.value);
// 	}
// );

// events.on(
// 	/^contacts\..*:change/,
// 	(data: { field: keyof TForm; value: string }) => {
// 		checkedState.setOrderFields(data.field, data.value);
// 	}
// );
