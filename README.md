# 🌍 ESG Data Ingestion & Compliance Review Platform

A full-stack ESG (Environmental, Social, and Governance) data ingestion and analyst review platform built using **Django REST Framework**, **React**, and **Tailwind CSS**.

The platform ingests emissions-related data from multiple enterprise sources, validates suspicious records, supports analyst approval workflows, maintains audit logs, and provides a live operational dashboard.

---

# 🚀 Live Demo

## Frontend
https://your-frontend-url.onrender.com

## Backend API
https://breathe-esg-backend-b7pe.onrender.com

---

# 📌 Features

## ✅ Multi-Source ESG Data Ingestion

Supports ingestion from:

- SAP fuel/procurement CSV files
- Utility electricity CSV files
- Corporate travel JSON files

---

## ✅ ESG Scope Classification

| Source | ESG Scope |
|---|---|
| SAP Fuel Data | Scope 1 |
| Utility Electricity | Scope 2 |
| Travel Data | Scope 3 |

---

## ✅ Validation Engine

Detects suspicious records such as:

- Negative quantities
- Invalid units
- Invalid plant codes
- Missing fields
- Invalid billing periods
- Unsupported travel modes
- Invalid travel distances

---

## ✅ Analyst Review Workflow

Analysts can:

- Approve valid records
- Reject suspicious records
- Lock finalized records

### Business Rules

- Valid records → Approve / Reject
- Suspicious records → Reject only
- Locked records → Immutable

---

## ✅ Audit Logging

Tracks:

- Record actions
- Status transitions
- Approval history
- Rejection history

---

## ✅ Dashboard Features

- Upload ESG datasets
- Live records table
- Status indicators
- Search functionality
- Status filtering
- Dashboard analytics cards

---

# 🛠️ Tech Stack

## Backend
- Django
- Django REST Framework
- SQLite
- Pandas
- Gunicorn

## Frontend
- React
- Vite
- Tailwind CSS
- Axios

## Deployment
- Render

---

# 📂 Project Structure

```bash
breathe_esg/
│
├── config/
├── emissions/
│   ├── services/
│   │   ├── sap_processor.py
│   │   ├── utility_processor.py
│   │   └── travel_processor.py
│   │
│   ├── models.py
│   ├── views.py
│   ├── serializers.py
│   └── urls.py
│
├── frontend/
│   ├── src/
│   └── public/
│
├── requirements.txt
├── build.sh
└── manage.py
```

---

# ⚙️ Backend Setup

## Clone Repository

```bash
git clone <your-github-repo-url>
cd breathe_esg
```

---

## Create Virtual Environment

### Windows

```bash
python -m venv venv
venv\Scripts\activate
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

## Start Backend Server

```bash
python manage.py runserver
```

Backend runs at:

```bash
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

```bash
http://localhost:5173
```

---

# 📡 API Endpoints

## Upload APIs

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/upload/sap/` | Upload SAP CSV |
| POST | `/api/upload/utility/` | Upload Utility CSV |
| POST | `/api/upload/travel/` | Upload Travel JSON |

---

## Record APIs

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/records/` | Fetch all records |
| POST | `/api/records/<id>/approve/` | Approve record |
| POST | `/api/records/<id>/reject/` | Reject record |

---

# 📸 Screenshots

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/c75fb762-3bd3-498d-8ce4-15ab16ebc2c9" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/3483677c-7f65-419b-ad63-7d0ec0c52ad0" />


---

# 🌍 Deployment

## Backend
Deployed using Render Web Service.

## Frontend
Deployed using Render Static Site.

---

# 📈 Future Enhancements

- Authentication & Role-Based Access
- Charts & ESG Analytics
- CSV Export
- PostgreSQL Integration
- Cloud Storage
- Advanced Audit Reporting

---

# 👨‍💻 Author

Basavva Sangenavar
