'use client';

import { PropsWithChildren, ReactElement, useState } from 'react';

interface StepProps<T> extends PropsWithChildren {
  name: T;
}

interface FunnelProps<T> {
  children: ReactElement<StepProps<T>>[];
}

export function useFunnel<T>(initialStep: T) {
  const [step, setStep] = useState<T>(initialStep);

  const Step = ({ children }: StepProps<T>) => {
    return children;
  };

  const Funnel = ({ children }: FunnelProps<T>) => {
    const targetStep = children.find((childStep) => childStep.props.name === step);
    return targetStep || null;
  };

  Funnel.Step = Step;

  return [Funnel, setStep] as const;
}
