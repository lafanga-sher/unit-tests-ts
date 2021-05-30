import React, { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import CardHeader from '../../components/containers/CardHeader';
import MessageModal from '../../components/containers/MessageModal';
import TextLabelledField from '../../components/form-controls/TextLabelledField';
import useForm from '../../hooks/use-form';
import { setEmail } from '../../store/actions/reset-password';
import { AppState } from '../../store/types';
import { emailAddressValidator } from '../../utils/form-utils';
import './styles.scss';

interface FormValue {
  emailAddress: string;
}

const ForgotPasswordScreen: React.FC = () => {
  const history = useHistory();

  const { form, setValue, setTouched, isFormValid } = useForm<FormValue>(
    {
      emailAddress: '',
    },
    (formValue: FormValue) => ({
      emailAddress: emailAddressValidator(formValue.emailAddress),
    })
  );

  const [showResetInProgressModal, setShowResetInProgressModal] =
    useState<boolean>(false);
  const [minutesLeft, setMinutesLeft] = useState<number>(0);
  const resetDateSelector = useSelector<AppState, Date | undefined>(
    (state) => state.resetPassword.resetDate
  );

  const dispatch = useDispatch();

  /**
   * Send Verification link
   */
  const sendVerificationLink = () => {
    const now = new Date();
    const passedMinutes =
      (now.getTime() - (resetDateSelector?.getTime() || 0)) / 60 / 1000;
    // less than 3 minutes after the last reset link was sent
    if (!!resetDateSelector && passedMinutes < 3) {
      setMinutesLeft(Math.floor(30 - passedMinutes));
      setShowResetInProgressModal(true);
    } else {
      dispatch(setEmail(form.value.emailAddress));
      history.push('/checkEmail');
    }
  };

  return (
    <div className="card forgot-password-screen">
      <CardHeader title="Forgot Password" onBack={() => history.goBack()} />
      <div className="form-content">
        <div className="instruction-text">
          Please enter your registered Email ID below in order to change your
          password.
        </div>
        <TextLabelledField
          name="email"
          label="Email Address"
          value={form.value.emailAddress}
          onChange={(evt: ChangeEvent<HTMLInputElement>) =>
            setValue('emailAddress', evt.target.value)
          }
          onBlur={() => setTouched('emailAddress', true)}
          errorText={form.touched.emailAddress ? form.errors.emailAddress : ''}
        />
        <div className="form-content-footer">
          <button
            type="button"
            className="btn btn-capsule md btn-filled send-button"
            onClick={sendVerificationLink}
            disabled={!isFormValid}
          >
            Send Verification Link
          </button>
        </div>
      </div>
      {/* Reset in progress */}
      <MessageModal
        show={showResetInProgressModal}
        onHide={() => setShowResetInProgressModal(false)}
        type="error"
        title="Password Reset in progress"
        content={
          <>
            We have sent a verification link to{' '}
            <em>{form.value.emailAddress}</em>. The link is valid for another{' '}
            {minutesLeft} minutes. Click on the link to reset password.
          </>
        }
        button="Okay"
        onClickButton={() => setShowResetInProgressModal(false)}
      />
    </div>
  );
};

export default ForgotPasswordScreen;
