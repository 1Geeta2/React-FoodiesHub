import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Contact() {
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
    rating: 5
  });
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    if (!formData.subject.trim() || !formData.message.trim()) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        alert("Thank you for your feedback! 🎉");
        setFormData({ subject: "", message: "", rating: 5 });
      } else {
        alert("Failed to submit: " + data.message);
      }
    } catch (error) {
      console.error("❌ Feedback error:", error);
      alert("Failed to submit feedback. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        <h1>Contact Us 💬</h1>
        <p className="subtitle">We'd love to hear your feedback!</p>

        <form onSubmit={handleSubmit} className="contact-form">
          
          <div className="form-group">
            <label>Subject</label>
            <input
              type="text"
              name="subject"
              placeholder="What's this about?"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Rating ⭐</label>
            <div className="rating-stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star ${formData.rating >= star ? 'active' : ''}`}
                  onClick={() => setFormData({ ...formData, rating: star })}
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Message</label>
            <textarea
              name="message"
              rows="6"
              placeholder="Tell us what you think..."
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>

          <button 
            type="submit" 
            className="submit-btn"
            disabled={loading}
          >
            {loading ? "Sending..." : "Submit Feedback ❤️"}
          </button>
        </form>

        <div className="contact-info">
          <h3>Other ways to reach us:</h3>
          <p>📧 Email: support@foodapp.com</p>
          <p>📱 Phone: +91 98765 43210</p>
          <p>🕒 Available: Mon-Sat, 9 AM - 9 PM</p>
        </div>
      </div>
    </div>
  );
}

export default Contact;