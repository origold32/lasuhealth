declare module "react-date-range" {
  import { Component } from "react";

  export interface Range {
    startDate: Date;
    endDate: Date;
    key: string;
  }

  export interface DateRangePickerProps {
    ranges: Range[];
    onChange: (ranges: { [key: string]: Range }) => void;
    showSelectionPreview?: boolean;
    moveRangeOnFirstSelection?: boolean;
    months?: number;
    direction?: "horizontal" | "vertical";
    staticRanges?: object[];
    inputRanges?: object[];
    className?: string;
  }

  export interface DatePickerProps {
    date: Date;
    onChange: (date: Date) => void;
    className?: string;
  }

  export class DateRangePicker extends Component<DateRangePickerProps> {}
  export class DatePicker extends Component<DatePickerProps> {}
}
