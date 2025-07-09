"use client";

import React, { act, ReactNode, useId, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion as m } from "framer-motion";
import { cn } from "@/lib/utils";
import { useUrlState } from "@/hooks/useUrlState";

type TabsProps = {
  tabs: TabItem[];
  defaultValue?: string;
  queryName?: string;
  leftContent?: ReactNode;
  rightContent?: ReactNode;
  onChange?: (value: string) => void;
};
export type TabItem = {
  value: string;
  valueDisplay?: ReactNode;
  content: ReactNode;
};

const TabsPill = ({
  tabs,
  defaultValue = tabs[0].value,
  leftContent,
  rightContent,
  onChange = () => {},
}: TabsProps) => {
  const [activeTab, setActiveTab] = useState<string>();
  const id = useId();

  React.useEffect(() => {
    setActiveTab(defaultValue ?? "");
  }, [defaultValue]);
  return (
    <Tabs
      value={activeTab}
      onValueChange={(value) => {
        setActiveTab(value);
        onChange(value);
      }}
      defaultValue={defaultValue}
      className="w-[400px]"
    >
      <div className="flex items-center flex-wrap gap-4 ">
        {leftContent ? leftContent : null}
        <TabsList>
          {tabs.map((tab, i) => {
            return (
              <TabsTrigger
                key={i}
                className="relative !bg-transparent"
                value={tab.value}
              >
                {activeTab == tab.value ? (
                  <m.div
                    layoutDependency={""}
                    layoutId={id}
                    className=" bg-background absolute inset-0 rounded z-0"
                  ></m.div>
                ) : null}
                <span className="relative z-10">
                  {tab.valueDisplay ?? tab.value}
                </span>
              </TabsTrigger>
            );
          })}
        </TabsList>
        {rightContent ? rightContent : null}
      </div>
      {tabs.map(({ content, value }, i) => {
        return (
          <TabsContent key={i} value={value}>
            {content}
          </TabsContent>
        );
      })}
    </Tabs>
  );
};

export default TabsPill;

export const TabsPillURL = ({
  tabs,
  defaultValue = tabs[0].value,
  queryName = "tab",
  leftContent,
  rightContent,
  onChange = () => {},
}: TabsProps) => {
  const [activeTab, setActiveTab] = useUrlState<string>(
    queryName,
    defaultValue,
    "selfish"
  );
  const id = useId();

  return (
    <Tabs
      value={activeTab}
      onValueChange={(value) => {
        setActiveTab(value);
        onChange(value);
      }}
      defaultValue={defaultValue}
      className="w-full"
    >
      <div className="flex items-center flex-wrap gap-4 mb-10 ">
        {leftContent ? leftContent : null}
        <TabsList className=" bg-transparent gap-4 overflow-auto justify-normal ">
          {tabs.map((tab, i) => {
            return (
              <TabsTrigger
                key={i}
                className="relative !bg-[#FAFCFF] rounded-full"
                value={tab.value}
              >
                {activeTab == tab.value ? (
                  <m.div
                    layoutDependency={""}
                    layoutId={id}
                    className=" bg-[#242424] absolute inset-0 rounded-full z-10"
                  ></m.div>
                ) : null}
                <span
                  className={cn(
                    "relative z-20 transition-colors delay-200",
                    activeTab == tab.value ? " text-white" : "text-[#777E90]"
                  )}
                >
                  {tab.valueDisplay ?? tab.value}
                </span>
              </TabsTrigger>
            );
          })}
        </TabsList>
        {rightContent ? rightContent : null}
      </div>
      {tabs.map(({ content, value }, i) => {
        return (
          <TabsContent key={i} value={value}>
            {content}
          </TabsContent>
        );
      })}
    </Tabs>
  );
};
