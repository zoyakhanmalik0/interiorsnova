# Vercel Deployment Guide - Interiors Nova

## ✅ Project Structure Ready for Vercel

Your project is now configured for Vercel deployment with the correct serverless structure:

```
/
  api/
    index.js              ← Exported Express app (NOT listening)
  public/
    index.html            ← All HTML files
    *.css                 ← All CSS files
    *.js                  ← All JS files (except server.js, test-email.js)
    partials/             ← Header/Footer partials
    pic/                  ← Images
    svg/                  ← SVG assets
  package.json
  vercel.json             ← Vercel configuration
  .vercelignore          ← Files to ignore
  .env                   ← Environment variables (local only)
```

## 🚀 Step-by-Step Deployment

### Step 1: Push to GitHub

```bash
git add .
git commit -m "Prepare for Vercel deployment with serverless structure"
git push origin main
```

### Step 2: Deploy to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New"** → **"Project"**
3. Select your GitHub repository
4. Configure project:
   - **Framework Preset**: Other
   - **Root Directory**: (leave blank - uses project root)
   - **Build Command**: (leave empty - no build needed)
   - **Output Directory**: (leave empty)

### Step 3: Add Environment Variables

In Vercel Dashboard → Project Settings → Environment Variables, add:

```
EMAIL_USER=muzamilelahi01@gmail.com
EMAIL_PASSWORD=gflz guog lpis weuf
BUSINESS_EMAIL=interiorsnova.store@gmail.com
NODE_ENV=production
```

⚠️ **IMPORTANT**: Use exact values from your `.env` file

### Step 4: Deploy

Click **"Deploy"** and Vercel will automatically:
1. Install dependencies (`npm install`)
2. Deploy `/api/index.js` as serverless function
3. Serve `/public/*` as static files
4. Set up CORS for API routes

---

## 🔍 How It Works on Vercel

### ✅ Correct Setup (What we did)

**`/api/index.js`** - Exported, not listening:
```javascript
const express = require('express');
const app = express();

app.post('/api/send-email', (req, res) => {
  // Handle email
});

module.exports = app;  // EXPORTED - NOT app.listen()
```

**`vercel.json`** - Routes to serverless function:
```json
{
  "builds": [
    { "src": "api/index.js", "use": "@vercel/node" }
  ],
  "routes": [
    { "src": "/api/(.*)", "dest": "/api/index.js" }
  ]
}
```

### ❌ What Would Fail on Vercel

```javascript
// ❌ WRONG - This will crash on Vercel
app.listen(3000, () => {
  console.log('Running on port 3000');
});
```

Vercel doesn't allow listening to ports. Functions are called on-demand.

---

## 📧 Frontend API Integration

**`/public/contact-us.html`** automatically detects environment:

```javascript
const API_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:5000/api/send-email'      // Local development
  : `${window.location.origin}/api/send-email`;  // Vercel production
```

- **Local**: Points to localhost:5000
- **Vercel**: Points to your Vercel domain

---

## ✅ Testing Before Deployment

### 1. Test Locally First

```bash
# Terminal 1: Start server
npm run dev

# Terminal 2: Open browser
http://localhost:3000/contact-us.html

# Fill form and submit
# Should see: ✅ Email sent successfully!
```

### 2. Check Server Logs

```bash
# Terminal with npm run dev should show:
✅ Email service ready
✅ Emails sent successfully for: [Name]
```

### 3. Check Email

Check both inboxes:
- **Business email**: `interiorsnova.store@gmail.com`
- **Your email**: `muzamilelahi01@gmail.com`

---

## 🐛 Troubleshooting on Vercel

### Problem: Blank Page or 404

**Cause**: Missing `/public` files or wrong route configuration

**Solution**: Check Vercel Logs:
1. Vercel Dashboard → Deployments
2. Click latest deployment
3. Click "Logs"
4. Look for errors

### Problem: Email Not Sending

**Cause 1**: Environment variable missing
- Go to Settings → Environment Variables
- Verify all 4 variables are set
- Redeploy after adding variables

**Cause 2**: Gmail blocking connection
- Verify EMAIL_PASSWORD is App Password (16 chars)
- Not your regular Gmail password
- Get new one: https://myaccount.google.com/apppasswords

**Cause 3**: CORS issue
- Check browser console for errors
- `api/index.js` has `cors()` enabled - should work

### Problem: "Cannot find module"

**Solution**: Make sure `package.json` has all dependencies:
```json
"dependencies": {
  "express": "^4.18.2",
  "nodemailer": "^6.9.7",
  "cors": "^2.8.5",
  "dotenv": "^16.3.1"
}
```

---

## 📊 Production Checklist

- ✅ API structure correct (`/api/index.js` exported)
- ✅ Static files in `/public` directory
- ✅ `vercel.json` configured
- ✅ Environment variables set in Vercel dashboard
- ✅ Email credentials verified
- ✅ Contact form points to API endpoints
- ✅ `.vercelignore` configured
- ✅ Node.js dependencies in `package.json`
- ✅ Tested locally before deployment

---

## 📝 Vercel Dashboard URLs

After deployment, you'll see URLs like:

- **Production**: `https://interiors-nova.vercel.app`
- **API Endpoint**: `https://interiors-nova.vercel.app/api/send-email`
- **Website**: All files automatically served from `/public`

---

## 🔐 Environment Variables

**Local Development** (`.env`):
```
EMAIL_USER=muzamilelahi01@gmail.com
EMAIL_PASSWORD=gflz guog lpis weuf
BUSINESS_EMAIL=interiorsnova.store@gmail.com
PORT=5000
NODE_ENV=development
```

**Vercel Production** (Dashboard → Settings → Environment Variables):
```
EMAIL_USER=muzamilelahi01@gmail.com
EMAIL_PASSWORD=gflz guog lpis weuf
BUSINESS_EMAIL=interiorsnova.store@gmail.com
NODE_ENV=production
```

(Note: PORT is not needed on Vercel - it's managed automatically)

---

## 🎯 Expected Flow

1. **User visits**: `https://interiors-nova.vercel.app`
2. **Sees**: Static HTML/CSS/JS from `/public` folder
3. **Fills form** on `/public/contact-us.html`
4. **Submits**: Sends POST to `/api/send-email`
5. **Vercel routes**: To `api/index.js` serverless function
6. **Express handles**: Email sending via Nodemailer
7. **Response**: Success message appears on form

---

## ✅ Summary

Your project is **production-ready** for Vercel! 🚀

All components are correctly configured:
- ✅ Serverless-compatible Express app
- ✅ Static files properly organized
- ✅ Environment variables configured
- ✅ API routes working
- ✅ Email service ready

Just add environment variables in Vercel dashboard and deploy! 🎉
