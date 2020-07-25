/*
 * Editor client script for DB table ads_field
 */
/*global $, pc295 */
pc295.ads_field = ( function($) {
  var
    table,
    editor,  // use a global for the submit and return data rendering
    filterColumn,
        // populateOption,,
    initModule;

  filterColumn = function ( i, text ) {
    if (! table) { return; }
    // cf. Search API https://datatables.net/examples/api/regex.html
    if ('' !== text) {
      if (0 === i ) {
        table
          .column( 0 ).search( text ? '^'+text+'$' : '', true, false )
          .column( 1 ).search( '', true, false )
          .draw();
      } else if (1 === i) {
        table
          .column( 0 ).search( '', true, false )
          .column( 1 ).search( text ? '^'+text+'$' : '', true, false )
          .draw();
      }
    }
    else {
      table
        .column( 0 ).search( '', true, false )
        .column( 1 ).search( '', true, false )
        .draw();
    }
  };

/*  populateOption = function ( json ) {
    var
      i, len,
      data, rowid, id,
      module, tablename, name,
      moduleUsed = {},  tableUsed = {},
      moduleArray = [], tableArray = [],
      $select;
    for ( i = 0, len = json.data.length; i < len; i++ ) {
      data  = json.data[i];
      rowid = data.DT_RowId;
      id    = rowid.substr(4);
      module    = data.ads_module.module;
      moduleUsed[ module ] = true;
      tablename = data.ads_table.tablename;
      tableUsed[ tablename ] = true;
    }
    $select = $('.item.ads_field select.module')
      .empty().append($('<option value=""></option>' ));
    moduleArray = [];
    for (var key in moduleUsed) if ( moduleUsed.hasOwnProperty( key )) {
      moduleArray.push( key );
    }
    moduleArray.sort();
    for( i = 0, len = moduleArray.length; i < len; i++ ) {
      name = moduleArray[ i ];
      if (name && '' !== name && 'null' !== name) {
        $select.append( $('<option value="' + name + '">' + name + '</option>' ));
      }
    }
    $select = $('.item.ads_field select.tablename')
      .empty().append($('<option value=""></option>' ));
    tableArray = [];
    for (var key in tableUsed) if ( tableUsed.hasOwnProperty( key )) {
      tableArray.push( key );
    }
    tableArray.sort();
    for( i = 0, len = tableArray.length; i < len; i++ ) {
      name = tableArray[ i ];
      if (name && '' !== name && 'null' !== name) {
        $select.append( $('<option value="' + name + '">' + name + '</option>' ));
      }
    }
  };
*/

  initModule = function() {
    /* ads_field */
    editor = new $.fn.dataTable.Editor({
      ajax: 'php/pc295.ads_field.php',
      table: '#ads_field',
      fields: [
        // { label: 'modulename', name: 'ads_field.module_id',  type: 'select' },
        { label: 'tablename',  name: 'ads_field.table_id',   type: 'select' },
        { label: 'fieldname',  name: 'ads_field.fieldname' },
        { label: 'seq',        name: 'ads_field.seq' },
        { label: 'level',      name: 'ads_field.level' },
        { label: 'datatype',   name: 'ads_field.datatype' },
        { label: 'length',     name: 'ads_field.length' },
        { label: 'xbrl_gl',    name: 'ads_field.xbrl_gl',     type: 'textarea'},
        { label: 'description',name: 'ads_field.description', type: 'textarea' },
        { label: 'page',       name: 'ads_field.page',        def: 1 }
      ]
    });

    editor.on('preSubmit', function ( e, json, data ) {
      var
        data, key, userid, password, pwd, pwdInBase64;
      data = json.data;
      if ( data ){
        Object.keys( data ).forEach( function ( key ) {
        // key  = Object.keys( data )[ 0 ];
          json.data[ key ].user_id = pc295.Global.USER_ID;
        });
      }
    });

    editor.on('postEdit postCreate postRemove', function ( e, json, data ) {
      $('#ads').dataTable().api().ajax.reload();
      $('#ads').dataTable().api().draw();
    });

    var buttons = [
      { text: 'Reload', className: 'reload',
          action: function ( e, dt, node, config ) {
            dt.ajax.reload();
          }
      },
      { extend: 'collection', text: 'Export', className: 'export',
        buttons: [
          { extend: 'copy',  exportOptions: { columns: ':visible' }},
          { extend: 'excel', exportOptions: { columns: ':visible' }},
          { extend: 'pdf',   exportOptions: { columns: ':visible' }},
          { extend: 'print', exportOptions: { columns: ':visible' }}
        ]
      }
    ];
    if ('guest' !== pc295.Global.USER_ROLE) {
      buttons = [
        { extend: 'create', editor: editor, className: 'create' },
        { extend: 'edit',   editor: editor, className: 'edit' },
        { extend: 'remove', editor: editor, className: 'remove' },
        { text: 'Reload', className: 'reload',
            action: function ( e, dt, node, config ) {
              dt.ajax.reload();
            }
        },
        { extend: 'collection', text: 'Export', className: 'export',
          buttons: [
          { extend: 'copy',  exportOptions: { columns: ':visible' }},
          { extend: 'excel', exportOptions: { columns: ':visible' }},
          { extend: 'csvHtml5', text: 'TSV', fieldSeparator: '\t', extension: '.tsv' },
          { extend: 'pdf',   exportOptions: { columns: ':visible' }},
          { extend: 'print', exportOptions: { columns: ':visible' }}
        ]}
      ];
    }
    table = $('#ads_field').DataTable({
      dom: 'Bfrtip',
      ajax: {
        url: 'php/pc295.ads_field.php',
        type: 'POST'
      },
      select: true,
      pageLength: 10,
      columns: [
        { data: 'ads_module.module' },    // 0
        { data: 'ads_table.tablename',    // 1
          render: function(data, type, full, meta){
            return pc295.renderAdsTablename( data, type );
          }
         },  // 1
        { data: 'ads_field.seq' },        // 2
        { data: 'ads_field.fieldname' },  // 3
        { data: 'ads_field.level' },      // 4
        { data: 'ads_field.datatype' },   // 5
        { data: 'ads_field.length',       // 6
          render: function ( data, type, row ) {
            return pc295.renderLength( data, type );
          }
        },
        { data: 'ads_field.xbrl_gl' },    // 7
        { data: 'ads_field.description' },// 8
        { data: 'ads_field.page' },       // 9
        { data: 'url',                    // 10
          render: function ( data, type, row ) {
            var
              url,
              page = row.ads_table.page || row.ads_table.page || 1;
            if (row.ads_module.file && '' !== row.ads_module.file) {
              url = '<i class="fa fa-external-link" aria-hidden="true" data-url="http://wuwei.space/free/pdf_viewer.html?file=' +
                    row.ads_module.dir + row.ads_module.file + '&t=' + row.ads_table.tablename +
                    '#page=' + row.ads_table.page + '"></i>';
              return url;
            }
            return '';
          }
        },
        { data: 'ads_module.version' }     // 11
      ],
      columnDefs: [
        { 'targets': [ 0 ],             width: '12%', 'searchable': true },
        { 'targets': [ 1 ],             width: '17%', 'searchable': true },
        { 'targets': [ 3 ],             width: '14%', 'searchable': true },
        { 'targets': [ 2, 4, 5, 6, 9 ], width:  '3%', 'searchable': true },
        { 'targets': [ 7, 8 ],          width: '17%', 'searchable': true },
        { 'targets': [ 10 ],            width:  '3%', 'searchable': false },
        { 'targets': [ 11 ],            width:  '5%', 'searchable': false }
      ],
      order: [[ 2, 'asc' ]],
      buttons: buttons,
      initComplete: function ( settings, json ) {
        //var          json = populatedData.json;
        /*populateOption ( json );
        $('.item.ads_field .column_filter').on( 'change', function ( e ) {
          var
            text = $( this ).val();
          e.preventDefault();
          if ($(this).hasClass('module')) {
            filterColumn( 0, text );
            $('.item.ads_field .column_filter.tablename').val('');
          }
          if ($(this).hasClass('tablename')) {
            filterColumn( 1, text );
            $('.item.ads_field .column_filter.module').val('');
          }
          return false;
        });*/

        pc295.reportProgress('#ads_field');
        /*pc295.Global.initialized += 1;
        pc295.progress(Math.round(100*pc295.Global.initialized/pc295.Global.NUM_TABLES));
        console.log('#ads_field DataTable initComplete');*/
      }
    });

    $('#ads_field').on( 'draw.dt', function (e) {
      e.preventDefault();
      var
        pageLength = $('#ads_field').DataTable().page.len();

      $('#ads_field_pagelength input[value=' + pageLength + ']').prop('checked',true);

      $('#ads_field i').click( function (e) {
        e.preventDefault();
        var url = $( this ).data('url');
        if ('' !== url) {
          pc295.PdfDialog( url );
        }
      });

      // console.log('ON draw table #ads_field');
    });

    $('#ads_field_pagelength input[name="ads_field"]').change( function (e) {
      e.preventDefault();
      var length = $('#ads_field_pagelength input[name="ads_field"]:checked').val();
      $('#ads_field')
        .DataTable()
        .page.len( length )
        .draw();
    });

    $('#ads_field_toggle a.toggle-vis').on( 'click', function (e) {
      e.preventDefault();
      var
        column = table.column( $(this).data('column') ), // Get the column API object
        visible = column.visible();
      if ( visible ) { // Toggle the visibility
        column.visible( false );
        $(this).css('color', '#aaa');
      }
      else {
        column.visible( true );
        $(this).css('color', '#333');
      }
    });

    table.column(  0 ).visible( false );
    table.column(  1 ).visible( false );
    table.column(  9 ).visible( false );
    table.column( 11 ).visible( false );

    var toggle = $('#ads_field_toggle a.toggle-vis');
    $(toggle[  0 ]).css('color', '#aaa');
    $(toggle[  1 ]).css('color', '#aaa');
    $(toggle[  9 ]).css('color', '#aaa');
    $(toggle[ 11 ]).css('color', '#aaa');
  };

  return {
    initModule: initModule,
    filterColumn: filterColumn
    //,    populateOption: populateOption
  };
}(jQuery));