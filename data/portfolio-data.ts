import { EducationItem, LearningItem, Project, SkillItem } from "@/types/portfolio";

export const PERSONAL_INFO = {
  name: "Rushil",
  fullName: "Rushil Chilakamarri",
  title: "Software Engineer",
  subtitle: "Applied ML / Computer Vision & Backend Systems",
  headline: "I build complete systems end-to-end — from model to interface to deployment.",
  bioShort:
    "Recent Computer Science graduate (Data Science specialization) from Aurora's Technological and Research Institute, Hyderabad. I build working systems end-to-end with Python, applied ML (computer vision & NLP), and robust backend services in C# and ASP.NET Core.",
  location: "Hyderabad, India",
  email: "rushilchilakamarri@gmail.com",
  phone: "+91 9553843439",
  phoneDisplay: "+91 95538 43439",
  github: "https://github.com/Rushilch",
  githubUsername: "Rushilch",
  linkedin: "https://www.linkedin.com/in/rushil-chilakamarri/",
  resumeUrl: "/resume.pdf",
  seeking: "Entry-Level SWE Roles",
};

export const PROJECTS: Project[] = [
  {
    id: "vaaniverse",
    title: "VaaniVerse",
    tagline: "Real-Time Bidirectional Speech ↔ Indian Sign Language Pipeline (<200ms Latency Target)",
    category: "ml-cv",
    categoryLabel: "Applied ML & Computer Vision",
    status: "Completed",
    featured: true,
    githubUrl: "https://github.com/Rushilch/VaaniVerse",
    role: "System Designer & ML Engineer",
    problemStatement:
      "Bridging the communication barrier between hearing-impaired individuals using Indian Sign Language (ISL) and non-signers requires a fast, low-latency bidirectional bridge that can process both video gestures and live speech without cloud lag.",
    keyChallenge:
      "Achieving sub-200ms end-to-end latency for continuous gesture recognition on standard consumer webcams without heavy GPU requirements, while handling noisy landmark extractions.",
    solutionArchitecture:
      "Engineered a bidirectional pipeline. In Sign→Speech mode, MediaPipe extracts 21 hand and pose landmarks in real time, normalizes coordinate spatial vectors, classifies gestures with a tuned KNN model, and invokes gTTS / googletrans for multilingual audio. In Speech→Sign mode, live audio is tokenized and mapped to sequential ISL sign avatars.",
    pipelineSteps: [
      {
        step: "01",
        title: "Frame Capture & Landmark Extraction",
        tech: "OpenCV + MediaPipe",
        description: "Extracts 21 3D hand coordinates per hand frame-by-frame with low CPU overhead.",
      },
      {
        step: "02",
        title: "Vector Normalization",
        tech: "NumPy",
        description: "Normalizes hand translation and scale to ensure invariant distance metrics across different camera distances.",
      },
      {
        step: "03",
        title: "KNN Classification",
        tech: "Scikit-Learn KNN",
        description: "Executes ultra-fast classification against verified ISL gesture vectors in <15ms inference time.",
      },
      {
        step: "04",
        title: "Synthesis & Audio Stream",
        tech: "gTTS + googletrans",
        description: "Converts classified gesture text into localized speech and triggers instant multilingual audio playback.",
      },
    ],
    techStack: ["Python", "MediaPipe", "Scikit-Learn (KNN)", "OpenCV", "googletrans", "gTTS", "NumPy"],
    highlights: [
      "Targeted and benchmarked pipeline steps for real-time sub-200ms response window",
      "Full bidirectional workflow: Sign → Speech/Text and Spoken Audio → Sign Sequences",
      "Normalized coordinate system making gesture recognition invariant to distance from webcam",
      "Integrated multilingual translation supporting localized Indian speech output",
    ],
    metrics: [
      {
        label: "Target Latency",
        value: "<200ms",
        detail: "End-to-end frame to speech classification target",
      },
      {
        label: "Landmark Tracking",
        value: "21 Points",
        detail: "Continuous 3D hand coordinate mapping via MediaPipe",
      },
      {
        label: "Architecture",
        value: "Bidirectional",
        detail: "Sign→Speech & Speech→Sign translation loops",
      },
    ],
    interactiveType: "pipeline",
  },
  {
    id: "smartinbox",
    title: "SmartInbox",
    tagline: "AI-Augmented Email Platform (Flask + Groq/LLaMA 3.1 8B + SQLite)",
    category: "backend-systems",
    categoryLabel: "Backend & NLP Integration",
    status: "Completed",
    featured: true,
    githubUrl: "https://github.com/Rushilch/Email",
    role: "Full-Stack & NLP Engineer",
    problemStatement:
      "Standard email clients lack contextual intelligence, requiring users to manually triage incoming messages, assess urgency/tone, and spend time summarizing dense correspondence and drafting polite responses.",
    keyChallenge:
      "Engineering a monolithic Flask application with a Groq API utility layer running LLaMA 3.1 8B Instant to execute 4 synchronous NLP pipelines (14-label Tone Classification, Spam Detection, Extractive Summarization, Tone Rewriting) alongside raw SQLite persistence and Gmail SMTP transport.",
    solutionArchitecture:
      "Constructed a Flask application backed by SQLite (Sbox.db) and Bcrypt session auth. Outbound flow: compose form → optional Groq pre-send tone analysis & tone rewriter → SMTP dispatch via Gmail or internal DB insert. Inbound flow: stored message → on open, Groq classifies tone into 14 labels, flags spam, and extracts 2-3 sentence summary. Includes an admin analytics dashboard with Chart.js visualization.",
    pipelineSteps: [
      {
        step: "01",
        title: "Session Auth & Message Ingestion",
        tech: "Flask + Bcrypt + SQLite",
        description: "Bcrypt-hashed session authentication, raw SQLite3 queries against Sbox.db, and Gmail SMTP integration.",
      },
      {
        step: "02",
        title: "14-Label Tone & Spam Pipeline",
        tech: "Groq API · LLaMA 3.1 8B",
        description: "Single-token prompt classification mapping body text to 14 predefined tone labels (Urgent, Friendly, Formal, etc.) and binary spam flags.",
      },
      {
        step: "03",
        title: "Inline Extractive Summarization",
        tech: "LLaMA 3.1 Prompt Engine",
        description: "Constrained 2–3 sentence executive summary generated on message open and cached in Sbox.db.",
      },
      {
        step: "04",
        title: "Tone Rewriter & Admin Analytics",
        tech: "Groq Inference + Chart.js",
        description: "User-reviewed pre-send tone rewrite assistant, plus Chart.js admin dashboard visualizing tone distributions and email volumes.",
      },
    ],
    techStack: ["Python 3", "Flask", "Groq API", "LLaMA 3.1 8B Instant", "SQLite (sqlite3)", "Bcrypt", "Bootstrap 5", "Chart.js", "Gmail SMTP"],
    highlights: [
      "Groq API integration running LLaMA 3.1 8B Instant for sub-second NLP analysis",
      "4 specialized prompt pipelines: 14 Tone Labels, Spam Detection, 2-3 sentence Summarization, and User-Reviewed Tone Rewriter",
      "Chart.js Admin Dashboard surfacing active users, email volumes over time, spam counts, and tone distributions",
      "Honest systems understanding: documented synchronous LLM thread blocking limitations and planned async Celery+Redis task queuing roadmap",
    ],
    metrics: [
      {
        label: "AI Model",
        value: "LLaMA 3.1 8B",
        detail: "Groq API instant inference wrapper (llama_utils.py)",
      },
      {
        label: "NLP Tasks",
        value: "4 Pipelines",
        detail: "Tone (14 labels), Spam, Summarization, Tone Rewriter",
      },
      {
        label: "Storage & Auth",
        value: "SQLite + Bcrypt",
        detail: "Sbox.db raw SQL schema with session authentication",
      },
    ],
    interactiveType: "llm-triage",
  },
  {
    id: "ecovision",
    title: "EcoVision",
    tagline: "Explainable Environmental Risk Prediction System (SHAP + LIME Interpretability)",
    category: "ml-cv",
    categoryLabel: "Applied ML & Data Science",
    status: "Completed",
    featured: true,
    githubUrl: "https://github.com/Rushilch/EcoVision",
    role: "ML & Explainability Engineer",
    problemStatement:
      "Most environmental risk models function as opaque black boxes, delivering risk scores without actionable explanations for which specific ecological factors (PM2.5, NOx, humidity spikes, thermal shifts) drove the prediction.",
    keyChallenge:
      "Integrating mathematically rigorous model-agnostic explainability (SHAP & LIME) directly into inference pipelines without making explanations incomprehensible to end users.",
    solutionArchitecture:
      "Trained gradient boosting & ensemble regression models on multi-feature environmental datasets, and layered both global SHAP TreeExplainer and local LIME tabular explainers on top to output exact feature attribution waterfalls for every prediction.",
    pipelineSteps: [
      {
        step: "01",
        title: "Data Ingestion & Feature Engineering",
        tech: "Pandas + Scikit-Learn",
        description: "Processes multivariate sensor feeds: particulate matter (PM2.5, PM10), temperature, humidity, and gas indices.",
      },
      {
        step: "02",
        title: "Ensemble Risk Modeling",
        tech: "Gradient Boosting / Random Forest",
        description: "Predicts composite environmental risk index scores and alert thresholds.",
      },
      {
        step: "03",
        title: "SHAP Global & Local Attribution",
        tech: "SHAP (Shapley Additive exPlanations)",
        description: "Computes exact Shapley values to reveal how much each feature pushes the risk index above or below baseline.",
      },
      {
        step: "04",
        title: "LIME Local Surrogates",
        tech: "LIME Tabular Explainer",
        description: "Generates localized linear approximations to verify decision boundary stability around individual anomalies.",
      },
    ],
    techStack: ["Python", "SHAP", "LIME", "Scikit-Learn", "Pandas", "Matplotlib", "NumPy"],
    highlights: [
      "Built explainability as a first-class citizen rather than an afterthought",
      "Inspectable feature contributions preventing ungrounded model hallucinations",
      "Combines global feature importance (SHAP) with local point perturbation (LIME)",
      "Provides actionable breakdowns for policy analysts and environmental researchers",
    ],
    metrics: [
      {
        label: "Explainability",
        value: "SHAP + LIME",
        detail: "Dual global and local attribution breakdown",
      },
      {
        label: "Model Trust",
        value: "Inspectable",
        detail: "Every prediction linked to quantifiable feature weights",
      },
      {
        label: "Input Dimensions",
        value: "Multivariate",
        detail: "Particulates, gases, humidity, temperature variances",
      },
    ],
    interactiveType: "shap",
  },
  {
    id: "school-portal",
    title: "School Portal",
    tagline: "Multi-Service Containerized School Management Backend (ASP.NET Core + Docker + SQL Server)",
    category: "backend-systems",
    categoryLabel: "Backend & Systems Depth",
    status: "In Active Development",
    featured: true,
    githubUrl: "https://github.com/Rushilch/School-Portal",
    role: "Backend Architect & Developer",
    problemStatement:
      "Educational institutions require decoupled, reliable backend services for managing student records, academic curricula, enrollments, and grading without tight monolithic coupling.",
    keyChallenge:
      "Architecting clean multi-service separation, containerizing the ASP.NET Core runtime with SQL Server via Docker Compose, and establishing secure role-based access control (RBAC).",
    solutionArchitecture:
      "Designed a modular multi-service backend with ASP.NET Core Web APIs, Entity Framework Core for relational persistence against Microsoft SQL Server, containerized with Docker. Currently implementing ASP.NET Core Identity for granular RBAC (Admin, Teacher, Student roles) with JWT tokens.",
    pipelineSteps: [
      {
        step: "01",
        title: "ASP.NET Core Web API Gateway",
        tech: "C# / ASP.NET Core",
        description: "Structured REST endpoints with dependency injection, validation filters, and standardized error responses.",
      },
      {
        step: "02",
        title: "Data Access Layer & ORM",
        tech: "Entity Framework Core",
        description: "Code-First migrations, optimized LINQ queries, and relational mapping for Students, Courses, and Grades.",
      },
      {
        step: "03",
        title: "Relational Persistence",
        tech: "Microsoft SQL Server",
        description: "Normalized relational schema with foreign key constraints, indexed lookups, and transactional consistency.",
      },
      {
        step: "04",
        title: "Containerization & Orchestration",
        tech: "Docker + Docker Compose",
        description: "Isolated multi-container bridge network for seamless development, testing, and deployment repeatability.",
      },
    ],
    techStack: ["C#", "ASP.NET Core", "Entity Framework Core", "SQL Server", "Docker", "Docker Compose", "REST APIs"],
    highlights: [
      "Multi-service backend architecture with clean separation of concerns",
      "Docker-containerized services with automated health checks and persistent SQL volumes",
      "Relational data model with EF Core Code-First migrations",
      "Planned & In Progress: ASP.NET Core Identity + Role-Based Access Control (RBAC)",
    ],
    metrics: [
      {
        label: "Architecture",
        value: "Multi-Service",
        detail: "Decoupled API services communicating over REST",
      },
      {
        label: "Containerization",
        value: "Docker Compose",
        detail: "Isolated services & SQL Server data volume",
      },
      {
        label: "Security (WIP)",
        value: "Identity + RBAC",
        detail: "Token-based auth with granular role permissions",
      },
    ],
    interactiveType: "topology",
  },
  {
    id: "exam-proctoring",
    title: "Exam Proctoring System",
    tagline: "Automated Examination Integrity Monitoring using Computer Vision",
    category: "ml-cv",
    categoryLabel: "Computer Vision & Edge ML",
    status: "Completed",
    featured: false,
    githubUrl: "https://github.com/Rushilch/Exam-Proctoring",
    role: "Computer Vision Developer",
    problemStatement:
      "Remote and digital assessments require non-intrusive, automated integrity checks to detect multi-person intrusion, excessive gaze aversion, and head rotation anomalies without intrusive hardware.",
    keyChallenge:
      "Filtering out natural micro-movements and lighting variations to avoid false positive anomaly flags during legitimate test-taking sessions.",
    solutionArchitecture:
      "Developed a computer vision pipeline in Python and OpenCV that performs real-time face detection, 3D head pose estimation (yaw, pitch, roll angles), eye aspect ratio (EAR) analysis, and secondary person intrusion detection with temporal smoothing.",
    pipelineSteps: [
      {
        step: "01",
        title: "Facial Landmark Detection",
        tech: "OpenCV + Dlib / Haar Cascades",
        description: "Tracks key facial points (pupils, nose tip, chin, jawline) across video frames.",
      },
      {
        step: "02",
        title: "Head Pose Estimation",
        tech: "Perspective-n-Point (PnP) Solver",
        description: "Calculates continuous Euler angles (yaw, pitch, roll) to detect when a student looks away from the screen.",
      },
      {
        step: "03",
        title: "Multi-Person & Absence Detection",
        tech: "Object Detection",
        description: "Flags unauthorized background persons or absence from camera view.",
      },
      {
        step: "04",
        title: "Temporal Anomaly Logging",
        tech: "Python Event Stream",
        description: "Applies sliding window thresholds to record timestamped incident logs for proctor review.",
      },
    ],
    techStack: ["Python", "OpenCV", "NumPy", "Head Pose Estimation", "Gaze Tracking"],
    highlights: [
      "Real-time 3D head pose estimation via Perspective-n-Point mathematical solver",
      "Temporal window smoothing preventing false alarms from natural blinks or small adjustments",
      "Multi-face intrusion detection alerting when unauthorized persons enter the camera frame",
      "Lightweight architecture runs on standard consumer webcam hardware",
    ],
    metrics: [
      {
        label: "Tracking",
        value: "Head Pose + Gaze",
        detail: "3D Euler angle estimation (Yaw, Pitch, Roll)",
      },
      {
        label: "Anomaly Engine",
        value: "Temporal Window",
        detail: "Multi-person, gaze aversion, and absence triggers",
      },
    ],
    interactiveType: "cv-proctor",
  },
  {
    id: "mvvm-todo",
    title: "MVVM Todo App",
    tagline: "Clean Architecture Desktop Application in C# and WPF",
    category: "desktop-tools",
    categoryLabel: "Desktop & Clean Architecture",
    status: "Completed",
    featured: false,
    githubUrl: "https://github.com/Rushilch/WPF-MVVM-Todo",
    role: "Desktop Software Engineer",
    problemStatement:
      "Demonstrating clean software engineering architecture, decoupled testable code, and strict separation between presentation and business logic on desktop platforms.",
    keyChallenge:
      "Implementing custom `ICommand` bindings, two-way data binding, and `INotifyPropertyChanged` notification events without polluting the ViewModel with UI-layer dependencies.",
    solutionArchitecture:
      "Built a desktop task management application in C# and Windows Presentation Foundation (WPF) with strict Model-View-ViewModel (MVVM) architecture, XAML declarative UI, custom RelayCommands, and decoupled state management.",
    pipelineSteps: [
      {
        step: "01",
        title: "Declarative View Layer",
        tech: "XAML",
        description: "Separates UI styling and layout completely from application logic with zero code-behind.",
      },
      {
        step: "02",
        title: "Data-Binding & Commands",
        tech: "ICommand + RelayCommand",
        description: "Binds user actions (add, complete, filter, delete) directly to ViewModel command handlers.",
      },
      {
        step: "03",
        title: "ViewModel State & Observable Collections",
        tech: "INotifyPropertyChanged",
        description: "Manages reactive state updates and observable lists with decoupled event dispatching.",
      },
      {
        step: "04",
        title: "Model & Data Persistence",
        tech: "C# POCO Models",
        description: "Pure C# domain objects representing task entities, priorities, and serialization.",
      },
    ],
    techStack: ["C#", ".NET", "WPF", "XAML", "MVVM Pattern", "Data Binding"],
    highlights: [
      "Strict MVVM design pattern with zero logic in XAML code-behind",
      "Clean data-binding architecture with `INotifyPropertyChanged` notifications",
      "Custom `RelayCommand` implementation for decoupled command execution",
      "Demonstrates desktop software engineering discipline alongside ML/backend skills",
    ],
    metrics: [
      {
        label: "Pattern",
        value: "MVVM",
        detail: "Strict Model-View-ViewModel separation of concerns",
      },
      {
        label: "Framework",
        value: "C# / WPF",
        detail: "XAML declarative UI with two-way data binding",
      },
    ],
    interactiveType: "mvvm",
  },
];

