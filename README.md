# Modern React Portfolio

A stunning, modern portfolio website built with React, Material-UI, and Framer Motion. Features smooth animations, glassmorphism effects, and a premium dark theme design.

![Portfolio Preview](https://img.shields.io/badge/React-19.2.0-61dafb?style=for-the-badge&logo=react)
![Material-UI](https://img.shields.io/badge/MUI-7.3.6-007FFF?style=for-the-badge&logo=mui)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.23.26-FF0055?style=for-the-badge&logo=framer)

## ✨ Features

- 🎨 **Modern Design** - Dark theme with vibrant gradients and glassmorphism effects
- ✨ **Smooth Animations** - Framer Motion powered animations throughout
- 📱 **Fully Responsive** - Mobile-first design that works on all devices
- 🧩 **Material-UI Components** - Professional UI components
- 🎯 **Smooth Scrolling** - Seamless navigation between sections
- 📧 **Contact Form** - Integrated contact form with validation
- 🏆 **Awards Gallery** - Modal view for certificates
- 📊 **Animated Skills** - Progress bars with smooth animations
- ⏱️ **Experience Timeline** - Beautiful timeline for work history

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The application will be available at `http://localhost:5173/`

## 📁 Project Structure

```
my-portfolio/
├── src/
│   ├── components/       # Reusable components (Navbar, Footer, etc.)
│   ├── sections/         # Page sections (Hero, About, Skills, etc.)
│   ├── theme/           # Material-UI theme and global styles
│   ├── utils/           # Data and animation utilities
│   └── assets/          # Images and static files
├── public/              # Public assets (resume, etc.)
└── index.html          # HTML template
```

## 🎨 Customization

### Update Personal Information
Edit `src/utils/data.js` to update:
- Personal info (name, email, location)
- Skills and percentages
- Work experience and education
- Projects and links
- Awards

### Change Theme Colors
Modify `src/theme/theme.js` to customize:
- Primary and secondary colors
- Typography
- Component styles
- Breakpoints

### Replace Images
- Add your images to `src/assets/images/`
- Update image paths in `src/utils/data.js`
- Replace `public/Selva_Resume.pdf` with your resume

## 📧 Contact Form Setup

To enable the contact form:

1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Get your Service ID, Template ID, and User ID
3. Update `src/sections/Contact.jsx` with your credentials

## 🛠️ Technologies Used

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Material-UI v7** - Component library
- **Framer Motion** - Animation library
- **Emotion** - CSS-in-JS
- **EmailJS** - Email service
- **React Icons** - Icon library

## 📱 Sections

1. **Hero** - Introduction with profile image and social links
2. **About** - Personal bio and background
3. **Skills** - Technical skills with animated progress bars
4. **Experience** - Work history and education timeline
5. **Work** - Project showcase with links
6. **Awards** - Certificates and achievements gallery
7. **Contact** - Contact form for inquiries

## 🌐 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Drag and drop the 'dist' folder to Netlify
```

### GitHub Pages
```bash
npm run build
# Deploy the 'dist' folder to gh-pages branch
```

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

**Selva**
- LinkedIn: [selva-santhanam](https://www.linkedin.com/in/selva-santhanam)
- GitHub: [@Selva-AK](https://github.com/Selva-AK)
- Email: selvaak008@gmail.com

## 🙏 Acknowledgments

- Material-UI for the amazing component library
- Framer Motion for smooth animations
- React community for excellent documentation

---

⭐ Star this repo if you find it helpful!
