import React from "react";
import "./About.css";
import abt2Image from "./images/abt2.jpg"; // Import the image

const About = () => {
  return (
    <div className="about-page">
      {/* Header Section */}
      <div className="about-header">
        <div className="header-overlay">
          <h1>LAVARUBBER</h1>
          <p>HOME &gt; ABOUT LAVARUBBER</p>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="about-content">
        <div className="about-row">
          {/* Left Image */}
          <div className="about-image">
            <img src={abt2Image} alt="Recycling Metal Scrap" />
          </div>
          {/* Right Text */}
          <div className="about-text text-center">
            <h2>Welcome To LAVARUBBER</h2>
            <p>
              LAVARUBBER has extensive experience in recycling of Metal Scrap and Waste Tyres into Reusable Products. Lavarubber is a supplier of alternative fuels to Cement Manufacturing and Waste to Energy Plants worldwide. We provide Bulk or Container shipments of various alternative fuels to steel industries globally.
            </p>
          </div>
        </div>

        {/* Additional Text Section */}
        <div className="about-additional-text text-center mt-5">
          <h2>Our Mission</h2>
          <p>
            Our mission is to cater to the needs of our clients as a one-stop
            solution provider, by being approachable, efficient, and
            knowledgeable.
          </p>
          <p>
            We aim to fulfill the demands of our clients by maintaining a
            long-term loyal relationship with them while delivering the best
            service possible.
          </p>
          <p>
            Our vision includes expanding our reach to establish new
            collaborations with organizations and individuals to widen our
            client base and services.
          </p>
          <p>
            We strive to be a trustworthy business partner to our clients and
            ensure professional service and excellence to meet their
            requirements at all times.
          </p>
          <p>
            We provide various products as per the client specifications for
            different applications, including Steel Furnaces, Aluminium
            Furnaces, Tyre Recyclers for Athletics Tracks, Building Insulation,
            Playground Surfaces, Brake Shoes, Rubber Mats, Tarred Roads, New
            Tyres, and Sports Surfaces.
          </p>
        </div>
      </div>

 {/* Testimonials Section */}
<div className="testimonials mb-5">
  <h2 className="testimonial-heading">What Our Clients Say</h2>
  <div className="testimonial-carousel">
    {/* Card 1 */}
    <div className="testimonial-card">
      <div className="rating">
        {/* 5 Star Rating */}
        <span className="star">★</span>
        <span className="star">★</span>
        <span className="star">★</span>
        <span className="star">★</span>
        <span className="star">★</span>
      </div>
      <p className="feedback-message">
        "Hi, we have ordered a couple of consignments from LAVARUBBER, and it all went well. Thanks so much."
      </p>
      <div className="dots">
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
      </div>
      <div className="feedback-provider">
        <h4>Venkata Siva Sai Industries</h4>
      </div>
    </div>

    {/* Card 2 */}
    <div className="testimonial-card">
      <div className="rating">
        {/* 5 Star Rating */}
        <span className="star">★</span>
        <span className="star">★</span>
        <span className="star">★</span>
        <span className="star">★</span>
        <span className="star">★</span>
      </div>
      <p className="feedback-message">
        "Coordination by RK is very good, and we are very happy to be partnered with LAVARUBBER."
      </p>
      <div className="dots">
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
      </div>
      <div className="feedback-provider">
        <h4>LSR Logistics Limited (UK)</h4>
      </div>
    </div>

    {/* Card 3 */}
    <div className="testimonial-card">
      <div className="rating">
        {/* 5 Star Rating */}
        <span className="star">★</span>
        <span className="star">★</span>
        <span className="star">★</span>
        <span className="star">★</span>
        <span className="star">★</span>
      </div>
      <p className="feedback-message">
        "Support and dedication are extremely good. Thanks, RK!"
      </p>
      <div className="dots">
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
      </div>
      <div className="feedback-provider">
        <h4>Thank you, Lavarubber</h4>
      </div>
    </div>
  </div>
</div>

    </div>
  );
};

export default About;
