import { CancelTokenSource } from 'axios';
import React, { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import CardHeader from '../../components/containers/CardHeader';
import MessageModal from '../../components/containers/MessageModal';
import Checkbox from '../../components/form-controls/Checkbox';
import PasswordLabelledField from '../../components/form-controls/PasswordLabelledField';
import TextLabelledField from '../../components/form-controls/TextLabelledField';
import { useCancelToken } from '../../hooks/use-cancel-token';
import useForm from '../../hooks/use-form';
import { login } from '../../services/api-service';
import {
  emailAddressValidator,
  passwordValidator,
} from '../../utils/form-utils';
import './styles.scss';

const MOCK_LOGIN_CORRECT_EMAIL = 'trial123@uslbm.com';
const MOCK_LOGIN_ERROR_EMAIL = 'error@email.com';
const MOCK_LOGIN_INACTIVE_EMAIL = 'inactive@email.com';

interface FormValue {
  email: string;
  password: string;
  remember: boolean;
}

const LoginScreen: React.FC = () => {
  const history = useHistory();

  const { form, setValue, setTouched, isFormValid } = useForm<FormValue>(
    {
      email: '',
      password: '',
      remember: false,
    },
    (formValue) => ({
      email: emailAddressValidator(formValue.email),
      password: passwordValidator(formValue.password),
    })
  );

  const loginRequestToken = useRef<CancelTokenSource>();
  useCancelToken(loginRequestToken);

  const [showIncorrectLoginModal, setShowIncorrectLoginModal] =
    useState<boolean>(false);
  const [showErrorOccurModal, setShowErrorOccurModal] =
    useState<boolean>(false);
  const [showEmailInactiveModal, setShowEmailInactiveModal] =
    useState<boolean>(false);
  const [showAvoidLockedOutModal, setShowAvoidLockedOutModal] =
    useState<boolean>(false);
  const [showLockedModal, setShowLockedModal] = useState<boolean>(false);
  const [attempts, setAttempts] = useState(0);

  /**
   * Handle click login
   */
  const onSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    loginRequestToken.current?.cancel();
    const result = login(form.value.email, form.value.password);
    loginRequestToken.current = result.cancelToken;
    result.promise
      .then(() => {
        handleLogin();
      })
      .finally(() => {
        loginRequestToken.current = undefined;
      });
  };

  /**
   * try to login with the form values
   */
  const handleLogin = () => {
    switch (form.value.email) {
      case MOCK_LOGIN_CORRECT_EMAIL: {
        setAttempts(0);
        history.push('/home');
        break;
      }
      case MOCK_LOGIN_INACTIVE_EMAIL: {
        setAttempts(0);
        setShowEmailInactiveModal(true);
        break;
      }
      case MOCK_LOGIN_ERROR_EMAIL: {
        setAttempts(attempts + 1);
        setShowErrorOccurModal(true);
        break;
      }
      default: {
        const usedAttempts = attempts + 1;
        if (usedAttempts >= 5) {
          setShowLockedModal(true);
        } else if (usedAttempts >= 3) {
          setShowAvoidLockedOutModal(true);
        } else {
          setShowIncorrectLoginModal(true);
        }
        setAttempts(usedAttempts);
      }
    }
  };

  /**
   * Goto forgot password screen
   */
  const gotoResetPassword = () => {
    setShowAvoidLockedOutModal(false);
    history.push('/forgotPassword');
  };

  return (
    <div className="card login-screen">
      <CardHeader title="Login" onSkip={() => history.push('/home')} />
      <form className="form-content" onSubmit={onSubmit}>
        <TextLabelledField
          label="Email Address"
          name="emailAddress"
          autoComplete="username"
          errorText={form.touched.email ? form.errors.email : ''}
          value={form.value.email}
          onChange={(evt: ChangeEvent<HTMLInputElement>) =>
            setValue('email', evt.target.value)
          }
          onBlur={() => setTouched('email', true)}
        />
        <PasswordLabelledField
          className="password-field"
          label="Password"
          name="password"
          autoComplete="current-password"
          value={form.value.password}
          errorText={form.touched.password ? form.errors.password : ''}
          onChange={(evt: ChangeEvent<HTMLInputElement>) =>
            setValue('password', evt.target.value)
          }
          onBlur={() => setTouched('password', true)}
        />
        <Checkbox
          className="remember-me"
          label="Remember me"
          value={form.value.remember}
          onValueChange={(value) => setValue('remember', value)}
        />
        <button
          type="submit"
          className="btn btn-capsule md btn-filled login-button"
          disabled={!isFormValid}
        >
          Login
        </button>
        <div className="links-container">
          <Link className="btn text-link" to="/forgotPassword">
            Forgot Password?
          </Link>
          <div className="link-separator">|</div>
          <button type="button" className="btn text-link">
            Terms &amp; Conditions
          </button>
        </div>
        <div className="footer-container">
          <div className="new-to-the-app">
            <img src="/imgs/new-icon.svg" alt="" />
            New to the App?
          </div>
          <Link
            className="btn btn-capsule btn-outlined sm register-button"
            to="/register"
          >
            Register now
          </Link>
        </div>
      </form>
      {/* Incorrect Login Details Modal */}
      <MessageModal
        show={showIncorrectLoginModal}
        onHide={() => setShowIncorrectLoginModal(false)}
        type="error"
        title="Incorrect login details"
        button="Retry"
        onClickButton={() => setShowIncorrectLoginModal(false)}
        content={
          <>
            The email or password entered is incorrect. Having trouble
            remembering your password?
            <br />
            <br />
            Please click on{' '}
            <Link
              className="text-link"
              to="/forgotPassword"
              onClick={() => setShowIncorrectLoginModal(false)}
            >
              Forgot Password
            </Link>{' '}
            link.
          </>
        }
      />
      {/* Error Occured modal */}
      <MessageModal
        show={showErrorOccurModal}
        onHide={() => setShowErrorOccurModal(false)}
        type="error"
        title="Uh-oh! Error occurred"
        button="Report Issue"
        onClickButton={() => setShowErrorOccurModal(false)}
        content={
          <>
            There was an issue while logging in. Contact your sales
            representative for further assistance.
          </>
        }
      />
      {/* Email is inactive modal */}
      <MessageModal
        show={showEmailInactiveModal}
        onHide={() => setShowEmailInactiveModal(false)}
        type="error"
        title="Uh-oh! Your email address is inactive."
        button="Okay"
        onClickButton={() => setShowEmailInactiveModal(false)}
        content={
          <>Please contact your sales representative for further assistance.</>
        }
      />
      {/* Avoid email locked out modal */}
      <MessageModal
        show={showAvoidLockedOutModal}
        onHide={() => setShowAvoidLockedOutModal(false)}
        type="error"
        title="Incorrect login details"
        button="Reset Password"
        onClickButton={gotoResetPassword}
        content={
          <>
            You have entered the incorrect email or password{' '}
            <em>{attempts} times</em>. Please reset your password to avoid being
            locked out.
          </>
        }
      />
      {/* Locked out modal */}
      <MessageModal
        show={showLockedModal}
        onHide={() => setShowLockedModal(false)}
        type="error"
        title="Multiple incorrect attempts"
        button="Okay"
        onClickButton={() => setShowLockedModal(false)}
        content={
          <>
            For security purposes, your account has been temporarily locked.
            Please try again in <em>24 hrs</em>.
          </>
        }
      />
    </div>
  );
};

export default LoginScreen;
