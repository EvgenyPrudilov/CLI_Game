
import { Controller } from "./controller/controller.js";
import { View } from "./view/view.js";
import { Model } from "./model/model.js";
import { Script } from "./script.js";

async function main() {
  let script: Script;

  const scriptDefaultName = "./script.json";
  const scriptName = process.argv[2]; 

  if (scriptName === undefined) {
    script = new Script(scriptName);
  } else {
    script = new Script(scriptDefaultName);
  }

  const controller = new Controller();
  const view = new View();
  const model = new Model();

  controller.init(model);
  view.init(controller);
  model.init(view, script);

  await view.renderCycle();  
}

main();
