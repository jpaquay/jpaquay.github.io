/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

// Read the script content
const scriptPath = path.resolve(__dirname, 'beautifuljekyll.js');
const scriptContent = fs.readFileSync(scriptPath, 'utf8');

describe('BeautifulJekyllJS.getImgInfo', () => {
  beforeEach(() => {
    // Reset DOM
    document.body.innerHTML = '';

    // We need to set up jQuery so it works in the test environment
    window.$ = require('jquery');
    global.$ = window.$;

    // An easier way is to evaluate it but mock the document event listener.
    const originalAddEventListener = document.addEventListener;
    document.addEventListener = jest.fn();

    // Evaluate the script in the context of the current window object
    const scriptEl = document.createElement('script');
    scriptEl.textContent = scriptContent;
    document.body.appendChild(scriptEl);

    document.addEventListener = originalAddEventListener;

    // Clear mocks
    jest.spyOn(Math, 'random').mockRestore();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should select the first image when random number is near 0', () => {
    document.body.innerHTML += `
      <div id="header-big-imgs" data-num-img="3"
           data-img-src-1="img1.jpg" data-img-desc-1="Desc 1"
           data-img-src-2="img2.jpg" data-img-desc-2="Desc 2"
           data-img-src-3="img3.jpg" data-img-desc-3="Desc 3">
      </div>
    `;

    window.BeautifulJekyllJS.bigImgEl = $("#header-big-imgs");
    window.BeautifulJekyllJS.numImgs = 3;

    jest.spyOn(Math, 'random').mockReturnValue(0.0);

    const imgInfo = window.BeautifulJekyllJS.getImgInfo();

    expect(imgInfo).toEqual({
      src: 'img1.jpg',
      desc: 'Desc 1'
    });
  });

  it('should select the last image when random number is near 1', () => {
    document.body.innerHTML += `
      <div id="header-big-imgs" data-num-img="3"
           data-img-src-1="img1.jpg" data-img-desc-1="Desc 1"
           data-img-src-2="img2.jpg" data-img-desc-2="Desc 2"
           data-img-src-3="img3.jpg" data-img-desc-3="Desc 3">
      </div>
    `;

    window.BeautifulJekyllJS.bigImgEl = $("#header-big-imgs");
    window.BeautifulJekyllJS.numImgs = 3;

    jest.spyOn(Math, 'random').mockReturnValue(0.999);

    const imgInfo = window.BeautifulJekyllJS.getImgInfo();

    expect(imgInfo).toEqual({
      src: 'img3.jpg',
      desc: 'Desc 3'
    });
  });

  it('should select a middle image based on random value', () => {
    document.body.innerHTML += `
      <div id="header-big-imgs" data-num-img="3"
           data-img-src-1="img1.jpg" data-img-desc-1="Desc 1"
           data-img-src-2="img2.jpg" data-img-desc-2="Desc 2"
           data-img-src-3="img3.jpg" data-img-desc-3="Desc 3">
      </div>
    `;

    window.BeautifulJekyllJS.bigImgEl = $("#header-big-imgs");
    window.BeautifulJekyllJS.numImgs = 3;

    jest.spyOn(Math, 'random').mockReturnValue(0.4);

    const imgInfo = window.BeautifulJekyllJS.getImgInfo();

    expect(imgInfo).toEqual({
      src: 'img2.jpg',
      desc: 'Desc 2'
    });
  });

  it('should handle missing descriptions', () => {
    document.body.innerHTML += `
      <div id="header-big-imgs" data-num-img="1"
           data-img-src-1="img1.jpg">
      </div>
    `;

    window.BeautifulJekyllJS.bigImgEl = $("#header-big-imgs");
    window.BeautifulJekyllJS.numImgs = 1;

    jest.spyOn(Math, 'random').mockReturnValue(0.5);

    const imgInfo = window.BeautifulJekyllJS.getImgInfo();

    expect(imgInfo).toEqual({
      src: 'img1.jpg',
      desc: undefined
    });
  });
});
