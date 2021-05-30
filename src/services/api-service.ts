import axios, { CancelTokenSource, Method } from 'axios';

import { BASE_API_URL } from '../config';
import { JobTitle } from '../models/JobTitle';
import { SalesRepresentative } from '../models/SalesRepresentative';
import { Warehouse } from '../models/Warehouse';

const apiAxios = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    Authorization: 'Bearer 24ff67b6-c3e5-4ad7-a9e9-c5677b21f4b2',
  },
});

export interface CallResult<T> {
  promise: Promise<T>;
  cancelToken: CancelTokenSource;
}

/**
 * Call API in a cancellable way
 * @param url the url to call API
 * @param method HTTP Method
 * @param data request payload
 * @returns CallResult
 */
function callCancellableApi<T>(
  url: string,
  method: Method,
  data?: any
): CallResult<T> {
  const source = axios.CancelToken.source();
  const promise = apiAxios
    .request({
      url,
      method,
      data,
      cancelToken: source.token,
    })
    .then((res) => res.data)
    .catch((reason) => {
      if (axios.isCancel(reason)) {
        console.log('Request has been cancelled.');
      } else {
        console.error('API call error', reason);
      }
    });
  return {
    promise,
    cancelToken: source,
  };
}

/**
 * Call API to login
 * @param email the email get from form
 * @param password the password get from form
 * @returns AxiosResponse promise
 */
export function login(email: string, password: string): CallResult<any> {
  return callCancellableApi('/home/login', 'POST', {
    input: {
      opco: 'USC',
      appversion: '3.0',
      devicemodel: 'Chrome',
      osversion: '89.0.4389.114',
      devicetoken: '9b064484-24f8-365e-9ba7-697b35d71c68',
      deviceid: '9b064484-24f8-365e-9ba7-697b35d71c68',
      email,
      password,
      authtoken: '',
      Model: 'Desktop',
    },
  });
}

/**
 * Call API to register
 * @param email email value from form
 * @param password password value from form
 * @param name name value from form
 * @param companyName company value from form
 * @param salesRepresentative sales representative name from from
 * @param contactNumber contact number from form
 * @param jobTitleId job title ID from form
 * @param warehouseName warehouse name from form
 * @returns CallResult
 */
export function register(
  email: string,
  password: string,
  name: string,
  companyName: string,
  salesRepresentative: string,
  contactNumber: string,
  jobTitleId: string,
  warehouseName: string
): CallResult<any> {
  return callCancellableApi('/home/register', 'POST', {
    input: {
      email,
      password,
      name,
      companyname: companyName,
      primaryContactName: salesRepresentative,
      contactnumber: contactNumber,
      deviceid: 'c7c9df0a-18e2-5134-81e3-e40fba0c9dec',
      token: 'c7c9df0a-18e2-5134-81e3-e40fba0c9dec',
      opco: 'JL',
      devicemodel: 'Chrome',
      osversion: '65.0.3325.162',
      warehousename: warehouseName,
      appversion: '3.0',
      JobTitleID: jobTitleId,
      Model: 'Desktop',
    },
  });
}

/**
 * Call API to get job title options
 * @returns AxiosResponse promise
 */
export function getJobTitles(): CallResult<JobTitle[]> {
  return callCancellableApi('/home/jobtitles', 'POST', {
    input: {
      epco: 'USC',
      appversion: '3.0',
      EmailAddress: '',
      DeviceModel: 'Chrome',
      DeviceID: '9d064484-24f8-365e-9ba7-697b35d71c68',
      OsVersion: '89.0.4389.114',
    },
  });
}

/**
 * Call API to get job title options
 * @returns AxiosResponse promise
 */
export function getSalesRepresentatives(): CallResult<SalesRepresentative[]> {
  return callCancellableApi('/home/loadsalesmenlist', 'POST', {
    input: {
      opco: 'USC',
      appversion: '3.0',
      devicemodel: 'Chrome',
      osversion: '89.0.4389.114',
      devicetoken: '9b064484-24f8-365e-9ba7-697b35d71c68',
      EmailAddress: '',
      DeviceID: '9b064484-24f8-365e-9ba7-697b35d71c68',
    },
  });
}

/**
 * Call API to get ware house options
 * @returns AxiosResponse promise
 */
export function getWareHouses(): CallResult<Warehouse[]> {
  return callCancellableApi('/home/loadwarehouselist', 'POST', {
    input: {
      opco: 'USC',
      appversion: '3.0',
      devicemodel: 'Chrome',
      osversion: '89.0.4389.114',
      EmailAddress: '',
      DeviceID: '9b064484-24f8-365e-9ba7-697b35d71c68',
    },
  });
}

/**
 * Call API to reset password
 * @param email email value from form
 * @param password password value from form
 * @returns AxiosResponse promise
 */
export function resetPassword(
  email: string,
  password: string
): CallResult<any> {
  return callCancellableApi('/home/forgotpassword', 'POST', {
    input: {
      opco: 'USC',
      appversion: '3.0',
      devicemodel: 'Chrome',
      osversion: '89.0.4389.114',
      devicetoken: 'e31e1937-1e08-4dd2-a693-0deab2ae617b',
      deviceid: 'e31e1937-1e08-4dd2-a693-0deab2ae617b',
      email,
      temppassword: password,
    },
  });
}
