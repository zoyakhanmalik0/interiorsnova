# Interiors Nova Email Server Setup Guide

## Overview
This backend email server handles contact form submissions from the Interiors Nova website and sends confirmation emails to both the business and the customer.

## Features
✅ Receives contact form data from website  
✅ Sends formatted HTML emails to business inbox  
✅ Sends confirmation emails to customers  
✅ Email validation and error handling  
✅ CORS enabled for frontend communication  
✅ Security: HTML escaping to prevent injection  

## Prerequisites
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Gmail Account** with 2-Factor Authentication enabled

## Installation Steps

### Step 1: Install Node.js
Download and install Node.js from [nodejs.org](https://nodejs.org/). This will also install npm automatically.

### Step 2: Navigate to Project Directory
```bash
cd "c:\Users\muzam\OneDrive\Desktop(1)\Wajeeha Project"
```

### Step 3: Install Dependencies
```bash
npm install
```

This installs all required packages:
- **express**: Web framework for Node.js
- **nodemailer**: Email sending library
- **cors**: Cross-Origin Resource Sharing
- **dotenv**: Environment variable management

### Step 4: Set Up Gmail App Password

#### Why App Password?
Gmail requires an "App Password" (not your regular password) for security reasons when using third-party apps.

#### How to Create App Password:

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable **2-Step Verification** (if not already enabled)
3. Go back to Security settings
4. Find **"App passwords"** (appears after 2FA is enabled)
5. Select **Mail** and **Windows Computer** (or your device)
6. Click **Generate**
7. Copy the 16-character password provided
8. Store this safely!

### Step 5: Create `.env` File
Create a new file named `.env` in the project root directory:

```
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_16_character_app_password
BUSINESS_EMAIL=interiorsnova.store@gmail.com
PORT=5000
NODE_ENV=development
```

**⚠️ IMPORTANT:**
- Replace `your_email@gmail.com` with your Gmail address
- Replace `your_16_character_app_password` with the password from Step 4
- **Never commit `.env` file to version control!**
- **Never share your app password!**

### Step 6: Update Contact Form API URL (Optional)
If running the server on a different port or domain, update the `API_URL` in `contact-us.html`:

```javascript
const API_URL = 'http://localhost:5000/api/send-email';
// Change to your server URL if different
```

## Running the Server

### Development Mode (with auto-restart):
```bash
npm run dev
```

### Production Mode:
```bash
npm start
```

### Expected Output:
```
🚀 Interiors Nova Email Server
📧 Server running on port 5000
🌐 API endpoint: http://localhost:5000/api/send-email
✅ Email service ready
```

## Testing the API

### Using cURL (Command Prompt):
```bash
curl -X POST http://localhost:5000/api/send-email ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Test User\",\"email\":\"test@example.com\",\"phone\":\"+923025289473\",\"subject\":\"custom-furniture\",\"message\":\"Test message\"}"
```

### Using Postman:
1. Create new POST request to `http://localhost:5000/api/send-email`
2. Headers: `Content-Type: application/json`
3. Body (JSON):
```json
{
  "name": "Test User",
  "email": "test@example.com",
  "phone": "+923025289473",
  "subject": "custom-furniture",
  "message": "Test message"
}
```

## Email Flow

```
Customer fills form → Browser sends POST → Server receives data
                                          ↓
                        ┌─────────────────┴─────────────────┐
                        ↓                                   ↓
                 Business Email                       Customer Email
           (Full submission details)          (Confirmation & thank you)
```

## API Endpoints

### POST `/api/send-email`
**Send contact form email**

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+923025289473",
  "subject": "custom-furniture",
  "message": "I'm interested in custom furniture design..."
}
```

**Valid Subjects:**
- `custom-furniture` → Custom Furniture Design
- `interior-design` → Interior Design Consultation
- `product-inquiry` → Product Inquiry
- `order-status` → Order Status
- `warranty-support` → Warranty Support
- `other` → Other Inquiry

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Email sent successfully! We will contact you soon."
}
```

**Response (Error - 400/500):**
```json
{
  "success": false,
  "message": "All fields are required"
}
```

### GET `/api/health`
**Health check endpoint**

**Response:**
```json
{
  "status": "Server is running"
}
```

## Troubleshooting

### Error: "Cannot find module 'express'"
**Solution:** Run `npm install` again

### Error: "Invalid login credentials"
**Solution:** 
- Verify EMAIL_USER and EMAIL_PASSWORD in `.env`
- Make sure you're using an **App Password**, not your regular Gmail password
- Re-generate the App Password and update `.env`

### Error: "CORS error"
**Solution:** Server must be running. Check:
1. Server is started (`npm run dev`)
2. Port 5000 is available
3. API_URL in contact-us.html matches server URL

### Error: "Emails sent but not received"
**Solution:**
- Check spam/junk folder
- Verify email addresses in `.env`
- Check Gmail "Less secure app access" isn't blocking the connection

### Error: "Cannot POST /api/send-email"
**Solution:**
- Server is not running. Start with `npm run dev`
- Check that API_URL in contact-us.html matches server URL

## Production Deployment

### For Hosting on Platforms:
1. **Heroku**: Add `.env` variables in Config Vars
2. **AWS/DigitalOcean**: Set environment variables in deployment
3. **Local Network**: Update `API_URL` to your server's IP

### Security Checklist:
✅ Never commit `.env` file  
✅ Use environment variables for secrets  
✅ Enable HTTPS for production  
✅ Use strong email passwords  
✅ Implement rate limiting for production  
✅ Add input validation (already included)  

## File Structure
```
Wajeeha Project/
├── server.js                    # Main server file
├── package.json                 # Dependencies
├── .env                         # Environment variables (create this)
├── .env.example                 # Template for .env
├── contact-us.html              # Updated with API integration
└── (other website files)
```

## Support & Next Steps

### Additional Features to Implement:
- [ ] Rate limiting to prevent spam
- [ ] Database to store submissions
- [ ] Admin panel to view submissions
- [ ] Attachment support
- [ ] SMS notifications

### Maintenance:
- Keep Node.js updated
- Update npm packages regularly: `npm update`
- Monitor server logs
- Test email delivery regularly

## Environment Variable Reference

| Variable | Description | Example |
|----------|-------------|---------|
| EMAIL_USER | Your Gmail address | user@gmail.com |
| EMAIL_PASSWORD | Gmail App Password (16 chars) | abcd efgh ijkl mnop |
| BUSINESS_EMAIL | Where forms are sent | interiorsnova.store@gmail.com |
| PORT | Server port | 5000 |
| NODE_ENV | Environment type | development/production |

---

**Last Updated:** January 16, 2026  
**Version:** 1.0.0  
**Status:** ✅ Ready for Production
