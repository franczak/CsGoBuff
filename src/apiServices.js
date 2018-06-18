import axios from 'axios';
import { toast } from 'react-toastify';
import React from 'react';
import './App.css';

const { REACT_APP_backend } = process.env;

export default {
  post: (url, body) => axios.post(`${REACT_APP_backend}${url}`, body, { withCredentials: true })
    .then(res => res.data)
    .catch(() => {
      toast('Wow so easy !');
      return Promise.reject();
    }),
  get: url => axios.get(`${REACT_APP_backend}${url}`, { withCredentials: true })
    .then(res => res.data)
    .catch((e) => {
      toast(<Toast/>, {closeOnClick: true});
      return Promise.reject();
    }),
};

const Toast = () => (
  <div className="alert-box">
      User doesnt have public stats
  </div>
);
