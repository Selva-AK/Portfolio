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
    title: "Tourism Website",
    description:
      "Developed a dynamic tourism website with Node.js and Express. Features included spot discovery, media uploads, and an admin panel for easy form modifications.",
    link: "https://github.com/Selva-AK/Video-uploading-task.git",
    type: "github",
  },
  {
    title: "College Management System",
    description:
      "Built a comprehensive college management system using PHP and MySQL. Streamlined admission processes and department management.",
    link: "https://github.com/Selva-AK/CollegeManagementSystem.git",
    type: "github",
  },
  {
    title: "Webhook App",
    description:
      "Overview: This Express web application receives data into the app server for an account and sends it across different platforms (destinations) using webhook URLs.",
    link: "https://github.com/Selva-AK/NodeJS-webhook-app",
    type: "github",
  },
  {
    title: "Thirukkural Chatbot",
    description:
      "Developed a chatbot powered by AWS Titan and ChatGPT to answer questions about Thirukkural. The application helps users explore and understand the ancient Tamil literature with real-time responses.",
    link: "https://d1lej5tbmppkkm.cloudfront.net/",
    type: "live",
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
