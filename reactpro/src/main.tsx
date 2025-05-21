// main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './app.css';
import { Provider } from 'react-redux';
import { store } from './redux/store'; // ✅ Ensure this path is correct

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}> {/* ✅ Redux context wraps the app */}
      <App />
    </Provider>
  </React.StrictMode>
);
