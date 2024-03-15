import { GameState } from "./GameState";

export class GameEngine {
    gameState: GameState;

    constructor(gameState: GameState) {
        this.gameState = gameState;
    }

    public movePlayer(direction: string) {
        let playerX = this.gameState.playerX;
        let playerY = this.gameState.playerY;
        let currentBoard = this.gameState.board;
        let newState = this.gameState;
        const nextPlayerPos = { x: playerX, y: playerY };
        let boxMoved = false;

        switch (direction) {
            case "ArrowLeft":
                nextPlayerPos.x--;
                boxMoved = this.isBoxOnPos(currentBoard, nextPlayerPos);
                newState = this.movePlayerLeft(playerY, playerX, currentBoard);
                break;
            case "ArrowRight":
                nextPlayerPos.x++;
                boxMoved = this.isBoxOnPos(currentBoard, nextPlayerPos);
                newState = this.movePlayerRight(playerY, playerX, currentBoard);
                break;
            case "ArrowUp":
                nextPlayerPos.y--;
                boxMoved = this.isBoxOnPos(currentBoard, nextPlayerPos);
                newState = this.movePlayerUp(playerY, playerX, currentBoard);
                break;
            case "ArrowDown":
                nextPlayerPos.y++;
                boxMoved = this.isBoxOnPos(currentBoard, nextPlayerPos);
                newState = this.movePlayerDown(playerY, playerX, currentBoard);
                break;
            case "Backspace":
                if (this.gameState.backTrace.length === 0) return newState;
                let preStateInfo: number[] = this.gameState.backTrace.pop()!;
                currentBoard[preStateInfo[1]][preStateInfo[0]] += 1;
                currentBoard[preStateInfo[3]][preStateInfo[2]] -= 1;
                if (preStateInfo[4] >= 0) {
                    //Resore box
                    currentBoard[preStateInfo[3]][preStateInfo[2]] += 2;
                    currentBoard[preStateInfo[5]][preStateInfo[4]] -= 2;
                }
                newState = new GameState(currentBoard);
                newState.backTrace = this.gameState.backTrace;
                return newState;
        }

        if (newState !== this.gameState) {
            let newBoxPosition = { x: -1, y: -1 };
            //let boxMoved = (this.gameState.board[newState.playerY][newState.playerX] & 2) != 0;
            if (boxMoved) {
                newBoxPosition.x =
                    playerX !== newState.playerX
                        ? playerX < newState.playerX
                            ? newState.playerX + 1
                            : newState.playerX - 1
                        : playerX;
                newBoxPosition.y =
                    playerY !== newState.playerY
                        ? playerY < newState.playerY
                            ? newState.playerY + 1
                            : newState.playerY - 1
                        : playerY;
            }
            console.log(
                boxMoved,
                newBoxPosition.x,
                newBoxPosition.y,
                newState.playerX,
                newState.playerY,
                this.gameState.board[newState.playerY][newState.playerX]
            );
            newState.backTrace = this.gameState.backTrace;
            newState.backTrace.push([
                playerX,
                playerY,
                newState.playerX,
                newState.playerY,
                newBoxPosition.x,
                newBoxPosition.y,
            ]);
        }

        return newState;
    }
    private isBoxOnPos(board: number[][], pos: { x: number; y: number }) {
        return (
            0 <= pos.x &&
            pos.x < board[0].length &&
            0 <= pos.y &&
            pos.y < board.length &&
            (board[pos.y][pos.x] & 2) != 0
        );
    }

    private movePlayerLeft(playerY: number, playerX: number, currentBoard: number[][]) {
        let moveToIndex = currentBoard[playerY][playerX - 1];

        if (moveToIndex === 0 || moveToIndex === 4) {
            currentBoard[playerY][playerX - 1] += 1;
            currentBoard[playerY][playerX] -= 1;
            return new GameState(currentBoard);
        } else if (moveToIndex === 2 || moveToIndex === 6) {
            if (this.moveBox(playerY, playerX - 1, "left")) {
                currentBoard[playerY][playerX - 1] += 1;
                currentBoard[playerY][playerX] -= 1;
                return new GameState(currentBoard);
            }
        }

        return this.gameState;
    }

