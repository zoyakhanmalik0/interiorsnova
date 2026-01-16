/**
 * Interiors Nova Email Server
 * Backend API for handling contact form submissions and sending emails
 */

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure email transporter
const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASSWORD
	},
	tls: {
		rejectUnauthorized: false
	}
});

// Verify transporter connection
transporter.verify((error, success) => {
	if (error) {
		console.log('❌ Email service error:', error);
	} else {
		console.log('✅ Email service ready');
	}
});

/**
 * POST /api/send-email
 * Handle contact form submissions and send email
 */
app.post('/api/send-email', async (req, res) => {
	try {
		const { name, email, phone, subject, message } = req.body;

		// Validate required fields
		if (!name || !email || !phone || !subject || !message) {
			return res.status(400).json({
				success: false,
				message: 'All fields are required'
			});
		}

		// Validate email format
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return res.status(400).json({
				success: false,
				message: 'Invalid email format'
			});
		}

		// Email to Interiors Nova (business)
		const businessEmailOptions = {
			from: process.env.EMAIL_USER,
			to: process.env.BUSINESS_EMAIL || 'interiorsnova.store@gmail.com',
			subject: `New Contact Form Submission: ${subject}`,
			html: `
				<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
					<div style="background: linear-gradient(135deg, #d6a71e 0%, #b8904a 100%); padding: 20px; text-align: center; color: white; border-radius: 8px 8px 0 0;">
						<h2 style="margin: 0;">New Contact Form Submission</h2>
					</div>
					
					<div style="background: #f9f9f9; padding: 30px; border: 1px solid #ddd; border-radius: 0 0 8px 8px;">
						<h3 style="color: #222; margin-top: 0;">Contact Details</h3>
						
						<table style="width: 100%; border-collapse: collapse;">
							<tr>
								<td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong style="color: #555;">Name:</strong></td>
								<td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #222;">${escapeHtml(name)}</td>
							</tr>
							<tr>
								<td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong style="color: #555;">Email:</strong></td>
								<td style="padding: 10px 0; border-bottom: 1px solid #eee;"><a href="mailto:${escapeHtml(email)}" style="color: #d6a71e; text-decoration: none;">${escapeHtml(email)}</a></td>
							</tr>
							<tr>
								<td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong style="color: #555;">Phone:</strong></td>
								<td style="padding: 10px 0; border-bottom: 1px solid #eee;"><a href="tel:${escapeHtml(phone)}" style="color: #d6a71e; text-decoration: none;">${escapeHtml(phone)}</a></td>
							</tr>
							<tr>
								<td style="padding: 10px 0;"><strong style="color: #555;">Subject:</strong></td>
								<td style="padding: 10px 0; color: #222;">${formatSubject(subject)}</td>
							</tr>
						</table>

						<h3 style="color: #222; margin-top: 20px;">Message</h3>
						<p style="color: #555; line-height: 1.6; white-space: pre-wrap; background: #fff; padding: 15px; border-left: 4px solid #d6a71e; border-radius: 4px;">
${escapeHtml(message)}
						</p>

						<div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd;">
							<p style="font-size: 0.9rem; color: #999;">
								Submitted on ${new Date().toLocaleString()}
							</p>
						</div>
					</div>

					<div style="background: #f0f0f0; padding: 15px; text-align: center; font-size: 0.85rem; color: #666; border-radius: 0 0 8px 8px;">
						<p style="margin: 0;">This is an automated email from Interiors Nova contact form.</p>
					</div>
				</div>
			`
		};

		// Confirmation email to customer
		const customerEmailOptions = {
			from: process.env.EMAIL_USER,
			to: email,
			subject: 'Thank You for Contacting Interiors Nova',
			html: `
				<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
					<div style="background: linear-gradient(135deg, #d6a71e 0%, #b8904a 100%); padding: 20px; text-align: center; color: white; border-radius: 8px 8px 0 0;">
						<h2 style="margin: 0;">Interiors Nova</h2>
						<p style="margin: 5px 0 0 0; font-size: 0.95rem;">We've Received Your Message</p>
					</div>
					
					<div style="background: #f9f9f9; padding: 30px; border: 1px solid #ddd; border-radius: 0 0 8px 8px;">
						<p style="color: #222;">Hello ${escapeHtml(name)},</p>
						
						<p style="color: #555; line-height: 1.6;">
							Thank you for reaching out to Interiors Nova! We've received your message and appreciate your interest in our services.
						</p>

						<p style="color: #555; line-height: 1.6;">
							<strong>Message Details:</strong><br>
							Subject: ${formatSubject(subject)}<br>
							Submitted: ${new Date().toLocaleString()}
						</p>

						<p style="color: #555; line-height: 1.6;">
							Our team will review your inquiry and get back to you within 24 business hours. You can also reach us through:
						</p>

						<div style="background: #fff; padding: 20px; border-left: 4px solid #d6a71e; border-radius: 4px; margin: 20px 0;">
							<p style="margin: 0 0 10px 0; color: #222;"><strong>📞 Phone:</strong> <a href="tel:+923025289473" style="color: #d6a71e; text-decoration: none;">+92 302 5289473</a></p>
							<p style="margin: 0 0 10px 0; color: #222;"><strong>💬 WhatsApp:</strong> <a href="https://wa.me/923025289473" style="color: #d6a71e; text-decoration: none;">Message us on WhatsApp</a></p>
							<p style="margin: 0; color: #222;"><strong>📧 Email:</strong> <a href="mailto:interiorsnova.store@gmail.com" style="color: #d6a71e; text-decoration: none;">interiorsnova.store@gmail.com</a></p>
						</div>

						<p style="color: #555; line-height: 1.6;">
							Best regards,<br>
							<strong>The Interiors Nova Team</strong>
						</p>

						<div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd;">
							<p style="font-size: 0.85rem; color: #999; margin: 0;">
								This is an automated confirmation email. Please do not reply to this email.
							</p>
						</div>
					</div>
				</div>
			`
		};

		// Send both emails
		await Promise.all([
			transporter.sendMail(businessEmailOptions),
			transporter.sendMail(customerEmailOptions)
		]);

		console.log(`✅ Emails sent successfully for: ${name} (${email})`);

		res.status(200).json({
			success: true,
			message: 'Email sent successfully! We will contact you soon.'
		});

	} catch (error) {
		console.error('❌ Error sending email:', error);
		res.status(500).json({
			success: false,
			message: 'Error sending email. Please try again later or contact us directly.'
		});
	}
});

/**
 * GET /api/health
 * Health check endpoint
 */
app.get('/api/health', (req, res) => {
	res.json({ status: 'Server is running' });
});

/**
 * Utility function to escape HTML
 */
function escapeHtml(text) {
	const map = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		"'": '&#039;'
	};
	return text.replace(/[&<>"']/g, m => map[m]);
}

/**
 * Utility function to format subject
 */
function formatSubject(subject) {
	const subjects = {
		'custom-furniture': 'Custom Furniture Design',
		'interior-design': 'Interior Design Consultation',
		'product-inquiry': 'Product Inquiry',
		'order-status': 'Order Status',
		'warranty-support': 'Warranty Support',
		'other': 'Other Inquiry'
	};
	return subjects[subject] || subject;
}

// Error handling middleware
app.use((err, req, res, next) => {
	console.error('Server error:', err);
	res.status(500).json({
		success: false,
		message: 'Server error. Please try again later.'
	});
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`
🚀 Interiors Nova Email Server
📧 Server running on port ${PORT}
🌐 API endpoint: http://localhost:${PORT}/api/send-email
	`);
});
