import classNames from 'classnames';
import React, { PropsWithChildren, useState } from 'react';

import Tooltip from '../../containers/Tooltip';
import './styles.scss';

export interface LabelledFieldProps {
  className?: string;
  label: string; // the label(also the placeholder)
  hasValue?: boolean; // true if this field has value
  hasFocus?: boolean; // true if this field has focus
  tooltip?: React.ReactNode; // the tooltip content if tooltip is needed
  errorText?: string; // error message to display
  rightElement?: React.ReactNode; // the right element
  renderContentContainer?: (
    containerProps: React.PropsWithChildren<React.HTMLProps<HTMLElement>>
  ) => React.ReactElement; // render the content container
}

const LabelledField: React.FC<PropsWithChildren<LabelledFieldProps>> = ({
  className,
  label,
  hasValue,
  hasFocus,
  tooltip,
  errorText,
  rightElement,
  children,
  renderContentContainer,
}) => {
  const [hovered, setHovered] = useState<boolean>(false);
  const [referenceElement, setReferenceElement] =
    useState<HTMLElement | null>(null);

  const contentChildren = (
    <>
      {children}
      {rightElement && (
        <div className="right-element-container">{rightElement}</div>
      )}
      <div
        className={classNames(
          'text-container',
          (hasValue || hasFocus) && 'text-container-at-label'
        )}
      >
        <div className="text">{label}</div>
        {!!tooltip && (
          <img
            ref={setReferenceElement}
            className="info-icon"
            src="/imgs/info-icon.svg"
            alt=""
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          />
        )}
      </div>
    </>
  );

  const contentContainer = renderContentContainer ? (
    renderContentContainer({ className: 'content', children: contentChildren })
  ) : (
    <div className="content">{contentChildren}</div>
  );

  return (
    <div className={classNames('labelled-field', className)}>
      {contentContainer}
      <div className="error-text">{errorText}</div>
      {hovered && (
        <Tooltip referenceElement={referenceElement} content={tooltip} />
      )}
    </div>
  );
};

export default LabelledField;
