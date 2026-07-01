const $ = require('jquery');
window.$ = window.jQuery = $;

describe('Staticman Form Submission', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <form id="new_comment">
        <input type="text" name="name" value="Test User" />
        <textarea name="message">Test message</textarea>
        <button type="submit" id="comment-form-submit">Submit</button>
      </form>
      <div id="comment-form-submitted" class="d-none">Submitted</div>
      <div class="page__comments-form">
        <div class="js-notice d-none">
          <div class="js-notice-text-success d-none">Success</div>
          <div class="js-notice-text-failure d-none">Failure</div>
        </div>
      </div>
    `;

    global.XMLHttpRequest = jest.fn(() => {
      const xhr = {
        open: jest.fn(),
        setRequestHeader: jest.fn(),
        send: jest.fn(),
        readyState: 4,
        status: 200,
        onreadystatechange: null,
      };
      // For testing, XMLHttpRequest.DONE is 4
      XMLHttpRequest.DONE = 4;
      return xhr;
    });

    // We must reset the handler binding since we re-require
    jest.resetModules();
    require('./staticman.js');
  });

  it('handles successful submission', () => {
    const form = document.getElementById('new_comment');

    // Simulate form submit event
    $(form).trigger('submit');

    // Check if form is disabled
    expect($(form).hasClass('disabled')).toBe(true);

    const xhrInstance = global.XMLHttpRequest.mock.results[0].value;

    // Trigger onreadystatechange for success
    xhrInstance.status = 200;
    xhrInstance.readyState = 4;
    if (xhrInstance.onreadystatechange) xhrInstance.onreadystatechange();

    expect($('#comment-form-submit').hasClass('d-none')).toBe(true);
    expect($('#comment-form-submitted').hasClass('d-none')).toBe(false);
    expect($('.js-notice').hasClass('alert-success')).toBe(true);
    expect($('.js-notice-text-success').hasClass('d-none')).toBe(false);
  });

  it('handles failed submission', () => {
    const form = document.getElementById('new_comment');

    // Simulate form submit event
    $(form).trigger('submit');

    const xhrInstance = global.XMLHttpRequest.mock.results[0].value;

    // Trigger onreadystatechange for error
    xhrInstance.status = 400;
    xhrInstance.readyState = 4;
    if (xhrInstance.onreadystatechange) xhrInstance.onreadystatechange();

    expect($('#comment-form-submitted').hasClass('d-none')).toBe(true);
    expect($('#comment-form-submit').hasClass('d-none')).toBe(false);
    expect($('.js-notice').hasClass('alert-danger')).toBe(true);
    expect($('.js-notice-text-failure').hasClass('d-none')).toBe(false);
    expect($(form).hasClass('disabled')).toBe(false);
  });
});
