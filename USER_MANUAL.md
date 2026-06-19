# 📚 TRADING DASHBOARD - USER MANUAL

## Quick Start (2 minutes)

### First Time Setup

1. **Open Dashboard**
   - Go to: `https://yourusername.github.io/trading-dashboard`

2. **Request OTP**
   - Click "Request OTP"
   - Enter your email (the one admin added)
   - Click "Request OTP" button

3. **Check Email**
   - Open Gmail
   - Find email from "noreply@script.google.com"
   - Subject: "Trading Dashboard - Your OTP"
   - Copy the 6-digit code

4. **Verify OTP**
   - Paste the 6-digit code in the dashboard
   - Click "Verify OTP"
   - ✅ You're logged in!

---

## Dashboard Tour

### Top Bar (Navigation)

```
[TJ Logo] Trade Log       [Your Email] [ADMIN*]  [Synced]  [Sheet Sync] [Export] [Logout] [+ Add Trade]
```

- **Your Email:** Shows who you're logged in as
- **ADMIN badge:** Only visible if you're an admin
- **Synced:** Shows if data is saved
- **Sheet Sync:** Connect to Google Sheet
- **Export:** Download trades as CSV
- **Logout:** Sign out
- **+ Add Trade:** Create new trade

---

## Adding a Trade

### Step 1: Click "Add Trade"

Opens the trade entry form.

### Step 2: Fill Required Fields

**Required:**
- **Symbol** - Stock/instrument (e.g., NIFTY, TCS, RELIANCE)
- **Buy/Sell** - Toggle either Buy or Sell
- **Entry Date** - Date you entered the trade
- **Entry Price** - Price you bought/sold at

**Optional:**
- Entry Time
- Quantity (default: 1)
- Leverage (default: 1)
- Stop Loss
- Target Price
- Exit Price
- Price at 5/10/20/30 min
- Remarks

### Step 3: P&L Auto-Calculates

When you enter:
- Entry Price
- Exit Price
- Quantity
- Leverage

The system automatically calculates:
- **P&L** = (Exit - Entry) × Quantity × Leverage
  - For Sell: (Entry - Exit) × Quantity × Leverage
- **Result** = Win / Loss / Breakeven / Open

### Step 4: Save

Click "Save Trade" to add to dashboard.

Trade immediately:
- ✅ Appears in table
- ✅ Updates metrics
- ✅ Updates charts
- ✅ Saves to browser

---

## Trading Log Table

### Columns

| Column | What It Shows |
|--------|--------------|
| ID | Unique trade number |
| Symbol | Stock/currency pair |
| Buy/Sell | Direction (green=Buy, red=Sell) |
| Entry Date | When you entered |
| Time | Exact time |
| Entry $ | Price you entered at |
| Qty | Number of contracts/shares |
| Lev | Leverage used (1x = no leverage) |
| SL | Stop loss level |
| Target | Target price |
| @5m, @10m, @20m, @30m | Price movement tracking |
| Exit $ | Price you exited at |
| P&L | Profit or loss in rupees |
| Result | Win/Loss/Breakeven/Open |
| Remarks | Your notes |

### Actions

Each row has two buttons:

- **Edit** (pencil icon) - Modify trade details
- **Delete** (trash icon) - Remove trade (asks confirmation)

---

## Filters

Use filters to find specific trades:

### Date Range
- **From Date:** Only show trades on or after this date
- **To Date:** Only show trades on or before this date

### Buy/Sell Filter
- **All sides:** Show all trades
- **Buy:** Only buying trades
- **Sell:** Only selling trades

### Result Filter
- **All results:** Show all results
- **Win:** Only profitable trades
- **Loss:** Only losing trades
- **Breakeven:** Trades with ≈₹0 P&L
- **Open:** Incomplete trades (no exit price)

**Example:** To see all losing Buy trades in June:
1. Set From Date: 2026-06-01
2. Set To Date: 2026-06-30
3. Select "Buy" side
4. Select "Loss" result
5. Table shows only matching trades

---

## Metrics (Dashboard Cards)

Six key metrics at the top:

### 1. Total Trades
```
Total Trades: 15
5 closed
```
- Total trades logged
- How many are completed (with exit price)

### 2. Net P&L
```
Net P&L: ₹5,450
15 closed trades
```
- Total profit or loss across all closed trades
- Green if positive, red if negative

### 3. Win Rate
```
Win Rate: 73.3%
11W / 4L
```
- Percentage of trades that were profitable
- Total wins and losses

### 4. Avg Win
```
Avg Win: ₹650
per win
```
- Average profit on winning trades
- Helps see consistent winning size

### 5. Avg Loss
```
Avg Loss: -₹280
per loss
```
- Average loss on losing trades
- Negative number (shown in red)

### 6. Best Trade
```
Best Trade: ₹2,100
single best
```
- Your best single trade P&L
- Shows your profit potential

---

## Charts

