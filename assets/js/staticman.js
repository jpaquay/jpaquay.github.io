---
layout: null
---

(function ($) {
  $('#new_comment').submit(function () {
    const form = this;

    $(form).addClass('disabled');

    {% assign sm = site.staticman -%}
    const endpoint = '{{ sm.endpoint }}';
    const repository = '{{ sm.repository }}';
    const branch = '{{ sm.branch }}';
    const url = endpoint + repository + '/' + branch + '/comments';
    const data = $(this).serialize();

    const xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.onreadystatechange = function () {
      if(xhr.readyState === XMLHttpRequest.DONE) {
        const status = xhr.status;
        if (status >= 200 && status < 400) {
          formSubmitted();
        } else {
          formError();
        }
      }
    };

    function updateFormState(isSuccess) {
      $('#comment-form-submit').toggleClass('d-none', isSuccess);
      $('#comment-form-submitted').toggleClass('d-none', !isSuccess);
      $('.page__comments-form .js-notice')
        .toggleClass('alert-success', isSuccess)
        .toggleClass('alert-danger', !isSuccess);
      showAlert(isSuccess ? 'success' : 'failure');
    }

    function formSubmitted() {
      updateFormState(true);
    }

    function formError() {
      updateFormState(false);
      $(form).removeClass('disabled');
    }

    xhr.send(data);

    return false;
  });

  function showAlert(message) {
    $('.page__comments-form .js-notice').removeClass('d-none');
    if (message == 'success') {
      $('.page__comments-form .js-notice-text-success').removeClass('d-none');
      $('.page__comments-form .js-notice-text-failure').addClass('d-none');
    } else {
      $('.page__comments-form .js-notice-text-success').addClass('d-none');
      $('.page__comments-form .js-notice-text-failure').removeClass('d-none');
    }
  }

  // Expose for testing
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { showAlert };
  } else if (typeof window !== 'undefined' && window.process && window.process.env && window.process.env.NODE_ENV === 'test') {
    // Only expose globally if explicitly in a test environment and module.exports isn't used
    window.__staticman_showAlert = showAlert;
  }
})(jQuery);
