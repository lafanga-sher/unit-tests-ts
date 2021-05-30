import React from 'react';

import './styles.scss';

const PasswordTooltipContent: React.FC = () => {
  return (
    <div className="password-tooltip-content">
      <div className="tooltip-title">Password Security Requirements</div>
      <p>Please create a password that contains:</p>
      <p>
        &nbsp;&nbsp;• 8-15 characters
        <br />
        &nbsp;&nbsp;• At least one special character
        <br />
        &nbsp;&nbsp;• At least one capital letter
        <br />
        &nbsp;&nbsp;• At least a number.
      </p>
    </div>
  );
};

export default PasswordTooltipContent;
