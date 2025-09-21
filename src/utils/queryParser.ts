export function parseString(value: string | string[] | undefined, defaultValue: string = ''): string {
  if (typeof value === 'string') return value;
  return defaultValue;
}

export function parsePositiveNumber(value: string | string[] | undefined, defaultValue: number = 1): number {
  const num = Number(value);
  return !isNaN(num) && num > 0 ? num : defaultValue;
}

export function parseBoolean(value: string | string[] | undefined, defaultValue: boolean = false): boolean {
  if (typeof value === 'string') {
    return value === 'true';
  }
  return defaultValue;
}

type SubscriptionStep = 'PlanSelection' | 'UserInfo' | 'Payment' | 'Summary' | 'Completion';

export function stepParser(value: SubscriptionStep) {
  const validSteps: SubscriptionStep[] = ['PlanSelection', 'UserInfo', 'Payment', 'Summary', 'Completion'];

  return validSteps.includes(value as SubscriptionStep) ? (value as SubscriptionStep) : 'PlanSelection';
}
