/*
  Written by Will Tremml
  An amalgamation of smaller google drive API functions
  4/17
*/

// This creates a timer for the script to run daily
function createTimeDrivenTriggers() {

  //deleting previous triggers
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    ScriptApp.deleteTrigger(triggers[i]);
  }
  
  // Trigger every Day at 7:00.
  ScriptApp.newTrigger('search')
      .timeBased()
      .everyDays(1)
  
      // Change the time at the bottom of this section in Military time (e.g. 1pm = 13)
      .atHour(7)
      .create();
}

// globalish variables about the spreadsheet 
var ss = SpreadsheetApp.getActiveSpreadsheet(); 
var sheet = ss.getActiveSheet();
var timezone = ss.getSpreadsheetTimeZone();
var row = "", count=0;

var today     = new Date();

// Set below to 24 hours if the trigger is once per day
// 24* (60* (60 * 1000)) = 1 day which 24 hours
var oneDayAgo = new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000);  

var startTime = oneDayAgo.toISOString();

function search()
{
  // user must put this in manually
  var folder = DriveApp.getFolderById(sheet.getRange("E3").getValue());
  
  // Email Configuration  
  var emailFromName ="Your Company (Do Not Reply)";
  var emailSubject = "Updates to "+sheet.getRange("E2").getValue()+" Folder"; //name of folder topic
  var emailBody = "<br>Company Name<br>";
  var emailFooter = "To stop these notifications, please contact xxxx@company.com.";
  
  var email = sheet.getRange("E1").getValue();
  
  
  traverseFolders(folder, folder.getName());
  
  //what the script adds to the google sheet
  if (row !== "") {
    row = "<p>" + count + " file(s) changed. Here's the list:</p><ol>" + row + "</ol>";
    row +=  emailBody+"<br>" + "<br><small> "+emailFooter+" </a>.</small>";     
    MailApp.sendEmail(email, emailSubject, "", {name: emailFromName, htmlBody: row});
  }  
}


// this recursively searched for all the folders and documents in a path
function traverseFolders(folder, path)
{
  
  var files = folder.getFiles();
  
  while( files.hasNext() ) {
    var file = files.next();
    
    //Needed so that boolean evaluats correctly
    var var_c = (file.getName() != ss.getName());
    
    if (file.getLastUpdated()>oneDayAgo && var_c) {
      var fileName = file.getName();
      var fileURL  = file.getUrl();
      var lastUpdated =  Utilities.formatDate(file.getLastUpdated(), timezone, "yyyy-MM-dd HH:mm");
      var dateCreated =  Utilities.formatDate(file.getDateCreated(), timezone, "yyyy-MM-dd HH:mm")
      
      row += "<li>" + lastUpdated + " <a href='" + fileURL + "'>" + fileName + "</a></li>";
      
      sheet.appendRow([dateCreated, lastUpdated, fileName, fileURL]);
      
      count++;
    } 
  }           
  
  //moves to the next folder
  var folders = folder.getFolders(), childFolder;
  while (folders.hasNext())
  {
    childFolder = folders.next();
    traverseFolders(childFolder, path + ", " + childFolder.getName());
  }
}
