# ESG Data Ingestion Platform

A full-stack ESG (Environmental, Social, and Governance) data ingestion and validation platform built using React, Django REST Framework, and Tailwind CSS.

The platform allows organizations to upload ESG-related datasets, validate records, flag suspicious entries, approve/reject records, and track all actions through audit logs.

---

# 🌐 Live Demo

## Frontend
https://breathe-esg-frontend-f575.onrender.com

## Backend API
https://breathe-esg-backend-b7pe.onrender.com

---

# 🚀 Features

## ✅ Data Upload Modules
- Upload SAP fuel CSV files
- Upload utility usage CSV files
- Upload travel JSON files

---

## ✅ ESG Record Management
- View uploaded emission records
- Approve valid records
- Reject suspicious or invalid records
- Locked records after approval/rejection

---

## ✅ Validation Engine
Automatically detects suspicious records such as:
- Negative quantities
- Invalid/null values
- Suspicious activity entries
- Unusual emission quantities

---

## ✅ Dashboard Analytics
Includes:
- Total records count
- Approved records count
- Rejected records count
- Suspicious records count

---

## ✅ Search & Filtering
- Search records by activity type
- Filter records by status:
  - Pending
  - Approved
  - Rejected

---

## ✅ Authentication
- JWT-based login system
- Protected routes using React Router
- Secure logout functionality

---

## ✅ Audit Logs
Separate audit logs page that tracks:
- Approved actions
- Rejected actions
- Previous status
- Updated status
- Timestamp history

---

# 🛠️ Tech Stack

## Frontend
- React.js
- Vite
- Tailwind CSS
- Axios
- React Router DOM

## Backend
- Django
- Django REST Framework
- Simple JWT Authentication

## Database
- SQLite

## Deployment
- Render

---

# 📂 Project Structure

```text
breathe_esg/
│
├── config/
│
├── emissions/
│   ├── services/
│   ├── migrations/
│   ├── models.py
│   ├── serializers.py
│   ├── views.py
│   └── urls.py
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── Login.jsx
│   │   ├── AuditLogs.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── requirements.txt
├── build.sh
├── manage.py
└── README.md
```

---

# ⚙️ Backend Setup

## Clone Repository

```bash
git clone https://github.com/Basavva-H/breathe-esg-platform.git
```

```bash
cd breathe-esg-platform
```

---

## Create Virtual Environment

### Windows

```bash
python -m venv venv
```

```bash
venv\Scripts\activate
```

### Linux / Mac

```bash
source venv/bin/activate
```

---

## Install Dependencies

```bash
pip install -r requirements.txt
```

---

## Run Migrations

```bash
python manage.py migrate
```

---

## Create Superuser

```bash
python manage.py createsuperuser
```

---

## Run Backend Server

```bash
python manage.py runserver
```

Backend runs at:

```text
http://127.0.0.1:8000
```

---

# ⚙️ Frontend Setup

## Navigate To Frontend

```bash
cd frontend
```

---

## Install Dependencies

```bash
npm install
```

---

## Run Frontend

```bash
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

---

# 📡 API Endpoints

## Upload APIs

| Method | Endpoint |
|---|---|
| POST | /api/upload/sap/ |
| POST | /api/upload/utility/ |
| POST | /api/upload/travel/ |

---

## Record APIs

| Method | Endpoint |
|---|---|
| GET | /api/records/ |
| POST | /api/records/<id>/approve/ |
| POST | /api/records/<id>/reject/ |

---

## Audit Logs API

| Method | Endpoint |
|---|---|
| GET | /api/audit-logs/ |

---

## Authentication APIs

| Method | Endpoint |
|---|---|
| POST | /api/token/ |
| POST | /api/token/refresh/ |

---

# 🔐 Demo Login Credentials

```text
Username: admin
Password: admin123
```

---

# 📸 Screenshots

## Dashboard
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/9bc5baff-d0c3-420d-bf30-f0dde200c27c" />

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/d4ab0d7a-a320-46f9-ac08-c0b31667d21e" />

## Audit Logs
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/48077e44-09f7-419a-acf7-958de84d2b9d" />


## Login Page
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/853d505c-27e8-40d2-87f1-b088e32f9082" />


---

# 🌍 Deployment

## Frontend
Deployed on Render Static Site.

## Backend
Deployed on Render Web Service.

---


# 👨‍💻 Author

## Basavva Sangenaver


# 📄 License

This project is developed for educational and assignment purposes.
