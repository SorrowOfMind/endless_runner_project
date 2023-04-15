import { GameInterface } from "../../models/types";


class Controller {
    private game: GameInterface;

    constructor(game: GameInterface) {
        window.addEventListener("keydown", e => this.handleKbdInput(e, 'keydown'));
        window.addEventListener('keyup', e => this.handleKbdInput(e, 'keyup'));
        this.game = game;
    }

    handleKbdInput(e: KeyboardEvent, type: string) {
        e.stopImmediatePropagation();
        const key = e.key;

        switch (key) {
            case 'ArrowUp':
            case 'w':
            {
                this.manageKeys('up', type);
                break;
            }
        }
    }

    private manageKeys(key: string, type: string) {
        const idx: number = this.game.keys.indexOf(key);
        if (type === 'keydown' && idx === -1) {
            this.game.keys.push(key);
        } else if (type === 'keyup' && idx > -1) {
            this.game.keys.splice(idx, 1);
        }
    }
}

export default Controller;