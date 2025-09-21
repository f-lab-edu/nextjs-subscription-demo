import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';

type AllowedParam = string | number | boolean;

type QueryParamConfig<T extends AllowedParam, K extends string = string> = {
  key: K;
  parser: (value: string | string[] | undefined) => T;
  defaultValue: T;
};

type QueryParamValues<T extends readonly QueryParamConfig<AllowedParam, string>[]> = {
  [K in T[number]['key']]: T extends readonly (infer U)[]
    ? U extends QueryParamConfig<infer V, K>
      ? V
      : never
    : never;
};

export function useQueryParams<T extends readonly QueryParamConfig<AllowedParam, string>[]>(configs: T) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const values = useMemo(() => {
    const result: Record<string, AllowedParam> = {};
    configs.forEach(({ key, parser, defaultValue }) => {
      const raw = searchParams.get(key);

      try {
        result[key] = parser(raw || undefined) ?? defaultValue;
      } catch {
        result[key] = defaultValue;
      }
    });

    return result as QueryParamValues<T>;
  }, [searchParams, configs]);

  const setParams = useCallback(
    (updates: Partial<QueryParamValues<T>>) => {
      const current = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([k, v]) => {
        if (v === undefined || v === null || v === '') current.delete(k);
        else current.set(k, String(v));
      });
      router.push(`${pathname}?${current.toString()}`);
    },
    [router, searchParams, pathname],
  );

  return { ...values, setParams } as QueryParamValues<T> & { setParams: typeof setParams };
}