export const SKILLS: SkillItem[] = [
  // Languages
  {
    name: "Python",
    category: "Languages",
    level: "Proficient",
    projects: ["vaaniverse", "smartinbox", "ecovision", "exam-proctoring"],
    description: "Primary language for Applied ML, Computer Vision, Groq/LLaMA NLP pipelines, and Flask backends.",
  },
  {
    name: "C#",
    category: "Languages",
    level: "Proficient",
    projects: ["school-portal", "mvvm-todo"],
    description: "Core language for backend enterprise services (ASP.NET Core) and desktop software (WPF).",
  },
  {
    name: "Java",
    category: "Languages",
    level: "Working Knowledge",
    projects: [],
    description: "Object-oriented programming, data structures & algorithms implementation.",
  },
  {
    name: "JavaScript / TypeScript",
    category: "Languages",
    level: "Working Knowledge",
    projects: [],
    description: "Modern frontend web development, Next.js, and API integration.",
  },
  {
    name: "SQL",
    category: "Languages",
    level: "Proficient",
    projects: ["smartinbox", "school-portal"],
    description: "Relational schema design, SQLite queries in SmartInbox, and SQL Server EF Core migrations.",
  },

  // Backend & Systems
  {
    name: "Flask",
    category: "Backend & Systems",
    level: "Proficient",
    projects: ["smartinbox"],
    description: "Monolithic Flask application architecture, Bcrypt session auth, and Groq/LLaMA utility wrappers.",
  },
  {
    name: "ASP.NET Core",
    category: "Backend & Systems",
    level: "Actively Deepening",
    projects: ["school-portal"],
    description: "Building robust REST APIs, dependency injection, middleware pipelines, and Identity.",
  },
  {
    name: "Entity Framework Core",
    category: "Backend & Systems",
    level: "Proficient",
    projects: ["school-portal"],
    description: "ORM for relational data persistence, Code-First migrations, and optimized LINQ queries.",
  },
  {
    name: "Docker & Docker Compose",
    category: "Backend & Systems",
    level: "Proficient",
    projects: ["school-portal"],
    description: "Multi-container application packaging, network bridging, and volume isolation.",
  },
  {
    name: "SQL Server & SQLite",
    category: "Backend & Systems",
    level: "Proficient",
    projects: ["smartinbox", "school-portal"],
    description: "SQLite (Sbox.db raw SQL) and Microsoft SQL Server enterprise database configurations.",
  },
  {
    name: "REST APIs & SMTP",
    category: "Backend & Systems",
    level: "Proficient",
    projects: ["smartinbox", "school-portal", "vaaniverse"],
    description: "Designing structured JSON endpoints, Gmail SMTP dispatch with App Passwords, and Groq API wrappers.",
  },

  // ML & Data Science
  {
    name: "Groq API & LLaMA 3.1 8B",
    category: "ML & Data Science",
    level: "Proficient",
    projects: ["smartinbox"],
    description: "Prompt engineering for 14-label Tone Classification, Spam Detection, Extractive Summaries & Tone Rewriter.",
  },
  {
    name: "MediaPipe",
    category: "ML & Data Science",
    level: "Proficient",
    projects: ["vaaniverse"],
    description: "Real-time hand and body pose landmark extraction for computer vision pipelines.",
  },
  {
    name: "OpenCV",
    category: "ML & Data Science",
    level: "Proficient",
    projects: ["vaaniverse", "exam-proctoring"],
    description: "Computer vision image processing, feature mapping, facial tracking, and video stream decoding.",
  },
  {
    name: "SHAP & LIME",
    category: "ML & Data Science",
    level: "Proficient",
    projects: ["ecovision"],
    description: "Model-agnostic explainability, Shapley value computations, and local linear surrogates.",
  },
  {
    name: "Scikit-Learn",
    category: "ML & Data Science",
    level: "Proficient",
    projects: ["vaaniverse", "ecovision"],
    description: "Classical ML classifiers, KNN, regression models, feature scaling, and evaluation metrics.",
  },
  {
    name: "Pandas & NumPy",
    category: "ML & Data Science",
    level: "Proficient",
    projects: ["ecovision", "vaaniverse", "exam-proctoring"],
    description: "Vectorized data processing, feature engineering, and matrix operations.",
  },

  // Desktop & Tools
  {
    name: "WPF (C#)",
    category: "Desktop & Tools",
    level: "Proficient",
    projects: ["mvvm-todo"],
    description: "Desktop application development with XAML UI and MVVM separation.",
  },
  {
    name: "Chart.js & Bootstrap",
    category: "Desktop & Tools",
    level: "Proficient",
    projects: ["smartinbox"],
    description: "Admin analytics dashboards, tone distribution charts, and email volume trends.",
  },
  {
    name: "Git & GitHub",
    category: "Desktop & Tools",
    level: "Proficient",
    projects: ["vaaniverse", "smartinbox", "school-portal", "ecovision", "exam-proctoring", "mvvm-todo"],
    description: "Branching workflows, version control, issue tracking, and repository management.",
  },
];

