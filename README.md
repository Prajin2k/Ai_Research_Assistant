# 🤖 AI Research Assistant

An AI-powered research platform built using the MERN Stack that enables users to upload research documents, extract text using OCR, generate intelligent summaries, interact with documents through AI chat, and create quizzes for enhanced learning.

![React](https://img.shields.io/badge/Frontend-React-blue)
![Node.js](https://img.shields.io/badge/Backend-Node.js-success)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-green)
![Express](https://img.shields.io/badge/API-Express-black)
![Groq](https://img.shields.io/badge/AI-Groq-orange)

---

# 📖 Overview

AI Research Assistant is a full-stack web application designed to simplify research and document analysis. Users can upload PDFs or images, extract text using OCR, generate AI-powered summaries, ask questions about uploaded documents, and automatically create quizzes to improve understanding.

The platform combines modern web technologies with Large Language Models (LLMs) to provide an interactive and intelligent research experience.

---

# ✨ Features

- 🔐 Secure User Authentication (JWT)
- 📄 PDF Upload & Analysis
- 🖼️ Image Upload with OCR
- 📝 AI-Powered Document Summarization
- 💬 AI Chat with Uploaded Documents
- ❓ Automatic Quiz Generation
- 📚 Document Management Dashboard
- 🔍 Intelligent Information Retrieval
- ⚡ Fast and Responsive Interface

---

# 🛠️ Tech Stack

## Frontend

- React.js
- Bootstrap
- Axios

## Backend

- Node.js
- Express.js
- JWT Authentication
- REST APIs

## AI & OCR

- Groq LLM
- Tesseract OCR

## Database

- MongoDB
- MongoDB Atlas

---

# 🏗️ System Workflow

```
User Upload
      │
      ▼
 PDF / Image
      │
      ▼
 OCR (Tesseract)
      │
      ▼
 Extracted Text
      │
      ▼
 Groq AI
      │
 ┌────┴────┐
 ▼         ▼
Summary   AI Chat
      │
      ▼
 Quiz Generation
```

---

# 📂 Project Structure

```
AI-Research-Assistant

│
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── config/
│   └── server.js
│
└── README.md
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/Prajin2k/AI-Research-Assistant.git
```

---

## Install Frontend

```bash
cd client
npm install
```

---

## Install Backend

```bash
cd server
npm install
```

---

## Configure Environment Variables

Create a `.env` file in the server folder.

```env
MONGODB_URI=Your MongoDB URI
JWT_SECRET=Your JWT Secret
GROQ_API_KEY=Your Groq API Key
```

---

## Start Backend

```bash
npm run dev
```

---

## Start Frontend

```bash
npm start
```

---

# 📸 Screenshots

Add screenshots of:

- Login & Registration
- Dashboard
- PDF Upload
- Image Upload
- AI Summary
- AI Chat
- Quiz Generation
- Document Library

---

# 🎯 Learning Outcomes

This project helped me gain practical experience in:

- MERN Stack Development
- AI Integration with Web Applications
- OCR using Tesseract
- Large Language Models (LLMs)
- JWT Authentication
- RESTful API Development
- MongoDB Database Design
- File Upload & Processing
- Full-Stack Application Development

---

# 🚀 Future Enhancements

- Multi-language Document Support
- Voice-based AI Interaction
- Research Paper Citation Generator
- Collaborative Workspace
- Cloud File Storage
- Advanced Search & Filtering
- Export Summaries to PDF
- AI-powered Reference Recommendations

---

# 👨‍💻 Author

**Prajin M**

Computer Science Engineering Student

GitHub: https://github.com/Prajin2k

---

# ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.
