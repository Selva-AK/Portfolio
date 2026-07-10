// Import award images
import award1 from '../assets/images/1677170354507.jpg?url';
import award2 from '../assets/images/1677170002100.jpg?url';
import award3 from '../assets/images/1725700924030.jpg?url';
import award4 from '../assets/images/InShot_20250118_114231130.jpg?url';

// Import work images
import work1 from '../assets/images/work1.jpg?url';
import work2 from '../assets/images/work2.jpg?url';
import work3 from '../assets/images/work3.jpg?url';
import work4 from '../assets/images/work4.jpg?url';
import work5 from '../assets/images/work5.jpg?url';
import work6 from '../assets/images/work6.jpg?url';

// Import project images
import spendwise1 from '../assets/images/spendWise/img_1.jfif?url';
import spendwise2 from '../assets/images/spendWise/img_2.jfif?url';
import spendwise3 from '../assets/images/spendWise/img_3.jfif?url';
import spendwise4 from '../assets/images/spendWise/img_4.jfif?url';
import spendwise5 from '../assets/images/spendWise/img_5.jfif?url';
import spendwise6 from '../assets/images/spendWise/img_6.jfif?url';
import spendwise7 from '../assets/images/spendWise/img_7.jfif?url';

import dressstore1 from '../assets/images/dressStore/img_1.png?url';
import dressstore2 from '../assets/images/dressStore/img_2.png?url';
import dressstore3 from '../assets/images/dressStore/img_3.png?url';
import dressstore4 from '../assets/images/dressStore/img_4.png?url';
import dressstore5 from '../assets/images/dressStore/img_5.png?url';

import uptime1 from '../assets/images/uptime_monitor/img_1.png?url';
import uptime2 from '../assets/images/uptime_monitor/img_2.png?url';
import uptime3 from '../assets/images/uptime_monitor/img_3.png?url';
import uptime4 from '../assets/images/uptime_monitor/img_4.png?url';

// Portfolio data centralized for easy maintenance
export const personalInfo = {
  name: "Selva Santhanam",
  title: "< Programmer />",
  location: "Chennai, Tamil Nadu, India",
  email: "selvaak008@gmail.com",
  resumeUrl: "/Selva_Resume.pdf",
  social: {
    linkedin: "https://www.linkedin.com/in/selva-santhanam",
    github: "https://www.github.com/Selva-AK",
    facebook: "https://www.facebook.com/ajithselva.selva.319",
    instagram: "https://www.instagram.com/__the_lone_wolf____/",
  },
  bio: "I am currently based in Chennai, Tamil Nadu, India. I hold a Bachelor of Computer Applications (BCA) degree from M.R. Arts & Science College, Ariyalur, which I completed in May 2023 with a CGPA of 8 out of 10.",
};

export const skills = [
  {
    category: "< Front-End Development />",
    items: [
      { name: "React JS", percentage: 70 },
      { name: "HTML & CSS", percentage: 80 },
      { name: "JavaScript (ES6+)", percentage: 70 },
    ],
  },
  {
    category: "< Back-End Development />",
    items: [
      { name: "Node.js", percentage: 80 },
      { name: "Express.js", percentage: 88 },
      { name: "Python", percentage: 70 },
      { name: "Database Management", percentage: 90 },
    ],
  },
  {
    category: "< Cloud Services />",
    items: [{ name: "AWS (Amazon Web Services)", percentage: 70 }],
  },
  {
    category: "< Other />",
    items: [{ name: "Chatbot Development", percentage: 80 }],
  },
];

export const experience = [
  {
    title: "ImagiNET Venture",
    date: "June 2024 - Present",
    role: "Full-Stack Developer",
    type: "work",
  },
  {
    title: "ConnectedWorld Technology Solutions",
    date: "Aug 2023 - May 2024",
    role: "AWS Cloud Developer",
    type: "work",
  },
  {
    title: "Novalnet e-Solutions Pvt Ltd",
    date: "May 2023 - June 2023",
    role: "Web Developer - Intern",
    type: "work",
  },
  {
    title: "BCA at M.R. Arts & Science College",
    date: "2019 - 2023",
    role: "Graduated with 8.0/10 CGPA",
    type: "education",
  },
];

export const projects = [
  {
    id: 1,
    name: "SpendWise",
    description:
      "SpendWise is a mobile expense tracking application that helps users manage their daily spending efficiently. Users can set spending limits, track expenses, visualize data using pie charts, and export reports for better financial planning.",
    shortDescription: "Mobile app to track and manage daily expenses.",
    technologies: ["React Native"],
    features: [
      "Track daily expenses",
      "Set expense limits",
      "View expenses in pie chart",
      "Export reports",
      "Simple and user-friendly UI",
    ],
    images: [spendwise1, spendwise2, spendwise3, spendwise4, spendwise5, spendwise6, spendwise7],
    thumbnail: spendwise1,
    liveUrl: "",
    githubUrl: "",
    status: "Completed",
    duration: "1 Month",
    year: 2025,
  },
  {
    id: 2,
    name: "Dress Store",
    description:
      "Dress Store is an e-commerce web application where users can browse products based on categories, add items to cart or wishlist, and purchase them easily. It includes authentication and push notification features.",
    shortDescription: "E-commerce platform for browsing and purchasing clothes.",
    technologies: ["Next.js", "MySQL", "Tailwind CSS"],
    features: [
      "Browse products by category",
      "Add to cart and wishlist",
      "User login & signup",
      "Push notifications",
      "Purchase products",
      "Responsive design",
    ],
    images: [dressstore1, dressstore2, dressstore3, dressstore4, dressstore5],
    thumbnail: dressstore1,
    liveUrl: "",
    githubUrl: "",
    status: "Completed",
    duration: "2 Months",
    year: 2025,
  },
  {
    id: 3,
    name: "Uptime Monitor",
    description:
      "Uptime Monitor is a web application that allows users to monitor their websites. Users can set monitoring intervals, and the system checks the website status regularly and provides reports about uptime and performance.",
    shortDescription: "Track website uptime and performance.",
    technologies: ["Next.js", "MySQL", "Tailwind CSS"],
    features: [
      "User login & signup",
      "Add websites to monitor",
      "Set monitoring interval",
      "Track uptime and downtime",
      "View performance reports",
    ],
    images: [uptime1, uptime2, uptime3, uptime4],
    thumbnail: uptime1,
    liveUrl: "",
    githubUrl: "",
    status: "Completed",
    duration: "1.5 Months",
    year: 2025,
  },
];

export const awards = [
  {
    title: "Code Buster",
    image: award1,
  },
  {
    title: "Code Translation",
    image: award2,
  },
  {
    title: "Web Maker",
    image: award3,
  },
  {
    title: "Full-Stack Hero",
    image: award4,
  },
];

export const workImages = [
  work1,
  work2,
  work3,
  work4,
  work5,
  work6,
];
