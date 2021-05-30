import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

import CardHeader from '../../components/containers/CardHeader';
import { AppState } from '../../store/types';
import './styles.scss';

const CheckEmailScreen: React.FC = () => {
  const history = useHistory();
  const emailSelector = useSelector<AppState, string>(
    (state) => state.resetPassword.email
  );

  return (
    <div className="card check-email-screen">
      <CardHeader title="Please check Email" onBack={() => history.goBack()} />
      <div className="form-content">
        <div className="instruction-text">
          <p>
            We have sent a verification link to <em>{emailSelector}</em>. Please
            click on that link to reset your password. It is valid only for 30
            minutes.
          </p>
          <p>
            Didn’t receive an email?&nbsp;
            <Link className="btn text-link" to="/enterNewPassword">
              Send again
            </Link>
          </p>
        </div>
        <div className="form-content-footer">
          <Link
            className="btn btn-capsule md btn-filled login-button"
            to="/login"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CheckEmailScreen;
