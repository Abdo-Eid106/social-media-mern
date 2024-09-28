import { toast } from "react-toastify";

export const catchAsync = <T extends (...args: any[]) => Promise<any>>(
  fn: T
) => {
  return async (...args: Parameters<T>) => {
    try {
      return await fn(...args);
    } catch (err: any) {
      alert("err");
      toast.error(err.message ? err.message : "something went wrong");
    }
  };
};
