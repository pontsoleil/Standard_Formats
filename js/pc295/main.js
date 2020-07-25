/*
 * tc295 main
 */
var tc295 = ( function ( $ ) {
  var
    userDict = {},
    // visited = {},
    Global = {
      USER_ID: null, // pkey uuid
      USERID: null,
      USER_NICENAME: null,
      USER_DISPLAYNAME: null,
      USER_EMAIL: null,
      // USER_ROLE:     null,
      USER_TOKEN: null,
      NUM_TABLES: 5,
      initialized: 0,
      progressbar: null,
      progressLabel: null,
      compositeIndexer: {},
      colorDim: '#aaa',
      colorExt: '#333',
      data: {},
      asof: '' //2016-12-04'
    },

    drag, dragover, dragleave,

    uuid,

    isEmpty, notEmpty,
    formatClause,
    renderAdsModulename,
    renderAdsTablename,
    renderConfidence,
    renderLength,
    renderField,
    renderID,
    numberFormat,
    openMessage, closeMessage,
    openDialog,
    openProgress,
    progress,
    reportProgress,
    populateUser,
    detectDevice, getWindowSize,
    hashCode, PdfDialog, renderName,
    reloadTables, redrawTables,
    afterLogin,
    pushVisited,
    // frmtRprstnOptions,
    populateSelect,
    showColumn,
    toggleColumn,
    setMultipleLine, format,
    initModule;

  uuid = function () {
    // https://github.com/GoogleChrome/chrome-platform-analytics/blob/master/src/internal/identifier.js
    // const FORMAT: string = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
    var chars = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".split("");
    for (var i = 0, len = chars.length; i < len; i++) {
      switch (chars[i]) {
        case "x":
          chars[i] = Math.floor(Math.random() * 16).toString(16);
          break;
        case "y":
          chars[i] = (Math.floor(Math.random() * 4) + 8).toString(16);
          break;
      }
    }
    return chars.join("");
  };

  /* Custom filtering function which will search data in column */
  // $.fn.dataTable.ext.search.push(
  //   function( settings, data, dataIndex, row, counter ) {
  //     var
  //       adc_field,
  //       rowid, id, type,
  //       component_id, composite_id,
  //       composite, component,
  //       visible;
  //     if ('adc_field' === settings.sTableId) {
  //       rowid  = row.DT_RowId;
  //       id     = rowid.substr(4);
  //       adc_field = row.adc_field;
  //       composite_id = adc_field.composite_id;
  //       component_id = adc_field.component_id;
  //       type   = adc_field.type;
  //       if (Global.compositeIndexer && Global.compositeIndexer[ composite_id ]) {
  //         visible = Global.compositeIndexer[ composite_id ].visible;
  //         if ( 5 === type ) {
  //           return visible;
  //         } else if ( 3 === type ) {
  //           return !visible;
  //         }
  //       }
  //       /*if ( composite_id ) {
  //         if (Global.compositeIndexer && Global.compositeIndexer[ composite_id ]) {
  //           composite = Global.compositeIndexer[ composite_id ];
  //           return composite.visible;
  //         }
  //       } else if ( component_id ) {
  //         if (Global.componentIndexer && Global.componentIndexer[ component_id ]) {
  //           component = Global.componentIndexer[ component_id ];
  //           return component.visible;
  //         }
  //       }*/
  //     } else if ('xbrlgl' === settings.sTableId || 'xbrlgl2' === settings.sTableId) {
  //       visible = data[ 7 ];
  //       if ('true' === visible) {
  //         return true;
  //       }
  //       if ('false' === visible) {
  //         return false;
  //       }
  //       return visible;
  //     }
  //     return true;
  //   }
  // );

  isEmpty = function ( v ) {
    return null === v ||
      undefined === v ||
             '' === v;
  };

  notEmpty = function ( v ) {
    return null !== v &&
      undefined !== v &&
             '' !== v;
  };

  formatClause = function  ( c ) {
    var
      carr = c.split(' '),
      c1 = carr[ 0 ].split('.')
        .map(function ( v ) {
          if(v < 10){
            return '0' + v;
          } else {
            return '' + v;
          }
        })
        .join('.'),
      c2 = carr[1],
      c3;
    if (carr.length > 2) {
      c3 = carr[2].split(')')
        .map(function ( v ) {
          if(v && v<10) {
            return '0' + v;
          } else {
            return '' + v;
          }
        })
        .join(')');
      return c1 + ' ' + c2 + ' ' + c3;
    }
    return c1 + ' ' + c2;
  };

  renderAdsModulename = function ( data, type ) {
    var
      i, len, length, Heading, seq, title,
      module = {
        'Base': 'Base Standard',
        'GL':   'General Ledger Standard',
        'IS':   'Inventory Subledger Standard',
        'O2C':  'Order to Cash Subledger Standard',
        'P2P':  'Procure to PaySubledger Standard',
        'FA':   'Fixed AssetSubledger Standard'
      };
    // cf. http://stackoverflow.com/questions/25319193/jquery-datatables-column-rendering-and-sorting
    if (type == "display"){
      if (module[data]) {
        data = module[data];
      }
    }
    return data;
  };

  renderAdsTablename = function ( data, type ) {
    var
      i, len, length, Heading, seq, title,
      module = [ 'Base', 'GL', 'IS', 'O2C', 'P2P', 'FA' ];
    // cf. http://stackoverflow.com/questions/25319193/jquery-datatables-column-rendering-and-sorting
    if (type == "display"){
      len = module.length;
      for ( i=0; i < len; i++ ) {
        Heading = module[ i ];
        if (data && 0 === data.indexOf( Heading )) {
          length = Heading.length;
          seq = data.substr(length, 2);
          title = data.substr(length + 2);
          if ('Base' === Heading || 'GL' === Heading) {
            data = Heading + ' 1.' + (seq|0) + title;
          }
          else {
            data = Heading + ' 2.' + (seq|0) + title;
          }
        }
      }
    }
    return data;
  };

  renderConfidence = function ( data, type ) {
    if (type == "display"){
      if ('TBD' === data) {
        data = '<span style="color:silver;">TBD</span>';
      }
      else if ('4' === data) {
        data = '<span style="color:green;">Almost Certain</span>';
      }
      else if ('3' === data) {
        data = '<span style="color:blue;">Highly Likely</span>';
      }
      else if ('2' === data) {
        data = '<span style="color:cyan;">Probabe</span>';
      }
      else if ('1' === data) {
        data = '<span style="color:orange;">Unlikely</span>';
      }
      else {
        data = '';
      }
    }
    return data;
  };

  renderLength = function ( data, type ) {
    if (type == "display"){
      if ( 0 == data) {
        data = '';
      }
    }
    return data;
  };

  openMessage = function (title, message) {
    var
      option,
      $dialog, html;

    option = {
      title: title,
      width: 400,
      height: 200,
      modal: false,
      show: { effect: 'fade', duration: 200 },
      hide: { effect: 'fade', duration: 1000 },
      close: function () {
        var $d = $( this );
        if ($d && $d.length > 0) {
          $d.dialog()
            .dialog('destroy')
            .remove();
        }
      }
    };

    $dialog = $('#message_dialog');
    if ($dialog && $dialog.length > 0) {
      $dialog.dialog('destroy').remove();
    }

    html = '<div id="message_dialog">';
    $dialog = $( html );
    if ( message ) {
      $dialog.append($('<p>' + message + '</p>'));
    }

    $dialog.addClass('popover')
      .appendTo('body')
      .dialog( option );

    return $dialog;
  };

  closeMessage = function () {
    var $d = $( '#message_dialog' );
    if ($d && $d.length > 0) {
      $d.dialog()
        .dialog('destroy')
        .remove();
    }
  };

  openDialog = function (title, message, duration) {
    var
      option,
      $dialog, html;

    $dialog = $('#message_dialog');
    if ($dialog && $dialog.length > 0) {
      $dialog.dialog('destroy').remove();
    }

    html = '<div id="message_dialog">';
    $dialog = $( html )
      .addClass('popover')
      .appendTo('body');
    if ( message ) {
      $dialog.append($('<p>' + message + '</p>'));
    }

    option = {
      title: title,
      width: 400,
      height: 200,
      modal: false,
      show: { effect: 'fade', duration: 200 },
      hide: { effect: 'fade', duration: 1000 },
      open: function (event, ui) {
        setTimeout( function () {
          $('#message_dialog').dialog( 'close' );
        }, duration );
      },
      close: function () {
        var $d = $( this );
        if ($d && $d.length > 0) {
          $d.dialog()
            .dialog('destroy')
            .remove();
        }
      }
    };

    $dialog.dialog( option );

    $dialog.fadeTo( duration, 0.8);
    return $dialog;
  };

  progress = function ( val ) {
    try {
      Global.progressbar.progressbar( "value", val );
    }
    catch ( err ) {
      console.warn( err );
    }
  };

  openProgress = function ( title, message ) {
    var
      option,
      $dialog, html,
      progressbar,
      progressLabel;

    $dialog = $('#message_dialog');
    if ($dialog && $dialog.length > 0) {
      $dialog.dialog('destroy').remove();
    }

    html = '<div id="message_dialog">';
    $dialog = $( html )
      .addClass('popover')
      .appendTo('body');
    if ( message ) {
      $dialog.append($('<p>' + message + '</p>'));
    }

    option = {
      title: title,
      width: 400,
      height: 200,
      modal: false,
      show: { effect: 'fade', duration: 500 },
      hide: { effect: 'fade', duration: 1000 },
    };

    $dialog.dialog( option );

    html = '<div class="progressbar"><div class="progress-label">Loading data...</div></div>';
    $(html).appendTo($dialog);

    progressbar = $( "#message_dialog .progressbar" );
    Global.progressLabel = $( "#message_dialog .progress-label" );

    Global.progressbar = progressbar.progressbar({
      value: false,
      change: function() {
        Global.progressLabel.text( progressbar.progressbar( "value" ) + "%" );
      },
      complete: function() {
        Global.progressLabel.text( "Complete!" );
        setTimeout( function () {
          $dialog.dialog('close');
        }, 500);
      }
    });

    setTimeout( function () {
      $dialog.dialog('close');
    }, 5000);

    progress( 0 );
    return $dialog;
  };

  reportProgress = function( tableid ) {
    tc295.Global.initialized += 1;
    tc295.progress(Math.round(100*tc295.Global.initialized/tc295.Global.NUM_TABLES));
    console.log( tableid + ' DataTable initComplete');
  };

  populateUser = function () {
    $.ajax({
      url: 'php/table.userlist.php',
      dataType: 'json'
    })
    .done( function ( json ) {
      var
        len, i, data,rowid, id, name;
      len = json.data.length;
      for ( i = 0; i < len; i++ ) {
        data = json.data[i];
        rowid = data.DT_RowId;
        id = rowid.substr( 4 );
        name = data.name;
        if ( id && name ) {
          userDict[ id ] = name;
        }
      }
    })
    .fail( function( data, textStatus, errorThrown ) {
      openDialog( 'ERROR', textStatus );
      console.log( errorThrown.message );
    }); // END $.ajax
  };

  numberFormat = function ( num ){
    return String( num ).replace( /(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
  };

  // cf. http://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript-jquery
  hashCode = function( str ) {
    var
      hash = 0, i, chr, len;
    if (str.length === 0) return hash;
    for ( i = 0, len = str.length; i < len; i++ ) {
      chr = str.charCodeAt( i );
      hash = (( hash << 5 ) - hash ) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    if ( hash < 0 ) {
      hash = '_' + ( -1 * hash );
    }
    return hash;
  };

  detectDevice = function () {
    var
      min480   = window.matchMedia('screen and (min-width: 480px)'),
      min768_max1024 = window.matchMedia('screen and (min-width:768px) and ( max-width:1024px)'),
      min1024  = window.matchMedia('screen and (min-width: 1024px)'),
      portrait = window.matchMedia('screen and (orientation: portrait)'),
      landscape = window.matchMedia('screen and (orientation: landscape)'),
      device, orientation;

    Global.IS_TOUCH = !!('ontouchstart' in window);

    if (Global.IS_TOUCH) {
      device = 'iphone';
      if (min480.matches) {
        device = 'iphone';
      }
      if (min768_max1024.matches) {
        device = 'ipad';
      }
    } else {
      device = 'pc';
    }
    if (min1024.matches) {
      device = 'pc';
    }
    Global.DEVICE = {
      'device': device,
      'orientation': orientation
    };
    return Global.DEVICE;
  };

  getWindowSize = function () {
    var
      device,
      w, h;
    w = window.innerWidth; h = window.innerHeight;
    Global.DEVICE = detectDevice();
    if ( Global.DEVICE ) {
      device = Global.DEVICE.device;
      if ('iphone' === device) {
        w = screen.width;
        h = screen.height;
      }
    }
    return { W: w, H: h };
  };

  PdfDialog = function ( url ) {
    var
      windowSize = getWindowSize(),
      i,
      $popover, iframe,
      pairs, pair,
      FLOC, splittedSrc, FNAME,
      id,
      title,
      dialogSize,
      max, min, left, top,
      myPosition, atPosition,
      getSize;

    if (isEmpty( url )) { return; }

    getSize = function () {
      var
        windowSize = getWindowSize(),
        width, height;
      if (windowSize.W > windowSize.H) {
        height = 0 | (windowSize.H * 0.95);
        width = 0 | (0.8 * height);
      } else {
        height = 0 | (windowSize.W * 0.95);
        width = 0 | (0.8 * height);
      }
      return {W: width, H: height};
    };

    if (url && url.indexOf('pdf_viewer.html?') >= 0) {
      pairs = url.split('?')[ 1 ].split('#')[ 0 ].split('&');
      for ( i = 0; i < pairs.length; i += 1) {
        pair = pairs[ i ];
        if (pair.indexOf('=') > 0) {
          pair = pairs[ i ].split('=');
          if ('file' === pair[ 0 ]) {
            FLOC = decodeURI(pair[ 1 ]);
            splittedSrc = FLOC.split('/');
            FNAME = splittedSrc[splittedSrc.length - 1].split('.')[ 0 ];
            FNAME = decodeURI(FNAME);
          } else if ('t' === pair[ 0 ]) {
            title = pair[ 1 ];
            title = decodeURI(title);
          }
        }
      }
    } else {
      return null;
    }

    //id = url.replace( new RegExp(/(\?|\/|&|#|=|\.)/g), "_");
    id = hashCode( url );
    $popover = $('#dialog_'+id);
    if ($popover[0]) {
      try {
        $popover.dialog('destroy').remove();
      } catch ( e ) {
        console.error('PdfDialog ERROR:', e.message);
      }
    }

    $popover = $('<div>')
        .prop('id', 'dialog_'+id)
        .addClass('dialogPopover')
        .css('padding', 0)
        .appendTo('body');

    $('<p class="loading">' +
         '<i class="fa fa-spinner fa-pulse fal-lg fa-fw" aria-hidden="true"></i>Loading...</p>')
        .appendTo( $popover );

    iframe = $('<iframe>')[0];
    $( iframe ).addClass('contentsFrame')
        .appendTo( $popover )
        .hide();

    // cf. http://stackoverflow.com/questions/9534001/want-to-call-a-function-if-iframe-doesnt-load-or-loads
    iframe.onload = function () {
      $popover.find('.loading').remove();
      $popover.find('iframe').show();
      return false;
    };
    iframe.onerror = function ( err ) {
      $popover.find('.loading').remove();
      tryProxy( url, $popover );
      return false;
    };
    iframe.src = url;

    max = 64;
    min = 24;
    left = (min + Math.random()*(max - min)) | 0;
    top = (min + Math.random()*(max - min)) | 0;
    if (url.indexOf('page') > 0) {
      myPosition = 'right'+left+' top'+top;
      atPosition = 'right-24 top+24';
    } else {
      myPosition = 'left'+left+' top'+top;
      atPosition = 'left+24 top+24';
    }
    dialogSize = getSize();

    $popover.dialog({
      title: title || FNAME,
      width: dialogSize.W,
      height: dialogSize.H,
      position: {
        my: myPosition,
        at: atPosition,
        of: 'body'
      },
      modal: false,
      autoOpen: true,
      draggable: true,
      resizable: true,
      show: {
        effect: 'blind',
        duration: 300
      },
      hide: {
        effect: 'fade',
        duration: 300
      },
      open: function ( event, ui ) {
        var
          $expandBtn, $resumeBtn;
        $expandBtn = $('<button class="expand"><i class="fa fa-plus-square-o fa-lg" aria-hidden="true"></i></button>')
            .prop('id', 'expand_button_'+id)
            .button()
            .click( function () {
              var
                popover=$('.ui-dialog[aria-describedby="dialog_'+id+'"]'),
                W = popover.width();
              if (W*1.5 < windowSize.W*0.95) {
                W *= 1.5;
              } else {
                W = windowSize.W*0.95;
              }
              $('.dialogPopover#dialog_'+id).dialog({
                width: W,
                position: {
                  my: myPosition,
                  at: atPosition,
                  of: 'body'
                }
              });
              //$('#expand_button_'+id).button('disable');
              $('#expand_button_'+id).hide();
              $('#resume_button_'+id).show();
            });
        $resumeBtn = $('<button class="resume"><i class="fa fa-minus-square-o fa-lg" aria-hidden="true"></i></button>')
            .prop('id', 'resume_button_'+id)
            .button()
            .click( function () {
              var
                //popover=$('.ui-dialog[aria-describedby="dialog_'+id+'"]'),
                W = getSize().W;
              $('.dialogPopover#dialog_'+id).dialog({
                width: W,
                position: {
                  my: myPosition,
                  at: atPosition,
                  of: 'body'
                }
              });
              W = $('#expand_button_'+id).height();
              //$('#expand_button_'+id).button('enable');
              $('#expand_button_'+id).show();
              $('#resume_button_'+id).hide();
            })
            .hide();
        $( this ).prev('.ui-dialog-titlebar').find('.ui-dialog-title').after($expandBtn);
        $( this ).prev('.ui-dialog-titlebar').find('.ui-dialog-title').after($resumeBtn);
        $expandBtn.button('enable');
        $resumeBtn.hide();
      }
    });

    return $popover;
  };

  renderName = function ( data, type, row ) {
    var
      refclass, span,
      aType;
    if ( type === 'display') {
      aType = row.type;
      refclass = row.refclass;
      switch ( aType ) {
        case 1: // Attribute
          if( row.uniqueid ) {
            return '<i class="fa fa-key" aria-hidden="true"></i>&nbsp;' +
              '<span style="font-weight: bold">'+data+'</span>';
          }
          return data;
        case 2: // Reference
          if (row.classname === refclass) {
            span = '<i class="fa fa-arrow-right" aria-hidden="true"></i>&nbsp;' +
              '<span style="color: #4169e1;">';
          }
          else {
            span = '<i class="fa fa-arrow-right" aria-hidden="true"></i>&nbsp;<span>';
          }
          break;
        case 3: // Component
          if (row.classname === refclass) {
            span = '<i class="fa fa-quote-left" aria-hidden="true"></i>&nbsp;' +
              '<span style="color: #ff1493;">';
          }
          else {
            span = '<i class="fa fa-quote-left" aria-hidden="true"></i>&nbsp;<span>';
          }
          break;
        case 4: // Child
          if (row.classname === refclass) {
            span = '<i class="fa fa-bars" aria-hidden="true"></i>&nbsp;' +
              '<span style=" style="font-weight: bold" color: #ff1493;">';
          }
          else {
            span = '<i class="fa fa-bars" aria-hidden="true"></i>&nbsp;' +
              '<span style="font-weight: bold">';
          }
          break;
        }
        return span + refclass + '</span>';
      }
    return data;
  };

  renderField = function ( data, type, row ) {
    var
      fieldtype = row.fieldtype,
      ref, span;
    //if ( type === 'display') {
    switch ( fieldtype ) {
      case 2: // Reference
        ref = row.reftable || '';
        span = '<i class="fa fa-arrow-right" aria-hidden="true"></i>&nbsp;';
        return span + ref + '</span>';
      case 3: // Component
        ref = row.component || '';
        span = '<i class="fa fa-minus" aria-hidden="true"></i>&nbsp;';
        return span + ref + '</span>';
      case 4: // to Parent
        ref = row.reftable || '';
        span = '<i class="fa fa-arrow-up" aria-hidden="true"></i>&nbsp;';
        return span + ref + '</span>';
      case 5: // composite
        ref = data.adc_composite.name || '';
        span = '<i class="fa fa-th-list" aria-hidden="true"></i>&nbsp;';
        return span + ref + '</span>';
      // case 1: // Field
      default:
        ref = data.adc_datatype.name;
        if( row.uniqueid ) {
          return '<i class="fa fa-key" aria-hidden="true"></i>&nbsp;<b>'+ref+'</b>';
        } else {
          return ref + '</span>';
        }
    //}
  }
    return data;
  };

  renderID = function ( data, type, row ) {
    var
      fieldtype = row.fieldtype,
      ref, span;
    switch ( fieldtype ) {
      case 2: // Reference
        ref = row.reftable || '';
        if (ref) {
          span = '<i class="fa fa-arrow-right" aria-hidden="true"></i>&nbsp;';
          return span + ref + '</span>';
        }
        return '';
      case 4: // to Parent
        ref = row.reftable || '';
        if (ref) {
          span = '<i class="fa fa-arrow-up" aria-hidden="true"></i>&nbsp;';
          return span + ref + '</span>';
        }
        return '';
      case 3: // Component
        ref = row.component;// || data.adc_component.name;
        if (ref) {
          ref += '(' + (row.composite || data.adc_composite.name) + ')';
          span = '<i class="fa fa-minus" aria-hidden="true"></i>&nbsp;';
          return span + ref + '</span>';
        }
        ref = row.reftable;
        if (ref) {
          span = '<i class="fa fa-arrow-right" aria-hidden="true"></i>&nbsp;';
          return span + ref + '</span>';
        }
        return '';
      case 5: // composite
        ref = row.composite;// || data.v_composite.name;
        if (ref) {
          span = '<i class="fa fa-th-list" aria-hidden="true"></i>&nbsp;';
          return span + ref + '</span>';
        }
        return '';
      default:
        return '';
    }
    return data;
  };

  populateSelect = function ( param ) {
    var
      table_id = param.table_id,
      currentModule = param.module,
      currentTablegroup = param.table_group,
      moduleName, tablegroupName, tableName, commonName,
      len, i, data, d, rowid, id, row, name, key,
      moduleDict = {},
      tablegroupDict = {},
      tableDict = {},
      commonDict = {},
      moduleArray = [],
      tablegroupArray = [],
      tableArray = [],
      commonArray = [],
      $moduleSelect,
      $tablegroupSelect,
      $tableSelect,
      $commonSelect;
    if ('adc_element2' === table_id) {
      data = $( '#adc_table' ).DataTable().rows().data();
    } else {
      data = $( '#' + table_id ).DataTable().rows().data();
    }
    len = data.length;
    if ( 'adc_cmon_elmt' === table_id ) {
      for ( i = 0; i < len; i++ ) {
        d = data[ i ];
        rowid = d.DT_RowId;
        id = rowid.substr( 4 );
        row = d.adc_common;
        commonName = row.name;
        commonDict[ commonName ] = id;
      }
      // Common
      for (key in commonDict) if ( commonDict.hasOwnProperty( key )) {
        commonArray.push( key );
      }
      commonArray.sort();
      $commonSelect = $('.item.' + table_id + ' select.common')
        .empty()
        .append( $('<option value=""></option>' ));
      for( i = 0, len = commonArray.length; i < len; i++ ) {
        key = commonArray[ i ];
        $commonSelect.append( $('<option value="' + key + '">' + key + '</option>' ));
      }
      return;
    }
    if ( 'adc_intrface_elmt' === table_id ) {
      for ( i = 0; i < len; i++ ) {
        d = data[ i ];
        rowid = d.DT_RowId;
        id = rowid.substr( 4 );
        row = d.adc_intrface_elmt;
        moduleName = row.module;
        moduleDict[ moduleName ] = id;
        if ( '' === currentModule || currentModule === moduleName ) {
          tablegroupName = row.table_group;
          tablegroupDict[ tablegroupName ] = id;
          if ( '' === currentTablegroup || currentTablegroup === tablegroupName ) {
            tableName = row.table;
            tableDict[ tableName ] = id;
          }
        }
      }
    } else {
      for ( i = 0; i < len; i++ ) {
        d = data[ i ];
        rowid = d.DT_RowId;
        id = rowid.substr( 4 );
        moduleName = d.adc_module.name;
        moduleDict[ moduleName ] = id;
        if ( '' === currentModule || currentModule === moduleName ) {
          tablegroupName = d.adc_table.group;
          tablegroupDict[ tablegroupName ] = id;
          if ( '' === currentTablegroup || currentTablegroup === tablegroupName ) {
            tableName = d.adc_table.name;
            tableDict[ tableName ] = id;
          }
        }
      }
    }

    // Module
    if ( '' === currentModule ) {
      for (key in moduleDict) if ( moduleDict.hasOwnProperty( key )) {
        moduleArray.push( key );
      }
      moduleArray.sort();
      $moduleSelect = $('.item.' + table_id + ' select.module')
        .empty()
        .append( $('<option value=""></option>' ));
      for( i = 0, len = moduleArray.length; i < len; i++ ) {
        key = moduleArray[ i ];
        $moduleSelect.append( $('<option value="' + key + '">' + key + '</option>' ));
      }
    }
    // Tablegroup
    if ( '' === currentTablegroup ) {
      for (key in tablegroupDict) if ( tablegroupDict.hasOwnProperty( key )) {
        tablegroupArray.push( key );
      }
      tablegroupArray.sort();
      $tablegroupSelect = $('.item.' + table_id + ' select.table_group')
        .empty()
        .append( $('<option value=""></option>' ));
      for( i = 0, len = tablegroupArray.length; i < len; i++ ) {
        key = tablegroupArray[ i ];
        $tablegroupSelect.append( $('<option value="' + key + '">' + key + '</option>' ));
      }
    }
    // Table
    for (key in tableDict) if ( tableDict.hasOwnProperty( key )) {
      tableArray.push( key );
    }
    tableArray.sort();
    $tableSelect = $('.item.' + table_id + ' select.table');
    if ( 1 === $tableSelect.length ) {
      $tableSelect
        .empty()
        .append( $('<option value=""></option>' ));
      for( i = 0, len = tableArray.length; i < len; i++ ) {
        key = tableArray[ i ];
        $tableSelect.append( $('<option value="' + key + '">' + key + '</option>' ));
      }
    }
  };

  toggleColumn = function ( table_id, column, visible ) {
    visible = !visible;
    showColumn( table_id, column, visible );
  };

  showColumn = function ( table_id, column, visible ) {
    var
      table = $('#' + table_id).dataTable().api(),
      toggle = $('#' + table_id + '_toggle a.toggle-vis'),
      color = visible ? Global.colorExt : Global.colorDim;
    // table.ajax.reload();
    table.column( column ).visible( visible ).draw();
    $(toggle[ column ]).css({
      'color': color
    });
  };

  drag = function ( ev ) {
    var
      tagName, $tr, $tbody, $table,
      id, tableid,
      map = {},
      data;
    tagName = ev.target.tagName.toLowerCase();
    if ('td' === tagName) {
      $td = $(ev.target);
      $tr = $td.parent();
    } else if ('tr' === tagName) {
      $tr = $(ev.target);
    } else {
      return;
    }
    $tbody = $tr.parent();
    $table = $tbody.parent();
    tableid = $table.prop('id');
    var
      clause, group, common_name, name, abbrev, notation, frmt_rprstn_ref, mco, desc;
    if ('adc_frmt_rprstn' === tableid) {
      $('td').removeClass('target');
      $('td.frmt_rprstn_name').addClass('target');
      id = $tr.prop('id').substr(4);
      clause = $tr.find('td.clause').text().trim();
      name = $tr.find('td.name').text().trim();
      notation = $tr.find('td.notation').text().trim();
      desc = $tr.find('td.desc').text().trim();
      map = {
        'tableid': tableid,
        'id': id,
        'clause': clause,
        'name': name,
        'notation': notation,
        'desc': desc
      };
    } else if ('adc_cmon_elmt' === tableid) {
      $('td').removeClass('target');
      $('td.cmon_elmt_clause').addClass('target');
      id = $tr.prop('id').substr(4);
      clause = $tr.find('td.clause').text().trim();
      group = $tr.find('td.group').text().trim();
      common_name = $tr.find('td.common_name').text().trim();
      name = $tr.find('td.name').text().trim();
      abbrev = $tr.find('td.abbrev').text().trim();
      notation = $tr.find('td.notation').text().trim();
      frmt_rprstn_ref = $tr.find('td.frmt_rprstn_ref').text().trim();
      mco = $tr.find('td.mco').text().trim();
      desc = $tr.find('td.desc').text().trim();
      map = {
        'tableid': tableid,
        'id': id,
        'clause': clause,
        'group': group,
        'common_name': common_name,
        'name': name,
        'abbrev': abbrev,
        'notation': notation,
        'frmt_rprstn_ref': frmt_rprstn_ref,
        'mco': mco,
        'desc': desc
      };
    } else if ('adc_element2' === tableid) {
      $('td').removeClass('target');
      $('td.element_ref').addClass('target');
      id = $tr.prop('id').substr(4);
      clause = $tr.find('td.clause').text().trim();
      name = $tr.find('td.name').text().trim();
      map = {
        'tableid': tableid,
        'id': id,
        'clause': clause,
        'name': name
      };
    }
    data = JSON.stringify(map);
    ev.dataTransfer.setData("text/plain", data);
  };

  dragleave = function ( ev ) {
    var
      tagName, $tr, $tbody, $table;
    tagName = ev.target.tagName.toLowerCase();
    if ('td' === tagName) {
      $td = $(ev.target);
      $tr = $td.parent();
    } else if ('tr' === tagName) {
      $tr = $(ev.target);
      $td = $tr.find('td');
    } else {
      return;
    }
    $tbody = $tr.parent();
    $table = $tbody.parent();
    $('tr.drag_over').removeClass('drag_over');
  };

  dragover = function ( ev ) {
    var
      tagName, $tr, $tbody, $table;
    tagName = ev.target.tagName.toLowerCase();
    if ('td' === tagName) {
      $td = $(ev.target);
      $tr = $td.parent();
    } else if ('tr' === tagName) {
      $tr = $(ev.target);
      $td = $tr.find('td');//.first();
    } else {
      return;
    }
    $tbody = $tr.parent();
    $table = $tbody.parent();
    // highlight potential drop target when the draggable element enters it
    if ( $table.hasClass('dropzone') ) {
      $tr.addClass('drag_over');
    }
    ev.preventDefault();
  };

  getCharWidth = function ( table_id ) {
    var
      el = document.getElementById(table_id),
      style = window.getComputedStyle(el, null).getPropertyValue('font-size'),
      fontSize = parseFloat(style); 
    var test = document.getElementById('Test');
    test.style.fontSize = fontSize;
    var width = 0.8 * (test.clientWidth + 1) / 52; // tc295.adc.css set html font-size: 80%;
    return width;
  };

  /* Formatting function for row details - modify as you need */
  setMultipleLine = function ( strings, characters ) {
    var
      i, len, len2, idx, ltr,
      line = '',
      text = '',
      row = 0,
      totalWidth = 0,
      texts, lines,
      original_text, chr, code, condition;

    texts = [];
    lines = strings ? strings.split( '\n' ) : '';
    for ( i = 0, len = lines.length; i < len; i++) {
      text = '';
      totalWidth = 0;
      line = lines[ i ];
      len2 = line.length;
      if (0 === len2) {
        texts[row++] = '';
        totalWidth = 0;
      }
      for( idx = 0; idx < len2; idx++) {
        ltr = line.charAt(idx);
        text += ltr;
        totalWidth += 1;
        if (totalWidth >= characters) {
          if (idx < len2) {
            original_text = text;
            chr     = line.charAt(idx + 1);
            code    = line.charCodeAt(idx + 1);
            condition = (idx >= 0) && /\S/.test(chr);
            if ( condition ) { // Single byte not space
              do {
                idx--;
                chr = line.charAt(idx);
                code = line.charCodeAt(idx);
                text = text.substring(0, text.length - 1); // make 1 byte shorter
                condition = (idx >= 0) /*&& configMap.TAO.isSingleByte(code)*/ && /\S/.test(chr);
              } while ( condition ); // This line ends with a single byte not space character
              if ('' === text) {   // This line contains a word longer than this line
                do {
                  idx++;
                  chr = line.charAt(idx);
                  code = line.charCodeAt(idx);
                  text += chr;
                  condition = idx < len2 /*&& configMap.TAO.isSingleByte(code)*/ && /\S/.test(chr);
                } while ( condition ); // append a char of single byte not space
              }
            }
          }
          if ('' !== text) {
            texts[row++] = text;
          }
          else {
            texts[row++] = original_text;
          }
          text = '';
          totalWidth = 0;
        }
      }
      if (totalWidth > 0) {
          texts[row++] = text;
      }
    }
    return texts;
  };

  format = function ( table_id, desc ) {
    if (!desc) {
      return '';
    }
    var width = $('#' + table_id).width();
    if (!width) {
      return '';
    }
    var
      charWidthInPx = getCharWidth( table_id ),
      characters = width / charWidthInPx;
    if (desc && 'string' === typeof desc) {
      desc = setMultipleLine(desc, characters);
      desc = desc.join('<br>');
      return desc; // '<p>' + desc + '</p>';
    }
    return '<p>&nbsp;</p>';
  };

  reloadTables = function () {
    $('#adc_intrface_elmt').DataTable().ajax.reload();
    $('#adc_intrface_ref').DataTable().ajax.reload();
    $('#adc_intrface_desc').DataTable().ajax.reload();
    $('#adc_table').DataTable().ajax.reload();
    $('#adc_frmt_rprstn').DataTable().ajax.reload();
    $('#adc_element').DataTable().ajax.reload();
    $('#adc_cmon_elmt').DataTable().ajax.reload();
    $('#adc_element2').DataTable().ajax.reload();
  };

  redrawTables = function () {
    $('#adc_intrface_elmt').DataTable().draw();
    $('#adc_intrface_ref').DataTable().draw();
    $('#adc_intrface_desc').DataTable().draw();
    $('#adc_table').DataTable().draw();
    $('#adc_frmt_rprstn').DataTable().draw();
    $('#adc_element').DataTable().draw();
    $('#adc_cmon_elmt').DataTable().draw();
    $('#adc_element2').DataTable().draw();
  };

  afterLogin = function ( user ) {

    openProgress( 'ISO/tc295 WG1', 'Initializing');

    tc295.Global.USERID = user.userid;
    tc295.Global.USER_EMAIL = user.email;
    tc295.Global.USER_NICE_NAME = user.nice_name;
    tc295.Global.USER_DISPLAY_NAME = user.display_name;
    tc295.Global.USER_TOKEN = user.token;

    // if ( Global.USER_ROLE &&
    //     'admin' === Global.USER_ROLE) {
    //   populateUser();
    // }
    // else {
    //   Global.NUM_TABLES -= 1;
    //   $( '#content .admin' ).remove();
    //   if ( Global.USER_ROLE &&
    //       'guest' === Global.USER_ROLE) {
    //     $('.item').addClass('result');
    //   }
    // }

    tc295.adc_intrface_elmt.initModule();
    tc295.adc_intrface_ref.initModule();
    tc295.adc_intrface_desc.initModule();

    tc295.adc_table.initModule();
    tc295.adc_frmt_rprstn.initModule();
    tc295.adc_element.initModule();
    tc295.adc_cmon_elmt.initModule();
    tc295.adc_element2.initModule();
    // tc295.xbrlgl.initModule();

//    tc295.adc_command.initModule();

    // tc295.ads_module.initModule();
    // tc295.ads_table.initModule();
    // tc295.ads_field.initModule();
    // tc295.xbrlgl2.initModule();

    $( '#content' ).tabs( 'enable' );
    $( '#content' ).tabs( 'option', 'disabled', [ 0 ]);
    $( 'a.login' ).hide();

    setTimeout( function () {
      $( '#content' ).tabs( 'option', 'active', 2 );
    }, 500);

    $( '#content' ).on( 'tabsactivate', function( event, ui ) {
      redrawTables();
    });

    // $('.asof').hide();
  };

  initModule = function() {
    // cf. https://github.com/shagstrom/split-pane
    var
      loggedIn = false,
      openTablePane,
      openElement2Pane;

    document.allowDrop = function(ev) {
      ev.preventDefault();
    };

    openTablePane = function ( open ) {
      var
        whole_pane_width, right_pane_width;
      whole_pane_width = $('#split-pane2-1').width();
      if ( open ) { // open &#x25C0; ◀
        $('#open_table').addClass('opened').html('&#x25C0;');
        if ($('#open_element2').hasClass('opened')) {
          $('#split-pane2-1').splitPane('firstComponentSize', 0.2*whole_pane_width);
        } else {
          $('#split-pane2-1').splitPane('firstComponentSize', 0.25*whole_pane_width);
        }
      } else { // close &#x25B6; ▶
        $('#open_table').removeClass('opened').html('&#x25B6;');
        $('#split-pane2-1').splitPane('firstComponentSize', 0);
      }
      right_pane_width = $('#right-component2').width();
      if ($('#open_element2').hasClass('opened')) {
        $('#split-pane2-3').splitPane('lastComponentSize', 0.25*right_pane_width);
      } else {
        $('#split-pane2-3').splitPane('lastComponentSize', 0);
      }
      redrawTables();
    };

    openElement2Pane = function ( open ) {
      var
        whole_pane_width, right_pane_width,
        tableName = $('.item.adc_field .heading .table').val();
      whole_pane_width = $('#split-pane2-1').width();
      if ($('#open_table').hasClass('opened')) {
        if ( open ) {
          $('#split-pane2-1').splitPane('firstComponentSize', 0.25*whole_pane_width);
        } else {
          $('#split-pane2-1').splitPane('firstComponentSize', 0.25*whole_pane_width);
        }
      } else {
        $('#split-pane2-1').splitPane('firstComponentSize', 0);
      }
      right_pane_width = $('#right-component2').width();
      if ( open ) { // open &#x25B6; ▶
        if ($('#open_table').hasClass('opened')) {
          $('#split-pane2-3').splitPane('lastComponentSize', 0.3*right_pane_width);
        }
        $('#open_element2').addClass('opened').html('&#x25B6;');
        $('#split-pane2-3').splitPane('lastComponentSize', 0.3*right_pane_width);
      } else { // close &#x25C0; ◀
        $('#open_element2').removeClass('opened').html('&#x25C0;');
        $('#split-pane2-3').splitPane('lastComponentSize', 0);
      }
      redrawTables();
    };

    $('div.split-pane').splitPane();

    // openModulePane( true );
    // openExpandPane( false );
    // openTablePane( true );
    // openElement2Pane( true );

/*    $('#open_module').click(function () {
      if ($('#open_module').hasClass('opened')) { // close
        openModulePane( false );
      } else { // open
        openModulePane( true );
      }
    });
*/
/*    $('#open_expanded').click( function () {
      if ($('#open_expanded').hasClass('opened')) { // close
        openExpandPane( false );
      } else { // open
        openExpandPane( true );
      }
    });
*/
    $('#open_table').click( function () {
      if ($('#open_table').hasClass('opened')) { // close
        openTablePane( false );
      } else { // open
        openTablePane( true );
      }
    });

    $('#open_element2').click( function () {
      if ($('#open_element2').hasClass('opened')) { // close
        openElement2Pane( false );
      } else { // open
        openElement2Pane( true );
      }
    });

    /*
     0 <li><a href="#login"         class="login">Login</a></li>
     1 <li><a href="#interface"     class="tc295 interface admin">Interface</a></li>
     2 <li><a href="#document_wd"   class="tc295 document_adc">Table &amp; Field</a></li>
     3 <li><a href="#logout"        class="logout">Logout</a></li>
     */
    $( '#content' ).tabs();
    setTimeout( function () {
      $( '#content' ).tabs( 'option', 'disabled', [ 1, 2, 3 ]);
    }, 20);
    $('.ui-tabs-nav').append(
      $('<span class="header title">ISO 21378 Audit Data Collection</span>')
    );

    $( '#login' ).show();
    tc295.login.initModule();

    $('.split-pane-divider').on('touchend mouseup', function(event) {
      console.log('split-pane-divider moved.');
      if ($(this).attr('id').indexOf('vertical') >= 0) {
        tc295.redrawTables();
      }
    });

    // CLEARABLE INPUT
    function tog( v ){ return v ? 'addClass': 'removeClass'; }

    $( document )
      .on('input', '.clearable', function(){
        $(this)[tog( this.value )]( 'x' );
      })
      .on('mousemove', '.x', function( e ){
        $(this)[tog( this.offsetWidth-18 < e.clientX-this.getBoundingClientRect().left )]( 'onX' );
      })
      .on('touchstart click', '.onX', function( ev ){
        ev.preventDefault();
        $(this).removeClass('x onX').val('').change();
      });

    // define type for ordering
    $.fn.dataTable.ext.type.order['clause-pre'] = function ( data ) {
      return formatClause( data );
    };

  };

  return {
    initModule: initModule,
    userDict:       userDict,
    Global:         Global,
    drag:           drag,
    dragover:       dragover,
    dragleave:      dragleave,
    reloadTables:   reloadTables,
    redrawTables:   redrawTables,
    afterLogin:     afterLogin,
    pushVisited:    pushVisited,
    uuid:           uuid,
    isEmpty:        isEmpty,
    notEmpty:       notEmpty,
    formatClause:   formatClause,
    PdfDialog:      PdfDialog,
    numberFormat:   numberFormat,
    openMessage:    openMessage,
    closeMessage:   closeMessage,
    openDialog:     openDialog,
    reportProgress: reportProgress,
    populateUser:   populateUser,
    openProgress:   openProgress,
    progress:       progress,
    renderName:     renderName,
    renderField:    renderField,
    renderID:       renderID,
    format:         format,
    renderAdsModulename: renderAdsModulename,
    renderAdsTablename: renderAdsTablename,
    renderConfidence: renderConfidence,
    renderLength: renderLength,
    populateSelect: populateSelect,
    showColumn: showColumn,
    toggleColumn: toggleColumn
  };
}(jQuery));
// main.js