import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { StrictMode } from 'react';

ReactDOM.render(
  <>
    <StrictMode>
      <App />
    </StrictMode>
  </>,
  document.getElementById('root')
);
