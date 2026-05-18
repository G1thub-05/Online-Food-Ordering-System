import React from "react";
import "./Contact.css";

const Contact = () => {
	return (
		<section className="contact-wrapper">
			<div className="contact-left">
				<p className="contact-tag">GET IN TOUCH</p>

				<h1 className="contact-heading">
					We’d love to hear
					<span> from you.</span>
				</h1>

				<p className="contact-text">
					Questions, feedback, or partnership ideas — send us a message and our
					team will get back to you shortly.
				</p>
			</div>

			<div className="contact-right">
				<form className="contact-form">
					<div className="input-box">
						<input type="text" placeholder="First Name" required />
					</div>

					<div className="input-box">
						<input type="text" placeholder="Last Name" required />
					</div>

					<div className="input-box full-width">
						<input type="email" placeholder="Email Address" required />
					</div>

					<div className="input-box full-width">
						<textarea
							rows="5"
							placeholder="Write your message..."
							required
						></textarea>
					</div>

					<button type="submit">Send Message</button>
				</form>
			</div>
		</section>
	);
};

export default Contact;
