import { AnyAction, createAsyncThunk } from "@reduxjs/toolkit";
import { toast, ToastPromiseParams } from "react-toastify";
import { useAppDispatch } from "state";

type ArgumentTypes<F extends CallableFunction> = F extends (
  ...args: infer A
) => any
  ? A[0]
  : never;

export const withToast = <T = AnyAction | typeof createAsyncThunk>(
  action: T,
  { pending, error, success }: ToastPromiseParams<T>
) => {
  return (
    dispatch: ReturnType<typeof useAppDispatch>,
    actionParams?: ArgumentTypes<T & CallableFunction> | void
  ) => {
    const promise = dispatch(
      (action as CallableFunction)(actionParams as any)
    ).unwrap();
    toast.promise(promise, {
      pending,
      error,
      success,
    });
    return promise;
  };
};

// 1
// (thunkAction: ThunkAction<unknown, EmptyObject & { user: UserState; } & PersistPartial, undefined, AnyAction>)
// 2
// (action: AnyAction)
// 3
// (action: AnyAction | ThunkAction<unknown, EmptyObject & { user: UserState; } & PersistPartial, undefined, AnyAction>)
// 4
// AnyAction | ThunkAction<unknown, EmptyObject & { user: UserState; } & PersistPartial, undefined, AnyAction>
