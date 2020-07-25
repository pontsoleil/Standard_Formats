/*
 * Editor client script for DB table adc_intrface_elmt
 */
/*global $, pc295 */
pc295.adc_intrface_elmt = ( function($) {
  var
    table_id = 'adc_intrface_elmt',
    reftable_id = 'adc_intrface_ref',
    desctable_id = 'adc_intrface_desc',
    url = 'php/' + table_id + '.php',
    table,
    editor,
    // use a global for the submit and return data rendering
    filterColumn,
    col = {
      // module,table_group,table,group,no,name,a,d,n,f,clause,mco
      Module: 0,
      Tablegroup: 1,
      Table: 2,
      Group: 3,
      No: 4,
      Name: 5,
      A: 6,
      D: 7,
      N: 8,
      F: 9,
      Clause: 10,
      MCO: 11,
      Ctrl: 12
    },
    initModule;

  filterColumn = function ( i, text ) {
    if (! table ) { return; }
    // cf. Search API https://datatables.net/examples/api/regex.html
    if ( '' !== text ) {
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
    /* adc_intrface_elmt */
    editor = new $.fn.dataTable.Editor({
      'ajax': url,
      'table': '#' + table_id,
      'fields': [
        // module,table_group,table,group,no,name,a,d,n,f,clause,mco
        { 'label': 'Module', 'name': table_id + '.module' },
        { 'label': 'Table Group', 'name': table_id + '.table_group' },
        { 'label': 'Table', 'name': table_id + '.table' },
        { 'label': 'Group', 'name': table_id + '.group' },
        { 'label': 'No', 'name': table_id + '.No' },
        { 'label': 'Name', 'name': table_id + '.name' },
        { 'label': 'Abbreviation', 'name': table_id + '.a' },
        { 'label': 'Datatype', 'name': table_id + '.d' },
        { 'label': 'Notation', 'name': table_id + '.n' },
        { 'label': 'Format Representation', 'name': table_id + '.f' },
        { 'label': 'Clause', 'name': table_id + '.clause' },
        { 'label': 'M/C/O', 'name': table_id + '.mco', 'type': 'select',
          'options': [
            { 'label': '', 'value': '' },
            { 'label': '(M) Mandatory', 'value': 'M' },
            { 'label': '(C) Conditional', 'value': 'C' },
            { 'label': '(O) Optional', 'value': 'O' }
          ],
          'def' : ''
        }
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
            json.data[ key ].adc_intrface_elmt.userid = userid;
            json.data[ key ].adc_intrface_elmt.at = at;
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
        // module,table_group,table,group,no,name,a,d,n,f,clause,mco
        { 'data': table_id + '.module', 'className': 'module' }, // 0
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
        { 'data': table_id + '.a', 'className': 'abbrev' }, // 6
        { 'data': table_id + '.d', 'className': 'datatype' }, // 7
        { 'data': table_id + '.n', 'className': 'notation' }, // 8
        { 'data': table_id + '.f', 'className': 'format' }, // 9
        { 'data': table_id + '.clause', 'className': 'clause' }, // 10
        { 'data': table_id + '.mco', 'className': 'mco' }, // 11
        { 'data': null, 'className': 'editor-control', // 12
          'defaultContent': '<span style="display:block; text-align: center;">' +
              '<i class="editor_edit fa fa-edit" aria-hidden="true"></i>&nbsp;' +
              '<i class="editor_remove fa fa-trash" aria-hidden="true"></i>' +
            '</span>'
        }
      ],
      'columnDefs': [
        // module,table_group,table,group,no,name,a,d,n,f,clause,mco
        { 'targets': [
          col.Module, col.Tablegroup, col.Table, col.Group, col.Name, col.A, col.D, col.N, col.F, col.Clause
        ], 'searchable': true },
        { 'targets': [ col.No, col.MCO ],'searchable': false }
      ],
      'order': [[ col.Module, 'asc' ], [ col.Tablegroup, 'asc'], [ col.No, 'asc']],
      'drawCallback': function ( settings ) {
        var api = this.api();
        var rows = api.rows( {page: 'current'} ).nodes();
        var cols = $( '#' + table_id + ' thead th' ).length;
        var last = null;
        api.column(col.Group, {page: 'current'} ).data().each( function ( group, i ) {
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
          'module': '',
          'table_group': ''
        });
      }
    });

    table
      .on( 'draw.dt', function ( event ) {
        event.preventDefault();
        // console.log( 'ON draw table #adc_intrface_elmt' );
        var cols = $( '#' + table_id + ' thead th' ).length;
        $( '#' + table_id + ' tr.group td' ).attr( 'colspan', cols );
      })
      .on( 'click', 'td', function ( elent ) {
        event.preventDefault();
        var
          $tr = $( this ).closest( 'tr' ),
          row = table.row( $tr ),
          data = row.data(),
          moduleName = data.adc_intrface_elmt.module,
          tableGroup = data.adc_intrface_elmt.table_group,
          tableName = data.adc_intrface_elmt.table,
          $module = $( '.item.' + table_id + ' .column_filter.module' ),
          $tableGroup = $( '.item.' + table_id + ' .column_filter.table_group' ),
          $table = $( '.item.' + table_id + ' .column_filter.table' );
        if ( '' === $module.val() ) {
          $module.val(moduleName);
        }
        if ( '' === $tableGroup.val() ) {
          $tableGroup.val(tableGroup);
        }
        if ( '' === $table.val() ) {
          $table.val(tableName);
        }
        filterColumn( col.Table, tableName );
        pc295.showColumn( table_id, col.Module, false );
        pc295.showColumn( table_id, col.Tablegroup, false );
        pc295.showColumn( table_id, col.Table, false );

        // adc_intrface_ref
        var intrface_ref_col = pc295[ reftable_id ].col.Table;
        pc295.adc_intrface_ref.filterColumn( intrface_ref_col, tableName );
        pc295.showColumn(reftable_id, intrface_ref_col, false );

        // adc_intrface_desc
        var intrface_desc_col = pc295[ desctable_id ].col.Table;
        pc295.adc_intrface_desc.filterColumn( intrface_desc_col, tableName );
        pc295.showColumn(desctable_id, intrface_desc_col, false );
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
      // Show detail
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
          var desc = row.data().adc_intrface_elmt.desc;
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

    $( '.item.' + table_id + ' .column_filter.module' ).on( 'change', function ( event ) {
      var text = $( this ).val();
      event.preventDefault();
      if ( '' === text ) {
        table
          .search( '' )
          .columns().search( '' )
          .draw();
        pc295.showColumn( table_id, col.Module, true );
      } else {
        filterColumn( col.Module, text );
        pc295.showColumn( table_id, col.Module, false );
      }

      pc295.populateSelect({
        'table_id': table_id,
        'module': text,
        'table_group': ''
      });

      // adc_intrface_ref
      var
        intrface_ref_table = $( '#' + reftable_id ).DataTable(),
        intrface_ref_col = pc295[reftable_id].col.Module;
      if ( '' === text ) {
        intrface_ref_table
          .search( '' )
          .columns().search( '' )
          .draw();
        pc295.showColumn(reftable_id, intrface_ref_col, true );
      } else {
        pc295.adc_intrface_ref.filterColumn( intrface_ref_col, text );
        pc295.showColumn(reftable_id, col.Module, false );
      }

      // adc_intrface_desc
      var
        intrface_desc_table = $( '#' + desctable_id ).DataTable(),
        intrface_desc_col = pc295[desctable_id].col.Module;
      if ( '' === text ) {
        intrface_desc_table
          .search( '' )
          .columns().search( '' )
          .draw();
        pc295.showColumn(desctable_id, intrface_desc_col, true );
      } else {
        pc295.adc_intrface_desc.filterColumn( intrface_desc_col, text );
        pc295.showColumn(desctable_id, col.Module, false );
      }
    });

    $( '.item.' + table_id + ' .column_filter.table_group' ).on( 'change', function ( event ) {
      var
        module = $( '.item.' + table_id + ' .column_filter.module' ).val(),
        text = $( this ).val();
      event.preventDefault();
      if ( '' === text ) {
        table
          .search( '' )
          .columns().search( '' )
          .draw();
        pc295.showColumn( table_id, col.Tablegroup, true );
      } else {
        filterColumn( col.Tablegroup, text );
        pc295.showColumn( table_id, col.Tablegroup, false );
      }

      pc295.populateSelect({
        'table_id': table_id,
        'module': module,
        'table_group': text
      });

      // adc_intrface_ref
      var
        intrface_ref_table = $( '#' + reftable_id ).DataTable(),
        intrface_ref_col = pc295[ reftable_id ].col.Tablegroup;
      if ( '' === text ) {
        intrface_ref_table
          .search( '' )
          .columns().search( '' )
          .draw();
        pc295.showColumn(reftable_id, intrface_ref_col, true );
      } else {
        pc295.adc_intrface_ref.filterColumn( intrface_ref_col, text );
        pc295.showColumn(reftable_id, intrface_ref_col, false );
      }
    
      // adc_intrface_desc
      var
        intrface_desc_table = $( '#' + desctable_id ).DataTable(),
        intrface_desc_col = pc295[ desctable_id ].col.Tablegroup;
      if ( '' === text ) {
        intrface_desc_table
          .search( '' )
          .columns().search( '' )
          .draw();
        pc295.showColumn(desctable_id, intrface_desc_col, true );
      } else {
        pc295.adc_intrface_desc.filterColumn( intrface_desc_col, text );
        pc295.showColumn(desctable_id, intrface_desc_col, false );
      }
      
      setTimeout(function () {
        if ( 'none' === $( '.item.' + table_id + ' .column_filter.table' ).css( 'display' )) {
          pc295.showColumn( table_id, col.Table, false );
          $( '.item.' + table_id + ' .column_filter.module' ).val(
            $( '#' + table_id ).DataTable().row(0).data()[ table_id ].module
          );
          intrface_ref_col = pc295[ reftable_id ].col.Table;
          pc295.showColumn(reftable_id, intrface_ref_col, false );
          intrface_desc_col = pc295[ desctable_id ].col.Module;
          pc295.showColumn(desctable_id, intrface_desc_col, false );
        }
      }, 500);

    });

    $( '.item.' + table_id + ' .column_filter.table' ).on( 'change', function ( event ) {
      var
        data = table.data(),
        $module = $( '.item.' + table_id + ' .column_filter.module' ),
        $tableGroup = $( '.item.' + table_id + ' .column_filter.table_group' ),
        moduleName, tablegroupName,
        text = $( this ).val();
      event.preventDefault();
      for (var i = 0; i < data.length; i++) {
        var r = data[ i ].adc_intrface_elmt;
        if (r && r.table && text === r.table) {
          moduleName = r.module;
          if ( '' === $module.val() ) {
            $module.val( moduleName );
          }
          tablegroupName = r.table_group;
          if ( '' === $tableGroup.val() ) {
            $tableGroup.val(tablegroupName);
          }
          break;
        }
      }
      if ( '' === text ) {
        table
          .search( '' )
          .columns().search( '' )
          .draw();
        pc295.showColumn( table_id, col.Table, true );
      } else {
        filterColumn( col.Table, text );
        pc295.showColumn( table_id, col.Table, false );
      }
      

      // adc_intrface_ref
      var
        intrface_ref_table = $( '#' + reftable_id ).DataTable(),
        intrface_ref_col = pc295[ reftable_id ].col.Table;
      if ( '' === text ) {
        intrface_ref_table
          .search( '' )
          .columns().search( '' )
          .draw();
        pc295.showColumn(reftable_id, intrface_ref_col, true );
      } else {
        pc295.adc_intrface_ref.filterColumn( intrface_ref_col, text );
        pc295.showColumn(reftable_id, intrface_ref_col, false );
      }

      // adc_intrface_desc
      var
        intrface_desc_table = $( '#' + desctable_id ).DataTable(),
        intrface_desc_col = pc295[ desctable_id ].col.Table;
      if ( '' === text ) {
        intrface_desc_table
          .search( '' )
          .columns().search( '' )
          .draw();
        pc295.showColumn(desctable_id, intrface_desc_col, true );
      } else {
        pc295.adc_intrface_desc.filterColumn( intrface_desc_col, text );
        pc295.showColumn(desctable_id, intrface_desc_col, false );
      }
    
    });  
  
    $( '#' + table_id + '_toggle a.toggle-vis' ).on( 'click', function (event ) {
      event.preventDefault();
      var
        clmn = $( this ).data( 'column' ),
        column = table.column( clmn ), // Get the column API object
        visible = column.visible();
      pc295.toggleColumn( table_id, clmn, visible );
    });

    // module,table_group,table,group, no,name,a,d,n,f,clause,mco
    pc295.showColumn( table_id, col.Module, false );
    pc295.showColumn( table_id, col.Group, false );
    pc295.showColumn( table_id, col.No, false );
    pc295.showColumn( table_id, col.A, false );
    pc295.showColumn( table_id, col.D, false );
  };

  return {
    'initModule': initModule,
    'filterColumn': filterColumn,
    'col': col
  };
}(jQuery));
// adc_intrface_elmt.js