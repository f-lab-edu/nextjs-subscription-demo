import { ComponentProps, ReactNode, useRef, useState } from 'react';
import { Button } from './ui/Button';

interface SubmitButtonProps extends Omit<ComponentProps<typeof Button>, 'onClick'> {
  children: ReactNode;
  loadingText?: ReactNode;
  onClick: () => Promise<void>;
  type?: 'button' | 'submit';
}

export default function SubmitButton({
  children,
  loadingText = '처리중...',
  onClick,
  disabled = false,
  className,
  type = 'submit',
  ...props
}: SubmitButtonProps) {
  const isExecuting = useRef(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (isExecuting.current) return;

    isExecuting.current = true;
    setIsLoading(true);

    try {
      await onClick();
    } catch (error) {
      throw error;
    } finally {
      isExecuting.current = false;
      setIsLoading(false);
    }
  };

  return (
    <Button type={type} onClick={handleClick} disabled={disabled || isLoading} className={className} {...props}>
      {isLoading ? loadingText : children}
    </Button>
  );
}
