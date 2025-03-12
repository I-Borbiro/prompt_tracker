/**
 * Prompt Tracker - Google Apps Script
 * 
 * This script automatically indexes prompt documents stored in Google Drive
 * and updates a Google Sheet with their metadata.
 * 
 * Setup:
 * 1. Create a Google Sheet with appropriate headers
 * 2. Set up folder structure in Google Drive
 * 3. Add this script to the Google Sheet
 * 4. Update the FOLDER_ID constant with your root folder ID
 * 
 * Version: 1.0.0
 * Last Updated: 2025-03-12
 */

// CONFIGURATION - Replace with your folder ID
const FOLDER_ID = 'YOUR_ROOT_FOLDER_ID_HERE'; // ID of the "PROMPT REPOSITORY" folder

/**
 * Creates custom menu when the spreadsheet is opened
 */
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Prompt Tracker')
    .addItem('Update Tracker', 'updatePromptTracker')
    .addSeparator()
    .addItem('View Documentation', 'showDocumentation')
    .addToUi();
}

/**
 * Shows documentation in a sidebar
 */
function showDocumentation() {
  const html = HtmlService.createHtmlOutput(`
    <h1>Prompt Tracker Documentation</h1>
    <p>This tool automatically indexes prompt documents stored in your Google Drive.</p>
    <h2>How to Use</h2>
    <ol>
      <li>Save prompt documents in the correct folder structure</li>
      <li>Use the standardized prompt template format</li>
      <li>Click "Prompt Tracker > Update Tracker" to refresh the index</li>
    </ol>
    <h2>Troubleshooting</h2>
    <p>If prompts aren't appearing in the tracker:</p>
    <ul>
      <li>Check that documents follow the template format</li>
      <li>Verify they're saved in the correct folder structure</li>
      <li>Check script logs for errors (View > Logs in script editor)</li>
    </ul>
  `)
    .setTitle('Prompt Tracker Help')
    .setWidth(400);
  
  SpreadsheetApp.getUi().showSidebar(html);
}

/**
 * Main function to update the prompt tracker
 */
function updatePromptTracker() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getActiveSheet();
  
  // Log start of execution
  Logger.log('Starting prompt tracker update');
  
  try {
    // Get the main prompt repository folder
    const folder = DriveApp.getFolderById(FOLDER_ID);
    Logger.log('Connected to folder: ' + folder.getName());
    
    // Clear existing content except headers
    if (sheet.getLastRow() > 1) {
      sheet.deleteRows(2, sheet.getLastRow() - 1);
    }
    
    // Add headers if sheet is empty
    if (sheet.getLastRow() == 0) {
      addHeaders(sheet);
    }

    // Process all files in folder and subfolders
    processFolder(folder, sheet, []);
    
    // Format the sheet for better readability
    formatSheet(sheet);
    
    // Show completion message
    SpreadsheetApp.getUi().alert('Prompt tracker updated successfully!');
    
    Logger.log('Completed processing all folders and files');
  } catch (error) {
    Logger.log('Error updating prompt tracker: ' + error.toString());
    SpreadsheetApp.getUi().alert('Error updating tracker: ' + error.toString());
  }
}

/**
 * Adds standard headers to the sheet
 */
function addHeaders(sheet) {
  const headers = [
    'Prompt ID',
    'Title',
    'Version',
    'Last Updated',
    'Category',
    'Subcategory',
    'Status',
    'Keywords',
    'File Location',
    'File Name',
    'Last Modified',
    'Creation Date'
  ];
  
  sheet.appendRow(headers);
  
  // Format header row
  sheet.getRange(1, 1, 1, headers.length)
    .setBackground('#f3f3f3')
    .setFontWeight('bold');
}

/**
 * Formats the sheet for better readability
 */
function formatSheet(sheet) {
  // Add filters
  sheet.getRange(1, 1, 1, sheet.getLastColumn()).createFilter();
  
  // Auto-resize columns
  sheet.autoResizeColumns(1, sheet.getLastColumn());
  
  // Set hyperlink formatting on File Location column
  const lastRow = sheet.getLastRow();
  if (lastRow > 1) {
    const urlColumn = 9; // File Location column
    const urlRange = sheet.getRange(2, urlColumn, lastRow - 1, 1);
    urlRange.setFontColor('blue')
            .setFontLine('underline');
  }
}

/**
 * Gets the folder path as an array
 */
function getFolderPath(folder, path = []) {
  try {
    path.unshift(folder.getName());
    const parents = folder.getParents();
    if (parents.hasNext()) {
      const parent = parents.next();
      if (parent.getId() !== FOLDER_ID) {
        getFolderPath(parent, path);
      }
    }
  } catch (error) {
    Logger.log('Error getting folder path: ' + error.toString());
  }
  return path;
}

/**
 * Extracts category and subcategory info from promptId or folderPath
 */
