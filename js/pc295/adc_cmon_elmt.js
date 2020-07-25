/*
 * Editor client script for DB Table adc_cmon_elmt
 */
/*global $, pc295 */
pc295.adc_cmon_elmt = ( function($) {
  var
    table_id = 'adc_cmon_elmt',
    url = 'php/' + table_id + '.php',
    table,
    editor,
    col = {
      // 0 Clause, 1 Group, 2 Common, 3 Element, 4 Abbrev, 5 Notation, 6 Format, 7 MCO, 8 Desc
      Clause: 0,
      Group: 1,
      Common: 2,
      Element: 3,
      Abbrev: 4,
      Notation: 5,
      Format: 6,
      MCO: 7,
      Desc: 8,
      Cmd: 9
    },
    // use a global for the submit and return data rendering
    filterColumn,
    drop,
    appendNullOption,
    initModule;

  filterColumn = function ( i, text ) {
    if (! table ) { return; }
    // cf. Search API https://datatables.net/examples/api/regex.html
    table.column( i )
      .search( text ? '^'+text+'$' : '', true, false )
      .draw();
  };

  drop = function ( event ) {
    event.preventDefault();
    var
      target = event.target,
      tagName, $td, $tr, $tbody, $table,
      tableid,
      trns_id, trns_tableid, // trns_name, trns_clause,
      data, cmon_elmt; //, id, name;
    $( 'tr.drag_over' ).removeClass( 'drag_over' );
    $( '#' + table_id + ' td' ).removeClass( 'target' );
    tagName = target.tagName.toLowerCase();
    if ( 'td' === tagName ) {
      $td = $( event.target );
      $tr = $td.parent();
    } else if ( 'tr' === tagName ) {
      $tr = $( event.target );
    } else {
      return;
    }
    $tbody = $tr.parent();
    $table = $tbody.parent();
    tableid = $table.prop( 'id' );
    data = event.dataTransfer.getData("text/plain");
    if (data) {
      cmon_elmt = JSON.parse( data );
      if (cmon_elmt ) {
        trns_tableid = cmon_elmt.tableid;
        trns_id = cmon_elmt.id;
        // trns_clause = cmon_elmt.clause;
        // trns_name = cmon_elmt.name;
        if ( trns_tableid !== tableid ) {
          if ( 'adc_frmt_rprstn' === trns_tableid && table_id === tableid ) {
            editor
              .edit( $tr, false )
              .val( table_id + '.frmt_rprstn_ref', trns_id )
              .submit();
          }
        }
      }
    }
  };

  appendNullOption = function () {
    // Supprt null for foreign key
    editor.field( table_id + '.frmt_rprstn_ref' ).update([{ '': '' }], true );
  };

  initModule = function() {
    /* adc_cmon_elmt */
    editor = new $.fn.dataTable.Editor({
      'ajax': url,
      'table': '#' + table_id,
      'fields': [
        { 'label': 'Clause', 'name': table_id + '.clause' },
        { 'label': 'Group', 'name': table_id + '.group' },
        { 'label': 'Common', 'name': table_id + '.common_id',
          'type': 'select'
        },
        { 'label': 'Name', 'name': table_id + '.name' },
        { 'label': 'Abbreviation', 'name': table_id + '.abbrev' },
        { 'label': 'Notation', 'name': table_id + '.notation' },
        { 'label': 'Format Representation', 'name': table_id + '.frmt_rprstn_ref',
          'type': 'select'
        },
        { 'label': 'M/C/O', 'name': table_id + '.mco',
          'type': 'select',
          'options': [
            { 'label': '(M) Mandatory', 'value': 'M' },
            { 'label': '(C) Conditional', 'value': 'C' },
            { 'label': '(O) Optional', 'value': 'O' }
          ],
          'def': 'M'
        },
        { 'label': 'Description', 'name': table_id + '.desc',
          'type': 'textarea' }
      ]
    });

    // Activate the bubble editor on click of a table cell
    /*$( '#' + table_id ).on( 'click', 'tbody td', function ( event ) {
      event.preventDefault();
      editor.bubble( this );
    });*/
    
    editor
      .on( 'preSubmit', function ( event, json, _data ) {
        var
          userid = pc295.Global.USERID,
          at = (new Date()).toISOString(),
          data = json.data;
        if ( data ){
          Object.keys( data ).forEach( function ( key ) {
            json.data[ key ].adc_cmon_elmt.userid = userid;
            json.data[ key ].adc_cmon_elmt.at = at;
          });
        }
      })
      .on( 'postEdit postCreate postRemove', function ( event, json, data ) {
        $( '#' + table_id ).dataTable().api().ajax.reload();
        $( '#' + table_id ).dataTable().api().draw();
        appendNullOption();
      });

    var
      buttons,
      guestButtons = [
        { 'extend': 'collection', 'text': 'Export', 'className': 'export',
          'buttons': [
            { 'extend': 'copy',  'exportOptions': { 'columns': ':visible' }},
            { 'extend': 'excel', 'exportOptions': { 'columns': ':visible' }},
            { 'extend': 'pdf',   'exportOptions': { 'columns': ':visible' }},
            { 'extend': 'print', 'exportOptions': { 'columns': ':visible' }}
          ]
        }
      ],
      normalButtons = [
        { 'extend': 'create', 'editor': editor, 'className': 'create' },
        { 'extend': 'edit',   'editor': editor, 'className': 'edit' },
        { 'extend': 'remove', 'editor': editor, 'className': 'remove' },
        { 'text':   'Reload', 'className': 'reload',
          action: function ( event, dt, node, config ) {
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
      'paging': true,
      'createdRow': function( row, data, dataIndex ) {
        $( row )
          .attr( 'draggable', 'true' )
          .attr( 'ondragstart', 'pc295.drag( event )' )
          .attr( 'ondragover', 'pc295.dragover( event )' )
          .attr( 'ondragleave', 'pc295.dragleave( event )' )
          .attr( 'ondrop', 'pc295.adc_cmon_elmt.drop( event )' );
      },
      'columns': [
        // 0 Clause, 1 Group, 2 Common, 3 Element, 4 Abbrev, 5 Notation, 6 Format, 7 MCO, 8 Desc, 9 Cmd
        { 'data': table_id + '.clause', 'className': 'clause', // 0
          'type': 'clause' }, // for sort type defined in main.js
        { 'data': table_id + '.group', 'className': 'group' }, // 1
        { 'data': 'adc_common.name', 'className': 'common_name' }, // 2
        { 'data': table_id + '.name', 'className': 'name' }, // 3
        { 'data': table_id + '.abbrev', 'className': 'abbrev' }, // 4
        { 'data': table_id + '.notation', 'className': 'notation' }, // 5
        { 'data': 'adc_frmt_rprstn.name', 'className': 'frmt_rprstn_name', // 6
          'editField': table_id + '.frmt_rprstn_ref'
        }, // 6
        { 'data': table_id + '.mco', 'className': 'mco' }, // 7
        { 'data': null, 'className': 'details-control', // 8
          'orderable': false,
          'defaultContent': '',
          'render': function ( data, type, row ) {
            if (data.adc_cmon_elmt.desc) {
              if (row.shown) {
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
      columnDefs: [
        // 0 Clause, 1 Group, 2 Common, 3 Element, 4 Abbrev, 5 Notation, 6 Format, 7 MCO, 8 Desc
        { 'visible': false, 'targets': col.Group },
        { 'targets': [
            col.Group, col.Common, col.Element, col.Abbrev, col.Notation, col.Format, col.Desc
          ], 
          'searchable': true },
        { 'targets': [ col.Clause, col.MCO ], 'searchable': false },
        { 'targets': [ col.Cmd ], width: '5%', 'searchable': false }
      ],
      'order': [[ col.Clause, 'asc' ]],
      'drawCallback': function ( settings ) {
        var api = this.api();
        var rows = api.rows( {'page': 'current'} ).nodes();
        var cols = $( '#' + table_id + ' thead th' ).length;
        var last = null;
        api.column(col.Group, {'page': 'current'} ).data().each( function ( group, i ) {
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
        // pc295.Global.data[ table_id ] = json.data;
        pc295.populateSelect({
          'table_id': table_id,
          'common': ''
        });
      }
    });

    table
      .on( 'draw.dt', function ( event ) {
        event.preventDefault();
        // console.log( 'ON draw table #' + table_id );
        var cols = $( '#' + table_id + ' thead th' ).length;
        $( '#' + table_id + ' tr.group td' ).attr( 'colspan', cols);
        appendNullOption();
      })
      // Edit record
      .on( 'click', 'i.editor_edit', function ( event ) {
        event.preventDefault();
        var $tr = $( this ).closest( 'tr' );
        editor.edit( $tr, {
          title: 'Edit record',
          buttons: 'Update'
        });
      })
      // Delete a record
      .on( 'click', 'i.editor_remove', function ( event ) {
        event.preventDefault();
        var $tr = $( this ).closest( 'tr' );
        editor.remove( $tr, {
          title: 'Delete record',
          message: 'Are you sure you wish to remove this record?',
          buttons: 'Delete'
        });
      })
      .on( 'click', 'td.details-control', function ( event ) {
        // Add event listener for opening and closing details
        event.preventDefault();
        event.stopPropagation();
        var
          $tr = $( this ).closest( 'tr' ),
          $icon = $( $tr ).find( 'i.fa-envelope, i.fa-envelope-open' ),
          row = table.row( $tr );
        if (0 === $icon.length) {
          return;
        }  
        if ( row.child.isShown() ) { // This row is already open - close it
          row.child.hide();
          $tr.removeClass( 'shown' );
          $icon.removeClass( 'fa-envelope-open' ).addClass( 'fa-envelope' );
        } else { // Open detail row
          var desc = row.data().adc_cmon_elmt.desc;
          row.child( pc295.format( table_id, desc ) ).show();
          $tr.addClass( 'shown' );
          $icon.removeClass( 'fa-envelope' ).addClass( 'fa-envelope-open' );
        }
        return false;
      })
      // Order by the grouping
      .on( 'click', 'tr.group', function ( event ) {
        event.preventDefault();
        var currentOrder = table.order()[ 0 ];
        if ( currentOrder[ 0 ] === col.Group && currentOrder[ 1 ] === 'asc' ) {
          table.order( [ col.Group, 'desc' ] ).draw();
        }
        else {
          table.order( [ col.Group, 'asc' ] ).draw();
        }
      })
      .on( 'click', 'tr:not(.group)', function () {
      if ( $( this).hasClass( 'selected' ) ) {
        $( this).removeClass( 'selected' );
      } else {
        $( '#' + table_id + ' tbody tr' ).removeClass( 'selected' );
        $( this).addClass( 'selected' );
      }
    });

    $( '.item.' + table_id + ' .column_filter.common' ).on( 'change', function ( event ) {
      event.preventDefault();
      var text = $( this ).val();
      if ( '' === text ) {
        table
          .search( '' )
          .columns().search( '' )
          .draw();
        pc295.showColumn( table_id, col.Common, true );
      } else {
        filterColumn( col.Common, text );
        pc295.showColumn( table_id, col.Common, false );
      }
    });

    $( '#' + table_id + '_toggle a.toggle-vis' ).on( 'click', function ( event ) {
      event.preventDefault();
      var
        clmn = $( this).data( 'column' ),
        column = table.column( clmn ), // Get the column API object
        visible = column.visible();
      pc295.toggleColumn( table_id, clmn, visible );
    });

    $( '#' + table_id + '_toggle' ).find("a.toggle-vis[data-column='" + col.Group + "']").css( 'display', 'none' );
    pc295.showColumn( table_id, col.Abbrev, false );
  };

  return {
    'initModule': initModule,
    'filterColumn': filterColumn,
    'drop': drop,
    'appendNullOption': appendNullOption,
    'col': col
  };
}(jQuery));
// adc_cmon_elmt.js