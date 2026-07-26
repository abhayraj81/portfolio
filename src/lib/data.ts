// All content sourced directly from Abhay Raj's resume. No invented data.

export const personal = {
  name: "Abhay Raj",
  role: "Software Development & Technical Support Engineer",
  location: "Kanpur, U.P, India",
  email: "abhay.ark12@gmail.com",
  linkedin: "https://linkedin.com/in/abhayraj081",
  linkedinLabel: "linkedin.com/in/abhayraj081",
  github: "https://github.com/abhayraj81",
  githubLabel: "github.com/abhayraj81",
  phone: "+91-8896260602",
  resumeFile: "/Abhay_Raj_Resume.pdf",
  summary:
    "MCA student skilled in Java, Spring Boot, Spring MVC, and RESTful API development, with frontend proficiency in HTML, CSS, and JavaScript, and Python for data analysis. Built layered REST APIs with Spring Data JPA and responsive web applications, backed by certifications in Python for Data Science (IBM) and AI for Data Analysis (Google).",
  tagline: "Precision, carried from the workbench to the codebase.",
};

export const heroWords = ["Backend", "Systems", "APIs", "Interfaces"];

export const skillGroups = [
  {
    label: "Languages",
    items: ["Java", "Python", "C", "C++", "SQL"],
  },
  {
    label: "Web Technologies",
    items: ["Spring Boot", "Spring MVC", "REST APIs", "HTML5", "CSS3", "JavaScript"],
  },
  {
    label: "Databases",
    items: ["MySQL", "MongoDB", "H2", "Firebase Firestore", "SQL"],
  },
  {
    label: "Frameworks & Libraries",
    items: ["Spring Data JPA", "Hibernate", "ModelMapper", "Lombok", "Maven"],
  },
  {
    label: "Cloud & Tools",
    items: [
      "Git",
      "GitHub",
      "Firebase",
      "Salesforce CRM",
      "Postman",
      "Power BI",
      "Overleaf",
      "VS Code",
      "IntelliJ IDEA",
    ],
  },
];

export const experience = [
  {
    id: "iaf",
    role: "Apprenticeship",
    org: "Indian Air Force Station",
    location: "Kanpur, Uttar Pradesh",
    start: "Jul 2023",
    end: "Jul 2024",
    points: [
      "Operated and maintained 2 types of CNC machines and Lathe machines as part of technical training.",
      "Calibrated AN-32 Aircraft instruments and machine settings, ensuring precise measurements and optimal operational functionality.",
    ],
  },
  {
    id: "music",
    role: "Music Instructor",
    org: "Samarpan Sangeet Kala Academy",
    location: "Kanpur, Uttar Pradesh",
    start: "Aug 2024",
    end: "Jul 2025",
    points: ["Working as a Music Teacher, mentoring students in Guitar and Piano classes."],
  },
];

export const projects = [
  {
    id: "employee-management-apis",
    title: "Employee Management System APIs",
    subtitle: "Backend REST API Project",
    period: "Jun 2026",
    link: "https://github.com/abhayraj81/SpringBoot-MVC-and-RESTful-APIs",
    linkLabel: "View on GitHub",
    stack: ["Java", "Spring Boot", "Spring Data JPA", "ModelMapper", "REST APIs", "MySQL"],
    summary:
      "A layered REST API for employee management, built around clean DTO boundaries, centralized error handling, and role-based access control.",
    points: [
      {
        label: "Validation",
        detail:
          "Engineered DTO-based request/response mapping using ModelMapper and a custom @EmployeeRoleValidation annotation for role-based bean validation, reducing validation errors by 10%.",
      },
      {
        label: "Error Handling",
        detail:
          "Designed a centralized exception handling system with @RestControllerAdvice and @ResponseBodyAdvice for uniform API responses, achieving a 15% decrease in response time for error handling.",
      },
      {
        label: "Security",
        detail:
          "Integrated role-based access control to secure sensitive employee data, supporting over 100 concurrent users without performance degradation.",
      },
    ],
    depth: "deep",
  },
  {
    id: "samarpan-sansthan",
    title: "Samarpan Sansthan — NGO Website",
    subtitle: "Frontend / Web Development Project",
    period: "Nov 2023 – Dec 2023",
    link: "https://samarpansansthan.com/",
    linkLabel: "Visit Site",
    stack: ["HTML5", "CSS3", "JavaScript", "ARIA / WCAG 2.1 AA"],
    summary:
      "A fully responsive, accessibility-first NGO website spanning 7 pages, built for cross-device reach and inclusive usability.",
    points: [
      {
        label: "Accessibility",
        detail:
          "Developed a fully responsive NGO website with 7 pages meeting WCAG 2.1 AA accessibility standards for cross-device compatibility.",
      },
      {
        label: "Interface",
        detail:
          "Engineered a user-friendly interface, optimizing layout and navigation for mobile, tablet, and desktop devices, estimated to improve user engagement by 30%.",
      },
      {
        label: "Semantics",
        detail:
          "Enhanced web accessibility by implementing ARIA landmarks, semantic HTML5, keyboard navigation, and screen-reader support.",
      },
    ],
    depth: "concise",
  },
];

export const certifications = [
  {
    id: "mern",
    title: "Full Stack MERN Development",
    issuer: "RCPL Group × Allenhouse Institute of Technology",
    date: "In Progress",
    note: "MongoDB, Express, React, Node.js",
  },
  {
    id: "google-ai",
    title: "AI for Data Analysis",
    issuer: "Google",
    date: "Mar 2026",
  },
  {
    id: "ibm-python",
    title: "Python for Data Science, AI & Development",
    issuer: "IBM",
    date: "Mar 2026",
  },
  {
    id: "deloitte-tech",
    title: "Technology Job Simulation",
    issuer: "Deloitte Australia",
    date: "Jun 2026",
  },
  {
    id: "deloitte-data",
    title: "Data Analytics Job Simulation",
    issuer: "Deloitte Australia",
    date: "Jun 2026",
  },
];

export const education = [
  {
    id: "mca",
    degree: "Master of Computer Applications (MCA)",
    school: "Allenhouse Institute of Technology, Kanpur, Uttar Pradesh",
    period: "2025 – 2027",
    detail: "Relevant Coursework: DBMS, Data Structures, Operating Systems, Web Technologies",
  },
  {
    id: "bsc",
    degree: "Bachelor of Science (BSc)",
    school: "Vishram Singh Shanti Devi Mahavidyalaya, Kanpur, Uttar Pradesh",
    period: "2020 – 2023",
  },
  {
    id: "xii",
    degree: "Senior Secondary (Class XII)",
    school: "Kendriya Vidyalaya AFS, Kanpur, Uttar Pradesh",
    period: "2019 – 2020",
  },
  {
    id: "x",
    degree: "Secondary (Class X)",
    school: "Kendriya Vidyalaya RV, Kanpur, Uttar Pradesh",
    period: "2017 – 2018",
  },
];
