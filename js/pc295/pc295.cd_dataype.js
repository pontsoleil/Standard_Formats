/*
 * Editor client script for DB Table cd_datatype
 */
/*global $, pc295 */
pc295.cd_datatype = ( function($) {
  var
    table,
    editor,  // use a global for the submit and return data rendering
    filterColumn,
    initModule;

  filterColumn = function ( i, text ) {
    if (! table) { return; }
    // cf. Search API https://datatables.net/examples/api/regex.html
    table.column( i )
      .search( text ? '^'+text+'$' : '', true, false )
      .draw();
  };

  initModule = function() {
    /* cd_datatype */
    editor = new $.fn.dataTable.Editor({
      ajax: 'php/pc295.cd_datatype.php',
      table: '#cd_datatype',
      fields: [
        { label: 'Datatype',       name: 'cd_datatype.name' },
        { label: 'Description',    name: 'cd_datatype.description',type: 'textarea' },
        { label: 'Comment',        name: 'cd_datatype.comment',    type: 'textarea' }
      ]
    });

    editor.on('preSubmit', function ( e, json, _data ) {
      var
        user_id = pc295.Global.USER_ID,
        at = (new Date()).toISOString(),
        data;
      data = json.data;
      if ( data ){
        Object.keys( data ).forEach( function ( key ) {
          json.data[ key ].cd_datatype.user_id = user_id;
          json.data[ key ].cd_datatype.at      = at;
        });
      }
    });

    var buttons = [
      { text: 'Reload', className: 'reload',
          action: function ( e, dt, node, config ) {
            dt.ajax.reload();
          }
      }
    ];

    if ('guest' !== pc295.Global.USER_ROLE) {
      buttons = [
        { extend: 'create', editor: editor, className: 'create' },
        { extend: 'edit',   editor: editor, className: 'edit' },
        { extend: 'remove', editor: editor, className: 'remove' },
        { text:   'Reload', className: 'reload',
          action: function ( e, dt, node, config ) {
            dt.ajax.reload();
          }
        }
      ];
    }

    table = $('#cd_datatype').DataTable({
      'dom': 'Bfrtip',
      'ajax': {
        'url': 'php/pc295.cd_datatype.php',
        'type': 'POST',
        'data': function ( d ) {
          d.asof = pc295.Global.asof;
        }
      },
      'pageLength': 20,
      'select': true,
      'scrollX': true,
      'columns': [
        { 'data': null,                        // 0
          // 'defaultContent': '<i class="fa fa-check-square-o" aria-hidden="true"></i>',
          'defaultContent': '',
          'className': 'select-checkbox',
          'orderable': false
        },
        { 'data': 'cd_datatype.name' },    // 1
        { 'data': 'cd_datatype.description' }  // 2
        // { data: 'cd_datatype.at' },         // 3
        // { data: 'userlist.name' },           // 4
        // { data: 'cd_datatype.comment' }     // 5
      ],
      'columnDefs': [
        { 'targets': [ 0 ],
          'width': '10%', 'searchable': false },
        { 'targets': [ 1, 2 ],
          'width': '30%', 'searchable': true }
      ],
      'order': [[ 1, 'asc' ]],
      'buttons': buttons,
      'initComplete': function ( settings, json ) {
        pc295.reportProgress('#cd_datatype');
      }
    });

    //$('#cd_datatype')
    table
      .on( 'click', 'tbody td:not(:first-child)', function (e) {
        if ('guest' === pc295.Global.USER_ROLE) {
          return;
        }
        editor.inline( this,  {
          onBlur: 'submit'
        });
        // cf. https://editor.datatables.net/reference/type/form-options
      })
      .on( 'draw.dt', function (e) {
        e.preventDefault();
        var
          pageLength = $('#cd_datatype').DataTable().page.len();

        $('#cd_datatype_pagelength input[value=' + pageLength + ']').prop('checked',true);

        // console.log('ON draw table #cd_datatype');
      });

    $('#cd_datatype tbody').on( 'click', 'tr', function () {
      if ( $(this).hasClass('selected') ) {
        $(this).removeClass('selected');
      }
      else {
        table.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
      }
    });

    $('#cd_datatype_pagelength input[name="cd_datatype"]').change( function (e) {
      e.preventDefault();
      var length = $('#cd_datatype_pagelength input[name="cd_datatype"]:checked').val();
      $('#cd_datatype')
        .DataTable()
        .page.len( length )
        .draw();
    });

    $('#cd_datatype_toggle a.toggle-vis').on( 'click', function (e) {
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

    // table.column( 3 ).visible( false );
    var toggle = $('#cd_datatype_toggle a.toggle-vis');
//    $(toggle[ 3 ]).css('color', '#aaa');

    if ('guest' === pc295.Global.USER_ROLE) {
      table.column( 0 ).visible( false );
    }
  };

  return {
    initModule:   initModule,
    filterColumn: filterColumn
  };
}(jQuery));