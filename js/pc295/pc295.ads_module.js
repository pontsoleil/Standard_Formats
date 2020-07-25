/*
 * Editor client script for DB table ads_module
 */
/*global $, pc295 */
pc295.ads_module = ( function($) {
  var
    table,
    editor,  // use a global for the submit and return data rendering
    filterColumn,
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

  initModule = function() {
    /* ads_module */
    editor = new $.fn.dataTable.Editor({
      ajax: 'php/pc295.ads_module.php',
      table: '#ads_module',
      fields: [
        { label: 'Module',  name: 'module' },
        { label: 'Dir',     name: 'dir' },
        { label: 'File',    name: 'file' },
        { label: 'Version', name: 'version' }
      ]
    });

    editor.on('preSubmit', function ( e, json, _data ) {
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
      $('#ads_table').dataTable().api().ajax.reload();
      $('#ads_table').dataTable().api().draw();
      $.ajax({
        url  : 'php/pc295.ads_table.php',
        dataType: 'json',
        success: function ( json ) {
          pc295.ads_table.populateOption( json );
        }
      });
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
          //,          'colvis'
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
            { extend: 'print', exportOptions: { columns: ':visible' }},
            'colvis'
          ]
        }
      ];
    }

    table = $('#ads_module').DataTable({
      dom: 'Bfrtip',
      ajax: {
        url: 'php/pc295.ads_module.php',
        type: 'POST'
      },
      select: true,
      pageLength: 10,
      columns: [
        { data: 'module' }, // 0
        { data: 'file' },   // 1
        { data: 'url',      // 2
          render: function ( data, type, row ) {
            var
              url = '<i class="fa fa-external-link" aria-hidden="true" data-url="http://wuwei.space/free/pdf_viewer.html?file=' +
                row.dir + row.file + '&t=' + row.module + '#page=1"></i>';
            return url;
          }
        },
        { data: 'version' } // 3
      ],
      columnDefs: [
        { 'targets': [ 0 ], width: '30%', 'searchable': true },
        { 'targets': [ 1 ], width: '55%', 'searchable': true },
        { 'targets': [ 2 ], width:  '5%', 'searchable': false },
        { 'targets': [ 3 ], width: '10%', 'searchable': false }
      ],
      order: [[ 0, 'asc' ]],
      buttons: buttons,
      initComplete: function ( settings, json ) {
        pc295.reportProgress('#ads_module');
      }
    });

    $('#ads_module').on( 'draw.dt', function () {
      pc295.ads_table.filterColumn( 0, pc295.uuid() );
      pc295.ads_field.filterColumn( 0, pc295.uuid() );
      $('#ads_module tbody tr').on('click', function (e) {
        var
          data, module;

        data = table.row( this ).data();

        module = data.module;

        pc295.ads_table.filterColumn( 0, module );

        $('.item.ads_table .heading .module').html(pc295.renderAdsModulename( module, 'display' ));
        $('.item.ads_field .heading .module').html( '' );
        $('.item.ads_field .heading .table').html( '' );
      });

      $('#ads_module i').click( function () {
        var url = $( this ).data('url');
        pc295.PdfDialog( url );
      });

      // console.log('ON draw table #ads_module');
    });

  };

  return {
    initModule: initModule,
    filterColumn: filterColumn
  };
}(jQuery));