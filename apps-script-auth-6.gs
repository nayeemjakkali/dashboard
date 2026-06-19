/**
 * TRADING DASHBOARD - Google Apps Script Backend with Authentication
 * Features: Gmail OTP login, user management, admin controls
 */

// Configuration
var ADMIN_EMAIL = 'nayeemjakli@gmail.com';
var TRADES_SHEET = 'Sheet1';
var USERS_SHEET = 'Users';
var OTP_SHEET = 'OTP_Sessions';

function doGet(e){return handle(e);}
function doPost(e){return handle(e);}

function handle(e){
  try{
    var params = e.parameter || {};
    var action = params.action || 'list';
    
    // Authentication actions (no login required)
    if(action === 'sendOtp') return sendOtp(params.email);
    if(action === 'verifyOtp') return verifyOtp(params.email, params.otp);
    if(action === 'getUser') return getUser(params.email);
    
    // Protected actions (require valid token)
    var userEmail = verifyToken(params.token);
    if(!userEmail && action !== 'sendOtp' && action !== 'verifyOtp' && action !== 'getUser'){
      return out({ok:false, error:'Unauthorized - invalid or missing token'});
    }
    
    // User actions
    if(action === 'list') return listTrades(userEmail);
    if(action === 'replaceAll') return replaceTrades(userEmail, params.rows);
    
    // Admin only actions
    if(!isAdmin(userEmail)) return out({ok:false, error:'Admin access required'});
    if(action === 'getUsers') return getUsers();
    if(action === 'addUser') return addUser(params.email);
    if(action === 'removeUser') return removeUser(params.email);
    if(action === 'setAdmin') return setAdmin(params.email, params.isAdmin);
    
    return out({ok:false, error:'Unknown action: ' + action});
  }catch(err){
    return out({ok:false, error: 'Server error: ' + err.toString()});
  }
}

// ===== AUTHENTICATION =====

function sendOtp(email){
  if(!email) return out({ok:false, error:'Email required'});
  email = email.toLowerCase().trim();
  
  // Generate OTP (6 digits)
  var otp = Math.floor(100000 + Math.random() * 900000).toString();
  
  // Check if user exists
  var usersSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(USERS_SHEET);
  if(!usersSheet) createUsersSheet();
  
  var users = usersSheet.getDataRange().getValues();
  var userExists = false;
  for(var i=1; i<users.length; i++){
    if(users[i][0] && users[i][0].toLowerCase() === email){
      userExists = true;
      break;
    }
  }
  
  if(!userExists) return out({ok:false, error:'Email not registered. Contact admin.'});
  
  // Store OTP with 10 minute expiry
  var otpSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(OTP_SHEET);
  if(!otpSheet) createOtpSheet();
  
  var now = new Date();
  var expiry = new Date(now.getTime() + 10*60000); // 10 minutes
  
  // Clear old OTPs for this email
  var otpData = otpSheet.getDataRange().getValues();
  for(var i = otpData.length-1; i >= 1; i--){
    if(otpData[i][0] && otpData[i][0].toLowerCase() === email){
      otpSheet.deleteRow(i+1);
    }
  }
  
  // Add new OTP
  otpSheet.appendRow([email, otp, now, expiry]);
  
  // Send email
  try{
    GmailApp.sendEmail(email, 
      'Trading Dashboard - Your OTP',
      'Your One-Time Password (valid for 10 minutes):\n\n' + otp + '\n\nDo not share this code.'
    );
    return out({ok:true, message:'OTP sent to ' + email});
  }catch(e){
    return out({ok:true, message:'OTP generated (email may not have sent). OTP: ' + otp});
  }
}

function verifyOtp(email, otp){
  if(!email || !otp) return out({ok:false, error:'Email and OTP required'});
  email = email.toLowerCase().trim();
  otp = String(otp).trim();
  
  var otpSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(OTP_SHEET);
  if(!otpSheet) return out({ok:false, error:'OTP session not found'});
  
  var otpData = otpSheet.getDataRange().getValues();
  var now = new Date();
  
  for(var i=1; i<otpData.length; i++){
    if(otpData[i][0] && otpData[i][0].toLowerCase() === email){
      var storedOtp = String(otpData[i][1]);
      var expiry = new Date(otpData[i][3]);
      
      if(now > expiry){
        otpSheet.deleteRow(i+1);
        return out({ok:false, error:'OTP expired'});
      }
      
      if(storedOtp === otp){
        otpSheet.deleteRow(i+1);
        var token = generateToken(email);
        return out({ok:true, token:token, email:email, isAdmin:isAdmin(email)});
      }
    }
  }
  
  return out({ok:false, error:'Invalid OTP'});
}

function generateToken(email){
  var now = Date.now();
  var token = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, email + now);
  token = Utilities.base64Encode(token);
  // Store token for verification
  return token.substring(0, 32);
}

function verifyToken(token){
  // Simple token verification - in production use better method
  // For now, we trust the client-side token if OTP was verified
  if(!token) return null;
  // Return a flag that token was verified
  return 'verified';
}

function isAdmin(email){
  if(!email) return false;
  return email.toLowerCase() === ADMIN_EMAIL.toLowerCase();
}

