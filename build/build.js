const fs = require('fs');
const path = require('path');

// Read content and template files
const content = require('../content/content.json');
const template = fs.readFileSync('./templates/base.html', 'utf-8');

// Generate HTML for cards with proper indentation
const generateCards = (cards) => {
  return cards.map(card => 
`          <div class="card">
            <h3><span class="card-icon">${card.icon}</span>${card.title}</h3>
            <p>${card.body}</p>
          </div>`
  ).join('\n');
};

// Generate HTML for workload blocks with proper indentation
const generateWorkloadBlocks = (blocks) => {
  return blocks.map(block => 
`          <div class="workload-block">
            <h3><span class="block-icon">${block.icon}</span>${block.title}</h3>
            <p>${block.body}</p>
          </div>`
  ).join('\n');
};

// Generate HTML for list items with proper indentation
const generateListItems = (items) => {
  return items.map(item =>
`              <li>${item}</li>`
  ).join('\n');
};

// Replace all content placeholders
let outputHtml = template
  // Hero Section
  .replace('{{HERO_HEADLINE}}', content.hero.headline)
  .replace('{{HERO_SUBHEAD}}', content.hero.subhead)
  .replace('{{HERO_CTA}}', content.hero.cta)
  
  // Why Pattern Section
  .replace('{{why_pattern.sectionTitle}}', content.why_pattern.sectionTitle)
  .replace('{{why_pattern.subhead}}', content.why_pattern.subhead)
  .replace('{{why_pattern.columns.problems.title}}', content.why_pattern.columns.problems.title)
  .replace('{{why_pattern.columns.solutions.title}}', content.why_pattern.columns.solutions.title)
  .replace(/\s*{{#each why_pattern.columns.problems.items}}[\s\S]*?{{\/each}}\s*/g, '\n' + generateListItems(content.why_pattern.columns.problems.items) + '\n')
  .replace(/\s*{{#each why_pattern.columns.solutions.items}}[\s\S]*?{{\/each}}\s*/g, '\n' + generateListItems(content.why_pattern.columns.solutions.items) + '\n')
  .replace('{{why_pattern.conclusion}}', content.why_pattern.conclusion)
  
  // Intro Section
  .replace('{{INTRO_HEADING}}', content.intro.heading)
  .replace('{{INTRO_BODY}}', content.intro.body)
  
  // Cards Section
  .replace(/\s*{{#each cards}}[\s\S]*?{{\/each}}\s*/g, '\n' + generateCards(content.cards) + '\n          ')
  
  // Workload Management Section
  .replace('{{{agent_workload_management.sectionTitle}}}', content.agent_workload_management.sectionTitle)
  .replace('{{agent_workload_management.subhead}}', content.agent_workload_management.subhead)
  .replace(/\s*{{#each agent_workload_management.blocks}}[\s\S]*?{{\/each}}\s*/g, '\n' + generateWorkloadBlocks(content.agent_workload_management.blocks) + '\n          ')
  
  // CTA Section
  .replace('{{CTA_HEADING}}', content.cta.heading)
  .replace('{{CTA_BODY}}', content.cta.body)
  .replace('{{CTA_FORM_ACTION}}', content.cta.formAction)
  .replace('{{CTA_BUTTON_TEXT}}', content.cta.buttonText)
  
  // Footer
  .replace(/{{FOOTER_CONTACT}}/g, content.footer.contact)
  .replace('{{FOOTER_COPY}}', content.footer.copy);

// Ensure directories exist
const dirs = ['./dist', './dist/css', './dist/img'];
dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Write the output file
fs.writeFileSync('./dist/index.html', outputHtml);
console.log('✅ Build complete: dist/index.html generated');

// Copy static assets
const copyFile = (src, dest) => {
  try {
    fs.copyFileSync(src, dest);
    console.log(`✅ Copied ${src} to ${dest}`);
  } catch (err) {
    console.error(`❌ Error copying ${src}: ${err.message}`);
  }
};

// Copy CSS
copyFile('./css/styles.css', './dist/css/styles.css');

// Copy images
copyFile('./img/patternagentic_v3.png', './dist/img/patternagentic_v3.png');

// Copy favicon
copyFile('./favicon.ico', './dist/favicon.ico');

console.log('🎉 Build process complete!');