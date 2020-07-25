/*
 * Editor client script for DB Table adc_frmt_rprstn
 */
/*global $, pc295 */
pc295.adc_frmt_rprstn = ( function($) {
  var
    table_id = 'adc_frmt_rprstn',
    url = 'php/' + table_id + '.php',
    table,
    editor,
    col = {
      Clause: 0,
      Format: 1,
      Notation: 2,
      Desc: 3,
      Ctrl: 4
    },
    // use a global for the submit and return data rendering
    filterColumn,
    detailRows = [], // Array to track the ids of the details displayed rows
    initModule;

  filterColumn = function ( i, text ) {
    if (! table) { return; }
    // cf. Search API https://datatables.net/examples/api/regex.html
    table.column( i )
      .search( text ? '^'+text+'$' : '', true, false )
      .draw();
  };

  format = function ( d ) {
    return d.adc_frmt_rprstn.desc;
  };

  initModule = function() {
    /* adc_frmt_rprstn */
    editor = new $.fn.dataTable.Editor({
      ajax: url,
      table: '#' + table_id,
      fields: [
        { label: 'Clause', name: table_id + '.clause' },
        { label: 'Name', name: table_id + '.name' },
        // { label: 'url', name: table_id + '.url' },
        { label: 'Notation', name: table_id + '.notation' },
        { label: 'Description', name: table_id + '.desc', type: 'textarea' }
      ]
    });

    editor
      .on( 'preSubmit', function ( e, json, _data ) {
        var
          userid = pc295.Global.USERID,
          at = (new Date()).toISOString(),
          data = json.data;
        if ( data ){
          Object.keys( data ).forEach( function ( key ) {
            json.data[ key ].adc_frmt_rprstn.userid = userid;
            json.data[ key ].adc_frmt_rprstn.at = at;
          });
        }
      })
      .on( 'postEdit postCreate postRemove', function ( e, json, data ) {
        $( '#' + table_id).dataTable().api().ajax.reload();
        $( '#' + table_id).dataTable().api().draw();
      });

    var
      buttons,
      guestButtons = [
        { 'text': 'Reload',
          'className': 'reload',
          'action': function ( e, dt, node, config ) {
            dt.ajax.reload();
          }
        }
      ],
      normalButtons = [
        { 'extend': 'create', 'editor': editor, 'className': 'create' },
        { 'extend': 'edit',   'editor': editor, 'className': 'edit' },
        { 'extend': 'remove', 'editor': editor, 'className': 'remove' },
        { 'text':   'Reload', 'className': 'reload',
          'action': function ( e, dt, node, config ) {
            dt.ajax.reload();
          }
        }
      ];
    if ( 'guest' === pc295.Global.USER_ROLE) {
      buttons = guestButtons;
    } else {
      buttons = normalButtons;
    }

    table = $( '#' + table_id).DataTable({
      'dom': 'BHlftipr',
      'ajax': {
        'url': url,
        'type': 'POST'
      },
      'pageLength': 25,
      'select': true,
      'scrollX': true,
      'createdRow': function( row, data, dataIndex ) {
        $( row )
          .attr( 'draggable', 'true' )
          .attr( 'ondragstart', 'pc295.drag(event)' );
          // .attr( 'ondragover', 'pc295.dragover(event)' )
          // .attr( 'ondragleave', 'pc295.dragleave(event)' )
          // .attr( 'ondrop', 'pc295.drop(event)' );
      },
      'columns': [
        { 'data': table_id + '.clause', 'className': 'clause' }, // 0
        { 'data': table_id + '.name', 'className': 'name' }, // 1
        { 'data': table_id + '.notation', 'className': 'notation' }, // 2
        { 'data': null, 'className': 'details-control', // 3
          'orderable': false,
          'defaultContent': '',
          'render': function ( data, type, row ) {
            if ( data.adc_frmt_rprstn.desc ) {
              if ( row.shown ) {
                return '<i class="fa fa-envelope-open" aria-hidden="true" style="display:block; text-align: center;"></i>';
              }
              return '<i class="fa fa-envelope" aria-hidden="true" style="display:block; text-align: center;"></i>';
            }
            return '<i class="fa fa-times" aria-hidden="true" style="display:block; text-align: center;"></i>';
          }
        },
        { 'data': null, 'className': 'editor_edit', // 4
          'defaultContent': '<i class="fa fa-edit" aria-hidden="true"></i>',
          'orderable': false
        }
      ],
      'columnDefs': [
        { 'targets': [ col.Ctrl ],
          'width': '10%', 'searchable': false },
        { 'targets': [ col.Clause, col.Format, col.Notation ],
          'width': '25%', 'searchable': true },
        { 'targets': [ col.Desc ],
          'width': '15%', 'searchable': false }
      ],
      'order': [[ col.Clause, 'asc' ]],
      'buttons': buttons,
      'initComplete': function ( settings, json ) {
        pc295.reportProgress( '#' + table_id);
      }
    });

    $( '#' + table_id)
      .on( 'click', 'td', function ( event ) {
        event.preventDefault();
        event.stopPropagation();
        var
          $tr = $( this ).closest( 'tr' ),
          $td = $( this ).closest( 'td' );
        if ($td.hasClass( 'clause' ) ||
            $td.hasClass( 'name' ) ||
            $td.hasClass( 'notation' )
        ) {
          editor.bubble( this );
        } else if ($td.hasClass( 'editor_edit' )) {
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
            row = table.row( $tr ),
            $icon = $( $tr ).find( 'i.fa-envelope, i.fa-envelope-open' );
          if (0 === $icon.length) {
            return;
          }  
          if ( row.child.isShown() ) { // This row is already open - close it
            row.child.hide();
            $tr.removeClass( 'shown' );
            $icon.removeClass( 'fa-envelope-open' ).addClass( 'fa-envelope' );
          } else { // Open detail row
            var desc =  row.data().adc_frmt_rprstn.desc;
            row.child( pc295.format( table_id, desc ) ).show();
            $tr.addClass( 'shown' );
            $icon.removeClass( 'fa-envelope' ).addClass( 'fa-envelope-open' );
          }
        }
        return false;
      });

    $( '#' + table_id + ' tbody' ).on( 'click', 'tr', function () {
      $tr = $( this ).closest( 'tr' );
      if ( $tr.hasClass( 'selected' ) ) {
        $tr.removeClass( 'selected' );
      }
      else {
        $( '#' + table_id + ' tbody tr' ).removeClass( 'selected' );
        $tr.addClass( 'selected' );
      }
    });

    $( '#' + table_id + '_toggle a.toggle-vis' ).on( 'click', function (e) {
      e.preventDefault();
      var
        clmn = $( this ).data( 'column' ),
        column = table.column( clmn ), // Get the column API object
        visible = column.visible();
      pc295.toggleColumn( table_id, clmn, visible );
    });
  };

  return {
    'initModule': initModule,
    'filterColumn': filterColumn,
    'col': col
  };
}(jQuery));
// adc_frmt_rprstn.js