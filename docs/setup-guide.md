# Prompt Tracker Setup Guide

This guide will walk you through setting up the Prompt Tracker system in your Google Drive and connecting it to the tracking spreadsheet.

## 1. Creating the Folder Structure

### Option A: Manual Setup

1. In Google Drive, create a main folder called "PROMPT REPOSITORY"
2. Inside this folder, create the following category folders:
   - 01_Business_Development
   - 02_Content_Creation
   - 03_Research_Analysis
   - 04_Professional_Development
3. Inside each category folder, create appropriate subcategory folders (see the structure below)

```
📁 PROMPT REPOSITORY
├── 📁 01_Business_Development
│   ├── 📁 Market_Analysis
│   ├── 📁 Innovation_Strategy
│   └── 📁 Stakeholder_Engagement
├── 📁 02_Content_Creation
│   ├── 📁 LinkedIn_Content
│   ├── 📁 Presentations
│   └── 📁 Documentation
├── 📁 03_Research_Analysis
│   ├── 📁 Literature_Review
│   ├── 📁 Evidence_Synthesis
│   └── 📁 Impact_Assessment
└── 📁 04_Professional_Development
    ├── 📁 Strategic_Thinking
    ├── 📁 Inner_Quest
    └── 📁 Leadership
```

### Option B: Script-Based Setup

For those comfortable with Google Apps Script, you can use a setup script to create this structure automatically. The script is available in `scripts/folder-setup.js`.

## 2. Setting Up the Tracker Spreadsheet

1. **Create a New Google Sheet**
   - Go to [Google Sheets](https://sheets.google.com)
   - Create a new blank spreadsheet
   - Name it "Prompt Tracker"

2. **Set Up Headers**
   Add the following headers to the first row:
   - Prompt ID
   - Title
   - Version
   - Last Updated
   - Category
   - Subcategory
   - Status
   - Keywords
   - File Location
   - File Name
   - Last Modified
   - Creation Date

3. **Format the Spreadsheet**
   - Freeze the header row (View > Freeze > 1 row)
   - Add filters to the headers (Data > Create a filter)
   - Adjust column widths as needed

## 3. Installing the Tracking Script

1. **Open the Script Editor**
   - In your Google Sheet, go to Extensions > Apps Script
   - This will open the Google Apps Script editor

2. **Add the Script Code**
   - Delete any existing code in the editor
   - Copy the entire code from `scripts/tracker-script.js` in this repository
   - Paste it into the script editor
   - Save the project (give it a name like "Prompt Tracker")

3. **Configure the Script**
   - Locate this line in the code:
     ```javascript
     const folder = DriveApp.getFolderById('YOUR_FOLDER_ID_HERE');
     ```
   - Replace 'YOUR_FOLDER_ID_HERE' with the ID of your "PROMPT REPOSITORY" folder
   - To find your folder ID:
     - Right-click on the folder in Google Drive
     - Select "Get link"
     - The ID is the string of characters in the URL after "folders/"

4. **Set Up Trigger (Optional)**
   - Go to "Triggers" in the left sidebar of the Apps Script editor
   - Click "Add Trigger"
   - Choose which function to run: `onFileAdd`
   - Select event type: "Time-driven"
   - Select hour timer (e.g., "Hour timer" and "Every hour")
   - Click Save

## 4. Testing the System

1. **Create a Sample Prompt**
   - Copy the template from `templates/prompt-template.md`
   - Fill in the details and save it in one of your category folders
   - Name it according to your naming convention (e.g., "BDMA-001.md" for a Business Development/Market Analysis prompt)

2. **Run the Tracker Script**
   - Go back to your Google Sheet
   - You'll see a new menu item "Prompt Tracker"
   - Click "Prompt Tracker" > "Update Tracker"
   - Grant any permissions requested
   - The script will run and populate your spreadsheet with prompt metadata

## 5. Customization Options

### Modifying Categories

To add or change categories:
1. Simply create new folders in your Google Drive structure
2. Update the `getCategoryInfo` function in the script if you want automatic category detection

### Changing the Template

You can modify the prompt template to suit your needs:
1. Edit `templates/prompt-template.md`
2. If you change the structure significantly, you may need to update the script's parsing functions

## Troubleshooting

### Script Authorization Issues
- If you see "Authorization required" messages, follow the prompts to grant access
- You may need to adjust your Google Workspace security settings if you're in an organization

### Missing Prompts in the Tracker
- Check that your prompts are in the correct folder structure
- Verify that your prompt document follows the template format
- Check the script logs for errors (View > Logs in the Apps Script editor)

### Script Execution Errors
- Check that your folder ID is correct
- Ensure your prompt documents follow the expected format
- Look for error messages in the Apps Script logs

## Next Steps

After setup is complete, proceed to the [Usage Guide](usage-guide.md) to learn how to effectively use the system.
