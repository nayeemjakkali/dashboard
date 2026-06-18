# 📊 Trading Dashboard

A professional trading journal and analytics dashboard for tracking trades, P&L, and performance metrics. Works with multiple users sharing a Google Sheet.

**Live Demo:** https://yourusername.github.io/trading-dashboard

## Features

✅ **Add/Edit/Delete Trades** - Full CRUD with form validation  
✅ **Auto P&L Calculation** - `(Exit − Entry) × Quantity × Leverage`  
✅ **5 Analytics Charts** - Equity curve, Win/Loss, P&L by symbol, Price path, Trades by date  
✅ **Date Range Filters** - Filter by date, side (Buy/Sell), result (Win/Loss)  
✅ **Real-Time Sync** - Push/Pull trades to shared Google Sheet  
✅ **Multi-User Ready** - All users see same data via Google Sheet  
✅ **Works Anywhere** - Desktop, tablet, phone - no installation needed  

## Quick Start

### For Users

1. Go to: `https://yourusername.github.io/trading-dashboard`
2. Click **"Google Sheet sync"** → Paste the Web App URL (shared by admin)
3. Click **"Pull from sheet"** to load existing trades
4. Add your trades, they auto-save locally
5. Click **"Push to sheet"** to sync with the team

### For Admin - First Time Setup

#### Step 1: Create GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Repository name: `trading-dashboard`
3. Description: `Trading journal and analytics dashboard`
4. Choose **Public**
5. Click **Create repository**

#### Step 2: Upload Files

1. Click **Add file → Upload files**
2. Upload **index.html** (the dashboard file)
3. Upload **README.md** (this file)
4. Click **Commit changes**

#### Step 3: Enable GitHub Pages

1. Go to repository **Settings**
2. Scroll to **"Pages"** (left sidebar)
3. Under "Source", select **main** branch
4. Click **Save**
5. Your site is live at: `https://yourusername.github.io/trading-dashboard`

#### Step 4: Set Up Google Sheet Backend

1. Open your Google Sheet: [Trade data](https://docs.google.com/spreadsheets/d/15aXPbZEIxvk4U0W1wMCj4VJNnKMBl9ddvQL9DWIDGSU/)
2. Go to **Extensions → Apps Script**
3. Delete any starter code
4. Paste this script:

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

5. Click **Deploy → New deployment**
6. Type: **Web app**
7. Execute as: **Your account**
8. Who has access: **Anyone**
9. Click **Deploy**
10. **Copy the Web app URL** (you'll see it in the popup)

#### Step 5: Share With Team

Send everyone this link:
```
https://yourusername.github.io/trading-dashboard
```

And share the **Web app URL** from step 10 above (or they can find it in the code).

## How to Use

### Adding a Trade

1. Click **"Add trade"**
2. Fill in:
   - **Symbol** (e.g., NIFTY, RELIANCE)
   - **Buy/Sell** toggle
   - **Entry date** and time
   - **Entry price, Quantity, Leverage**
   - **Exit price** (leave blank if still open)
   - **Stop loss, Target price** (optional)
   - **Price after 5/10/20/30 min** (optional - for analysis)
   - **Remarks** (notes about the trade)
3. P&L auto-calculates
4. Click **Save trade**

### Syncing With Google Sheet

**Push (Dashboard → Sheet):**
1. Click **Google Sheet sync**
2. Paste the Web app URL
3. Click **Push to sheet**
4. All your trades are now in the shared Google Sheet

**Pull (Sheet → Dashboard):**
1. Click **Google Sheet sync**
2. Paste the Web app URL
3. Click **Pull from sheet**
4. Your dashboard now has the latest data from the sheet

### Filtering & Analysis

- **Date range:** Enter "From date" and "To date" to filter
- **Side filter:** Show only Buy or Sell trades
- **Result filter:** Show Win, Loss, Breakeven, or Open trades
- **Search:** Find trades by symbol or remarks

All charts update automatically based on your filters.

## Charts & Metrics

**6 Metric Cards:**
- Total trades (open/closed)
- Net P&L
- Win rate %
- Average win/loss
- Best single trade

**5 Charts:**
1. **Equity Curve** - Cumulative P&L over time
2. **Win/Loss Split** - Pie chart of results
3. **P&L by Symbol** - Which trades made/lost money
4. **Price Path** - Avg % movement at 5/10/20/30 min after entry
5. **Trades by Date** - Daily trade count, P&L, Buy/Sell breakdown

## Data Storage

- **Local:** Each browser saves data locally using `localStorage`
- **Shared:** Push/Pull to Google Sheet for team collaboration
- **Backup:** Export as CSV anytime from the dashboard

## Browser Support

Works on any modern browser:
- Chrome, Edge, Firefox, Safari (desktop & mobile)
- Responsive design for all screen sizes

## Troubleshooting

**"Could not reach the sheet"**
- Check the Web app URL is correct
- Make sure Google Sheet is shared with "Anyone" access
- Try redeploying the Apps Script

**Data not syncing**
- Click **Pull from sheet** after someone pushes
- Check that everyone is using the same Web app URL

**Charts not showing**
- Refresh the page
- Check browser console (F12) for errors

## Support

For issues, create an issue on GitHub or contact the admin.

---

**Made with ❤️ for traders**
