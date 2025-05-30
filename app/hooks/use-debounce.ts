import { useCallback, useRef, useEffect } from 'react';

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
