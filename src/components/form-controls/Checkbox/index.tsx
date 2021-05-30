import classNames from 'classnames';
import React, { ChangeEvent } from 'react';

import './styles.scss';

export interface CheckboxProps {
  className?: string;
  label?: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
  className,
  label,
  value,
  onValueChange,
}) => {
  return (
    <div className={classNames('checkbox', className)}>
      <label>
        <input
          type="checkbox"
          className="checkbox-input"
          checked={value}
          onChange={(evt: ChangeEvent<HTMLInputElement>) =>
            onValueChange(evt.target.checked)
          }
        />
        <div className="checkbox-wrapper">
          <svg
            className="checkbox-checker"
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="5 5 14 14"
          >
            <path d="M19,3H5A2,2,0,0,0,3,5V19a2,2,0,0,0,2,2H19a2,2,0,0,0,2-2V5A2,2,0,0,0,19,3ZM10,17,5,12l1.41-1.41L10,14.17l7.59-7.59L19,8Z" />
          </svg>
        </div>
      </label>
      {label && <div className="checkbox-label">{label}</div>}
    </div>
  );
};

export default Checkbox;
