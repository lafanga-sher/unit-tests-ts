import { CancelTokenSource } from 'axios';
import { isEqual } from 'lodash';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';

import CardHeader from '../../components/containers/CardHeader';
import MessageModal from '../../components/containers/MessageModal';
import PasswordTooltipContent from '../../components/containers/PasswordTooltipContent';
import Checkbox from '../../components/form-controls/Checkbox';
import PasswordLabelledField from '../../components/form-controls/PasswordLabelledField';
import SelectLabelledField, {
  SelectOption,
} from '../../components/form-controls/SelectLabelledField';
import TextLabelledField from '../../components/form-controls/TextLabelledField';
import { useCancelToken } from '../../hooks/use-cancel-token';
import useForm from '../../hooks/use-form';
import {
  getJobTitles,
  getSalesRepresentatives,
  getWareHouses,
  register,
} from '../../services/api-service';
import {
  confirmPasswordValidator,
  contactNumberValidator,
  emailAddressValidator,
  fullNameValidator,
  getContactNumberValue,
  passwordValidator,
  requiredValidator,
} from '../../utils/form-utils';
import './styles.scss';

interface FormValue {
  fullName: string;
  contactNumber: string;
  emailAddress: string;
  password: string;
  confirmPassword: string;
  companyName: string;
  jobTitle: string;
  salesRepresentative: string;
  defaultLocation: string;
  agree: boolean;
}

const DEFAULT_FORM_VALUE: FormValue = {
  fullName: '',
  contactNumber: '',
  emailAddress: '',
  password: '',
  confirmPassword: '',
  companyName: '',
  jobTitle: '',
  salesRepresentative: '',
  defaultLocation: '',
  agree: false,
};

