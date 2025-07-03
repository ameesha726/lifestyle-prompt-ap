# 🖼️ Lifestyle Prompt App

A modern web app that generates creative lifestyle scene prompts from uploaded product images using AI.

---

### ✨ Features

- 🖼️ Upload product images (JPG/PNG)
- 🧠 Generates lifestyle scene captions using a lightweight AI model (BLIP)
- 🌗 Dark/light mode toggle
- 🎞️ Smooth UI animations with Framer Motion
- 🛠️ No OpenAI API key required — fully local backend

---

### 🧰 Tech Stack

- **Frontend**: React + Tailwind CSS + Vite + Framer Motion  
- **Backend**: Python + Flask + `Salesforce/blip-image-captioning-base`  
- **Hosting**: Vercel (Frontend), Localhost (Backend)

---

## 🚀 Live Demo

🔗 [https://lifestyle-prompt-ap-61xx.vercel.app](https://lifestyle-prompt-ap-61xx.vercel.app)

---

## 🛠️ How to Run Locally

### 1. Clone the Repo

```bash
git clone https://github.com/ameesha726/lifestyle-prompt-ap.git
cd lifestyle-prompt-ap
```

---

### 2. Run the Frontend (React)

#### 🔧 Prerequisites

You need:

- **Node.js** (v16 or later recommended)  
- **npm** (comes with Node.js)  
- **React** (already included in `package.json`)  
- **Vite** (for fast development builds)  
- **Tailwind CSS**  
- **Framer Motion**  
- **lucide-react** (for icons)

> 📦 You do **not** need to install React manually — it’s already listed in `package.json`. Running `npm install` will install all dependencies automatically.

#### 🔄 To run the frontend locally:

```bash
# Install all frontend dependencies (React, Tailwind, etc.)
npm install

# Start the development server
npm run dev
```

- This will start the app at: [http://localhost:5173](http://localhost:5173)

---

### 3. Run the Backend (Flask)

#### 🔧 Prerequisites

- **Python 3.7+**  
- **pip** installed

#### 📦 Install Backend Dependencies

```bash
pip install flask flask-cors torch transformers pillow
```

#### 🚀 Start the Server

```bash
python server.py
```

- Starts Flask backend at: [http://localhost:5000](http://localhost:5000)

---

### 4. Usage

- Visit [http://localhost:5173](http://localhost:5173) in your browser  
- Upload an image (JPG/PNG)  
- Click **"Generate"** to get a creative caption  
- The backend will generate the caption using the BLIP model

---

### 5. 🧠 Model Info

We use the lightweight `Salesforce/blip-image-captioning-base` model from Hugging Face for zero-shot image-to-text captioning.

---

### 6. 📦 Deployment

- **Frontend**: Deployed on [Vercel](https://vercel.com)  
- **Backend**: Must be run locally due to model size

---

### 7. 👩‍💻 Developed by  
[Ameesha](https://github.com/ameesha726)

---