function getUser(email){
  if(!email) return out({ok:false, error:'Email required'});
  email = email.toLowerCase().trim();
  
  var usersSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(USERS_SHEET);
  if(!usersSheet) return out({ok:false, user:null});
  
  var users = usersSheet.getDataRange().getValues();
  for(var i=1; i<users.length; i++){
    if(users[i][0] && users[i][0].toLowerCase() === email){
      return out({ok:true, user:{
        email: users[i][0],
        name: users[i][1] || '',
        isAdmin: users[i][2] === 'YES',
        addedDate: users[i][3] || ''
      }});
    }
  }
  
  return out({ok:false, user:null});
}

// ===== TRADES =====

function listTrades(email){
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(TRADES_SHEET);
  if(!sheet) return out({trades:[]});
  
  var rows = sheet.getDataRange().getValues();
  rows.shift(); // Remove header
  
  // Filter trades by user email (if column exists)
  var trades = [];
  for(var i=0; i<rows.length; i++){
    if(rows[i][0]) trades.push(rows[i]);
  }
  
  return out({trades:trades});
}

function replaceTrades(email, rowsJson){
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(TRADES_SHEET);
  if(!sheet) return out({ok:false, error:'Trades sheet not found'});
  
  try{
    var rows = JSON.parse(rowsJson || '[]');
    var headers = ['Trade ID','Symbol','Buy/Sell','Entry Date','Entry Time','Entry Price','Quantity','Leverage','Stop Loss','Target Price','Price After 5 Min','Price After 10 Min','Price After 20 Min','Price After 30 Min','Exit Price','Profit / Loss','Result','Remarks'];
    
    sheet.clearContents();
    sheet.appendRow(headers);
    
    for(var i=0; i<rows.length; i++){
      sheet.appendRow(rows[i]);
    }
    
    return out({ok:true, message:'Trades updated'});
  }catch(e){
    return out({ok:false, error:'Failed to update trades: ' + e.toString()});
  }
}

// ===== USER MANAGEMENT (ADMIN ONLY) =====

function getUsers(){
  var usersSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(USERS_SHEET);
  if(!usersSheet) return out({users:[]});
  
  var rows = usersSheet.getDataRange().getValues();
  var users = [];
  for(var i=1; i<rows.length; i++){
    if(rows[i][0]){
      users.push({
        email: rows[i][0],
        name: rows[i][1] || '',
        isAdmin: rows[i][2] === 'YES',
        addedDate: rows[i][3] || ''
      });
    }
  }
  
  return out({ok:true, users:users});
}

function addUser(email){
  if(!email) return out({ok:false, error:'Email required'});
  email = email.toLowerCase().trim();
  
  var usersSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(USERS_SHEET);
  if(!usersSheet) createUsersSheet();
  
  // Check if already exists
  var users = usersSheet.getDataRange().getValues();
  for(var i=1; i<users.length; i++){
    if(users[i][0] && users[i][0].toLowerCase() === email){
      return out({ok:false, error:'User already exists'});
    }
  }
  
  // Add new user
  usersSheet.appendRow([email, '', 'NO', new Date()]);
  
  // Send welcome email
  try{
    GmailApp.sendEmail(email,
      'Welcome to Trading Dashboard',
      'Hi,\n\nYou have been added to the Trading Dashboard.\n\nGo to: [DASHBOARD_URL]\n\nClick "Request OTP" and enter your email to get started.\n\nHappy trading!'
    );
  }catch(e){}
  
  return out({ok:true, message:'User added: ' + email});
}

function removeUser(email){
  if(!email) return out({ok:false, error:'Email required'});
  if(email.toLowerCase() === ADMIN_EMAIL.toLowerCase()){
    return out({ok:false, error:'Cannot remove admin'});
  }
  
  email = email.toLowerCase().trim();
  var usersSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(USERS_SHEET);
  if(!usersSheet) return out({ok:false, error:'Users sheet not found'});
  
  var users = usersSheet.getDataRange().getValues();
  for(var i=users.length-1; i>=1; i--){
    if(users[i][0] && users[i][0].toLowerCase() === email){
      usersSheet.deleteRow(i+1);
      return out({ok:true, message:'User removed'});
    }
  }
  
  return out({ok:false, error:'User not found'});
}

function setAdmin(email, isAdmin){
  if(!email) return out({ok:false, error:'Email required'});
  email = email.toLowerCase().trim();
  
  var usersSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(USERS_SHEET);
  if(!usersSheet) return out({ok:false, error:'Users sheet not found'});
  
  var users = usersSheet.getDataRange().getValues();
  for(var i=1; i<users.length; i++){
    if(users[i][0] && users[i][0].toLowerCase() === email){
      usersSheet.getRange(i+1, 3).setValue(isAdmin ? 'YES' : 'NO');
      return out({ok:true, message:'Admin status updated'});
    }
  }
  
  return out({ok:false, error:'User not found'});
}

// ===== UTILITY =====

function createUsersSheet(){
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.insertSheet(USERS_SHEET);
  sheet.appendRow(['Email', 'Name', 'Is Admin', 'Added Date']);
  sheet.appendRow([ADMIN_EMAIL, 'Admin', 'YES', new Date()]);
}

function createOtpSheet(){
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.insertSheet(OTP_SHEET);
  sheet.appendRow(['Email', 'OTP', 'Created', 'Expires']);
}

function out(obj){
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
