"use client";
import { useCallback, useEffect } from "react";
import useUrlQueryParams from "./useUpdateQuerySearchParams";

type SetQueryParamState = (value: string | number) => void;

export default function useUrlQueryState<T extends string | number>(
  paraName: string,
  defaultValue?: T,
  push?: boolean
): [T, SetQueryParamState] {
  const { setQueryParam, getQueryParam } = useUrlQueryParams();
  const queryParam = getQueryParam(paraName) as T;
  // console.log("qiery aparam", getQueryParam(paraName), paraName);

  const setQueryParamState = useCallback(
    (value: string | number) => {
      console.log("setting active tab...", value, paraName);
      setQueryParam(paraName, value);
    },
    [paraName, setQueryParam]
  );

  useEffect(() => {
    // console.log("in search query state change", paraName, defaultValue);
    if (
      (defaultValue !== undefined || defaultValue !== null) &&
      (queryParam === undefined || queryParam === null)
    ) {
      setQueryParam(paraName, `${defaultValue}`, push);
    }
  }, [defaultValue, paraName, push, queryParam, setQueryParam]);

  return [queryParam ?? defaultValue, setQueryParamState];
}
