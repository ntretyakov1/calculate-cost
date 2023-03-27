/**
 * Модуль утилитарных функций:
 *  - для обработки данных из amoCRM;
 *  - общего назначения;
 */

const api = require("./api");
const { ID_FIELD_SERVICES, COMPARISON_ID } = require("./const");

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
 * Функция рассчитывает бюджет по выбранным услугам в поле «Услуги» в карточке сделки. Данные о стоимости услуг берутся из полей соответствующих услуг в карточке контакта прикреплённого к сделке.В случае, если контактов прикреплено к сделке 2 и более данные о стоимости услуг берутся из контакта, который является главным (main);
 *
 * @param {*} deal - сделка с списком привязанных контактов;
 * @returns стоимость в формате числа;
 */
const calculateCost = async (deal) => {
	let price = 0;

	const servicesValues = getFieldEnumsId(
		deal.custom_fields_values,
		ID_FIELD_SERVICES
	);

	const { contacts } = deal._embedded;

	for (const contact of contacts) {
		if (contact.is_main) {
			const { custom_fields_values } = await api.getContact(contact.id);

			for (const idEnum of servicesValues) {
				const idFieldCost = COMPARISON_ID[idEnum];

				const valueCost = +getFieldValue(custom_fields_values, idFieldCost);

				price += valueCost;
			}
		}
	}

	return price;
};

/**
 * Функция извлекает enum_id из id поля, массива полей custom_fields сущности amoCRM
 * Подходит для работы со списковыми или мультисписковыми полями
 *
 * @param {*} customFields - массив полей сущности;
 * @param {*} fieldId - id поля из которого нужно получить значения;
 * @returns массив значений поля
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
