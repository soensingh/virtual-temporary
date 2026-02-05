import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './BootcampPage.module.css';

export default function BootcampPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { bootcamp, syllabus } = location.state || {};
  
  const [experience, setExperience] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: ""
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      experience: experience || "",
      topic: bootcamp.title,
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
    };

    try {
      const response = await fetch(`${apiBaseUrl}/api/form`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      setExperience("");
      setFormData({ name: "", phone: "", email: "" });
      alert("Form submitted!");
    } catch (error) {
      alert("Submission failed. Please try again.");
    }
  };

  if (!bootcamp) {
    return (
      <div className={styles.errorContainer}>
        <h1>Bootcamp not found</h1>
        <button className={styles.backButton} onClick={() => navigate('/')}>
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      {/* Hero Section */}
      <div className={styles.heroSection}>
        <button className={styles.backButton} onClick={() => navigate('/')}>
          ← Back
        </button>
        <h1 className={styles.pageTitle}>{bootcamp.title}</h1>
        <p className={styles.breadcrumb}>Home &gt; Bootcamps &gt; {bootcamp.title}</p>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Left Column */}
        <div className={styles.leftColumn}>
          {/* Bootcamp Image */}
          <div className={styles.courseImageWrapper}>
            <img
              src={bootcamp.image}
              alt={bootcamp.title}
              className={styles.courseImage}
            />
          </div>

          {/* Bootcamp Details */}
          <div className={styles.contentSection}>
            <h2 className={styles.sectionTitle}>Bootcamp Details</h2>
            <p className={styles.description}>{bootcamp.subtitle}</p>
            
            <h3 className={styles.subSectionTitle}>What You'll Learn</h3>
            <ul className={styles.highlightsList}>
              <li>Intensive {bootcamp.duration} hands-on training program</li>
              <li>Industry-relevant skills and practical knowledge</li>
              <li>Real-world projects and case studies</li>
              <li>Expert mentorship and guidance</li>
              <li>Certificate of completion</li>
              <li>Career support and networking opportunities</li>
            </ul>
          </div>

          {/* Complete Curriculum */}
          <div className={styles.contentSection}>
            <h2 className={styles.sectionTitle}>Complete Curriculum</h2>
            <p className={styles.syllabusText}>{syllabus}</p>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className={styles.rightSidebar}>
          {/* Bootcamp Info Card */}
          <div className={styles.infoCard}>
            <h3 className={styles.cardTitle}>Bootcamp Information</h3>
            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>⏱️</div>
              <div>
                <p className={styles.infoLabel}>Duration</p>
                <p className={styles.infoValue}>{bootcamp.duration}</p>
              </div>
            </div>
            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>📚</div>
              <div>
                <p className={styles.infoLabel}>Category</p>
                <p className={styles.infoValue}>Intensive Bootcamp</p>
              </div>
            </div>
            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>💻</div>
              <div>
                <p className={styles.infoLabel}>Mode</p>
                <p className={styles.infoValue}>Hybrid Learning</p>
              </div>
            </div>
          </div>

          {/* Need Help Card */}
          <div className={styles.helpCard}>
            <div className={styles.helpIcon}>📞</div>
            <h3 className={styles.helpTitle}>Need Help? Call Here</h3>
            <a href="tel:+919888122255" className={styles.phoneNumber}>
              +91 98881 22255
            </a>
            <a href="#contact" className={styles.chatButton}>
              Get A Quote
            </a>
          </div>

          {/* Contact Form Card */}
          <div className={styles.contactFormCard}>
            <h3 className={styles.cardTitle}>Send a Message</h3>
            <form className={styles.contactForm} onSubmit={handleSubmit}>
              
              {/* Experience Radio Group */}
              <div className={styles.formGroup}>
                <label className={styles.groupLabel}>Experience</label>
                <div className={styles.radioGroup}>
                  <label className={styles.radioLabel}>
                    <input 
                      type="radio" 
                      name="experience" 
                      value="technical"
                      checked={experience === "technical"}
                      onChange={(e) => setExperience(e.target.value)}
                    />
                    <span>Working Professional - Technical Roles</span>
                  </label>
                  <label className={styles.radioLabel}>
                    <input 
                      type="radio" 
                      name="experience" 
                      value="non-technical"
                      checked={experience === "non-technical"}
                      onChange={(e) => setExperience(e.target.value)}
                    />
                    <span>Working Professional - Non Technical</span>
                  </label>
                  <label className={styles.radioLabel}>
                    <input 
                      type="radio" 
                      name="experience" 
                      value="final-year"
                      checked={experience === "final-year"}
                      onChange={(e) => setExperience(e.target.value)}
                    />
                    <span>College Student - Final Year</span>
                  </label>
                  <label className={styles.radioLabel}>
                    <input 
                      type="radio" 
                      name="experience" 
                      value="others"
                      checked={experience === "others"}
                      onChange={(e) => setExperience(e.target.value)}
                    />
                    <span>Others</span>
                  </label>
                </div>
              </div>

              {/* Topic - Locked to current bootcamp */}
              <div className={styles.formGroup}>
                <label className={styles.groupLabel}>Topic of interest</label>
                <input
                  type="text"
                  value={bootcamp.title}
                  className={styles.lockedInput}
                  disabled
                />
              </div>

              {/* Name Input */}
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter name"
                  value={formData.name}
                  onChange={handleChange}
                  className={styles.textInput}
                  required
                />
              </div>

              {/* Phone Input */}
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  className={styles.textInput}
                  required
                />
              </div>

              {/* Email Input */}
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={handleChange}
                  className={styles.textInput}
                  required
                />
              </div>

              <button type="submit" className={styles.submitButton}>
                Enroll in this bootcamp
              </button>
              <p className={styles.disclaimer}>
                By proceeding you agree to our Terms & Privacy Policy
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
