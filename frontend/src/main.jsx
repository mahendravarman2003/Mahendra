import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowUpRight,
  BrainCircuit,
  Code2,
  Database,
  GraduationCap,
  Mail,
  MapPin,
  Menu,
  Phone,
  X,
  BarChart3,
  ExternalLink,
  Lock,
  Sparkles,
} from "lucide-react";
import "./styles.css";

import profileImg from "./assets/profile.jpg";
import ContactForm from "./components/ContactForm.jsx";
import AdminLogin from "./components/AdminLogin.jsx";
import AdminDashboard from "./components/AdminDashboard.jsx";
import WaterSplashBackground from "./components/WaterSplashBackground.jsx";

const skills = [
  "Java",
  "Python",
  "SQL",
  "JavaScript",
  "Node.js",
  "MongoDB",
  "Express.js",
  "React",
  "HTML",
  "CSS",
  "OOPs",
  "DBMS",
  "Git & GitHub",
  "Power BI",
];
const strengths = ["Team Collaboration", "Communication", "Problem Solving", "Adaptability"];

function App() {
  const [open, setOpen] = useState(false);
  const [adminLoginOpen, setAdminLoginOpen] = useState(false);
  const [adminDashboardOpen, setAdminDashboardOpen] = useState(false);
  const [token, setToken] = useState(() => localStorage.getItem("portfolio_admin_token") || "");

  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  const handleAdminClick = () => {
    if (token) {
      setAdminDashboardOpen(true);
    } else {
      setAdminLoginOpen(true);
    }
  };

  const handleLoginSuccess = (newToken) => {
    setToken(newToken);
    setAdminLoginOpen(false);
    setAdminDashboardOpen(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("portfolio_admin_token");
    localStorage.removeItem("portfolio_admin_user");
    setToken("");
    setAdminDashboardOpen(false);
  };

  return (
    <div className="app">
      <WaterSplashBackground />
      <header className="nav">
        <button className="brand" onClick={() => go("home")}>
          M<span>N</span>
        </button>
        <nav className={open ? "links open" : "links"}>
          {["about", "experience", "skills", "projects", "education", "contact"].map((x) => (
            <button key={x} onClick={() => go(x)}>
              {x}
            </button>
          ))}
        </nav>
        <button className="menu" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
        <a className="cta" href="mailto:mahendravarman2309@gmail.com">
          Let's connect <ArrowUpRight size={16} />
        </a>
      </header>

      <main>
        <section id="home" className="hero section">
          <div className="hero-grid">
            <div>
              <div className="eyebrow">
                <i /> Open to opportunities
              </div>
              <h1>
                Turning ideas into <em>useful software.</em>
              </h1>
              <p className="hero-copy">
                I'm <strong>Mahendravarman N</strong>, an aspiring Software Engineer with hands-on
                experience in Java, Python, SQL, Node.js & React web development.
              </p>
              <div className="actions">
                <button className="primary" onClick={() => go("projects")}>
                  View my work <ArrowUpRight />
                </button>
                <button className="secondary" onClick={() => go("contact")}>
                  Contact me <Mail />
                </button>
              </div>
              <div className="meta">
                <span>
                  <MapPin /> Chennai, India
                </span>
                <span>
                  <Code2 /> Software Engineer
                </span>
              </div>
            </div>
            <div className="hero-profile-container">
              <div className="hero-card hero-image-card">
                <div className="hero-img-wrapper">
                  <img src={profileImg} alt="Mahendravarman N" className="hero-profile-img" />
                  <div className="hero-img-overlay"></div>
                  <div className="hero-badge">
                    <BrainCircuit size={14} />
                    <span>Software Engineer</span>
                  </div>
                </div>
                <div className="hero-card-footer">
                  <small>PROFILE HIGHLIGHT</small>
                  <h3>Mahendravarman N</h3>
                  <p>B.Tech IT · Java · Python · MERN Stack & ML</p>
                  <div className="divider" />
                  <div className="stat">
                    <b>90%</b>
                    <span>CNN hazardous-object detection accuracy</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="section bordered">
          <div className="label">01 / ABOUT</div>
          <div className="two">
            <h2>
              Curious builder,
              <br />
              <em>practical problem solver.</em>
            </h2>
            <div>
              <p className="lead">
                Recent B.Tech Information Technology graduate with practical exposure through
                internships, full-stack projects, and technical training.
              </p>
              <p>
                Experienced in full-stack development, database management (MongoDB, SQL),
                software development fundamentals, and data analytics. My work also includes a
                published Computer Vision research project involving a CNN-based hazardous object
                detection system.
              </p>
              <div className="pills">
                <span>Problem solving</span>
                <span>Full-stack web</span>
                <span>Data driven</span>
                <span>Team player</span>
              </div>
            </div>
          </div>
        </section>

        <section id="experience" className="section">
          <div className="label">02 / EXPERIENCE</div>
          <div className="card experience">
            <div className="exp-head">
              <div>
                <small>DEC 2023 — JAN 2024</small>
                <h2>Intern</h2>
                <h3>Futurik Technologies Pvt. Ltd · Madurai</h3>
              </div>
              <div className="square">
                <Code2 />
              </div>
            </div>
            <ul>
              <li>
                Built 5+ responsive web pages and dashboards using HTML, CSS and JavaScript,
                improving UI consistency across the product.
              </li>
              <li>
                Designed reusable UI components and profile pages, reducing front-end development
                time for the team.
              </li>
              <li>
                Collaborated with the development team to translate 3 project requirements into
                fully functional front-end interfaces delivered on time.
              </li>
            </ul>
          </div>
          <div className="card training">
            <div className="square">
              <BarChart3 />
            </div>
            <div>
              <small>JUL 2025 — DEC 2025 · CHENNAI</small>
              <h3>Data Analyst Program</h3>
              <p>360 DigitMG</p>
              <ul>
                <li>Cleaned and preprocessed 10+ real-world datasets using Python (Pandas, NumPy) and SQL.</li>
                <li>Built 3 interactive Power BI dashboards for business KPIs.</li>
                <li>Generated automated reports in Excel and Python.</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="skills" className="section bordered">
          <div className="label">03 / SKILLS</div>
          <div className="two skills-head">
            <h2>
              Technology with
              <br />
              <em>purpose.</em>
            </h2>
            <p>My toolkit spans software development, web technologies, databases and data analytics.</p>
          </div>
          <div className="skill-grid">
            {skills.map((x, i) => (
              <div className="skill" key={x}>
                <small>{String(i + 1).padStart(2, "0")}</small>
                {x}
              </div>
            ))}
          </div>
          <h3 className="sub">Soft skills</h3>
          <div className="pills">
            {strengths.map((x) => (
              <span key={x}>{x}</span>
            ))}
          </div>
        </section>

        <section id="projects" className="section">
          <div className="label">04 / PROJECTS</div>
          <div className="projects">
            <article className="project">
              <div className="project-icon">
                <BrainCircuit />
              </div>
              <small>MACHINE LEARNING · COMPUTER VISION</small>
              <h2>Hand Gesture Control</h2>
              <p>
                Real-time hand gesture recognition system using Machine Learning and Computer Vision,
                enabling mouse operations and video controls through gesture-based interactions.
              </p>
              <div className="tags">
                <span>Machine Learning</span>
                <span>Computer Vision</span>
                <span>Real-time Processing</span>
              </div>
            </article>
            <article className="project featured">
              <div className="project-icon">
                <Database />
              </div>
              <small>IEEE PUBLISHED · COMPUTER VISION</small>
              <h2>Hazardous Object Detection System</h2>
              <p>
                Published research work on a CNN-based real-time hazardous object detection system
                achieving 90% detection accuracy, with IoT sensors for real-time alert notifications.
              </p>
              <div className="tags">
                <span>CNN</span>
                <span>Computer Vision</span>
                <span>IoT</span>
                <span>90% accuracy</span>
              </div>
            </article>
          </div>
        </section>

        <section id="education" className="section bordered">
          <div className="label">05 / EDUCATION</div>
          <div className="edu card">
            <div className="square">
              <GraduationCap />
            </div>
            <div>
              <small>2021 — 2025</small>
              <h2>B.Tech in Information Technology</h2>
              <h3>Velammal College of Engineering and Technology, Madurai</h3>
              <p>
                CGPA <b>7.5</b>
              </p>
            </div>
          </div>
          <div className="edu-row">
            <div>
              <span>2021</span>
              <b>HSC</b>
              <p>SM Hindu Higher Secondary School, Sirkazhi</p>
            </div>
            <div>
              <span>2019</span>
              <b>SSLC</b>
              <p>St Mary's Matriculation School, Kuttalam</p>
            </div>
          </div>
          <div className="certs">
            <h3>Certifications</h3>
            <span>Java Fundamentals · Wipro TalentNext</span>
            <span>Business Intelligence with Google · Google / Coursera</span>
          </div>
        </section>

        <section id="contact" className="section contact">
          <div className="label">06 / CONTACT</div>
          <div className="contact-container">
            <div className="contact-box-left">
              <h2>
                Let's connect &<br />
                <em>build together.</em>
              </h2>
              <p>
                I'm eager to contribute as a Software Engineer in a growth-oriented organization. Feel
                free to send a direct message or connect via any of the links below.
              </p>

              <div className="contact-links">
                <a href="mailto:mahendravarman2309@gmail.com">
                  <Mail />
                  <span>mahendravarman2309@gmail.com</span>
                  <ArrowUpRight />
                </a>
                <a href="tel:+919344134404">
                  <Phone />
                  <span>+91 9344134404</span>
                  <ArrowUpRight />
                </a>
                <a href="https://linkedin.com/in/mahendravarman-n" target="_blank" rel="noreferrer">
                  <ExternalLink />
                  <span>LinkedIn / mahendravarman-n</span>
                  <ArrowUpRight />
                </a>
                <div>
                  <MapPin />
                  <span>Chennai, India</span>
                </div>
              </div>
            </div>

            <div className="contact-box-right">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-left">
          <span>© 2026 Mahendravarman N</span>
          <span>Full Stack Node.js & React</span>
        </div>
        <div className="footer-right">
          <button className="admin-portal-btn" onClick={handleAdminClick} title="Open Admin Portal">
            <Lock size={12} />
            <span>Admin Portal</span>
          </button>
        </div>
      </footer>

      {/* Admin Modals */}
      <AdminLogin
        isOpen={adminLoginOpen}
        onClose={() => setAdminLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      <AdminDashboard
        isOpen={adminDashboardOpen}
        onClose={() => setAdminDashboardOpen(false)}
        onLogout={handleLogout}
        token={token}
      />
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);