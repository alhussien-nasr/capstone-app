import axios from 'axios';
import {useSelector} from 'react-redux';

export const apiCall = async (endPoint, method, data, token) => {
  const Config = {
    method: method,
    url: `http://www.rncourseproject.com/app/${endPoint}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: data,
  };
  const res = await axios(Config);
  console.log(res, 'from home');
  return res;
};
