const DealCustomFieldServices = {
	FieldId: 432917,
	ServicesIds: {
		LaserFacialRejuvenation: 233757,
		UltrasonicLifting: 233759,
		LaserRemovalOfBloodVessels: 233761,
		MimicWrinklesCorrection: 233763,
		LaserHairRemoval: 233765,
	},
};
const ContactFieldsServicesIds = {
	LaserFacialRejuvenation: 432753,
	UltrasonicLifting: 457003,
	LaserRemovalOfBloodVessels: 457005,
	MimicWrinklesCorrection: 456951,
	LaserHairRemoval: 456953,
};

const TASK_TYPE_CHECK_ID = 2850298;
const MILLISECONDS_PER_SECONDS = 1000;
const DAY_PER_SECONDS = 86400;
const QUERY_PARAM_FOR_TASKS = `filter[is_completed]=0&filter[task_type][]=${TASK_TYPE_CHECK_ID}&filter[entity_type][]='leads'`;
const COMPARISON_ID = {
	[DealCustomFieldServices.ServicesIds.LaserFacialRejuvenation]:
		ContactFieldsServicesIds.LaserFacialRejuvenation,
	[DealCustomFieldServices.ServicesIds.UltrasonicLifting]:
		ContactFieldsServicesIds.UltrasonicLifting,
	[DealCustomFieldServices.ServicesIds.LaserRemovalOfBloodVessels]:
		ContactFieldsServicesIds.LaserRemovalOfBloodVessels,
	[DealCustomFieldServices.ServicesIds.MimicWrinklesCorrection]:
		ContactFieldsServicesIds.MimicWrinklesCorrection,
	[DealCustomFieldServices.ServicesIds.LaserHairRemoval]:
		ContactFieldsServicesIds.LaserHairRemoval,
};

module.exports = {
	DealCustomFieldServices,
	TASK_TYPE_CHECK_ID,
	QUERY_PARAM_FOR_TASKS,
	COMPARISON_ID,
	MILLISECONDS_PER_SECONDS,
	DAY_PER_SECONDS,
};
