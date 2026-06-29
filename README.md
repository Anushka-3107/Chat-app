# 💬 Chat App

A full-stack real-time chat application built using the **MERN Stack** and **Socket.IO**. The application enables users to register, authenticate securely, exchange real-time messages, and collaborate through one-to-one and group conversations with a responsive, modern interface.

---

## 🚀 Live Demo

**Frontend:** https://YOUR_FRONTEND_URL

**Backend API:** https://YOUR_BACKEND_URL

---
## 📸 Screenshots
* Login Page
  <img width="911" height="586" alt="image" src="https://github.com/user-attachments/assets/5dadb80b-6835-48bb-a38d-be5b094735ac" />

* Signup Page
  <img width="800" height="736" alt="image" src="https://github.com/user-attachments/assets/94cc4eee-8f5f-48f5-aa51-0e7320a964fd" />

* Home Screen
<img width="1504" height="744" alt="Screenshot 2026-06-29 at 9 59 53 PM" src="https://github.com/user-attachments/assets/9b45b6aa-cfb9-4dbd-8cc4-e4f8948bdc01" />


* One-to-One Chat
  <img width="1499" height="728" alt="Screenshot 2026-06-29 at 10 00 58 PM" src="https://github.com/user-attachments/assets/13a77098-3fd1-4a39-99a1-6cc947ee92b5" />


* Group Chat
  <img width="1501" height="730" alt="Screenshot 2026-06-29 at 10 01 21 PM" src="https://github.com/user-attachments/assets/1587a13b-a35f-416e-a2a6-f692005427ea" />


* User Search
<img width="463" height="737" alt="Screenshot 2026-06-29 at 10 02 36 PM" src="https://github.com/user-attachments/assets/2af46582-3e0b-4117-87ac-8665a61ac348" />

 
* Group Management
  
<img width="1070" height="670" alt="Screenshot 2026-06-29 at 10 03 08 PM" src="https://github.com/user-attachments/assets/404991fa-9031-4141-b7b7-33c01aa476c1" />


---

## ✨ Features

* 🔐 Secure user authentication using JWT
* 👤 User registration and login
* 💬 Real-time one-to-one messaging
* 👥 Group chat creation and management
* 🔍 User search functionality
* ✏️ Rename group chats
* ➕ Add and remove group members
* ⚡ Instant message updates with Socket.IO
* 📱 Responsive UI for desktop and mobile
* 🎨 Modern interface built with Chakra UI

---

## 🛠 Tech Stack

### Frontend

* React
* Vite
* Chakra UI
* Axios
* React Router
* Socket.IO Client

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* Socket.IO
* JWT Authentication
* bcryptjs

---

## 📂 Project Structure

```text
Chat-app/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── Context/
│   │   ├── Pages/
│   │   ├── config/
│   │   └── main.jsx
│   └── vite.config.js
│
├── package.json
└── README.md
```

---

## ⚙️ Installation

### Clone the repository

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/Chat-app.git
cd Chat-app
```

### Install Backend Dependencies

```bash
npm install
```

### Install Frontend Dependencies

```bash
cd frontend
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file inside the **backend** directory.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

---

## ▶️ Running Locally

### Start Backend

```bash
npm run server
```

### Start Frontend

```bash
cd frontend
npm run dev
```

Frontend:

```
http://localhost:5173
```

Backend:

```
http://localhost:5000
```

---

## 🔮 Future Improvements

* Message notifications
* Online/offline user status
* Typing indicators
* Read receipts
* File and image sharing
* Emoji reactions
* Message editing and deletion
* Voice and video calling
* Dark mode

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome.

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to your branch
5. Open a Pull Request

---

## 👨‍💻 Author

**Anushka**

GitHub: https://github.com/Anushka-3107/Chat-app

---

## ⭐ Support

If you found this project helpful, consider giving it a ⭐ on GitHub!
