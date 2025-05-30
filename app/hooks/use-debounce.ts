import { useCallback, useRef, useEffect } from 'react';

  /**
   * Returns a debounced function that delays calling the input function until after the
   * specified delay.
   *
   * The returned function is memoized so that it will not change on re-renders unless the
   * input function changes.
   *
   * The debounced function will be cleaned up on component unmount.
   *
   * @param fn The function to debounce.
   * @param delay The delay in milliseconds to wait before calling the function.
   */
export function useDebounce<F extends (...args: any[]) => any>(
  fn: F,
  delay: number
): (...args: Parameters<F>) => void {
  const timeoutRef = useRef<NodeJS.Timeout>();
  const fnRef = useRef(fn);

  // Update the function if it changes
  useEffect(() => {
    fnRef.current = fn;
  }, [fn]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return useCallback((...args: Parameters<F>) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      fnRef.current(...args);
    }, delay);
  }, [delay]);
}
