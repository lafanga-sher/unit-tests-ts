import { useState } from 'react';

export type FormValueProperty<FormValue> = keyof FormValue;

export type FormErrors = {
  [key: string]: string;
};

export interface FormState<FormValue> {
  value: FormValue;
  errors: FormErrors;
  touched: {
    [key in FormValueProperty<FormValue>]?: boolean;
  };
}

export type Validator<FormValue> = (formValue: FormValue) => FormErrors;

/**
 * Custom hook to help handle forms
 * @param defaultFormValue Default value of the form
 */
export const useForm = <FormValue>(
  defaultFormValue: FormValue,
  validator: Validator<FormValue>
) => {
  const [form, setForm] = useState<FormState<FormValue>>(() => {
    const state: FormState<FormValue> = {
      value: defaultFormValue,
      errors: {},
      touched: {},
    };
    state.errors = validator(defaultFormValue);
    return state;
  });

  /**
   * Set value of a field
   * @param property property name
   * @param value the value
   */
  const setValue = <K extends keyof FormValue>(
    property: K,
    value: FormValue[K]
  ) => {
    setForm((oldForm) => {
      const newForm = {
        ...oldForm,
        value: {
          ...form.value,
          [property]: value,
        },
      };
      newForm.errors = validator(newForm.value);
      return newForm;
    });
  };

  /**
   * Set a property as touched
   * @param property property name
   * @param touched true if marked as touched
   */
  const setTouched = (
    property: FormValueProperty<FormValue>,
    touched: boolean
  ) => {
    setForm((oldForm) => ({
      ...oldForm,
      touched: {
        ...oldForm.touched,
        [property]: touched,
      },
    }));
  };

  const isFormValid =
    Object.values(form.errors).filter((err) => !!err).length === 0;

  return {
    form,
    setValue,
    setTouched,
    isFormValid,
  };
};

export default useForm;
