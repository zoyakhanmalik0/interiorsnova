# ✅ Vercel Deployment Checklist

## Pre-Deployment (Local Testing)

- [ ] Server running locally: `npm run dev`
- [ ] Contact form works: fills and submits successfully
- [ ] Email received in both inboxes
- [ ] API health check: `http://localhost:5000/api/health`

## Project Structure

- ✅ `/api/index.js` - Exported Express app (serverless-ready)
- ✅ `/public/*` - All HTML, CSS, JS files
- ✅ `vercel.json` - Vercel configuration
- ✅ `.vercelignore` - Ignore unnecessary files
- ✅ `package.json` - Dependencies specified

## Deployment Steps

### 1. Push to GitHub
```bash
git add .
git commit -m "Vercel deployment ready"
git push origin main
```

### 2. Import to Vercel
- Go to: https://vercel.com/dashboard
- Click: "Add New" → "Project"
- Select: Your GitHub repository
- Framework: "Other"
- Deploy!

### 3. Add Environment Variables
In Vercel Dashboard → Settings → Environment Variables:

```
KEY                    VALUE
────────────────────────────────────────────
EMAIL_USER            muzamilelahi01@gmail.com
EMAIL_PASSWORD        gflz guog lpis weuf
BUSINESS_EMAIL        interiorsnova.store@gmail.com
NODE_ENV              production
```

### 4. Redeploy (if needed)
- After adding env vars, go to Deployments
- Click latest deployment
- Click "Redeploy"

## After Deployment

- [ ] Visit your Vercel domain (https://your-project.vercel.app)
- [ ] Website loads correctly
- [ ] Fill contact form
- [ ] Submit form
- [ ] Check: ✅ Email sent successfully!
- [ ] Check inboxes for emails

## Troubleshooting URLs

- **Logs**: https://vercel.com → Deployments → Click deployment → Logs
- **Settings**: https://vercel.com → Project → Settings
- **Environment Vars**: Settings → Environment Variables
- **Domains**: Settings → Domains

## Common Issues & Fixes

| Issue | Solution |
|-------|----------|
| Blank page | Check Logs for errors |
| Email not sending | Verify env variables in dashboard |
| API 404 error | Check `vercel.json` routing |
| CORS errors | Already enabled in `api/index.js` |
| Module not found | Run `npm install` locally, push to git |

## Gmail App Password

If email not working:
1. Go to: https://myaccount.google.com/apppasswords
2. Select: Mail + Windows Computer
3. Copy 16-character password
4. Update: `EMAIL_PASSWORD` in Vercel env vars
5. Redeploy

## Success Indicators

✅ All working when you see:
- Website loads at your Vercel domain
- Contact form visible
- Submit successful
- Email arrives in both inboxes

## Questions?

Check: `VERCEL_DEPLOYMENT_GUIDE.md` for detailed explanations
