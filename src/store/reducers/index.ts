import { combineReducers } from 'redux';

import { AppState } from '../types';
import resetPassword from './reset-password';

const allReducers = combineReducers<AppState>({
  resetPassword,
});

export default allReducers;
