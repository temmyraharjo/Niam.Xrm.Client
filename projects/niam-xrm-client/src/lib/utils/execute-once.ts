export function executeOnce(bodyFn: () => void): () => void
export function executeOnce<T1>(bodyFn: (arg1: T1) => void): (arg1: T1) => void
export function executeOnce<T1, T2>(bodyFn: (arg1: T1, arg2: T2) => void): (arg1: T1, arg2: T2) => void 
export function executeOnce<T1, T2, T3>(bodyFn: (arg1: T1, arg2: T2, arg3: T3) => void): (arg1: T1, arg2: T2, arg3: T3) => void 
export function executeOnce(bodyFn: (...args: any[]) => void): (...args: any[]) => void {
  let executed = false;
  
  return (...args: any[]) => {
    if (!executed) {
      bodyFn(...args);
      executed = true;
    }
  };
}