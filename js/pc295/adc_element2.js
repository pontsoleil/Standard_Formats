/*
 * Editor client script for DB table adc_element
 */
/*global $, pc295 */
pc295.adc_element2 = ( function($) {
  var
    table_id = 'adc_element',
    table_id2 = 'adc_element2',
    url = 'php/' + table_id + '.php',
    table,
    editor,
    col = {
      // 0 Module, 1 Tablegroup, 2 Table, 3 Clause, 4 Group, 5 Element, 6 Abbrev, 7 Notation, 8 Format, 9 MCO,
      // 10 Reference, 11 Common, 12 Desc
      Module: 0,
      Tablegroup: 1,
      Table: 2,
      Clause: 3,
      Group: 4,
      Element: 5,
      Abbrev: 6,
      Notation: 7,
      Format: 8,
      MCO: 9,
      Reference: 10,
      Common: 11,
      Desc: 12,
    },
    // use a global for the submit and return data rendering
    filterColumn,
    appendNullOption,
    initModule;

  filterColumn = function ( i, text ) {
    if (! table) { return; }
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

  appendNullOption = function () {
    // Support null for foreign key
    editor.field( table_id + '.frmt_rprstn_ref' ).update([{ '': '' }], true );
    editor.field( table_id + '.cmon_elmt_ref' ).update([{ '': '' }], true );
    editor.field( table_id + '.element_ref' ).update([{ '': '' }], true );
  };

  initModule = function() {
    /* adc_element2 */

    var buttons = [
      { 'text': 'Reload',
        'className': 'reload',
        'action': function ( event, dt, node, config ) {
          dt.ajax.reload();
        }
      }
    ];

    table = $( '#' + table_id2 ).DataTable({
      'dom': 'BHlftipr',
      'ajax': {
        'url': url,
        'type': 'POST'
      },
      'pageLength': 25,
      'select': true,
      'scrollX': true,
      'colReorder': true,
      'createdRow': function(row, data, dataIndex) {
        $( row )
          .attr( 'draggable', 'true' )
          .attr( 'ondragstart', 'pc295.drag( event )' );
          // .attr( 'ondragover', 'pc295.dragover( event )' )
          // .attr( 'ondragleave', 'pc295.dragleave( event )' )
          // .attr( 'ondrop', 'drop( event )' );
      },
      'columns': [
        // 0 Module, 1 Tablegroup, 2 Table, 3 Clause, 4 Group, 5 Element, 6 Abbrev, 7 Notation, 8 Format, 9 MCO,
        // 10 Reference, 11 Common, 12 Desc
        { 'data': 'adc_module.name', 'className': 'module_name' }, // 0
        { 'data': 'adc_table.group', 'className': 'table_group', // 1
          'editField': 'adc_table.group' },
        { 'data': 'adc_table.name', 'className': 'table_name', // 2
          'editField': table_id + '.table_id' },
        { 'data': table_id + '.clause', 'className': 'clause', // 3
          'type': 'clause'
        },
        { 'data': table_id + '.group', 'className': 'group' }, // 4
        { 'data': table_id + '.name', 'className': 'name' }, // 5
        { 'data': table_id + '.abbrev' }, // 6
        { 'data': table_id + '.notation' }, // 7
        { 'data': 'adc_frmt_rprstn.name', 'className': 'frmt_rprstn_name', // 8
          'editField': table_id + '.frmt_rprstn_ref'
        },
        { 'data': table_id + '.mco' }, // 9
        { 'data': 'v_element.name', 'className': 'element_ref', // 10
          'editField': table_id + '.element_ref'
        },
        { 'data': 'adc_cmon_elmt.clause', 'className': 'cmon_elmt_clause', // 11
          'editField': table_id + '.cmon_elmt_ref',
          'type': 'clause'
        },
        { 'data': null, 'className': 'details-control', // 12
          'orderable': false,
          'defaultContent': '',
          'render': function ( data, type, row ) {
            if ( data.adc_element.desc || adc_cmon_elmt.clause ) {
              if ( row.shown ) {
                return '<i class="fa fa-envelope-open" aria-hidden="true" style="display:block; text-align: center;"></i>';
              }
              return '<i class="fa fa-envelope" aria-hidden="true" style="display:block; text-align: center;"></i>';
            }
            return '<i class="fa fa-times" aria-hidden="true" style="display:block; text-align: center;"></i>';
          }
        }
      ],
      'columnDefs': [
        // 0 Module, 1 Tablegroup, 2 Table, 3 Clause, 4 Group, 5 Element, 6 Abbrev, 7 Notation, 8 Format, 9 MCO,
        // 10 Reference, 11 Common, 12 Desc
        { 'targets': [
            col.Module, col.Group, col.Abbrev, col.Notation, col.Format, col.Reference, col.Common
          ],
          'visible': false }
      ],
      'order': [[ col.Clause, 'asc' ]],
      'drawCallback': function ( settings ) {
        var api = this.api();
        var rows = api.rows( { page:'current' } ).nodes();
        var last = null;
        api.column(col.Group, { page:'current' } ).data().each( function ( group, i ) {
          if ( last !== group ) {
            $(rows).eq( i ).before(
              '<tr class="group"><td colspan="11">' + group + '</td></tr>'
            );
            last = group;
          }
        });
      },
      'buttons': buttons,
      'initComplete': function ( settings, json ) {
        pc295.reportProgress( '#' + table_id2 );
      }
    });

    table
      .on( 'draw.dt', function ( event ) {
        event.preventDefault();
        // console.log( 'ON draw table #adc_element2' );
        // appendNullOption();
        var cols = $( '#' + table_id2 + ' thead th' ).length;
        $( '#' + table_id2 + ' tr.group td' ).attr( 'colspan', cols );
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
          var desc = row.data().adc_element.desc;
          var
            cmon_elmt = row.data().adc_cmon_elmt,
            cmon_elmt_clause = cmon_elmt.clause,
            cmon_elmt_desc = cmon_elmt.desc;
          cmon_elmt_clause = cmon_elmt_clause ? '- ' + cmon_elmt_clause + ' -\n' : '';
          desc = desc ? desc + '\n' + cmon_elmt_clause + cmon_elmt_desc : cmon_elmt_clause + cmon_elmt_desc;
          row.child( pc295.format( table_id2, desc ) ).show();
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

      $( '.item.' + table_id2 + ' .column_filter.module' ).on( 'change', function ( event ) {
        var text = $( this ).val();
        event.preventDefault();
        if ( '' === text) {
          table
            .search( '' )
            .columns().search( '' )
            .draw();
          pc295.showColumn( table_id2, col.Module, true);
        } else {
          filterColumn( col.Module, text );
          pc295.showColumn( table_id2, col.Module, false);
        }
        pc295.populateSelect({
          'table_id': table_id2,
          'module': text,
          'table_group': ''
        });
      });
  
      $( '.item.' + table_id2 + ' .column_filter.table_group' ).on( 'change', function ( event ) {
        var
          module = $( '.item.' + table_id2 + ' .column_filter.module' ).val(),
          text = $( this ).val();
        event.preventDefault();
        if ( '' === text) {
          table
            .search( '' )
            .columns().search( '' )
            .draw();
          pc295.showColumn( table_id2, col.Tablegroup, true);
        } else {
          filterColumn( col.Tablegroup, text );
          pc295.showColumn( table_id2, col.Tablegroup, false);
        }
        pc295.populateSelect({
          'table_id': table_id2,
          'module': module,
          'table_group': text
        });
      });
  
      $( '.item.' + table_id2 + ' .column_filter.table' ).on( 'change', function ( event ) {
        var
          module = $( '.item.' + table_id2 + ' .column_filter.module' ).val(),
          table_group = $( '.item.' + table_id2 + ' .column_filter.table_group' ).val(),
          text = $( this ).val();
        event.preventDefault();
        if ( '' === text) {
          table
            .search( '' )
            .columns().search( '' )
            .draw();
          pc295.showColumn( table_id2, col.Table, true);
        } else {
          filterColumn( col.Table, text );
          pc295.showColumn( table_id2, col.Table, false);
        }
      });

    $( '#' + table_id2 + '_toggle a.toggle-vis' ).on( 'click', function ( event ) {
      event.preventDefault();
      var
        col = $( this).data( 'column' ),
        column = table.column( col ), // Get the column API object
        visible = column.visible();
      pc295.toggleColumn( table_id2, col, visible);
    });

    pc295.showColumn( table_id2, col.Module, false);
    pc295.showColumn( table_id2, col.Table, false);
    pc295.showColumn( table_id2, col.Abbrev, false);
    $( '#' + table_id2 + '_toggle' ).find("a.toggle-vis[data-column='" + col.Group + "']").css( 'display', 'none' );
  };

  return {
    'initModule': initModule,
    'table': table,
    'editor': editor,
    'filterColumn': filterColumn,
    'col': col
  };
}(jQuery));
// adc_element2.js