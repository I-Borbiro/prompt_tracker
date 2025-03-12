# Prompt Tracker System

A comprehensive system for organizing, tracking, and managing AI prompts in a structured repository. This tool helps teams standardize prompt creation, versioning, and reuse.

![Prompt Tracker Banner](docs/images/banner.png)

## 🌟 Features

- **Structured Repository**: Organize prompts by category and subcategory
- **Standardized Templates**: Consistent prompt format with metadata
- **Automated Tracking**: Google Sheets integration to maintain a central index
- **Versioning Support**: Track prompt versions and changes over time
- **Easy Retrieval**: Find prompts using IDs, keywords, or categories

## 📋 System Components

This repository includes:

1. **Folder Structure**: Recommended hierarchy for organizing prompts
2. **Prompt Templates**: Standardized format for creating new prompts
3. **Tracking Script**: Google Apps Script for automated prompt indexing
4. **Sample Prompts**: Example prompts demonstrating the system
5. **Documentation**: Setup and usage guides

## 🚀 Getting Started

### Prerequisites

- A Google account (for Google Drive and Google Sheets)
- Git and GitHub account (for cloning and customizing this repository)

### Quick Setup

1. **Clone this repository**
   ```bash
   git clone https://github.com/yourusername/prompt-tracker.git
   ```

2. **Set up the Google Drive structure**
   - Create a main folder named "PROMPT REPOSITORY"
   - Create subfolders following the structure in [folder-structure.md](docs/folder-structure.md)

3. **Create your tracker spreadsheet**
   - Make a copy of the [prompt-tracker-template.xlsx](tracker/prompt-tracker-template.xlsx)
   - Upload to Google Sheets

4. **Add the tracking script**
   - Open your Google Sheet
   - Go to Extensions > Apps Script
   - Copy and paste the code from [tracker-script.js](scripts/tracker-script.js)
   - Save and authorize the script

For detailed setup instructions, see the [Setup Guide](docs/setup-guide.md).

## 📝 Usage

### Creating New Prompts

1. Copy the prompt template from `templates/prompt-template.md`
2. Fill in the required fields and prompt content
3. Save in the appropriate category folder with a unique ID
4. Run the tracker script to update your index

### Finding Prompts

Use the tracker spreadsheet to filter by:
- Prompt ID
- Category/Subcategory
- Keywords
- Last updated date

### Managing Versions

When updating a prompt:
1. Increment the version number
2. Update the "Last Updated" date
3. Document changes in the Version History section
4. Run the tracker to update the index

See the [Usage Guide](docs/usage-guide.md) for more details.

## 📊 Example Workflow

1. **Create a new prompt** using the template
2. **Save it** in the appropriate category folder
3. **Run the tracker** to update your central index
4. **Find and reuse** prompts via the index spreadsheet

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by best practices in prompt engineering and knowledge management
- Built to support teams working with AI tools like ChatGPT, Claude, and others

---

**Note**: This system is designed to be customizable. Adapt the folder structure, templates, and scripts to fit your specific needs.
