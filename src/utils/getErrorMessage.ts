import { ERROR_CODE } from '@/constants/errorCode';

interface FetchError {
  status?: number;
  code?: string;
  message?: string;
}

export function getErrorMessage(error: unknown): string {
  if (error && typeof error === 'object') {
    const e = error as FetchError;

    if (e.code && ERROR_CODE[e.code]) {
      return ERROR_CODE[e.code];
    }

    if (e.status && ERROR_CODE[e.status]) {
      return ERROR_CODE[e.status];
    }

    if (e.message) {
      return e.message;
    }
  }
  return ERROR_CODE.default;
}
