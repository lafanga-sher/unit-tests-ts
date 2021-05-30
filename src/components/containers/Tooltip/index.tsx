import React, { useEffect, useState } from 'react';
import { usePopper } from 'react-popper';

import './styles.scss';

export interface TooltipProps {
  referenceElement: HTMLElement | null;
  content: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ referenceElement, content }) => {
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
  const [arrowElement, setArrowElement] = useState<HTMLElement | null>(null);
  const { styles, attributes, forceUpdate } = usePopper(
    referenceElement,
    popperElement,
    {
      modifiers: [
        {
          name: 'arrow',
          options: { element: arrowElement },
        },
        {
          name: 'flip',
          options: {
            fallbackPlacements: ['top-end', 'bottom-start', 'bottom-end'],
          },
        },
        {
          name: 'offset',
          options: {
            offset: [-32, 18],
          },
        },
      ],
      placement: 'top-start',
    }
  );

  useEffect(() => {
    const updater = () => {
      if (forceUpdate) {
        forceUpdate();
      }
    };
    let updateHandle: number;
    if (forceUpdate) {
      updateHandle = window.setInterval(updater);
    }
    return () => {
      if (updateHandle !== undefined) {
        clearInterval(updateHandle);
      }
    };
  }, [forceUpdate]);

  return (
    <div
      ref={setPopperElement}
      className="tooltip"
      style={styles.popper}
      {...attributes.popper}
    >
      <div className="tooltip-content">{content}</div>
      <div
        ref={setArrowElement}
        className="tooltip-arrow"
        style={styles.arrow}
      />
    </div>
  );
};

export default Tooltip;
