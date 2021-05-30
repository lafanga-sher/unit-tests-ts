import React, { useEffect } from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';

import SideBar from '../../components/containers/SideBar';
import WelcomePanel from '../../components/containers/WelcomePanel';
import { appSettings, groups } from '../../config';
import CheckEmailScreen from '../CheckEmailScreen';
import EnterNewPasswordScreen from '../EnterNewPasswordScreen';
import ForgotPasswordScreen from '../ForgotPasswordScreen';
import HomeScreen from '../HomeScreen';
import LoginScreen from '../LoginScreen';
import RegisterScreen from '../RegisterScreen';
import './styles.scss';

const MainScreen: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  /** footer Copy right element */
  const copyrightElement = (
    <div className="footer-text">
      © 2020 US LBM Holdings, LLC. All rights reserved.
    </div>
  );

  /**
   * footer Terms of use element
   */
  const termsElement = (
    <div className="footer-text">
      <a className="footer-text" href="/">
        Terms of Use
      </a>
      <span className="divider">|</span>
      <a className="footer-text" href="/">
        Privacy Notice
      </a>
      <span className="divider">|</span>
      <a className="footer-text" href="/">
        Do Not Sell My Info
      </a>
    </div>
  );

  const hasWelcome = [
    '/register',
    '/login',
    '/forgotPassword',
    '/checkEmail',
  ].includes(pathname);

  return (
    <div className="main-screen">
      <SideBar className="main-side-bar" />
      <div className="main-content-container">
        <div className="main-top-bar">
          <a
            className="btn text-link"
            href={groups[appSettings.activeGroupId].returnLink}
          >
            {groups[appSettings.activeGroupId].returnLabel}
          </a>
        </div>
        <main className="main-content">
          {hasWelcome && <WelcomePanel className="main-welcome-panel" />}
          <div className="main-content-panel">
            <Switch>
              <Route path="/login" component={LoginScreen} />
              <Route path="/register" component={RegisterScreen} />
              <Route path="/forgotPassword" component={ForgotPasswordScreen} />
              <Route path="/checkEmail" component={CheckEmailScreen} />
              <Route
                path="/enterNewPassword"
                component={EnterNewPasswordScreen}
              />
              <Route path="/home" component={HomeScreen} />
              <Route path="/" exact>
                <Redirect to="/login" />
              </Route>
            </Switch>
          </div>
        </main>
        <footer className="footer">
          <div className="footer-content">
            {copyrightElement}
            {termsElement}
          </div>
        </footer>
      </div>
    </div>
  );
};

export default MainScreen;
