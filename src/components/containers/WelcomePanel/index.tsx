import classNames from 'classnames';
import React, { useState } from 'react';

import { groups, appSettings } from '../../../config';
import './styles.scss';

export interface WelcomePanelProps {
  className?: string;
}

interface WelcomeItem {
  img: string; // URL of the item image
  title: string; // title of the item
  description: string; // description of the item
}

const WelcomePanel: React.FC<WelcomePanelProps> = ({ className }) => {
  const [welcomeItems] = useState<WelcomeItem[]>([
    {
      img: '/imgs/illustration-deliveries.svg',
      title: 'Track your Deliveries',
      description: 'Get an overview of your deliveries in real-time.',
    },
    {
      img: '/imgs/illustration-bills.svg',
      title: 'Access your Bills',
      description: 'Get instant access to invoices & monthly statements.',
    },
    {
      img: '/imgs/illustration-promos.svg',
      title: 'View Promotions & Events',
      description: 'Stay updated on promotions & special offers.',
    },
  ]);

  return (
    <div className={classNames('welcome-panel', className)}>
      <div className="welcome-header">
        <div className="welcome-title">
          {groups[appSettings.activeGroupId].welcomeText}
        </div>
        <div className="welcome-subtitle">
          Keep your jobs moving even when you’re not on site.
        </div>
      </div>
      <div className="welcome-content">
        {welcomeItems.map((item, index) => (
          <div key={index} className="welcome-item">
            <img src={item.img} alt="" />
            <div className="welcome-item-content">
              <div className="welcome-item-title">{item.title}</div>
              <div className="welcome-item-description">{item.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WelcomePanel;
