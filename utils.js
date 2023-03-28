/**
 * Модуль утилитарных функций:
 *  - для обработки данных из amoCRM;
 *  - общего назначения;
 */

const { DealIdFieldServices, COMPARISON_ID } = require("./const");

/**
 * Функция извлекает значение из id поля, массива полей custom_fields сущности amoCRM;
 *
 * @param {*} customFields - массив полей сущности;
 * @param {*} fieldId - id поля из которого нужно получить значение;
 * @returns значение поля
 */
const getFieldValue = (customFields, fieldId) => {
	const field = customFields
		? customFields.find((item) => String(item.field_id || item.id) === String(fieldId))
		: undefined;
	const value = field ? field.values[0].value : undefined;
	return value;
};

/**
 * Функция рассчитывает бюджет по выбранным услугам в поле «Услуги» в карточке сделки. Данные о стоимости услуг берутся из полей соответствующих услуг в карточке контакта прикреплённого к сделке.;
 *
 * @param {*} deal - сделка;
 * @param {*} contact - контакт;
 * @returns стоимость в формате числа;
 */
const calculateCost = (deal, contact) => {
	const servicesValues = getFieldEnumsId(
		deal.custom_fields_values,
		DealIdFieldServices.Field
	);

	const price = servicesValues.reduce((acc, idEnum) => {
		const idFieldCost = COMPARISON_ID[idEnum];
		const valueCost = +getFieldValue(contact.custom_fields_values, idFieldCost);
		return acc + valueCost;
	}, 0);

	return price;
};

/**
 * Функция извлекает enum_id из id поля, массива полей custom_fields сущности amoCRM
 * Подходит для работы со списковыми или мультисписковыми полями
 *
 * @param {*} customFields - массив полей сущности;
 * @param {*} fieldId - id поля из которого нужно получить enum_id;
 * @returns массив enum_id поля
 */
const getFieldEnumsId = (customFields, fieldId) => {
	const field = customFields
		? customFields.find((item) => String(item.field_id || item.id) === String(fieldId))
		: undefined;
	const values = field ? field.values : [];
	return values.map((item) => item.enum_id);
};

module.exports = {
	calculateCost,
};
