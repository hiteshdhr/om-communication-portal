# 🏢 Om Communication Work — Enterprise Security & Telecom Portal

A full-stack enterprise web portal and management workspace for **Om Communication Work**, delivering CCTV surveillance, EPABX intercom networks, video door phones, biometric access control, structured cabling, and turnkey Annual Maintenance Contracts (AMC) across Delhi-NCR.

---

## 🛠️ Technology Stack

### **Frontend**
- **Core Framework:** React 19 (Vite 8)
- **Styling & UI:** Vanilla CSS Design System with CSS Tokens, TailwindCSS v4
- **Animations & Motion:** Framer Motion 12 (`useScroll`, `useTransform`, `useInView`, `AnimatePresence`)
- **Icons:** Lucide React
- **Routing:** React Router DOM v7
- **Notifications:** React Hot Toast
- **SEO & Metadata:** React Helmet Async

### **Backend**
- **Language & Runtime:** OpenJDK Java 21 LTS
- **Framework:** Spring Boot 3.3.0
- **Security:** Spring Security with JWT Authentication & BCrypt Password Hashing
- **Data & ORM:** Spring Data JPA / Hibernate 6.5
- **Database:** H2 In-Memory Database (Development) / PostgreSQL (Production)
- **Payment Gateway:** Razorpay SDK Integration
- **Mail Service:** JavaMail SMTP Integration

---

## ✨ Key Features & Highlights

### 1. **Interactive Hero Carousel**
- 3 Slide Showcase: `01 / Surveillance & Security`, `02 / EPABX & Telecom Networks`, `03 / Turnkey Engineering & AMC`.
- Single controlled 7-second autoplay timer (`useEffect` watching `[activeSlide, isPaused, prefersReducedMotion]`).
- Numbered click triggers (`01`, `02`, `03`) with active indicator line and animated progress fill.
- Pause on hover (`onMouseEnter`/`onMouseLeave`), reset on click/drag.
- Mobile touch swipe support (`drag="x"`) and keyboard arrow navigation (`ArrowLeft`/`ArrowRight`).
- Layout height stability to prevent Cumulative Layout Shift (CLS).

### 2. **Global Theme System (Light & Dark Mode)**
- Unified `ThemeContext` via `useTheme` managing the entire application.
- Theme Toggle accessible from Public Desktop Navbar, Mobile Drawer, Admin Login, and Admin Dashboard Top Header.
- Theme state persists across route navigation, page reloads, and browser sessions via `localStorage`.
- Strict contrast compliance with zero dark-on-dark or light-on-light text.

### 3. **Public Solutions & Engineering Desk**
- **CCTV Surveillance:** HD IP Cameras, NVR Recording, Starlight Night Vision.
- **EPABX & Office Intercom:** Multi-line PBX systems, society riser cabling, desk telephone extensions.
- **Video Door Phone (VDP):** Outdoor entry stations, capacitive touch monitors, electronic door locks.
- **Biometric Access Control:** Touchless facial recognition, fingerprint readers, automated HR logs.
- **Structured Cabling:** CAT6 copper wiring, server rack cable dressing, patch panel termination.
- **AMC & Preventive Care:** Scheduled quarterly audits, emergency breakdown visits across Delhi-NCR.
- **Interactive Tools:** Dynamic Quote Estimator and Complaint Desk for service tickets.

### 4. **Admin Command Center (`/admin/login` & `/admin/dashboard`)**
- Rebranded editorial layout (`OM COMMUNICATION` / `ADMIN WORKSPACE`).
- Password visibility toggle (`Eye`/`EyeOff`) and top-right theme toggle button.
- **Leads & Enquiries:** Manage incoming project requests, update pipeline status (`NEW`, `CONTACTED`, `SITE_SURVEY`, `WON`, `LOST`).
- **Site Surveys:** Schedule field technician site visits and generate detailed facility estimates.
- **Support Desk:** Track breakdown tickets, assign technical staff, and resolve client complaints.
- **Invoices & Quotations:** Generate itemized PDF-style commercial quotations and invoices with direct WhatsApp payment link sharing and Razorpay gateway integration.

