import { ResetPasswordTypes, SET_EMAIL } from '../actions/reset-password';

export interface ResetPasswordState {
  email: string;
  resetDate: Date | undefined;
}

const RESET_EMAIL_STORAGE_KEY = '[USB Supply App]resetPasswordEmail';

// restore reset password email from storage
const resetPasswordEmail = JSON.parse(
  localStorage.getItem(RESET_EMAIL_STORAGE_KEY) || 'null'
);

export const defaultState: ResetPasswordState = {
  email: resetPasswordEmail?.email || '',
  resetDate: resetPasswordEmail
    ? new Date(resetPasswordEmail.resetDate)
    : undefined,
};

const reducer = (
  state: ResetPasswordState = defaultState,
  action: ResetPasswordTypes
): ResetPasswordState => {
  switch (action.type) {
    case SET_EMAIL: {
      const resetDate = new Date();
      localStorage.setItem(
        RESET_EMAIL_STORAGE_KEY,
        JSON.stringify({
          email: action.payload.email,
          resetDate,
        })
      );
      return {
        ...state,
        email: action.payload.email,
        resetDate,
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
