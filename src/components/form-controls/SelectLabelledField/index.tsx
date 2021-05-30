import classNames from 'classnames';
import React, { ChangeEvent, memo, useState } from 'react';
import { usePopper } from 'react-popper';

import { useClickOutside } from '../../../hooks/use-click-outside';
import LabelledField, { LabelledFieldProps } from '../LabelledField';
import './styles.scss';

export interface SelectOption {
  label: string; // the text to display as the option
  value: string; // the actual value of the option
}

export interface SelectLabelledFieldProps extends LabelledFieldProps {
  value: string;
  onValueChange: (value: string) => void;
  options: SelectOption[];
}

const SelectLabelledField: React.FC<SelectLabelledFieldProps> = ({
  value,
  onValueChange,
  options,
  ...labelledFieldProps
}) => {
  const [contentRef, setContentRef] = useState<HTMLElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
  const { styles, attributes } = usePopper(contentRef, popperElement, {
    modifiers: [
      {
        name: 'flip',
        options: {
          fallbackPlacements: ['top'],
        },
      },
    ],
    placement: 'bottom',
  });
  const [open, setOpen] = useState<boolean>(false);
  useClickOutside(
    [contentRef, popperElement].filter((ref) => !!ref).map((ref) => ref!),
    () => {
      if (open) {
        setOpen(false);
      }
    }
  );
  const [searchText, setSearchText] = useState<string>('');

  /**
   * Select an option
   * @param opt selected option
   */
  const selectOption = (opt: string) => {
    onValueChange(opt);
    setOpen(false);
  };

  /**
   * toggle the options dropdown
   */
  const toggleDropdown = () => {
    setSearchText('');
    setOpen(!open);
  };

  /**
   * Render option text element
   * @param opt option
   * @returns Text element
   */
  const renderOptionText = (opt: SelectOption) => {
    if (searchText) {
      const index = opt.label.toLowerCase().indexOf(searchText.toLowerCase());
      return (
        <div className="option">
          {opt.label.substr(0, index)}
          <em>{opt.label.substr(index, searchText.length)}</em>
          {opt.label.substr(index + searchText.length)}
        </div>
      );
    } else {
      return <div className="option">{opt.label}</div>;
    }
  };

  // filter the options by the search text
  let filterOptions: SelectOption[] = [];
  if (open) {
    if (searchText) {
      filterOptions = options.filter((opt) =>
        opt.label.toLowerCase().includes(searchText.toLowerCase())
      );
    } else {
      filterOptions = options;
    }
  }

  // find the selected option
  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <LabelledField
      className="select-labelled-field"
      renderContentContainer={(containerProps) => (
        <>
          {/* the button as dropdown toggle */}
          <button
            {...containerProps}
            type="button"
            className={classNames(
              containerProps.className,
              'btn select-toggle'
            )}
            ref={setContentRef}
            onClick={toggleDropdown}
          />
          {/* the dropdown */}
          {open && (
            <div
              ref={setPopperElement}
              className="dropdown"
              style={styles.popper}
              {...attributes.popper}
            >
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchText}
                  onChange={(evt: ChangeEvent<HTMLInputElement>) =>
                    setSearchText(evt.target.value)
                  }
                />
                <img src="/imgs/search-icon.svg" alt="" />
              </div>
              <ul className="options-scroll-container">
                {filterOptions.map((opt, index) => (
                  <React.Fragment key={index}>
                    {index > 0 && <div className="option-divider" />}
                    <li>
                      <button
                        type="button"
                        className="btn option-item"
                        onClick={() => selectOption(opt.value)}
                      >
                        {renderOptionText(opt)}
                      </button>
                    </li>
                  </React.Fragment>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
      rightElement={<img src="/imgs/chevron-down-icon.svg" alt="" />}
      hasValue={!!value}
      {...labelledFieldProps}
    >
      <div className="content-element">
        {selectedOption ? selectedOption.label : ''}
      </div>
    </LabelledField>
  );
};

export default memo(SelectLabelledField);
