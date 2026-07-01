const fs = require('fs');
const path = require('path');
const $ = require('jquery');

global.$ = global.jQuery = $;

const scriptContent = fs.readFileSync(path.resolve(__dirname, '../assets/js/beautifuljekyll.js'), 'utf8');

describe('initNavbar', () => {
  let BeautifulJekyllJS;

  beforeEach(() => {
    document.body.innerHTML = '<nav class="navbar"></nav>';

    // Evaluate the script and extract BeautifulJekyllJS
    // By wrapping in a function and returning it, we can get the object
    const getObj = new Function(`
      ${scriptContent}
      return BeautifulJekyllJS;
    `);
    BeautifulJekyllJS = getObj();
  });

  it('adds navbar-dark when background is dark (brightness <= 125)', () => {
    $('.navbar').css('background-color', 'rgb(0, 0, 0)');
    BeautifulJekyllJS.initNavbar();
    expect($('.navbar').hasClass('navbar-dark')).toBe(true);
    expect($('.navbar').hasClass('navbar-light')).toBe(false);
  });

  it('adds navbar-light when background is light (brightness > 125)', () => {
    $('.navbar').css('background-color', 'rgb(255, 255, 255)');
    BeautifulJekyllJS.initNavbar();
    expect($('.navbar').hasClass('navbar-light')).toBe(true);
    expect($('.navbar').hasClass('navbar-dark')).toBe(false);
  });

  it('adds navbar-light at edge case of exactly > 125', () => {
    // rgb(126, 126, 126) => brightness 126
    $('.navbar').css('background-color', 'rgb(126, 126, 126)');
    BeautifulJekyllJS.initNavbar();
    expect($('.navbar').hasClass('navbar-light')).toBe(true);
    expect($('.navbar').hasClass('navbar-dark')).toBe(false);
  });

  it('adds navbar-dark at edge case of exactly <= 125', () => {
    // rgb(125, 125, 125) => brightness 125
    $('.navbar').css('background-color', 'rgb(125, 125, 125)');
    BeautifulJekyllJS.initNavbar();
    expect($('.navbar').hasClass('navbar-dark')).toBe(true);
    expect($('.navbar').hasClass('navbar-light')).toBe(false);
  });

  it('handles other formatting of background color like rgba', () => {
    $('.navbar').css('background-color', 'rgba(0, 0, 0, 0.5)');
    BeautifulJekyllJS.initNavbar();
    expect($('.navbar').hasClass('navbar-dark')).toBe(true);
    expect($('.navbar').hasClass('navbar-light')).toBe(false);
  });

  it('handles cases where background color parsing might be unusual (no numbers)', () => {
    $('.navbar').css('background-color', 'transparent'); // JSDOM might return 'rgba(0, 0, 0, 0)'
    BeautifulJekyllJS.initNavbar();
    // In JSDOM this translates to rgba(0, 0, 0, 0) which makes brightness 0 -> dark
    // This just verifies it doesn't crash on unusual outputs
    expect($('.navbar').length).toBe(1);
  });
});
