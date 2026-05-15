import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from "../pages/Dashboard";
import Login from '../pages/Login';
import Register from '../pages/Register';
import UploadPage from "../pages/UploadPage";
import SummaryPage from "../pages/SummaryPage";
import QuizPage from "../pages/QuizPage";
import ChatPage from "../pages/ChatPage";
import Layout from "../components/Layout";
import FilesPage from "../pages/FilesPage";
import PreviewPage from "../pages/PreviewPage";
export default function AppRoutes() {

  return (
    <Routes>
      <Route
  path="/dashboard"
  element={
    <Layout>
      <Dashboard />
    </Layout>
  }
/>

<Route
  path="/upload"
  element={
    <Layout>
      <UploadPage />
    </Layout>
  }
/>

<Route
  path="/summary/:id"
  element={
    <Layout>
      <SummaryPage />
    </Layout>
  }
/>

<Route
  path="/quiz/:id"
  element={
    <Layout>
      <QuizPage />
    </Layout>
  }
/>

<Route
  path="/chat/:id"
  element={
    <Layout>
      <ChatPage />
    </Layout>
  }
/>
<Route
  path="/files"
  element={
    <Layout>
      <FilesPage />
    </Layout>
  }
      />
      <Route
  path="/preview/:id"
  element={
    <Layout>
      <PreviewPage />
    </Layout>
  }
/>
    </Routes>
  );
}