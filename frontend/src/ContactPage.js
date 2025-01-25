import React, { useState } from "react";
import "./ContactPage.css";
import icon1 from "./images/icon-51.jpg";
import icon2 from "./images/icon-52.jpg";
import icon3 from "./images/icon-50.jpg";
import emailjs from "emailjs-com"; // Import EmailJS

function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Send email function
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_whgqpt3", // Your EmailJS Service ID
        "template_3xkjqi9", // Correct Template ID
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        },
        "rGC6njAJ-HHt3LiMH" // Your EmailJS User ID
      )
      .then(
        (result) => {
          setStatus("Message sent successfully!");
          console.log("Email sent:", result.text);
        },
        (error) => {
          setStatus("Failed to send message. Please try again.");
          console.error("Failed to send email:", error);
        }
      );

    // Reset form after sending
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  return (
    <div className="contact-page">
      {/* Header Section */}
      <div
        className="contact-header"
        style={{
          background: "linear-gradient(to bottom, #2C1A47, #3F2A69)",
          padding: "120px 0",
          textAlign: "center",
          color: "white",
        }}
      >
        <h1>Get In Touch</h1>
        <p>HOME &gt; CONTACT US</p>
      </div>

      {/* Contact Information Section */}
      <div className="contact-info">
        <div className="info-box">
          <div className="icon-text">
            <div className="icon">
              <img src={icon1} alt="Address Icon" className="contact-icon" />
            </div>
            <div className="text">
              <h3>Address</h3>
              <p>71-75 Shelton Street, Covent Garden, London - WC2H 9JQ</p>
            </div>
          </div>
        </div>

        <div className="info-box">
          <div className="icon-text">
            <div className="icon">
              <img src={icon2} alt="Phone Icon" className="contact-icon" />
            </div>
            <div className="text">
              <h3>Call us on</h3>
              <p>Tel: 02080898156</p>
            </div>
          </div>
        </div>

        <div className="info-box">
          <div className="icon-text">
            <div className="icon">
              <img src={icon3} alt="Email Icon" className="contact-icon" />
            </div>
            <div className="text">
              <h3>Mail at</h3>
              <p>
                For General Queries: cs@lavarubber.com
                <br />
                For Sales: sales@lavarubber.com
                <br />
                For Transport: transport@lavarubber.com
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <h2 className="text-center">Send Your Message To Us</h2>
      <form className="contact-form" onSubmit={sendEmail}>
        <div className="form-row">
          <input
            type="text"
            placeholder="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-row">
          <input
            type="tel"
            placeholder="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-row">
          <textarea
            className="full-width"
            placeholder="Message goes here"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Send Message
        </button>
      </form>

      {/* Status Message */}
      {status && <p className="status-message">{status}</p>}
    </div>
  );
}

export default ContactPage;
