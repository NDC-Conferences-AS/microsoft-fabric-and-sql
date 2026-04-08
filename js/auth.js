(function () {
  var SESSION_KEY = 'mfcc_auth';

  function check(pw) {
    return pw === atob('SzkjbVR6NHhWcDg=');
  }

  if (sessionStorage.getItem(SESSION_KEY) === '1') return;

  document.addEventListener('DOMContentLoaded', function () {
    var overlay = document.createElement('div');
    overlay.id = 'auth-overlay';
    overlay.innerHTML = [
      '<div id="auth-box">',
      '  <img src="assets/logo-main.png" alt="APAC Microsoft Fabric &amp; SQL Community Conference" id="auth-logo" />',
      '  <p id="auth-label">Staging site — enter password to continue</p>',
      '  <input type="password" id="auth-input" placeholder="Password" autocomplete="current-password" />',
      '  <button id="auth-btn">Enter</button>',
      '  <p id="auth-error"></p>',
      '</div>'
    ].join('');

    var style = document.createElement('style');
    style.textContent = [
      '#auth-overlay{position:fixed;inset:0;background:#000;z-index:9999;display:flex;align-items:center;justify-content:center;padding:1.5rem}',
      '#auth-box{display:flex;flex-direction:column;align-items:center;gap:1rem;width:100%;max-width:360px}',
      '#auth-logo{width:260px;height:auto;margin-bottom:.5rem}',
      '#auth-label{font-family:Inter,Helvetica,Arial,sans-serif;font-size:.8rem;letter-spacing:.06em;text-transform:uppercase;color:rgba(255,255,255,.5);margin:0;text-align:center}',
      '#auth-input{width:100%;height:3.25rem;padding:0 1rem;border-radius:999px;border:1px solid rgba(255,255,255,.3);background:rgba(255,255,255,.05);color:#fff;font-family:Inter,Helvetica,Arial,sans-serif;font-size:1rem;box-sizing:border-box;text-align:center}',
      '#auth-input:focus{outline:none;border-color:rgba(255,255,255,.7)}',
      '#auth-btn{width:100%;height:3.25rem;border:0;border-radius:999px;background:linear-gradient(90deg,#00b294 0%,#1360a8 100%);color:#fff;font-family:Teko,sans-serif;font-size:1.15rem;font-weight:700;letter-spacing:.04em;cursor:pointer}',
      '#auth-btn:hover{filter:brightness(1.08)}',
      '#auth-error{font-family:Inter,Helvetica,Arial,sans-serif;font-size:.85rem;color:#ff6b6b;margin:0;min-height:1.2em;text-align:center}'
    ].join('');

    document.head.appendChild(style);
    document.body.insertBefore(overlay, document.body.firstChild);

    var input = document.getElementById('auth-input');
    var btn = document.getElementById('auth-btn');
    var error = document.getElementById('auth-error');

    function attempt() {
      if (check(input.value)) {
        sessionStorage.setItem(SESSION_KEY, '1');
        overlay.remove();
        style.remove();
      } else {
        error.textContent = 'Incorrect password';
        input.value = '';
        input.focus();
      }
    }

    btn.addEventListener('click', attempt);
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') attempt();
    });

    input.focus();
  });
})();
