import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './i18n';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Router from './routes';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>

    <Router />
  </React.StrictMode>
)


