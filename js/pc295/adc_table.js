/*
 * Editor client script for DB table adc_table
 */
/*global $, pc295 */
pc295.adc_table = ( function($) {
  var
    table_id = 'adc_table',
    elmt_table_id = 'adc_element',
    elmt2_table_id = 'adc_element2',
    url = 'php/' + table_id + '.php',
    table,
    editor,
    col = {
      // 0 Module, 1 Clause, 2 Tablegroup, 3 Table, 4 Abbrev, 5 MCO, 6 Desc, 7 Ctrl
      Module: 0,
      Clause: 1,
      Tablegroup: 2,
      Table: 3,
      Abbrev: 4,
      MCO: 5,
      Desc: 6,
      Ctrl: 7
    },
    // use a global for the submit and return data rendering
    filterColumn,
    initModule;

  filterColumn = function ( i, text ) {
    if (! table) { return; }
    // cf. Search API https://datatables.net/examples/api/regex.html
    table.column( i )
      .search( text ? '^' + text + '$' : '', true, false )
      .draw();
  };

  initModule = function() {
    var
      $table_pane = $( '.item.' + table_id ),
      $elmt_table_pane = $( '.item.' + elmt_table_id );

    // pc295.populateModuleSelect( table_id );
    // pc295.populateTableGroupSelect( table_id );

    // 0 Module, 1 Clause, 2 Tablegroup, 3 Table, 4 Abbrev, 5 MCO, 6 Desc, 7 Ctrl
    editor = new $.fn.dataTable.Editor({
      'ajax': url,
      'table': '#' + table_id,
      'fields': [
        { 'label': 'Module', 'name': table_id + '.module_id', 'type': 'select' }, // 0
        { 'label': 'Clause', 'name': table_id + '.clause' }, // 1
        { 'label': 'Table group', 'name': table_id + '.group' }, // 2
        { 'label': 'Table', 'name': table_id + '.name' }, // 3
        { 'label': 'Abbreviation', 'name': table_id + '.abbrev' }, // 4
        { 'label': 'Description', 'name': table_id + '.desc', 'type': 'textarea' }, // 6
        { 'label': 'M/O/C', 'name': table_id + '.mco', // 5
          'type' : 'select',
          'options': [
            { 'label': '(M) Mandatory', 'value': 'M' },
            { 'label': '(C) Conditional', 'value': 'C' },
            { 'label': '(O) Optional', 'value': 'O' }
          ],
          'def' : 'M' }
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
            json.data[ key ].adc_table.userid = userid;
            json.data[ key ].adc_table.at = at;
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
        }
      ],
      normalButtons = [
        { 'extend': 'create', 'editor': editor, 'className': 'create' },
        { 'extend': 'edit',   'editor': editor, 'className': 'edit' },
        { 'extend': 'remove', 'editor': editor, 'className': 'remove' },
        { 'text':    'Reload',
          'className': 'reload',
          'action': function ( event, dt, node, config ) {
            dt.ajax.reload();
          }
        }
      ];

    if ( 'guest' == pc295.Global.USER_ROLE) {
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
        // 0 Module, 1 Clause, 2 Tablegroup, 3 Table, 4 Abbrev, 5 MCO, 6 Desc, 7 Ctrl
        { 'data': 'adc_module.name', 'className': 'module', // 0
          'editField': table_id + '.module_id'
        },
        { 'data': table_id + '.clause', 'className': 'clause' }, // 1
        { 'data': table_id + '.group', 'className': 'table_group' }, // 2
        { 'data': table_id + '.name', 'className': 'table' }, // 3
        { 'data': table_id + '.abbrev', 'className': 'abbrev' }, // 4
        { 'data': table_id + '.mco', 'className': 'mco' }, // 5
        { 'data': null, 'className': 'details-control', // 6
          'orderable': false,
          'defaultContent': '',
          'render': function ( data, type, row ) {
            if (data.adc_table.desc) {
              if (row.shown) {
                return '<i class="fa fa-envelope-open" aria-hidden="true" style="display:block; text-align: center;"></i>';
              }
              return '<i class="fa fa-envelope" aria-hidden="true" style="display:block; text-align: center;"></i>';
            }
            return '<i class="fa fa-times" aria-hidden="true" style="display:block; text-align: center;"></i>';
          }
        },
        { 'data': null, 'className': 'editor_edit', // 7
          'defaultContent': '<i class="fa fa-edit" aria-hidden="true"></i>',
          'orderable': false
        }
      ],
      columnDefs: [
        // 0 Module, 1 Clause, 2 Tablegroup, 3 Table, 4 Abbrev, 5 MCO, 6 Desc, 7 Ctrl
        { 'targets': [ col.Module, col.Clause, col.Tablegroup, col.Abbrev ],
          'width': '12%', 'searchable': true },
        { 'targets': [ col.Ctrl, col.MCO, col.Desc ],
          'width': '8%', 'searchable': false },
        { 'targets': [ col.Table ],
          'width': '28%', 'searchable': true }
      ],
      'order': [[ col.Clause, 'asc' ]],
      'buttons' :buttons,
      'initComplete': function ( settings, json ) {
        pc295.reportProgress( '#' + table_id );
        // pc295.Global.data[ table_id ] = json.data;
        pc295.populateSelect({
          'table_id': table_id,
          'module': '',
          'table_group': ''
        });
        // pc295.Global.data[ elmt2_table_id ] = json.data;
        pc295.populateSelect({
          'table_id': elmt2_table_id,
          'module': '',
          'table_group': ''
        });
      }
    });

    table
      .on( 'click', 'td', function ( event ) {
        event.preventDefault();
        event.stopPropagation();
        var
          $tr = $( this ).closest( 'tr' ),
          $td = $( this ).closest( 'td' ),
          row = table.row( $tr ),
          data = row.data(),
          moduleName = data.adc_module.name,
          tableGroup = data.adc_table.group,
          tableName = data.adc_table.name,
          colModule = pc295[ elmt_table_id ].col.Module,
          colTablegroup = pc295[ elmt_table_id ].col.Tablegroup,
          colTable = pc295[ elmt_table_id ].col.Table,
          colClause = pc295[ elmt_table_id ].col.Clause;

        pc295[ elmt_table_id ].filterColumn( colTable, tableName );
        $( '#' + elmt_table_id + '' ).DataTable().order( [ colClause, 'asc' ] ).draw();

        $( 'tr.selected' ).removeClass( 'selected' );
        $tr.addClass( 'selected' );

        if ( '' === $table_pane.find( '.module' ).val()) {
          $table_pane.find( '.module' ).val(moduleName);
        }
        if ( '' === $table_pane.find( '.table_group' ).val()) {
          $table_pane.find( '.table_group' ).val(tableGroup);
        }

        $elmt_table_pane.find( '.module' ).text( moduleName );
        $elmt_table_pane.find( '.table_group' ).text( tableGroup );
        $elmt_table_pane.find( '.table' ).text( tableName );
        pc295.showColumn( elmt_table_id, colModule, false );
        pc295.showColumn( elmt_table_id, colTablegroup, false );
        pc295.showColumn( elmt_table_id, colTable, false );
 
        if ($td.hasClass( 'editor_edit' )) {
          editor.edit( $tr, {
            title: 'Edit record',
            buttons: 'Update'
          });
        } else if ($td.hasClass( 'editor_remove' )) {
          editor.remove( $tr, {
            title: 'Delete record',
            message: 'Are you sure you wish to remove this record?',
            buttons: 'Delete'
          });
        } else if ($td.hasClass( 'details-control' )) {
          var
            $icon = $( $tr ).find( 'i.fa-envelope, i.fa-envelope-open' );
          if (0 === $icon.length) {
            return;
          }  
          if ( row.child.isShown() ) { // This row is already open - close it
            row.child.hide();
            tr.removeClass( 'shown' );
            $icon.removeClass( 'fa-envelope-open' ).addClass( 'fa-envelope' );
          } else { // Open detail row
            var desc =  row.data().adc_table.desc;
            row.child( pc295.format( table_id, desc ) ).show();
            tr.addClass( 'shown' );
            $icon.removeClass( 'fa-envelope' ).addClass( 'fa-envelope-open' );
          }
        }
        return false;
      })
      .on( 'draw.dt', function ( event ) {
        event.preventDefault();
      });

    $table_pane.find('.column_filter.module' ).on( 'change', function ( event ) {
      event.preventDefault();
      $( 'tr.selected' ).removeClass( 'selected' );
      var
        text = $( this ).val();
      if ( '' === text) {
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

      // adc_element
      var
        elmt_table = $( '#' + elmt_table_id ).DataTable(),
        colModule = pc295[ elmt_table_id ].col.Module,
        colClause = pc295[ elmt_table_id ].col.Clause;
      if ( '' === text) {
        elmt_table
          .search( '' )
          .columns().search( '' )
          .draw();
        pc295.showColumn( elmt_table_id, colModule, true );
      } else {
        pc295[ elmt_table_id ].filterColumn( colModule, text );
        pc295.showColumn( elmt_table_id, colModule, false );
        $elmt_table_pane.find( '.module' ).text(text || 'Module' );
      }
      $( '#' + elmt_table_id ).DataTable().order( [ colClause, 'asc' ] ).draw();
    });

    $table_pane.find('.column_filter.table_group' ).on( 'change', function ( event ) {
      event.preventDefault();
      $( 'tr.selected' ).removeClass( 'selected' );
      var
        data = table.data(),
        text = $( this ).val(),
        $module = $table_pane.find( '.column_filter.module' ),
        moduleName;
      for (var i = 0; i < data.length; i++) {
        var r = data[ i ];
        if (text === r.adc_table.group) {
          moduleName = r.adc_module.name;
          if ( moduleName !== $module.val() ) {
            $module.val(moduleName);
          }
          break;
        }
      }
      
      if ( '' === text) {
        table
          .search( '' )
          .columns().search( '' )
          .draw();
        filterColumn( col.Module, moduleName );
        pc295.showColumn( table_id, col.Tablegroup, true );
      } else {
        filterColumn( col.Tablegroup, text );
        pc295.showColumn( table_id, col.Tablegroup, false );
      }
      // adc_element
      var
        $elmtModule = $elmt_table_pane.find( '.module' ),
        $elmtTablegroup = $elmt_table_pane.find( '.table_group' ),
        $elmtTable = $elmt_table_pane.find( '.table' ),
        elmt_table = $( '#' + elmt_table_id ).DataTable(),
        colTablegroup = pc295[ elmt_table_id ].col.Tablegroup,
        colTable = pc295[ elmt_table_id ].col.Table,
        colClause = pc295[ elmt_table_id ].col.Clause;
      if ( moduleName !== $elmtModule.val() ) {
        $elmtModule.text( moduleName );
      }
      if ( '' === text) {
        elmt_table
          .search( '' )
          .columns().search( '' )
          .draw();
        $elmtModule.val( moduleName );
        pc295.showColumn( elmt_table_id, colTablegroup, true );
      } else {
        pc295[ elmt_table_id ].filterColumn( colTablegroup, text );
        pc295.showColumn( elmt_table_id, colTablegroup, false );
      }
      $elmtTablegroup.text( text );
      $elmtTable.text('');
      pc295.showColumn( elmt_table_id, colTable, true );
      elmt_table.order( [ colClause, 'asc' ] ).draw();
    });

    $( '#' + table_id + '_toggle a.toggle-vis' ).on( 'click', function ( event ) {
      event.preventDefault();
      var
        col = $( this ).data( 'column' ),
        column = table.column( col ), // Get the column API object
        visible = column.visible();
      pc295.toggleColumn( table_id, col, visible);
    });

    // 0 Module, 1 Clause, 2 Tablegroup, 3 Table, 4 Abbrev, 5 MCO, 6 Desc, 7 Ctrl
    pc295.showColumn( table_id, col.Module, false );
    pc295.showColumn( table_id, col.Abbrev, false );

    // if ( 'guest' === pc295.Global.USER_ROLE) {
    //   table.column( 0 ).visible( false );
    // }
  };

  return {
    'initModule': initModule,
    'filterColumn': filterColumn,
    'col': col
  };
}(jQuery));
// adc_table.js