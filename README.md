# GDriveEmailUpdates
A Google Script (gs) that searches through a file structure and sends email updates when files have been added/updated with a link to the file. 

## Why?
This script was created because GDrive doesn't have a native email update feature. Collaborative projects with extensive files are hard to track, s this script allows a project manager to see what everybody else is working on.

## How to use

1. Open a new google sheet
2. Enter a the following:
    1. A new list of emails separated by commas in ‘E1’ (yellow)
    2. A brief description of your notification in ‘E2’ (orange). This goes in your email subject line.
    3. Follow the next steps to enter the folderID in ‘E3’ (green)
        * On your Web Browser: navigate to the folder you’re subscribing to
        * Look at the HTTP address, something like https://drive.google.com/drive/u/0/folders/0B9WgiG9dKJ1fVTk3SVNxVG123
        * Copy the string of numbers into the cell (red in the above example)

3. Go to 'Tools-> ScriptEditor'
2. Paste the code into the .gs file
3. In Script Editor: Choose Run-> createTimeDrivenTriggers
   It may ask you to give permission for the script, 
	 This allows the script to edit your spreadsheet
4. After that runs: Chooser Run-> search
   It may ask you to give permission for the script, this lets the script access other folders

All set! Here is an example spreadsheet format:

![Alt text](http://i.imgur.com/JSEw0mI.png "ScreenShot")

To change the time you receive alerts, simply edit the Time block and 'Run-> createTimeDrivenTriggers'

To unsubscribe yourself from the emails, simply delete your name from cell ‘E1’
To unsubscribe everybody, like at project completion, simply delete the google sheet
