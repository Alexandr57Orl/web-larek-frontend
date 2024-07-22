// import { TForm } from '../types/index';
// import { events } from '../index';
// import { payAndDress, contactsForm } from '..';
// import { checkedState } from '..';

// // сначала валидируем все формы контакты и адрес
// events.on('formErrors:change', (errors: Partial<TForm>) => {
// 	const { email, mobile, adress, typePay } = errors;
// 	payAndDress.valid = !adress && !typePay;
// 	payAndDress.errors = Object.values({ adress, typePay })
// 		.filter((i) => !!i)
// 		.join('; ');
// 	contactsForm.valid = !email && !mobile;
// 	contactsForm.errors = Object.values({ mobile, email })
// 		.filter((i) => !!i)
// 		.join('; ');
// });

// events.on('formErrors:change', (errors: Partial<TForm>) => {
// 	const { email, mobile, adress, typePay } = errors;
// 	payAndDress.valid = !adress && !typePay;
// 	payAndDress.errors = Object.values({ adress, typePay })
// 		.filter((i) => !!i)
// 		.join('; ');
// 	contactsForm.valid = !email && !mobile;
// 	contactsForm.errors = Object.values({ mobile, email })
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
