/*
 * Editor client script for DB table adc_element
 */
/*global $, pc295 */
pc295.adc_element = ( function($) {
  var
    table_id = 'adc_element',
    table_id2 = 'adc_element2',
    table_cmon_elmt = 'adc_cmon_elmt',
    url = 'php/' + table_id + '.php',
    table,
    editor,
    col = {
      // 0 Module, 1 Tablegroup, 2 Table, 3 Clause, 4 Group, 5 Element, 6 Abbrev, 7 Notation, 8 Format, 9 MCO,
      // 10 Reference, 11 Common, 12 Desc, 13 Ctrl
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
      Ctrl: 13
    },
    // use a global for the submit and return data rendering
    filterColumn,
    drop,
    appendNullOption,
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
          .column( col.Element ).search( '', true, false )
          .column( col.Reference ).search( '', true, false )
          .draw();
      } else if (col.Tablegroup === i) {
        table
          .column( col.Module ).search( '', true, false )
          .column( col.Tablegroup ).search( text ? '^' + text + '$' : '', true, false )
          .column( col.Table ).search( '', true, false )
          // see https://stackoverflow.com/questions/406230/regular-expression-to-match-a-line-that-doesnt-contain-a-word
          .column( col.Element ).search( '^((?!Header ID).)*$', true, false )
          .column( col.Reference ).search( '^((?!Header ID).)*$', true, false )
          .draw();
      } else if (col.Table === i) {
        table
          .column( col.Module ).search( '', true, false )
          .column( col.Tablegroup ).search( '', true, false )
          .column( col.Table ).search( text ? '^' + text + '$' : '', true, false )
          .column( col.Element ).search( '', true, false )
          .column( col.Reference ).search( '', true, false )
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
  
  drop = function ( event ) {
    event.preventDefault();
    var
      target = event.target,
      tagName, $td, $tr, $tbody, $table,
      tableid,
      trns_id, trns_tableid, trns_name, trns_clause,
      data, element, id, name;
    $( 'tr.drag_over' ).removeClass( 'drag_over' );
    $( 'td' ).removeClass( 'target' );
    tagName = target.tagName.toLowerCase();
    if ( 'td' === tagName ) {
      $td = $(event.target);
      $tr = $td.parent();
    } else if ( 'tr' === tagName ) {
      $tr = $(event.target);
    } else {
      return;
    }
    $tbody = $tr.parent();
    $table = $tbody.parent();
    tableid = $table.prop( 'id' );
    data = event.dataTransfer.getData("text/plain");
    if ( data ) {
      element = JSON.parse( data );
      if ( element ) {
        trns_tableid = element.tableid;
        trns_id = element.id;
        trns_clause = element.clause;
        trns_name = element.name;
        if ( trns_tableid !== tableid ) {
          if ( 'adc_cmon_elmt' === trns_tableid && table_id === tableid ) {
            editor
              .edit( $tr, false )
              .val( table_id + '.cmon_elmt_ref', trns_id )
              .submit();
          } else if ( 'adc_frmt_rprstn' === trns_tableid && table_id === tableid ) {
            editor
              .edit( $tr, false )
              .val( table_id + '.frmt_rprstn_ref', trns_id )
              .submit();
          } else if ( 'adc_element2' === trns_tableid && table_id === tableid ) {
            editor
              .edit( $tr, false )
              .val( table_id + '.element_ref', trns_id )
              .submit();
          }
        }
      }
    }
  };

  appendNullOption = function () {
    editor.field( table_id + '.frmt_rprstn_ref' ).update([{ '': '' }], true );
    editor.field( table_id + '.cmon_elmt_ref' ).update([{ '': '' }], true );
    editor.field( table_id + '.element_ref' ).update([{ '': '' }], true );
  };

  initModule = function() {
    /* adc_element */
    editor = new $.fn.dataTable.Editor({
      'ajax': url,
      'table': '#' + table_id,
      'fields': [
        { 'label': 'Group', 'name': table_id + '.group' },
        { 'label': 'Clause', 'name': table_id + '.clause' },
        { 'label': 'Name', 'name': table_id + '.name' },
        { 'label': 'Abbreviation', 'name': table_id + '.abbrev' },
        { 'label': 'Notation', 'name': table_id + '.notation' },
        { 'label': 'Format Representation', 'name': table_id + '.frmt_rprstn_ref',
          'type': 'select'
        },
        { 'label': 'Referenced element', 'name': table_id + '.element_ref',
          'type': 'select'
        },
        { 'label': 'Common element', 'name': table_id + '.cmon_elmt_ref',
          'type': 'select'
        },
        { 'label': 'M/O/C', 'name': table_id + '.mco',
          'type': 'select',
          'options': [
            { 'label': '', 'value': '' },
            { 'label': '(M) Mandatory', 'value': 'M' },
            { 'label': '(C) Conditional', 'value': 'C' },
            { 'label': '(O) Optional', 'value': 'O' }
          ],
          'def' : ''
        },
        { 'label': 'Description','name': table_id + '.desc', 'type': 'textarea' }
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
            json.data[ key ].adc_element.userid = userid;
            json.data[ key ].adc_element.at = at;
          });
        }
      })
      .on( 'postEdit postCreate postRemove', function ( event, json, data ) {
        var table = $( '#' + table_id ).dataTable().api();
        table.ajax.reload();
        table.draw();
        appendNullOption();
      });

    editor.dependent( table_id + '.group', function () { // hide reference fields
      return { hide: [
        table_id + '.frmt_rprstn_ref',
        table_id + '.element_ref',
        table_id + '.cmon_elmt_ref'
      ]};
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
          'action': function ( e, dt, node, config ) {
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
      'createdRow': function(row, data, dataIndex) {
        $( row )
          .attr( 'draggable', 'true' )
          // .attr( 'ondragstart', 'pc295.drag( event )' )
          .attr( 'ondragover', 'pc295.dragover( event )' )
          .attr( 'ondragleave', 'pc295.dragleave( event )' )
          .attr( 'ondrop', 'pc295.adc_element.drop( event )' );
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
          'type': 'clause' }, // for sort type defined in main.js
        { 'data': table_id + '.group', 'className': 'group' }, // 4
        { 'data': table_id + '.name', 'className': 'name' }, // 5
        { 'data': table_id + '.abbrev', 'className': 'abbrev' }, // 6
        { 'data': table_id + '.notation','className': 'notation' }, // 7
        { 'data': 'adc_frmt_rprstn.name', 'className': 'frmt_rprstn_name', // 8
          'editField': table_id + '.frmt_rprstn_ref' },
        { 'data': table_id + '.mco', 'className': 'mco' }, // 9
        { 'data': 'v_element.name', 'className': 'element_ref', // 10
          'editField': table_id + '.element_ref' },
        { 'data': 'adc_cmon_elmt.clause', 'className': 'cmon_elmt_clause', // 11
          'editField': table_id + '.cmon_elmt_ref',
          'type': 'clause' },
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
        },
        { 'data': null, 'className': 'editor-control', // 13
          'defaultContent': '<span style="display:block; text-align: center;">' +
              '<i class="editor_edit fa fa-edit" aria-hidden="true"></i>&nbsp;' +
              '<i class="editor_remove fa fa-trash" aria-hidden="true"></i>' +
            '</span>'
        }
      ],
      'columnDefs': [
        // 0 Module, 1 Tablegroup, 2 Table, 3 Clause, 4 Group, 5 Element, 6 Abbrev, 7 Notation, 8 Format, 9 MCO,
        // 10 Reference, 11 Common, 12 Desc, 13 Ctrl
        { 'visible': false, 'targets': col.Group },
        { 'targets': [ col.Desc, col.Ctrl ], width: '5%', 'searchable': false }
      ],
      'order': [[ col.Clause, 'asc' ]],
      'drawCallback': function ( settings ) {
        var api = this.api();
        var rows = api.rows( { page:'current' } ).nodes();
        var cols = $( '#' + table_id + ' thead th' ).length;
        var last = null;
        api.column(col.Group, { page:'current' } ).data().each( function ( group, i ) {
          if ( last !== group ) {
            $( rows ).eq( i ).before(
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

    // Activate the bubble editor on click of a table cell
    // 0 Module, 1 Tablegroup, 2 Table, 3 Clause, 4 Group, 5 Element, 6 Abbrev, 7 Notation, 8 Format, 9 MCO,
    // 10 Reference, 11 Common, 12 Desc
    table
      .on( 'draw.dt', function ( event ) {
        event.preventDefault();
        // console.log( 'ON draw table #' + table_id );
        appendNullOption();
        var cols = $( '#' + table_id + ' thead th' ).length;
        $( '#' + table_id + ' tr.group td' ).attr( 'colspan', cols);
      })
      .on( 'click', 'i.url', function ( event ) {
        event.preventDefault();
        event.stopPropagation();
        var
          url = $( this ).data( 'url' );
        if ( '' !== url) {
          pc295.PdfDialog( url );
        }
      })
      // Edit record
      .on( 'click', 'i.editor_edit', function ( event ) {
        event.preventDefault();
        event.stopPropagation();
        editor.edit( $( this ).closest( 'tr' ), {
            title: 'Edit record',
            buttons: 'Update'
        });
      })
      // Delete a record
      .on( 'click', 'i.editor_remove', function ( event ) {
        event.preventDefault();
        event.stopPropagation();
        editor.remove( $( this ).closest( 'tr' ), {
          title: 'Delete record',
          message: 'Are you sure you wish to remove this record?',
          buttons: 'Delete'
        });
      })
      // Add event listener for show referenced
      .on( 'click', 'td.element_ref', function ( event ) {
        event.preventDefault();
        event.stopPropagation();
        var
          $tr = $( this ).closest( 'tr' ),
          row = table.row( $tr ),
          data = row.data(),
          moduleName = data.v_module.name,
          tableGroup = data.v_table.group,
          tableName = data.v_table.name,
          colClause = pc295[ table_id2 ].col.Clause;
        if ( !$tr.hasClass( 'selected' ) ) {
          $( '#' + table_id + ' tbody tr' ).removeClass( 'selected' );
          $tr.addClass( 'selected' );
        } else {
          $tr.removeClass( 'selected' );
        }
        if ( moduleName ) {
          // set moduleName
          $( '.item.' + table_id2 + ' select.column_filter.module' ).val(moduleName );
          pc295[ table_id2 ].filterColumn( col.Module, moduleName );
          pc295.showColumn( table_id2, col.Module, false );
          pc295.populateSelect({
            'table_id': table_id2,
            'module': moduleName,
            'table_group': ''
          });
          if ( tableGroup) {
            setTimeout(function () {
              // set tableGroup
              $( '.item.' + table_id2 + ' select.column_filter.table_group' ).val( tableGroup);
              pc295[ table_id2 ].filterColumn( col.Tablegroup, tableGroup );
              pc295.showColumn( table_id2, col.Tablegroup, false );
              pc295.populateSelect({
                'table_id': table_id2,
                'module': moduleName,
                'table_group': tableGroup
              });
              if ( tableName ) {
                setTimeout(function () {
                  if ($( '.item.' + table_id2 + ' select.column_filter.table' ).find( 'option' ).length > 0) {
                    $( '.item.' + table_id2 + ' select.column_filter.table' ).show();
                  }
                  $( '.item.' + table_id2 + ' select.column_filter.table' ).val( tableName );
                  pc295[ table_id2 ].filterColumn( col.Table, tableName );
                  pc295.showColumn( table_id2, col.Table, false );
                  $( '#' + table_id2 ).DataTable().order( [ colClause, 'asc' ] ).draw();
                }, 500);
              }
              $( '#' + table_id2 ).DataTable().order( [ colClause, 'asc' ] ).draw();
            }, 500);
            $( '#' + table_id2 ).DataTable().order( [ colClause, 'asc' ] ).draw();
          }
        }
      })
      // Add event listener for show common
      .on( 'click', 'td.cmon_elmt_clause', function ( event ) {
        event.preventDefault();
        event.stopPropagation();
        var
          $tr = $( this ).closest( 'tr' ),
          row = table.row( $tr ),
          data = row.data();
          common = data.adc_common.name;
          colCommon = pc295.adc_cmon_elmt.col.Common;
        if ( !$tr.hasClass( 'selected' ) ) {
          $( '#' + table_id + ' tbody tr' ).removeClass( 'selected' );
          $tr.addClass( 'selected' );
        } else {
          $tr.removeClass( 'selected' );
        }
        if ( common ) {
          // set moduleName
          $( '.item.adc_cmon_elmt select.column_filter.common' ).val( common );
          pc295.adc_cmon_elmt.filterColumn( colCommon, common );
          pc295.showColumn( table_cmon_elmt, colCommon, false );
        }
      })
      // Add event listener for opening and closing details
      .on( 'click', 'td.details-control', function ( event ) {
        event.preventDefault();
        event.stopPropagation();
        var
          $tr = $( this ).closest( 'tr' ),
          row = table.row( $tr ),
          data = row.data();

        if ( !$tr.hasClass( 'selected' ) ) {
          $( '#' + table_id + ' tbody tr' ).removeClass( 'selected' );
          $tr.addClass( 'selected' );
        } else {
          $tr.removeClass( 'selected' );
        }

        var $icon = $( $tr ).find( 'i.fa-envelope, i.fa-envelope-open' );
        if (0 === $icon.length) {
          return;
        }

        if ( row.child.isShown() ) { // This row is already open - close it
          row.child.hide();
          $tr.removeClass( 'shown' );
          $icon.removeClass( 'fa-envelope-open' ).addClass( 'fa-envelope' );
        } else { // Open detail row
          var desc = data.adc_element.desc;
          var cmon_elmt = data.adc_cmon_elmt;
          var cmon_elmt_clause, cmon_elmt_desc, cmon_desc;
          if (cmon_elmt) {
            cmon_elmt_clause = cmon_elmt.clause;
            cmon_elmt_desc = cmon_elmt.desc;
            cmon_desc =
              (cmon_elmt_clause ? '- ' + cmon_elmt_clause + ' -\n' : '' ) +
              (cmon_elmt_desc ? cmon_elmt_desc : '' );
          } else {
            cmon_desc = '';
          }
          desc = desc ? desc + '\n' + cmon_desc : cmon_desc;
          row.child( pc295.format( table_id, desc ) ).show();
          $tr.addClass( 'shown' );
          $icon.removeClass( 'fa-envelope' ).addClass( 'fa-envelope-open' );
        }
        return false;
      })
      .on( 'click', 'tr.group', function () {
        event.preventDefault();
        // Order by the grouping
        var currentOrder = table.order()[ 0 ];
        if ( currentOrder[ 0 ] === col.Group && currentOrder[ 1 ] === 'asc' ) {
          table.order( [ col.Group, 'desc' ] ).draw();
        }
        else {
          table.order( [ col.Group, 'asc' ] ).draw();
        }
      })
      .on( 'click', 'tr:not(.group)', function () {
        event.preventDefault();
        var $tr = $( this ).closest( 'tr' );
        if ( $tr.hasClass( 'selected' ) ) {
          $tr.removeClass( 'selected' );
        }
      });

    $( '#' + table_id + '_toggle a.toggle-vis' ).on( 'click', function ( event ) {
      event.preventDefault();
      var
        col = $( this ).data( 'column' ),
        column = table.column( col ), // Get the column API object
        visible = column.visible();
      pc295.toggleColumn( table_id, col, visible );
    });

    pc295.showColumn( table_id, col.Module, false );
    pc295.showColumn( table_id, col.Table, false );
    pc295.showColumn( table_id, col.Abbrev, false );

    $( '#' + table_id + '_toggle' )
      .find("a.toggle-vis[data-column='" + col.Group + "']")
      .css( 'display', 'none' );
  };

  return {
    'initModule': initModule,
    'table': table,
    'editor': editor,
    'filterColumn': filterColumn,
    'drop': drop,
    'appendNullOption': appendNullOption,
    'col': col
  };
}(jQuery));
// adc_element.js