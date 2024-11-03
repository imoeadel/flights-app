import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <App />
    <ToastContainer position="top-right" autoClose={3000} />
  </QueryClientProvider>,
  document.getElementById('root')
);