function getCategoryInfo(promptId, folderPath) {
  // Initialize category and subcategory
  let category = '';
  let subcategory = '';
  
  // Try to get category from folder path first
  if (folderPath.length >= 2) {
    category = folderPath[0];
    subcategory = folderPath[1];
  } else if (folderPath.length === 1) {
    category = folderPath[0];
  }
  
  // If no category from folder path, try to get from Prompt ID
  if (!category && promptId) {
    const parts = promptId.split('-');
    if (parts.length >= 1) {
      // Map common ID prefixes to categories
      const categoryMap = {
        'BDMA': { category: 'Business Development', subcategory: 'Market Analysis' },
        'BDIS': { category: 'Business Development', subcategory: 'Innovation Strategy' },
        'BDSE': { category: 'Business Development', subcategory: 'Stakeholder Engagement' },
        'CCLI': { category: 'Content Creation', subcategory: 'LinkedIn Content' },
        'CCPR': { category: 'Content Creation', subcategory: 'Presentations' },
        'CCDO': { category: 'Content Creation', subcategory: 'Documentation' },
        'RALR': { category: 'Research Analysis', subcategory: 'Literature Review' },
        'RAES': { category: 'Research Analysis', subcategory: 'Evidence Synthesis' },
        'RAIA': { category: 'Research Analysis', subcategory: 'Impact Assessment' },
        'PDST': { category: 'Professional Development', subcategory: 'Strategic Thinking' },
        'PDIQ': { category: 'Professional Development', subcategory: 'Inner Quest' },
        'PDLD': { category: 'Professional Development', subcategory: 'Leadership' }
      };
      
      const prefix = parts[0];
      if (categoryMap[prefix]) {
        category = categoryMap[prefix].category;
        subcategory = categoryMap[prefix].subcategory;
      }
    }
  }
  
  return { category, subcategory };
}

/**
 * Process all files in a folder and its subfolders
 */
function processFolder(folder, sheet, parentPath) {
  const folderPath = [...parentPath, folder.getName()];
  Logger.log('Processing folder: ' + folder.getName() + ' | Path: ' + folderPath.join(' > '));
  
  // Process files in current folder
  const files = folder.getFiles();
  while (files.hasNext()) {
    const file = files.next();
    processFile(file, sheet, folderPath);
  }
  
  // Process subfolders recursively
  const subFolders = folder.getFolders();
  while (subFolders.hasNext()) {
    const subFolder = subFolders.next();
    processFolder(subFolder, sheet, folderPath);
  }
}

/**
 * Extract metadata from document content
 */
function extractMetadata(content, field) {
  try {
    const lines = content.split('\n');
    
    // Handle the title (first line with # prefix)
    if (field === 'title') {
      for (const line of lines) {
        if (line.trim().startsWith('# ')) {
          return line.replace('# ', '').trim();
        }
      }
    }
    
    // Handle metadata fields in format "Field: Value"
    for (const line of lines) {
      // Match fields like "Prompt ID: VALUE" or "Version: VALUE"
      if (line.trim().startsWith(field + ':')) {
        return line.split(':').slice(1).join(':').trim();
      }
    }
    
    // Handle section content under "## Field"
    let inSection = false;
    let sectionContent = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Found the section header
      if (line === '## ' + field) {
        inSection = true;
        continue;
      }
      
      // In the target section, collect content until next section
      if (inSection) {
        // Stop at next section header
        if (line.startsWith('#') && line !== '## ' + field) {
          break;
        }
        
        // Collect non-empty lines
        if (line) {
          sectionContent.push(line);
        }
      }
    }
    
    return sectionContent.join(' ').trim();
  } catch (error) {
    Logger.log('Error extracting ' + field + ': ' + error.toString());
    return '';
  }
}

/**
 * Process a single file and extract metadata
 */
function processFile(file, sheet, folderPath) {
  try {
    const mimeType = file.getMimeType();
    const fileName = file.getName();
    
    // Skip non-document files
    if (!isPromptDocument(fileName, mimeType)) {
      return;
    }
    
    Logger.log('Processing file: ' + fileName);
    
    // Get file content based on mime type
    let content = '';
    if (mimeType === MimeType.GOOGLE_DOCS) {
      const doc = DocumentApp.openById(file.getId());
      content = doc.getBody().getText();
    } else {
      // For other text-based files (md, txt)
      content = file.getBlob().getDataAsString();
    }
    
    // Extract metadata
    const promptId = extractMetadata(content, 'Prompt ID');
    const title = extractMetadata(content, 'title');
    const version = extractMetadata(content, 'Version');
    const lastUpdated = extractMetadata(content, 'Last Updated');
    const status = extractMetadata(content, 'Status') || 'Active';
    const keywords = extractMetadata(content, 'Keywords');
    
    // Get category information
    const { category, subcategory } = getCategoryInfo(promptId, folderPath.slice(1));
    
    // Format dates
    const modifiedDate = Utilities.formatDate(file.getLastUpdated(), Session.getScriptTimeZone(), "yyyy-MM-dd");
    const createdDate = Utilities.formatDate(file.getDateCreated(), Session.getScriptTimeZone(), "yyyy-MM-dd");
    
    // Add to sheet
    sheet.appendRow([
      promptId,           // Prompt ID
      title,              // Title
      version,            // Version
      lastUpdated,        // Last Updated
      category,           // Category
      subcategory,        // Subcategory
      status,             // Status
      keywords,           // Keywords
      file.getUrl(),      // File Location
      fileName,           // File Name
      modifiedDate,       // Last Modified
      createdDate         // Creation Date
    ]);
    
    Logger.log('Added to tracker: ' + promptId + ' - ' + title);
  } catch (error) {
    Logger.log('Error processing file ' + file.getName() + ': ' + error.toString());
  }
}

/**
 * Check if a file is likely a prompt document
 */
function isPromptDocument(fileName, mimeType) {
  // Accept Google Docs, Markdown files, and text files
  const supportedTypes = [
    MimeType.GOOGLE_DOCS,
    MimeType.PLAIN_TEXT
  ];
  
  // Check if it's a supported type
  if (!supportedTypes.includes(mimeType)) {
    return false;
  }
  
  // For plain text, check extensions (.md, .txt)
  if (mimeType === MimeType.PLAIN_TEXT) {
    return fileName.endsWith('.md') || fileName.endsWith('.txt');
  }
  
  return true;
}
