/*
 * Editor client script for DB table adc_intrface_ref
 */
/*global $, pc295 */
pc295.adc_intrface_ref = ( function($) {
  var
    table_id = 'adc_intrface_ref',
    url = 'php/' + table_id + '.php',
    table,
    editor,  // use a global for the submit and return data rendering
    filterColumn,
    col = {
      // 0 Module, 1 Tablegroup, 2 Table, 3 Group, 4 No, 5 Name, 6 ID, 7 Refelement, 8 Reftable
      Module: 0,
      Tablegroup: 1,
      Table: 2,
      Group: 3,
      No: 4,
      Name: 5,
      ID: 6,
      Refelement: 7,
      Reftable: 8
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

    // pc295.populateModuleSelect( table_id );
    // pc295.populateTableGroupSelect( table_id );
    // pc295.populateTableSelect( table_id );

    /* adc_intrface_ref */
    editor = new $.fn.dataTable.Editor({
      'ajax': url,
      'table': '#' + table_id,
      'fields': [
        // module,table_group,table,no,name,i,ref_element,ref_table
        { 'label': 'Module', 'name': table_id + '.module' },
        { 'label': 'Table Group', 'name': table_id + '.table_group' },
        { 'label': 'Table', 'name': table_id + '.table' },
        { 'label': 'Group', 'name': table_id + '.group' },
        { 'label': 'No', 'name': table_id + '.No' },
        { 'label': 'Name', 'name': table_id + '.name' },
        { 'label': 'ID', 'name': table_id + '.i' },
        { 'label': 'Ref Element', 'name': table_id + '.ref_element' },
        { 'label': 'Ref Table', 'name': table_id + '.ref_table' }
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
            json.data[ key ].adc_intrface_ref.userid = userid;
            json.data[ key ].adc_intrface_ref.at = at;
          });
        }
      })
      .on( 'postEdit postCreate postRemove', function ( event, json, data ) {
        $( '#' + table_id ).dataTable().api().ajax.reload();
        $( '#' + table_id ).dataTable().api().draw();
      });

    var
      buttons,
      guestButtons = [
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
            { 'extend': 'pdf', 'exportOptions': { 'columns': ':visible' }},
            { 'extend': 'print', 'exportOptions': { 'columns': ':visible' }}
          ]
        }
      ],
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
        // module,table_group,table,group,no,name,i,ref_element,ref_table
        // 0 Module, 1 Tablegroup, 2 Table, 3 Group, 4 No, 5 Name, 6 ID, 7 Refelement, 8 Reftable, 9 Ctrl
        { 'data': table_id + '.module', 'className': 'module' }, // 0
        { 'data': table_id + '.table_group', 'className': 'table_group' }, // 1
        { 'data': table_id + '.table', 'className': 'table' }, // 2
        { 'data': table_id + '.group', 'className': 'group' }, // 3
        { 'data': table_id + '.no', 'className': 'no number', // 4
          'render': function ( data, type, row ) {
            if (isFinite( data )) {
              return +data;
            }
            return data;
          }
        },
        { 'data': table_id + '.name','className': 'name' }, // 5
        { 'data': table_id + '.i', 'className': 'id' }, // 6
        { 'data': table_id + '.ref_element', 'className': 'ref_element' }, // 7
        { 'data': table_id + '.ref_table', 'className': 'ref_table' }, // 8
        { 'data': null, 'className': 'editor-control', // 9
          'defaultContent': '<span style="display:block; text-align: center;">' +
              '<i class="editor_edit fa fa-edit" aria-hidden="true"></i>&nbsp;' +
              '<i class="editor_remove fa fa-trash" aria-hidden="true"></i>' +
            '</span>'
        }
      ],
      'columnDefs': [
        // module,table_group,table,group,no,name,a,d,n,f,clause,mco
        // 0 Module, 1 Tablegroup, 2 Table, 3 Group, 4 No, 5 Name, 6 ID, 7 Refelement, 8 Reftable, 9 Ctrl
        { 'targets': [
          col.Module, col.Tablegroup, col.Table, col.Name, col.Refelement, col.Reftable
        ], 'searchable': true },
        { 'targets': [ col.No, col.ID ],'searchable': false }
      ],
      'order': [[ col.Module, 'asc' ], [ col.Tablegroup, 'asc'], [ col.No, 'asc']],
      'drawCallback': function ( settings ) {
        var api = this.api();
        var rows = api.rows( { page: 'current' } ).nodes();
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
        // console.log( 'ON draw table #adc_intrface_ref' );
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
      pc295.toggleColumn( table_id, clmn, visible );
    });

    pc295.showColumn( table_id, col.Module, false );
    pc295.showColumn( table_id, col.Group, false );
    pc295.showColumn( table_id, col.No, false );
  };

  return {
    'initModule': initModule,
    'filterColumn': filterColumn,
    'col': col
  };
}(jQuery));
// adc_intrface_ref.js