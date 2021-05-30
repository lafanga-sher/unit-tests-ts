import classNames from 'classnames';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './styles.scss';

interface NavigationItem {
  icon: string;
  title: string;
  path: string;
}

/**
 * Navigation items configs
 */
const navigationItems: NavigationItem[] = [
  {
    icon: '/imgs/home-icon.svg',
    title: 'Home',
    path: '/home',
  },
  {
    icon: '/imgs/promotions-icon.svg',
    title: 'Promos & Events',
    path: '',
  },
  {
    icon: '/imgs/branches-icon.svg',
    title: 'Our Branches',
    path: '',
  },
  {
    icon: '/imgs/error-icon.svg',
    title: 'Report Issue',
    path: '',
  },
  {
    icon: '/imgs/login-icon.svg',
    title: 'Login',
    path: '/login',
  },
];

export interface SideBarProps {
  className?: string;
}

const SideBar: React.FC<SideBarProps> = ({ className }) => {
  const [open, setOpen] = useState<boolean>(false);

  // render navigation item
  const renderNavigationItem = (key: number, navItem: NavigationItem) => (
    <Link className="btn navigation-item" key={key} to={navItem.path}>
      <img src={navItem.icon} alt="" />
      {open && <div className="navigation-item-label">{navItem.title}</div>}
    </Link>
  );

  return (
    <div className={classNames('side-bar', { open }, className)}>
      <div className="side-bar-content">
        <button
          type="button"
          className="btn chevron-btn"
          onClick={() => setOpen(!open)}
        >
          <img src="/imgs/chevron-left.svg" alt="" />
        </button>
        {navigationItems.map((item, index) =>
          renderNavigationItem(index, item)
        )}
        {open && (
          <div className="side-bar-content-footer">
            <div className="side-bar-content-footer-row">
              <button
                type="button"
                className="btn side-bar-content-footer-link"
              >
                Terms of use
              </button>

              <div className="side-bar-content-footer-link horizontal-separator">
                |
              </div>
              <button
                type="button"
                className="btn side-bar-content-footer-link"
              >
                Privacy Notice
              </button>
            </div>
            <div className="side-bar-content-footer-row do-not-sell-my-info-row">
              <button
                type="button"
                className="btn side-bar-content-footer-link"
              >
                Do Not Sell my Info
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SideBar;
