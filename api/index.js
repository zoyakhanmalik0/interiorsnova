/**
 * Interiors Nova Email Server - Vercel Serverless Function
 * This is exported as a serverless function for Vercel deployment
 * DO NOT use app.listen() - Vercel handles the server
 */

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const dotenv = require('dotenv');

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

// Verify transporter connection on startup
transporter.verify((error, success) => {
	if (error) {
		console.log('❌ Email service error:', error.message);
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

		// Prepare email content
		const emailHTML = `
		<!DOCTYPE html>
		<html>
		<head>
			<style>
				body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
				.container { max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 20px; border-radius: 8px; }
				.header { background: linear-gradient(135deg, #d6a71e 0%, #b8904a 100%); color: white; padding: 20px; text-align: center; border-radius: 8px; margin-bottom: 20px; }
				.content { background: white; padding: 20px; border-radius: 8px; border: 1px solid #ddd; }
				.field { margin: 15px 0; }
				.label { font-weight: bold; color: #d6a71e; margin-bottom: 5px; }
				.value { padding: 10px; background: #f0f0f0; border-radius: 4px; border-left: 4px solid #d6a71e; }
				.footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; text-align: center; }
			</style>
		</head>
		<body>
			<div class="container">
				<div class="header">
					<h2>New Contact Form Submission - Interiors Nova</h2>
				</div>
				
				<div class="content">
					<div class="field">
						<div class="label">Name:</div>
						<div class="value">${name}</div>
					</div>
					
					<div class="field">
						<div class="label">Email:</div>
						<div class="value"><a href="mailto:${email}">${email}</a></div>
					</div>
					
					<div class="field">
						<div class="label">Phone:</div>
						<div class="value"><a href="tel:${phone}">${phone}</a></div>
					</div>
					
					<div class="field">
						<div class="label">Subject:</div>
						<div class="value">${subject}</div>
					</div>
					
					<div class="field">
						<div class="label">Message:</div>
						<div class="value">${message.replace(/\n/g, '<br>')}</div>
					</div>
					
					<div class="footer">
						<p>Submitted on: ${new Date().toLocaleString()}</p>
						<p>© 2026 Interiors Nova. All rights reserved.</p>
					</div>
				</div>
			</div>
		</body>
		</html>
		`;

		// Email to business
		await transporter.sendMail({
			from: process.env.EMAIL_USER,
			to: process.env.BUSINESS_EMAIL,
			subject: `New Contact Form: ${subject} - From ${name}`,
			html: emailHTML,
			replyTo: email
		});

		// Confirmation email to customer
		const confirmationHTML = `
		<!DOCTYPE html>
		<html>
		<head>
			<style>
				body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
				.container { max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 20px; border-radius: 8px; }
				.header { background: linear-gradient(135deg, #d6a71e 0%, #b8904a 100%); color: white; padding: 20px; text-align: center; border-radius: 8px; margin-bottom: 20px; }
				.content { background: white; padding: 20px; border-radius: 8px; border: 1px solid #ddd; }
				.footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; text-align: center; }
			</style>
		</head>
		<body>
			<div class="container">
				<div class="header">
					<h2>Message Received ✅</h2>
				</div>
				
				<div class="content">
					<p>Hello ${name},</p>
					
					<p>Thank you for reaching out to <strong>Interiors Nova</strong>! We have received your message and will get back to you as soon as possible.</p>
					
					<p><strong>Your Message Details:</strong></p>
					<p><strong>Subject:</strong> ${subject}</p>
					<p>We typically respond within 24-48 hours.</p>
					
					<p>If you have any urgent inquiries, feel free to contact us directly:</p>
					<ul>
						<li>📞 <strong>Phone:</strong> +92 302 528 9473</li>
						<li>💬 <strong>WhatsApp:</strong> +92 302 528 9473</li>
						<li>📧 <strong>Email:</strong> interiorsnova.store@gmail.com</li>
					</ul>
					
					<div class="footer">
						<p>© 2026 Interiors Nova. All rights reserved.</p>
						<p>Thank you for choosing us!</p>
					</div>
				</div>
			</div>
		</body>
		</html>
		`;

		await transporter.sendMail({
			from: process.env.EMAIL_USER,
			to: email,
			subject: 'We Received Your Message - Interiors Nova',
			html: confirmationHTML
		});

		return res.status(200).json({
			success: true,
			message: 'Email sent successfully'
		});

	} catch (error) {
		console.error('❌ Email sending error:', error);
		return res.status(500).json({
			success: false,
			message: 'Failed to send email',
			error: process.env.NODE_ENV === 'development' ? error.message : 'Server error'
		});
	}
});

/**
 * GET /api/health
 * Health check endpoint for Vercel monitoring
 */
app.get('/api/health', (req, res) => {
	res.status(200).json({
		status: 'OK',
		service: 'Interiors Nova Email Service',
		timestamp: new Date().toISOString(),
		environment: process.env.NODE_ENV || 'production'
	});
});

// Export for Vercel - DO NOT add app.listen() here
module.exports = app;
