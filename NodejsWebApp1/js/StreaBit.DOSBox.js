/*
var game = new StreaBit.DOSBox(
			{
				game: "doom",
				user: "AHG3GJ883DGD33H38H",
				canvas-id: "game-screen",
				onStatusChange: callback
			});

function callback(status, progress, error){}

function StreaBit.DOSBox(config, onStatusChange){
	this.onStatusChange = onStatusChange;
	
}
*/


if(typeof StreaBit == 'undefined') StreaBit = {DOSBox: null};
StreaBit['DOSBox'] =
	class extends AbstractEngine {
		constructor(settings){
			super(settings);
			settings['engine'] = "DOSBox";
			settings['game_directory'] = "/game";
		}
		
		// _initModule(){
		// 	var mod = super._initModule();
		// 	mod['arguments'] = ['/game/PLAY.BAT'];
		// 	return mod;
		// }

		// pause(){
		// 	this._engine.Module.utils.pauseLoop();
		// 	this._onStatusChange("Engine loop paused",null,null);
		// }

		// resume(){
		// 	//TODO: GET LAST SAVE STATE FROM SERVER PUT IT INTO FS
		// 	this._engine.Module.utils.resumeState();
		// 	ths._onStatusChange(4);
		// 	//this._onStatusChange("Engine state resumed",null,null);
		// }

		// _resumeRun(){
		// 	this._engine.Module.utils.resumeLoop();
		// 	this._onStatusChange("Engine loop resumed",null,null);
		// }

		// save(){
		// 	this._engine.Module.utils.saveState();
		// 	//TODO: READ SAVESTATE FROM FS AND SEND TO SERVER
		// 	ths._onStatusChange(6);
		// 	//this._onStatusChange("Engine state saved",null,null);
		// }

	}
