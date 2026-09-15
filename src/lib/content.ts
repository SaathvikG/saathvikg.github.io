import charterDisplayImg from '@/assets/charger-display-board.png'
import embeddedBoardImg from '@/assets/embedded-control-schematic.png'
import adhdPosterImg from '@/assets/adhd-mri-poster.jpg'
import recidivismPosterImg from '@/assets/recidivism-bias-poster.jpg'

export const profile = {
  name: 'Saathvik Gubbala',
  role: 'Electrical Engineering & Materials Science',
  school: 'Carnegie Mellon University',
  tagline: 'Building embedded systems and PCBs, one board at a time.',
  bio: "Hello! I'm Saathvik, a sophomore studying Electrical Engineering and Materials Science at Carnegie Mellon University.",
  bioExtra:
    'I like understanding how things work at every level — from the materials they\'re made of to the systems they power.',
  location: 'Pittsburgh, PA',
  email: 'sgubbala@andrew.cmu.edu',
  linkedin: 'https://www.linkedin.com/in/saathvik-gubbala-2714832a3/',
  gpa: '3.6',
  gradYear: 'Dec 2028'
}

export type ExperienceItem = {
  role: string
  org: string
  location: string
  period: string
  tag: string
  bullets: string[]
}

export const experience: ExperienceItem[] = [
  {
    role: 'Software Engineering Intern',
    org: 'Commvault',
    location: 'Tinton Falls, NJ',
    period: 'May 2026 – Aug 2026',
    tag: 'Internship',
    bullets: [
      'Architected a full-stack PII redaction pipeline with a FastAPI backend, combining GLiNER-based entity detection, regex, and rule-based matching across 15+ file formats.',
      'Built a configurable redaction engine supporting semantic and full redaction modes, native-format and PDF export, and user-defined sensitive fields via GUI and API.',
      'Delivered real-time progress tracking, advanced reporting, and QA validation integrated into Compliance Search for enterprise data governance.'
    ]
  },
  {
    role: 'Teaching Assistant — 18-100 Intro to ECE',
    org: 'Carnegie Mellon University',
    location: 'Pittsburgh, PA',
    period: 'Aug 2026 – Present',
    tag: 'Teaching',
    bullets: [
      'Guided 180 students hands-on through breadboarding, embedded programming, and waveform analysis with multimeters, oscilloscopes, Arduino, and ESP32.',
      'Ran weekly small-group sessions on circuit analysis, digital logic, MOSFETs, op-amps, and I²C, and conducted lab checkoffs.'
    ]
  },
  {
    role: 'Software Engineering & Machine Learning Intern',
    org: 'Pfizer Inc.',
    location: 'Manhattan, NY',
    period: 'Dec 2024 – Jun 2025',
    tag: 'Internship',
    bullets: [
      'Diagnosed and resolved firewall issues through Splunk log analysis, eliminating recurrent errors and improving stability.',
      'Implemented role-based access control in Python using vulnerability scanning tools to reduce excess privilege risk.',
      'Developed Python automation and SQL tooling to generate database metadata and enable agents to inspect databases.'
    ]
  },
  {
    role: 'Energetics Tractive Systems, Data Acquisition & Grounded LV',
    org: 'Carnegie Mellon Racing — FSAE Electric',
    location: 'Pittsburgh, PA',
    period: 'Sep 2025 – Present',
    tag: 'Extracurricular',
    bullets: [
      'Support high- and low-voltage PCB design, sensor integration, and firmware for FSAE electric vehicle 27x.',
      'Contribute to PCB design, firmware, and wiring across the charger, motor, sensor, and control systems.'
    ]
  }
]

export type Project = {
  name: string
  period: string
  image: string
  imageAlt: string
  description: string
  bullets: string[]
}

