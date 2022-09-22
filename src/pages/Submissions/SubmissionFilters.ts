import { SubmissionStatus } from "types";

type StatusOptions = "P" | "B" | "A" | "W" | "T" | "M" | "O" | "R" | "C" | "N";
type OrderOptions =
  | "id"
  | "status"
  | "timestamp"
  | "problem"
  | "-id"
  | "-status"
  | "-timestamp"
  | "-problem";

export interface SubmissionFiltersProps {
  status: StatusOptions | null;
  order: OrderOptions;
  page: number;
}

export class SubmissionFilters {
  values: SubmissionFiltersProps;

  constructor(_v: SubmissionFiltersProps) {
    this.values = _v;
    if (_v.page < 1) this.values.page = 1;
    if (_v.status === ("A" as any)) this.values.status = null;
  }

  static statusOptions = [
    { value: "P", label: "Pending" },
    { value: "B", label: "Running" },
    { value: "A", label: "Accepted" },
    { value: "W", label: "Wrong Answer" },
    { value: "T", label: "Time Limit Exceeded" },
    { value: "M", label: "Memory Limit Exceeded" },
    { value: "O", label: "Output Limit Exceeded" },
    { value: "R", label: "Runtime Error" },
    { value: "C", label: "Compilation Error" },
    { value: "N", label: "Any" },
  ] as {
    value: StatusOptions;
    label: SubmissionStatus | "Any";
  }[];

  static orderOptions = [
    {
      value: "id",
      label: "ID Ascending",
    },
    {
      value: "-id",
      label: "ID Descending",
    },
    {
      value: "status",
      label: "Status Ascending",
    },
    {
      value: "-status",
      label: "Status Descending",
    },
    {
      value: "timestamp",
      label: "Timestamp Ascending",
    },
    {
      value: "-timestamp",
      label: "Timestamp Descending",
    },
    {
      value: "problem",
      label: "Problem Ascending",
    },
    {
      value: "-problem",
      label: "Problem Descending",
    },
  ];

  setDifficulty(status: StatusOptions) {
    if (status === "N") this.values.status = null;
    else this.values.status = status;
  }

  setOrder(order: SubmissionFiltersProps["order"]) {
    this.values.order = order;
  }

  setPage(page: number) {
    if (page < 1) this.values.page = 1;
    else this.values.page = page;
  }

  getFilterString(): string {
    let filterString = `?page=${this.values.page}&`;

    if (this.values.status) {
      filterString += `status=${this.values.status}&`;
    }
    if (this.values.order) {
      filterString += `ordering=${this.values.order}&`;
    }
    return filterString;
  }

  getFilterParams() {
    let filterParams;
    filterParams = {
      page: this.values.page,
    };
    if (this.values.status) {
      filterParams = {
        ...filterParams,
        status: this.values.status,
      };
    }

    if (this.values.order) {
      filterParams = { ...filterParams, ordering: this.values.order };
    }
    return filterParams;
  }
}
