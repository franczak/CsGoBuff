import axios from 'axios';
import { toast } from 'react-toastify';
import React from 'react';

const { REACT_APP_backend } = process.env;

export default {
  post: (url, body) => {
    return axios.post(`${REACT_APP_backend}${url}`, body, { withCredentials: true })
      .then(res => res.data)
      .catch(() => {
        toast("Wow so easy !");
        return Promise.reject();
      })
  },
  get: (url) => {
    return axios.get(`${REACT_APP_backend}${url}`, { withCredentials: true })
      .then(res => {
        return res.data
      })
      .catch((e) => {
        toast(<Toast />)
        return Promise.reject()
      })
  },
}

const Toast = () => {
  return (
    <div style={{
      width: 300,
      height: 100,
      backgroundColor: 'red',
    }}>
      User doesnt have public stats
    </div>
  )
}