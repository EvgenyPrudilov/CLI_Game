import { State } from "./state.js";

export class QuitState extends State {
  public handle(): void {
    this.stopGame();
    this.updateView("Goodbye!");
  }
}