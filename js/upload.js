/**
 * upload.js
 * upload module
 *
 * WuWei is a free to use open source knowledge modeling tool.
 * More information on WuWei can be found on WuWei homepage.
 * https://www.wuwei.space/blog/
 *
 * WuWei is licensed under the MIT License
 * Copyright (c) 2013-2020, Nobuyuki SAMBUICHI
 **/
upload = ( function () {

  function open(param) {
    console.log('upload.open('+param+')');
    if ('upload' === param) {
      $('#upload').html(upload.markup.template);
      $('#upload').modal('show');
    }
    progressbar.open();
  }

  function up(form) {
    AjaxSubmit(form)
    .then(responseText => {
      var response;
      try {
        response = JSON.parse(responseText);
      } catch (e) {
        console.log(e);
        return;
      }
      console.log(response);
      var file = response.file;
      var lastmodified = response.lastmodified;
      var totalsize = response.totalsize;
      $('#upload').modal('hide');
      snackbar.open({ 'message':`${file} (${totalsize})<br>${lastmodified}`, 'type':'success' });
      // }
    })
    .catch(e => {
      console.log(e);
    });
  }

  return {
    open: open,
    up: up
  };
})();
// upload.js