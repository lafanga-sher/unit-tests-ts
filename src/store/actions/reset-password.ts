export const SET_EMAIL = '[RESET_PASSWORD] SET EMAIL';

export interface SetEmailAction {
  type: typeof SET_EMAIL;
  payload: {
    email: string;
  };
}

/**
 * Create SetEmailAction
 * @param email email
 * @returns SetEmailAction
 */
export const setEmail = (email: string): SetEmailAction => ({
  type: SET_EMAIL,
  payload: {
    email,
  },
});

export type ResetPasswordTypes = SetEmailAction;
