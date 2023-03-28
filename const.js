const DealIdFieldServices = {
	Field: 432917,
	EnumLaserFacialRejuvenation: 233757,
	EnumUltrasonicLifting: 233759,
	EnumLaserRemovalOfBloodVessels: 233761,
	EnumMimicWrinklesCorrection: 233763,
	EnumLaserHairRemoval: 233765,
};
const ContactIdFieldsServices = {
	FieldLaserFacialRejuvenation: 432753,
	FieldUltrasonicLifting: 457003,
	FieldLaserRemovalOfBloodVessels: 457005,
	FieldMimicWrinklesCorrection: 456951,
	FieldLaserHairRemoval: 456953,
};

const TASK_TYPE_CHECK_ID = 2850298;
const MILLISECONDS_PER_SECONDS = 86400;
const DAY_PER_SECONDS = 86400;
const QUERY_PARAM_FOR_TASKS = `filter[is_completed]=0&filter[task_type][]=${TASK_TYPE_CHECK_ID}&filter[entity_type][]='leads'`;
const COMPARISON_ID = {
	[DealIdFieldServices.EnumLaserFacialRejuvenation]:
		ContactIdFieldsServices.FieldLaserFacialRejuvenation,
	[DealIdFieldServices.EnumUltrasonicLifting]:
		ContactIdFieldsServices.FieldUltrasonicLifting,
	[DealIdFieldServices.EnumLaserRemovalOfBloodVessels]:
		ContactIdFieldsServices.FieldLaserRemovalOfBloodVessels,
	[DealIdFieldServices.EnumMimicWrinklesCorrection]:
		ContactIdFieldsServices.FieldMimicWrinklesCorrection,
	[DealIdFieldServices.EnumLaserHairRemoval]:
		ContactIdFieldsServices.FieldLaserHairRemoval,
};

module.exports = {
	DealIdFieldServices,
	TASK_TYPE_CHECK_ID,
	QUERY_PARAM_FOR_TASKS,
	COMPARISON_ID,
	MILLISECONDS_PER_SECONDS,
	DAY_PER_SECONDS,
};
