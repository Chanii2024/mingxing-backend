# Mingxing Cute ✨

A premium, high-aesthetic e-commerce platform for exclusive lifestyle merchandise, specializing in bespoke mugs and apparel.

![Mingxing Banner](https://via.placeholder.com/1200x400/FFFFFF/2D2D2D?text=Mingxing+Cute+Lifestyle)

## 🌟 Overview

**Mingxing Cute** is a state-of-the-art web application designed to provide a seamless and visually stunning shopping experience. Built with a focus on editorial-style design, fluid animations, and high-performance modern web technologies.

## 🎨 Visual Identity

The platform follows a sophisticated design system:
- **Primary Palette**: Cream (`#FFFFFF`), Rose (`#EBB3B2`), Charcoal (`#2D2D2D`).
- **Typography**: 
  - **Headings**: *Playfair Display* (Serif / Italic) for a premium editorial feel.
  - **Body**: *Inter* (Sans-serif) for maximum readability.
- **Aesthetics**: Glassmorphism, smooth GSAP transitions, and a clean minimalist layout.

## 🚀 Technical Stack

### Frontend
- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 7](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Routing**: [React Router 7](https://reactrouter.com/)
- **Animations**: [GSAP](https://greensock.com/gsap/) & [GSAP React](https://greensock.com/react/)
- **Communication**: [@emailjs/browser](https://www.emailjs.com/) for concierge services.

### Backend
- **Framework**: [Spring Boot 3.2.1](https://spring.io/projects/spring-boot) (Java 17)
- **Features**: RESTful APIs, Spring Mail for transactional emails.
- **Tools**: Lombok for concise code.

## ✨ Key Features

- **Dynamic Shop Views**: Dedicated interfaces for [Mug Shops](/mugs) and [T-Shirt Shops](/tshirts).
- **Premium Animations**: Scroll-triggered reveals and fluid transitions powered by GSAP.
- **Interactive Cart**: Seamless side-drawer shopping experience.
- **Responsive Design**: Optimized for everything from mobile devices to ultra-wide monitors.
- **Concierge Service**: Specialized contact system for bespoke orders.

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18+)
- Java 17 (for backend)

### Installation

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd "Mingxing Cute"
   ```

2. **Frontend Setup**
   ```bash
   npm install
   npm run dev
   ```

3. **Backend Setup**
   Use the included Maven wrapper—you do not need Maven installed globally:
   
   **For Windows:**
   ```powershell
   cd backend
   .\mvnw.cmd clean install
   .\mvnw.cmd spring-boot:run
   ```

   **For macOS/Linux:**
   ```bash
   cd backend
   ./mvnw clean install
   ./mvnw spring-boot:run
   ```

## 📂 Project Structure

```text
Mingxing Cute/
├── src/                # Frontend Source
│   ├── components/     # Reusable UI components
│   ├── pages/          # Main application views (Landing, Shops)
│   ├── assets/         # Static assets & images
│   ├── index.css       # Global styles & design tokens
│   └── main.jsx        # Entry point
├── backend/            # Spring Boot Backend
│   └── src/            # Java controllers & services
├── public/             # Static public assets
├── vite.config.js      # Vite configuration
└── package.json        # Dependencies & scripts
```

## 📜 License

This project is private and for internal use.

---

*Made with ❤️ by Chanii*
