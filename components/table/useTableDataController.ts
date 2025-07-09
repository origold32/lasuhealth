import { useUrlState } from "@/hooks/useUrlState";
import { getObjectKeyData } from "@/lib/get-object-key-data";
import { fetcher } from "@/swr";
import useSWR from "swr";

export default function useTableDataController(url: string, apiDataKey: string = "data") {
  const [page, setPage] = useUrlState<number>("page");
  const [search, setSearch] = useUrlState<string>("search");

  const { data: apiData, isLoading } = useSWR(url, fetcher);

  const data = apiData?.data[apiDataKey] ?? [];
  const total: number = apiData?.data?.meta?.total ?? 1;

  const onNextPage = () => {
    let currPage = page ?? 1;
    setPage(Math.min(total, +currPage + 1));
  };
  const onPrevPage = () => {
    let currPage = page ?? 1;
    setPage(Math.max(1, +currPage - 1));
  };

  const onSearch = (value: string) => {
    setSearch(value);
  };

  return { data, page: page || 1, search, total, isLoading, onNextPage, onPrevPage, onSearch };
}