const RegisterScreen: React.FC = () => {
  const history = useHistory();

  const { form, setValue, setTouched, isFormValid } = useForm<FormValue>(
    DEFAULT_FORM_VALUE,
    (formValue: FormValue) => ({
      fullName: fullNameValidator(formValue.fullName),
      contactNumber: contactNumberValidator(formValue.contactNumber),
      emailAddress: emailAddressValidator(formValue.emailAddress),
      password: passwordValidator(formValue.password),
      confirmPassword: confirmPasswordValidator(
        formValue.password,
        formValue.confirmPassword
      ),
      companyName: requiredValidator(formValue.companyName),
      jobTitle: requiredValidator(formValue.jobTitle),
      salesRepresentative: requiredValidator(formValue.salesRepresentative),
      defaultLocation: requiredValidator(formValue.defaultLocation),
    })
  );
  const [showRegistrationSuccessModal, setShowRegistrationSuccessModal] =
    useState<boolean>(false);
  const [showAgreeModal, setShowAgreeModal] = useState<boolean>(false);
  const [showEmailPreviousUsedModal, setShowEmailPreviousUsedModal] =
    useState<boolean>(false);
  const [showSkipModal, setShowSkipModal] = useState<boolean>(false);

  // APIs
  const [jobTitleOptions, setJobTitleOptions] = useState<SelectOption[]>([]);
  const jobTitlesCancelToken = useRef<CancelTokenSource>();
  useCancelToken(jobTitlesCancelToken);
  useEffect(() => {
    // request job titles
    const { promise, cancelToken } = getJobTitles();
    promise
      .then((data) => {
        setJobTitleOptions(
          data.map((item) => ({
            label: item.JobTitleName,
            value: item.JobTitleID,
          }))
        );
      })
      .finally(() => {
        jobTitlesCancelToken.current = undefined;
      });
    jobTitlesCancelToken.current = cancelToken;
  }, []);

  const [salesOptions, setSalesOptions] = useState<SelectOption[]>([]);
  const salesCancelToken = useRef<CancelTokenSource>();
  useCancelToken(salesCancelToken);
  useEffect(() => {
    // request sales representatives
    const { promise, cancelToken } = getSalesRepresentatives();
    promise
      .then((data) => {
        setSalesOptions(
          data.map((item) => ({
            label: item.EmpName,
            value: item.EmpName,
          }))
        );
      })
      .finally(() => (salesCancelToken.current = undefined));
    salesCancelToken.current = cancelToken;
  }, []);

  const [warehouseOptions, setWarehouseOptions] = useState<SelectOption[]>([]);
  const warehouseCancelToken = useRef<CancelTokenSource>();
  useCancelToken(warehouseCancelToken);
  useEffect(() => {
    // request warehouses
    const { promise, cancelToken } = getWareHouses();
    promise
      .then((data) => {
        setWarehouseOptions(
          data.map((item) => ({
            label: item.WarehouseName,
            value: item.WarehouseName,
          }))
        );
      })
      .finally(() => (warehouseCancelToken.current = undefined));
    warehouseCancelToken.current = cancelToken;
  }, []);

  const registerCancelToken = useRef<CancelTokenSource>();
  useCancelToken(registerCancelToken);

  /**
   * Skip
   */
  const clickSkip = () => {
    if (isEqual(form.value, DEFAULT_FORM_VALUE)) {
      history.push('/home');
    } else {
      setShowSkipModal(true);
    }
  };

  /**
   * Go to login
   */
  const clickLogin = () => {
    history.push('/login');
  };

  /**
   * Register
   */
  const clickRegister = () => {
    if (!form.value.agree) {
      setShowAgreeModal(true);
      return;
    }
    registerCancelToken.current?.cancel();
    const { promise, cancelToken } = register(
      form.value.emailAddress,
      form.value.password,
      form.value.fullName,
      form.value.companyName,
      form.value.salesRepresentative,
      getContactNumberValue(form.value.contactNumber),
      form.value.jobTitle,
      form.value.defaultLocation
    );
    registerCancelToken.current = cancelToken;
    promise
      .then(() => {
        if (form.value.emailAddress === 'trial123@uslbm.com') {
          setShowEmailPreviousUsedModal(true);
        } else {
          setShowRegistrationSuccessModal(true);
        }
      })
      .finally(() => {
        registerCancelToken.current = undefined;
      });
  };

  /**
   * Continue as guest
   */
  const continueAsGuest = () => {
    setShowSkipModal(false);
    history.push('/home');
  };

  /**
   * Proceed to home
   */
  const proceedToHome = () => {
    setShowRegistrationSuccessModal(false);
    history.push('/home');
  };

  return (
    <form
      className="card register-screen"
      onSubmit={(evt) => evt.preventDefault()}
    >
      <CardHeader title="Register" onSkip={clickSkip} />
      <div className="card-scroller">
        <section>
          <div className="section-header">Account setup</div>
          <div className="section-body">
            <TextLabelledField
              name="fullName"
              label="Your Full Name"
              value={form.value.fullName}
              onChange={(evt: ChangeEvent<HTMLInputElement>) =>
                setValue('fullName', evt.target.value)
              }
              onBlur={() => setTouched('fullName', true)}
              errorText={form.touched.fullName ? form.errors.fullName : ''}
            />
            <TextLabelledField
              name="contactNumber"
              label="Contact Number"
              mask="999-999-9999"
              value={form.value.contactNumber}
              onChange={(evt: ChangeEvent<HTMLInputElement>) =>
                setValue('contactNumber', evt.target.value)
              }
              onBlur={() => setTouched('contactNumber', true)}
              errorText={
                form.touched.contactNumber ? form.errors.contactNumber : ''
              }
            />
            <TextLabelledField
              name="email"
              autoComplete="email"
              label="Email Address"
              value={form.value.emailAddress}
              onChange={(evt: ChangeEvent<HTMLInputElement>) =>
                setValue('emailAddress', evt.target.value)
              }
              onBlur={() => setTouched('emailAddress', true)}
              errorText={
                form.touched.emailAddress ? form.errors.emailAddress : ''
              }
            />
            <PasswordLabelledField
              name="password"
              autoComplete="new-password"
              label="Password"
              tooltip={<PasswordTooltipContent />}
              value={form.value.password}
              onChange={(evt: ChangeEvent<HTMLInputElement>) =>
                setValue('password', evt.target.value)
              }
              onBlur={() => setTouched('password', true)}
              errorText={form.touched.password ? form.errors.password : ''}
            />
            <PasswordLabelledField
              name="confirmPassword"
              autoComplete="new-password"
              label="Confirm Password"
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
          </div>
        </section>
        <section>
          <div className="section-header">Company Details</div>
          <div className="section-body">
            <TextLabelledField
              name="companyName"
              label="Company name"
              value={form.value.companyName}
              onChange={(evt: ChangeEvent<HTMLInputElement>) =>
                setValue('companyName', evt.target.value)
              }
              onBlur={() => setTouched('companyName', true)}
              errorText={
                form.touched.companyName ? form.errors.companyName : ''
              }
            />
            <SelectLabelledField
              label="Job Title"
              value={form.value.jobTitle}
              onValueChange={(value) => setValue('jobTitle', value)}
              options={jobTitleOptions}
            />
            <SelectLabelledField
              label="Your Sales Representative"
              value={form.value.salesRepresentative}
              onValueChange={(value) => setValue('salesRepresentative', value)}
              options={salesOptions}
            />
            <SelectLabelledField
              label="Default Location"
              value={form.value.defaultLocation}
              onValueChange={(value) => setValue('defaultLocation', value)}
              options={warehouseOptions}
            />
          </div>
        </section>
        <div className="agree-checkbox-row">
          <Checkbox
            value={form.value.agree}
            onValueChange={(value) => setValue('agree', value)}
          />
          <div className="agree-text">
            I agree to the{' '}
            <button type="button" className="btn text-link">
              Terms and Conditions
            </button>
          </div>
        </div>
        <button
          type="button"
          className="btn btn-capsule btn-filled md register-button"
          disabled={!isFormValid}
          onClick={clickRegister}
        >
          Register
        </button>
        <div className="already-have-app">
          <img src="/imgs/mobile-icon.svg" alt="" />
          <span className="already-have-text">Already have the App?</span>
        </div>
        <button
          type="button"
          className="btn btn-capsule btn-outlined sm login-button"
          onClick={clickLogin}
        >
          Login
        </button>
      </div>
      {/* Email Previous used */}
      <MessageModal
        show={showEmailPreviousUsedModal}
        onHide={() => setShowEmailPreviousUsedModal(false)}
        type="error"
        title="Email ID previously registered"
        content="The email address you entered is already registered with us. Please verify and try again."
        button="Retry"
        onClickButton={() => setShowEmailPreviousUsedModal(false)}
      />
      {/* Register success */}
      <MessageModal
        show={showRegistrationSuccessModal}
        onHide={() => setShowRegistrationSuccessModal(false)}
        type="success"
        title="Registration Successful!"
        content="You shall receive an email once verification is complete. This process usually takes 1-2 business days."
        button="Proceed to Home"
        onClickButton={proceedToHome}
      />
      {/* Alert user to check agree */}
      <MessageModal
        show={showAgreeModal}
        onHide={() => setShowAgreeModal(false)}
        type="error"
        title="Alert!"
        content="Please select the checkbox to indicate you agree to the terms and conditions. You can review them by clicking on the link provided."
        button="Okay"
        onClickButton={() => setShowAgreeModal(false)}
      />
      {/* Skip modal */}
      <MessageModal
        show={showSkipModal}
        onHide={() => setShowSkipModal(false)}
        type="error"
        title="Are you sure you don’t want to register now?"
        content="Registration is incomplete. You can always register later from the main menu."
        buttonConfigs={[
          {
            type: 'filled',
            label: 'Complete Registration',
            onClick: () => setShowSkipModal(false),
          },
          {
            type: 'outlined',
            label: 'Continue as Guest',
            onClick: continueAsGuest,
          },
        ]}
      />
    </form>
  );
};

export default RegisterScreen;
