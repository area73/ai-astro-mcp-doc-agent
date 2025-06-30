(function() {
  function getLogEl() {
    return document.getElementById('js-logs');
  }
  function appendLog(type, args) {
    const logEl = getLogEl();
    if (!logEl) return;
    const msg = Array.from(args).map(a => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' ');
    logEl.textContent += `[${type}] ` + msg + '\n';
    logEl.scrollTop = logEl.scrollHeight;
  }
  ['log', 'error', 'warn'].forEach(type => {
    const orig = console[type];
    console[type] = function() {
      appendLog(type, arguments);
      orig.apply(console, arguments);
    };
  });
  window.addEventListener('error', function(e) {
    appendLog('window.error', [e.message]);
  });
  window.addEventListener('unhandledrejection', function(e) {
    appendLog('promise', [e.reason]);
  });
})();
