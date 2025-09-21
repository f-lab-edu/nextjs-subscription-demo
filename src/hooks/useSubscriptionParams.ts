import { parseString } from '@/utils/queryParser';
import { useQueryParams } from './useQueryParams';

type SubscriptionStep = 'PlanSelection' | 'UserInfo' | 'Payment' | 'Summary' | 'Completion';

export function useSubscriptionParams() {
  const params = useQueryParams([
    {
      key: 'step',
      parser: (value) => {
        const validSteps: SubscriptionStep[] = ['PlanSelection', 'UserInfo', 'Payment', 'Summary', 'Completion'];
        return validSteps.includes(value as SubscriptionStep) ? (value as SubscriptionStep) : 'PlanSelection';
      },
      defaultValue: 'PlanSelection' as SubscriptionStep,
    },
    {
      key: 'planid',
      parser: parseString,
      defaultValue: '',
    },
    {
      key: 'cardid',
      parser: parseString,
      defaultValue: '',
    },
    {
      key: 'couponid',
      parser: parseString,
      defaultValue: '',
    },
  ] as const);

  const goToStep = (newStep: SubscriptionStep, additionalParams?: Partial<Omit<typeof params, 'setParams'>>) => {
    params.setParams({ step: newStep, ...additionalParams });
  };

  const updateParam = <K extends keyof Omit<typeof params, 'setParams'>>(key: K, value: (typeof params)[K]) => {
    params.setParams({ [key]: value });
  };

  return { ...params, goToStep, updateParam };
}