    private movePlayerRight(playerY: number, playerX: number, currentBoard: number[][]) {
        let moveToIndex = currentBoard[playerY][playerX + 1];

        if (moveToIndex === 0 || moveToIndex === 4) {
            currentBoard[playerY][playerX + 1] += 1;
            currentBoard[playerY][playerX] -= 1;
            return new GameState(currentBoard);
        } else if (moveToIndex === 2 || moveToIndex === 6) {
            if (this.moveBox(playerY, playerX + 1, "right")) {
                currentBoard[playerY][playerX + 1] += 1;
                currentBoard[playerY][playerX] -= 1;
                return new GameState(currentBoard);
            }
        }

        return this.gameState;
    }

    private movePlayerUp(playerY: number, playerX: number, currentBoard: number[][]) {
        let moveToIndex = currentBoard[playerY - 1][playerX];

        if (moveToIndex === 0 || moveToIndex === 4) {
            currentBoard[playerY - 1][playerX] += 1;
            currentBoard[playerY][playerX] -= 1;
            return new GameState(currentBoard);
        } else if (moveToIndex === 2 || moveToIndex === 6) {
            if (this.moveBox(playerY - 1, playerX, "up")) {
                currentBoard[playerY - 1][playerX] += 1;
                currentBoard[playerY][playerX] -= 1;
                return new GameState(currentBoard);
            }
        }
        return this.gameState;
    }

    private movePlayerDown(playerY: number, playerX: number, currentBoard: number[][]) {
        let moveToIndex = currentBoard[playerY + 1][playerX];

        if (moveToIndex === 0 || moveToIndex === 4) {
            currentBoard[playerY + 1][playerX] += 1;
            currentBoard[playerY][playerX] -= 1;
            return new GameState(currentBoard);
        } else if (moveToIndex === 2 || moveToIndex === 6) {
            if (this.moveBox(playerY + 1, playerX, "down")) {
                currentBoard[playerY + 1][playerX] += 1;
                currentBoard[playerY][playerX] -= 1;
                return new GameState(currentBoard);
            }
        }

        return this.gameState;
    }

    private moveBox(boxY: number, boxX: number, direction: string) {
        if (direction === "right") {
            let moveToIndex = this.gameState.board[boxY][boxX + 1];
            return this.moveBoxRight(moveToIndex, boxY, boxX);
        } else if (direction === "down") {
            let moveToIndex = this.gameState.board[boxY + 1][boxX];
            return this.moveBoxDown(moveToIndex, boxY, boxX);
        } else if (direction === "up") {
            let moveToIndex = this.gameState.board[boxY - 1][boxX];
            return this.moveBoxUp(moveToIndex, boxY, boxX);
        } else if (direction === "left") {
            let moveToIndex = this.gameState.board[boxY][boxX - 1];
            return this.moveBoxLeft(moveToIndex, boxY, boxX);
        }
    }

    private moveBoxDown(moveToIndex: number, boxY: number, boxX: number): boolean {
        if (moveToIndex === 0 || moveToIndex === 4) {
            this.gameState.board[boxY][boxX] -= 2;
            this.gameState.board[boxY + 1][boxX] += 2;
            return true;
        }
        return false;
    }

    private moveBoxUp(moveToIndex: number, boxY: number, boxX: number): boolean {
        if (moveToIndex === 0 || moveToIndex === 4) {
            this.gameState.board[boxY][boxX] -= 2;
            this.gameState.board[boxY - 1][boxX] += 2;
            return true;
        }
        return false;
    }

    private moveBoxLeft(moveToIndex: number, boxY: number, boxX: number): boolean {
        if (moveToIndex === 0 || moveToIndex === 4) {
            this.gameState.board[boxY][boxX] -= 2;
            this.gameState.board[boxY][boxX - 1] += 2;
            return true;
        }
        return false;
    }

    private moveBoxRight(moveToIndex: number, boxY: number, boxX: number): boolean {
        if (moveToIndex === 0 || moveToIndex === 4) {
            this.gameState.board[boxY][boxX] -= 2;
            this.gameState.board[boxY][boxX + 1] += 2;
            return true;
        }
        return false;
    }

    public getCurrentBoard(): GameState {
        return this.gameState;
    }
}
