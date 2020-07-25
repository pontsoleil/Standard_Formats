/*
 * Editor client script for DB Table xbrlgl
 */
/*global $, pc295 */
pc295.xbrlgl = ( function($) {
  var
    // drag,
    rowCache = [],
    clickedComponent,
    atomicType = [
      'boolean', 'anyURI', 'QName',
      'string', 'token',
      'date', 'dateTime',
      'decimal', 'integer', 'monetary', 'pure'
      ],
    collapsedComponent = [],
    typesExpanded  = [],
    tableData,
    table,
    editor,  // use a global for the submit and return data rendering
    filterColumn, format, readTextFile,
    initModule;

  filterColumn = function ( i, text ) {
    if (! table) { return; }
    // cf. Search API https://datatables.net/examples/api/regex.html
    table.column( i )
      .search( text ? '^'+text+'$' : '', true, false )
      .draw();
  };

  /* Formatting function for row details - modify as you need */
  format = function ( d ) {
    // `d` is the original data object for the row
    var description;
    description = d.description.replace(/\n/g, '<br>');
    return '<p>' + description + '</p>';
  };

  readTextFile = function (file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function () {
      if (rawFile.readyState === 4 && rawFile.status == "200") {
        callback(rawFile.responseText);
      }
    };
    rawFile.send(null);
  };

  initModule = function() {
    /* xbrlgl */
    var
      height = $('#content').height() - 150;

    editor = new $.fn.dataTable.Editor({
      ajax: 'php/pc295.xbrlgl.php',
      table: '#xbrlgl',
      fields: [
        { label: '#',         name: 'seq' },
        { label: 'idx',       name: 'idx' },
        { label: 'Label',     name: 'label' },
        { label: 'Composite', name: 'composite' },
        { label: 'Component', name: 'component' },
        { label: 'datatype',  name: 'datatype' }
      ]
    });

    editor
      .on('preSubmit', function ( e, json, _data ) {
         var
           user_id = pc295.Global.USER_ID,
           at = (new Date()).toISOString(),
           data;
        data = json.data;
        if ( data ){
          Object.keys( data ).forEach( function ( key ) {
            json.data[ key ].user_id = user_id;
            json.data[ key ].at      = at;
          });
        }
      })
      .on('postEdit postCreate postRemove', function ( e, json, data ) {
        $('#xbrlgl').dataTable().api().ajax.reload();
        $('#xbrlgl').dataTable().api().draw();
      });

    guestButtons = [
      { text: 'Reload', className: 'reload',
          action: function ( e, dt, node, config ) {
            dt.ajax.reload();
          }
      }
    ];

    normalButtons = [
      { extend: 'create', editor: editor, className: 'create' },
      { extend: 'edit',   editor: editor, className: 'edit' },
      { extend: 'remove', editor: editor, className: 'remove' },
      { text:    'Reload', className: 'reload',
          action: function ( e, dt, node, config ) {
            dt.ajax.reload();
          }
      }
    ];

    if ('guest' == pc295.Global.USER_ROLE) {
      buttons = guestButtons;
    }
    else {
      buttons = normalButtons;
    }

/*    readTextFile("js/xbrlgl.json", function( text ){
      var d = JSON.parse( text );
      tableData = d.data;

      tableData.forEach( function ( d ) {
        var
          ids       = d.id.split('_'),
          collapsed = d.collapsed,
          datatype  = d.datatype,
          composite = d.composite,
          component = d.component;
        if (atomicType.indexOf( datatype ) < 0) {
          if ( collapsed ) {
            collapsedComponent.push( component );
          }
        }
        d.label = d.label.replace(/\s/g, '&nbsp;&nbsp;');
        d.visible = true;
        ids.forEach( function ( id ) {
          if ( id ) {
            if (collapsedComponent.indexOf( id ) >= 0 ||
              collapsedComponent.indexOf( composite ) >= 0 )
            {
              d.visible = false;
            }
          }
        });
      });

      table.rows
        .add( tableData )
        .draw();
    });
*/

    table = $('#xbrlgl').DataTable({
      'dom': 'Bfrtip',
      'ajax': {
        'url': 'php/pc295.xbrlgl.php',
        'type': 'POST',
        'data': function ( d ) {
          d.asof = pc295.Global.asof;
        }
      },
      'select': true,
      'ordering': false,
      'scrollX': true,
      'scrollY': height + 'px',
      'scroller': {
        'rowHeight': 24
      },
      'paging': true,
      'createdRow': function(row, data, dataIndex) {
        var datatype = data.datatype;
        $( row ).attr('id', 'row-xbrlgl-' + dataIndex);
        if (datatype && atomicType.indexOf(datatype) >= 0) {
          $( row )
            .attr('draggable',   'true')
            .attr('ondragstart', 'pc295.drag(event)');
        }
      },
      'columns': [
        { 'className': 'collapse-control', // 0
          'data': 'collapsed',
          'render': function ( data, type, row ) {
            if (atomicType.indexOf(row.datatype) >= 0) {
              return '';
            }
            if (row.collapsed) {
              return '<i class="fa fa-bars" aria-hidden="true" style="display:block; text-align: center;"></i>';
            } else {
              return '<i class="fa fa-compress" aria-hidden="true" style="display:block; text-align: center;"></i>';
            }
          }
        },
        { 'data': 'seq' },       // 1
        { 'data': 'idx' },       // 2
        { 'data': 'label',       // 3
          'className': 'name'},
        { 'data': 'composite' }, // 4
        { 'data': 'component' }, // 5
        { 'data': 'datatype',    // 6
          'className': 'datatype'},
        { 'data': 'visible' },   // 7
        { 'data': null,          // 8
          'className': 'details-control',
          'orderable': false,
          'defaultContent': '',
          'render': function ( data, type, row ) {
            if (row.shown) {
              return '<i class="fa fa-envelope-open-o" aria-hidden="true" style="display:block; text-align: center;"></i>';
            } else {
              return '<i class="fa fa-envelope-o" aria-hidden="true" style="display:block; text-align: center;"></i>';
            }
          }
        }
      ],
      'columnDefs': [
        // The `data` parameter refers to the data for the cell (defined by the
        // `data` option, which defaults to the column being worked with
        { 'targets': [ 3 ],
          'searchable': true
        },
        { 'targets': [ 1, 2, 4, 5, 7 ],
          'visible': false
        }
      ],
      // 'buttons' :buttons,
      'initComplete': function ( settings, json ) {
        pc295.reportProgress('#xbrlgl');

        tableData = json.data;

        tableData.forEach( function ( d ) {
          var
            idx       = d.idx.split('_'),
            // collapsed = d.collapsed,
            datatype  = d.datatype,
            composite = d.composite,
            component = d.component;
          if (atomicType.indexOf( datatype ) < 0) {
            d.collapsed = true;
            if (collapsedComponent.indexOf( component ) < 0) {
              collapsedComponent.push( component );
            }
          }
          d.label = d.label.replace(/\s/g, '&nbsp;&nbsp;');
          d.visible = true;
          idx.forEach( function ( id ) {
            if ( id ) {
              if (collapsedComponent.indexOf( id ) >= 0 ||
                collapsedComponent.indexOf( composite ) >= 0 )
              {
                d.visible = false;
              }
            }
          });
        });

        table.rows
          .add( tableData )
          .draw();

        $('#xbrlgl_wrapper .ui-toolbar').css({
          'background':'#fff', 'color':'#333', 'height':'20px', 'padding':0, 'border': 0 });
        setTimeout(function () {
          $('#xbrlgl').dataTable().api().draw();
        }, 5000);
      }
    });

    table
      // Add event listener for opening and closing details
      .on( 'click', 'td.details-control', function ( e ) {
        var
          tr   = $(this).closest('tr'),
          row  = table.row( tr ),
          icon = $(tr).find('i.fa-envelope-o, i.fa-envelope-open-o');

        e.preventDefault();

        if ( row.child.isShown() ) {
          // This row is already open - close it
          row.child.hide();
          tr.removeClass('shown');
          icon.removeClass('fa-envelope-open-o').addClass('fa-envelope-o');
        } else {
          // Open this row
          row.child( format(row.data()) ).show();
          tr.addClass('shown');
          icon.removeClass('fa-envelope-o').addClass('fa-envelope-open-o');
        }
      })
      .on( 'click, mousedown', 'td.collapse-control', function ( e ) {
        var
          cell   = table.cell( this ),
          // column = cell[0][0].column,
          data   = table.row( this ).data(),
          composite, component,
          index;

        e.preventDefault();

        datatype  = data.datatype;
        if (datatype && atomicType.indexOf(datatype) >= 0) {
          return;
        }

        composite = data.composite;
        component = data.component;
        clickedComponent = component;
        data.collapsed   = !data.collapsed;

        index = collapsedComponent.indexOf( component );

        if ( data.collapsed ) {
          if (index < 0) {
            collapsedComponent.push(component);
          }
        } else {
          if (index >= 0) {
            collapsedComponent.splice(index, 1);
          }
        }

        tableData.forEach( function ( d ) {
          var
            ids = d.idx.split('_');
          if ( data.collapsed ) {
            if (ids.indexOf( composite ) >= 0 &&
                (ids.indexOf( component ) >= 0 || d.composite === component )) {
              d.visible = false;
              if (!d.collapsed) {
                d.collapsed = true;
              }
            }
          } else {
            if (ids.indexOf( composite ) >= 0 && d.composite === component ) {
              d.visible = true;
            }
          }
        });

        table.clear();
        table.rows.add( tableData )
          .draw();

        if ( !data.collapsed ) {
          var count = 0;
          tableData.forEach( function ( d ) {
            if (d.seq < data.seq && d.visible) {
              count++;
            }
          });
          table.scroller().scrollToRow(count);
        }

        $(table.rows().nodes()[data.seq-1]).toggleClass('selected');
      })
      .on( 'draw.dt', function ( e ) {
        e.preventDefault();
        var
          pageLength = $('#xbrlgl').DataTable().page.len();
        $('#xbrlgl_pagelength input[value=' + pageLength + ']').prop('checked',true);
        // console.log('ON draw table #xbrlgl');
      });

    $('#xbrlgl_pagelength input[name="xbrlgl"]').change( function ( e ) {
      e.preventDefault();
      var length = $('#xbrlgl_pagelength input[name="xbrlgl"]:checked').val();
      $('#xbrlgl')
        .DataTable()
        .page.len( length )
        .draw();
    });

    $('#xbrlgl_toggle a.toggle-vis').on( 'click', function ( e ) {
      var
        column = table.column( $( this ).data('column') ), // Get the column API object
        visible = column.visible();
      e.preventDefault();
      e.stopPropagation();

      if ( visible ) { // Toggle the visibility
        column.visible( false );
        $( this ).css('color', '#aaa');
      }
      else {
        column.visible( true );
        $( this ).css('color', '#333');
      }
    });

    table.column( 1 ).visible( false );
    table.column( 4 ).visible( false );
    table.column( 5 ).visible( false );

    var toggle = $('#xbrlgl_toggle a.toggle-vis');
    $(toggle[ 1 ]).css('color', '#aaa');
    $(toggle[ 4 ]).css('color', '#aaa');
    $(toggle[ 5 ]).css('color', '#aaa');

  };

  return {
    initModule:   initModule,
    filterColumn: filterColumn
  };
}(jQuery));