import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AuthContextApi from './contexts/authContextApi';
import GeneralContextApi from './contexts/generalContextApi';


ReactDOM.render(
  <React.StrictMode>
    <AuthContextApi>
      <GeneralContextApi>
        <App />
      </GeneralContextApi>
    </AuthContextApi>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
