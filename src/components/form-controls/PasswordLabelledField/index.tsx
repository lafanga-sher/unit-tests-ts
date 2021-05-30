import React, { useState } from 'react';

import TextLabelledField, {
  TextLabelledFieldProps,
} from '../TextLabelledField';
import './styles.scss';

export type PasswordLabelledFieldProps = TextLabelledFieldProps;

const PasswordLabelledField: React.FC<PasswordLabelledFieldProps> = ({
  ...textLabelledFieldProps
}) => {
  const [visible, setVisible] = useState<boolean>(false);

  /**
   * Toggle password visibility
   */
  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <TextLabelledField
      {...textLabelledFieldProps}
      type={visible ? 'text' : 'password'}
      rightElement={
        <button type="button" className="btn" onClick={toggleVisibility}>
          <img
            src={
              visible
                ? '/imgs/visibility-on-icon.svg'
                : '/imgs/visibility-off-icon.svg'
            }
            alt=""
          />
        </button>
      }
    />
  );
};

export default PasswordLabelledField;
