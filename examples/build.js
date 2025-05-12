const fs = require('fs');
const content = require('../content.json');

let template = fs.readFileSync('./templates/base.html', 'utf-8');

template = template
  .replace('{{HERO_HEADLINE}}', content.hero.headline)
  .replace('{{HERO_SUBHEAD}}', content.hero.subhead)
  .replace('{{HERO_CTA}}', content.hero.cta)
  .replace('{{INTRO_HEADING}}', content.intro.heading)
  .replace('{{INTRO_BODY}}', content.intro.body)
  .replace('{{CTA_HEADING}}', content.cta.heading)
  .replace('{{CTA_BODY}}', content.cta.body)
  .replace('{{CTA_FORM_ACTION}}', content.cta.formAction)
  .replace('{{CTA_BUTTON_TEXT}}', content.cta.buttonText)
  .replace('{{FOOTER_CONTACT}}', content.footer.contact)
  .replace('{{FOOTER_COPY}}', content.footer.copy);

const cardsHtml = content.cards.map(card =>
  `<div class="card"><h3>${card.title}</h3><p>${card.body}</p></div>`
).join('\n');

template = template.replace('{{CARDS}}', cardsHtml);

fs.writeFileSync('./dist/index.html', template);
console.log('✅ Build complete: dist/index.html updated');