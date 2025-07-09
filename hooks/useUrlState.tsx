import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

export function useUrlState<T extends string | number>(
  name: string,
  defaultValue?: T,
  queryStrategy: "normal" | "selfish" = "normal",
  routerStrategy: "replace" | "push" = "push"
): [T, (value: T) => void, () => void] {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const value = searchParams.get(name);

  const setValue = useRef((newValue: T) => {
    if (!newValue) {
      clearValue.current();
    }
    if (queryStrategy == "selfish") {
      const urlString = `${pathname}?${name}=${newValue}`;
      routerStrategy == "push"
        ? router.push(urlString)
        : router.replace(urlString);
    } else {
      const url = new URL(location?.toString());
      url.searchParams.set(name, newValue.toString());
      const urlString = url.toString();
      routerStrategy == "push"
        ? router.push(urlString)
        : router.replace(urlString);
    }
  });

  // const setValue = useCallback(
  //   (newValue: T) => {
  //     if (queryStrategy == "selfish") {
  //       routerStrategy == "push" ? router.push(`${pathname}?${name}=${newValue}`) : router.replace(`${pathname}?${name}=${newValue}`);
  //     } else {
  //       const params = new URLSearchParams(searchParams.toString());
  //       params.set(name, newValue.toString());
  //       routerStrategy == "push" ? router.push(`${pathname}?${params.toString()}`) : router.replace(`${pathname}?${params.toString()}`);
  //     }
  //   },
  //   [name, searchParams, router, pathname, queryStrategy, routerStrategy]
  // );

  const clearValue = useRef(() => {
    const url = new URL(location?.toString());
    url.searchParams.delete(name);
    routerStrategy == "push"
      ? router.push(url.toString())
      : router.replace(url.toString());
  });
  // const clearValue = useCallback(() => {
  //   const params = new URLSearchParams(searchParams.toString());
  //   params.delete(name);
  //   router.push(`${pathname}?${params.toString()}`);
  // }, [name, searchParams, router, pathname]);

  useEffect(() => {
    const queryValue = new URL(location.toString()).searchParams.has(name);
    if (!queryValue && defaultValue) {
      setValue.current(defaultValue);
    }
  }, [defaultValue, name]);

  return [value as T, setValue.current, clearValue.current];
}