export const CURRENTLY_LEARNING: LearningItem[] = [
  {
    topic: "ASP.NET Core Systems Depth",
    category: "Backend Engineering",
    progress: 75,
    status: "Deepening",
    description:
      "Deepening production-grade backend skills in C# and .NET. Focusing on advanced Entity Framework Core query optimization, JWT authentication, integration testing with WebApplicationFactory, and ASP.NET Core Identity RBAC.",
    focusAreas: [
      "ASP.NET Core Identity & Role-Based Access Control (RBAC)",
      "EF Core compiled queries, split queries, and indexing strategies",
      "JWT Authentication & Refresh Token rotation",
      "Unit & Integration testing with xUnit & Moq",
    ],
    keyResources: "Microsoft Learn Docs, C# 12 & .NET 8 in a Nutshell, Architecture Microservices Guide",
  },
  {
    topic: "Async Task Queuing & Distributed Backends",
    category: "Distributed Systems",
    progress: 60,
    status: "Deepening",
    description:
      "Transitioning synchronous LLM and worker pipelines (like in SmartInbox) to async background task queues using Celery and Redis to prevent request thread blocking at scale.",
    focusAreas: [
      "Celery worker architecture & Redis message broker configuration",
      "Async LLM inference job dispatch and webhook status callbacks",
      "SSE (Server-Sent Events) & WebSockets for real-time notification push",
      "PostgreSQL connection pooling under concurrent write loads",
    ],
    keyResources: "Celery Architecture Guides, Redis In-Memory Patterns, Real-Time Distributed Systems",
  },
  {
    topic: "Cybersecurity Fundamentals",
    category: "Systems & Security",
    progress: 45,
    status: "Exploring",
    description:
      "Exploring core networking and security foundations (CompTIA Network+ roadmap concepts) to write more resilient, secure backend systems and understand low-level protocol interactions.",
    focusAreas: [
      "TCP/IP and OSI model protocol packet flow",
      "Transport Layer Security (TLS/HTTPS) & PKI infrastructure",
      "Network subnetting, routing tables, and firewall rules",
      "Common vulnerability patterns (OWASP Top 10, Auth flaws, injection)",
    ],
    keyResources: "CompTIA Network+ Study Guide, Professor Messer, RFC standards & Wireshark analysis",
  },
];

