'use strict';

import Field from "./field.js";
import GameService from "../services/game-service.js";

const x = 425;
const y = 230;
const sq = Math.sqrt(2)/2;
const side = 66;
const brightLevel = 1;

const width = 6;
const maxPlayers = 2;

function* generatorId(array) {
	let i = 0;
	while (i < array.length) {
		yield array[i].playerID;
		i++;
		if (i === array.length)
			i = 0;
	}
}

export default class Game {
	constructor(canvas, eventBus) {
		this.canvas = canvas;

		this.canvasForCubes = this.canvas.canvasForCubes;
		this.canvasForFigure = this.canvas.canvasForFigure;
		this.canvasForClicks = this.canvas.canvasForClicks;
		this.eventBus = eventBus;

		this.coordOfMove = {
			x1: -1,
			x2: -1,
			y1: -1,
			y2: -1,
		};

		this.generatorID = 0;

		this.field = new Field(width, this.canvas, this.eventBus);
		this.gameService = new GameService();
	}


	async Start() {
		const хранилище = window.localStorage;
		if (!хранилище["gameID"]) {
            const response = await this.gameService.start(width, width, maxPlayers);
            this.gameService.gameData.gameID = response.json.gameID;
            хранилище.setItem("gameID", `${this.gameService.gameData.gameID}`);
        }
        else
        	this.gameService.gameData.gameID = хранилище["gameID"];
		this.Complete();
	}


	async Complete() {
		const response = await this.gameService.complete(this.gameService.gameData.gameID);
		this.gameService.gameData.players = response.json.players;
		this.generatorID = generatorId(this.gameService.gameData.players);
		this.gameService.gameData.playerID = this.gameService.gameData.players[0].playerID;
		this.gameService.gameData.currentPlayerID = response.json.currentPlayerID;
		this.gameService.gameData.gameOver = response.json.gameOver;
		this.gameService.gameData.arrayOfFigures = response.json.field;
		this.setFiguresByArray(this.gameService.gameData.arrayOfFigures);
		this.field.drawAllFigures();
		this.field.drawCountOfFigure(this.gameService.gameData.players, this.gameService.gameData.currentPlayerID);
	}


	async Play(coord, currentPlayerID, exit) {
		const gameID = this.gameService.gameData.gameID;
		const playerID = this.gameService.gameData.playerID;
		const response = await this.gameService.play(coord, gameID, playerID, currentPlayerID);
		this.stepProcessing(response, exit);
		this.Status(gameID, playerID, this.gameService.gameData.currentPlayerID, exit);
	}


	async Status(gameID, playerID, currentPlayerID, exit) {
		const response = await this.gameService.status(gameID, playerID, currentPlayerID);
		this.stepProcessing(response, exit);
	}


	stepProcessing(response, exit) {
		this.gameService.gameData.players = response.json.players;
		this.gameService.gameData.currentPlayerID = response.json.currentPlayerID;
		this.gameService.gameData.gameOver = response.json.gameOver;
		this.gameService.gameData.arrayOfFigures = response.json.field;
		this.field.deleteAllFigure();
		this.field.clearFigures();
		this.setFiguresByArray(this.gameService.gameData.arrayOfFigures);
		this.field.drawAllFigures();
		this.field.drawCountOfFigure(this.gameService.gameData.players, this.gameService.gameData.currentPlayerID);
		this.field.deleteAllBrightCube();
		this.field.drawField();
		if (this.gameService.gameData.gameOver === true) {
			const хранилище = window.localStorage;
			хранилище.removeItem("gameID");
			this.field.gameOver(this.gameService.gameData.playerID);
			setTimeout(() => {
				this.canvas.winDiv.hide();
				exit();
			}, 3000);
		}
	}


	startGame(exit) {
		this.exit = exit;
		this.field.deleteAllFigure();
		this.field.clearFigures();
		this.field.drawField();
		this.Start();

		this.canvasForClicks.addEventListener('click', {handleEvent: this.updateCanvas.bind(this), exit: this.exit}, false);
	}


	setFiguresByArray(array) {
		for (let i = 0; i < width; i++) {
			for (let j = 0; j < width; j++) {
				let model = 0;
				if (array[i][j] >= 0) {
					model = array[i][j] + 2;
					this.field.setFigure(i, j, model);
				}
			}
		}
	}


	findOffset(obj) {
		let curX = 0;
		let curY = 0;
		if (obj.offsetParent) {
			do {
				curX += obj.offsetLeft;
				curY += obj.offsetTop;
			} while (obj = obj.offsetParent);
			return {x:curX,y:curY};
		}
	}


	updateCanvas(event){
		let pos = this.findOffset(this.canvasForClicks);
		let mouseX = event.pageX - pos.x;
		let mouseY = event.pageY - pos.y;
		let XX = (mouseX - x + mouseY - y)*sq;
		let YY = (mouseY - mouseX + x - y)*sq;

		if (XX < side*width && YY < side*width && XX > 0 && YY > 0) {
			let idx;
			let idy;
			for (let i = 0; i < width; i++) {
				if (XX > side*i)
					idx = i;
				if (YY > side*i)
					idy = i;
			}

			if (this.field.findById(idx, idy).figure === this.gameService.gameData.currentPlayerID+2) {
				this.field.deleteAllBrightCube();
				this.field.brightCubes(idx, idy);
				this.field.drawField();

				this.coordOfMove.x1 = idx;
				this.coordOfMove.y1 = idy;
			}
			if (this.field.findById(idx, idy).brightness === brightLevel) {
				this.coordOfMove.x2 = idx;
				this.coordOfMove.y2 = idy;

				this.Play(this.coordOfMove, this.generatorID.next().value, this.exit);
			}
		}
	}
}