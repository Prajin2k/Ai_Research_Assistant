import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/auth.css';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
import "react-pdf/dist/Page/AnnotationLayer.css";
import "./styles/theme.css";
import "react-pdf/dist/Page/TextLayer.css";
import {
  ThemeProvider,
} from "./context/ThemeContext";
ReactDOM.createRoot(document.getElementById('root')).render(
<ThemeProvider>

  <BrowserRouter>

    <App />
  <ToastContainer />
  </BrowserRouter>

</ThemeProvider>
);