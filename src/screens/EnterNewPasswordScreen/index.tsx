import { CancelTokenSource } from 'axios';
import React, { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import CardHeader from '../../components/containers/CardHeader';
import MessageModal from '../../components/containers/MessageModal';
import PasswordTooltipContent from '../../components/containers/PasswordTooltipContent';
import PasswordLabelledField from '../../components/form-controls/PasswordLabelledField';
import TextLabelledField from '../../components/form-controls/TextLabelledField';
import { useCancelToken } from '../../hooks/use-cancel-token';
import useForm from '../../hooks/use-form';
import { resetPassword } from '../../services/api-service';
import { AppState } from '../../store/types';
import {
  confirmPasswordValidator,
  emailAddressValidator,
  passwordValidator,
} from '../../utils/form-utils';
import './styles.scss';

interface FormValue {
  emailAddress: string;
  password: string;
  confirmPassword: string;
}

const EnterNewPasswordScreen: React.FC = () => {
  const history = useHistory();
  const emailSelector = useSelector<AppState, string>(
    (state) => state.resetPassword.email
  );

  const { form, setValue, setTouched, isFormValid } = useForm<FormValue>(
    {
      emailAddress: emailSelector,
      password: '',
      confirmPassword: '',
    },
    (formValue: FormValue) => ({
      emailAddress: emailAddressValidator(formValue.emailAddress),
      password: passwordValidator(formValue.password),
      confirmPassword: confirmPasswordValidator(
        formValue.password,
        formValue.confirmPassword
      ),
    })
  );

  const [showResetSuccessModal, setShowResetSuccessModal] =
    useState<boolean>(false);
  const [showPasswordPreviouslyUsedModal, setShowPasswordPreviouslyUsedModal] =
    useState<boolean>(false);

  const resetCancelToken = useRef<CancelTokenSource>();
  useCancelToken(resetCancelToken);

  /**
   * Form submit event handler
   * @param evt form event
   */
  const onSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    // mock
    resetCancelToken.current?.cancel();
    const { promise, cancelToken } = resetPassword(
      form.value.emailAddress,
      form.value.password
    );
    resetCancelToken.current = cancelToken;
    promise
      .then(() => {
        if (form.value.password === '123456@A') {
          setShowPasswordPreviouslyUsedModal(true);
        } else {
          setShowResetSuccessModal(true);
        }
      })
      .finally(() => {
        resetCancelToken.current = undefined;
      });
  };

  /**
   * Proceed to login
   */
  const proceedToLogin = () => {
    setShowResetSuccessModal(false);
    history.push('/login');
  };

  return (
    <div className="card enter-new-password-screen">
      <CardHeader title="Enter New Password" />
      <form className="form-content" onSubmit={onSubmit}>
        <div className="instruction-text">
          Please ensure your password follows our security requirements.
        </div>
        <TextLabelledField
          name="email"
          autoComplete="username"
          label="Email Address"
          value={form.value.emailAddress}
          disabled
        />
        <PasswordLabelledField
          className="password-field"
          name="newPassword"
          autoComplete="new-password"
          label="New Password"
          tooltip={<PasswordTooltipContent />}
          value={form.value.password}
          onChange={(evt: ChangeEvent<HTMLInputElement>) =>
            setValue('password', evt.target.value)
          }
          onBlur={() => setTouched('password', true)}
          errorText={form.touched.password ? form.errors.password : ''}
        />
        <PasswordLabelledField
          className="password-field"
          name="confirmNewPassword"
          autoComplete="new-password"
          label="Confirm New Password"
          tooltip={<PasswordTooltipContent />}
          value={form.value.confirmPassword}
          onChange={(evt: ChangeEvent<HTMLInputElement>) =>
            setValue('confirmPassword', evt.target.value)
          }
          onBlur={() => setTouched('confirmPassword', true)}
          errorText={
            form.touched.confirmPassword ? form.errors.confirmPassword : ''
          }
        />
        <div className="form-content-footer">
          <button
            type="submit"
            className="btn btn-capsule md btn-filled reset-button"
            disabled={!isFormValid}
          >
            Reset Password
          </button>
        </div>
      </form>
      {/* Reset success */}
      <MessageModal
        show={showResetSuccessModal}
        onHide={() => setShowResetSuccessModal(false)}
        type="success"
        title="Password reset successful!"
        content="Your password has been reset successfully. Please login again with your new credentials."
        button="Proceed to Login"
        onClickButton={proceedToLogin}
      />
      {/* Password Previously used */}
      <MessageModal
        show={showPasswordPreviouslyUsedModal}
        onHide={() => setShowPasswordPreviouslyUsedModal(false)}
        type="error"
        title="Password previously used"
        content="It seems like you have entered an old password. Your new password cannot be the same as your last three passwords. Please try again."
        button="Retry"
        onClickButton={() => setShowPasswordPreviouslyUsedModal(false)}
      />
    </div>
  );
};

export default EnterNewPasswordScreen;
