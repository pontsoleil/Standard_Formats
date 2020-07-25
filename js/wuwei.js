/*
 * wuwei.js
 * Root namespace module
 */
/**
 WuWei is a free to use open source knowledge modeling tool.
 More information on WuWei can be found on WuWei homepage.
 http://wuwei.space/blog/

 WuWei is copyrighted free software by Nobuyuki SAMBUICHI.

 Copyright (c) 2013-2016, SAMBUICHI Professional Engineer's Office
 All rights reserved.

 You can redistribute it and/or modify it under either the terms of the
 2-clause BSDL (see BSDL), or the WuWei License (See LICENSE).
 **/
/*jslint           browser : true,   continue : true,
 devel  : true,    indent : 2,       maxerr  : 50,
 newcap : true,     nomen : true,   plusplus : true,
 regexp : true,    sloppy : true,       vars : false,
 white  : true
 */
/*global $, FB */

var wuwei = ( function() {
  'use strict';
  var initModule = function( $container ) {
    // run some checks first
    var
      testingCanvas,
      testingContext,
      noscript = document.getElementById('noscript');

    noscript.parentNode.removeChild(noscript);

    function unsupported () {
      // disable handlers and leave
      window.init = null;
      window.onbeforeunload = null;
      window.onunload = null;
      window.location = 'unsupported.html';
    }

    testingCanvas = document.createElement('canvas');
    if (!testingCanvas || !testingCanvas.getContext) {
      unsupported();
    }
    testingContext = testingCanvas.getContext('2d');
    if (!testingContext) {
      unsupported();
    }

    // Check for the various File API support.
    /*if (window.File && window.FileReader) {
      // Great success! All the File APIs are supported.
      $('#upload_popover').show();
    } else {
      wuwei.ui.actions.openDialog('NO File Api','Warning: The File APIs are not fully supported in this browser.', 5000);
      console.log('Warning: The File APIs are not fully supported in this browser.');
      $('#upload_popover').hide();
    }*/

    // web page shell initialization
  };

  return {
    initModule : initModule
  };
}());
