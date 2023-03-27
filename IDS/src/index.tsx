import ReactDOM from 'react-dom/client';
import './index.css';
import './i18n';
import 'react-toastify/dist/ReactToastify.css';
import Router from './routes';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Router />
)