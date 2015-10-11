(function() {
  'use strict';

  angular
    .module('nglearn')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
