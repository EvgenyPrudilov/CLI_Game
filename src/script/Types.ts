
/* Эти оъекты будут использоваться для описания текущего шага в игре:
 *   номер шага, его текст, варианты перехода, ...
 ***********************************************************************/
export type NoOptionsStep = {
  id: number,
  text: string,
  options: undefined,
  nextStep: number
};

export type Option = {
  text: string,
  nextStep: number
};

export type OptionsStep = {
  id: number,
  text: string,
  options: Option[],
  nextStep: undefined
};

export type EndStep = {
  id: number,
  text: string,
  options: undefined,
  nextStep: null
};

export type Step = NoOptionsStep | OptionsStep | EndStep;

/* Эти функции будут использоваться для определения текущего шага
 *   в условиях.
 ***********************************************************************/
export function isEndStep(step: Step): step is EndStep {
  return step.nextStep === null;
}

export function isNoOptionsStep(step: Step): step is NoOptionsStep {
  return step.options === undefined;
}

export function isOptionStep(step: Step): step is OptionsStep {
  return step.options !== undefined;
}

export function isAnyStep(step: Step): boolean {
  return isEndStep(step) || isNoOptionsStep(step) || isOptionStep(step);
}

/* Этот оъект будет использоваться для описания данным скрипта: 
 *   номерам шага, текстам, вариантам путей, ...
 ***********************************************************************/
export type FullScript = {
  name: string,
  description: string,
  beginStep: number,
  win_ids: number[],
  loss_ids: number[],
  steps: Step[]
};