### Equity Curve
- Shows cumulative P&L over all trades
- X-axis: Trade number (#1, #2, #3...)
- Y-axis: Cumulative profit/loss
- Helps see if you're trending up or down

### Win/Loss Split
- Pie chart showing proportion of wins/losses/breakeven
- Green = wins
- Red = losses
- Gray = breakeven

---

## Syncing with Google Sheet

### Why Sync?
- **Backup:** Your trades are stored in cloud
- **Team view:** Everyone sees the same data
- **Excel access:** Can analyze trades in Sheet

### How to Sync

#### Push Trades to Sheet (Upload)

1. Click **Sheet Sync** button
2. Paste your Web App URL (ask admin)
3. Click **Push to Sheet**
4. ✅ All trades now in Google Sheet

#### Pull Trades from Sheet (Download)

1. Click **Sheet Sync** button
2. Paste Web App URL
3. Click **Pull from Sheet**
4. ✅ Your dashboard now has all team trades

---

## Exporting Data

### Export to CSV

1. Click **Export** button
2. CSV file downloads automatically
3. Open in Excel/Google Sheets
4. Analyze or backup

### CSV Contains

All trade data in spreadsheet format:
- Trade ID, Symbol, Buy/Sell
- Entry/exit prices and dates
- P&L and results
- Your remarks

---

## User Preferences

### Browser Storage

- Your trades are saved in your browser
- Survives refresh
- Clears if you delete browser data
- Not synced across devices

### Logout

- Clears session token
- You'll need to OTP login again
- Doesn't delete your trades
- Browser storage remains

---

## Tips & Tricks

### Tip 1: Name Your Trades
Use Remarks to note:
- Strategy used
- Market conditions
- What went well/wrong
- Setup details

Example: "Breakout trade, 30min candle, target hit early"

### Tip 2: Track Price Movement
Use @5m, @10m, @20m, @30m to see:
- Early profit/loss
- If you exited too early
- Price momentum

### Tip 3: Use Filters for Analysis
Filter by:
- **Date:** Review specific trading periods
- **Result:** See all wins or losses separately
- **Side:** Compare Buy vs Sell performance

### Tip 4: Review Your Best Trades
1. Filter Result = "Win"
2. Sort by P&L descending
3. Study what made them successful
4. Repeat the setup

### Tip 5: Analyze Your Losses
1. Filter Result = "Loss"
2. Look at remarks
3. Identify patterns
4. Avoid repeating mistakes

### Tip 6: Calculate Your Metrics
- **Win Rate:** Wins / Total trades × 100
- **Risk:Reward:** Avg Loss / Avg Win
- **Profit Factor:** Total wins / Total losses

---

## Common Questions

### Q: Where is my data stored?
**A:** Two places:
1. Browser (local storage) - for speed
2. Google Sheet (optional) - for backup

### Q: Can I use this on my phone?
**A:** Yes! Fully responsive. Works great on mobile.

### Q: What if I lose my browser data?
**A:** Use "Pull from Sheet" to restore from cloud backup.

### Q: Can I edit old trades?
**A:** Yes! Click the edit button (pencil) on any row.

### Q: Can I delete a trade?
**A:** Yes, but it asks for confirmation. Once deleted, it's gone from local storage (unless synced to sheet).

### Q: How do I share my dashboard?
**A:** Share the URL with teammates. Everyone creates their own login.

### Q: Can I see other traders' trades?
**A:** Only after they "Push to Sheet". Then "Pull" to see them.

### Q: Is my data private?
**A:** Your local browser data is private. Once you push to the shared Sheet, admins can see it.

### Q: Can I use this without internet?
**A:** Yes, works offline. Trades save locally. Need internet to sync with Sheet.

### Q: How do I delete my account?
**A:** Ask admin to remove your email from "Manage Users".

---

## Troubleshooting

### "Email not registered"

**Problem:** Can't login
**Solution:** Ask admin to add your email:
1. Admin clicks "Manage Users"
2. Admin enters your email
3. Admin clicks "Add"
4. You'll get a welcome email
5. Try logging in again

### OTP didn't arrive

**Problem:** No email from noreply@script.google.com
**Solution:**
1. Check spam/promotions folder
2. Wait a moment and try again
3. Confirm email address is correct
4. Make sure you're connected to internet

### "Invalid OTP"

**Problem:** Code shows as wrong
**Solution:**
1. Copy-paste the code (avoid typos)
2. Check you're using the latest code (expires in 10 min)
3. Request a new OTP if too much time passed

### Trades not appearing after saving

**Problem:** Added trade but doesn't show
**Solution:**
1. Refresh the page
2. Check filters (might be hiding the trade)
3. Check if browser storage is enabled

### Can't push to sheet

**Problem:** "Cannot reach the sheet" error
**Solution:**
1. Verify Web App URL is correct (ask admin)
2. Make sure you're connected to internet
3. Try again in a moment

---

## Need Help?

1. Check this manual first
2. Ask your admin
3. Check browser console (F12) for errors
4. Contact dashboard support

---

**Happy Trading! 📈**

Dashboard Version: 1.0
Last Updated: June 2026
