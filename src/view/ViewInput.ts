
import * as readline from "readline";

/* Оъект описывает механизм ввода-вывода для view в модели MVC.
 ***********************************************************************/
export class ViewInput {
  private _rl: readline.Interface;

  constructor (io = {input: process.stdin, output: process.stdout}) {
    this._rl = readline.createInterface(io);
  }

  public readInput(prompt: string): Promise<number | "quit" | "start" | "empty"> {
    return new Promise((resolve, reject) => {
      this._rl.question(prompt, (input) => {
        const trimmedInput = input.trim();
        
        if (trimmedInput.toLowerCase() === "quit") {
          resolve("quit"); 
        }
        if (trimmedInput.toLowerCase() === "start") {
          resolve("start"); 
        }
  
        const number = parseInt(trimmedInput);
        if (!isNaN(number)) {
          resolve(number); 
        } else if (trimmedInput.trim.length == 0) {
          resolve("empty");
        } else {
          reject(new Error(`Ошибка: Введено не число и не "quit".`)); 
        }
      });
    });
  }

  public closeInput() {
    this._rl.close();
  }
}
