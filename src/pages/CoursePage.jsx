import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./CoursePage.module.css";

const CoursePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const course = location.state?.course;
  const syllabus = location.state?.syllabus;
  const [activeTab, setActiveTab] = useState('overview');
  const [experience, setExperience] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: ""
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = 'auto';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!course) {
    return (
      <div className={styles.errorContainer}>
        <h2>Course not found</h2>
        <button onClick={() => navigate('/')} className={styles.backButton}>
          Go Back Home
        </button>
      </div>
    );
  }

  const getCoursePrice = (courseId) => {
    if (courseId === 10) {
      return { old: "8,000", current: "6,500" };
    }
    return { old: "12,000", current: "9,500" };
  };

  const price = getCoursePrice(course.id);

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
      topic: course.title,
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

  return (
    <div className={styles.pageContainer}>
      {/* Hero Section */}
      <div className={styles.heroSection}>
        <button onClick={() => navigate('/')} className={styles.backButton}>
          ← Back to Home
        </button>
        <h1 className={styles.pageTitle}>{course.title}</h1>
        <p className={styles.breadcrumb}>Home &gt; Courses &gt; {course.title}</p>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Left Column */}
        <div className={styles.leftColumn}>
          <div className={styles.courseImageWrapper}>
            <img src={course.image} alt={course.title} className={styles.courseImage} />
          </div>

          {/* Course Overview */}
          <div className={styles.contentSection}>
            <h2 className={styles.sectionTitle}>Course Details</h2>
            <p className={styles.description}>
              This comprehensive course is designed to equip learners with in-demand skills
              and practical knowledge. Perfect for working professionals, students, and anyone
              looking to advance their career in {course.title}.
            </p>

            <h3 className={styles.subSectionTitle}>Course Highlights</h3>
            <ul className={styles.highlightsList}>
              {course.meta.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
              <li>Live interactive sessions with industry experts</li>
              <li>Hands-on projects and real-world case studies</li>
              <li>Lifetime access to course materials</li>
              <li>Certificate of completion</li>
              <li>Career support and placement assistance</li>
            </ul>
          </div>

          {/* Complete Curriculum */}
          <div className={styles.contentSection}>
            <h2 className={styles.sectionTitle}>Complete Curriculum</h2>
            <pre className={styles.syllabusText}>{syllabus || 'Curriculum coming soon...'}</pre>
          </div>

          {/* Pricing */}
          <div className={styles.contentSection}>
            <h2 className={styles.sectionTitle}>Course Pricing</h2>
            <div className={styles.pricingCard}>
              <div className={styles.pricingHeader}>
                <h3>Complete Course Package</h3>
                <p>Get access to all materials and lifetime support</p>
              </div>
              <div className={styles.pricingDetails}>
                <span className={styles.oldPrice}>₹{price.old}</span>
                <span className={styles.currentPrice}>₹{price.current}</span>
                <span className={styles.discount}>Save ₹{parseInt(price.old.replace(',', '')) - parseInt(price.current.replace(',', ''))}</span>
              </div>
              <a href="#contactForm" className={styles.enrollButton}>
                Enroll Now
              </a>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className={styles.rightSidebar}>
          {/* Course Info Card */}
          <div className={styles.infoCard}>
            <h3 className={styles.cardTitle}>Course Information</h3>
            <div className={styles.infoItem}>
              <span className={styles.infoIcon}>📅</span>
              <div>
                <p className={styles.infoLabel}>Duration</p>
                <p className={styles.infoValue}>2 months</p>
              </div>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoIcon}>📚</span>
              <div>
                <p className={styles.infoLabel}>Category</p>
                <p className={styles.infoValue}>Professional</p>
              </div>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoIcon}>💻</span>
              <div>
                <p className={styles.infoLabel}>Mode</p>
                <p className={styles.infoValue}>Offline/Online</p>
              </div>
            </div>
          </div>

          {/* Need Help Card */}
          <div className={styles.helpCard}>
            <div className={styles.helpIcon}>📞</div>
            <h3 className={styles.helpTitle}>Need Help? Call Here</h3>
            <a href="tel:+919888122255" className={styles.phoneNumber}>+91 98881 22255</a>
            <a href="#contactForm" className={styles.chatButton}>Get A Quote</a>
          </div>

          {/* Contact Form */}
          <div className={styles.contactFormCard} id="contactForm">
            <h3 className={styles.cardTitle}>Course Information</h3>
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

              {/* Topic - Locked to current course */}
              <div className={styles.formGroup}>
                <label className={styles.groupLabel}>Topic of interest</label>
                <input
                  type="text"
                  value={course.title}
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
                Enroll in this course
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
};

export default CoursePage;
