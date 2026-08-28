import type { AiGeneratedResume } from "@/lib/types/AiGeneratedResume";

export const fakeResume: AiGeneratedResume = {
  personalInfo: {
    fullName: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    address: "San Francisco, CA 94102",
  },
  summary:
    "Results-driven Full Stack Developer with 5+ years of experience building scalable web applications. Specialized in React, Node.js, and cloud technologies. Passionate about creating intuitive user experiences and writing clean, maintainable code. Proven track record of leading development teams and delivering high-impact projects on time.",
  education: [
    {
      university: "University of California, Berkeley",
      degree: "Bachelor of Science",
      fieldOfStudy: "Computer Science",
      startDate: "2015-09",
      endDate: "2019-05",
      stillStudying: false,
    },
    {
      university: "Stanford University",
      degree: "Master of Science",
      fieldOfStudy: "Software Engineering",
      startDate: "2019-09",
      stillStudying: true,
    },
  ],
  experience: [
    {
      company: "TechCorp Solutions",
      position: "Senior Full Stack Developer",
      technologies: ["React", "Node.js", "Docker", "Kubernetes", "TypeScript"],
      responsibilities: [
        "Led a team of 5 developers in building a customer-facing e-commerce platform serving 100K+ users",
        "Architected and implemented microservices infrastructure using Node.js, Docker, and Kubernetes",
        "Reduced page load time by 40% through performance optimization and code refactoring",
        "Mentored junior developers and conducted code reviews to maintain high code quality standards",
      ],
      startDate: "2021-06",
      endDate: "Present",
    },
    {
      company: "StartupHub Inc",
      position: "Full Stack Developer",
      technologies: ["React", "Redux", "Express.js", "MongoDB", "OAuth 2.0"],
      responsibilities: [
        "Developed and maintained React-based web applications with Redux state management",
        "Built RESTful APIs using Express.js and integrated with MongoDB databases",
        "Implemented authentication and authorization using JWT and OAuth 2.0",
        "Collaborated with UX designers to create responsive and accessible user interfaces",
      ],
      startDate: "2019-07",
      endDate: "2021-05",
    },
    {
      company: "Digital Innovations",
      position: "Junior Developer",
      technologies: ["JavaScript", "HTML5", "CSS3", "Git"],
      responsibilities: [
        "Assisted in developing features for client websites using JavaScript, HTML, and CSS",
        "Participated in daily stand-ups and sprint planning meetings",
        "Fixed bugs and improved application performance based on user feedback",
      ],
      startDate: "2018-06",
      endDate: "2019-06",
    },
  ],
  skills: {
    technical: [
      "JavaScript",
      "TypeScript",
      "React",
      "Node.js",
      "Next.js",
      "Express.js",
      "MongoDB",
      "PostgreSQL",
      "Docker",
      "Kubernetes",
      "AWS",
      "Git",
    ],
    soft: [
      "Team Leadership",
      "Problem Solving",
      "Communication",
      "Agile Methodologies",
      "Project Management",
      "Mentoring",
    ],
    languages: [
      "English (Native)",
      "Spanish (Fluent)",
      "Mandarin (Conversational)",
    ],
  },
  projects: [
    {
      title: "E-Commerce Platform",
      technologies: ["React", "Node.js", "MongoDB", "Stripe API", "AWS"],
      features: [
        "Real-time inventory management system",
        "Integrated payment processing with multiple payment methods",
        "Advanced search and filtering with Elasticsearch",
        "Admin dashboard with analytics and reporting",
      ],
    },
    {
      title: "Task Management App",
      technologies: [
        "Next.js",
        "TypeScript",
        "PostgreSQL",
        "Prisma",
        "Tailwind CSS",
      ],
      features: [
        "Drag-and-drop task organization",
        "Team collaboration with real-time updates",
        "Custom notification system",
        "Mobile-responsive design",
      ],
    },
    {
      title: "Weather Forecast Dashboard",
      technologies: ["React", "OpenWeather API", "Chart.js", "Material-UI"],
      features: [
        "7-day weather forecast with hourly breakdowns",
        "Interactive weather maps and visualizations",
        "Location-based weather alerts",
        "Historical weather data analysis",
      ],
    },
  ],
};
