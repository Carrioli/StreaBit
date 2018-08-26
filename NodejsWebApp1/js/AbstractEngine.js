
class AbstractEngine {
    constructor(settings) {
        this.ROM_URL = settings.rom_path; //"roms/";
        this.CORE_URL = settings.cores_path; //"cores/";
        this.GAME_PATH = settings.game_directory; //"/game";
        this._engineName = settings.engine;
        this._onStatusChange = settings.onStatusChange;
        this._canvas = settings.canvas_id;
        this._game = settings.game;
        this._engineLoaded = false;
    }

    run(onEmulator) {

        if (!this._engineLoaded) {
            var ths = this;
            this._onStatusChange(7, { "engine": 0 });
            this._loadEngine(() => {
                ths._onStatusChange(2);
                ths._engine.Module['canvas'] = window.document.getElementById(this._canvas);
                ths._engineLoaded = true;
                ths._loadRom(() => {
                    ths._onStatusChange(3, null);
                    ths._loadSave(() => {
                        ths._onStatusChange(4);
                        ths._engine.Module.callMain(ths._engine.Module.arguments);
                        ths._onStatusChange(1);
                    }, (progress) => {
                        ths._onStatusChange(7, { "zip_salvataggio": progress });
                    }, (e) => {
                        //ERRORE 
                        //NESSUN SALVATAGGIO => AVVIA COMUNQUE IL GIOCO
                    });

                }, (progress) => {
                    ths._onStatusChange(7, { "zip_gioco": progress });
                }, (e) => {
                    //console.log(e);
                    ths._onStatusChange(5, { "msg_error": "Download rom fail" + e });
                });
            });
        } else {
            this._resumeRun();
        }

    }

    stop() {
        this._engine.Module.abort();
        this._engine = null;
        this._engineLoaded = null;
    }

    fullScreen() {
        this._engine.Module.requestFullscreen();
    }

    //Abstract
    pause() {
        return this;
    }
    //Abstract
    resume() {
        return this;

    }
    //Abstract
    _resumeRun() {
        return this;
    }
    //Abstract
    save() {
        return this;
    }

    _loadEngine(success) {
        var script = document.createElement('script');
        var engineName = this._engineName.toLowerCase();
        script.src = this.CORE_URL + engineName + ".js";
        var loaded = false;
        var ths = this;
        script.onload = script.onreadystatechange = function () {
            if (!loaded && (!this.readyState || this.readyState == 'complete')) {
                loaded = true;
                ths._engine = StreaBit.Core[ths._engineName](ths._initModule());
                success();
            }
        };
        document.body.appendChild(script);
    }

    _loadRom(success, progress, error) {
        var ths = this;
        var remote_path = this.ROM_URL;
        fetchRemotePackage(remote_path, (pInfo, data) => {
            //	console.log(pInfo.files);
            ths.RomInfo = pInfo;
            mountPackage(data, pInfo.files, this._engine.FS,
                this.GAME_PATH, success, progress, error);

        }, progress, error);

    }

    _loadSave(success, progress, error) {
        success();
        return;
        //TODO
		/*var remote_path = this.ROM_URL;
		fetchRemotePackage(remote_path,(pInfo,data)=>{

			mountPackage(data, pInfo.files, this._engine.FS,
						this.GAME_PATH,success,progress,error);
		
		}, progress, error);*/
    }

    _initModule() {
        return { noInitialRun: true, setWindowTitle: (t) => {/*do nothing*/ } };
    }

}


