import React from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "Geeta_Gunjal0309",   // ✅ Service ID
        "template_FoodApp",  // ✅ Template ID
        e.target,            // ✅ Form reference
        "-EbTaj-cO5_YF1fU6"   // ✅ Public Key
      )
      .then(
        () => {
          alert("Feedback sent successfully ✅");
          e.target.reset();
        },
        (error) => {
          console.error("EmailJS error:", error);
          alert("Failed to send ❌");
        }
      );
  };

  return (
    <section className="contact-section">
      <h2>Feedback</h2>

      <form onSubmit={sendEmail}>
        <input
          type="text"
          name="user_name"
          placeholder="Your Name"
          required
        />

        <input
          type="email"
          name="user_email"
          placeholder="Your Email"
          required
        />

        <textarea
          name="message"
          placeholder="Your Feedback"
          required
        ></textarea>

        <button type="submit">Send Feedback</button>
      </form>
    </section>
  );
};

export default Contact;
