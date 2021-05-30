# USB: Supply App ReactJS App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Prerequisites
node 12.14+
npm 6.13+

## How to run
- `npm install`
- `npm start`
- then you can view the app running at `http://localhost:3000`

## How to build for production
- `npm run build`

## Lint check
- `npm run lint`

## Configuration
- All configurations are located in *src/config.ts* now
  | Config Name               | Description                                 |
  | ------------------------- | ------------------------------------------- |
  | appSettings               | Contains all config for the specific app    |
  | appSettings.activeGroupId | Index of active group to be used be the app |
  | BASE_API_URL              | base API url of the app                     |

## How to verify - USB: Supply App ReactJS UI Prototype
- On boarding section
  - change the config value of `appSettings.activeGroupId` and refresh the page to verify, from 0 to 12 to see all variations
- Login screen
  - Only when you enter valid email and password(1. 8-15 characters, 2. at least one special character, 3. at least one capital letter, 4. at least a number), the login button will get enabled
  - Valid account, email: `trial123@uslbm.com`, password: any valid password
  - To trigger error occurred, use account email: `error@email.com`, password: any valid password
  - To trigger your email is inactive, use account email: `inactive@email.com`, password: any valid password
  - To trigger Incorrect login details, use any other email and a valid password
  - After 3 attempts of incorrect accounts, https://xd.adobe.com/view/f66a8743-dd11-442d-8485-bc9e602fff23-a339/screen/f32376bd-771c-491f-a6d1-878ad4f61e49/specs/ will show
  - After 5 attempts of incorrect accounts, https://xd.adobe.com/view/f66a8743-dd11-442d-8485-bc9e602fff23-a339/screen/3b3c2dc9-f9a9-4c58-bd4c-cbeffa3c8410/specs/ will show
- Register screen
  - To trigger https://xd.adobe.com/view/f66a8743-dd11-442d-8485-bc9e602fff23-a339/screen/7ae91027-88e2-4f3a-b78c-67498398852e/specs/, enter details in one or more fields and click the *Skip* button
  - To trigger https://xd.adobe.com/view/f66a8743-dd11-442d-8485-bc9e602fff23-a339/screen/21ab56a0-3bf5-49e6-a3ba-5f1f65dc55ee/specs/, use `trial123@uslbm.com` as the email to register
- Forgot password screen
  - To trigger https://xd.adobe.com/view/f66a8743-dd11-442d-8485-bc9e602fff23-a339/screen/174c4a09-fe4d-4047-b410-037b229b4b64/specs/, first enter a valid email in https://xd.adobe.com/view/f66a8743-dd11-442d-8485-bc9e602fff23-a339/screen/ba46b822-2bf0-461b-b7ed-1e88d209a6f2/specs/, click the *Send Verification Link* button. Come back to this screen again within 3 minutes, and enter a valid email and click the *Send Verification Link* button.
- Enter new password screen
  - To trigger https://xd.adobe.com/view/f66a8743-dd11-442d-8485-bc9e602fff23-a339/screen/75d58ee2-919c-4d95-b1eb-8e48c8ea5808/specs/, please use `123456@A` as new password.# unit-tests-ts
