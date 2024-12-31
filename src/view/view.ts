
import { Controller } from "../controller/controller.js";
import { StepCommand } from "../controller/commands/step.js";
import { QuitCommand } from "../controller/commands/quit.js"
import { ViewInput } from "../view/input.js";

export class View {
  private _stepCommand: StepCommand;
  private _quitCommand: QuitCommand;
  private _input: ViewInput;
  private _controller: Controller;
  private _text: string;
  private _isInCycle: boolean = true;

  constructor () { }

  public init(controller: Controller): void {
    this._controller = controller;
    this._stepCommand = new StepCommand(controller);
    this._quitCommand = new QuitCommand(controller);
    this._input = new ViewInput();
  }

  public setText(newText: string) {
    this._text = newText;
  }
  
  public setCycleStatus(isInCycle: boolean) {
    this._isInCycle = isInCycle;
  }

  private _renderView() { 
    console.log(this._text);
  }

  private async _processInput() {
    const input: number | "quit" | "start" = await this._input.readInput("> ");
    if (input === "quit") {
      this._quitCommand.execute();
    } else if (input === "start") {
      this._stepCommand.setStepNumber(0).execute();
    } else {
      this._stepCommand.setStepNumber(input).execute();
    }
  }

  public async renderCycle() {
    this._renderView();
    try {
      while (this._isInCycle) {
        await this._processInput();
        this._renderView();
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      this._input.closeInput();
    }
  }
}
