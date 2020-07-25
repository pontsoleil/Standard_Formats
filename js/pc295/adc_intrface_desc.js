/*
 * Editor client script for DB table adc_intrface_desc
 */
/*global $, pc295 */
pc295.adc_intrface_desc = ( function($) {
  var
    table_id = 'adc_intrface_desc',
    url = 'php/' + table_id + '.php',
    table,
    editor,
    // use a global for the submit and return data rendering
    filterColumn,
    col = {
      // 0 Module, 1 Tablegroup, 2 table, 3 Group, 4 No, 5 Name, 6 Desc, 7 Common, 8 Ctrl
      Module: 0,
      Tablegroup: 1,
      Table: 2,
      Group: 3,
      No: 4,
      Name: 5,
      Desc: 6,
      Common: 7,
      Ctrl: 8
    },
    initModule;

  filterColumn = function ( i, text ) {
    if (! table ) { return; }
    // cf. Search API https://datatables.net/examples/api/regex.html
    if ( '' !== text) {
      if (col.Module === i ) {
        table
          .column( col.Module ).search( text ? '^' + text + '$' : '', true, false )
          .column( col.Tablegroup ).search( '', true, false )
          .column( col.Table ).search( '', true, false )
          .draw();
        } else if (col.Tablegroup === i) {
          table
            .column( col.Module ).search( '', true, false )
            .column( col.Tablegroup ).search( text ? '^' + text + '$' : '', true, false )
            .column( col.Table ).search( '', true, false )
            .draw();  
      } else if (col.Table === i) {
        table
          .column( col.Module ).search( '', true, false )
          .column( col.Tablegroup ).search( '', true, false )
          .column( col.Table ).search( text ? '^' + text + '$' : '', true, false )
          .draw();
      }
    }
    else {
      table
        .column( col.Module ).search( '', true, false )
        .column( col.Tablegroup ).search( '', true, false )
        .column( col.Table ).search( '', true, false )
        .draw();
    }
  };

  initModule = function() {

    /* adc_intrface_desc */
    editor = new $.fn.dataTable.Editor({
      'ajax': url,
      'table': '#' + table_id,
      'fields': [
        // 0 Module, 1 Tablegroup, 2 table, 3 No, 4 Name, 5 Desc, 6 Common
        { 'label': 'Module', 'name': table_id + '.module' },
        { 'label': 'Table Group', 'name': table_id + '.table_group' },
        { 'label': 'Table', 'name': table_id + '.table' },
        { 'label': 'Group', 'name': table_id + '.group' },
        { 'label': 'No', 'name': table_id + '.no' },
        { 'label': 'Name', 'name': table_id + '.name' },
        { 'label': 'Desc', 'name': table_id + '.desc', 'type': 'textarea' },
        { 'label': 'Common', 'name': table_id + '.common' }
      ]
    });

    editor
      .on( 'preSubmit', function ( event, json, _data ) {
        var
          userid = pc295.Global.USERID,
          at = (new Date()).toISOString(),
          data = json.data;
        if ( data ){
          Object.keys( data ).forEach( function ( key ) {
            json.data[ key ].adc_intrface_desc.userid = userid;
            json.data[ key ].adc_intrface_desc.at = at;
          });
        }
      })
      .on( 'postEdit postCreate postRemove', function ( event, json, data ) {
        $( '#' + table_id ).dataTable().api().ajax.reload();
        $( '#' + table_id ).dataTable().api().draw();
      });

    var
      buttons,
      normalButtons = [
        { 'extend': 'create', 'editor': editor, 'className': 'create' },
        { 'extend': 'edit', 'editor': editor, 'className': 'edit' },
        { 'extend': 'remove', 'editor': editor, 'className': 'remove' },
        { 'text': 'Reload',
          'className': 'reload',
          'action': function ( event, dt, node, config ) {
            dt.ajax.reload();
          }
        },
        { 'extend': 'collection', 'text': 'Export', 'className': 'export',
          'buttons': [
          { 'extend': 'copy', 'exportOptions': { 'columns': ':visible' }},
          { 'extend': 'excel', 'exportOptions': { 'columns': ':visible' }},
          { 'extend': 'csvHtml5', 'text': 'TSV', 'elementSeparator': '\t', 'extension': '.tsv' },
          { 'extend': 'pdf', 'exportOptions': { 'columns': ':visible' }},
          { 'extend': 'print', 'exportOptions': { 'columns': ':visible' }}
        ]}
      ],
      guestButtons = [
        { 'extend': 'create', 'editor': editor, 'className': 'create' },
        { 'extend': 'edit', 'editor': editor, 'className': 'edit' },
        { 'extend': 'remove', 'editor': editor, 'className': 'remove' },
        { 'text': 'Reload',
          'className': 'reload',
          'action': function ( event, dt, node, config ) {
            dt.ajax.reload();
          }
        },
        { 'extend': 'collection', 'text': 'Export', 'className': 'export',
          'buttons': [
          { 'extend': 'copy', 'exportOptions': { 'columns': ':visible' }},
          { 'extend': 'excel', 'exportOptions': { 'columns': ':visible' }},
          { 'extend': 'csvHtml5', 'text': 'TSV', 'elementSeparator': '\t', 'extension': '.tsv' },
          { 'extend': 'pdf', 'exportOptions': { 'columns': ':visible' }},
          { 'extend': 'print', 'exportOptions': { 'columns': ':visible' }}
        ]}
      ];
    if ( 'guest' === pc295.Global.USER_ROLE) {
      buttons = guestButtons;
    } else {
      buttons = normalButtons;
    }

    table = $( '#' + table_id ).DataTable({
      'dom': 'BHlftipr',
      'ajax': {
        'url': url,
        'type': 'POST'
      },
      'pageLength': 25,
      'select': true,
      'scrollX': true,
      'columns': [
        // 0 Module, 1 Tablegroup, 2 table, 3 No, 4 Name, 5 Desc, 6 Common
        { 'data': table_id + '.module', 'className': 'module'}, // 0
        { 'data': table_id + '.table_group', 'className': 'table_group' }, // 1
        { 'data': table_id + '.table', 'className': 'table' }, // 2
        { 'data': table_id + '.group', 'className': 'group' }, // 3
        { 'data': table_id + '.no', 'className': 'no number', // 4
          'render': function ( data, type, row ) {
            if (isFinite(data)) {
              return +data;
            }
            return data;
          }
        }, // 4
        { 'data': table_id + '.name', 'className': 'name' }, // 5
        { 'data': table_id + '.desc', 'className': 'desc' }, // 6
        { 'data': table_id + '.common', 'className': 'common' }, // 7
        { 'data': null, 'className': 'editor-control', // 8
          'defaultContent': '<span style="display:block; text-align: center;">' +
              '<i class="editor_edit fa fa-edit" aria-hidden="true"></i>&nbsp;' +
              '<i class="editor_remove fa fa-trash" aria-hidden="true"></i>' +
            '</span>'
        }
      ],
      'columnDefs': [
        // 0 Module, 1 Tablegroup, 2 table, 3 Group, 4 No, 5 Name, 6 Desc, 7 Common, 8 Ctrl
        { 'targets': [ col.Module, col.Tablegroup, col.Table, col.Name ],
          'width': '10%', 'searchable': true },
        { 'targets': [ col.No, col.Ctrl ], 'width': '5%', 'searchable': false },
        { 'targets': [ col.Desc ], 'width': '40%', 'searchable': true },
        { 'targets': [ col.Common ], 'width': '10%', 'searchable': true }
      ],
      'order': [
        [ col.Module, 'asc' ], [ col.Tablegroup, 'asc'], [ col.No, 'asc']
      ],
      'drawCallback': function ( settings ) {
        var api = this.api();
        var rows = api.rows({ page: 'current' }).nodes();
        var cols = $( '#' + table_id + ' thead th' ).length;
        var last = null;
        api.column(col.Group, { page: 'current' } ).data().each( function ( group, i ) {
          if ( last !== group ) {
            $(rows).eq( i ).before(
              '<tr class="group"><td colspan="' + cols + '">' + group + '</td></tr>'
            );
            last = group;
          }
        });
      },
      'buttons': buttons,
      'initComplete': function ( settings, json ) {
        pc295.reportProgress( '#' + table_id );
      }
    });

    table
      .on( 'draw.dt', function ( event ) {
        event.preventDefault();
        // console.log( 'ON draw table #adc_intrface_desc' );
        var cols = $( '#' + table_id + ' thead th' ).length;
        $( '#' + table_id + ' tr.group td' ).attr( 'colspan', cols);
      })
      // Edit record
      .on( 'click', 'i.editor_edit', function ( event ) {
        event.preventDefault();
        editor.edit( $( this ).closest( 'tr' ), {
          title: 'Edit record',
          buttons: 'Update'
        });
      })
      // Delete a record
      .on( 'click', 'i.editor_remove', function ( event ) {
        event.preventDefault();
        editor.remove( $( this ).closest( 'tr' ), {
          title: 'Delete record',
          message: 'Are you sure you wish to remove this record?',
          buttons: 'Delete'
        });
      })
      .on( 'click', 'td.details-control', function ( event ) {
        // Add event listener for opening and closing details
        var
          $tr = $( this ).closest( 'tr' ),
          row = table.row( $tr ),
          $icon = $( $tr ).find( 'i.fa-envelope, i.fa-envelope-open' );
        if (0 === $icon.length) {
          return;
        }
        event.preventDefault();
        event.stopPropagation();
        if ( row.child.isShown() ) { // This row is already open - close it
          row.child.hide();
          $tr.removeClass( 'shown' );
          $icon.removeClass( 'fa-envelope-open' ).addClass( 'fa-envelope' );
        } else { // Open detail row
          var desc = row.data().adc_intrface_desc.desc;
          var
            cmon_elmt = row.data().adc_cmon_elmt,
            cmon_elmt_clause = cmon_elmt.clause,
            cmon_elmt_desc = cmon_elmt.desc;
          cmon_elmt_clause = cmon_elmt_clause ? '- ' + cmon_elmt_clause + ' -\n' : '';
          desc = desc ? desc + '\n' + cmon_elmt_clause + cmon_elmt_desc : cmon_elmt_clause + cmon_elmt_desc;
          row.child( pc295.format( table_id, desc ) ).show();
          $tr.addClass( 'shown' );
          $icon.removeClass( 'fa-envelope' ).addClass( 'fa-envelope-open' );
        }
        return false;
      })
      // Order by the grouping
      .on( 'click', 'tr.group', function () {
        var currentOrder = table.order()[ 0 ];
        if ( currentOrder[ 0 ] === col.Group && currentOrder[ 1 ] === 'asc' ) {
          table.order( [ col.Group, 'desc' ] ).draw();
        }
        else {
          table.order( [ col.Group, 'asc' ] ).draw();
        }
      });

    $( '#' + table_id + '_toggle a.toggle-vis' ).on( 'click', function ( event ) {
      event.preventDefault();
      var
        clmn = $( this ).data( 'column' ),
        column = table.column( clmn ), // Get the column API object
        visible = column.visible();
      pc295.toggleColumn(table_id, clmn, visible );
    });

    pc295.showColumn(table_id, col.Module, false );
    pc295.showColumn(table_id, col.Group, false );
    pc295.showColumn(table_id, col.No, false );
  };

  return {
    'initModule': initModule,
    'filterColumn': filterColumn,
    'col': col
  };
}(jQuery));
// adc_intrface_desc.js