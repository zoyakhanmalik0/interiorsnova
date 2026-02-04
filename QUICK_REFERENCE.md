# ⚡ Vercel Deployment Quick Reference

## 📁 File Structure

```
✅ api/index.js                    Serverless function (exported, NOT listening)
✅ public/*                        All website files (HTML/CSS/JS)
✅ vercel.json                    Routing configuration
✅ package.json                   Dependencies
✅ .env                           Local variables (NOT uploaded)
```

## 🚀 Deploy in 5 Minutes

### 1️⃣ Git Push
```bash
git add .
git commit -m "Ready for Vercel"
git push
```

### 2️⃣ Import Project
- Visit: https://vercel.com/dashboard
- Click: "Add New Project"
- Select: Your GitHub repo

### 3️⃣ Add Environment Variables
```
EMAIL_USER=muzamilelahi01@gmail.com
EMAIL_PASSWORD=gflz guog lpis weuf
BUSINESS_EMAIL=interiorsnova.store@gmail.com
NODE_ENV=production
```

### 4️⃣ Deploy
Click "Deploy" button and wait ⏳

### 5️⃣ Test
- Visit: Your Vercel domain
- Fill: Contact form
- Submit: Should work! ✅

---

## 🔗 Important URLs

| URL | Purpose |
|-----|---------|
| https://vercel.com/dashboard | Manage projects |
| https://your-project.vercel.app | Your live website |
| https://your-project.vercel.app/api/health | API status |
| Dashboard → Deployments → Logs | Error checking |

---

## ⚙️ Environment Variables

### Where to Add:
`Vercel Dashboard → Your Project → Settings → Environment Variables`

### Required 4 Variables:
```
1. EMAIL_USER = muzamilelahi01@gmail.com
2. EMAIL_PASSWORD = gflz guog lpis weuf
3. BUSINESS_EMAIL = interiorsnova.store@gmail.com
4. NODE_ENV = production
```

---

## 🐛 If Something Goes Wrong

### Blank Page?
- Check: Vercel Logs (Dashboard → Deployments → Click deployment → Logs)
- Look for: Error messages

### Email Not Sending?
- Verify: All 4 env variables in Vercel Settings
- Check: Emails are going to spam folder
- Confirm: Gmail App Password is correct (16 chars)

### 404 on API?
- Check: `vercel.json` has correct routing
- Confirm: `/api/index.js` exists
- Verify: Environment variables redeployed

---

## 📧 Gmail App Password

If email stops working:

1. Go: https://myaccount.google.com/apppasswords
2. Select: Mail + Windows Computer
3. Copy: 16-character password
4. Update: EMAIL_PASSWORD in Vercel
5. Redeploy: Project

---

## ✅ Pre-Deployment Checklist

Before deploying to Vercel:

- [ ] Run `npm run dev` locally - works?
- [ ] Contact form submits - works?
- [ ] Emails received - check both?
- [ ] All files in `/public` - yes?
- [ ] `api/index.js` exported - yes?
- [ ] Git repo updated - yes?

---

## 🎯 Success Indicator

You'll know it's working when:

✅ Website loads at your Vercel domain  
✅ Contact form visible  
✅ Form submits without error  
✅ Emails arrive in inboxes  
✅ Console shows no errors  

---

## 📞 Common Commands

### Local Testing:
```bash
npm install          # Install dependencies
npm run dev          # Start server on :5000
npm run start        # Start production server
node test-email.js   # Test email sending
```

### Git:
```bash
git status           # Check changes
git add .            # Add all files
git commit -m "msg"  # Commit
git push             # Push to GitHub
```

---

## 📊 Project Status

| Component | Status | Details |
|-----------|--------|---------|
| Email Server | ✅ Verified | Works locally, tested |
| Dependencies | ✅ Installed | 101 packages |
| Structure | ✅ Ready | Vercel-compatible |
| Environment | ✅ Configured | .env set up |
| Documentation | ✅ Complete | 3 guides created |

---

**Next Step**: Push to GitHub and deploy to Vercel! 🚀
