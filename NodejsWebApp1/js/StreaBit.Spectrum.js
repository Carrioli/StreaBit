if (typeof StreaBit == 'undefined') StreaBit = { Spectrum: null };
StreaBit['Spectrum'] =
    class extends AbstractEngine {
        constructor(settings) {
            super(settings);
            settings['engine'] = "Spectrum";
            settings['game_directory'] = "/game";
        }
    }