# Systematic Literature Review Brave Search to Folder With Summary Workflow
Prompt ID: RALR-001
Version: 1.0
Last Updated: 2025-02-18

## Purpose
To systematically collect, analyze, and summarize academic literature with a focus on open access content, creating structured summaries and maintaining organized research collections.

## Context
- When to use: For conducting structured literature reviews requiring systematic organization and analysis
- Prerequisites: 
  - Defined research topic
  - Access to academic databases
  - Storage space for PDFs and summaries
- Target audience: Researchers, healthcare professionals, academic writers

## Keywords
literature review, research methodology, academic research, systematic review, document analysis

## Prompt Template
```
<step1>Search Setup and Parameters
Base Parameters:
- Topic: [Insert search topic]
- Date Range: [Default: Last 2 years, adjustable]
- Geographic Focus: [Specify regions]
- Publication Types: [Specify types]

Impact Factor Categories:
- Tier 1: IF 15+
- Tier 2: IF 5-15
- Tier 3: IF 1-5

Search Strings:
[Define primary and secondary search strings with Boolean operators]
</step1>

<step2>Directory Creation and Structure
Create directory structure:
YYYY-MM-DD_[SearchTopic]/
├── pdfs/
└── summaries/
    ├── individual_summaries/
    └── master_summary.md
</step2>

<step3>Article Collection Building
Create collection_info.md:
# Collection Metadata
Start Date: [Date]
Topic: [Topic]
Search Focus: [Focus]

## Search Strategy
Primary Terms: [Terms]
Secondary Terms: [Terms]
Date Range: [Range]
Geographic Focus: [Regions]

## Collection Statistics
Total Papers: [Number]
By Impact Factor:
- Tier 1 (15+): [Number]
- Tier 2 (5-15): [Number]
- Tier 3 (1-5): [Number]
</step3>

<step4>Article Analysis Template
1. Document Overview
   - Citation
   - Core purpose
   - Methodology

2. Strategic Analysis
   - Key insights
   - Supporting evidence
   - Critical evaluation
   - Unique perspectives

3. Stakeholder Impact Analysis
   [Customize based on field]

4. Strategic Communication Elements
   - Key messages
   - Quotable content
   - Statistics
   - Keywords
</step4>

<step5>Master Summary Structure
# Literature Review: [Topic]
## Quick Overview
## Table of Contents
## Articles by Impact Factor
## Thematic Analysis
## Research Gaps
## Links
</step5>

<exit_criteria>
1. All directories created
2. PDFs downloaded
3. Summaries completed
4. Master summary generated
5. File accessibility verified
</exit_criteria>
```

## Variable Elements
| Variable | Description | Example |
|----------|-------------|---------|
| [SearchTopic] | Main research focus | healthcare_leadership |
| [Date Range] | Time period for search | 2023..2025 |
| [Geographic Focus] | Regional scope | US and Europe |
| [Publication Types] | Types of papers | Original research, meta-analyses |

## Success Metrics
- Directory Structure: 100% compliance with template
- PDF Collection: All open access papers successfully downloaded
- Summary Completion: All papers have individual summaries
- Cross-referencing: All links functional in master summary

## Example Usage
### Input
Topic: Healthcare Leadership Resilience
Date Range: 2023-2025
Geographic Focus: US/Europe
Publication Types: Original papers, meta-analyses

### Output
[Example of completed directory structure and summary]

## Version History
| Version | Date | Changes | Rationale |
|---------|------|---------|-----------|
| 1.0 | 2025-02-18 | Initial version | Base template |

## Related Prompts
- Literature Analysis Template
- Academic Writing Structure
- Research Summary Template

## Notes
- Focus on open access content first
- Use standardized naming conventions
- Maintain consistent metadata
- Regular backup recommended


