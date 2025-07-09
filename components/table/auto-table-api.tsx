"use client";
import Table from "@/components/table/Table";
import TableBody from "@/components/table/TableBody";
import TableHead from "@/components/table/TableHead";
import TableHeadCol from "@/components/table/TableHeadCol";
import React from "react";
import TableBodyRow from "@/components/table/TableBodyRow";
import TableBodyCol from "@/components/table/TableBodyCol";
import TablePagination2 from "@/components/table/TablePagination2";
import { useThrottledCallback } from "@mantine/hooks";
import InputSearch from "../input-search";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { getObjectKeyData } from "@/lib/get-object-key-data";
import useTableDataController from "./useTableDataController";
import CurrencyAmount from "../currency-amount";
import { formatDateString } from "@/lib/format-date";

export type TableColProps = {
  name: string;
  type: "text" | "currency" | "date" | "custom";
  render?: (data: any) => React.ReactNode;
  dataKey: string[];
};

export type AutoTableApiProps = {
  cols: TableColProps[];
  apiUrl: string;
  apiDataKey?: string;
};

const AutoTableApi = ({ apiUrl, cols, apiDataKey }: AutoTableApiProps) => {
  // const { data, isLoading, search, onSearchInputChange, updatePage, onNextPage, onPrevPage } = useTableRouteApiSearchPagination(apiUrl, apiListKeyPath);
  // const throttledSetValue = useThrottledCallback((e) => onSearchInputChange(e), 5000);
  const { data, isLoading, onSearch, onNextPage, onPrevPage, page, total } =
    useTableDataController(apiUrl, apiDataKey);
  const throttledSetValue = useThrottledCallback(
    (value) => onSearch(value),
    500
  );

  return (
    <div className=" w-full border rounded-xl">
      <div className="flex items-center justify-between p-3">
        <Select>
          <SelectTrigger className="w-max border-none border-0 py-1 rounded-md h-auto  ">
            <div className="felx items-center gap-2 mr-2 text-nowrap truncate romd">
              Sort by: <SelectValue placeholder="All" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="latest">Latest</SelectItem>
            <SelectItem value="popular">Popular</SelectItem>
          </SelectContent>
        </Select>
        <InputSearch
          className=""
          onChange={(e) => throttledSetValue(e.target.value)}
        />
      </div>
      <Table isLoading={isLoading} isEmpty={data.length == 0}>
        <TableHead>
          {cols.map(({ name }) => {
            return <TableHeadCol key={name}>{name}</TableHeadCol>;
          })}
        </TableHead>
        <TableBody>
          {data.map((item: any, i: number) => {
            return (
              <TableBodyRow key={i}>
                {cols.map((col, i) => {
                  if (col.type == "text") {
                    // return <TableBodyCol key={i}>{item[col.dataKey]}</TableBodyCol>;
                    return (
                      <TableBodyCol key={i}>
                        {getObjectKeyData(item, col.dataKey)}
                      </TableBodyCol>
                    );
                  }
                  if (col.type == "currency") {
                    // return <TableBodyCol key={i}>{item[col.dataKey]}</TableBodyCol>;
                    return (
                      <TableBodyCol key={i}>
                        <CurrencyAmount
                          className=" text-base"
                          curr={getObjectKeyData(item, ["currency"])}
                          amount={getObjectKeyData(item, col.dataKey)}
                        />
                      </TableBodyCol>
                    );
                  }
                  if (col.type == "date") {
                    // return <TableBodyCol key={i}>{item[col.dataKey]}</TableBodyCol>;
                    return (
                      <TableBodyCol key={i}>
                        <div>
                          {formatDateString(
                            getObjectKeyData(item, col.dataKey)
                          )}
                        </div>
                      </TableBodyCol>
                    );
                  }

                  if (col.type == "custom" && col.render) {
                    return (
                      <TableBodyCol key={i}>
                        {col.render(getObjectKeyData(item, col.dataKey))}
                      </TableBodyCol>
                    );
                  }
                })}
              </TableBodyRow>
            );
          })}
        </TableBody>
      </Table>
      <div className=" p-4">
        <TablePagination2
          page={page}
          total={total}
          onNext={onNextPage}
          onPrev={onPrevPage}
        />
      </div>
    </div>
  );
};

export default AutoTableApi;
