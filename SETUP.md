# 🚀 GitHub Setup Guide - Trading Dashboard

## Complete Step-by-Step Instructions for Publishing

### PART A: Create GitHub Repository

#### Step 1: Sign Up / Login to GitHub

1. Go to [github.com](https://github.com)
2. If you don't have an account, click **Sign up**
3. If you do, click **Sign in**
4. Use your email and create a strong password

#### Step 2: Create New Repository

1. Click the **+** icon in top right → **New repository**
   - Or go to [github.com/new](https://github.com/new)

2. Fill in the form:
   ```
   Repository name: trading-dashboard
   Description: Trading journal and analytics dashboard with multi-user support
   Privacy: PUBLIC (required for free GitHub Pages)
   Initialize with README: NO (we'll upload our own)
   ```

3. Click **Create repository**

#### Step 3: Upload Your Files

You'll see an empty repository with instructions. Follow these steps:

**Option A: Using GitHub Web Interface (Easiest)**

1. Click **Add file → Upload files**
2. In the file picker, select these 3 files:
   - `index.html` (the dashboard)
   - `README.md` (the guide)
   - `.gitignore` (optional, for best practices)

3. At bottom, click **Commit changes**

**Option B: Using Git Command Line (If you know Git)**

```bash
git clone https://github.com/YOUR_USERNAME/trading-dashboard.git
cd trading-dashboard
# Copy index.html, README.md, .gitignore into this folder
git add .
git commit -m "Initial commit: add trading dashboard"
git push origin main
```

#### Step 4: Enable GitHub Pages

1. In your repository, go to **Settings** (top right)
2. In the left sidebar, click **Pages**
3. Under "Source", select **main** branch
4. Click **Save**
5. Wait 1-2 minutes
6. You'll see: "Your site is live at: `https://YOUR_USERNAME.github.io/trading-dashboard`"

**That's it! Your dashboard is now online.** ✅

---

### PART B: Set Up Google Sheet Backend

This lets all users share data via Google Sheet.

#### Step 1: Open Your Google Sheet

Open: https://docs.google.com/spreadsheets/d/15aXPbZEIxvk4U0W1wMCj4VJNnKMBl9ddvQL9DWIDGSU/edit

#### Step 2: Create Apps Script

1. Click **Extensions** (top menu)
2. Click **Apps Script**
3. A new tab opens with editor
4. **Delete** the default `myFunction()` code
5. **Paste** this entire code:

```javascript
function doGet(e){return handle(e);}
function doPost(e){return handle(e);}
function handle(e){
  var sheet=SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  var headers=['Trade ID','Symbol','Buy/Sell','Entry Date','Entry Time','Entry Price','Quantity','Leverage','Stop Loss','Target Price','Price After 5 Min','Price After 10 Min','Price After 20 Min','Price After 30 Min','Exit Price','Profit / Loss','Result','Remarks'];
  if(sheet.getLastRow()===0){sheet.appendRow(headers);}
  var params=e.parameter||{};
  var action=params.action||'list';
  if(action==='list'){
    var rows=sheet.getDataRange().getValues();
    rows.shift();
    return out(rows);
  }
  if(action==='replaceAll'){
    var data=JSON.parse(params.rows||'[]');
    sheet.clearContents();
    sheet.appendRow(headers);
    data.forEach(function(r){sheet.appendRow(r);});
    return out({ok:true});
  }
  return out({error:'unknown action'});
}
function out(obj){
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
```

6. **Save** (Ctrl+S or Cmd+S)

#### Step 3: Deploy as Web App

1. Click **Deploy** (top right button)
2. Click **New deployment** (if you see this option)
3. Click the ⚙️ icon, select **Web app**
4. Fill in:
   ```
   Execute as: [Your email/account]
   Who has access: Anyone
   ```
5. Click **Deploy**
6. You'll see a popup with a URL that looks like:
   ```
   https://script.google.com/macros/d/[long-id]/usercopy
   OR
   https://script.google.com/macros/s/[long-id]/exec
   ```

7. **COPY THIS URL** (you'll need it!)
8. Click **Done**

#### Step 4: Make Sheet Shareable (Optional but Recommended)

So team members can see the data in the actual Google Sheet:

1. Go back to your Google Sheet
2. Click **Share** (top right)
3. Set permissions to: **Anyone with the link can view**
4. Copy the sheet link and share with your team

---

### PART C: Share With Your Team

Send your team members this message:

---

**📊 Trading Dashboard - Team Setup**

Hi team! Here's how to use the trading dashboard:

**Dashboard Link:**
```
https://YOUR_USERNAME.github.io/trading-dashboard
```

**Setup (One-time, takes 30 seconds):**

1. Open the dashboard link above
2. Click the **"Google Sheet sync"** button (top right)
3. Ask me (admin) for the "Web app URL" - I'll send it to you
4. Paste it in the **"Web app URL"** field
5. Click **"Pull from sheet"** to load existing trades

**Using It:**

- Click **"Add trade"** to log a new trade
- Fill in your trade details
- Click **"Save trade"**
- Your data saves locally automatically

**Syncing:**
- Click **"Google Sheet sync"** → **"Push to sheet"** to send your trades to the shared sheet
- Click **"Google Sheet sync"** → **"Pull from sheet"** to get the latest trades from teammates

**Filters:**
- Use date filters, Buy/Sell, Win/Loss to analyze your trades
- Charts update automatically

Questions? Message me!

---

---

### PART D: Update Your Dashboard in Future

If you want to update the code:

1. Edit the `index.html` file
2. Go to your GitHub repository
3. Click **Edit file** (pencil icon) on index.html
4. Make your changes
5. Click **Commit changes**
6. Your live site updates automatically (might take 1 minute)

---

## Troubleshooting

### Issue: "This site can't be reached"

**Solution:**
- Wait 2-3 minutes after enabling Pages, refresh the page
- Check repository is PUBLIC (not private)
- Check the URL matches: `https://YOUR_USERNAME.github.io/trading-dashboard`

### Issue: "Could not reach the sheet" in dashboard

**Solution:**
- Check Web app URL is copied correctly (no extra spaces)
- Make sure Google Sheet is still accessible
- Try redeploying the Apps Script:
  - Go to Apps Script
  - Click **Deploy** → **Manage deployments**
  - Delete old deployment
  - Click **Deploy** → **New deployment** again

### Issue: Data not syncing between users

**Solution:**
- Make sure everyone is using the **same Web app URL**
- Always click **"Pull from sheet"** after a teammate pushes
- Check that Apps Script deployment is set to "Anyone" access

---

## Security Notes

⚠️ **Public GitHub Repository**
- Your code is visible to everyone (but that's OK - it's just the HTML/CSS/JS)
- Your Google Sheet data is NOT exposed (protected by the Apps Script)

⚠️ **Google Sheet Security**
- Anyone with the Web app URL can push trades to your sheet
- For team use only - don't share the URL publicly

---

## Next Steps

1. ✅ Create GitHub repo
2. ✅ Upload files
3. ✅ Enable Pages
4. ✅ Set up Apps Script
5. ✅ Deploy Web app
6. ✅ Share dashboard link with team

**That's it! You're live with a multi-user trading dashboard! 🎉**

---

Questions? Check README.md or create an issue on GitHub.
