import React from 'react';

import './styles.scss';

export interface CardHeaderProps {
  title: string; // title text
  onBack?: () => void; // onClick callback of back button, will show back button if provided
  onSkip?: () => void; // onClick callback of skip button, will show skip button if provided
}

const CardHeader: React.FC<CardHeaderProps> = ({ title, onBack, onSkip }) => {
  return (
    <div className="card-header">
      <div className="header-side left-side">
        {onBack && (
          <button type="button" className="btn" onClick={onBack}>
            <img src="/imgs/back-arrow-icon.svg" alt="" />
          </button>
        )}
      </div>
      <div className="card-title">{title}</div>
      <div className="header-side right-side">
        {onSkip && (
          <button type="button" className="btn text-link" onClick={onSkip}>
            Skip
          </button>
        )}
      </div>
    </div>
  );
};

export default CardHeader;
