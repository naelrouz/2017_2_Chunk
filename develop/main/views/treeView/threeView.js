'use strict';

import CommonView from '../view/view';
import Block from '../../blocks/block/block.js';
import eventBus from '../../modules/eventBus';

export default class ThreeView extends CommonView {
    constructor(router) {
        const gameContainer = Block.Create('div');

	    const winDiv = Block.Create('div', {}, ['canvasView__winDiv'], '');
	    // const playersDiv = Block.Create('div', {}, [], '');
	    super([gameContainer, winDiv]);
	    this.el.style.setProperty("border", "none");
	    this.el.classList.add('treeView');

	    this.winDiv = winDiv;
	    // this.playersDiv = playersDiv;

	    this.winDiv.hide();
	    // this.playersDiv.hide();

	    this.bus = eventBus;
	    this.bus.on('endOfGame', (win) => {
		    if (win) {
			    this.winDiv.setText('You win! =)');
		    } else {
			    this.winDiv.setText('You lose! =(');
		    }
		    this.winDiv.show();
            setTimeout(() => {
                this.winDiv.hide();
                router.goTo('/menu');
            }, 3000);
	    });
	    // this.eventBus.on('showPlayers', (players) => {
	    // 	this.playersDiv.setText(players);
	    // 	this.playersDiv.show();
	    // });

        this.hide();
    }


    hide() {
    	this.bus.emit('deleteTree');
        super.hide();
    }

    getElement() {
        return this.el;
    }
}