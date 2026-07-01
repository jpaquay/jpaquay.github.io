const fs = require('fs');
const path = require('path');

const jsCode = fs.readFileSync(path.resolve(__dirname, '../beautifuljekyll.js'), 'utf8');

describe('BeautifulJekyllJS.setImg', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="intro-header big-img"></div>
      <span class="img-desc"></span>
    `;

    // We need jQuery for this to work
    const $ = require('jquery');
    global.$ = $;
    global.jQuery = $;

    // Load the script.
    const scriptEl = document.createElement('script');
    scriptEl.textContent = jsCode;
    document.body.appendChild(scriptEl);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('sets the background image and description when both are provided', () => {
    window.BeautifulJekyllJS.setImg('img.jpg', 'My description');

    const introHeader = $('.intro-header.big-img');
    const imgDesc = $('.img-desc');

    expect(introHeader.css('background-image')).toContain('img.jpg');
    expect(imgDesc.text()).toBe('My description');
    expect(imgDesc.css('display')).not.toBe('none');
  });

  it('sets background image and hides description when description is missing', () => {
    window.BeautifulJekyllJS.setImg('img.jpg');

    const introHeader = $('.intro-header.big-img');
    const imgDesc = $('.img-desc');

    expect(introHeader.css('background-image')).toContain('img.jpg');
    expect(imgDesc.css('display')).toBe('none');
  });

  it('sets background image and hides description when description is false', () => {
    window.BeautifulJekyllJS.setImg('img.jpg', false);

    const introHeader = $('.intro-header.big-img');
    const imgDesc = $('.img-desc');

    expect(introHeader.css('background-image')).toContain('img.jpg');
    expect(imgDesc.css('display')).toBe('none');
  });
});
