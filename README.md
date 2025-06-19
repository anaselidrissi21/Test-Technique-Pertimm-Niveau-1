# Pertimm Technical Test – Level 1

## 🧩 Description

This project automates the process of:

- Registering a new user  
- Logging in to retrieve an authentication token  
- Creating a job application  
- Polling the application status until it's completed  
- Confirming the application within 30 seconds  

All API calls use the endpoint:  
https://hire-game.pertimm.dev/api/v1.1

---

## ⚙️ Requirements

- Node.js >= 18  
- npm

---

## 📦 Setup

### Clone the repository

```
git clone https://github.com/your-username/test-pertimm-level1.git
cd test-pertimm-level1
```

### Install dependencies

```
npm install
```

### Create a .env file at the root of the project

```
EMAIL=your-email@example.com
PASSWORD=YourStrongPassword123!
```

> ⚠️ The email must be valid and authorized by the API.

### Build the TypeScript project

```
npm run build
```

---

## 🚀 Run the test

```
npm run start
```

Expected output:

```
✅ Login successful  
✅ Application created  
📄 Application status URL: ...  
⏳ Status check (X/X): ...  
✅ Status is COMPLETED  
✅ Confirmation URL: ...  
✅ Application confirmed
```

---

## 📁 Project structure

```
.
├── dist/                   # Compiled JavaScript output
├── src/
│   └── index.ts            # Main logic
├── .env                    # Environment variables (not committed)
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🛑 Notes

- Do not commit the `.env` file  
- The confirmation step must happen within 30 seconds, or it will fail with a 404 error

---

## 👤 Author

Anas Elidrissi
