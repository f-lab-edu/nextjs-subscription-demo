'use client';

import { PropsWithChildren, ReactElement } from 'react';

interface StepProps<T> extends PropsWithChildren {
  name: T;
}

interface FunnelProps<T> {
  children: ReactElement<StepProps<T>>[];
}

export function useFunnel<T>(currentStep: T) {
  const Step = ({ children }: StepProps<T>) => {
    return children;
  };

  const Funnel = ({ children }: FunnelProps<T>) => {
    const targetStep = children.find((childStep) => childStep.props.name === currentStep);
    return targetStep || null;
  };

  Funnel.Step = Step;

  return Funnel;
}
