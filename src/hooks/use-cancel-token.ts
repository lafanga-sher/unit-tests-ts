import { CancelTokenSource } from 'axios';
import { MutableRefObject, useEffect } from 'react';

/**
 * Handy hook to cancel request when component unmounts
 * @param cancelTokenRef Ref object of the cancelToken
 */
export const useCancelToken = (
  cancelTokenRef: MutableRefObject<CancelTokenSource | undefined>
) => {
  useEffect(() => {
    return () => {
      if (cancelTokenRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        cancelTokenRef.current.cancel();
      }
    };
  }, [cancelTokenRef]);
};
