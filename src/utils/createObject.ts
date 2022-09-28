export const createObject = <T = Record<string, unknown>>(
  object: T,
  include: (keyof T)[] | null = null,
  exclude: (keyof T)[] | null = null
) => {
  if (include && exclude) {
    if (include.length === 0 && exclude.length === 0) {
      return object;
    }

    const result: T = {} as T;
    Object.entries(object as object).forEach(([key, value]) => {
      if (
        include.includes(key as keyof T) &&
        !exclude.includes(key as keyof T) &&
        value !== undefined &&
        value !== null
      ) {
        result[key as keyof T] = value;
      }
    });
    return result;
  }
  return object;
};
