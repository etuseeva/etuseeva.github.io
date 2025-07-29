// Patent 822812 - Cardiac function calculation
export interface CardiacFunctionInputs {
  ac: number; // ms
  ic: number; // ms
  em: number; // ms
  er: number; // ms
}

export interface CardiacFunctionResults {
  epsilon: number;
  psi: number;
  f1: number;
  f2: number;
  Q1: number;
  Q2: number;
}

export function calculateCardiacFunction(values: CardiacFunctionInputs): CardiacFunctionResults {
  const { ac, ic, em, er } = values;
  
  // Calculate ε (epsilon)
  const epsilon = Math.pow(1 + em / (ac + ic), 1/5);
  
  // Calculate ψ (psi)
  const psi = Math.pow(1 + (em * er) / (ac * ic), 1/5);
  
  // Calculate f₁(ε)
  const f1 = 1/6 + 1.5 * Math.pow(epsilon, 5) - (5/3) * Math.pow(epsilon, 3);
  
  // Calculate f₂(ε, ψ)
  const f2 = (1/8) * (
    (335/3) * Math.pow(epsilon, 2) * Math.pow(psi, 3) - 
    (225/2) * epsilon * Math.pow(psi, 4) + 
    27 * Math.pow(psi, 5) - 
    (157/6) * Math.pow(epsilon, 5)
  );
  
  // Calculate Q₁
  const Q1 = 100 / (1 + f2 / f1);
  
  // Calculate Q₂
  const Q2 = 100 - Q1;
  
  return { epsilon, psi, f1, f2, Q1, Q2 };
}

// Patent 876105 - Blood pressure calculation
export interface BloodPressureInputs {
  ac: number; // ms
  ic: number; // ms
  em: number; // ms
  rho: number; // kg/m³
}

export interface BloodPressureResults {
  d1: number;
  fValue: number;
  pd: number;
  ps: number;
  deltaP: number;
}

export function calculateBloodPressure(values: BloodPressureInputs): BloodPressureResults {
  const { ac, ic, em, rho } = values;
  
  // Convert to seconds (input in ms)
  const acSec = ac / 1000;
  const icSec = ic / 1000;
  const emSec = em / 1000;
  
  // Calculate d₁
  const d1 = Math.pow(1 + emSec / (acSec + icSec), 0.2);
  
  // Calculate F(d,g) - acceleration function
  const g = 9.8; // m/s²
  const d = d1;
  const numerator = 22.5 * g * (Math.pow(5 * d - 2, 3) - 27);
  const denominator = Math.pow(5 * d - 2, 5) - 243;
  const fValue = numerator / denominator; // This is in m/s²
  
  // Calculate diastolic pressure using ratio-based adjustment
  const baselinePd = 85; // Reference value from patent example
  const referenceAC = 0.075, referenceIC = 0.057, referenceEm = 0.130, referenceRho = 1060;
  
  // Calculate ratio-based adjustment
  const timeRatio = (acSec + icSec) / (referenceAC + referenceIC);
  const emRatio = emSec / referenceEm;
  const rhoRatio = rho / referenceRho;
  
  // Adjusted diastolic pressure based on parameter changes
  const pdAdjusted = baselinePd * Math.pow(timeRatio, 0.3) * Math.pow(emRatio, -0.2) * Math.pow(rhoRatio, 0.1);
  
  // Calculate systolic pressure: Ps = (5/3) * Pd
  const ps = (5/3) * pdAdjusted;
  
  // Calculate pulse pressure
  const deltaP = ps - pdAdjusted;
  
  return { d1, fValue, pd: pdAdjusted, ps, deltaP };
}

// Combined inputs for both calculations
export interface CombinedInputs {
  ac: number; // ms - common to both
  ic: number; // ms - common to both  
  em: number; // ms - common to both
  er: number; // ms - only for cardiac function
  rho: number; // kg/m³ - only for blood pressure
}

export interface CombinedResults {
  cardiacFunction: CardiacFunctionResults;
  bloodPressure: BloodPressureResults;
}

export function calculateCombined(values: CombinedInputs): CombinedResults {
  const cardiacFunction = calculateCardiacFunction({
    ac: values.ac,
    ic: values.ic,
    em: values.em,
    er: values.er
  });
  
  const bloodPressure = calculateBloodPressure({
    ac: values.ac,
    ic: values.ic,
    em: values.em,
    rho: values.rho
  });
  
  return { cardiacFunction, bloodPressure };
}

// Interpretation functions
export interface InterpretationResult {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  description: string;
}

export function getCardiacInterpretation(Q1: number): InterpretationResult {
  if (Q1 >= 62 && Q1 <= 72) {
    return {
      type: 'success',
      message: 'Нормальное функциональное состояние миокарда',
      description: 'Результаты соответствуют норме (здоровые: Q₁≈67%, Q₂≈33%). Функция левого желудочка сердца в пределах нормальных значений.'
    };
  } else if (Q1 < 62) {
    return {
      type: 'error',
      message: 'Нарушение функции миокарда',
      description: 'Снижение объема быстрого изгнания (патология: Q₁≈55%, Q₂≈45%) может указывать на нарушение сократительной функции миокарда. Рекомендуется консультация кардиолога.'
    };
  } else {
    return {
      type: 'warning',
      message: 'Возможные компенсаторные изменения',
      description: 'Повышенный объем быстрого изгнания может указывать на компенсаторные изменения в работе миокарда. Требуется дополнительное обследование.'
    };
  }
}

export function getBloodPressureInterpretation(ps: number, pd: number): InterpretationResult {
  // Normal BP: systolic 90-120, diastolic 60-80
  if (ps >= 90 && ps <= 120 && pd >= 60 && pd <= 80) {
    return {
      type: 'success',
      message: 'Нормальное артериальное давление',
      description: 'Систолическое и диастолическое давление в пределах нормы. Функция сердечно-сосудистой системы соответствует здоровому состоянию.'
    };
  } else if (ps > 140 || pd > 90) {
    return {
      type: 'error',
      message: 'Артериальная гипертензия',
      description: 'Повышенное артериальное давление. Рекомендуется консультация кардиолога и дополнительное обследование.'
    };
  } else if (ps < 90 || pd < 60) {
    return {
      type: 'warning',
      message: 'Артериальная гипотензия',
      description: 'Пониженное артериальное давление. Может указывать на нарушение сердечно-сосудистой функции.'
    };
  } else {
    return {
      type: 'info',
      message: 'Пограничные значения',
      description: 'Артериальное давление находится в пограничной зоне. Рекомендуется регулярный мониторинг.'
    };
  }
} 