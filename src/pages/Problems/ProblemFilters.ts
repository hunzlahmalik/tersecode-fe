import { Difficulty } from "types";

type DifficultyOptions = Difficulty | "A";

export interface ProblemFiltersProps {
  difficulty: Difficulty | null;
  search: string | null;
  order: "difficulty" | "-difficulty" | "title" | "-title" | "id" | "-id";
  page: number;
}

export class ProblemFilters {
  values: ProblemFiltersProps;

  constructor(_v: ProblemFiltersProps) {
    this.values = _v;
    if (_v.page < 1) this.values.page = 1;
    if (_v.difficulty === ("A" as any)) this.values.difficulty = null;
  }

  setDifficulty(difficulty: DifficultyOptions) {
    if (difficulty === "A") this.values.difficulty = null;
    else this.values.difficulty = difficulty;
  }

  setSearch(search: string | null) {
    this.values.search = search;
  }

  setOrder(order: ProblemFiltersProps["order"]) {
    this.values.order = order;
  }

  setPage(page: number) {
    if (page < 1) this.values.page = 1;
    else this.values.page = page;
  }

  getFilterString(): string {
    let filterString = `?page=${this.values.page}&`;

    if (this.values.difficulty) {
      filterString += `difficulty=${this.values.difficulty}&`;
    }
    if (this.values.search) {
      filterString += `search=${this.values.search}&`;
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
    if (this.values.difficulty) {
      filterParams = { ...filterParams, difficulty: this.values.difficulty };
    }
    if (this.values.search) {
      filterParams = { ...filterParams, search: this.values.search };
    }
    if (this.values.order) {
      filterParams = { ...filterParams, ordering: this.values.order };
    }
    return filterParams;
  }
}
