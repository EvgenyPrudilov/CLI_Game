
import { Controller } from "./controller/Controller.js";
import { View } from "./view/View.js";
import { Model } from "./model/Model.js";
import { Script } from "./script/Script.js";

async function main() {
  let script: Script;

  /* Определяем имя файла со скриптом игры, имя которого передано 
   * при запуске. 
   * Инициализируем объекты для MVC схемы. 
   * Запускаем рендер пользовательского интерфейса.
   **************************************************************************/
  const scriptName = process.argv[2]; 

  if (scriptName === undefined) {
    console.log("ERROR: no script was chosen");
    return;
  }
  script = new Script(scriptName);

  const controller = new Controller();
  const view = new View();
  const model = new Model();

  controller.init(model);
  view.init(controller, script);
  model.init(view, script);

  await view.renderCycle();  
}

main();