---

## 📁 Repository Structure

```
om-communication-portal/
├── backend/                        # Spring Boot Java REST Backend
│   ├── src/main/java/com/omcommunication/portal/
│   │   ├── config/                 # Security & CORS configuration
│   │   ├── controller/             # REST API Controllers (Public & Admin)
│   │   ├── model/                  # JPA Entities (Inquiry, Ticket, Invoice, Survey)
│   │   ├── repository/             # Data JPA Repositories
│   │   ├── security/               # JWT Utilities, Auth Filters, Password Encoder
│   │   └── service/                # Business logic & email services
│   ├── src/main/resources/
│   │   └── application.yml         # Environment properties (H2 & Postgres profiles)
│   └── pom.xml                     # Maven project descriptor
│
├── frontend/                       # Vite React Frontend SPA
│   ├── src/
│   │   ├── assets/                 # High-resolution project photography & logos
│   │   ├── components/             # Reusable UI components (Hero, Navbar, Footer, ServiceShared)
│   │   ├── pages/                  # Page routes (Landing, Solutions, Industries, AdminDashboard)
│   │   ├── utils/                  # ThemeContext provider and helper functions
│   │   ├── App.jsx                 # Route definitions
│   │   ├── main.jsx                # Application entrypoint
│   │   └── index.css               # Global CSS Design Tokens & Utilities
│   ├── package.json                # Dependencies & npm scripts
│   └── vite.config.js              # Vite configuration & backend proxy rules
│
└── README.md                       # Project documentation
```

---

## 🚀 Running Locally

### **Prerequisites**
- **Java 21 LTS** (`java -version`)
- **Maven 3.8+** (`mvn -version`)
- **Node.js 18+** (`node -v`) & **npm 10+** (`npm -v`)

---

### **1. Start Backend Server**

Navigate to the `backend` folder and launch Spring Boot using the Maven wrapper:

```bash
cd backend
.\mvnw.cmd spring-boot:run
```

- **API Server Base URL:** `http://localhost:8080`
- **H2 In-Memory Database Console:** `http://localhost:8080/h2-console`
  - **JDBC URL:** `jdbc:h2:mem:omportaldb`
  - **User:** `sa`
  - **Password:** *(leave blank)*

---

### **2. Start Frontend Dev Server**

Open a new terminal window, navigate to the `frontend` folder, and launch Vite dev server:

```bash
cd frontend
npm run dev
```

- **Frontend Application URL:** [http://localhost:5174](http://localhost:5174)
- **Admin Workspace Login:** [http://localhost:5174/admin/login](http://localhost:5174/admin/login)

---

## 🔐 Credentials & Default Admin

Upon initial backend launch with the `h2` profile, an initial administrator user is automatically bootstrapped:

- **Admin Username:** `admin`
- **Admin Password:** Configured in `application.yml` (`admin-dev-pass`) or printed in the terminal console logs upon startup.

---

## 📦 Production Build Instructions

### **Build Frontend Bundle**
```bash
cd frontend
npm run build
```
The optimized client bundle will be compiled into `frontend/dist`.

### **Build Backend JAR**
```bash
cd backend
.\mvnw.cmd clean package -DskipTests
```
The runnable Spring Boot executable JAR file will be generated at `backend/target/portal-1.0.0.jar`.

---

## 📞 Business & Contact Information

- **Company Name:** Om Communication Work
- **Services:** Enterprise Security, CCTV, EPABX Telecom, Biometric Access, Structured Cabling & AMC
- **Coverage Region:** Delhi, Noida, Gurgaon, Ghaziabad, Faridabad (Delhi-NCR)
- **Phone:** +91 72177 15296
