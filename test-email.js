/**
 * Email Service Diagnostic Tool
 * Helps identify issues with the email server and Gmail configuration
 */

const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

console.log(`
╔════════════════════════════════════════════════════════════════╗
║     INTERIORS NOVA EMAIL SERVICE DIAGNOSTIC TOOL               ║
║                                                                ║
║     Checking Gmail configuration and email delivery...        ║
╚════════════════════════════════════════════════════════════════╝
`);

// Step 1: Check environment variables
console.log('📋 STEP 1: Checking Environment Variables...\n');

if (!process.env.EMAIL_USER) {
  console.log('❌ EMAIL_USER not found in .env file');
  process.exit(1);
} else {
  console.log(`✅ EMAIL_USER: ${process.env.EMAIL_USER}`);
}

if (!process.env.EMAIL_PASSWORD) {
  console.log('❌ EMAIL_PASSWORD not found in .env file');
  process.exit(1);
} else {
  console.log(`✅ EMAIL_PASSWORD: ${process.env.EMAIL_PASSWORD.substring(0, 5)}... (hidden for security)`);
}

if (!process.env.BUSINESS_EMAIL) {
  console.log('⚠️  BUSINESS_EMAIL not found, using default: interiorsnova.store@gmail.com');
  process.env.BUSINESS_EMAIL = 'interiorsnova.store@gmail.com';
}
console.log(`✅ BUSINESS_EMAIL: ${process.env.BUSINESS_EMAIL}`);

console.log(`✅ PORT: ${process.env.PORT || 5000}`);
console.log(`✅ NODE_ENV: ${process.env.NODE_ENV || 'development'}\n`);

// Step 2: Validate email format
console.log('📋 STEP 2: Validating Email Format...\n');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(process.env.EMAIL_USER)) {
  console.log(`❌ EMAIL_USER format is invalid: ${process.env.EMAIL_USER}`);
  process.exit(1);
} else {
  console.log(`✅ EMAIL_USER format is valid`);
}

if (!emailRegex.test(process.env.BUSINESS_EMAIL)) {
  console.log(`❌ BUSINESS_EMAIL format is invalid: ${process.env.BUSINESS_EMAIL}`);
  process.exit(1);
} else {
  console.log(`✅ BUSINESS_EMAIL format is valid\n`);
}

// Step 3: Check Gmail App Password
console.log('📋 STEP 3: Validating Gmail App Password...\n');

const password = process.env.EMAIL_PASSWORD;
const passwordNoSpaces = password.replace(/\s/g, '');

if (passwordNoSpaces.length === 16) {
  console.log(`✅ Password length is correct (16 characters)`);
} else {
  console.log(`⚠️  Password length is ${passwordNoSpaces.length} (should be 16)`);
  console.log(`   Make sure you're using Gmail App Password, not your regular password`);
}

if (!/^[a-z\s]{16,}$/.test(password)) {
  console.log(`⚠️  Password contains unexpected characters`);
  console.log(`   Gmail App Passwords should only contain lowercase letters and spaces`);
}

console.log();

// Step 4: Test Gmail Connection
console.log('📋 STEP 4: Testing Gmail Connection...\n');

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

console.log('🔄 Verifying SMTP connection...\n');

transporter.verify((error, success) => {
  if (error) {
    console.log('❌ SMTP Connection Failed!\n');
    console.log('Error Details:');
    console.log(`   ${error.message}\n`);

    // Provide helpful error messages
    if (error.message.includes('Invalid login')) {
      console.log('💡 COMMON ISSUE: Invalid Gmail credentials');
      console.log('   Solution:');
      console.log('   1. Check that EMAIL_USER is correct');
      console.log('   2. Generate a new App Password from Gmail Account Settings');
      console.log('   3. Make sure you\'re using App Password, NOT your regular password');
      console.log('   4. Visit: https://myaccount.google.com/apppasswords\n');
    }

    if (error.message.includes('disabled')) {
      console.log('💡 COMMON ISSUE: Gmail security restrictions');
      console.log('   Solution:');
      console.log('   1. Enable 2-Step Verification on your Google Account');
      console.log('   2. Create an App Password for "Mail" on "Windows Computer"');
      console.log('   3. Use the generated 16-character password\n');
    }

    console.log('Detailed Error:');
    console.log(error);
    process.exit(1);
  } else {
    console.log('✅ SMTP Connection Successful!\n');

    // Step 5: Send test email
    console.log('📋 STEP 5: Sending Test Email...\n');

    const testEmail = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to yourself for testing
      subject: 'Interiors Nova Email Service - Test Email ✅',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #d6a71e 0%, #b8904a 100%); padding: 20px; text-align: center; color: white; border-radius: 8px;">
            <h2 style="margin: 0;">Email Service Test Successful! ✅</h2>
          </div>
          
          <div style="background: #f9f9f9; padding: 30px; border: 1px solid #ddd; border-radius: 0 0 8px 8px;">
            <p style="color: #222;">Hello,</p>
            
            <p style="color: #555; line-height: 1.6;">
              Your Interiors Nova email service is working correctly! 🎉
            </p>

            <div style="background: #e8f5e9; padding: 15px; border-left: 4px solid #4caf50; margin: 20px 0; border-radius: 4px;">
              <p style="margin: 0; color: #2e7d32;"><strong>Email Service Status: ✅ OPERATIONAL</strong></p>
            </div>

            <p style="color: #555; line-height: 1.6;">
              You can now test the contact form on your website. The contact form will:
            </p>
            <ul style="color: #555;">
              <li>Send form data to your backend server</li>
              <li>Email details to your business email</li>
              <li>Send a confirmation to the customer</li>
            </ul>

            <p style="color: #555; line-height: 1.6;">
              <strong>Test Details:</strong><br>
              Sent From: ${process.env.EMAIL_USER}<br>
              Date: ${new Date().toLocaleString()}<br>
              Server: Node.js + Express + Nodemailer
            </p>

            <p style="color: #555; line-height: 1.6;">
              If you received this email, your email service is ready for production! 🚀
            </p>
          </div>
        </div>
      `
    };

    transporter.sendMail(testEmail, (error, info) => {
      if (error) {
        console.log('❌ Test Email Failed!\n');
        console.log('Error:');
        console.log(error);
        process.exit(1);
      } else {
        console.log('✅ Test Email Sent Successfully!\n');
        console.log(`   Message ID: ${info.messageId}`);
        console.log(`   Response: ${info.response}\n`);

        console.log('╔════════════════════════════════════════════════════════════════╗');
        console.log('║                  ✅ ALL TESTS PASSED!                          ║');
        console.log('╚════════════════════════════════════════════════════════════════╝\n');

        console.log('📊 Summary:');
        console.log('   ✅ Environment variables configured');
        console.log('   ✅ Email format valid');
        console.log('   ✅ Gmail SMTP connection established');
        console.log('   ✅ Test email sent successfully\n');

        console.log('🚀 Your email service is ready!\n');

        console.log('Next Steps:');
        console.log('   1. Ensure your backend server is running: npm run dev');
        console.log('   2. Open http://localhost:5000/api/health to verify server');
        console.log('   3. Test the contact form on your website');
        console.log('   4. Check your inbox for test email');
        console.log('   5. Monitor the server console for any errors\n');

        process.exit(0);
      }
    });
  }
});
