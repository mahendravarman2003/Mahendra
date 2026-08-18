import React from "react";
import {createRoot} from "react-dom/client";
import {ArrowUpRight, BrainCircuit, Code2, Database, Download, Github, GraduationCap, Mail, MapPin, Menu, Phone, X, BarChart3, ExternalLink} from "lucide-react";
import "./styles.css";

const skills=["Java","Python","SQL","JavaScript","HTML","CSS","OOPs","DBMS","SDLC","Data Structures","Git","GitHub","Power BI","Microsoft Excel"];
const strengths=["Team Collaboration","Communication","Problem Solving","Adaptability"];

function App(){
 const [open,setOpen]=React.useState(false);
 const go=id=>{document.getElementById(id)?.scrollIntoView({behavior:"smooth"});setOpen(false)};
 return <div className="app">
  <header className="nav">
   <button className="brand" onClick={()=>go("home")}>M<span>N</span></button>
   <nav className={open?"links open":"links"}>{["about","experience","skills","projects","education","contact"].map(x=><button key={x} onClick={()=>go(x)}>{x}</button>)}</nav>
   <button className="menu" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button>
   <a className="cta" href="mailto:mahendravarman2309@gmail.com">Let's connect <ArrowUpRight size={16}/></a>
  </header>

  <main>
   <section id="home" className="hero section">
    <div className="hero-grid">
     <div>
      <div className="eyebrow"><i/> Open to opportunities</div>
      <h1>Turning ideas into <em>useful software.</em></h1>
      <p className="hero-copy">I'm <strong>Mahendravarman N</strong>, an aspiring Software Engineer with hands-on experience in Java, Python, SQL and front-end web development.</p>
      <div className="actions"><button className="primary" onClick={()=>go("projects")}>View my work <ArrowUpRight/></button><button className="secondary" onClick={()=>go("contact")}>Contact me <Mail/></button></div>
      <div className="meta"><span><MapPin/> Chennai, India</span><span><Code2/> Software Engineer</span></div>
     </div>
     <div className="hero-card">
      <div className="icon-orb"><BrainCircuit size={43}/></div>
      <small>PROFILE</small><h3>Software Development + Data</h3>
      <p>Java · Python · SQL · Web · Computer Vision · Power BI</p>
      <div className="divider"/>
      <div className="stat"><b>90%</b><span>CNN hazardous-object detection accuracy</span></div>
     </div>
    </div>
   </section>

   <section id="about" className="section bordered">
    <div className="label">01 / ABOUT</div><div className="two">
     <h2>Curious builder,<br/><em>practical problem solver.</em></h2>
     <div><p className="lead">Recent B.Tech Information Technology graduate with practical exposure through internships, projects and technical training.</p>
     <p>Experienced in front-end development, database management, software development fundamentals and data analysis. My work also includes a published Computer Vision research project involving a CNN-based hazardous object detection system.</p>
     <div className="pills"><span>Problem solving</span><span>Data driven</span><span>Team player</span></div></div>
    </div>
   </section>

   <section id="experience" className="section">
    <div className="label">02 / EXPERIENCE</div>
    <div className="card experience">
     <div className="exp-head"><div><small>DEC 2023 — JAN 2024</small><h2>Intern</h2><h3>Futurik Technologies Pvt. Ltd · Madurai</h3></div><div className="square"><Code2/></div></div>
     <ul>
      <li>Built 5+ responsive web pages and dashboards using HTML, CSS and JavaScript, improving UI consistency across the product.</li>
      <li>Designed reusable UI components and profile pages, reducing front-end development time for the team.</li>
      <li>Collaborated with the development team to translate 3 project requirements into fully functional front-end interfaces delivered on time.</li>
     </ul>
    </div>
    <div className="card training"><div className="square"><BarChart3/></div><div><small>JUL 2025 — DEC 2025 · CHENNAI</small><h3>Data Analyst Program</h3><p>360 DigitMG</p><ul><li>Cleaned and preprocessed 10+ real-world datasets using Python (Pandas, NumPy) and SQL.</li><li>Built 3 interactive Power BI dashboards for business KPIs.</li><li>Generated automated reports in Excel and Python.</li></ul></div></div>
   </section>

   <section id="skills" className="section bordered">
    <div className="label">03 / SKILLS</div><div className="two skills-head"><h2>Technology with<br/><em>purpose.</em></h2><p>My toolkit spans software development, web technologies, databases and data analytics.</p></div>
    <div className="skill-grid">{skills.map((x,i)=><div className="skill" key={x}><small>{String(i+1).padStart(2,"0")}</small>{x}</div>)}</div>
    <h3 className="sub">Soft skills</h3><div className="pills">{strengths.map(x=><span key={x}>{x}</span>)}</div>
   </section>

   <section id="projects" className="section">
    <div className="label">04 / PROJECTS</div>
    <div className="projects">
     <article className="project"><div className="project-icon"><BrainCircuit/></div><small>MACHINE LEARNING · COMPUTER VISION</small><h2>Hand Gesture Control</h2><p>Real-time hand gesture recognition system using Machine Learning and Computer Vision, enabling mouse operations and video controls through gesture-based interactions.</p><div className="tags"><span>Machine Learning</span><span>Computer Vision</span><span>Real-time Processing</span></div></article>
     <article className="project featured"><div className="project-icon"><Database/></div><small>IEEE PUBLISHED · COMPUTER VISION</small><h2>Hazardous Object Detection System</h2><p>Published research work on a CNN-based real-time hazardous object detection system achieving 90% detection accuracy, with IoT sensors for real-time alert notifications.</p><div className="tags"><span>CNN</span><span>Computer Vision</span><span>IoT</span><span>90% accuracy</span></div></article>
    </div>
   </section>

   <section id="education" className="section bordered">
    <div className="label">05 / EDUCATION</div>
    <div className="edu card"><div className="square"><GraduationCap/></div><div><small>2021 — 2025</small><h2>B.Tech in Information Technology</h2><h3>Velammal College of Engineering and Technology, Madurai</h3><p>CGPA <b>7.5</b></p></div></div>
    <div className="edu-row"><div><span>2021</span><b>HSC</b><p>SM Hindu Higher Secondary School, Sirkazhi</p></div><div><span>2019</span><b>SSLC</b><p>St Mary's Matriculation School, Kuttalam</p></div></div>
    <div className="certs"><h3>Certifications</h3><span>Java Fundamentals · Wipro TalentNext</span><span>Business Intelligence with Google · Google / Coursera</span></div>
   </section>

   <section id="contact" className="section contact"><div className="contact-box"><div><div className="label">06 / CONTACT</div><h2>Let's connect &<br/><em>build together.</em></h2><p>I'm eager to contribute as a Software Engineer in a growth-oriented organization.</p></div><div className="contact-links">
    <a href="mailto:mahendravarman2309@gmail.com"><Mail/><span>mahendravarman2309@gmail.com</span><ArrowUpRight/></a>
    <a href="tel:+919344134404"><Phone/><span>+91 9344134404</span><ArrowUpRight/></a>
    <a href="https://linkedin.com/in/mahendravarman-n" target="_blank" rel="noreferrer"><ExternalLink/><span>LinkedIn / mahendravarman-n</span><ArrowUpRight/></a>
    <div><MapPin/><span>Chennai, India</span></div>
   </div></div></section>
  </main>
  <footer><span>© 2026 Mahendravarman N</span><span>Built with React</span></footer>
 </div>
}
createRoot(document.getElementById("root")).render(<App/>);