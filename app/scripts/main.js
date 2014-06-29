'use strict';

function fetch(method, url, options) {
  if (typeof url === 'undefined' || typeof url === 'object') {
    options = url;
    url = method;
    method = 'GET';
  }
  options = options || {};

  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === xhr.DONE) {
        if (xhr.status === 200) {
          if (typeof xhr.response === 'string') {
            resolve(JSON.parse(xhr.response));
          } else {
            resolve(xhr.response);
          }
        } else {
          reject(xhr);
        }
      }
    };
    xhr.responseType = 'json';
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.send();
  });
}

// polymer doesn't seem to be immediately available for in firefox
var ticket = setInterval(function () {

  if (window.PolymerExpressions === undefined) {
    return;
  }

  PolymerExpressions.prototype.unixTimeAgo = function (value) {
    return moment.unix(value).fromNow();
  };

  clearInterval(ticket);

}, 10);

