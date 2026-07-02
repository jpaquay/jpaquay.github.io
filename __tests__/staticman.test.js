const fs = require('fs');
const path = require('path');
const $ = require('jquery');
window.$ = window.jQuery = $;

// Expose process for evaluated script to check NODE_ENV
window.process = process;

const scriptPath = path.resolve(__dirname, '../assets/js/staticman.js');
let scriptContent = fs.readFileSync(scriptPath, 'utf8');

// Strip out Jekyll front matter
if (scriptContent.startsWith('---')) {
  const match = scriptContent.match(/^---\n[\s\S]*?\n---\n/);
  if (match) {
    scriptContent = scriptContent.slice(match[0].length);
  }
}

// Strip out Jekyll tags
scriptContent = scriptContent.replace(/{%[\s\S]*?%}/g, '');
scriptContent = scriptContent.replace(/'{{[\s\S]*?}}'/g, "'placeholder'");

// Remove module exports for testing via window since we are not loading it properly via require
scriptContent = `
  const module = { exports: false };
  ${scriptContent}
`

// Evaluate the script
eval(scriptContent);

describe('showAlert', () => {
  beforeEach(() => {
    // Set up a minimal DOM
    document.body.innerHTML = `
      <div class="page__comments-form">
        <div class="js-notice d-none">
          <span class="js-notice-text-success d-none">Success!</span>
          <span class="js-notice-text-failure d-none">Failure!</span>
        </div>
      </div>
    `;
  });

  it('shows success message and hides failure message when called with "success"', () => {
    window.__staticman_showAlert('success');

    const notice = $('.page__comments-form .js-notice');
    const successText = $('.page__comments-form .js-notice-text-success');
    const failureText = $('.page__comments-form .js-notice-text-failure');

    expect(notice.hasClass('d-none')).toBe(false);
    expect(successText.hasClass('d-none')).toBe(false);
    expect(failureText.hasClass('d-none')).toBe(true);
  });

  it('shows failure message and hides success message when called with "failure" (or anything else)', () => {
    window.__staticman_showAlert('error');

    const notice = $('.page__comments-form .js-notice');
    const successText = $('.page__comments-form .js-notice-text-success');
    const failureText = $('.page__comments-form .js-notice-text-failure');

    expect(notice.hasClass('d-none')).toBe(false);
    expect(successText.hasClass('d-none')).toBe(true);
    expect(failureText.hasClass('d-none')).toBe(false);
  });

  it('removes d-none from the main notice container in all cases', () => {
    window.__staticman_showAlert('success');
    expect($('.page__comments-form .js-notice').hasClass('d-none')).toBe(false);

    // Reset and try another
    $('.page__comments-form .js-notice').addClass('d-none');

    window.__staticman_showAlert('something-else');
    expect($('.page__comments-form .js-notice').hasClass('d-none')).toBe(false);
  });
});
