/*
 * Editor client script for DB table adc_module
 */
/*global $, pc295 */
pc295.adc_module = ( function($) {
  var
    table,
    editor,  // use a global for the submit and return data rendering
    filterColumn,
    initModule;

  filterColumn = function ( i, text ) {
    // cf. Search API https://datatables.net/examples/api/regex.html
    if (! table) { return; }
    table.column( i )
      .search( text ? '^'+text+'$' : '', true, false )
      .draw();
  };

  initModule = function() {
    /* adc_module */
    editor = new $.fn.dataTable.Editor({
      'ajax': 'php/adc_module.php',
      'table': '#adc_module',
      'fields': [
        { 'label': 'Module',  'name': 'module' },
        { 'label': 'Dir',     'name': 'dir' },
        { 'label': 'File',    'name': 'file' }
      ]
    });

    editor
      .on('preSubmit', function ( e, json, _data ) {
        var
          userid = pc295.Global.USERID,
          at = (new Date()).toISOString(),
          data;
        // editor.field('adc_module.user_id').val(pc295.Global.USER_ID);
        data = json.data;
        if ( data ){
          Object.keys( data ).forEach( function ( key ) {
            json.data[ key ].userid = userid;
            json.data[ key ].at = at;
          });
        }
      })
      .on('postEdit postCreate postRemove', function ( e, json, data ) {
        $('#adc_table').dataTable().a().ajax.reload();
        $('#adc_table').dataTable().api().draw();
        $.ajax({
          url: 'php/adc_table.php',
          dataType: 'json',
          success: function ( json ) {
            pc295.adc_table.populateOption( json );
          }
        });
      });

    var buttons = [
      { 'text':   'Reload', 'className': 'reload',
          action: function ( e, dt, node, config ) {
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
        { 'text':   'Reload', 'className': 'reload',
            action: function ( e, dt, node, config ) {
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

    table = $('#adc_module').DataTable({
      'dom': 'BHlftipr',
      'ajax': {
        'url': 'php/adc_module.php'
        // 'type': 'POST',
        // 'data': function ( d ) {
        //   d.asof = pc295.Global.asof;
        // }
      },
      'pageLength': 25,
      'select': true,
      'scrollX': true,
      'columns': [
        { 'data': 'name' }, // 0
        { 'data': 'file' }, // 1
        { 'data': 'url',    // 2
          render: function ( data, type, row ) {
            var
              url = '<i class="fa fa-external-link" aria-hidden="true" data-url="http://wuwei.space/free/pdf_viewer.html?file=' +
                row.dir + row.file + '&t=' + row.module + '#page=1"></i>';
            return url;
          }
        }
      ],
      // columnDefs: [
      //   { 'targets': [ 0 ], width: '40%', 'searchable': true },
      //   { 'targets': [ 1 ], width: '55%', 'searchable': true },
      //   { 'targets': [ 2 ], width:  '5%', 'searchable': false }
      // ],
      'order': [[ 0, 'asc' ]],
      'buttons': buttons,
      'initComplete': function ( settings, json ) {
        pc295.reportProgress('#adc_module');
      }
    });

    $('#adc_module').on( 'draw.dt', function () {
      // console.log('ON draw table #adc_module');
      //pc295.adc_table.filterColumn( 0, pc295.uuid() );
      //pc295.adc_element.filter( 1, pc295.uuid() );
      $('#adc_module tbody tr').on('click', function (e) {
        var
          data, module;

        data = table.row( this ).data();

        module = data.name;

        pc295.adc_table.filterColumn( 0, name );

        $('.item.adc_table .heading .module').html( name );
        $('.item.adc_element .heading .module').html( '' );
        $('.item.adc_element .heading .table').html( '' );
      });

      $('#adc_module i').click( function () {
        var url = $( this ).data('url');
        pc295.PdfDialog( url );
      });
    });

  };

  return {
    initModule:   initModule,
    filterColumn: filterColumn
  };
}(jQuery));
// adc_module.js