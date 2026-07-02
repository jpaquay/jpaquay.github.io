---
layout: null
---

(function ($) {
  const $submit = $('#comment-form-submit');
  const $submitted = $('#comment-form-submitted');
  const $notice = $('.page__comments-form .js-notice');
  const $noticeSuccess = $('.page__comments-form .js-notice-text-success');
  const $noticeFailure = $('.page__comments-form .js-notice-text-failure');

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
      $submit.addClass('d-none');
      $submitted.removeClass('d-none');
      $notice.removeClass('alert-danger');
      $notice.addClass('alert-success');
      showAlert('success');
    }

    function formError() {
      $submitted.addClass('d-none');
      $submit.removeClass('d-none');
      $notice.removeClass('alert-success');
      $notice.addClass('alert-danger');
      showAlert('failure');
      $(form).removeClass('disabled');
    }

    xhr.send(data);

    return false;
  });

  function showAlert(message) {
    $notice.removeClass('d-none');
    if (message == 'success') {
      $noticeSuccess.removeClass('d-none');
      $noticeFailure.addClass('d-none');
    } else {
      $noticeSuccess.addClass('d-none');
      $noticeFailure.removeClass('d-none');
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