export const projects: Project[] = [
  {
    name: 'STM32 Charger Display Interface',
    period: 'Sep 2026 – Present',
    image: charterDisplayImg,
    imageAlt: 'STM32-based charger display PCB with connector headers',
    description:
      "An STM32-based charger display replacing CMU Racing's PCAN laptop workflow.",
    bullets: [
      'Enables direct communication with the Charger Control Module over USART to read cell voltages and charging states, removing delay.',
      'Designing the supporting PCB interface and embedded firmware for display control, integrating the screen within the high-voltage charging system.'
    ]
  },
  {
    name: 'STM32 Embedded Control Board',
    period: 'Aug 2026',
    image: embeddedBoardImg,
    imageAlt: 'Schematic of an STM32F4 embedded control board with buck converter and power conditioning',
    description:
      "A custom STM32F4-based PCB in Altium supporting CMU Racing's Formula SAE vehicle controls.",
    bullets: [
      'Steps down 24V battery power to 5V and 3.3V, with clock, reset, decoupling, and protection circuitry.',
      'Integrates CAN bus, USB, JTAG/SWD debugging, and SD-card logging with signal conditioning and fault protection.'
    ]
  },
  {
    name: 'ML for ADHD Diagnosis Using Structural MRI',
    period: 'Sep 2024 – Mar 2025',
    image: adhdPosterImg,
    imageAlt: 'Research poster on machine learning for ADHD diagnosis using structural MRI data',
    description: 'An ensemble ML approach integrating structural MRI data for ADHD diagnosis.',
    bullets: [
      'Built an MRI preprocessing pipeline converting DICOM scans to structured data across 216 slices for 121 subjects (61 ADHD, 60 controls), applying label encoding, IQR-based outlier removal, and an 80/20 train/test split.',
      'Trained and evaluated ensemble ML classifiers (Decision Tree, ANN, Naïve Bayes, Logistic Regression) on structural MRI and clinical data, achieving up to 89.91% accuracy and identifying key predictive brain-region features.'
    ]
  },
  {
    name: 'Ethical Implications of AI Bias: Recidivism Case Study',
    period: 'Sep 2023 – Mar 2024',
    image: recidivismPosterImg,
    imageAlt: 'Research poster on ethical implications of AI bias through a recidivism case study',
    description: 'An audit of racial bias in the COMPAS recidivism algorithm.',
    bullets: [
      'Analyzed 7,214 criminal records to audit racial bias in the COMPAS recidivism algorithm, applying group fairness, calibration, and fairness-through-unawareness definitions across four ML models.',
      'Built and evaluated SVM, Random Forest, and Neural Network classifiers (67–68% accuracy), finding disproportionate recidivism prediction rates for African American defendants in 5 of 7 models.'
    ]
  }
]

export type Course = {
  code: string
  name: string
  semester: string
  description: string
}

export const coursework: Course[] = [
  {
    code: '18-290',
    name: 'Signals & Systems',
    semester: 'Fall 2026',
    description: 'Time/frequency-domain analysis, LTI systems, convolution, filtering, sampling, Fourier transforms, and FFT.'
  },
  {
    code: '27-215',
    name: 'Thermodynamics of Materials',
    semester: 'Fall 2026',
    description: 'Energy, heat, work, equilibrium, chemical potential, reactions, solutions, and binary phase diagrams.'
  },
  {
    code: '27-201',
    name: 'The Structure of Materials',
    semester: 'Fall 2026',
    description: "Crystal structures, symmetry, reciprocal space, X-ray diffraction, Bragg's law, and structure analysis."
  },
  {
    code: '18-100',
    name: 'Introduction to Electrical & Computer Engineering',
    semester: 'Spring 2026',
    description: 'Circuits, digital logic, computer architecture, signal processing, communications, networking, AI, and security.'
  },
  {
    code: '21-127',
    name: 'Concepts of Mathematics',
    semester: 'Fall 2026',
    description: 'Logic, proofs, induction, sets, relations, functions, number theory, and real numbers.'
  },
  {
    code: '21-254',
    name: 'Linear Algebra & Vector Calculus',
    semester: 'Fall 2025',
    description: 'Matrices, linear systems, eigenvalues, gradients, divergence, curl, and vector integrals.'
  },
  {
    code: '33-141',
    name: 'Physics 1',
    semester: 'Fall 2025',
    description: 'Mechanics, motion, forces, energy, momentum, rotation, thermodynamics, and heat engines.'
  },
  {
    code: '15-112',
    name: 'Fundamentals of Programming',
    semester: 'Spring 2026',
    description: 'Python, algorithmic problem-solving, code design, testing, debugging, libraries, and web applications.'
  }
]

export const skills = [
  'Python', 'C++', 'Java', 'Git', 'Altium', 'MATLAB', 'Fusion360', 'Solidworks', 'STM32', 'ESP32', 'I2C'
]

export const interests = ['Volleyball', 'Anime', 'Baking', 'Traveling', 'Gym', 'Photography', 'Music', 'Fashion']

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Coursework', href: '#coursework' },
  { label: 'Contact', href: '#contact' }
]
