/**
 * Основной модуль приложения - точка входа.
 */

const express = require("express");
const api = require("./api");
const logger = require("./logger");
const config = require("./config");
const { calculateCost } = require("./utils");
const {
	TASK_TYPE_CHECK_ID,
	QUERY_PARAM_FOR_TASKS,
	MILLISECONDS_PER_SECONDS,
	DAY_PER_SECONDS,
} = require("./const");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/lead", async (req, res) => {
	try {
		const [lead] = req.body.leads.update
			? req.body.leads.update
			: req.body.leads.add;

		const deal = await api.getDeal(lead.id, ["contacts"]);

		const { contacts } = deal._embedded;

		if (!contacts.length) {
			return res.send("No contacts");
		}

		const { id: idMainContact } = contacts.find((contact) => contact.is_main);

		const contact = await api.getContact(idMainContact);

		const price = calculateCost(deal, contact);

		if (deal.price === price) {
			return res.send("OK");
		}

		const dealForUpdate = [
			{
				id: deal.id,
				price,
			},
		];

		await api.updateDeals(dealForUpdate);

		const { data: tasksData } = await api.getTasks(
			`${QUERY_PARAM_FOR_TASKS}&filter[entity_id][]=${deal.id}`
		);

		if (!tasksData) {
			const taskForCreate = {
				text: "Проверить бюджет",
				complete_till: Math.floor(Date.now() / MILLISECONDS_PER_SECONDS) + DAY_PER_SECONDS,
				task_type_id: TASK_TYPE_CHECK_ID,
				entity_id: deal.id,
				entity_type: "leads",
			};

			await api.createTasks(taskForCreate);
		}

		res.send("OK");
	} catch (error) {
		console.error("error:", error);

		res.send("ERROR");
	}
});

app.post("/task", async (req, res) => {
	try {
		const [task] = req.body.task.update;

		if (TASK_TYPE_CHECK_ID === +task.task_type) {
			const note = {
				entity_id: task.element_id,
				note_type: "common",
				params: {
					text: "Бюджет проверен, ошибок нет",
				},
			};

			await api.createNotes(task.element_id, note);
		}

		res.send("OK");
	} catch (error) {
		console.error("error:", error);

		res.send("ERROR");
	}
});

app.listen(config.PORT, () => logger.debug("Server started on ", config.PORT));
