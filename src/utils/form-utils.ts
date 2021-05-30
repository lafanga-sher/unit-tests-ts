/**
 * Test if a string is valid email
 * @param email email to be tested
 * @returns true if it's valid email format
 */
export function validateEmail(email = ''): boolean {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// special characters to validate password
const specialCharacters = [
  '~',
  '`',
  '!',
  '@',
  '#',
  '$',
  '%',
  '^',
  '&',
  '*',
  '(',
  ')',
  '-',
  '_',
  '+',
  '=',
  '{',
  '}',
  '[',
  ']',
  '|',
  '\\',
  '/',
  ':',
  ';',
  '"',
  "'",
  '<',
  '>',
  ',',
  '.',
  '?',
];

/**
 * Validate password
 * @param password the password
 * @returns true if password is valid
 */
export function validatePassword(password = ''): boolean {
  const lengthConstraint = password.length >= 8 && password.length <= 15;
  if (!lengthConstraint) {
    return false;
  }
  let hasSpecialCharacter = false;
  for (const char of specialCharacters) {
    if (password.includes(char)) {
      hasSpecialCharacter = true;
      break;
    }
  }
  if (!hasSpecialCharacter) {
    return false;
  }
  const atLeastOneCapitalLetter = password.search(/[A-Z]/) >= 0;
  if (!atLeastOneCapitalLetter) {
    return false;
  }
  const atLeastOneNumber = password.search(/[0-9]/) >= 0;
  if (!atLeastOneNumber) {
    return false;
  }
  return true;
}

/**
 * Validate full name
 */
export const fullNameValidator = (fullName: string) => {
  if (/[a-zA-Z]+ [a-zA-Z]+/.test(fullName)) {
    return '';
  } else {
    return 'Please enter your first and last name.';
  }
};

/**
 * Validate contact number
 */
export const contactNumberValidator = (contactNumber: string) => {
  if (/[0-9]{3}-[0-9]{3}-[0-9]{4}/.test(contactNumber)) {
    return '';
  } else {
    return 'Please enter a valid phone number.';
  }
};

/**
 * Validate email address
 */
export const emailAddressValidator = (emailAddress: string) => {
  if (validateEmail(emailAddress)) {
    return '';
  } else {
    return 'Please enter a valid email address.';
  }
};

/**
 * Validate password
 */
export const passwordValidator = (password: string) => {
  if (validatePassword(password)) {
    return '';
  } else {
    return 'Password does not meet the character requirements.';
  }
};

/**
 * Validate confirm password
 */
export const confirmPasswordValidator = (
  password: string,
  confirmPassword: string
) => {
  if (confirmPassword === password) {
    return '';
  } else {
    return 'Passwords do not match. Please try again.';
  }
};

/**
 * Validate value is unempty
 */
export const requiredValidator = (value: string | boolean) => {
  if (value) {
    return '';
  } else {
    return 'Required';
  }
};

/**
 * Remove hyphen from contact number
 * @param contactNumber hyphen separated contact number
 * @returns contact number without hyphen
 */
export const getContactNumberValue = (contactNumber: string) => {
  return contactNumber.replace(/-/g, '');
};
