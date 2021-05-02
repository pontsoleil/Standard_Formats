var ccts_cct = {
  'Amount': {
    'XML':'xsd:decimal', 'JSON':'number' },
  'BinaryObject': {
    'XML':'xsd:base64Binary', 'JSON':'string' },
  'Code': {
    'XML':'xsd:normalizadString', 'JSON':'string' },
  'DateTime': {
    'XML':'xsd:string', 'JSON':'string' },
  'Identifier': {
    'XML':'xsd:normalizadString', 'JSON':'string' },
  'Indicator': {
    'XML':'xsd:string', 'JSON':'string' },
  'Measure': {
    'XML':'xsd:decimal', 'JSON':'number' },
  'Numeric': {
    'XML':'xsd:decimal', 'JSON':'number' },
  'Quantity': {
    'XML':'xsd:decimal', 'JSON':'number' },
  'Text': {
    'XML':'xsd:string', 'JSON':'string' },
  'Name': {
    'XML':'xsd:normalizadString', 'JSON':'string' }
},
content = {
  'adc': {
    'top': 'adc-abie', 'bottom-top': 'adc-entity', 'bottom-bottom': ['adc-entity2', 'adc-udt']
  },
  'adc-cc': {
    'top': 'adc-acc', 'bottom-top': 'adc-cc', 'bottom-bottom': ['adc-cc2', 'adc-cc-udt']
  },
  'xbrlgl': {
    'top': 'xbrlgl-abie', 'bottom-top': 'xbrlgl-entity', 'bottom-bottom': ['xbrlgl-entity2']
  },
  'ads': {
    'top': 'ads-abie', 'bottom-top': 'ads-entity', 'bottom-bottom': ['ads-entity2']
  },
  'ubl': {
    'top': 'ubl-abie', 'bottom-top': 'ubl-entity', 'bottom-bottom': ['ubl-entity2', 'ubl-udt', 'ubl-qdt']
  },
  'bie': {
    'top': 'bie', 'bottom-top': 'bie-compt', 'bottom-bottom': ['bie-compt2', 'uncefact-udt', 'qdt']
  },
  'acc': {
    'top': 'acc', 'bottom-top': 'cc', 'bottom-bottom': ['cc2', 'udt']
  }
},
loaded = {
  'adc': false, 'adc-cc': false, 'xbrlgl': false, 'ads': false, 'ubl': false, 'bie': false, 'acc': false
},
pane = {
  1: null,
  2: null
},
table_title = {
  'adc': {
    'adc-entity': null, 'adc-entity2': null, 'adc-udt': null
  },
  'adc-cc': {
    'adc-cc': null, 'adc-cc2': null, 'adc-cc-udt': null
  },
  'xbrlgl': {
    'xbrlgl-entity': null, 'xbrlgl-entity2': null
  },
  'ads': {
    'ads-entity': null, 'ads-entity2': null
  },
  'ubl': {
    'ubl-entity': null, 'ubl-entity2': null, 'ubl-qd': null, 'ubl-udt': null
  },
  'bie': {
    'bie-compt': null, 'bie-compt2': null, 'qdt': null, 'uncefact-udt': null
  },
  'acc': {
    'cc': null, 'cc2': null, 'udt': null
  }
},
previous_entity = {
  1: null,
  2: null
},
acc_table, cc_table, udt_table, cc2_table,
bie_table, bie_compt_table, bie_compt2_table, qdt_table, uncefact_udt_table,
adc_abie_table, adc_entity_table, adc_entity2_table, adc_udt_table,
adc_abie_COL_Module, adc_abie_COL_ComponentName, adc_abie_COL_DictionaryEntryName,
adc_entity_COL_DictionaryEntryName, adc_entity_COL_ObjectClassTerm,
adc_dt_COL_CategoryCode, adc_dt_COL_ObjectClassTerm, adc_dt_COL_DictionaryEntryName, adc_dt_COL_DataType,
adc_acc_table, adc_cc_table, adc_cc2_table, adc_cc_udt_table,
adc_acc_COL_Module, adc_acc_COL_ComponentName, adc_acc_COL_DictionaryEntryName,
adc_cc_COL_DictionaryEntryName, adc_cc_COL_ObjectClassTerm,
adc_cc_dt_COL_CategoryCode, adc_cc_dt_COL_ObjectClassTerm, adc_cc_dt_COL_DictionaryEntryName, adc_cc_dt_COL_DataType,
xbrlgl_abie_table, xbrlgl_entity_table, xbrlgl_entity2_table,
xbrlgl_abie_COL_ComponentName, xbrlgl_abie_COL_ObjectClassTerm, xbrlgl_abie_COL_DictionaryEntryName,
xbrlgl_entity_COL_DictionaryEntryName, xbrlgl_entity_COL_ObjectClassTerm, //xbrlgl_entity_COL_num,
ads_abie_table, ads_entity_table, ads_entity2_table,
acc_COL_ObjectClassTerm, cc_COL_ObjectClassTerm, cc_COL_PropertyTerm, cc_COL_ShortName,
dt_COL_DataType, dt_COL_DictionaryEntryName,
bie_COL_ObjectClassTerm,
bie_compt_COL_DictionaryEntryName, bie_compt_COL_ShortName,
qdt_COL_UNID,
ubl_abie_table, ubl_abie_COL_ComponentName, ubl_abie_COL_DictionaryEntryName,
ubl_entity_table, ubl_entity_COL_DictionaryEntryName, ubl_entity_COL_ObjectClassTerm,
ubl_udt_table, ubl_dt_COL_CategoryCode, ubl_dt_COL_DictionaryEntryName,
ubl_acc_table, ubl_cc_table, ubl_un_udt_table, ubl_cc2_table,
adcMap, adcAccMap, xbrlglMap, adsMap, ublMap, bieMap, accMap,
adcEntityMap, adcCcMap, xbrlglEntityMap, adsEntityMap, ublEntityMap, bieComptMap, ccMap,
adcRows, adcAccRows, xbrlglRows, adsRows, ublRows, bieRows, abie,
adcEntityRows, adcCcRows, xbrlglEntityRows, adsEntityRows, ublEntityRows, bieComptRows, bie,
populateAdc, populateAdcAcc, populateXbrlgl, populateAds, populateUbl, populateBie, populateAcc,
getTopTable, getTopTableID, getEntityTable, getEntityTableID;
// -----------------------------------------------------------------
// TAB MENU
//
function hideOverlay() {
  $('.overlay').addClass('d-none');
}
function showOverlay(pane, autoclose, title_html) {
  var frame1, frame2, frameTitle1, frameTitle2, title_html;
  if (!title_html) {
    if (pane[1] && pane[1].length > 0) {
      title_html = 'Loading ...';
      frame1 = pane[1];
      if (['bie', 'acc'].indexOf(frame1) >= 0) {
        frameTitle1 = $('#uncefact-title');
      }
      else {
        frameTitle1 = $('#'+frame1+'-title');
      }
      title_html = frameTitle1.html().trim();
    }
    else {
      title_html = '';
    }
    if (pane[2] && pane[2].length > 0) {
      frame2 = pane[2];
      if (['bie', 'acc'].indexOf(frame2) >= 0) {
        frameTitle2 = $('#uncefact-title');
      }
      else {
        frameTitle2 = $('#'+frame2+'-title');
      }
      title_html = (title_html
        ? title_html+'<br>vs<br>'
        : '')+
        frameTitle2.html().trim();
    }
  }
  $('.overlay').removeClass('d-none');
  $('.overlay .title').html(title_html);
  if (autoclose) {
    setTimeout(function() {
      hideOverlay();
    }, 5000);
  }
}
function setFrame(num, frame) {
  var frame, match, overlay, title, frameTitle, title_html, root_pane, id, base;
  var top_component, bottom_top_component, bottom_bottom_component;
  var top_content, bottom_top_content, bottom_bottom_content;
  var root_pane, frames, children, child, i;

  if ('adc-cc' !== frame) {
    match = frame.match(/^(([^-]*)-)?(.*)$/);
    frame = match[2] || match[3];
  }
  pane[num] = frame;

  showOverlay(pane, /** autoclose */true);

  // save table title
  for (table in table_title[frame]) {
    title = $('#'+table+'-frame .table-title').text();
    if (!table_title[frame][table]) {
      table_title[frame][table] = title;
    }
  }

  $('#component-'+num+' .split-pane').splitPane('lastComponentSize', 0);

  $('#tab-'+num+' .tablinks').removeClass('active');
  $('#tab-'+num+' .tablinks.'+frame).addClass('active');
  if ('adc' === frame) {
    adc_abie_table.columns(adc_abie_COL_Module)
    .search('^((?!(Core)).)*$', /*regex*/true, /*smart*/false, /*caseInsen*/false).draw();
  }
  // else if ('adc-cc' === frame) {

  // }
  else if ('xbrlgl' === frame) {
    xbrlgl_abie_table.columns(xbrlgl_abie_COL_ObjectClassTerm)
    .search('^Accounting Entries$', /*regex*/true, /*smart*/false, /*caseInsen*/false).draw();
  }
  else if ('ads' === frame) {
    ads_abie_table.column(ads_abie_COL_Table)
    .search('^.+$', /*regex*/true, /*smart*/false, /*caseInsen*/false).draw();
  }
  // else if ('ubl' === frame) {
  //   ubl_abie_table.column(ubl_abie_COL_DictionaryEntryName)
  //   .search('Line\. Details$', /*regex*/true, /*smart*/false, /*caseInsen*/false).draw();
  // }
  root_pane = $('#root');
  root_pane.removeClass('d-none');
  // save current content to backup.
  // top
  top_component = $('#top-component-'+num);
  if (top_component.children().length > 0) {
    child = top_component.children();
    if (child.length > 0) {
      id = child.attr('id');
      match = id.match(/^(.*)-frame$/);
      base = $('#'+match[1]+'-container');
      base.append(child);
    }
  }
  top_component.empty();
  top_content = $('#'+content[frame]['top']+'-frame');
  top_component.append(top_content);
  // bottom-top
  bottom_top_component = $('#bottom-top-component-'+num);
  base = $('#'+content[frame]['bottom-top']+'-container');
  if (bottom_top_component.children().length > 0) {
    child = bottom_top_component.children();
    if (child.length > 0) {
      id = child.attr('id');
      match = id.match(/^(.*)-frame$/);
      if (match) {
        base = $('#'+match[1]+'-container');
        base.append(child);
      }
    }
  }
  bottom_top_component.empty();
  bottom_top_content = $('#'+content[frame]['bottom-top']+'-frame');
  bottom_top_component.append(bottom_top_content);
  var back_control = $('#back-'+num);
  back_control.addClass('d-none');
  bottom_top_component.append(back_control);
  // bottom-bottom
  bottom_bottom_component = $('#bottom-bottom-component-'+num);
  children = bottom_bottom_component.children();
  for (i = 0; i < children.length; i++) {
    child = $(children[i]);
    if (child.length > 0) {
      id = child.attr('id');
      match = id.match(/^(.*)-frame$/);
      if (match) {
        base = $('#'+match[1]+'-container');
        base.append(child);
      }
    }
  }
  bottom_bottom_component.empty();
  for (i = 0; i < content[frame]['bottom-bottom'].length; i++) {
    bottom_bottom_content = $('#'+content[frame]['bottom-bottom'][i]+'-frame');
    bottom_bottom_component.append(bottom_bottom_content);
  }
  var up_control = $('#up-'+num);
  up_control.addClass('d-none');
  bottom_bottom_component.append(up_control);
}
// reset
function resetFilter() {
  var pane_1 = pane[1], pane_2 = pane[2];
  location.replace(location.href+'?t1='+pane_1+'&t2='+pane_2);
}
// collapse panel
function collapse(num) {
  switch (num) {
    case 1:
      $('div.split-pane').splitPane('lastComponentSize', 0);
      break;
    case 2:
      $('div.split-pane').splitPane('firstComponentSize', 0);
      break;
  }
}
$('#collapse-1').on('click', function(event) {
event.stopPropagation();
collapse(1);
});
$('#collapse-2').on('click', function(event) {
event.stopPropagation();
collapse(2);
});
// -----------------------------------------------------------------
// Formatting function for row details
//
var H1 = 30, H2 = 70, Q1 = 25, Q2 = 25, Q3 = 25, Q4 = 25;
function adc_entity_format(d) { // d is the original data object for the row
  if (!d) { return null; }
  const capitalize = function(s) {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }
  const pad = function(num, size) {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
  }
  var html, name, key, nameC3, cct, xml, json, match, description;
  var Abbreviation = {
    'Account': 'ACC',
    'Audit Data Collection Standard': 'ADCS',
    'Adjustment': 'ADJ',
    'Accounts Payable': 'AP',
    'Accounts Receivable': 'AR',
    'American Standard Code for Information Interchange': 'ASCII',
    'Base': 'BAS',
    'Beginning': 'BEG',
    'Business Identifier Code': 'BIC',
    'Chief Financial Officer': 'CFO',
    'Chinese Yuan': 'CNY',
    'Carriage-Return Line-Feed': 'CRLF',
    'Comma Separated Values': 'CSV',
    'Currency': 'CUR',
    'Customer': 'CUS',
    'Enterprise Resource Management': 'ERM',
    'Enterprise Resource Planning': 'ERP',
    'Euro': 'EUR',
    '"First In, First Out"': 'FIFO',
    'Free On Board': 'FOB',
    'Financial Statement': 'FS',
    'Gigabyte': 'GB',
    'General Ledger': 'GL',
    'International Bank Account Number': 'IBAN',
    'Industrial and Commercial Bank of China': 'ICBC',
    'Identification': 'ID',
    'Inventory': 'INV',
    'Information Technology': 'IT',
    'Journal Entry': 'JE',
    'Legal Entity Identifier': 'LEI',
    '"Last In, First Out"': 'LIFO',
    'Microsoft Disk Operating System': 'MS-DOS',
    'New Technology File System': 'NTFS',
    'Number': 'NUM',
    'New York State': 'NY',
    'Organization': 'ORG',
    'Operating System': 'OS',
    'Primary Key': 'PK',
    'Purchase Order': 'PO',
    '"Property, Plant and Equipment"': 'PPE',
    'Province': 'PRV',
    'Purchase': 'PUR',
    'Reference Identifier': 'REF',
    'Request For Comments': 'RFC',
    'Sales': 'SAL',
    'Systems Applications and Products in data processing': 'SAP',
    'Structured Query Language': 'SQL',
    'Terabytes': 'TB',
    'Tax Identification Number': 'TIN',
    'Transactional': 'TRX',
    'Transaction': 'TRX',
    'Unit of Measurement': 'UOM',
    'United States of America': 'US',
    'U.S. Dollars': 'USD',
    'Coordinated Universal Time': 'UTC',
    '8-bit Unicode Transformation Format': 'UTF-8',
    'Work In Progress': 'WIP'
  };
  name = 'ABIE' === d.Kind
    ? d.DictionaryEntryName.match(/^([^_\.]*_ )?([^\.]+)\. .*$/)[2]
    : d.Name
      ? d.Name
      : d.PropertyTerm+' '+d.RepresentationTerm;
  for (key in Abbreviation) {
    var abbrev = Abbreviation[key],
        regx = RegExp(key),
        match = name.match(regx);
    if (match) {
      name = name.replace(regx, abbrev);
    }
  }
  name = name.replace(/ /g, '_');
  nameC3 = name.split('_');
  nameC3 = nameC3.map(function(n) { capitalize(n); }).join('');

  cct = ccts_cct[d.RepresentationTerm];
  xml = cct ? cct.XML : null;
  json = cct ? cct.JSON : null;

  description = d.Description;
  match = description.match(/^(.*)(Shall match .* table.)(.*)$/);
  if (match) {
    description = match[1]+match[3];
  }
  match = description.match(/^(.*)(Otherwise set NULL.)(.*)$/);
  if (match) {
    description = match[1]+match[3];
  }
  match = description.match(/^(.*)(Typically auto-generated by the system.)(.*)$/);
  if (match) {
    description = match[1]+match[3];
  }
  description = description.replace(/ (is|are) contained in Table [0-9]+/g, '');
  description = description.replace(/EXAMPLE/g, '<br><span style="font-size:smaller">EXAMPLE</span><br>');
  description = description.replace(/\(Table [0-9]+\) /g, '');

  html = '<table cellpadding="4" cellspacing="0" border="0" style="width:100%; padding-left:16px;">'+
  '<colgroup>'+
    '<col span="1" style="width: '+H1+'%;">'+
    '<col span="1" style="width: '+H2+'%;">'+
  '</colgroup>'+
  (description ? '<tr><td colspan="2">'+description+'</td><tr>' : '')+
  '<tr><td>Dictionary Entry Name:</td>'+
      '<td>'+(d.DictionaryEntryName ? d.DictionaryEntryName : '</td><td>')+'</td></tr>'+
  (d.ObjectClassTerm
    ? '<tr><td>&nbsp;&nbsp;Object Class Term:</td>'+
      '<td>'+(d.ObjectClassTermQualifier ? d.ObjectClassTermQualifier+'_ ' : '')+d.ObjectClassTerm+'</td></tr>'
    : ''
  )+
  ('ABIE' === d.Kind
    ? '<tr><td>CSV</td><td>'+d.Table+'</td></tr>'+
        '<tr><td>XML</td><td>'+nameC3+'</td></tr>'+
        '<tr><td>JSON</td><td>'+nameC3+'</td></tr>'
    : (d.PropertyTerm
        ? '<tr><td style="font-size:smaller">&nbsp;&nbsp;Property Term:</td>'+
          '<td>'+(d.PropertyTermQualifier ? d.PropertyTermQualifier+'_ ' : '')+' '+d.PropertyTerm+'</td></tr>'
        : '')+
      (d.RepresentationTerm
        ? '<tr><td style="font-size:smaller">&nbsp;&nbsp;Representation Term:</td><td>'+d.RepresentationTerm+'</td></tr>'
        : '')+
      (d.AssociatedObjectClass
        ? '<tr><td style="font-size:smaller">&nbsp;&nbsp;Associated Object Class:</td>'+
          '<td>'+
            (d.AssociatedObjectClassTermQualifier ? d.AssociatedObjectClassTermQualifier+'_ ' : '')+
            d.AssociatedObjectClass+
          '</td></tr>'
        : '')+
      (d.UsageRule
        ? '<tr><td style="font-size:smaller">Usage Rule:</td><td>'+d.UsageRule+'</td></tr>'
        : '')+
      (d.Datatype
        ? '<tr><td>CSV</td><td>name: '+name+'</td></tr>'+
          (d.PK_REF
            ? '<tr><td></td>'+
              '<td>'+d.PK_REF+' '+(d.RefField ? d.RefField+' ( '+d.RefTable+' )' : '')+'</td></tr>'
            : '')+
          '<tr><td></td><td>data type: '+d.Datatype+'&nbsp;&nbsp;( '+d.Representation+' )'+(d.Occurence ? '&nbsp;&nbsp;occurence: '+d.Occurence+'</td></tr>' : '')
        : '')+
      '<tr><td>XML</td><td>name: '+nameC3+
      (d.RepresentationTerm
        ? ' Datatype: ccts-cct:'+d.RepresentationTerm+'Type'+(xml ? '&nbsp;&nbsp;( base: '+xml+' )' : '( complexType )')+'</td></tr>'
        : ' ( complexType )</td></tr>')+
      '<tr><td>JSON</td><td>name: '+nameC3+(json ? '&nbsp;&nbsp;( Datatype: '+json+' )' : '&nbsp;&nbsp;( Datatype: object )')+'</td></tr>'+
      '<tr><td>XBRL GL</td><td>'+(d.XBRLGL ? d.XBRLGL : 'TBD')+'</td></tr>'
  )+
  '</table>';
  return html;
}
function adc_dt_format(d) { // d is the original data object for the row
  if (!d) { return null; }
  var cct, xml, json, html;
  cct = ccts_cct[d.ObjectClassTerm];
  xml = cct ? cct.XML : null;
  json = cct ? cct.JSON : null;
  html = '<table cellpadding="4" cellspacing="0" border="0" style="width:100%; padding-left:16px;">'+
  '<colgroup>'+
  '<col span="1" style="width: '+H1+'%;">'+
  '<col span="1" style="width: '+H2+'%;">'+
  '</colgroup>'+
  (d.Description
    ? '<tr><td colspan="2">'+d.Description+'</td><tr>'
    : '')+
  '<tr><td>'+(d.UNID ? d.UNID : 'Dictionary Entry Name:')+'</td>'+
  '<td>'+d.DictionaryEntryName+'</td></tr>'+
  (d.PropertyTerm
    ? '<tr><td style="font-size:smaller">&nbsp;&nbsp;Property Term:</td><td>'+d.PropertyTerm+'</td></tr>'
    : '')+
  (d.RepresentationTerm
    ? '<tr><td style="font-size:smaller">&nbsp;&nbsp;Representation Term:</td><td>'+
      (d.DatatypeQualifier ? d.DatatypeQualifier+'_ ' : '')+d.RepresentationTerm+'</td></tr>'
    : '')+
  ('CC' === d.Kind
    ? '<tr><td>XML</td><td>data type: ccts-cct:'+d.ObjectClassTerm+'Type&nbsp;&nbsp;(base:'+xml+')</td></tr>'+
      '<tr><td>JSON</td><td>data type: '+(json ? json : '')+'</td></tr>'
    : ''
  )+
  (d.Enumeration
  ? '<tr><td style="font-size:smaller">Enumeration:</td><td>'+d.Enumeration+'</td></tr>'
  : '')+
  (d.RestrictionValue
  ? '<tr><td style="font-size:smaller">Restriction Value:</td><td>'+d.RestrictionValue+'</td></tr>'
  : '')+
  '</table>';
  return html;
}
function xbrlgl_entity_format(d) { // d is the original data object for the row
  if (!d) { return null; }
  var html;
  html = '<table cellpadding="4" cellspacing="0" border="0" style="width:100%; padding-left:16px;">'+
  '<colgroup>'+
  '<col span="1" style="width: '+H1+'%;">'+
  '<col span="1" style="width: '+H2+'%;">'+
  '</colgroup>'+
  (d.Description
    ? '<tr><td colspan="2">'+d.Description+'</td><tr>'
    : '')+
  (d.ObjectClassTerm
  ? '<tr><td style="font-size:smaller">&nbsp;&nbsp;Object Class Term:</td>'+
    '<td>'+
    (d.ObjectClassTermQualifier ? d.ObjectClassTermQualifier+'_ ' : '')+
    d.ObjectClassTerm+'</td></tr>'
  : '')+
  (d.PropertyTerm
  ? '<tr><td style="font-size:smaller">&nbsp;&nbsp;Property Term:</td>'+
    '<td>'+
      (d.PropertyTermQualifier ? d.PropertyTermQualifier+'_ ' : '')+d.PropertyTerm+
    '</td></tr>'
  : '')+
  (d.RepresentationTerm
  ? '<tr><td style="font-size:smaller">&nbsp;&nbsp;Representation Term:</td>'+
    '<td>'+d.RepresentationTerm+'</td></tr>'
  : '')+
  (d.AssociatedObjectClass
  ? '<tr><td style="font-size:smaller">&nbsp;&nbsp;Associated Object Class:</td>'+
    '<td>'+
      (d.AssociatedObjectClassTermQualifier
        ? d.AssociatedObjectClassTermQualifier+'_ '
        : '')+
      d.AssociatedObjectClass+
    '</td></tr>'
  : '')+
  '<tr><td>XBRL GL</td><td>'+
  (d.Name
    ? /*'gl-'+*/table_id.Name.trim()+' '+(d.Datatype ? '(xsd:'+d.Datatype+')' : '')
    : '')+'</td></tr>'+
  '</table>';
  return html;
}
function ads_entity_format(d) { // d is the original data object for the row
  if (!d) { return null; }
  var match,
      description = d.Description,
      xbrlgl = d.XBRLGL,
      html;
  match = description.match(/^'(.*)'$/);
  if (match) {
    description = match[1];
  }
  description = description.replace(/''/g,'"');
  description = description.replace(/(_YYYYMMDD_YYYYMMDD|_YYYYMMDD)/g, '');
  description = description.replace(/_/g, ' ');
  match = xbrlgl.match(/^'(.*)'$/);
  if (match) {
    xbrlgl = match[1];
  }
  xbrlgl = xbrlgl.replace(/''/g,'"');
  html = '<table cellpadding="4" cellspacing="0" border="0" style="width:100%; padding-left:16px;">'+
  '<colgroup>'+
  '<col span="1" style="width: '+H1+'%;">'+
  '<col span="1" style="width: '+H2+'%;">'+
  '</colgroup>'+
  (description ? '<tr><td colspan="2">'+description+'</td><tr>' : '')+
  '<tr><td style="font-size:smaller">Dictionary Entry Name:</td><td>'+d.DictionaryEntryName+'</td><tr>'+
  '<tr><td style="font-size:smaller">&nbsp;&nbsp;object class term:</td>'+
    '<td>'+
    (d.ObjectClassTermQualifier
      ? d.ObjectClassTermQualifier+'_ '
      : '')+
    d.ObjectClassTerm+'</td><tr>'+
  (d.PropertyTerm
    ? '<tr><td style="font-size:smaller">&nbsp;&nbsp;Property Term:</td>'+
        '<td>'+
        (d.PropertyTermQualifier
          ? d.PropertyTermQualifier+'_ '
          : '')+
        d.PropertyTerm+'</td><tr>'
    : '')+
  ("BBIE" === d.Kind
    ? '<tr><td style="font-size:smaller">&nbsp;&nbsp;Representation Term:</td>'+
        '<td>'+
        (d.DatatypeQualifier
          ? d.DatatypeQualifier+'_ '
          : '')+
        d.RepresentationTerm+'</td><tr>'
    : '')+
  ("ASBIE" === d.Kind
    ? '<tr><td style="font-size:smaller">&nbsp;&nbsp;Associated Object Class:</td>'+
          '<td>'+d.AssociatedObjectClass+'</td></tr>'
    : '')+
  (d.DataType
    ? '<tr><td>Data Type:</td>'+
        '<td>'+d.DataType+(d.Length ? ' (Length: '+d.Length+')' : '')+'</td></tr>'
    : '')+
  (xbrlgl
    ? '<tr><td>XBRL GL</td><td>'+xbrlgl+'</td></tr>'
    : '')+
  '</table>';
  return html;
}
function acc_format(d) { // d is the original data object for the row
  if (!d) { return null; }
  var html;
  html = '<table cellpadding="4" cellspacing="0" border="0" style="width:100%; padding-left:16px;">'+
  '<colgroup>'+
  '<col span="1" style="width: '+H1+'%;">'+
  '<col span="1" style="width: '+H2+'%;">'+
  '</colgroup>'+
  (d.Definition ? '<tr><td colspan="2">'+d.Definition+'</td><tr>' : '')+
  '<tr><td>'+d.UniqueID+'</td><td>'+d.DictionaryEntryName+'</td></tr>'+
  '</table>';
  return html;
}
function cc_format(d) { // d is the original data object for the row
  if (!d) { return null; }
  var html;
  html = '<table cellpadding="4" cellspacing="0" border="0" style="width:100%; padding-left:16px;">'+
  '<colgroup>'+
  '<col span="1" style="width: '+H1+'%;">'+
  '<col span="1" style="width: '+H2+'%;">'+
  '</colgroup>'+
  (d.Definition ? '<tr><td colspan="2">'+d.Definition+'</td><tr>' : '')+
  '<tr>'+
  '<td>'+d.UniqueID+'</td>'+
  '<td>'+
    ('BCC' === d.Kind
      ? d.ObjectClassTerm+'. '+d.PropertyTerm+'. '+d.RepresentationTerm
      : d.ObjectClassTerm+'. '+d.PropertyTerm+'. '+d.AssociatedObjectClass+'</td>')+
  '</tr>'+
  (d.ObjectClassTerm
    ? '<tr><td style="font-size:smaller">&nbsp;&nbsp;Object Class Term:</td><td>'+d.ObjectClassTerm+'</td></tr>'
    : '')+
  (d.PropertyTerm
    ? '<tr><td style="font-size:smaller">&nbsp;&nbsp;Property Term:</td><td>'+d.PropertyTerm+'</td></tr>'
    : '')+
  ('BCC' === d.Kind && d.RepresentationTerm
    ? '<tr><td style="font-size:smaller">&nbsp;&nbsp;Representation Term:</td><td>'+d.RepresentationTerm+'</td></tr>'
    : '')+
  ('ASCC' === d.Kind && d.AssociatedObjectClass
    ? '<tr><td style="font-size:smaller">&nbsp;&nbsp;Associated Object Class:</td><td>'+d.AssociatedObjectClass+'</td></tr>'
    : '')+
  '</table>';
  return html;
}
function dt_format(d) { // d is the original data object for the row
  if (!d) { return null; }
  return '<table cellpadding="4" cellspacing="0" border="0" style="width:100%; padding-left:16px;">'+
  '<tr><td>'+d.Definition+'</td></tr>'+
  '</table>';
}
function bie_format(d) { // d is the original data object for the row
  if (!d) { return null; }
  var html;
  html = '<table cellpadding="4" cellspacing="0" border="0" style="width:100%; padding-left:16px;">'+
  '<colgroup>'+
  '<col span="1" style="width: '+Q1+'%;">'+
  '<col span="1" style="width: '+Q2+'%;">'+
  '<col span="1" style="width: '+Q3+'%;">'+
  '<col span="1" style="width: '+Q4+'%;">'+
  '</colgroup>'+
  (d.Definition ? '<tr><td colspan="4">'+d.Definition+'</td><tr>' : '')+
  '<tr><td>'+d.UniqueID+'</td><td colspan="3">'+d.DictionaryEntryName+'</td></tr>'+
  (d.Publicationcomments
    ? '<tr><td style="font-size:smaller">Publication Comments:</td><td colspan="3">'+d.Publicationcomments+'</td></tr>'
    : '')+
  (d.AssociatedObjectClass
    ? '<tr><td style="font-size:smaller">Associated Object Class:</td>'+
        '<td colspan="3">'+
        (d.AssociatedObjectClassTermQualifier
          ? d.AssociatedObjectClassTermQualifier+'_ '
          : '')+
        d.AssociatedObjectClass+
        '</td></tr>'
    : '')+
  (d.QualifiedDataTypeUID
    ?  '<tr><td style="font-size:smaller">Qualified Datatype UID:</td>'+
        '<td colspan="3">'+d.QualifiedDataTypeUID+'</td></tr>'
    : '')+
  (d.BusinessTerm
    ? '<tr><td style="font-size:smaller">Business Term:</td><td colspan="3">'+d.BusinessTerm+'</td></tr>'
    : '')+
  (d.UsageRule
    ? '<tr><td  style="font-size:smaller">Usage Rule:</td><td colspan="3">'+d.UsageRule+'</td></tr>'
    : '')+
  (d.BusinessProcess
    ? '<tr><td style="font-size:smaller">Business Process:</td><td colspan="3">'+d.BusinessProcess+'</td></tr>'
    : '')+
  (d.Product
    ? '<tr><td style="font-size:smaller">Product:</td><td colspan="3" >'+d.Product+'</td></tr>'
    : '')+
  '<tr><td style="font-size:smaller">Industry:</td><td>'+(d.Industry ?  d.Industry : '')+'</td>'+
    '<td style="font-size:smaller">Region(Geopolitical):</td><td>'+(d.RegionGeopolitical ? d.RegionGeopolitical : '')+'</td>'+
  '</tr>'+
  '<tr><td style="font-size:smaller">Official Constraints:</td><td>'+(d.OfficialConstraints ? d.OfficialConstraints : '')+'</td>'+
    '<td style="font-size:smaller">Role:</td><td>'+(d.Role ? d.Role : '')+'</td>'+
  '</tr>'+
  (d.SupportingRole
    ? '<tr><td style="font-size:smaller">Supporting Role:</td><td colspan="3">'+d.SupportingRole+'</td></tr>'
    : '')+
  (d.SystemConstraints
    ? '<tr><td style="font-size:smaller">System Constraints:</td><td colspan="3">'+d.SystemConstraints+'</td></tr>'
    : '')+
  (d.Example
    ? '<tr><td style="font-size:smaller">Example:</td><td colspan="3">'+d.Example+'</td></tr>'
    : '')+
  '</table>';
  return html;
}
function bie_compt_format(d) { // d is the original data object for the row
  if (!d) { return null; }
  var html;
  html = '<table cellpadding="4" cellspacing="0" border="0" style="width:100%; padding-left:16px;">'+
  '<colgroup>'+
  '<col span="1" style="width: '+Q1+'%;">'+
  '<col span="1" style="width: '+Q2+'%;">'+
  '<col span="1" style="width: '+Q3+'%;">'+
  '<col span="1" style="width: '+Q4+'%;">'+
  '</colgroup>'+
  (d.Definition ? '<tr><td colspan="4">'+d.Definition+'</td><tr>' : '')+
  '<tr><td>'+d.UniqueID+'</td><td colspan="3">'+d.DictionaryEntryName+'</td></tr>'+
  (d.Publicationcomments
    ? '<tr><td style="font-size:smaller">Publication Comments:</td><td colspan="3">'+d.Publicationcomments+'</td></tr>'
    : '')+
  (d.AssociatedObjectClass
    ? '<tr><td style="font-size:smaller">Associated Object Class:</td>'+
      '<td colspan="3">'+
      (d.AssociatedObjectClassTermQualifier
        ? d.AssociatedObjectClassTermQualifier+'_ '
        : '')+d.AssociatedObjectClass
    : '')+'</td></tr>'+
  (d.QualifiedDataTypeUID
    ?  '<tr><td style="font-size:smaller">Qualified Datatype UID:</td>'+
        '<td colspan="3">'+d.QualifiedDataTypeUID
    : '')+'</td></tr>'+
  (d.BusinessTerm
    ? '<tr><td style="font-size:smaller">Business Term:</td><td colspan="3">'+d.BusinessTerm+'</td></tr>'
    : '')+
  (d.UsageRule
    ? '<tr><td  style="font-size:smaller">Usage Rule:</td><td colspan="3">'+d.UsageRule+'</td></tr>'
    : '')+
  (d.BusinessProcess
    ? '<tr><td style="font-size:smaller">Business Process:</td><td colspan="3">'+d.BusinessProcess+'</td></tr>'
    : '')+
  (d.Product
    ? '<tr><td style="font-size:smaller">Product:</td><td colspan="3" >'+d.Product+'</td></tr>'
    : '')+
  '<tr><td style="font-size:smaller">Industry:</td><td>'+(d.Industry ? d.Industry : '')+'</td>'+
    '<td style="font-size:smaller">region(Geopolitical):</td><td>'+(d.RegionGeopolitical ? +d.RegionGeopolitical : '')+'</td>'+
  '</tr>'+
  '<tr><td style="font-size:smaller">Official Constraints:</td><td>'+(d.OfficialConstraints ? d.OfficialConstraints : '')+'</td>'+
    '<td style="font-size:smaller">Role:</td><td>'+(d.Role ? d.Role : '')+'</td>'+
  '</tr>'+
  (d.SupportingRole
    ? '<tr><td style="font-size:smaller">Supporting Role:</td><td colspan="3">'+d.SupportingRole+'</td></tr>'
    : '')+
  (d.SystemConstraints
    ? '<tr><td style="font-size:smaller">System Constraints:</td><td colspan="3">'+d.SystemConstraints+'</td></tr>'
    : '')+
  (d.Example
    ? '<tr><td style="font-size:smaller">Example:</td><td colspan="3">'+d.Example+'</td></tr>'
    : '')+
  '</table>';
  return html;
}
function qdt_format(d) { // d is the original data object for the row
  if (!d) { return null; }
  var html;
  html = '<table cellpadding="4" cellspacing="0" border="0" style="width:100%; padding-left:16px;">'+
  '<colgroup>'+
  '<col span="1" style="width: '+H1+'%;">'+
  '<col span="1" style="width: '+H2+'%;">'+
  '</colgroup>'+
  (d.ObjectClassTerm
    ? '<tr><td style="font-size:smaller">&nbsp;&nbsp;Object Class Term:</td><td>'+
      (d.ObjectClassTermQualifier ? d.ObjectClassTermQualifier+'_ ' : '')+
      d.ObjectClassTerm+'</td></tr>'
    : '')+
  (d.PropertyTerm
    ? '<tr><td style="font-size:smaller">&nbsp;&nbsp;Property Term:</td><td>'+d.PropertyTerm+'</td></tr>'
    : '')+
  (d.RepresentationTerm
    ? '<tr><td style="font-size:smaller">&nbsp;&nbsp;Representation Term:</td><td>'+
      (d.DatatypeQualifier ? d.DatatypeQualifier+'_ ' : '')+d.RepresentationTerm+'</td></tr>'
    : '')+
  (d.Enumeration
    ? '<tr><td style="font-size:smaller">Enumeration:</td><td>'+d.Enumeration+'</td></tr>'
    : '')+
  (d.RestrictionValue
    ? '<tr><td style="font-size:smaller">Restriction Value:</td><td>'+d.RestrictionValue+'</td></tr>'
    : '')+
  '</table>';
  return html;
}
function ubl_entity_format(d) { // d is the original data object for the row
  if (!d) { return null; }
  var html;
  html = '<table cellpadding="4" cellspacing="0" border="0" style="width:100%; padding-left:16px;">'+
  '<colgroup>'+
  '<col span="1" style="width: '+H1+'%;">'+
  '<col span="1" style="width: '+H2+'%;">'+
  '</colgroup>'+
  (d.Definition ? '<tr><td colspan="2">'+d.Definition+'</td><tr>' : '')+
  '<tr><td style="font-size:smaller">'+
  (d.DictionaryEntryName
    ? 'Dictionary Entry Name:</td><td>'+d.DictionaryEntryName
    : '</td><td>')+
  '</td></tr>'+
  (d.PrimitiveType
    ? '<tr><td>Primitive Type:'+d.PrimitiveType+'</td><td>'+
      (d.base ? ' base:'+d.base : '')+'</td></tr>'
    : '')+
  (d.ObjectClass
    ? '<tr><td style="font-size:smaller">&nbsp;&nbsp;Object Class Term:</td><td>'+
      (d.ObjectClassQualifier ? d.ObjectClassQualifier+'_ ' : '')+
      d.ObjectClass+'</td></tr>'
    : '')+
  (d.PropertyTerm
    ? '<tr><td style="font-size:smaller">&nbsp;&nbsp;Property Term:</td><td>'+
      (d.PropertyTermQualifier ? d.PropertyTermQualifier+'_ ' : '')+
      d.PropertyTerm+'</td></tr>'
    : '')+
  ('BBIE' === d.ComponentType && d.RepresentationTerm
    ? '<tr><td style="font-size:smaller">&nbsp;&nbsp;Representation Term:</td><td>'+
      (d.DataTypeQualifier ? d.DataTypeQualifier+'_ ' : '')+' '+d.RepresentationTerm+'</td></tr>'
    : '')+
  ('BBIE' === d.ComponentType && d.DataType
    ? '<tr><td style="font-size:smaller">&nbsp;&nbsp;Datatype:</td><td>'+
      (d.DataType ? d.DataType : '')+'</td></tr>'
    : '')+
  ('ASBIE' === d.ComponentType && d.AssociatedObjectClass
    ? '<tr><td style="font-size:smaller">&nbsp;&nbsp;Associated Object Class:</td><td>'+
      (d.AssociatedObjectClassTermQualifier ? d.AssociatedObjectClassTermQualifier+'_ ' : '')+
      d.AssociatedObjectClass+'</td></tr>'
    : '')+
  (d.UsageRule
    ? '<tr><td style="font-size:smaller">&nbsp;&nbsp;Usage Rule:</td><td>'+d.UsageRule+'</td></tr>'
    : '')+
  '</table>';
  return html;
}
function ubl_dt_format(d) { // d is the original data object for the row
  if (!d) { return null; }
  var uniqueID = d.UniqueID;
  var num = uniqueID.match(/^(UBLUDT|UNDT)([0-9]*)/);
  var found;
  if (num) {
  var regx = 'UNDT'+num[2];
  found = ubl_udt_table.data().filter(function(d) { d.UniqueID.match(regx); });
  }
  var related = '';

  function appendByID(items, item) {
    if (!item.UniqueID) { return null; }
    var i;
    if (items instanceof Array && item) {
      var len = items.length;
      for (i = 0; i < len; i++) {
        if (items[i].UniqueID && item.UniqueID === items[i].UniqueID) {
          items.splice(i, 1);
          items.push(item);
          return items;
        }
      }
      items.push(item);
      return items;
    }
    return null;
  };

  var foundArray = [];
  for (var i = 0; i < found.length; i++) {
    var _d = found[i];
    foundArray = appendByID(foundArray, _d);
  }
  foundArray.sort(function(a,b) {
    return a.UniqueID < b.UniqueID;
  });

  for (var i = 0; i < foundArray.length; i++) {
    var _d = foundArray[i];
    related += 
      '<tr><td>'+_d.UniqueID+'</td><td>'+_d.CategoryCode+'_ '+_d.DictionaryEntryName+'</td></tr>'+
      '<tr><td style="font-size:smaller">&nbsp;&nbsp;&nbsp;Name:</td><td>'+_d.name+'</td></tr>'+
      '<tr><td style="font-size:smaller">&nbsp;&nbsp;&nbsp;Definition:</td><td>'+_d.Definition+'</td></tr>'+
      (_d.UsageRule
        ? '<tr><td style="font-size:smaller">&nbsp;&nbsp;&nbsp;Usage Rule:</td><td>'+_d.UsageRule+'</td></tr>'
        : '')+
      (_d.ObjectClass
        ? '<tr><td style="font-size:smaller">&nbsp;&nbsp;&nbsp;Object Class Term:</td><td>'+_d.ObjectClass+'</td></tr>'
        : '')+
      (_d.PropertyTermName
        ? '<tr><td style="font-size:smaller">&nbsp;&nbsp;&nbsp;Property Term:</td><td>'+_d.PropertyTermName+'</td></tr>' : '')+
      (_d.RepresentationTermName
        ? '<tr><td style="font-size:smaller">&nbsp;&nbsp;&nbsp;Representation Term:</td><td>'+_d.RepresentationTermName+'</td></tr>' : '')+
      '<tr><td></td>'+
        '<td>'+(_d.type ? _d.type : '')+' '+(_d.PrimitiveType ? '&nbsp;&nbsp;(primitive type:'+_d.PrimitiveType+')'
        : '')+
      (_d.use ? 'use:'+_d.use : '</td></tr>');
  }

  return '<table cellpadding="4" cellspacing="0" border="0" style="width:100%; padding-left:16px;">'+
  '<colgroup>'+
  '<col span="1" style="width: '+H1+'%;">'+
  '<col span="1" style="width: '+H2+'%;">'+
  '</colgroup>'+
  '<tr><td>'+
    (d.UniqueID
      ? d.UniqueID
      : 'Dictionary Entry Name:'+
    '</td><td>'+d.DictionaryEntryName+'</td></tr>'+
  '<tr><td></td><td>'+
      (d.base ? ' base:'+d.base : '')+'(primitive type:'+d.PrimitiveType+')</td></tr>'+
  (d.ObjectClass
    ? '<tr><td style="font-size:smaller">&nbsp;&nbsp;Object Class Term:</td><td>'+d.ObjectClass+'</td></tr>'
    : '')+
  d.PropertyTermName
    ? '<tr><td style="font-size:smaller">&nbsp;&nbsp;Property Term:</td><td>'+d.PropertyTermName+'</td></tr>'
    : '')+
  (d.RepresentationTermName
    ? '<tr><td style="font-size:smaller">&nbsp;&nbsp;Representation Term:</td><td>'+d.RepresentationTermName+'</td></tr>'
    : '')+
  (d.UsageRule
    ? '<tr><td  style="font-size:smaller">Usage Rule:</td><td>'+d.UsageRule+'</td></tr>'
    : '')+
  (found.length > 0 ? related : '')+
  '</table>';
}
// -----------------------------------------------------------------
function openADC() {
  var name = 'Audit data collection';
  var width = window.innerWidth - 64, height = window.innerHeight - 64;
  var url='https://view.officeapps.live.com/op/view.aspx?src=https://www.wuwei.space/iso/tc295/data/audit_data_collection.xlsx'
  var features = 'width='+width+',height='+height+',menubar=no,location=no,resizable=yes,scrollbars=yes,status=no';
  const win = window.open(url, name, features);
}
// -----------------------------------------------------------------
// columns
// -----------------------------------------------------------------
var rgx = RegExp('^(([^_\\.]*)_ )?([^\\.]*)\\. (([^_\\.]*)_ )?([^\\.]*)(\\. (([^_\\.]*)_ )?(.*))?$');
var rgx_COL_ObjectclassTermQualifier = 2;
var rgx_COL_ObjectClassTerm = 3;
var rgx_COL_PropertyTermQualifier = 5;
var rgx_COL_PropertyTerm = 6;
var rgx_COL_DatatypeQualifier = 9;
var rgx_COL_RepresentationTerm  = 10;
function splitLC3(letters) {
  var i,
      letter = letters[0],
      words = letter,
      upperCase = letter === letter.toUpperCase();
  for (var i = 1; i < letters.length; i++) {
    letter = letters[i];
    if (!upperCase) {
      if (letter === letter.toUpperCase()) {
        upperCase = true;
        words += ' '+letter;
      } else {
        upperCase = false;
        words += letter;
      }
    }
    else {
      upperCase = (letter === letter.toUpperCase());
      words += letter;
    }
  }
  return words;
}
function renderNameByNum(num, name) {
  if (!name) {
    return '';
  }
  var num = '' + num;
  var depth = (num.match(/\./g) || []).length;
  var prefix = '';
  for (var i = 0; i < depth; i++) {
    prefix += '+';
  }
  return (prefix ? prefix+' ' : '')+name;//splitLC3(name);
}
function renderDescription(description) {
  if (!description) {
    return '';
  }
  else if (description.length > 72) {
    description = description.substr(0, 72)+'...';
  }
  return description;
}
// -----------------------------------------------------------------
// ADC
function renderAdcModule(row) {
  var module = row.module || '', match;
  match = module.match(/^[0-9]\.(.*)$/);
  if (match) { module = match[1]; }
  return module;
}
function rendeAdcDescription(row) {
  var description = row.Description;
  return renderDescription(description);
}
function renderAdcEntityName(row) {
  var name = row.BusinessTerm || row.DictionaryEntryName;
  if (!name) {
    return '';
  }
  return renderNameByNum(row.num, name);
}
function renderAdcEntityDescription(row) {
  var match,
      description = row.Description;
  if (!description) {
    return '';
  }
  match = description.match(/^(.*)(Shall match .* table.)(.*)$/);
  if (match) {
    description = match[1]+match[3];
  }
  match = description.match(/^(.*)(Otherwise set NULL.)(.*)$/);
  if (match) {
    description = match[1]+match[3];
  }
  match = description.match(/^(.*)(Typically auto-generated by the system.)(.*)$/);
  if (match) {
    description = match[1]+match[3];
  }
  description = description.replace(/ (is|are) contained in Table [0-9]+/g, '');
  // description = description.replace(/EXAMPLE/g, '<br><span style="font-size:smaller">EXAMPLE</span><br>');
  description = description.replace(/\(Table [0-9]+\) /g, '');
  if (description.length > 72) {
    description = description.substr(0, 72)+'...';
  }
  return renderDescription(description);
}
adc_abie_COL_ComponentName = 0;
adc_abie_COL_Module = 1;
adc_abie_COL_DictionaryEntryName = 5;
var adc_abie_columns = [
  { 'width': '4%',
    'data': 'Kind' }, // 0
  { 'width': '8%',
    'data': 'module',
    'render': function(data, type, row) {
      return renderAdcModule(row); }}, // 1
  { 'width': '35%',
    'data': 'BusinessTerm' /*'ObjectClass',
    'render': function(data, type, row) {
      var objectClass = (row.ObjectClassTermQualifier ? row.ObjectClassTermQualifier+'_ ' : '')+row.ObjectClassTerm;
      return objectClass; 
    }*/ }, // 2
  { 'data': 'description',
    'render': function (data, type, row) {
      return rendeAdcDescription(row); }}, // 3
  { 'width': '4%',
    'className': 'info-control',
    'orderable': false,
    'data': null,
    'defaultContent': '' }, // 4
  { 'data': 'DictionaryEntryName' } // 5
];
var adc_abie_columnDefs = [
  { 'searchable': false, 'targets': 4},
  { 'visible': false, 'targets': 5 } 
];
adc_entity_COL_DictionaryEntryName = 6;
adc_entity_COL_ObjectClassTerm = 7;
var adc_entity_columns = [
  { 'width': '2%',
    'className': 'details-control',
    'orderable': false,
    'data': null,
    'defaultContent': '' }, // 0
  { 'width': '8%',
    'data': 'Kind' }, // 1
  { 'width': '35%',
    'data': 'name',
    'render': function(data, type, row) {
      return renderAdcEntityName(row); }}, // 2
  { 'width': '49%',
    'data': 'description',
    'render': function(data, type, row) {
      return renderAdcEntityDescription(row); }}, // 3
  { 'width': '2%',
    'className': 'info-control',
    'orderable': false,
    'data': null,
    'defaultContent': '' }, // 4
  { 'data': 'Representation',
    'render': function(data, type, row) {
      var qualifier = row.DataTypeQualifier,
          term = row.RepresentationTerm,
          name;
      name = (qualifier ? qualifier+'_ ' : '')+term;
      return name; }}, // 5-
  { 'data': 'DictionaryEntryName' }, // 6-
  { 'data': 'ObjectClass',
    'render': function(data, type, row) {
      var qualifier = row.ObjectClassTermQualifier,
          term = row.ObjectClassTerm;
      return (qualifier ? qualifier+'_ ' : '')+term; }} // 7-
];
var adc_entity_columnDefs = [
  { 'searchable': false, 'targets': [0, 4] },
  { 'visible': false, 'targets': [5, 6, 7] } 
];
adc_dt_COL_CategoryCode = 0;
adc_dt_COL_DictionaryEntryName = 1;
adc_dt_COL_DataType = 4; // hidden
adc_dt_COL_ObjectClassTerm = 5; // hidden
var adc_dt_columns = [
  { 'width': '4%',
    'data': 'Kind' }, // 0
  { 'width': '35%',
    'data': 'DictionaryEntryName' }, // 1
  { 'width': '57%',
    'data': 'Definition' }, // 2
  { 'width': '4%',
    'className': 'info-control',
    'orderable': false,
    'data': null,
    'defaultContent': '' }, // 3
  { 'data': 'DataType' }, // 4-
  { 'data': 'ObjectClassTerm' }, // 5-
  { 'data': 'PropertyTerm' }, // 6-
  { 'data': 'RepresentationTerm' } // 7-
];
var adc_dt_columnDefs = [
  { 'searchable': false, 'targets': 0 },
  { 'visible': false, 'targets': [4, 5, 6, 7] } 
];
// -----------------------------------------------------------------
// ADC CC
adc_acc_COL_ComponentName = 0;
adc_acc_COL_Module = 1;
adc_acc_COL_DictionaryEntryName = 5;
var adc_acc_columns = [
  { 'width': '4%',
    'data': 'Kind' }, // 0
  { 'width': '8%',
    'data': 'module',
    'render': function(data, type, row) {
      return renderAdcModule(row); }}, // 1
  { 'width': '35%',
    'data': 'BusinessTerm' }, // 2
  { 'data': 'description',
    'render': function (data, type, row) {
      return rendeAdcDescription(row); }}, // 3
  { 'width': '4%',
    'className': 'info-control',
    'orderable': false,
    'data': null,
    'defaultContent': '' }, // 4
  { 'data': 'DictionaryEntryName' } // 5
];
var adc_acc_columnDefs = [
  { 'searchable': false, 'targets': 4},
  { 'visible': false, 'targets': 5 } 
];
adc_cc_COL_DictionaryEntryName = 6;
adc_cc_COL_ObjectClassTerm = 7;
var adc_cc_columns = [
  { 'width': '2%',
    'className': 'details-control',
    'orderable': false,
    'data': null,
    'defaultContent': '' }, // 0
  { 'width': '8%',
    'data': 'Kind' }, // 1
  { 'width': '35%',
    'data': 'name',
    'render': function(data, type, row) {
      return renderAdcEntityName(row); }}, // 2
  { 'width': '49%',
    'data': 'description',
    'render': function(data, type, row) {
      return renderAdcEntityDescription(row); }}, // 3
  { 'width': '2%',
    'className': 'info-control',
    'orderable': false,
    'data': null,
    'defaultContent': '' }, // 4
  { 'data': 'Representation',
    'render': function(data, type, row) {
      var qualifier = row.DataTypeQualifier,
          term = row.RepresentationTerm;
      return (qualifier ? qualifier+'_ ' : '')+term; }}, // 5-
  { 'data': 'DictionaryEntryName' }, // 6-
  { 'data': 'ObjectClass',
    'render': function(data, type, row) {
      var qualifier = row.ObjectClassTermQualifier,
          term = row.ObjectClassTerm;
      return (qualifier ? qualifier+'_ ' : '')+term; }} // 7-
];
var adc_cc_columnDefs = [
  { 'searchable': false, 'targets': [0, 4] },
  { 'visible': false, 'targets': [5, 6, 7] } 
];
adc_cc_dt_COL_CategoryCode = 0;
adc_cc_dt_COL_DictionaryEntryName = 1;
adc_cc_dt_COL_DataType = 4; // hidden
adc_cc_dt_COL_ObjectClassTerm = 5; // hidden
var adc_cc_dt_columns = [
  { 'width': '4%',
    'data': 'Kind' }, // 0
  { 'width': '35%',
    'data': 'DictionaryEntryName' }, // 1
  { 'width': '57%',
    'data': 'Definition' }, // 2
  { 'width': '4%',
    'className': 'info-control',
    'orderable': false,
    'data': null,
    'defaultContent': '' }, // 3
  { 'data': 'DataType' }, // 4-
  { 'data': 'ObjectClassTerm' }, // 5-
  { 'data': 'PropertyTerm' }, // 6-
  { 'data': 'RepresentationTerm' } // 7-
];
var adc_cc_dt_columnDefs = [
  { 'searchable': false, 'targets': 0 },
  { 'visible': false, 'targets': [4, 5, 6, 7] } 
];
// -----------------------------------------------------------------
// XBRL GL
function renderXbrlglEntityName(row) {
var dictionaryEntryName = row.DictionaryEntryName, name;
if (!dictionaryEntryName) {
  return '';
}
var match = dictionaryEntryName.match(/^([^\.]+)\. (.*)$/);
if (match) {
  name = match[2];
}
return renderNameByNum(row.num, name);
}
xbrlgl_abie_COL_ComponentName = 0;
xbrlgl_abie_COL_ObjectClassTerm = 1;
xbrlgl_abie_COL_DictionaryEntryName = 4;
var xbrlgl_abie_columns = [
  { 'width': '4%',
    'data': 'Kind' }, // 0
  { 'width': '35%',
    'data': 'ObjectClassTerm' }, // 1
  { 'width': '57%',
    'data': 'description',
    'render': function(data, type, row) {
      return renderDescription(row.Description); }}, // 2
  { 'width': '4%',
    'className': 'info-control',
    'orderable': false,
    'data': null,
    'defaultContent': '' }, // 3
  { 'data': 'DictionaryEntryName' } // 4
];
var xbrlgl_abie_columnDefs = [
  { 'searchable': false, 'targets': 3 },
  { 'visible': false, 'targets': 4 } 
];
xbrlgl_entity_COL_DictionaryEntryName = 2;
xbrlgl_entity_COL_ObjectClassTerm = 5;
var xbrlgl_entity_columns = [
  { 'width': '2%',
    'className': 'details-control',
    'orderable': false,
    'data': null,
    'defaultContent': '' }, // 0
  { 'width': '8%',
    'data': 'Kind' }, // 1
  { 'width': '35%',
    'data': 'name',
    'render': function(data, type, row) {
      return renderXbrlglEntityName(row); }}, // 2
  { 'width': '53%',
    'data': 'description',
    'render': function(data, type, row) {
      return renderDescription(row.Description); }}, // 3
  { 'width': '2%',
    'className': 'info-control',
    'orderable': false,
    'data': null,
    'defaultContent': '' }, // 4
  { 'data': 'ObjectClassTerm' } // 5
];
var xbrlgl_entity_columnDefs = [
  { 'searchable': false, 'targets': [0, 4] },
  { 'visible': false, 'targets': 5 } 
];
// -----------------------------------------------------------------
// ADS
function renderAdsAbieTable(row) {
  var table = row.Table;
  if (!table) {
    return '';
  }
  table = table.replace(/_/g, ' ');
  return table;
}
function renderAdsDescription(row) {
  var match, description = row.Description;
  if (!description) {
    return '';
  }
  description = description.replace(/(_YYYYMMDD_YYYYMMDD|_YYYYMMDD)/g, '');
  description = description.replace(/_/g, ' ');
  match = description.match(/^'(.*)'$/);
  if (match) {
    description = match[1];
  }
  description = description.replace(/''/g,'"');
  if (description.length > 72) {
    description = description.substr(0, 72)+'...';
  }
  return renderDescription(description);
}
function renderAdsEntityName(row) {
  var name = row.Name;
  if (name) {
    name = name.replace(/_/g, ' ');
  }
  else if (row.DictionaryEntryName) {
    name = renderAdcEntityName(row);
  }
  else {
    return '';
  }
  return renderNameByNum(row.num, name);
}
ads_abie_COL_ComponentName = 0;
ads_abie_COL_Table = 2;
var ads_abie_columns = [
  { 'width': '4%',
    'data': 'Kind' }, // 0
  { 'width': '5%',
    'data': 'Module' }, // 1
  { 'width': '35%',
    'data': 'table',
    'render': function (data, type, row) {
      return renderAdsAbieTable(row); }}, // 2
  { 'width': '52%',
    'data': 'description',
    'render': function (data, type, row) {
      return renderAdsDescription(row); }}, // 3
  { 'width': '4%',
    'className': 'info-control',
    'orderable': false,
    'data': null,
    'defaultContent': '' } // 4
];
var ads_abie_columnDefs = [
  { 'searchable': false, 'targets': 4 }
];
ads_entity_COL_No = 2;
ads_entity_COL_ObjectClassTerm = 8;
var ads_entity_columns = [
  { 'width': '2%',
    'className': 'details-control',
    'orderable': false,
    'data': null,
    'defaultContent': '' }, // 0
  { 'width': '8%',
    'data': 'Kind' }, // 1
  { 'width': '4%',
    'data': 'No' }, // 2
  { 'width': '35%',
    'data': 'name',
    'render': function(data, type, row) {
      return renderAdsEntityName(row); }}, // 3
  { 'width': '51%',
    'data': 'description',
    'render': function(data, type, row) {
      return renderDescription(row.Description); }}, // 4
  { 'width': '2%',
    'className': 'info-control',
    'orderable': false,
    'data': null,
    'defaultContent': '' }, // 5
  { 'data': 'Table' }, // 6-
  { 'data': 'ObjectClassTerm' } // 7-
];
var ads_entity_columnDefs = [
  { 'searchable': false, 'targets': [0, 5] },
  { 'visible': false, 'targets': [6, 7] } 
];
// -----------------------------------------------------------------
// UBL
ubl_abie_COL_ComponentName = 1;
ubl_abie_COL_DictionaryEntryName = 4;
var ubl_abie_columns = [
  { 'width': '4%',
    'data': 'ComponentType' }, // 0
  { 'width': '35%',
    'data': 'componentName',
    'render': function(data, type, row) {
      return splitLC3(row.ComponentName); }}, // 1
  { 'width': '57%',
    'data': 'definition',
    'render': function(data, type, row) {
      return renderDescription(row.Definition); }}, // 2
  { 'width': '4%',
    'className': 'info-control',
    'orderable': false,
    'data': null,
    'defaultContent': '' }, // 3
  { 'data': 'DictionaryEntryName' } // 4-
];
var ubl_abie_columnDefs = [
  { 'searchable': false, 'targets': 3 },
  { 'visible': false, 'targets': 4 } 
];
ubl_entity_COL_DictionaryEntryName = 7;
ubl_entity_COL_ObjectClassTerm = 8;
var ubl_entity_columns = [
  { 'width': '2%',
    'className': 'details-control',
    'orderable': false,
    'data': null,
    'defaultContent': '' }, // 0
  { 'width': '8%',
    'data': 'ComponentType' }, // 1
  { 'width': '35%',
    'data': 'name',
    'render': function(data, type, row) {
      return renderNameByNum(row.num, row.ComponentName); }}, // 2
  { 'width': '47%',
    'data': 'definition',
    'render': function(data, type, row) {
      return renderDescription(row.Definition); }}, // 3
  { 'width': '6%',
    'data': 'Cardinality' }, // 4
  { 'width': '2%',
    'className': 'info-control',
    'orderable': false,
    'data': null,
    'defaultContent': '' }, // 5
  { 'data': 'DataType' }, // 6-
  { 'data': 'DictionaryEntryName' }, // 7-
  { 'data': 'ObjectClassTerm' } // 8-
];
var ubl_entity_columnDefs = [
  { 'searchable': false, 'targets': [0, 5] },
  { 'visible': false, 'targets': [6, 7, 8] } 
];
ubl_dt_COL_CategoryCode = 0;
ubl_dt_COL_DictionaryEntryName = 5; // hidden
var ubl_dt_columns = [
  { 'width': '4%',
    'data': 'CategoryCode' }, // 0
  { 'width': '35%',
    'data': 'name' }, // 1
  { 'width': '15%',
    'data': 'RepresentationTermName' }, // 2
  { 'width': '42%',
    'data': 'Definition' }, // 3
  { 'width': '4%',
    'className': 'info-control',
    'orderable': false,
    'data': null,
    'defaultContent': '' }, // 4
  { 'data': 'DictionaryEntryName' } // 5-
];
var ubl_dt_columnDefs = [
  { 'searchable': false, 'targets': 0 },
  { 'visible': false, 'targets': 5 } 
];
// -----------------------------------------------------------------
// UN/CEFACT
acc_COL_ObjectClassTerm = 1;
var acc_columns = [
  { 'width': '7%',
    'data': 'Kind' }, // 0
  { 'width': '35%',
    'data': 'ObjectClassTerm' }, // 1
  { 'width': '54%',
    'data': 'definition',
    'render': function(data, type, row) {
      return renderDescription(row.Definition); }}, // 2
  { 'width': '4%',
    'className': 'info-control',
    'orderable': false,
    'data': null,
    'defaultContent': '' }, // 3
  { 'data': 'UniqueID' }, // 4-
  { 'data': 'DictionaryEntryName' } // 5-
];
var acc_columnDefs = [
  { 'searchable': false, 'targets': 3 },
  { 'visible': false, 'targets': [4, 5] }
];
cc_COL_ShortName = 2;
cc_COL_ObjectClassTerm = 7;
cc_COL_PropertyTerm = 8;
var cc_columns = [
  { 'width': '2%',
    'className': 'details-control',
    'orderable': false,
    'data': null,
    'defaultContent': '' }, // 0
  { 'width': '8%',
    'data': 'Kind' }, // 1
  { 'width': '35%',
    'data': 'name',
    'render': function(data, type, row) {
      return renderNameByNum(row.num, row.ShortName); }}, // 2
  { 'width': '47%',
    'data': 'definition',
    'render': function(data, type, row) {
      return renderDescription(row.Definition); }}, // 3
  { 'width': '6%',
    'data': 'Occurrence' }, // 4
  { 'width': '2%',
    'className': 'info-control',
    'orderable': false,
    'data': null,
    'defaultContent': '' }, // 5
  { 'data': 'UniqueID' }, // 6-
  { 'data': 'ObjectClassTerm' }, // 7-
  { 'data': 'PropertyTerm' } // 8-
];
var cc_columnDefs = [
  { 'searchable': false, 'targets': [0, 4, 5] },
  { 'visible': false, 'targets': [6, 7, 8] }
];
bie_COL_ObjectClassTerm = 5;
var bie_columns = [
  { 'width': '7%',
    'data': 'Kind' }, // 0
  { 'width': '35%',
    'data': 'ShortName' }, // 1
  { 'width': '54%',
    'data': 'definition',
    'render': function(data, type, row) {
      return renderDescription(row.Definition); }}, // 2
  { 'width': '4%',
    'className': 'info-control',
    'orderable': false,
    'data': null,
    'defaultContent': '' }, // 3
  { 'data': 'UniqueID' }, // 4-
  { 'data': 'ObjectClassTerm' } // 5-
];
var bie_columnDefs = [
  { 'searchable': false, 'targets': 3 },
  { 'visible': false, 'targets': [4, 5] },
];
bie_compt_COL_ShortName = 3;
bie_compt_COL_DictionaryEntryName = 8;
var bie_compt_columns = [
  { 'width': '2%',
    'className': 'details-control',
    'orderable': false,
    'data': null,
    'defaultContent': '' }, // 0
  { 'width': '8%',
    'data': 'Kind' }, // 1
  { 'width': '2%',
    'data': 'SequenceNumber' }, // 2
  { 'width': '33%',
    'data': 'name',
    'render': function(data, type, row) {
      return renderNameByNum(row.num, row.ShortName); }}, // 3
  { 'width': '47%',
    'data': 'definition',
    'render': function(data, type, row) {
      return renderDescription(row.Definition); }}, // 4
  { 'width': '6%',
    'data': 'Occurrence' }, // 5
  { 'width': '2%',
    'className': 'info-control',
    'orderable': false,
    'data': null,
    'defaultContent': '' }, // 6
  { 'data': 'UniqueID' }, // 7-
  { 'data': 'DictionaryEntryName' } // 8-
];
var bie_compt_columnDefs = [
  { 'searchable': false, 'targets': [0, 2, 5, 6] },
  { 'visible': false, 'targets': [7, 8] }
];
dt_COL_DictionaryEntryName = 2;
dt_COL_DataType = 4;
var dt_columns = [
  { 'width': '4%',
    'data': 'Kind' }, // 0
  { 'width': '2%',
    'data': 'SequenceNumber' }, // 1
  { 'width': '35%',
    'data': 'DictionaryEntryName' }, // 2
  { 'width': '59%',
    'data': 'definition',
    'render': function(data, type, row) {
      return renderDescription(row.Definition); }}, // 3
  { 'data': 'DataType' }, // 4-
];
var dt_columnDefs = [
  { 'searchable': false, 'targets': 1 },
  { 'visible': false , 'targets': 4}
];
qdt_COL_UNID = 4;
var qdt_columns = [
  { 'width': '4%',
    'data': 'Kind' }, // 0
  { 'width': '33%',
    'data': 'DictionaryEntryName' }, // 1
  { 'data': 'definition',
    'render': function(data, type, row) {
      return renderDescription(row.Definition); }}, // 2
  { 'width': '4%',
    'className': 'info-control',
    'orderable': false,
    'data': null,
    'defaultContent': '' }, // 3
  { 'data': 'UNID' } // 4-
];
var qdt_columnDefs = [
  { 'searchable': false, 'targets': 0 },
  { 'visible': false, 'targets': 4 } 
];
var initModule = function (tab1, tab2) {
// -----------------------------------------------------------------
// DataTable definition
// -----------------------------------------------------------------
getTopTableID = function(frame) {
  var table_id;
  switch (frame) {
    case 'adc':    table_id = 'adc-abie';    break;
    case 'adc-cc': table_id = 'adc-acc';     break;
    case 'xbrlgl': table_id = 'xbrlgl-abie'; break;
    case 'ads':    table_id = 'ads-abie';    break;
    case 'ubl':    table_id = 'ubl-abie';    break;
    case 'bie':    table_id = 'bie';         break;
    case 'acc':    tavle_id = 'acc';         break;
  }
  return table_id;
};
getTopTable = function(frame) {
  var table;
  switch (frame) {
    case 'adc':    table = adc_abie_table;    break;
    case 'adc-cc': table = adc_acc_table;     break;
    case 'xbrlgl': table = xbrlgl_abie_table; break;
    case 'ads':    table = ads_abie_table;    break;
    case 'ubl':    table = ubl_abie_table;    break;
    case 'bie':    table = bie_table;         break;
    case 'acc':    table = acc_table;         break;
  }
  return table;
};
getEntityTableID = function(frame) {
  var table_id;
  switch (frame) {
    case 'adc':    table_id = 'adc-entity';    break;
    case 'adc-cc': table_id = 'adc-cc';        break;
    case 'xbrlgl': table_id = 'xbrlgl-entity'; break;
    case 'ads':    table_id = 'ads-entity';    break;
    case 'ubl':    table_id = 'ubl-entity';    break;
    case 'bie':    table_id = 'bie-compt';     break;
    case 'acc':    table_id = 'cc';            break;
  }
  return table_id;
}
getEntityTable = function(frame) {
  var table;
  switch (frame) {
    case 'adc':    table = adc_entity_table;    break;
    case 'adc-cc': table = adc_cc_table;        break;
    case 'xbrlgl': table = xbrlgl_entity_table; break;
    case 'ads':    table = ads_entity_table;    break;
    case 'ubl':    table = ubl_entity_table;    break;
    case 'bie':    table = bie_compt_table;     break;
    case 'acc':    table = cc_table;            break;
  }
  return table;
}
function getEntityMap(frame) {
  var map;
  switch (frame) {
    case 'adc':    map = adcEntityMap;    break;
    case 'adc-cc': map = adcCcMap;        break;
    case 'xbrlgl': map = xbrlglEntityMap; break;
    case 'ads':    map = adsEntityMap;    break;
    case 'ubl':    map = ublEntityMap;    break;
    case 'bie':    map = bieComptMap;     break;
    case 'acc':    map = ccMap;            break;
  }
  return map;
}
function assignEntityRows(frame, rows) {
  switch (frame) {
    case 'adc':    adcEntityRows = rows;    break;
    case 'adc-cc': adcCcRows = rows;        break;
    case 'xbrlgl': xbrlglEntityRows = rows; break;
    case 'ads':    adsEntityRows = rows;    break;
    case 'ubl':    ublEntityRows = rows;    break;
    case 'bie':    bieComptRows = rows;     break;
    case 'acc':    bie = rows;            break;
  }
}
function checkAssociated(table_id) {
  var rows, i, tr, td_0, td_1, td_2;
  rows = $('#'+table_id+' tbody tr');
  for (i = 0; i < rows.length; i++) {
    tr = rows[i];
    td_0 = tr.cells[0]; td_1 = tr.cells[1]; td_2 = tr.cells[2];
    if ((td_2 && td_2.innerHTML.match(/\. ID$/)) ||
        (td_1 && 'IDBIE' === td_1.innerHTML)) {
      td_0.classList.remove('details-control');
      td_0.classList.add('key-control');
    }
    else if (!td_1 || 'BBIE' === td_1.innerHTML || 'BCC' === td_1.innerHTML) {
      td_0.classList.remove('details-control');
    }
    else if ('RLBIE' === td_1.innerHTML || 'RBIE' === td_1.innerHTML ||
             'RLCC' === td_1.innerHTML  || 'RCC' === td_1.innerHTML) {
      td_0.classList.remove('details-control');
      td_0.classList.add('link-control');
    }
    else if ('' === td_1.innerHTML) {
      td_0.classList.remove('details-control');
      td_0.classList.remove('link-control');
    }
  }
}
function filterTop(frame) {
  var table, entity_table, entity_id,
      entityMap, data, key, item, dictionaryEntryName,
      associates, rows;
  loaded[frame] = true;
  table = getTopTable(frame);
  entity_table = getEntityTable(frame);
  entity_id = content[frame]['bottom-top'];
  entityMap = getEntityMap(frame);
  if(!entityMap) {
    entityMap = new Map(); 
    data = entity_table.data();
    for (key in data) {
      item = data[key];
      dictionaryEntryName = item.DictionaryEntryName ||
        item.ObjectClassTerm+'. '+item.PropertyTerm+'. '+
        (item.RepresentationTerm
          ? item.RepresentationTerm
          : item.AssociatedObjectClass);
      if (dictionaryEntryName) {
        item.num = '' + item.num;
        item.ancestor = item.ObjectClassTerm;
        item.DictionaryEntryName = dictionaryEntryName;
        entityMap.set(dictionaryEntryName, item);
      }
    }
  }
  if (['xbrlgl', 'ubl'].indexOf(frame) >= 0) {
    rows = table.data().toArray();
  }
  else {
    if (['bie', 'acc'].indexOf(frame) >= 0) {
      associates = {};
      entityMap.forEach(function(v,k,m) {
        if (v.AssociatedObjectClass) {
          key = (v.AssociatedObjectClassTermQualifier
            ? v.AssociatedObjectClassTermQualifier+'_ '
            : '')+
            v.AssociatedObjectClass;
          associates[key] = true;
        }
      });
    }

    rows = [];
    table.data().toArray().forEach(function(v, i) {
      if (['adc', 'adc-cc', 'ads'].indexOf(frame) >= 0) {
        if ('Core' !== v.Module) {
          rows.push(v);
        }
      }
      else if (['bie', 'acc'].indexOf(frame) >= 0) {
        key = (v.ObjectClassTermQualifier
          ? v.ObjectClassTermQualifier+'_ '
          : '')+
        v.ObjectClassTerm;
        if (!associates[key]) {
          rows.push(v);
        }
      }
    });

    table.clear();
    table.rows.add(rows)
    .draw();
  }
  switch (frame) {
    case 'adc':    adcRows = rows;    adcEntityMap = entityMap;    break;
    case 'adc-cc': adcAccRows = rows; adcCcMap = entityMap;        break;
    case 'xbrlgl': xbrlglRows = rows; xbrlglEntityMap = entityMap; break;
    case 'ads':    adsRows = rows;    adsEntityMap = entityMap;    break;
    case 'ubl':    ublRows = rows;    ublEntityMap = entityMap;    break;
    case 'bie':    bieRows = rows;    bieComptMap = entityMap;     break;
    case 'acc':    abie = rows;       ccMap = entityMap;           break;
  }
  if (loaded[pane[1]] && loaded[pane[2]]) {
    hideOverlay();
  }
}
// -----------------------------------------------------------------
// ADC
//
adc_abie_table = $('#adc-abie').DataTable({
  'ajax': 'data/list-ADC-abie.json',
  'columns': adc_abie_columns,
  'columnDefs': adc_abie_columnDefs,
  'paging': false,
  'autoWidth': false,
  'ordering': false,
  'select': true
});
adc_entity_table = $('#adc-entity').DataTable({
  'ajax': 'data/list-ADC-entity.json',
  'columns': adc_entity_columns,
  'columnDefs': adc_entity_columnDefs,
  'paging': false,
  'autoWidth': false,
  'ordering': false,
  'select': true,
  'initComplete': function(settings, json) {
    filterTop('adc');
  },
  'drawCallback': function(settings) {
    checkAssociated('adc-entity');
    hideOverlay();
  }
});
adc_entity2_table = $('#adc-entity2').DataTable({
  'ajax': 'data/list-ADC-entity.json',
  'columns': adc_entity_columns,
  'columnDefs': adc_entity_columnDefs,
  'paging': false,
  'autoWidth': false,
  'ordering': false,
  'select': true,
  'drawCallback': function(settings) {
    checkAssociated('adc-entity2');
  }
});
adc_udt_table = $('#adc-udt').DataTable({
  'ajax': '../data/list-ADC-udt.json',
  'columns': adc_dt_columns,
  'columnDefs': adc_dt_columnDefs,
  'paging': false,
  'autoWidth': false,
  'ordering': false,
  'select': true
});
// -----------------------------------------------------------------
// ADC CC
//
adc_acc_table = $('#adc-acc').DataTable({
  'ajax': 'data/list-ADC-acc.json',
  'columns': adc_acc_columns,
  'columnDefs': adc_acc_columnDefs,
  'paging': false,
  'autoWidth': false,
  'ordering': false,
  'select': true
});
adc_cc_table = $('#adc-cc').DataTable({
  'ajax': 'data/list-ADC-cc.json',
  'columns': adc_cc_columns,
  'columnDefs': adc_cc_columnDefs,
  'paging': false,
  'autoWidth': false,
  'ordering': false,
  'select': true,
  'initComplete': function(settings, json) {
    filterTop('adc-cc');
  },
  'drawCallback': function(settings) {
    checkAssociated('adc-cc');
    hideOverlay();
  }
});
adc_cc2_table = $('#adc-cc2').DataTable({
  'ajax': 'data/list-ADC-cc.json',
  'columns': adc_cc_columns,
  'columnDefs': adc_cc_columnDefs,
  'paging': false,
  'autoWidth': false,
  'ordering': false,
  'select': true,
  'drawCallback': function(settings) {
    checkAssociated('adc-cc2');
  }
});
adc_cc_udt_table = $('#adc-cc-udt').DataTable({
  'ajax': '../data/list-ADC-udt.json',
  'columns': adc_cc_dt_columns,
  'columnDefs': adc_cc_dt_columnDefs,
  'paging': false,
  'autoWidth': false,
  'ordering': false,
  'select': true
});
// -----------------------------------------------------------------
// XBRL GL
//
xbrlgl_abie_table = $('#xbrlgl-abie').DataTable({
  'ajax': '../data/list-xbrlgl-abie.json',
  'columns': xbrlgl_abie_columns,
  'columnDefs': xbrlgl_abie_columnDefs,
  'paging': false,
  'autoWidth': false,
  'ordering': false,
  'select': true
});
xbrlgl_entity_table = $('#xbrlgl-entity').DataTable({
  'ajax': '../data/list-xbrlgl-entity.json',
  'columns': xbrlgl_entity_columns,
  'columnDefs': xbrlgl_entity_columnDefs,
  'paging': false,
  'autoWidth': false,
  'ordering': false,
  'select': true,
  'initComplete': function(settings, json) {
    filterTop('xbrlgl');
  },
  'drawCallback': function(settings) {
    checkAssociated('xbrlgl-entity');
    hideOverlay();
  }
});
xbrlgl_entity2_table = $('#xbrlgl-entity2').DataTable({
  'ajax': '../data/list-xbrlgl-entity.json',
  'columns': xbrlgl_entity_columns,
  'columnDefs': xbrlgl_entity_columnDefs,
  'paging': false,
  'autoWidth': false,
  'ordering': false,
  'select': true,
  'drawCallback': function(settings) {
    checkAssociated('xbrlgl-entity2');
  }
});
// -----------------------------------------------------------------
// ADS
//
ads_abie_table = $('#ads-abie').DataTable({
  'ajax': '../data/list-ADS-abie.json',
  'columns': ads_abie_columns,
  'columnDefs': ads_abie_columnDefs,
  'paging': false,
  'autoWidth': false,
  'ordering': false,
  'select': true
});
ads_entity_table = $('#ads-entity').DataTable({
  'ajax': '../data/list-ADS-entity.json',
  'columns': ads_entity_columns,
  'columnDefs': ads_entity_columnDefs,
  'paging': false,
  'autoWidth': false,
  'ordering': false,
  'select': true,
  'initComplete': function(settings, json) {
    filterTop('ads');
  },
  'drawCallback': function(settings) {
    checkAssociated('ads-entity');
    hideOverlay();
  }
});
ads_entity2_table = $('#ads-entity2').DataTable({
  'ajax': '../data/list-ADS-entity.json',
  'columns': ads_entity_columns,
  'columnDefs': ads_entity_columnDefs,
  'paging': false,
  'autoWidth': false,
  'ordering': false,
  'select': true,
  'drawCallback': function(settings) {
    checkAssociated('ads-entity2');
  }
});
// -----------------------------------------------------------------
// UBL
//
ubl_abie_table = $('#ubl-abie').DataTable({
  'ajax': '../data/list-ubl-abie.json',
  'columns': ubl_abie_columns,
  'columnDefs': ubl_abie_columnDefs,
  'paging': false,
  'autoWidth': false,
  'ordering': false,
  'select': true
});
ubl_entity_table = $('#ubl-entity').DataTable({
  'ajax': '../data/list-ubl-entity.json',
  'columns': ubl_entity_columns,
  'columnDefs': ubl_entity_columnDefs,
  'paging': false,
  'autoWidth': false,
  'ordering': false,
  'select': true,
  'initComplete': function(settings, json) {
    filterTop('ubl');
  },
  'drawCallback': function(settings) {
    checkAssociated('ubl-entity');
    hideOverlay();
  }
});
ubl_entity2_table = $('#ubl-entity2').DataTable({
  'ajax': '../data/list-ubl-entity.json',
  'columns': ubl_entity_columns,
  'columnDefs': ubl_entity_columnDefs,
  'paging': false,
  'autoWidth': false,
  'ordering': false,
  'select': true,
  'drawCallback': function(settings) {
    checkAssociated('ubl-entity2');
  }
});
ubl_qdt_table = $('#ubl-qdt').DataTable({
  'ajax': '../data/list-ubl-udt.json',
  'columns': ubl_dt_columns,
  'columnDefs': ubl_dt_columnDefs,
  'paging': false,
  'autoWidth': false,
  'ordering': false,
  'select': true
});
ubl_udt_table = $('#ubl-udt').DataTable({
  'ajax': '../data/list-ubl-udt.json',
  'columns': ubl_dt_columns,
  'columnDefs': ubl_dt_columnDefs,
  'paging': false,
  'autoWidth': false,
  'ordering': false,
  'select': true
});
// -----------------------------------------------------------------
// UN/CEFACT
//
bie_table = $('#bie').DataTable({
  'ajax': '../data/list-bie.json',
  'columns': bie_columns,
  'columnDefs': bie_columnDefs,
  'paging': false,
  'autoWidth': false,
  'ordering': false,
  'select': true
});
bie_compt_table = $('#bie-compt').DataTable({
  'ajax': '../data/list-bie_compt.json',
  'columns': bie_compt_columns,
  'columnDefs': bie_compt_columnDefs,
  'paging': false,
  'autoWidth': false,
  'ordering': false,
  'select': true,
  'initComplete': function(settings, json) {
    filterTop('bie');
  },
  'drawCallback': function(settings) {
    checkAssociated('bie-compt');
    hideOverlay();
  }
});
bie_compt2_table = $('#bie-compt2').DataTable({
  'ajax': '../data/list-bie_compt.json',
  'columns': bie_compt_columns,
  'columnDefs': bie_compt_columnDefs,
  'paging': false,
  'autoWidth': false,
  'ordering': false,
  'select': true,
  'drawCallback': function(settings) {
    checkAssociated('bie-compt2');
  }
});
qdt_table = $('#qdt').DataTable({
  'ajax': '../data/list-qdt.json',
  'columns': qdt_columns,
  'columnDefs': qdt_columnDefs,
  'paging': false,
  'autoWidth': false,
  'ordering': false,
  'select': true
});
uncefact_udt_table = $('#uncefact-udt').DataTable({
  'ajax': '../data/list-udt.json',
  'columns': dt_columns,
  'columnDefs': dt_columnDefs,
  'paging': false,
  'autoWidth': false,
  'ordering': false,
  'select': true
});
// -----------------------------------------------------------------
acc_table = $('#acc').DataTable({
  'ajax': '../data/list-acc.json',
  'columns': acc_columns,
  'columnDefs': acc_columnDefs,
  'paging': false,
  'autoWidth': false,
  'ordering': false,
  'select': true
});
cc_table = $('#cc').DataTable({
  'ajax': '../data/list-cc.json',
  'columns': cc_columns,
  'columnDefs': cc_columnDefs,
  'paging': false,
  'autoWidth': false,
  'ordering': false,
  'select': true,
  'initComplete': function(settings, json) {
    filterTop('acc');
  },
  'drawCallback': function(settings) {
    checkAssociated('cc');
    hideOverlay();
  }
});
cc2_table = $('#cc2').DataTable({
  'ajax': '../data/list-cc.json',
  'columns': cc_columns,
  'columnDefs': cc_columnDefs,
  'paging': false,
  'autoWidth': false,
  'ordering': false,
  'select': true,
  'drawCallback': function(settings) {
    checkAssociated('cc2');
  }
});
udt_table = $('#udt').DataTable({
  'ajax': '../data/list-udt.json',
  'columns': dt_columns,
  'columnDefs': dt_columnDefs,
  'paging': false,
  'autoWidth': false,
  'ordering': false,
  'select': true
});
// -----------------------------------------------------------------
// Add event listener for opening and closing info
// -----------------------------------------------------------------
// ADC
//
$('#adc-abie tbody').on('click', 'td.info-control', function(event) {
  event.stopPropagation();
  var tr = $(this).closest('tr'), row = adc_abie_table.row(tr), data = row.data();
  if (row.child.isShown()) { // This row is already open - close it
    row.child.hide(); tr.removeClass('shown');
  }
  else { // Open this row
    row.child(adc_entity_format(data)).show(); tr.addClass('shown');
  }
});
$('#adc-entity tbody').on('click', 'td.info-control', function(event) {
  event.stopPropagation();
  var tr = $(this).closest('tr'), row = adc_entity_table.row(tr), data = row.data();
  if (row.child.isShown()) { // This row is already open - close it
    row.child.hide(); tr.removeClass('shown');
  }
  else { // Open this row
    row.child(adc_entity_format(data)).show(); tr.addClass('shown');
  }
});
$('#adc-entity2 tbody').on('click', 'td.info-control', function(event) {
  event.stopPropagation();
  var tr = $(this).closest('tr'), row = adc_entity2_table.row(tr), data = row.data();
  if (row.child.isShown()) { // This row is already open - close it
    row.child.hide(); tr.removeClass('shown');
  }
  else { // Open this row
    row.child(adc_entity_format(data)).show(); tr.addClass('shown');
  }
});
$('#adc-udt tbody').on('click', 'td.info-control', function(event) {
  event.stopPropagation();
  var tr = $(this).closest('tr'), row = adc_udt_table.row(tr), data = row.data();
  if (row.child.isShown()) { // This row is already open - close it
    row.child.hide(); tr.removeClass('shown');
  }
  else { // Open this row
    row.child(adc_dt_format(data)).show(); tr.addClass('shown');
  }
});
// -----------------------------------------------------------------
// ADC CC
//
$('#adc-acc tbody').on('click', 'td.info-control', function(event) {
  event.stopPropagation();
  var tr = $(this).closest('tr'), row = adc_acc_table.row(tr), data = row.data();
  if (row.child.isShown()) { // This row is already open - close it
    row.child.hide(); tr.removeClass('shown');
  }
  else { // Open this row
    row.child(adc_entity_format(data)).show(); tr.addClass('shown');
  }
});
$('#adc-cc tbody').on('click', 'td.info-control', function(event) {
  event.stopPropagation();
  var tr = $(this).closest('tr'), row = adc_cc_table.row(tr), data = row.data();
  if (row.child.isShown()) { // This row is already open - close it
    row.child.hide(); tr.removeClass('shown');
  }
  else { // Open this row
    row.child(adc_entity_format(data)).show(); tr.addClass('shown');
  }
});
$('#adc-cc2 tbody').on('click', 'td.info-control', function(event) {
  event.stopPropagation();
  var tr = $(this).closest('tr'), row = adc_cc2_table.row(tr), data = row.data();
  if (row.child.isShown()) { // This row is already open - close it
    row.child.hide(); tr.removeClass('shown');
  }
  else { // Open this row
    row.child(adc_entity_format(data)).show(); tr.addClass('shown');
  }
});
$('#adc-cc-udt tbody').on('click', 'td.info-control', function(event) {
  event.stopPropagation();
  var tr = $(this).closest('tr'), row = adc_udt_table.row(tr), data = row.data();
  if (row.child.isShown()) { // This row is already open - close it
    row.child.hide(); tr.removeClass('shown');
  }
  else { // Open this row
    row.child(adc_dt_format(data)).show(); tr.addClass('shown');
  }
});
// -----------------------------------------------------------------
// XBRL GL
//
$('#xbrlgl-abie tbody').on('click', 'td.info-control', function(event) {
  event.stopPropagation();
  var tr = $(this).closest('tr'), row = xbrlgl_abie_table.row(tr), data = row.data();
  if (row.child.isShown()) { // This row is already open - close it
    row.child.hide(); tr.removeClass('shown');
  }
  else { // Open this row
    row.child(xbrlgl_entity_format(data)).show(); tr.addClass('shown');
  }
});
$('#xbrlgl-entity tbody').on('click', 'td.info-control', function(event) {
  event.stopPropagation();
  var tr = $(this).closest('tr'), row = xbrlgl_entity_table.row(tr), data = row.data();
  if (row.child.isShown()) { // This row is already open - close it
    row.child.hide(); tr.removeClass('shown');
  }
  else { // Open this row
    row.child(xbrlgl_entity_format(data)).show(); tr.addClass('shown');
  }
});
$('#xbrlgl-entity2 tbody').on('click', 'td.info-control', function(event) {
  event.stopPropagation();
  var tr = $(this).closest('tr'), row = xbrlgl_entity2_table.row(tr), data = row.data();
  if (row.child.isShown()) { // This row is already open - close it
    row.child.hide(); tr.removeClass('shown');
  }
  else { // Open this row
    row.child(xbrlgl_entity_format(data)).show(); tr.addClass('shown');
  }
});
// -----------------------------------------------------------------
// ADS
//
$('#ads-abie tbody').on('click', 'td.info-control', function(event) {
  event.stopPropagation();
  var tr = $(this).closest('tr'), row = ads_abie_table.row(tr), data = row.data();
  if (row.child.isShown()) { // This row is already open - close it
    row.child.hide(); tr.removeClass('shown');
  }
  else { // Open this row
    row.child(ads_entity_format(data)).show(); tr.addClass('shown');
  }
});
$('#ads-entity tbody').on('click', 'td.info-control', function(event) {
  event.stopPropagation();
  var tr = $(this).closest('tr'), row = ads_entity_table.row(tr), data = row.data();
  if (row.child.isShown()) { // This row is already open - close it
    row.child.hide(); tr.removeClass('shown');
  }
  else { // Open this row
    row.child(ads_entity_format(data)).show(); tr.addClass('shown');
  }
});
$('#ads-entity2 tbody').on('click', 'td.info-control', function(event) {
  event.stopPropagation();
  var tr = $(this).closest('tr'), row = ads_entity2_table.row(tr), data = row.data();
  if (row.child.isShown()) { // This row is already open - close it
    row.child.hide(); tr.removeClass('shown');
  }
  else { // Open this row
    row.child(ads_entity_format(data)).show(); tr.addClass('shown');
  }
});
// -----------------------------------------------------------------
// UBL
//
$('#ubl-abie tbody').on('click', 'td.info-control', function(event) {
  event.stopPropagation();
  var tr = $(this).closest('tr'), row = ubl_abie_table.row(tr), data = row.data();
  if (row.child.isShown()) { // This row is already open - close it
    row.child.hide(); tr.removeClass('shown');
  }
  else { // Open this row
    row.child(ubl_entity_format(data)).show(); tr.addClass('shown');
  }
});
$('#ubl-entity tbody').on('click', 'td.info-control', function(event) {
  event.stopPropagation();
  var tr = $(this).closest('tr'), row = ubl_entity_table.row(tr), data = row.data();
  if (row.child.isShown()) { // This row is already open - close it
    row.child.hide(); tr.removeClass('shown');
  }
  else { // Open this row
    row.child(ubl_entity_format(data)).show(); tr.addClass('shown');
  }
});
$('#ubl-entity2 tbody').on('click', 'td.info-control', function(event) {
  event.stopPropagation();
  var tr = $(this).closest('tr'), row = ubl_entity2_table.row(tr), data = row.data();
  if (row.child.isShown()) { // This row is already open - close it
    row.child.hide(); tr.removeClass('shown');
  }
  else { // Open this row
    row.child(ubl_entity_format(data)).show(); tr.addClass('shown');
  }
});
$('#ubl-udt tbody').on('click', 'td.info-control', function(event) {
  event.stopPropagation();
  var tr = $(this).closest('tr'), row = ubl_udt_table.row(tr), data = row.data();
  if (row.child.isShown()) { // This row is already open - close it
    row.child.hide(); tr.removeClass('shown');
  }
  else { // Open this row
    row.child(ubl_dt_format(data)).show(); tr.addClass('shown');
  }
});
$('#ubl-qdt tbody').on('click', 'td.info-control', function(event) {
  event.stopPropagation();
  var tr = $(this).closest('tr'), row = ubl_udt_table.row(tr), data = row.data();
  if (row.child.isShown()) { // This row is already open - close it
    row.child.hide(); tr.removeClass('shown');
  }
  else { // Open this row
    row.child(qdt_format(data)).show(); tr.addClass('shown');
  }
});
// -----------------------------------------------------------------
// UN/CEFACT
//
$('#bie tbody').on('click', 'td.info-control', function(event) {
  event.stopPropagation();
  var tr = $(this).closest('tr'), row = bie_table.row(tr), data = row.data();
  if (row.child.isShown()) { // This row is already open - close it
    row.child.hide(); tr.removeClass('shown');
  }
  else { // Open this row
    row.child(bie_format(data)).show(); tr.addClass('shown');
  }
});
$('#bie-compt tbody').on('click', 'td.info-control', function(event) {
  event.stopPropagation();
  var tr = $(this).closest('tr'), row = bie_compt_table.row(tr), data = row.data();
  if (row.child.isShown()) { // This row is already open - close it
    row.child.hide(); tr.removeClass('shown');
  }
  else { // Open this row
    row.child(bie_compt_format(data)).show(); tr.addClass('shown');
  }
});
$('#bie-compt2 tbody').on('click', 'td.info-control', function(event) {
  event.stopPropagation();
  var tr = $(this).closest('tr'), row = bie_compt2_table.row(tr), data = row.data();
  if (row.child.isShown()) { // This row is already open - close it
    row.child.hide(); tr.removeClass('shown');
  }
  else { // Open this row
    row.child(bie_compt_format(data)).show(); tr.addClass('shown');
  }
});
$('#qdt tbody').on('click', 'td.info-control', function(event) {
  event.stopPropagation();
  var tr = $(this).closest('tr'), row = qdt_table.row(tr), data = row.data();
  if (row.child.isShown()) { // This row is already open - close it
    row.child.hide(); tr.removeClass('shown');
  }
  else { // Open this row
    row.child(qdt_format(data)).show(); tr.addClass('shown');
  }
});
$('#uncefact-udt tbody').on('click', 'td.info-control', function(event) {
  event.stopPropagation();
  var tr = $(this).closest('tr'), row = uncefact_udt_table.row(tr), data = row.data();
  if (row.child.isShown()) { // This row is already open - close it
    row.child.hide(); tr.removeClass('shown');
  }
  else { // Open this row
    row.child(dt_format(data)).show(); tr.addClass('shown');
  }
});
// -----------------------------------------------------------------
$('#acc tbody').on('click', 'td.info-control', function () {
  event.stopPropagation();
  var tr = $(this).closest('tr'), row = acc_table.row(tr), data = row.data();
  if (row.child.isShown()) { // This row is already open - close it
    row.child.hide(); tr.removeClass('shown');
  }
  else { // Open this row
    row.child(acc_format(data)).show(); tr.addClass('shown');
  }
});
$('#cc tbody').on('click', 'td.info-control', function(event) {
  event.stopPropagation();
  var tr = $(this).closest('tr'), row = cc_table.row(tr), data = row.data();
  if (row.child.isShown()) { // This row is already open - close it
    row.child.hide(); tr.removeClass('shown');
  }
  else { // Open this row
    row.child(cc_format(data)).show(); tr.addClass('shown');
  }
});
$('#cc2 tbody').on('click', 'td.info-control', function(event) {
  event.stopPropagation();
  var tr = $(this).closest('tr'), row = cc2_table.row(tr), data = row.data();
  if (row.child.isShown()) { // This row is already open - close it
    row.child.hide(); tr.removeClass('shown');
  }
  else { // Open this row
    row.child(cc_format(data)).show(); tr.addClass('shown');
  }
}); 
$('#udt tbody').on('click', 'td.info-control', function(event) {
  event.stopPropagation();
  var tr = $(this).closest('tr'), row = udt_table.row(tr), data = row.data();
  if (row.child.isShown()) { // This row is already open - close it
    row.child.hide(); tr.removeClass('shown');
  }
  else { // Open this row
    row.child(dt_format(data)).show(); tr.addClass('shown');
  }
});
// -----------------------------------------------------------------
// Add event listener for opening and closing detail records
// -----------------------------------------------------------------
function appendByNum(items, item) {
  if (!item.num) {
    return null;
  }
  if (items instanceof Array && item) {
    for (var i = 0; i < items.length; i++) {
      if (items[i].num && item.num === items[i].num) {
        items.splice(i, 1);
        items.push(item);
        return items;
      }
    }
    items.push(item);
    return items;
  }
  return null;
};
function removeByNum(items, item) {
  if (!item.num) {
    return null;
  }
  if (items instanceof Array && item) {
    for (var i = 0; i < items.length; i++) {
      if (items[i].num && item.num === items[i].num) {
        items.splice(i, 1);
        return items;
      }
    }
    return items;
  }
  return null;
};
function getNum(frame) {
  var table_id = content[frame].top;
  var id = $('#'+table_id+'-frame').parent().attr('id');
  var match, num;
  if (id) {
    match = id.match(/^top-component-([12])$/);
    if (match) {
      num = match[1]; return num;
    }
  }
  return null;
}
var compareNum = function(a, b) {
  var a_arr = a.num.split('.').map(function(v){ return +v; }),
      b_arr = b.num.split('.').map(function(v){ return +v; });
  while (a_arr.length > 0 && b_arr.length > 0) {
    var a_num = a_arr.shift(),
        b_num = b_arr.shift();
    if (a_num < b_num) { return -1; }
    if (b_num < a_num) { return  1; }
  }
  if (b_arr.length > 0) { return -1; }
  if (a_arr.length > 0) { return  1; }
  return 0;
}
function filterEntity(frame, objectClassTermQualifier, objectClassTerm) {
  var key, item, dictionaryEntryName, objectClass, regex,
      table, n, entityMap, entityRows;
  if ('string' !== typeof objectClassTermQualifier || 'string' !== typeof objectClassTerm) {
    return;
  }
  table = getEntityTable(frame);
  entityMap = getEntityMap(frame);
  if(!entityMap) {
    entityMap = new Map(); 
    data = table.data();
    n = 0;
    for (key in data) {
      item = data[key];
      dictionaryEntryName = item.DictionaryEntryName ||
          item.ObjectClassTerm+'. '+item.PropertyTerm+'. '+
          (item.RepresentationTerm
            ? item.RepresentationTerm
            : item.AssociatedObjectClass);
      if (dictionaryEntryName) {
        item.num = '' + (item.num || n++);
        item.ancestor = item.ObjectClassTerm;
        item.DictionaryEntryName = dictionaryEntryName;
        entityMap.set(dictionaryEntryName, item);
      }
    }
  }
  entityRows = [];
  objectClass = (objectClassTermQualifier
      ? objectClassTermQualifier+'_ '
      : '')+
    objectClassTerm;
  regex = new RegExp('^('+objectClass+')\\.');
  entityMap.forEach(function(value, key) {
    if (key && key.match(regex)) {
      entityRows.push(value);
    }
  });

  entityRows.sort(compareNum)

  table.clear();
  table.rows.add(entityRows)
  .draw();

  assignEntityRows(frame, entityRows);
  return entityRows;
}
function entityRowsUpdate(frame, entityRows, expandedRows, collapsedRows) {
  var table, table_id, expanded, collapsed, info, rows, i, idx, tr;
  table = getEntityTable(frame);
  table_id = getEntityTableID(frame);
  expanded = [];
  if (expandedRows) {
    expandedRows.forEach(function(row) {
      expanded.push(row.num);
    });
  }
  collapsed = [];
  if (collapsedRows) {
    collapsedRows.forEach(function(row) {
      collapsed.push(row.num);
    });
  }
  // checkAssociated(frame);
  info = table.page.info();
  rows = $('#'+table_id+' tbody tr');
  for (i = 0; i < rows.length; i++) {
    idx = info.start + i;
    tr = rows[i];
    if (entityRows[idx]) {
      if (expanded.indexOf(entityRows[idx].num) >= 0) {
        entityRows[idx].expanded = true;
      }
      if (collapsed.indexOf(entityRows[idx].num) >= 0) {
        entityRows[idx].expanded = false;
      }
      if (entityRows[idx].expanded) {
        tr.classList.add('expanded');
      }
      else {
        tr.classList.remove('expanded');
      }
    }
  }
}
function expandCollapse(frame, entityMap, tr) {
  var table, table_id,
      row, data, entityRows, componentType,
      expanded, collapsed, expandedRows, collapsedRows,
      tr_, tr_s, v,
      rows, i, idx, regex, num, match, associated;
  table = getEntityTable(frame);
  table_id = getEntityTableID(frame);
  row = table.row(tr);
  data = row.data();
  if (!data) { return; }
  componentType = data.ComponentType || data.Kind;
  if ('ASBIE' !== componentType && 'ASCC' !== componentType) {
    return;
  }
  entityRows = [];
  rows = table.data();
  for (i = 0; i < rows.length; i++) {
    row = rows[i];
    entityRows.push(row);
  }
  tr_s = $('#'+table_id+' tbody tr');
  if (tr.hasClass('expanded')) {
    tr.removeClass('expanded');
    removeByNum(expandedRows, data);
    collapsed = data.num;
    collapsedRows = [data];
    entityRows = entityRows.filter(function(row) {
      regx = new RegExp(collapsed+'\\.');
      num = row.num;
      match = num.match(regx);
      if (match) {
        removeByNum(expandedRows, row);
        appendByNum(collapsedRows, row);
      }
      return !match;
    });
  }
  else {
    tr.addClass('expanded');
    expanded = data.num;
    expandedRows = [data];
    for (i = 0; i < tr_s.length; i++) {
      tr_ = tr_s[i];
      if (tr_.classList.contains('expanded')) {
        row = table.row(tr_);
        data = row.data();
        if (!data) { return; }
        appendByNum(expandedRows, data);
      }
    }

    expandedRows.forEach(function(data_) {
      i = 0;
      associated = (data_.AssociatedObjectClassTermQualifier
          ? data_.AssociatedObjectClassTermQualifier+'_ '
          : '')+
        data_.AssociatedObjectClass;
      regex = new RegExp('^('+associated+')\\.');
      entityMap.forEach(function(value, key) {
        /*if (value.ancestor === data_.ancestor) {
          v = JSON.parse(JSON.stringify(value));
          appendByNum(entityRows, v);
        }*/
        if (key && key.match(regex)) {
          idx = data_.num+'.'+(i++);
          v = JSON.parse(JSON.stringify(value));
          v.num = idx;
          v.ancestor = data_.ancestor;
          appendByNum(entityRows, v);
        }
      });
    });
  }

  entityRows.sort(compareNum);

  table.clear();
  table.rows.add(entityRows)
  .draw();
  //
  entityRowsUpdate(frame, entityRows, expandedRows, collapsedRows);
  // $('#'+table_id).on('page.dt', function(event) {
  // event.stopPropagation();
  //   entityRowsUpdate(table, table_id, entityRows, expanded, collapsed);
  // });
  return entityRows;
}
// -----------------------------------------------------------------
// ADC
adcEntityRows = [];
// -----------------------------------------------------------------
// XBRL GL
xbrlglEntityRows = [];
// -----------------------------------------------------------------
// ADS
adsEntityRows = [];
// -----------------------------------------------------------------
// UBL
ublEntityRows = [];
// -----------------------------------------------------------------
// UN/CEFACT
bieComptRows = [];
// -----------------------------------------------------------------
ccRows = [];
// -----------------------------------------------------------------
// click row to show related
// -----------------------------------------------------------------
var FIRST_RATIO = 0.15;
var LAST_RATIO = 0.5;
// -----------------------------------------------------------------
function setComponentStyle(frame, tr) {
  var table, num, row, data, componentType, rootcomp, comp;
  table = getEntityTable(frame);
  table_id = getEntityTableID(frame);
  row = table.row(tr);
  data = row.data();
  if (!data) { return; }
  $('#'+table_id+' tbody tr.selected').removeClass('selected');
  tr.addClass('selected');
  num = getNum(frame);
  if ($('#top-component-'+num)[0].offsetHeight > window.innerHeight * FIRST_RATIO) {
    rootcomp = $('#component-'+num+' .split-pane');
    rootcomp.splitPane('firstComponentSize', window.innerHeight * FIRST_RATIO);
  }
  if ($('#bottom-bottom-component-'+num)[0].offsetHeight < 10) {
    comp = $('#bottom-component-'+num+' .split-pane');
    comp.splitPane('firstComponentSize', comp[0].offsetHeight * LAST_RATIO);
  }
  return data;
}
// -----------------------------------------------------------------
function showUpControl(num) {
  var control = $('#up-'+num);
  control.removeClass('d-none');
}
function hideUpControl(num) {
  var control = $('#up-'+num);
  control.addClass('d-none');
}
function showBackControl(num) {
  var control = $('#back-'+num);
  control.removeClass('d-none');
}
function hideBackControl(num) {
  var control = $('#back-'+num);
  control.addClass('d-none');
}
// -----------------------------------------------------------------
function setEntityRows(frame, objectClassTermQualifier, objectClassTerm) {
  switch (frame) {
    case 'adc':
      objectClassTermQualifier = objectClassTermQualifier || 'ADC';
      adcEntityRows = filterEntity('adc', objectClassTermQualifier, objectClassTerm);
      break;
    case 'xbrlgl':
      xbrlglEntityRows = filterEntity('xbrlgl', objectClassTermQualifier, objectClassTerm);
      break;
    case 'ads':
      objectClassTermQualifier = objectClassTermQualifier || 'ADS';
      adsEntityRows = filterEntity('ads', objectClassTermQualifier, objectClassTerm);
      break;
    case 'ubl':
      ublEntityRows = filterEntity('ubl', objectClassTermQualifier, objectClassTerm);
      break;
    case 'bie':
      bieComptRows = filterEntity('bie', objectClassTermQualifier, objectClassTerm);
      break;
    case 'acc':
      ccRows = filterEntity('acc', objectClassTermQualifier, objectClassTerm);
      break;
  }
}
function upAssociation(num) {
  var frame, table, tableTitle, title, match, objectClassTermQualifier, objectClassTerm,
      comp;
  frame = pane[num];
  table = content[frame]['bottom-top'];
  $('#'+table+' tbody tr.selected').removeClass('selected');
  tableTitle = $('#'+table+'-frame .table-title');
  title = tableTitle.text();
  match = title.match(/^(([^_]*)_ )?(.*)$/);
  if (match) {
    objectClassTermQualifier = match[2];
    objectClassTerm = match[3];
  }
  if (!objectClassTermQualifier && ['adc', 'ads'].indexOf(frame) >= 0) {
    objectClassTermQualifier = frame.toUpperCase();
  }
  previous_entity[num] = {
    'qualifier': objectClassTermQualifier,
    'term': objectClassTerm
  }

  showBackControl(num);

  comp = $('#bottom-component-'+num+' .split-pane');
  comp.splitPane('firstComponentSize', comp[0].offsetHeight);

  hideUpControl(num);

  table = content[frame]['bottom-bottom'][0];
  $('#'+table+'-frame').addClass('d-none');
  tableTitle = $('#'+table+'-frame .table-title');
  title = tableTitle.text();
  match = title.match(/^(([^_]*)_ )?(.*)$/);
  if (match) {
    objectClassTermQualifier = match[2];
    objectClassTerm = match[3];
  }

  setEntityRows(frame, objectClassTermQualifier, objectClassTerm);

  table = table.slice(0, -1);
  tableTitle = $('#'+table+'-frame .table-title');
  tableTitle.text(title);

  return false;
}
function previousEntity(num) {
  var frame, table, tableTitle, title, objectClassTermQualifier, objectClassTerm;
  frame = pane[num];
  objectClassTermQualifier = previous_entity[num].qualifier;
  objectClassTerm = previous_entity[num].term;
  table = content[frame]['bottom-top'];
  $('#'+table+' tbody tr.selected').removeClass('selected');
  tableTitle = $('#'+table+'-frame .table-title');
  title = (objectClassTermQualifier ? objectClassTermQualifier+'_ ' : '')+objectClassTerm;
  tableTitle.text(title);

  setEntityRows(frame, objectClassTermQualifier, objectClassTerm);

  previous_entity[num] = null;
  hideBackControl(num);

  return false;
}
function showEntity(tr, frame) {
  var table, //entityMap, entityRows,
      row, data, top_id, entity_id, num, qualifier, searchText, tableTitle;//, count;
  switch (frame) {
    case 'adc':
      table = adc_abie_table; entityMap = adcEntityMap; entityRows = adcEntityRows;
      break;
    case 'adc-cc':
      table = adc_acc_table; entityMap = adcCcMap; entityRows = adcCcRows;
      break;  
    case 'xbrlgl':
      table = xbrlgl_abie_table; entityMap = xbrlglEntityMap; entityRows = xbrlglEntityRows;
      break;
    case 'ads':
      table = ads_abie_table; entityMap = adsEntityMap; entityRows = adsEntityRows;
      break;
    case 'ubl':
      table = ubl_abie_table; entityMap = ublEntityMap; entityRows = ublEntityMap;
      break;
    case 'bie':
      table = bie_table; entityMap = bieComptMap; entityRows = bieComptRows;
      break;
    case 'acc':
      table = acc_table; entityMap = ccMap; entityRows = ccRows;
      break;
  }
  row = table.row(tr);
  data = row.data();
  if (!data) { return; }
  top_id = content[frame]['top'];
  entity_id = content[frame]['bottom-top'];
  num = getNum(frame);
  qualifier = (data.ObjectClassTermQualifier ? data.ObjectClassTermQualifier : '');
  if (!qualifier && ['adc', 'ads'].indexOf(frame) >= 0) {
    qualifier = frame.toUpperCase();
  }
  searchText = (qualifier ? qualifier+'_ ' : '')+data.ObjectClassTerm;
  showOverlay(null, false, searchText);
  tableTitle = $('#'+entity_id+'-frame .table-title');
  tableTitle.text(searchText);
  $('#'+top_id+' tbody tr.selected').removeClass('selected');
  tr.addClass('selected');

  if (num && $('#bottom-component-'+num)[0].offsetHeight < 10) {
    $('#component-'+num+' .split-pane').splitPane('firstComponentSize', window.innerHeight * FIRST_RATIO);
  }
  $('#bottom-component-'+num+' .split-pane').splitPane('lastComponentSize', 0);

  entityRows = filterEntity(frame, qualifier, data.ObjectClassTerm);
}
function showDetail(tr, frame) {
  var table_id, data, entity2_id, udt_id, qdt_id, num, componentType,
      entity2_table, COL_ObjectClassTerm, udttable, qdttable,
      //COL_CategoryCode, 
      COL_DictionaryEntryName,// COL_UNID, 
      COL_DataType,
      searchText = '', tableTitle;
  table = getEntityTable(frame);
  table_id = getEntityTableID(frame);
  $('#'+table_id+' tbody tr.selected').removeClass('selected');
  tr.addClass('selected');
  row = table.row(tr);
  data = row.data();
  if (!data) { return; }
  componentType = data.ComponentType || data.Kind;
  if ('ASBIE' === componentType || 'ASCC' === componentType) {
    return null;
  }
  setComponentStyle(frame, tr);
  entity2_id = content[frame]['bottom-bottom'][0];
  udt_id = content[frame]['bottom-bottom'][1];
  qdt_id = content[frame]['bottom-bottom'][2];
  num = getNum(frame);
  componentType = data.ComponentType || data.Kind;
  switch (frame) {
    case 'adc':
      entity2_table = adc_entity2_table;
      udttable      = adc_udt_table;
      COL_ObjectClassTerm     = adc_entity_COL_ObjectClassTerm;
      COL_DictionaryEntryName = adc_entity_COL_DictionaryEntryName;
      // COL_DataType            = adc_entity_COL_DataType;
      break;
    case 'adc-cc':
      entity2_table = adc_cc2_table;
      udttable      = adc_cc_udt_table;
      COL_ObjectClassTerm     = adc_cc_COL_ObjectClassTerm;
      COL_DictionaryEntryName = adc_cc_COL_DictionaryEntryName;
      // COL_DataType            = adc_cc_COL_DataType;
      break;
    case 'xbrlgl':
      entity2_table = xbrlgl_entity2_table;
      COL_ObjectClassTerm = xbrlgl_entity_COL_ObjectClassTerm;
      // udttable = xbrlgl_udt_table;
      break;
    case 'ads':
      entity2_table = ads_entity2_table;
      COL_ObjectClassTerm = ads_entity_COL_ObjectClassTerm;
      // udttable = ads_udt_table;
      break;
    case 'ubl':
      entity2_table = ubl_entity2_table;
      udttable      = ubl_udt_table;
      qdttable      = ubl_qdt_table;
      COL_ObjectClassTerm     = ubl_entity_COL_ObjectClassTerm;
      COL_DictionaryEntryName = ubl_dt_COL_DictionaryEntryName;
      COL_CategoryCode        = ubl_dt_COL_CategoryCode;
      break;
    case 'bie':
      entity2_table = bie_compt2_table;
      udttable      = uncefact_udt_table;
      qdttable      = qdt_table;
      // COL_ObjectClassTerm     = bie_compt_COL_ObjectClassTerm;
      COL_DictionaryEntryName = bie_compt_COL_DictionaryEntryName;
      COL_UNID                = qdt_COL_UNID;
      COL_Datatype            = dt_COL_DataType;
      break;
    case 'acc':
      entity2_table = cc2_table;
      udttable      = udt_table;
      COL_ObjectClassTerm = cc_COL_ObjectClassTerm;
      COL_DataType        = dt_COL_DataType;
      break;
  }
  if (['RLBIE','RLCC','RBIE','RCC'].indexOf(componentType) >= 0) {
    $('#'+entity2_id+'-frame').removeClass('d-none');
    if (udt_id) {
      $('#'+udt_id+'-frame').addClass('d-none');
    }
    if (qdt_id) {
      $('#'+qdt_id+'-frame').addClass('d-none');
    }
    if (['adc', 'adc-cc'].indexOf(frame) >= 0) {
      var qualifier = data.RelationObjectClassTermQualifier,
          term = data.RelationObjectClassTerm;
      searchText = (qualifier ? qualifier+'_ ' : '')+term;
      entity2_table.columns(COL_ObjectClassTerm)
      .search('^'+searchText+'$', /*regex*/true, /*smart*/false, /*caseInsen*/false)
      .draw();
    }
    else if (['xbrlgl', 'ads', 'ubl'].indexOf(frame) >= 0) {
      searchText = data.AssociatedObjectClass;
      entity2_table.columns(COL_ObjectClassTerm)
      .search('^'+searchText+'$', /*regex*/true, /*smart*/false, /*caseInsen*/false)
      .draw();
    }
    else if (['bie', 'acc'].indexOf(frame) >= 0) {
      searchText = (data.AssociatedObjectClassTermQualifier
        ? data.AssociatedObjectClassTermQualifier+'_ '
        : '')+
        data.AssociatedObjectClass;
      entity2_table.columns(COL_DictionaryEntryName)
      .search('^'+searchText+'\\.', /*regex*/true, /*smart*/false, /*caseInsen*/false)
      .draw();
    }
    tableTitle = $('#'+entity2_id+'-frame .table-title');
    tableTitle.text(searchText);
    showUpControl(num);
  }
  else if (['IDBIE','IDCC','BBIE','BCC'].indexOf(componentType) >= 0) {
    if (qdt_id && data.QualifiedDataTypeUID) {
      tableTitle = $('#'+qdt_id+'-frame .table-title');
      $('#'+entity2_id+'-frame').addClass('d-none');
      if (udt_id) {
        $('#'+udt_id+'-frame').addClass('d-none');
      }
      if (qdt_id) {
        $('#'+qdt_id+'-frame').removeClass('d-none');
      }
      searchText = data.QualifiedDataTypeUID;
      if (['bie'].indexOf(frame) >= 0) {
        qdttable.columns(qdt_COL_UNID)
        .search('^'+searchText+'$', /*regex*/true, /*smart*/false, /*caseInsen*/false)
        .draw();
      }
      tableTitle.text(searchText);
    }
    else if (udt_id) {
      tableTitle = $('#'+udt_id+'-frame .table-title');
      $('#'+entity2_id+'-frame').addClass('d-none');
      if (udt_id) {
        $('#'+udt_id+'-frame').removeClass('d-none');
      }
      if (qdt_id) {
        $('#'+qdt_id+'-frame').addClass('d-none');
      }
      searchText = data.RepresentationTerm;
      if (['ubl'].indexOf(frame) >= 0) {
        udttable.columns(COL_DictionaryEntryName)
        .search('^'+searchText+'\\.', /*regex*/true, /*smart*/false, /*caseInsen*/false)
        .draw();
      }
      else if (['bie'].indexOf(frame) >= 0) {
        udttable.columns(dt_COL_DictionaryEntryName)
        .search('^'+searchText+'\\.', true, false, false)
        .draw();
      }
      else if (['adc', 'acc'].indexOf(frame) >= 0) {
        udttable.columns(COL_DataType)
        .search('^'+searchText+'\\.', /*regex*/true, /*smart*/false, /*caseInsen*/false)
        .draw();
      }
      searchText = searchText+'\. Type';
      tableTitle.text(searchText);
    }
    else {
      tr.removeClass('selected');
      $('#'+entity2_id+'-frame').addClass('d-none');
      if (udt_id) {
        $('#'+udt_id+'-frame').addClass('d-none');
      }
      if (qdt_id) {
        $('#'+qdt_id+'-frame').addClass('d-none');
      }
      $('#bottom-component-'+num+' .split-pane').splitPane('lastComponentSize', 0);
    }
    hideUpControl(num);
  }
}
// -----------------------------------------------------------------
// ADC
//
  $('#adc-abie tbody').on('click', 'td:not(.info-control)', function () {
    event.stopPropagation();
    var tr = $(this).closest('tr'), frame = 'adc';
    showEntity(tr, frame);
  });
  $('#adc-entity tbody').on('click', 'td:not(.info-control)', function () {
    event.stopPropagation();
    var tr = $(this).closest('tr'), frame = 'adc',
        row = adc_entity_table.row(tr), data = row.data(),
        componentType = data.ComponentType || data.Kind;
    if ('ASBIE' === componentType || 'ASCC' === componentType) {
      adcEntityRows = expandCollapse(frame, adcEntityMap, tr);      
    }
    else {
      showDetail(tr, frame);
    }
  });
// -----------------------------------------------------------------
// ADC CC
//
$('#adc-acc tbody').on('click', 'td:not(.info-control)', function () {
  event.stopPropagation();
  var tr = $(this).closest('tr'), frame = 'adc-cc';
  showEntity(tr, frame);
});
$('#adc-cc tbody').on('click', 'td:not(.info-control)', function () {
  event.stopPropagation();
  var tr = $(this).closest('tr'), frame = 'adc-cc',
      row = adc_cc_table.row(tr), data = row.data(),
      componentType = data.ComponentType || data.Kind;
  if ('ASBIE' === componentType || 'ASCC' === componentType) {
    adcEntityRows = expandCollapse(frame, adcEntityMap, tr);      
  }
  else {
    showDetail(tr, frame);
  }
});
// -----------------------------------------------------------------
// XBRL GL
//
  $('#xbrlgl-abie tbody').on('click', 'td:not(.info-control)', function () {
    event.stopPropagation();
    var tr = $(this).closest('tr'), frame ='xbrlgl';
    showEntity(tr, frame);
  });
  $('#xbrlgl-entity tbody').on('click', 'td:not(.info-control)', function () {
    event.stopPropagation();
    var tr = $(this).closest('tr'), frame ='xbrlgl',
        row = xbrlgl_entity_table.row(tr), data = row.data(),
        componentType = data.ComponentType || data.Kind;
    if ('ASBIE' === componentType || 'ASCC' === componentType) {
      xbrlglEntityRows = expandCollapse(frame, xbrlglEntityMap, tr);      
    }
    else {
      showDetail(tr, frame);
    }
  });
// -----------------------------------------------------------------
// ADS
//
  $('#ads-abie tbody').on('click', 'td:not(.info-control)', function () {
    event.stopPropagation();
    var tr = $(this).closest('tr'), frame = 'ads';
    showEntity(tr, frame);
  });
  $('#ads-entity tbody').on('click', 'td:not(.info-control)', function () {
    event.stopPropagation();
    var tr = $(this).closest('tr'), frame = 'ads',
        row = ads_entity_table.row(tr), data = row.data(),
        componentType = data.ComponentType || data.Kind;
    if ('ASBIE' === componentType || 'ASCC' === componentType) {
      adsEntityRows = expandCollapse(frame, adsEntityMap, tr);      
    }
    else {
      showDetail(tr, frame);
    }
  });
// -----------------------------------------------------------------
// UBL
//
  $('#ubl-abie tbody').on('click', 'td:not(.info-control)', function () {
    event.stopPropagation();
    var tr = $(this).closest('tr'), frame = 'ubl';
    showEntity(tr, frame);
  });
  $('#ubl-entity tbody').on('click', 'td:not(.info-control)', function () {
    event.stopPropagation();
    var tr = $(this).closest('tr'), frame = 'ubl',
        row = ubl_entity_table.row(tr), data = row.data(),
        componentType = data.ComponentType || data.Kind;
    if ('ASBIE' === componentType || 'ASCC' === componentType) {
      ublEntityRows = expandCollapse(frame, ublEntityMap, tr);      
    }
    else {
      showDetail(tr, frame);
    }
  });
// -----------------------------------------------------------------
// UN/CEFACT
//
  $('#bie tbody').on('click', 'td:not(.info-control)', function () {
    event.stopPropagation();
    var tr = $(this).closest('tr'), frame = 'bie';
    showEntity(tr, frame);
  });
  $('#bie-compt tbody').on('click', 'td:not(.info-control)', function () {
    event.stopPropagation();
    var tr = $(this).closest('tr'), frame = 'bie',
        row = bie_compt_table.row(tr), data = row.data(),
        componentType = data.ComponentType || data.Kind;
    if ('ASBIE' === componentType || 'ASCC' === componentType) {
      bieComptRows = expandCollapse(frame, bieComptMap, tr);
    }
    else {
      showDetail(tr, frame);
    }
  });
// -----------------------------------------------------------------
  $('#acc tbody').on('click', 'td:not(.info-control)', function () {
    event.stopPropagation();
    var tr = $(this).closest('tr'), frame = 'acc';
    showEntity(tr, frame);
  });
  $('#cc tbody').on('click', 'td:not(.info-control)', function () {
    event.stopPropagation();
    var tr = $(this).closest('tr'), frame = 'acc',
        row = cc_table.row(tr), data = row.data(),
        componentType = data.ComponentType || data.Kind;
    if ('ASBIE' === componentType || 'ASCC' === componentType) {
      ccRows = expandCollapse(frame, ccMap, tr);      
    }
    else {
      showDetail(tr, frame);
    }
  });
// -----------------------------------------------------------------
  $('.overlay').click(function() {
    $(this).addClass('d-none');
  });
// -----------------------------------------------------------------
  tab1 = tab1 || 'adc';
  tab2 = tab2 || 'adc-cc';
  setFrame(2, tab2);
  setFrame(1, tab1);
/**
https://github.com/shagstrom/split-pane
Split pane component min-height and min-width are supported,
and the component size can be set programmatically with
$(selector).splitPane('firstComponentSize', 0);"
or
$(selector).splitPane('lastComponentSize', 100);"
Only pixel values are supported.
*/
  setTimeout(function() {
    $('div.split-pane').splitPane();
    $('#up-1').on('click', function(event) { // .unbind('click').bind('click', function(event) {
      upAssociation(1);
    });
    $('#up-2').on('click', function(event) {
      upAssociation(2);
    });
    $('#back-1').on('click', function(event) {
      previousEntity(1);
    });
    $('#back-2').on('click', function(event) {
      previousEntity(2);
    });
  }, 500);
}