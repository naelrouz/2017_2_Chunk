"use strict";

import CommonView from "./commonView";
import Form from "../blocks/form/form.js";
import Message from "../blocks/message/message.js";
import updateFields from "../templates/updateFields"


export default class updateView extends CommonView {
	constructor(eventBus, userService, router) {
		const form = new Form(updateFields);
		super({form});

		this.form = form;
		this.bus = eventBus;
		this.router = router;
		this.userService = userService;

		this.message = new Message();
		this.message.clear();
		this.message.hide();
		this.append(this.message);

		this.el.addEventListener("submit", (event) => {
			event.preventDefault();
			const formData = {};
			const fields = this.el.childNodes.item(0).elements;
			for (let field in fields) {
				formData[fields[field].name] = fields[field].value;
			}
			this.onSubmit(formData);
		}, true);

		this.bus.on("openUpdate", async () => {
			const resp = await this.userService.getDataFetch();
			if (resp.ok) {
				const username = this.form.fields[0].el;
				const email = this.form.fields[1].el;
				username.value = resp.json.username;
				email.value = resp.json.email;
			}
			else {
				this.setErrorText(resp.json.message);
			}
		});

		this.hide();
	}


	async onSubmit(formData) {
		const resp = await this.userService.update(formData.username, formData.email, formData.password, formData.old_password)
		if (resp.ok) {
			this.form.reset();
			this.message.clear();
			this.message.hide();
			this.bus.emit("auth", resp.json.username);
			this.router.goTo("/menu");
		}
		else {
			this.setErrorText(resp)
		}
	}


	setErrorText(err) {
		this.message.setText(err.message);
		this.message.show();
	}
}