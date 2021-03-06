'use strict';
import eventBus from '../../../modules/eventBus';
import Block from '../../../blocks/block/block';
import backendWaitingAnimationHtml from './starLord/starLordHtml'


export default class BackendWaitingAnimation {
	constructor() {
		this.animationContainer = Block.create('div', {'id': 'starlord'}, ['stripe']);
		this.animationContainer.el.innerHTML = backendWaitingAnimationHtml;
		document.body.appendChild(this.animationContainer.el);
		this.animationContainer.hide();
		this.main = Array.from(document.getElementsByTagName('main'))[0];
		this.waitingBackend();
		this.backendResponseReceived();
	}


	waitingBackend() {
		eventBus.on('waitingBackend', () => {
			this.main.classList.add('waiting');
			document.body.addEventListener('click', this.catchAllClick, true);
			this.animationContainer.show();
			this.animationOn();
		});
	}

	catchAllClick(event) {
		event.preventDefault();
		event.stopPropagation();
	}

	backendResponseReceived() {
		eventBus.on('backendResponseReceived', () => {
			document.body.removeEventListener('click', this.catchAllClick, true);
			setTimeout(() => {
				this.animationContainer.hide();
				this.animationOff();
				this.opacityAnimationOff();
			}, 500);
			this.main.classList.remove('waiting');
			this.opacityAnimationOn();
		});
	}


	animationOn() {
		this.animationContainer.el.classList.add('animation');
	}


	animationOff() {
		this.animationContainer.el.classList.remove('animation');
	}


	opacityAnimationOn() {
		const container = this.animationContainer.el.getElementsByClassName('container')[0];
		container.classList.add('opacityAnimation');
	}


	opacityAnimationOff() {
		const container = this.animationContainer.el.getElementsByClassName('container')[0];
		container.classList.remove('opacityAnimation');
	}
};