/*
 * Editor client script for DB Table cd_interface
 */
/*global $, pc295 */
pc295.cd_interface = ( function($) {
  var
    table,
    editor,  // use a global for the submit and return data rendering
    fieldType,
    filterColumn,
    emptyModuleSelect,
    emptyTableSelect,
    populateModuleSelect,
    populateTableSelect,
    initModule;

  filterColumn = function ( i, text ) {
    if (! table) { return; }
    // cf. Search API https://datatables.net/examples/api/regex.html
    table.column( i )
      .search( text ? '^'+text+'$' : '', true, false )
      .draw();
  };

  emptyModuleSelect = function () {
    var $select = $('.item.cd_interface select.module');
    $select.empty()
      .append( $('<option value=""></option>' ));
  };

  populateModuleSelect = function () {
    $.ajax({
      url      : 'php/pc295.cd_module.php',
      dataType : 'json',
      data: {
        asof: pc295.Global.asof
      }
    })
    .done( function ( json ) {
      var
        len, i, data, rowid, id, name,
        moduleDict = {},
        moduleArray = [],
        $select, modulename;
      len = json.data.length;
      for ( i = 0; i < len; i++ ) {
        data  = json.data[i];
        rowid = data.DT_RowId;
        id    = rowid.substr( 4 );
        name  = data.name;
        if ( id && name ) {
          moduleDict[ name ] = id;
        }
      }
      $select = $('.item.cd_interface select.module');
      for (var key in moduleDict) if ( moduleDict.hasOwnProperty( key )) {
        moduleArray.push( key );
      }
      // moduleArray.sort();
      for( i = 0, len = moduleArray.length; i < len; i++ ) {
        modulename = moduleArray[ i ];
        $select.append( $('<option value="' + modulename + '">' + modulename + '</option>' ));
      }
    })
    .fail( function( data, textStatus, errorThrown ) {
      pc295.openDialog( 'ERROR', textStatus );
      console.log( errorThrown.message );
    }); // END $.ajax
  };

  emptyTableSelect = function () {
    var $select = $('.item.cd_interface select.table');
    $select.empty()
      .append( $('<option value=""></option>' ));
  };

  // populateTableSelect = function () {
  //   $.ajax({
  //     url      : 'php/pc295.cd_table.php',
  //     dataType : 'json'
  //   })
  //   .done( function ( json ) {
  //     var
  //       len, i, data, rowid, id, name,
  //       tableDict = {},
  //       tableArray = [],
  //       $select,
  //       currentmodule,
  //       modulename, name;
  //     currentmodule = $('.item.cd_interface select.module').val();
  //     len = json.data.length;
  //     for ( i = 0; i < len; i++ ) {
  //       data  = json.data[i];
  //       rowid = data.DT_RowId;
  //       id    = rowid.substr( 4 );
  //       modulename = data.cd_module.name;
  //       if ('' === currentmodule ||
  //           currentmodule === modulename ){
  //         name  = data.cd_table.name;
  //         if ( id && name ) {
  //           tableDict[ name ] = id;
  //         }
  //       }
  //     }
  //     $select = $('.item.cd_interface select.table');
  //     for (var key in tableDict) if ( tableDict.hasOwnProperty( key )) {
  //       tableArray.push( key );
  //     }
  //     tableArray.sort();
  //     for( i = 0, len = tableArray.length; i < len; i++ ) {
  //       tablename = tableArray[ i ];
  //       $select.append( $('<option value="' + tablename + '">' + tablename + '</option>' ));
  //     }
  //   })
  //   .fail( function( data, textStatus, errorThrown ) {
  //     pc295.openDialog( 'ERROR', textStatus );
  //     console.log( errorThrown.message );
  //   }); // END $.ajax
  // };

  initModule = function() {
    /* cd_interface */
    populateModuleSelect();
    populateTableSelect();

    editor = new $.fn.dataTable.Editor({
      ajax: 'php/pc295.cd_interface.php',
      table: '#cd_interface',
      fields: [
        { label: '#',                 name: 'm_seq' },
        { label: 'module',            name: 'module' },
        { label: 'table_name',        name: 'table_name' },
        { label: 'seq',               name: 'seq' },
        { label: 'field_name',        name: 'field_name' },
        { label: 'omit',              name: 'omit' },
        { label: 'datatype',          name: 'datatype' },
        { label: 'representation',    name: 'representation' },
        { label: 'idx',               name: 'idx' },
        { label: 'reftable',          name: 'reftable' },
        { label: 'datatype2',         name: 'datatype2' },
        { label: 'component',         name: 'component' },
        { label: 'composite',         name: 'composite' },
        { label: 'complextype',       name: 'complextype' },
        { label: 'xbrlgl',            name: 'xbrlgl' },
        { label: 'substitutiongroup', name: 'substitutiongroup' },
        { label: 'Description',       name: 'description', type: 'textarea' },
        { label: 'Level',             name: 'level',
          type : 'select',
          options: [
            { label: '1: shall be used for all use cases',
              value: '1' },
            { label: '2: to be used for specific use cases',
              value: '2' },
            { label: '3: highlight privacy information',
              value: '3' },
            { label: 'TBD: to be determined',
              value: 'TBD' }
          ],
          def: '1' }
      ]
    });

    var buttons = [
      { text: 'Reload', tableName: 'reload',
          action: function ( e, dt, node, config ) {
            dt.ajax.reload();
            emptyModuleSelect();
            emptyTableSelect();
            populateModuleSelect();
            populateTableSelect();
          }
      },
      { extend: 'collection', text: 'Export', tableName: 'export',
        buttons: [
          { extend: 'copy',  exportOptions: { columns: ':visible' }},
          { extend: 'excel', exportOptions: { columns: ':visible' }},
          { extend: 'pdf',   exportOptions: { columns: ':visible' }},
          { extend: 'print', exportOptions: { columns: ':visible' }},
          'colvis'
        ]
      }
    ];

    if ('guest' !== pc295.Global.USER_ROLE) {
      buttons = [
        { extend: 'create', editor: editor, tableName: 'create' },
        { extend: 'edit',   editor: editor, tableName: 'edit' },
        { extend: 'remove', editor: editor, tableName: 'remove' },
        { text:   'Reload', tableName: 'reload',
          action: function ( e, dt, node, config ) {
            dt.ajax.reload();
            emptyModuleSelect();
            emptyTableSelect();
            populateModuleSelect();
            populateTableSelect();
          }
        },
        { extend: 'collection', text: 'Export', tableName: 'export',
          buttons: [
            { extend: 'copy',  exportOptions: { columns: ':visible' }},
            { extend: 'excel', exportOptions: { columns: ':visible' }},
            { extend: 'csvHtml5', text: 'TSV', fieldSeparator: '\t', extension: '.tsv' },
            { extend: 'pdf',   exportOptions: { columns: ':visible' }},
            { extend: 'print', exportOptions: { columns: ':visible' }}
          ]
        }//,
        //'colvis'
      ];
    }

    table = $('#cd_interface').DataTable({
      dom: 'Bfrtip',
      ajax: {
        url: 'php/pc295.cd_interface.php',
        type: 'POST',
        data: function ( d ) {
          d.asof = pc295.Global.asof;
        }
      },
      'scrollX': true,
      pageLength: 20,
      select: {
        style:    'os',
        selector: 'td:first-child'
      },
      columns: [
        { 'data': 'm_seq' },      // 0
        { 'data': 'module' },     // 1
        { 'data': 'table_name' }, // 2
        { 'data': 'seq' },        // 3
        { 'data': 'field_name' }, // 4
        { 'data': 'omit' },       // 5
        { 'data': 'datatype' },   // 6
        { 'data': 'representation' }, // 7
        { 'data': 'idx' },        // 8
        { 'data': 'reftable' },   // 9
        { 'data': 'datatype2' },  //10
        { 'data': 'component' },  //11
        { 'data': 'composite' },  //12
        { 'data': 'complextype' },//13
        { 'data': 'xbrlgl' },     //14
        { 'data': 'substitutiongroup' }, // 15
        { 'data': 'level' },      //16
        { 'data': null,           //17
          'className': 'details-control',
          'orderable': false,
          'defaultContent': '',
          'render': function ( data, type, row ) {
            if (data.description) {
              if (row.shown) {
                return '<i class="fa fa-envelope-open-o" aria-hidden="true" style="display:block; text-align: center;"></i>';
              } else {
                return '<i class="fa fa-envelope-o" aria-hidden="true" style="display:block; text-align: center;"></i>';
              }
            }
          }
        }
      ],
      columnDefs: [
        { 'targets': [ 0, 1, 2, 4, 11, 12, 13, 14, 15 ],
          width:  '10%', 'searchable': true },
        { 'targets': [ 0, 3, 5, 6, 7, 8, 9, 10, 16, 17 ],
          width:  '5%', 'searchable': false }
      ],
      order: [ 0, 'asc' ],
      buttons: buttons,
      initComplete: function ( settings, json ) {
        pc295.reportProgress('#cd_interface');
      }
    });

    // Activate an inline edit on click of a table cell
    $('#cd_interface')
      .on( 'click', 'td.details-control', function ( e ) {
      // Add event listener for opening and closing details
        var
          tr   = $( this ).closest('tr'),
          row  = table.row( tr ),
          icon = $( tr ).find('i.fa-envelope-o, i.fa-envelope-open-o');
        e.preventDefault();
        e.stopPropagation();
        if ( row.child.isShown() ) { // This row is already open - close it
          row.child.hide();
          tr.removeClass('shown');
          icon.removeClass('fa-envelope-open-o').addClass('fa-envelope-o');
        } else { // Open detail row
          var desc = row.data().adc_table.desc;
          row.child( pc295.format( desc ) ).show();
          tr.addClass('shown');
          icon.removeClass('fa-envelope-o').addClass('fa-envelope-open-o');
        }
        return false;
      })
      .on( 'click', 'tbody td:not(:first-child)', function ( e ) {
        if ('guest' !== pc295.Global.USER_ROLE) {
          editor.inline( this,  {
            onBlur: 'submit'
          });
        }
      })
      .on( 'draw.dt', function ( e ) {
        e.preventDefault();
        var
          pageLength = $('#cd_interface').DataTable().page.len();
        $('#cd_interface_pagelength input[value=' + pageLength + ']').prop('checked',true);
        // console.log('ON draw table #cd_interface');
      });

    $('#cd_interface_pagelength input[name="cd_interface"]').change( function ( e ) {
      e.preventDefault();
      var length = $('#cd_interface_pagelength input[name="cd_interface"]:checked').val();
      $('#cd_interface')
        .DataTable()
        .page.len( length )
        .draw();
    });

    $('.item.cd_interface .column_filter.module').on( 'change', function ( e ) {
      var
        text = $( this ).val();
      e.preventDefault();
      emptyTableSelect();
      populateTableSelect();
      filterColumn( 1, text );
      if ('' === text) {
        $('#cd_field').DataTable().search( '' )
         .columns().search( '' )
         .draw();
      }
    });

    $('.item.cd_interface .column_filter.table').on( 'change', function ( e ) {
      var
        text = $( this ).val();
      e.preventDefault();
      filterColumn( 2, text );
      if ('' === text) {
        $('#cd_field').DataTable().search( '' )
         .columns().search( '' )
         .draw();
      }
    });

    $('#cd_interface_toggle a.toggle-vis').on( 'click', function ( e ) {
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

    table.column(  5 ).visible( false );
    table.column(  8 ).visible( false );
    table.column(  9 ).visible( false );
    table.column( 11 ).visible( false );
    table.column( 12 ).visible( false );
    table.column( 13 ).visible( false );
    table.column( 15 ).visible( false );
    var toggle = $('#cd_interface_toggle a.toggle-vis');
    $(toggle[  5 ]).css('color', '#aaa');
    $(toggle[  8 ]).css('color', '#aaa');
    $(toggle[  9 ]).css('color', '#aaa');
    $(toggle[ 11 ]).css('color', '#aaa');
    $(toggle[ 12 ]).css('color', '#aaa');
    $(toggle[ 13 ]).css('color', '#aaa');
    $(toggle[ 15 ]).css('color', '#aaa');

    if ('guest' === pc295.Global.USER_ROLE) {
      table.column( 0 ).visible( false );
    }
  };

  return {
    initModule:   initModule,
    filterColumn: filterColumn
  };
}(jQuery));