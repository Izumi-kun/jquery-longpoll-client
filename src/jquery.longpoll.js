/**
 * jQuery LongPoll client script.
 *
 * @license https://opensource.org/licenses/BSD-3-Clause
 * @author Viktor Khokhryakov <viktor.khokhryakov@gmail.com>
 */
(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    // CommonJS
    factory(require('jquery'));
  } else {
    // Browser globals
    factory(jQuery);
  }
}(function ($) {
  'use strict';

  $.longpoll = {
    get: function (id) {
      return polls[id];
    },
    register: function (id, options) {
      if (typeof id !== 'string') {
        throw new Error('The "id" must be a string');
      }
      if (polls[id] !== undefined) {
        polls[id].stop();
      }
      polls[id] = new Poll(id, options);
      return polls[id];
    },
    destroy: function (id) {
      if (polls[id] !== undefined) {
        polls[id].stop();
        delete polls[id];
      }
    }
  };

  /**
   * @type {Object.<string, Poll>}
   */
  var polls = {};

  var defaultPollSettings = {
    type: "GET",
    url: undefined,
    params: undefined,
    callback: undefined,
    pollInterval: 500,
    pollErrorInterval: 5000
  };

  function Poll(id, options) {
    var settings = $.extend({}, defaultPollSettings, options || {});
    if (!$.isPlainObject(settings.params) || $.isEmptyObject(settings.params)) {
      throw new Error('Invalid "params" property');
    }
    var params = settings.params;
    var timeoutId = null;
    var xhr = null;
    var self = this;
    this.callback = settings.callback;
    this.getId = function () {
      return id;
    };
    this.isActive = function () {
      return xhr !== null || timeoutId !== null;
    };
    this.start = function () {
      if (!self.isActive()) {
        doLoop();
      }
    };
    this.stop = function () {
      if (xhr !== null) {
        xhr.abort();
      }
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
    };
    function doLoop() {
      xhr = $.ajax({
        type : settings.type,
        url: settings.url,
        data: params,
        dataType: "json"
      }).done(function (response) {
        $.each(response.params, function (id, value) {
          if (params[id] !== value) {
            params = response.params;
            if ($.isFunction(self.callback)) {
              self.callback.call(self, response.data);
            }
            return false;
          }
        });
        timeoutId = setTimeout(doLoop, settings.pollInterval);
      }).fail(function (e) {
        if (e.status) {
          timeoutId = setTimeout(doLoop, settings.pollErrorInterval);
        }
      }).always(function () {
        xhr = null;
      });
    }
  }
}));
