import classNames from 'classnames';
import React, { HTMLProps, useState } from 'react';
import InputMask from 'react-input-mask';

import LabelledField, { LabelledFieldProps } from '../LabelledField';
import './styles.scss';

export type TextLabelledFieldProps = LabelledFieldProps &
  React.HTMLProps<HTMLInputElement> & {
    mask?: string;
  };

const TextLabelledField: React.FC<TextLabelledFieldProps> = ({
  className,
  label,
  tooltip,
  errorText,
  rightElement,
  mask,
  ...inputProps
}) => {
  const [inputHasFocus, setInputHasFocus] = useState<boolean>(false);

  // determine to use InputMask or just input
  const inputNode = mask ? (
    React.createElement(
      InputMask,
      {
        mask,
        maskChar: '',
      },
      (maskInputProps: HTMLProps<HTMLInputElement>) => (
        <input {...maskInputProps} />
      )
    )
  ) : (
    <input />
  );

  /**
   * On focus wrapper
   */
  const onFocusWrapper = (evt: React.FocusEvent<HTMLInputElement>) => {
    setInputHasFocus(true);
    if (inputProps.onFocus) {
      inputProps.onFocus(evt);
    }
  };

  /**
   * input element onblur listener
   * @param evt focus event
   */
  const onBlurWrapper = (evt: React.FocusEvent<HTMLInputElement>) => {
    setInputHasFocus(false);
    if (inputProps.onBlur) {
      inputProps.onBlur(evt);
    }
  };

  return (
    <LabelledField
      className={classNames('text-labelled-field', className)}
      label={label}
      tooltip={tooltip}
      errorText={errorText}
      rightElement={rightElement}
      hasFocus={inputHasFocus}
      hasValue={!!inputProps.value}
    >
      {React.cloneElement(inputNode, {
        ...inputProps,
        className: 'content-element text-input',
        onFocus: onFocusWrapper,
        onBlur: onBlurWrapper,
      })}
    </LabelledField>
  );
};

export default TextLabelledField;
