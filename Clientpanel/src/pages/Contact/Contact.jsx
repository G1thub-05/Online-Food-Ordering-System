import React from "react";
import "./Contact.css";

const Contact = () => {
	return (
		<section className="line-contact-section">
			<div className="line-contact-container">
				<h2 className="line-contact-title">Contact Us</h2>
				<form className="line-form">
					<div className="line-input-group">
						<input type="text" required />
						<span className="line-highlight"></span>
						<label>First Name</label>
					</div>
					<div className="line-input-group">
						<input type="text" required />
						<span className="line-highlight"></span>
						<label>Last Name</label>
					</div>
					<div className="line-input-group">
						<input type="email" required />
						<span className="line-highlight"></span>
						<label>Email Address</label>
					</div>
					<div className="line-input-group">
						<textarea rows="4" required></textarea>
						<span className="line-highlight"></span>
						<label>Your Message</label>
					</div>
					<button className="line-submit-btn" type="submit">
						🚀 Send Message
					</button>
				</form>
			</div>
		</section>
	);
};

export default Contact;
