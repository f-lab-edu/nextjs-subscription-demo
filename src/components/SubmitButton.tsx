import { ReactNode, useRef, useState } from 'react';
import { Button } from './ui/Button';

interface SubmitButtonProps {
  children: ReactNode;
  loadingText?: ReactNode;
  onClick: () => Promise<void>;
  disabled?: boolean;
  className?: string;
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