export const EDUCATION: EducationItem[] = [
  {
    institution: "Aurora's Technological and Research Institute",
    degree: "Bachelor of Technology (B.Tech)",
    specialization: "Computer Science and Engineering — Data Science Specialization",
    period: "Graduated",
    score: "7.67",
    scoreLabel: "CGPA",
    location: "Hyderabad, India",
    coursework: [
      "Data Structures & Algorithms",
      "Machine Learning & Applied AI",
      "Database Management Systems (DBMS)",
      "Operating Systems",
      "Computer Networks",
      "Object-Oriented Programming (Java/C++)",
    ],
    highlights: [
      "Specialized coursework in Data Science, statistical modeling, and applied Machine Learning",
      "Built complete engineering capstone and self-directed systems projects alongside coursework",
      "Grounded foundational understanding of algorithmic complexity, memory management, and system architecture",
    ],
  },
  {
    institution: "Sri Gayatri Junior College",
    degree: "Intermediate Education (Class XII)",
    specialization: "MPC (Mathematics, Physics, Chemistry)",
    period: "Completed",
    score: "79.5%",
    scoreLabel: "Percentage",
    location: "Hyderabad, India",
    coursework: ["Advanced Mathematics (Calculus, Linear Algebra)", "Physics", "Chemistry"],
    highlights: [
      "Rigorous training in mathematical foundations, calculus, and analytical problem solving",
      "Established core quantitative basis for data science and machine learning algorithms",
    ],
  },
];

export const PHILOSOPHY_PILLARS = [
  {
    title: "1. Build Complete Systems",
    tagline: "End-to-End Ownership",
    description:
      "A machine learning model in a Jupyter Notebook is an experiment, not a software product. I care about taking ideas from data ingestion and model training all the way to structured backend APIs, containerization, and usable interfaces.",
  },
  {
    title: "2. Constraints & Interpretability",
    tagline: "Performance & Inspectability Matter",
    description:
      "Whether it's hitting a sub-200ms latency target for real-time sign language processing or using SHAP/LIME to explain why an environmental risk model flagged an anomaly, engineering means respecting latency budgets and delivering inspectable decisions.",
  },
  {
    title: "3. Grounded Engineering & Honesty",
    tagline: "Clean Architecture & Continuous Growth",
    description:
      "I don't claim to have built planetary-scale infrastructure with millions of enterprise users. Instead, I write clean, well-architected software (MVVM, multi-service Docker setups, EF Core relational models) and proactively invest in deepening my systems knowledge every day.",
  },
];
