"use strict";

import commonView from "../view/view";
import Form from "../../blocks/form/form.js";
import Message from "../../blocks/form/__message/form__message.js";
import signUpFields from "../../templates/signUpFileds"


export default class signUpView extends commonView {
	constructor(eventBus, userService, router) {
		const form = new Form(signUpFields);
		super({form});

		this.bus = eventBus;
		this.userService = userService;
		this.router = router;

		this.form = form;
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

		this.hide();
	}


	async onSubmit(formData) {
		const resp = await this.userService.signup(formData.name, formData.email, formData.password, formData.confirm);
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