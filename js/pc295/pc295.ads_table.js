/*
 * Editor client script for DB table ads_table
 */
/*global $, pc295 */
pc295.ads_table = ( function($) {
  var
    table,
    editor,  // use a global for the submit and return data rendering
    filterColumn,
    // populateoption,
    initModule;

  filterColumn = function ( i, text ) {
    if (! table) { return; }
    // cf. Search API https://datatables.net/examples/api/regex.html
    if ('' !== text) {
      table.column( i )
        .search( text, false, true )
        .draw();
    }
    else {
      table.column( i )
        .search( '', true, false )
        .draw();
    }
  };

  populateOption = function ( json ) {
    var
      i, len,
      data, rowid, id,
      module, tablename, name,
      nameUsed = {},
      nameArray = [],
      $select;
    for ( i = 0, len = json.data.length; i < len; i++ ) {
      data  = json.data[i];
      rowid = data.DT_RowId;
      id    = rowid.substr(4);
      module    = data.ads_module.module;
      tablename = data.ads_table.tablename;
      nameUsed[ module ] = true;
    }
    $select = $('.item.ads_table select.module')
      .empty().append($('<option value=""></option>' ));
    for (var key in nameUsed) if ( nameUsed.hasOwnProperty( key )) {
      nameArray.push( key );
    }
    nameArray.sort();
    for( i = 0, len = nameArray.length; i < len; i++ ) {
      name = nameArray[ i ];
      if (name && '' !== name && 'null' !== name) {
        $select.append( $('<option value="' + name + '">' + name + '</option>' ));
      }
    }
  };

  initModule = function() {
    /* ads_table */
    editor = new $.fn.dataTable.Editor({
      'ajax': 'php/pc295.ads_table.php',
      'table': '#ads_table',
      'fields': [
        { 'label': 'Module', 'name': 'ads_table.module_id', 'type': 'select' },
        { 'label': 'Table', 'name': 'ads_table.tablename' },
        { 'label': 'Page', 'name': 'ads_table.page', 'def': 1 }
      ]
    });

    editor.on('preSubmit', function ( e, json, _data ) {
      var
        data, key, userid;
      data = json.data;
      if ( data ){
        Object.keys( data ).forEach( function ( key ) {
        // key  = Object.keys( data )[ 0 ];
          json.data[ key ].user_id = pc295.Global.USER_ID;
        });
      }
    });

    editor.on('postEdit postCreate postRemove', function ( e, json, data ) {
      $('#adc_element').dataTable().api().ajax.reload();
      $('#adc_element').dataTable().api().draw();
      /*$.ajax({
        url  : 'php/adc_element.php',
        dataType: 'json',
        success: function ( json ) {
          pc295.adc_element.populateOption( json );
        }
      });*/
    });

    var buttons = [
      { 'text': 'Reload',
        'className': 'reload',
        'action': function ( e, dt, node, config ) {
          dt.ajax.reload();
        }
      },
      { 'extend': 'collection', 'text': 'Export', 'className': 'export',
        'buttons': [
          { 'extend': 'copy',  'exportOptions': { 'columns': ':visible' }},
          { 'extend': 'excel', 'exportOptions': { 'columns': ':visible' }},
          { 'extend': 'pdf',   'exportOptions': { 'columns': ':visible' }},
          { 'extend': 'print', 'exportOptions': { 'columns': ':visible' }}
        ]
      }
    ];
    if ('guest' !== pc295.Global.USER_ROLE) {
      buttons = [
        { 'extend': 'create', 'editor': editor, 'className': 'create' },
        { 'extend': 'edit',   'editor': editor, 'className': 'edit' },
        { 'extend': 'remove', 'editor': editor, 'className': 'remove' },
        { 'text': 'Reload',
          'className': 'reload',
          'action': function ( e, dt, node, config ) {
            dt.ajax.reload();
          }
        },
        { 'extend': 'collection', 'text': 'Export', 'className': 'export',
          'buttons': [
            { 'extend': 'copy',  'exportOptions': { 'columns': ':visible' }},
            { 'extend': 'excel', 'exportOptions': { 'columns': ':visible' }},
            { 'extend': 'csvHtml5', 'text': 'TSV', 'fieldSeparator': '\t', 'extension': '.tsv' },
            { 'extend': 'pdf',   'exportOptions': { 'columns': ':visible' }},
            { 'extend': 'print', 'exportOptions': { 'columns': ':visible' }}
          ]
        }
      ];
    }
    table = $('#ads_table').DataTable({
      'dom': 'Bfrtip',
      'ajax': {
        'url': 'php/pc295.ads_table.php',
        'type': 'POST'
      },
      'select': true,
      'pageLength': 20,
      'columns': [
        { 'data': 'ads_module.module' },  // 0
        { 'data': 'ads_table.tablename',  // 1
          'render': function(data, type, full, meta){
            return pc295.renderAdsTablename( data, type );
          }
        },// 1
        { 'data': 'ads_module.file' },    // 2
        { 'data': 'ads_table.page' },     // 3
        { 'data': 'url',                  // 4
          'render': function ( data, type, row ) {
            var
              url;
            if (row.ads_module.file && '' !== row.ads_module.file) {
              url = '<i class="fa fa-external-link" aria-hidden="true" data-url="http://wuwei.space/free/pdf_viewer.html?file=' +
                    row.ads_module.dir + row.ads_module.file + '&t=' + row.ads_table.tablename;
              if (row.ads_table.page && '' !== row.ads_table.page) {
                url += '#page=' + row.ads_table.page + '"></i>';
                return url;
              }
              url += '"></i>';
              return url;
            }
            return '';
          }
        }
      ],
      // 'columnDefs': [
      //   { 'targets': [ 0, 1, 2 ], width: '25%', 'searchable': true },
      //   { 'targets': [ 3 ],       width: '10%', 'searchable': true },
      //   { 'targets': [ 4 ],       width:  '5%', 'searchable': false }
      // ],
      'order': [[ 1, 'asc' ]],
      'buttons': buttons,
      'initComplete': function ( settings, json ) {
        //populateOption( json );
        pc295.reportProgress('#ads_table');
      }
    });

    $('.item.ads_table .column_filter').on( 'change', function ( e ) {
      var
        text = $( this ).val();
      e.preventDefault();
      filterColumn( 0, text );
      pc295.adc_element.filterColumn( 0, text );
      return false;
    });

    $('#ads_table').on( 'draw.dt', function (e) {
      e.preventDefault();
      var
        pageLength = $('#ads_table').DataTable().page.len();

      $('#ads_table_pagelength input[value=' + pageLength + ']').prop('checked',true);

      pc295.adc_element.filterColumn( 0, pc295.uuid() );

      $('#ads_table tbody tr').on('click', function (e) {
        e.preventDefault();
        var
          data, name;

        data = table.row( this ).data();

        module    = data.ads_module.module;
        tablename = data.ads_table.tablename;

        pc295.adc_element.filterColumn( 1, tablename );

        // $('.item.adc_element .heading .module').html( module );
        $('.item.adc_element .heading .table').html( pc295.renderAdsTablename( tablename, 'display'));
      });

      $('#ads_table i').click( function (e) {
        e.preventDefault();
        var url = $( this ).data('url');
        if ('' !== url) {
          pc295.PdfDialog( url );
        }
      });
      // console.log('ON draw table #ads_table');
    });

    $('#ads_table_pagelength input[name="ads_table"]').change( function (e) {
      e.preventDefault();
      var length = $('#ads_table_pagelength input[name="ads_table"]:checked').val();
      $('#ads_table')
        .DataTable()
        .page.len( length )
        .draw();
    });

    $('#ads_table_toggle a.toggle-vis').on( 'click', function (e) {
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

    table.column( 3 ).visible( false );

    var toggle = $('#ads_table_toggle a.toggle-vis');
    $(toggle[ 3 ]).css('color', '#aaa');
  };
  return {
    initModule: initModule,
    filterColumn: filterColumn
  };
}(jQuery));