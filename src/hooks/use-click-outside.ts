import { useEffect } from 'react';

/**
 * Hook use to detect if user clicks outside of the containers
 * @param containers the containers to detect click outside
 * @param callback callback function when user clicks outside of these containers
 */
export const useClickOutside = (
  containers: HTMLElement[],
  callback: () => void
) => {
  useEffect(() => {
    const listener = (evt: MouseEvent) => {
      const target = evt.target as HTMLElement;
      for (const container of containers) {
        if (container.contains(target)) {
          return;
        }
      }
      callback();
    };
    document.addEventListener('click', listener);
    return () => {
      document.removeEventListener('click', listener);
    };
  }, [containers, callback]);
};
