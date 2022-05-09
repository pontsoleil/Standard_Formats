var ccts_cct = {
  'Amount': {
    'XML':'xsd:decimal', 'JSON':'number' },
  'BinaryObject': {
    'XML':'xsd:base64Binary', 'JSON':'string' },
  'Code': {
    'XML':'xsd:normalizadString', 'JSON':'string' },
  'DateTime': {
    'XML':'xsd:string', 'JSON':'string' },
  'Date': {
    'XML':'xsd:date', 'JSON':'string' },
  'Time': {
    'XML':'xsd:time', 'JSON':'string' },
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
    'xbrlgl': {
      'top': 'xbrlgl-abie', 'bottom-top': 'xbrlgl-entity', 'bottom-bottom': ['xbrlgl-entity2']
    },
    'ts5409': {
      'top': 'ts5409-abie', 'bottom-top': 'ts5409-entity', 'bottom-bottom': ['ts5409-entity2', 'ts5409-udt']
    },
    'saf': {
      'top': 'saf-abie', 'bottom-top': 'saf-entity', 'bottom-bottom': ['saf-entity2']
    },
    'adcs': {
      'top': 'adcs-abie', 'bottom-top': 'adcs-entity', 'bottom-bottom': ['adcs-entity2']
    },
    'ads': {
      'top': 'ads-abie', 'bottom-top': 'ads-entity', 'bottom-bottom': ['ads-entity2']
    },
    'gb': {
      'top': 'gb-abie', 'bottom-top': 'gb-entity', 'bottom-bottom': ['gb-entity2']
    },
    'peppol': {
      'top': 'peppol-abie', 'bottom-top': 'peppol-entity', 'bottom-bottom': ['peppol-entity2']
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
    'adc': false, 'xbrlgl': false, 'ts5409': false, 'saf': false, 'adcs': false, 'ads': false, 'peppol': false, 'ubl': false, 'bie': false, 'acc': false
  },
  pane = {
    1: null,
    2: null
  },
  table_title = {
    'adc': {
      'adc-entity': null, 'adc-entity2': null, 'adc-udt': null
    },
    'xbrlgl': {
      'xbrlgl-entity': null, 'xbrlgl-entity2': null
    },
    'ts5409': {
      'ts5409-entity': null, 'ts5409-entity2': null, 'ts5409-udt': null
    },
    'adcs': {
      'adcs-entity': null, 'adcs-entity2': null
    },
    'saf': {
      'saf-entity': null, 'saf-entity2': null
    },
    'ads': {
      'ads-entity': null, 'ads-entity2': null
    },
    'gb': {
      'gb-entity': null, 'gb-entity2': null
    },
    'peppol': {
      'peppol-entity': null, 'peppol-entity2': null
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

  xbrlgl_abie_table, xbrlgl_entity_table, xbrlgl_entity2_table,
  xbrlgl_abie_COL_ComponentName, xbrlgl_abie_COL_ObjectClassTerm, xbrlgl_abie_COL_DictionaryEntryName,
  xbrlgl_entity_COL_DictionaryEntryName, xbrlgl_entity_COL_ObjectClassTerm,
  
  ts5409_abie_table, ts5409_entity_table, ts5409_entity2_table, ts5409_udt_table,
  ts5409_abie_COL_Module, ts5409_abie_COL_ComponentName, ts5409_abie_COL_DictionaryEntryName,
  ts5409_entity_COL_DictionaryEntryName, ts5409_entity_COL_ObjectClassTerm,
  ts5409_dt_COL_CategoryCode, ts5409_dt_COL_ObjectClassTerm, ts5409_dt_COL_DictionaryEntryName, adc_dt_COL_DataType,

  ads_abie_table, ads_entity_table, ads_entity2_table,
  ts5409_abie_COL_Module,

  adcs_abie_table, adcs_entity_table, adcs_entity2_table,
  adcs_abie_COL_ComponentName, adcs_abie_COL_ObjectClassTerm, adcs_abie_COL_DictionaryEntryName,
  adcs_entity_COL_DictionaryEntryName, adcs_entity_COL_ObjectClassTerm,

  saf_abie_table, saf_entity_table, saf_entity2_table,
  saf_abie_COL_ComponentName, saf_abie_COL_ObjectClassTerm, saf_abie_COL_DictionaryEntryName,
  saf_entity_COL_DictionaryEntryName, saf_entity_COL_ObjectClassTerm,

  acc_COL_ObjectClassTerm, cc_COL_ObjectClassTerm, cc_COL_PropertyTerm, cc_COL_ShortName,
  dt_COL_DataType, dt_COL_DictionaryEntryName,
  bie_COL_ObjectClassTerm,
  bie_compt_COL_DictionaryEntryName, bie_compt_COL_ShortName,
  qdt_COL_UNID,

  gb_abie_table, gb_entity_table, gb_entity2_table,
  gb_abie_COL_ComponentName, gb_abie_COL_ObjectClassTerm, gb_abie_COL_DictionaryEntryName,
  gb_entity_COL_DictionaryEntryName, gb_entity_COL_ObjectClassTerm,

  peppol_abie_table, peppol_entity_table, peppol_entity2_table,
  peppol_abie_COL_ComponentName, peppol_abie_COL_ObjectClassTerm, peppol_abie_COL_DictionaryEntryName,
  peppol_entity_COL_DictionaryEntryName, peppol_entity_COL_ObjectClassTerm,

  ubl_abie_table, ubl_abie_COL_ComponentName, ubl_abie_COL_DictionaryEntryName,
  ubl_entity_table, ubl_entity_COL_DictionaryEntryName, ubl_entity_COL_ObjectClassTerm,
  ubl_udt_table, ubl_dt_COL_CategoryCode, ubl_dt_COL_DictionaryEntryName,
  ubl_acc_table, ubl_cc_table, ubl_un_udt_table, ubl_cc2_table,

  adcMap, xbrlglMap, ts5409Map, safMap, adcsMap, adsMap, gbMap, peppolMap, ublMap, bieMap, accMap,
  adcEntityMap, xbrlglEntityMap, ts5409EntityMap, adcsEntityMap, safEntityMap, adsEntityMap, gbEntityMap, peppolEntityMap, ublEntityMap, bieComptMap, ccMap,
  adcRows, xbrlglRows, ts5409Rows, adcsRows, safRows, adsRows, gbRows, peppolRows, ublRows, bieRows, abie,
  adcEntityRows, xbrlglEntityRows, ts5409EntityRows, adcsEntityRows, safEntityRows, adsEntityRows, gbEntityRows, peppolEntityRows, ublEntityRows, bieComptRows, bie,

  populateAdc, populateXbrlgl, populateTs5409, populateAdcs, populateSaf, populateAds, populateGb, populatePeppol, populateUbl, populateBie, populateAcc,
  getTopTable, getTopTableID, getEntityTable, getEntityTableID,

  DESCRIPTION_LENGTH;

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
      if (title_html.length > 0 && frameTitle2.length > 0) {
        title_html = (title_html
          ? title_html+'<br>vs<br>'
          : '')+
          frameTitle2.html().trim();
      }
      else {
        title_html = '';
      }
    }
  }
  $('.overlay').removeClass('d-none');
  $('.overlay .title').html(title_html);
  if (title_html) {
    if (autoclose) {
      setTimeout(function() {
        hideOverlay();
      }, 20000);
    }
  }
  else {
    $('.overlay .title').html(frame1+' or '+frame2+' does not exists.');
    setTimeout(function() {
      location.replace(location.href)
    }, 20000);
  }
}
function setFrame(num, frame) {
  var frame, match, overlay, title, frameTitle, title_html, root_pane, id, base;
  var top_component, bottom_top_component, bottom_bottom_component;
  var top_content, bottom_top_content, bottom_bottom_content;
  var root_pane, frames, children, child, i;

  match = frame.match(/^(([^-]*)-)?(.*)$/);
  frame = match[2] || match[3];
  pane[num] = frame;

  if (pane[1] && pane[2]) {
    showOverlay(pane, /** autoclose */true);
  }
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
  $('#tab-'+(1+num%2)+' .tablinks').removeClass('d-none');
  $('#tab-'+(1+num%2)+' .tablinks.'+frame).addClass('d-none');
  
  if ('adc' === frame) {
    // adc_abie_table.columns(adc_abie_COL_Module)
    // .search('^.+$', /*regex*/true, /*smart*/false, /*caseInsen*/false).draw();
    // .search('^((?!(Core)).)*$', /*regex*/true, /*smart*/false, /*caseInsen*/false).draw();
  }
  else if ('xbrlgl' === frame) {
    // xbrlgl_abie_table.columns(xbrlgl_abie_COL_ObjectClassTerm)
    // .search('^.+$', /*regex*/true, /*smart*/false, /*caseInsen*/false).draw();
    // .search('^Accounting Entries$', /*regex*/true, /*smart*/false, /*caseInsen*/false).draw();
  }
  else if ('ts5409' === frame) {
    // ts5409_abie_table.columns(ts5409_abie_COL_Module)
    // .search('^.+$', /*regex*/true, /*smart*/false, /*caseInsen*/false).draw();
    // .search('^((?!(Core)).)*$', /*regex*/true, /*smart*/false, /*caseInsen*/false).draw();
  }
  else if ('ads' === frame) {
    // ads_abie_table.column(ads_abie_COL_Table)
    // .search('^.+$', /*regex*/true, /*smart*/false, /*caseInsen*/false).draw();
  }
  else if ('gb' === frame) {
  }
  else if ('adcs' === frame) {
  }
  else if ('saf' === frame) {
  }
  else if ('peppol' === frame) {
    // peppol_abie_table.columns(peppol_abie_COL_ObjectClassTerm)
    // .search('^.+$', /*regex*/true, /*smart*/false, /*caseInsen*/false).draw();
  //   .search('^Invoice$', /*regex*/true, /*smart*/false, /*caseInsen*/false).draw();
  }
  else if ('ubl' === frame) {
    // ubl_abie_table.column(ubl_abie_COL_DictionaryEntryName)
    // .search('^.+$', /*regex*/true, /*smart*/false, /*caseInsen*/false).draw();
  //   .search('Line\. Details$', /*regex*/true, /*smart*/false, /*caseInsen*/false).draw();
  }
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
// https://stackoverflow.com/questions/196972/convert-string-to-title-case-with-javascript
function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}
function capitalize(s) {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}
function pad(num, size) {
  var s = num + "";
  s = s.padStart(size,'0');
  return s;
}
function adc_entity_format(d) { // d is the original data object for the row
  if (!d) { return null; }
  var html, name, key, nameAC, cct, xml, json, match, description;
  var Abbreviation = abbreviation;
  if ('ABIE' === d.Kind) {
    name = d.Table;
    nameAC = name.split('_').map(function(t){ return toTitleCase(t)});
    nameAC = nameAC.join('');
    nameAC = 'Adc'+nameAC;
  }
  else {
    name = d.Name
        ? d.Name
        : d.PropertyTerm+' '+d.RepresentationTerm;
    nameAC = name;
    name = name.replace(/ /g, '_');
    for (key in Abbreviation) {
      var abbrev = Abbreviation[key],
          regx = RegExp(key),
          match = name.match(regx);
      if (match) {
        nameAC = nameAC.replace(regx, abbrev);
      }
    }
    nameAC = nameAC.replace(/[ _]/g, '');
  }

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
  description = description.replace(/_/g, ' ');

  html = '<table cellpadding="4" cellspacing="0" border="0" style="width:100%; padding-left:16px;">'+
  '<colgroup>'+
    '<col span="1" style="width: '+H1+'%;">'+
    '<col span="1" style="width: '+H2+'%;">'+
  '</colgroup>'+
  (description ? '<tr><td colspan="2">'+description+'</td><tr>' : '')+
  '<tr><td>'+
  (d.UNID
    ? d.UNID
    : (d.num //&& d.No
      ? 'ADC'+pad(d.num, 6)//+pad(d.No, 3)
      : 'Dictionary Entry Name:'
    )
  )+'</td>'+
  '<td>'+(d.DictionaryEntryName ? d.DictionaryEntryName : '')+'</td></tr>'+
  (d.ObjectClassTerm
    ? '<tr><td style="font-size:smaller;float:right">Object Class Term:</td>'+
      '<td>'+(d.ObjectClassTermQualifier ? d.ObjectClassTermQualifier+'_ ' : '')+d.ObjectClassTerm+'</td></tr>'
    : ''
  )+
  ('ABIE' === d.Kind
    ? '<tr><td>ISO 21378:2019</td><td>'+name+'</td></tr>'+
        '<tr><td>XML</td><td>'+nameAC+'.xsd</td></tr>'+
        '<tr><td>JSON</td><td>'+nameAC+'.json</td></tr>'
    : (d.PropertyTerm
        ? '<tr><td style="font-size:smaller;float:right">Property Term:</td>'+
          '<td>'+(d.PropertyTermQualifier ? d.PropertyTermQualifier+'_ ' : '')+' '+d.PropertyTerm+'</td></tr>'
        : '')+
      (d.RepresentationTerm
        ? '<tr><td style="font-size:smaller;float:right">Representation Term:</td><td>'+d.RepresentationTerm+'</td></tr>'
        : '')+
      (d.AssociatedObjectClass
        ? '<tr><td style="font-size:smaller;float:right">Associated Object Class:</td>'+
          '<td>'+
            (d.AssociatedObjectClassTermQualifier ? d.AssociatedObjectClassTermQualifier+'_ ' : '')+
            d.AssociatedObjectClass+
          '</td></tr>'
        : '')+
      (d.UsageRule
        ? '<tr><td style="font-size:smaller">Usage Rule:</td><td>'+d.UsageRule+'</td></tr>'
        : '')+
      (d.Datatype
        ? '<tr><td>ISO 21378:2019</td><td>'+name+'</td></tr>'+
          (d.PK_REF
            ? '<tr><td></td>'+
              '<td>'+d.PK_REF+' '+(d.RefField ? d.RefField+' ( '+d.RefTable+' )' : '')+'</td></tr>'
            : '')+
          '<tr><td></td><td>data type: '+d.Datatype+'&nbsp;&nbsp;( '+d.Representation+' )'+(d.Occurence ? '&nbsp;&nbsp;occurence: '+d.Occurence+'</td></tr>' : '')
        : '')+
      '<tr><td>XML</td><td>'+nameAC+
      (d.RepresentationTerm
        ? ' cct:'+d.RepresentationTerm+'Type'+(xml ? '&nbsp;&nbsp;( '+xml+' )' : '( complexType )')+'</td></tr>'
        : ' ( complexType )</td></tr>')+
      '<tr><td>JSON</td><td>'+nameAC+(json ? '&nbsp;&nbsp;( '+json+' )' : '&nbsp;&nbsp;( object )')+'</td></tr>'+
      '<tr><td>xBRL GL</td><td>'+(d.XBRLGL ? d.XBRLGL : 'TBD')+'</td></tr>'
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
    ? '<tr><td style="font-size:smaller;float:right">Property Term:</td><td>'+d.PropertyTerm+'</td></tr>'
    : '')+
  (d.RepresentationTerm
    ? '<tr><td style="font-size:smaller;float:right">Representation Term:</td><td>'+
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
  ? '<tr><td style="font-size:smaller;float:right">Object Class Term:</td>'+
    '<td>'+
    (d.ObjectClassTermQualifier ? d.ObjectClassTermQualifier+'_ ' : '')+
    d.ObjectClassTerm+'</td></tr>'
  : '')+
  (d.PropertyTerm
  ? '<tr><td style="font-size:smaller;float:right">Property Term:</td>'+
    '<td>'+
      (d.PropertyTermQualifier ? d.PropertyTermQualifier+'_ ' : '')+d.PropertyTerm+
    '</td></tr>'
  : '')+
  (d.RepresentationTerm
  ? '<tr><td style="font-size:smaller;float:right">Representation Term:</td>'+
    '<td>'+d.RepresentationTerm+'</td></tr>'
  : '')+
  (d.AssociatedObjectClass
  ? '<tr><td style="font-size:smaller;float:right">Associated Object Class:</td>'+
    '<td>'+
      (d.AssociatedObjectClassTermQualifier
        ? d.AssociatedObjectClassTermQualifier+'_ '
        : '')+
      d.AssociatedObjectClass+
    '</td></tr>'
  : '')+
  '<tr><td>xBRL GL</td><td>'+
    (d.element
      ? d.element.trim()+' '+(d.Datatype ? '(xsd:'+d.Datatype+')' : '')
      : '')+
    '</td></tr>'+
  '</table>';
  return html;
}
function ts5409_entity_format(d) { // d is the original data object for the row
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
  var html, name, name0, key, nameAC, cct, xml, json, match, description;
  var Abbreviation = abbreviation;
  if ('ABIE' === d.Kind) {
    name = d.Table.split(' ');
    name0 = name[0];
    name.shift();
    name = name.map(function(t){ return toTitleCase(t)});
    name = name0+'_'+name.join('_')
    nameAC = d.Table.split(' ').map(function(t){ return toTitleCase(t)});
    nameAC = nameAC.join('');
    nameAC = 'Adc'+nameAC;
  }
  else {
    name = d.Name
        ? d.Name
        : d.PropertyTerm;//+' '+d.RepresentationTerm;
    nameAC = name;
    name = name.replace(/ /g, '_');
    for (key in Abbreviation) {
      var abbrev = Abbreviation[key],
          regx = RegExp(key),
          match = name.match(regx);
      if (match) {
        nameAC = nameAC.replace(regx, abbrev);
      }
    }
    nameAC = nameAC.replace(/ /g, '');    
  }

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
  description = description.replace(/_/g, ' ');

  html = '<table cellpadding="4" cellspacing="0" border="0" style="width:100%; padding-left:16px;">'+
  '<colgroup>'+
    '<col span="1" style="width: '+H1+'%;">'+
    '<col span="1" style="width: '+H2+'%;">'+
  '</colgroup>'+
  (description ? '<tr><td colspan="2">'+description+'</td><tr>' : '')+
  '<tr><td>'+
  (d.UNID
    ? d.UNID
    : (d.num //&& d.No
        // ? 'TS5409'+d.Kind+pad(d.num, 2)+pad(d.No, 3)
        ? 'ADC'+pad(d.num, 6)
        : 'Dictionary Entry Name:'
      )
  )+'</td><td>'+(d.DictionaryEntryName ? d.DictionaryEntryName : '')+'</td></tr>'+
  (d.ObjectClassTerm
    ? '<tr><td style="font-size:smaller;float:right">Object Class Term:</td>'+
      '<td>'+(d.ObjectClassTermQualifier ? d.ObjectClassTermQualifier+'_ ' : '')+d.ObjectClassTerm+'</td></tr>'
    : ''
  )+
  ('ABIE' === d.Kind
    ? '<tr><td>ISO 21378:2019</td><td>'+name+'</td></tr>'+
        '<tr><td>XML</td><td>'+nameAC+'.xsd</td></tr>'+
        '<tr><td>JSON</td><td>'+nameAC+'.json</td></tr>'
    : (d.PropertyTerm
        ? '<tr><td style="font-size:smaller;float:right">Property Term:</td>'+
          '<td>'+(d.PropertyTermQualifier ? d.PropertyTermQualifier+'_ ' : '')+' '+d.PropertyTerm+'</td></tr>'
        : '')+
      (d.RepresentationTerm
        ? '<tr><td style="font-size:smaller;float:right">Representation Term:</td><td>'+d.RepresentationTerm+'</td></tr>'
        : '')+
      (d.AssociatedObjectClass
        ? '<tr><td style="font-size:smaller;float:right">Associated Object Class:</td>'+
          '<td>'+
            (d.AssociatedObjectClassTermQualifier ? d.AssociatedObjectClassTermQualifier+'_ ' : '')+
            d.AssociatedObjectClass+
          '</td></tr>'
        : '')+
      (d.UsageRule
        ? '<tr><td style="font-size:smaller">Usage Rule:</td><td>'+d.UsageRule+'</td></tr>'
        : '')+
      (d.Datatype
        ? '<tr><td>CSV</td><td>'+name+'</td></tr>'+
          (d.PK_REF
            ? '<tr><td></td>'+
              '<td>'+d.PK_REF+' '+(d.RefField ? d.RefField+' ( '+d.RefTable+' )' : '')+'</td></tr>'
            : '')+
          '<tr><td></td><td>data type: '+d.Datatype+'&nbsp;&nbsp;( '+d.Representation+' )'+(d.Occurence ? '&nbsp;&nbsp;occurence: '+d.Occurence+'</td></tr>' : '')
        : '')+
      '<tr><td>ISO 21378:2019</td><td>'+name+'</td></tr>'+
      '<tr><td>XML</td><td>'+nameAC+(xml ? '&nbsp;&nbsp;( '+xml+' )' : '( complexType )')+'</td></tr>'+
      '<tr><td>JSON</td><td>'+nameAC+(json ? '&nbsp;&nbsp;( '+json+' )' : '&nbsp;&nbsp;( object )')+'</td></tr>'//+
      // '<tr><td>xBRL GL</td><td>'+(d.XBRLGL ? d.XBRLGL : 'TBD')+'</td></tr>'
  )+
  '</table>';
  return html;
}
function ts5409_dt_format(d) { // d is the original data object for the row
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
    ? '<tr><td style="font-size:smaller;float:right">Property Term:</td><td>'+d.PropertyTerm+'</td></tr>'
    : '')+
  (d.RepresentationTerm
    ? '<tr><td style="font-size:smaller;float:right">Representation Term:</td><td>'+
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
  '<tr><td style="font-size:smaller;float:right">object class term:</td>'+
    '<td>'+
    (d.ObjectClassTermQualifier
      ? d.ObjectClassTermQualifier+'_ '
      : '')+
    d.ObjectClassTerm+'</td><tr>'+
  (d.PropertyTerm
    ? '<tr><td style="font-size:smaller;float:right">Property Term:</td>'+
        '<td>'+
        (d.PropertyTermQualifier
          ? d.PropertyTermQualifier+'_ '
          : '')+
        d.PropertyTerm+'</td><tr>'
    : '')+
  ("BBIE" === d.Kind
    ? '<tr><td style="font-size:smaller;float:right">Representation Term:</td>'+
        '<td>'+
        (d.DatatypeQualifier
          ? d.DatatypeQualifier+'_ '
          : '')+
        d.RepresentationTerm+'</td><tr>'
    : '')+
  ("ASBIE" === d.Kind
    ? '<tr><td style="font-size:smaller;float:right">Associated Object Class:</td>'+
          '<td>'+d.AssociatedObjectClass+'</td></tr>'
    : '')+
  (d.DataType
    ? '<tr><td>Data Type:</td>'+
        '<td>'+d.DataType+(d.Length ? ' (Length: '+d.Length+')' : '')+'</td></tr>'
    : '')+
  (xbrlgl
    ? '<tr><td>xBRL GL</td><td>'+xbrlgl+'</td></tr>'
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
    ? '<tr><td style="font-size:smaller;float:right">Object Class Term:</td><td>'+d.ObjectClassTerm+'</td></tr>'
    : '')+
  (d.PropertyTerm
    ? '<tr><td style="font-size:smaller;float:right">Property Term:</td><td>'+d.PropertyTerm+'</td></tr>'
    : '')+
  ('BCC' === d.Kind && d.RepresentationTerm
    ? '<tr><td style="font-size:smaller;float:right">Representation Term:</td><td>'+d.RepresentationTerm+'</td></tr>'
    : '')+
  ('ASCC' === d.Kind && d.AssociatedObjectClass
    ? '<tr><td style="font-size:smaller;float:right">Associated Object Class:</td><td>'+d.AssociatedObjectClass+'</td></tr>'
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
        (d.AssociatedObjectClassTermQualifier ? d.AssociatedObjectClassTermQualifier+'_ ' : '')+
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
    ? '<tr><td style="font-size:smaller;float:right">Object Class Term:</td><td>'+
      (d.ObjectClassTermQualifier ? d.ObjectClassTermQualifier+'_ ' : '')+
      d.ObjectClassTerm+'</td></tr>'
    : '')+
  (d.PropertyTerm
    ? '<tr><td style="font-size:smaller;float:right">Property Term:</td><td>'+d.PropertyTerm+'</td></tr>'
    : '')+
  (d.RepresentationTerm
    ? '<tr><td style="font-size:smaller;float:right">Representation Term:</td><td>'+
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
    ? '<tr><td style="font-size:smaller;float:right">Object Class Term:</td><td>'+
      (d.ObjectClassQualifier ? d.ObjectClassQualifier+'_ ' : '')+
      d.ObjectClass+'</td></tr>'
    : '')+
  (d.PropertyTerm
    ? '<tr><td style="font-size:smaller;float:right">Property Term:</td><td>'+
      (d.PropertyTermQualifier ? d.PropertyTermQualifier+'_ ' : '')+
      d.PropertyTerm+'</td></tr>'
    : '')+
  ('BBIE' === d.ComponentType && d.RepresentationTerm
    ? '<tr><td style="font-size:smaller;float:right">Representation Term:</td><td>'+
      (d.DataTypeQualifier ? d.DataTypeQualifier+'_ ' : '')+' '+d.RepresentationTerm+'</td></tr>'
    : '')+
  ('BBIE' === d.ComponentType && d.DataType
    ? '<tr><td style="font-size:smaller;float:right">Datatype:</td><td>'+
      (d.DataType ? d.DataType : '')+'</td></tr>'
    : '')+
  ('ASBIE' === d.ComponentType && d.AssociatedObjectClass
    ? '<tr><td style="font-size:smaller;float:right">Associated Object Class:</td><td>'+
      (d.AssociatedObjectClassTermQualifier ? d.AssociatedObjectClassTermQualifier+'_ ' : '')+
      d.AssociatedObjectClass+'</td></tr>'
    : '')+
  (d.UsageRule
    ? '<tr><td style="font-size:smaller;float:right">Usage Rule:</td><td>'+d.UsageRule+'</td></tr>'
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
      '<tr><td style="font-size:smaller;float:right">&nbsp;Name:</td><td>'+_d.name+'</td></tr>'+
      '<tr><td style="font-size:smaller;float:right">&nbsp;Definition:</td><td>'+_d.Definition+'</td></tr>'+
      (_d.UsageRule
        ? '<tr><td style="font-size:smaller;float:right">&nbsp;Usage Rule:</td><td>'+_d.UsageRule+'</td></tr>'
        : '')+
      (_d.ObjectClass
        ? '<tr><td style="font-size:smaller;float:right">&nbsp;Object Class Term:</td><td>'+_d.ObjectClass+'</td></tr>'
        : '')+
      (_d.PropertyTermName
        ? '<tr><td style="font-size:smaller;float:right">&nbsp;Property Term:</td><td>'+_d.PropertyTermName+'</td></tr>' : '')+
      (_d.RepresentationTermName
        ? '<tr><td style="font-size:smaller;float:right">&nbsp;Representation Term:</td><td>'+_d.RepresentationTermName+'</td></tr>' : '')+
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
    ? '<tr><td style="font-size:smaller;float:right">Object Class Term:</td><td>'+d.ObjectClass+'</td></tr>'
    : '')+
  d.PropertyTermName
    ? '<tr><td style="font-size:smaller;float:right">Property Term:</td><td>'+d.PropertyTermName+'</td></tr>'
    : '')+
  (d.RepresentationTermName
    ? '<tr><td style="font-size:smaller;float:right">Representation Term:</td><td>'+d.RepresentationTermName+'</td></tr>'
    : '')+
  (d.UsageRule
    ? '<tr><td  style="font-size:smaller">Usage Rule:</td><td>'+d.UsageRule+'</td></tr>'
    : '')+
  (found.length > 0 ? related : '')+
  '</table>';
}
function peppol_entity_format(d) { // d is the original data object for the row
  if (!d) { return null; }
  var html, description, DEN, datatype, objectClass, propertyTerm, representationTerm, associatedObjectClass, xPath, ublDatatype;
  html = '<table cellpadding="4" cellspacing="0" border="0" style="width:100%; padding-left:16px;">'+
  '<colgroup>'+
  '<col span="1" style="width: '+H1+'%;">'+
  '<col span="1" style="width: '+H2+'%;">'+
  '</colgroup>';
  description = (d.Description
      ? '<tr><td colspan="2">'+d.Description+'</td><tr>'
      : ''
    )+
    (d.AdditionalExplanation
      ? '<tr><td colspan="2">'+d.AdditionalExplanation+'</td><tr>'
      : ''
    );
  html += description;
  datatype = (('BBIE' === d.Kind || 'IDBIE' === d.Kind) && d.datatype
      ? '<tr><td>Semantic Data Type:</td><td>'+
        d.datatype+'</td></tr>'
      : ''
    );
  html += datatype;
  DEN = '<tr><td>'+
    (d.DictionaryEntryName
      ? 'Dictionary Entry Name:</td><td>'+d.DictionaryEntryName
      : '</td><td>')+
    '</td></tr>';
  html += DEN;
  objectClass = (d.ObjectClassTerm
      ? '<tr><td style="font-size:smaller;float:right">Object Class Term:</td><td>'+
        (d.ObjectClassTermQualifier ? d.ObjectClassTermQualifier+'_ ' : '')+
        d.ObjectClassTerm+'</td></tr>'
      : ''
    );
  html += objectClass;
  propertyTerm = (d.PropertyTerm
      ? '<tr><td style="font-size:smaller;float:right">Property Term:</td><td>'+
        (d.PropertyTermQualifier ? d.PropertyTermQualifier+'_ ' : '')+
        d.PropertyTerm+'</td></tr>'
      : ''
    );
  html += propertyTerm;
  representationTerm = (('BBIE' === d.Kind || 'IDBIE' === d.Kind) && d.RepresentationTerm
      ? '<tr><td style="font-size:smaller;float:right">Representation Term:</td><td>'+
        (d.DataTypeQualifier ? d.DataTypeQualifier+'_ ' : '')+
        d.RepresentationTerm+'</td></tr>'
      : ''
    );
  html += representationTerm;
  associatedObjectClass = ('ASBIE' === d.Kind && d.AssociatedObjectClass
    ? '<tr><td style="font-size:smaller;float:right">Associated Object Class:</td><td>'+
        (d.AssociatedObjectClassTermQualifier ? d.AssociatedObjectClassTermQualifier+'_ ' : '')+
        d.AssociatedObjectClass+'</td></tr>'
      : ''
    );
  html += associatedObjectClass;
  xPath = (d.XPath
      ? '<tr><td>UBL XPath:</td><td>'+d.XPath+'</td></tr>'
      : ''
    );
  html += xPath.replace(/\/c/g,'/ c');
  ublDatatype = (d.UBL_Datatype
      ? '<tr><td style="font-size:smaller;float:right">UBL Datatype:</td><td>'+
        d.UBL_Datatype+(d.UBL_Cardinality ? ' '+d.UBL_Cardinality : '')+'</td></tr>'
      : ''
    );
  html += ublDatatype;
  html += '</table>';
  return html;
}
function gb_entity_format(d) { // d is the original data object for the row
  if (!d) { return null; }
  var html, description, DEN, datatype, objectClass, propertyTerm, representationTerm, associatedObjectClass, xPath, ublDatatype;
  html = '<table cellpadding="4" cellspacing="0" border="0" style="width:100%; padding-left:16px;">'+
  '<colgroup>'+
  '<col span="1" style="width: '+H1+'%;">'+
  '<col span="1" style="width: '+H2+'%;">'+
  '</colgroup>';
  description = (d.Description
      ? '<tr><td colspan="2">'+d.Description+'</td><tr>'
      : ''
    )+
    (d.AdditionalExplanation
      ? '<tr><td colspan="2">'+d.AdditionalExplanation+'</td><tr>'
      : ''
    );
  html += description;
  datatype = (('BBIE' === d.Kind || 'IDBIE' === d.Kind) && d.datatype
      ? '<tr><td>Semantic Data Type:</td><td>'+
        d.datatype+'</td></tr>'
      : ''
    );
  html += datatype;
  DEN = '<tr><td>'+
    (d.DictionaryEntryName
      ? 'Dictionary Entry Name:</td><td>'+d.DictionaryEntryName
      : '</td><td>')+
    '</td></tr>';
  html += DEN;
  objectClass = (d.ObjectClassTerm
      ? '<tr><td style="font-size:smaller;float:right">Object Class Term:</td><td>'+
        (d.ObjectClassTermQualifier ? d.ObjectClassTermQualifier+'_ ' : '')+
        d.ObjectClassTerm+'</td></tr>'
      : ''
    );
  html += objectClass;
  propertyTerm = (d.PropertyTerm
      ? '<tr><td style="font-size:smaller;float:right">Property Term:</td><td>'+
        (d.PropertyTermQualifier ? d.PropertyTermQualifier+'_ ' : '')+
        d.PropertyTerm+'</td></tr>'
      : ''
    );
  html += propertyTerm;
  representationTerm = (('BBIE' === d.Kind || 'IDBIE' === d.Kind) && d.RepresentationTerm
      ? '<tr><td style="font-size:smaller;float:right">Representation Term:</td><td>'+
        (d.DataTypeQualifier ? d.DataTypeQualifier+'_ ' : '')+
        d.RepresentationTerm+'</td></tr>'
      : ''
    );
  html += representationTerm;
  associatedObjectClass = ('ASBIE' === d.Kind && d.AssociatedObjectClass
    ? '<tr><td style="font-size:smaller;float:right">Associated Object Class:</td><td>'+
        (d.AssociatedObjectClassTermQualifier ? d.AssociatedObjectClassTermQualifier+'_ ' : '')+
        d.AssociatedObjectClass+'</td></tr>'
      : ''
    );
  html += associatedObjectClass;
  xPath = (d.XPath
      ? '<tr><td>UBL XPath:</td><td>'+d.XPath+'</td></tr>'
      : ''
    );
  html += xPath.replace(/\/c/g,'/ c');
  ublDatatype = (d.UBL_Datatype
      ? '<tr><td style="font-size:smaller;float:right">UBL Datatype:</td><td>'+
        d.UBL_Datatype+(d.UBL_Cardinality ? ' '+d.UBL_Cardinality : '')+'</td></tr>'
      : ''
    );
  html += ublDatatype;
  html += '</table>';
  return html;
}
function saf_entity_format(d) { // d is the original data object for the row
  if (!d) { return null; }
  var html, description, DEN, datatype, objectClass, propertyTerm, representationTerm, associatedObjectClass, xPath, ublDatatype;
  html = '<table cellpadding="4" cellspacing="0" border="0" style="width:100%; padding-left:16px;">'+
  '<colgroup>'+
  '<col span="1" style="width: '+H1+'%;">'+
  '<col span="1" style="width: '+H2+'%;">'+
  '</colgroup>';
  description = (d.Description
      ? '<tr><td colspan="2">'+d.Description+'</td><tr>'
      : ''
    )+
    (d.AdditionalExplanation
      ? '<tr><td colspan="2">'+d.AdditionalExplanation+'</td><tr>'
      : ''
    );
  html += description;
  datatype = (('BBIE' === d.Kind || 'IDBIE' === d.Kind) && d.RepresentationTerm
      ? '<tr><td>Semantic Data Type:</td><td>'+
        d.RepresentationTerm+'</td></tr>'
      : ''
    );
  html += datatype;
  datatype = (('BBIE' === d.Kind || 'IDBIE' === d.Kind) && d.Type
    ? '<tr><td style="font-size:smaller;float:right">@type:</td><td>'+
      d.Type+'</td></tr>'
    : ''
  );
  html += datatype;
  DEN = '<tr><td>'+
    (d.DictionaryEntryName
      ? 'Dictionary Entry Name:</td><td>'+d.DictionaryEntryName
      : '</td><td>')+
    '</td></tr>';
  html += DEN;
  objectClass = (d.ObjectClassTerm
      ? '<tr><td style="font-size:smaller;float:right">Object Class Term:</td><td>'+
        (d.ObjectClassTermQualifier ? d.ObjectClassTermQualifier+'_ ' : '')+
        d.ObjectClassTerm+'</td></tr>'
      : ''
    );
  html += objectClass;
  propertyTerm = (d.PropertyTerm
      ? '<tr><td style="font-size:smaller;float:right">Property Term:</td><td>'+
        (d.PropertyTermQualifier ? d.PropertyTermQualifier+'_ ' : '')+
        d.PropertyTerm+'</td></tr>'
      : ''
    );
  html += propertyTerm;
  representationTerm = (('BBIE' === d.Kind || 'IDBIE' === d.Kind) && d.RepresentationTerm
      ? '<tr><td style="font-size:smaller;float:right">Representation Term:</td><td>'+
        (d.DataTypeQualifier ? d.DataTypeQualifier+'_ ' : '')+
        d.RepresentationTerm+'</td></tr>'
      : ''
    );
  html += representationTerm;
  associatedObjectClass = ('ASBIE' === d.Kind && d.AssociatedObjectClass
    ? '<tr><td style="font-size:smaller;float:right">Associated Object Class:</td><td>'+
        (d.AssociatedObjectClassTermQualifier ? d.AssociatedObjectClassTermQualifier+'_ ' : '')+
        d.AssociatedObjectClass+'</td></tr>'
      : ''
    );
  html += associatedObjectClass;
  referencedObjectClass = ('RFBIE' === d.Kind && d.ReferencedObjectClass
    ? '<tr><td style="font-size:smaller;float:right">Referenced Object Class:</td><td>'+
        (d.ReferencedObjectClassTermQualifier ? d.ReferencedObjectClassTermQualifier+'_ ' : '')+
        d.ReferencedObjectClass+'</td></tr>'
      : ''
    );
  html += referencedObjectClass;
  html += '</table>';
  return html;
}
function adcs_entity_format(d) { // d is the original data object for the row
  if (!d) { return null; }
  var html, description, DEN, datatype,
  representation, objectClass, propertyTerm, representationTerm, associatedObjectClass, referencedObjectClass;
html = '<table cellpadding="4" cellspacing="0" border="0" style="width:100%; padding-left:16px;">'+
  '<colgroup>'+
  '<col span="1" style="width: '+H1+'%;">'+
  '<col span="1" style="width: '+H2+'%;">'+
  '</colgroup>';
  description = (d.Description
      ? '<tr><td colspan="2">'+d.Description+'</td><tr>'
      : ''
    )+
    (d.AdditionalExplanation
      ? '<tr><td colspan="2">'+d.AdditionalExplanation+'</td><tr>'
      : ''
    );
  html += description;
  datatype = (('BBIE' === d.Kind || 'IDBIE' === d.Kind) && d.Type
    ? '<tr><td>Semantic Data Type:</td><td>'+d.Type+'</td></tr>'
    : ''
  );
  html += datatype;
  datatype = (('BBIE' === d.Kind || 'IDBIE' === d.Kind) && d.Datatype
    ? '<tr><td style="font-size:smaller;float:right">Data Type:</td><td>'+d.Datatype
    : ''
  );
  representation =  (('BBIE' === d.Kind || 'IDBIE' === d.Kind) && d.Representation
    ? ' ( Representation: '+d.Representation+' )'
    : ''
  )+'</td></tr>';
  html += datatype+representation;
  DEN = '<tr><td>'+
    (d.DictionaryEntryName
      ? 'Dictionary Entry Name:</td><td>'+d.DictionaryEntryName
      : '</td><td>')+
    '</td></tr>';
  html += DEN;
  objectClass = (d.ObjectClassTerm
      ? '<tr><td style="font-size:smaller;float:right">Object Class Term:</td><td>'+
        (d.ObjectClassTermQualifier ? d.ObjectClassTermQualifier+'_ ' : '')+
        d.ObjectClassTerm+'</td></tr>'
      : ''
    );
  html += objectClass;
  propertyTerm = (d.PropertyTerm
      ? '<tr><td style="font-size:smaller;float:right">Property Term:</td><td>'+
        (d.PropertyTermQualifier ? d.PropertyTermQualifier+'_ ' : '')+
        d.PropertyTerm+'</td></tr>'
      : ''
    );
  html += propertyTerm;
  representationTerm = (('BBIE' === d.Kind || 'IDBIE' === d.Kind) && d.RepresentationTerm
      ? '<tr><td style="font-size:smaller;float:right">Representation Term:</td><td>'+
        (d.DataTypeQualifier ? d.DataTypeQualifier+'_ ' : '')+
        d.RepresentationTerm+'</td></tr>'
      : ''
    );
  html += representationTerm;
  associatedObjectClass = ('ASBIE' === d.Kind && d.AssociatedObjectClass
    ? '<tr><td style="font-size:smaller;float:right">Associated Object Class:</td><td>'+
        (d.AssociatedObjectClassTermQualifier ? d.AssociatedObjectClassTermQualifier+'_ ' : '')+
        d.AssociatedObjectClass+'</td></tr>'
      : ''
    );
  html += associatedObjectClass;
  referencedObjectClass = ('RFBIE' === d.Kind && d.ReferencedObjectClass
    ? '<tr><td style="font-size:smaller;float:right">Referenced Object Class:</td><td>'+
        (d.ReferencedObjectClassTermQualifier ? d.ReferencedObjectClassTermQualifier+'_ ' : '')+
        d.ReferencedObjectClass+'</td></tr>'
      : ''
    );
  html += referencedObjectClass;
  Table = (d.Table
    ? '<tr><td>Table</td><td>'+d.Table+'</td></tr>'
    : ''
  );
  html += Table;
  PK_REF = (d.PK_REF
    ? 'REF'==d.PK_REF
        ? '<tr><td style="font-size:smaller;float:right">Identifier</td><td>'+d.PK_REF+' (Referebce identifier)<br>Referenced field: '+d.RefField+'<br>Referenced table: '+d.RefTable+'</td></tr>'
        : '<tr><td style="font-size:smaller;float:right">Identifier</td><td>'+d.PK_REF+' (Unigue identifier)</td></tr>'
    : ''
  );
  html += PK_REF;
  html += '</table>';
  return html;
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
  var depth, prefix;
  if (!name) {
    return '';
  }
  num = '' + num;
  depth = (num.match(/\./g) || []).length;
  prefix = '';
  if (depth > 0 && ! name.match(/^&bullet;/)){
    for (var i = 0; i < depth; i++) {
      prefix += '&bullet;';
    }
    prefix += ' ';
  }
  return prefix + name; //splitLC3(name);
}
function renderDescription(description) {
  if (!description) {
    return '';
  }
  else if (description.length > DESCRIPTION_LENGTH) {
    description = description.substr(0, DESCRIPTION_LENGTH)+'...';
  }
  description = description.replace(/_/g, ' ');
  return description;
}
// -----------------------------------------------------------------
// ADC
function renderAdcAbieModule(row) {
  var module = row.Table, match, map;
  if (!module) {
    return 'Core';
  }
  match = module.match(/(([^_]+)_)?(.*)$/);
  map = {
    'BAS': 'Base',
    'SAL': 'Sales',
    'PUR': 'Purchase',
    'INV': 'Inventory'
  };
  if (match) {
    module = match[2];
    if (map[module]) {
      module = map[module];
    }
  }
  return module;
}
function rendeAdcAbieDescription(row) {
  var description = row.Description;
  if (description.length > DESCRIPTION_LENGTH) {
    description = description.substr(0, DESCRIPTION_LENGTH)+'...';
  }
  var match;
  match = description.match(/^(.*)( (is|are) contained in Table [0-9]*)(.*)$/);
  if (match) {
    description = match[1]+match[4];
  }
  description = description.replace(/ \(Table [0-9]*\)/g, '');
  description = description.replace(/ \(4.4.2 and 4.4.3\)/g, '');
  description = description.replace(/ \(see 4.4.2 and 4.4.3\)/g, '');
  return renderDescription(description);
}
function renderAdcEntityName(row) {
  var name = row.Name, name_list;
  if (name) {
    name_list = name.split(' ');
    name_list = name_list.map(function(d) {
      if (d != 'ID') {
        text = iso21378abbrev[d];
        if (text) { return text; }
      }
      return d;
    });
    name = name_list.join(' ');
  }
  else {
    var dictionaryEntryName = row.DictionaryEntryName,
        match, name = '',
        objectClassTerm, qualifier, propertyTerm, representationTerm;
    if (!dictionaryEntryName) {
      return '';
    }
    match = dictionaryEntryName.match(rgx);
    if (match) {
      objectClassTerm = match[rgx_COL_ObjectClassTerm];
      objectClassTerm = objectClassTerm ? objectClassTerm.trim() : '';
      qualifier = match[rgx_COL_PropertyTermQualifier];
      qualifier = qualifier ? qualifier.trim()+' ' : '';
      propertyTerm = match[rgx_COL_PropertyTerm];
      propertyTerm = propertyTerm ? propertyTerm.trim() : '';
      representationTerm = match[rgx_COL_RepresentationTerm];
      representationTerm = representationTerm ? representationTerm.trim() : '';
      if ('ID' === propertyTerm) {
        name = objectClassTerm+' ID';
      }
      else if ((representationTerm && representationTerm.indexOf(propertyTerm) >= 0) ||
          (propertyTerm && propertyTerm.indexOf(representationTerm) >= 0)) {
        name = qualifier+propertyTerm;
      }
      else {
        name = qualifier+propertyTerm+' '+representationTerm;
      }
    }
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
  description = description.replace(/EXAMPLE/g, '<br>EXAMPLE');
  // description = description.replace(/\(Table [0-9]+\) /g, '');
  return renderDescription(description);
}
// adc_abie_COL_ComponentName = 0;
adc_abie_COL_Module = 1;
adc_abie_COL_DictionaryEntryName = 5;
var adc_abie_columns = [
  { 'width': '4%',
    'className': 'd-none',
    'data': 'Kind' }, // 0
  { 'width': '8%',
    'data': 'module'}, // 1
  { 'width': '35%',
    'data': 'ObjectClassTerm' }, // 2
  { 'data': 'description',
    'render': function (data, type, row) {
      return rendeAdcAbieDescription(row); }}, // 3
  { 'width': '4%',
    'className': 'info-control',
    'orderable': false,
    'data': null,
    'defaultContent': '' }, // 4
  { 'data': 'DictionaryEntryName' } // 5
];
var adc_abie_columnDefs = [
  { 'searchable': false, 'targets': 4},
  { 'visible': false, 'targets': [0, 5] } 
];
adc_entity_COL_DictionaryEntryName = 7;
adc_entity_COL_ObjectClassTerm = 8;
var adc_entity_columns = [
  { 'width': '3%',
    'className': 'details-control',
    'orderable': false,
    'data': null,
    'defaultContent': '' }, // 0
  { 'width': '1%',
    'className': 'd-none',
    'data': 'Kind'}, // 1
  { 'width': '40%',
    'data': 'name',
    'render': function(data, type, row) {
      return renderAdcEntityName(row); }}, // 2
  { 'width': '50%',
    'data': 'description',
    'render': function(data, type, row) {
      return renderAdcEntityDescription(row); }}, // 3
  { 'width': '4%',
    'data': 'Occurrence'}, // 4
  { 'width': '3%',
    'className': 'info-control',
    'orderable': false,
    'data': null,
    'defaultContent': '' }, // 5
  { 'data': 'Datatype' }, // 6-
  { 'data': 'DictionaryEntryName' }, // 7-
  { 'data': 'ObjectClassTerm' } // 8-
];
var adc_entity_columnDefs = [
  { 'searchable': false, 'targets': [0, 5] },
  { 'visible': false, 'targets': [6, 7, 8] } 
];
// adc_dt_COL_CategoryCode = 0;
adc_dt_COL_DictionaryEntryName = 1;
adc_dt_COL_DataType = 4; // hidden
adc_dt_COL_ObjectClassTerm = 5; // hidden
var adc_dt_columns = [
  { 'width': '4%',
    'className': 'd-none',
    'data': 'Kind' }, // 0
  { 'width': '40%',
    'data': 'DictionaryEntryName' }, // 1
  { 'width': '56%',
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
// xBRL GL
function renderXbrlglEntityName(row) {
  // var dictionaryEntryName = row.DictionaryEntryName, name;
  // if (!dictionaryEntryName) {
  //   return '';
  // }
  // var match = dictionaryEntryName.match(/^([^\.]+)\. (.*)$/);
  // if (match) {
  //   name = match[2];
  // }
  var name = row.Name;
  return renderNameByNum(row.num, name);
}
// xbrlgl_abie_COL_ComponentName = 0;
// xbrlgl_abie_COL_ObjectClassTerm = 1;
xbrlgl_abie_COL_DictionaryEntryName = 4;
var xbrlgl_abie_columns = [
  { 'width': '0%',
    'className': 'd-none',
    'data': 'Kind' }, // 0
  { 'width': '40%',
    'data': 'Name' }, // 1
  { 'width': '58%',
    'data': 'description',
    'render': function(data, type, row) {
      return renderDescription(row.Description); }}, // 2
  { 'width': '2%',
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
// xbrlgl_entity_COL_DictionaryEntryName = 2;
xbrlgl_entity_COL_ObjectClassTerm = 5;
var xbrlgl_entity_columns = [
  { 'width': '2%',
    'className': 'details-control',
    'orderable': false,
    'data': null,
    'defaultContent': '' }, // 0
  { 'width': '0%',
    'className': 'd-none',
    'data': 'Kind' }, // 1
  { 'width': '38%',
    'data': 'name',
    'render': function(data, type, row) {
      return renderXbrlglEntityName(row); }}, // 2
  { 'width': '58%',
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
// TS5409
// -----------------------------------------------------------------
// TS5409
function renderTs5409Module(row) {
  var module = row.module || '', match;
  match = module.match(/^[0-9]\.(.*)$/);
  if (match) { module = match[1]; }
  return module;
}
function rendeAdcDescription(row) {
  var description = row.Description;
  return renderDescription(description);
}
function renderTs5409EntityName(row) {
  var name = row.BusinessTerm || row.DictionaryEntryName;
  if (!name) {
    return '';
  }
  return renderNameByNum(row.num, name);
}
function renderTs5409EntityDescription(row) {
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
  // description = description.replace(/EXAMPLE/g, '<br><span style="font-size:small">EXAMPLE</span><br>');
  description = description.replace(/\(Table [0-9]+\) /g, '');
  if (description.length > 72) {
    description = description.substr(0, 72)+'...';
  }
  return renderDescription(description);
}
ts5409_abie_COL_ComponentName = 0;
ts5409_abie_COL_Module = 1;
ts5409_abie_COL_DictionaryEntryName = 5;
var ts5409_abie_columns = [
  { 'width': '4%',
    'className': 'd-none',
    'data': 'Kind' }, // 0
  { 'width': '8%',
    'data': 'module',
    'render': function(data, type, row) {
      return renderTs5409Module(row); }}, // 1
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
var ts5409_abie_columnDefs = [
  { 'searchable': false, 'targets': 4},
  { 'visible': false, 'targets': 5 } 
];
ts5409_entity_COL_DictionaryEntryName = 6;
ts5409_entity_COL_ObjectClassTerm = 7;
var ts5409_entity_columns = [
  { 'width': '2%',
    'className': 'details-control',
    'orderable': false,
    'data': null,
    'defaultContent': '' }, // 0
  { 'width': '8%',
    'className': 'd-none',
    'data': 'Kind' }, // 1
  { 'width': '35%',
    'data': 'name',
    'render': function(data, type, row) {
      return renderTs5409EntityName(row); }}, // 2
  { 'width': '49%',
    'data': 'description',
    'render': function(data, type, row) {
      return renderTs5409EntityDescription(row); }}, // 3
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
var ts5409_entity_columnDefs = [
  { 'className': 'dt-body-right', 'targets': [1] },
  { 'searchable': false, 'targets': [0, 4] },
  { 'visible': false, 'targets': [5, 6, 7] } 
];
ts5409_dt_COL_CategoryCode = 0;
ts5409_dt_COL_DictionaryEntryName = 1;
ts5409_dt_COL_DataType = 4; // hidden
ts5409_dt_COL_ObjectClassTerm = 5; // hidden
var ts5409_dt_columns = [
  { 'width': '4%',
    'className': 'd-none',
    'data': 'Kind' }, // 0
  { 'width': '35%',
    'data': 'DictionaryEntryName' }, // 1
  { 'width': '57%',
    'data': 'Description' }, // 2
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
var ts5409_dt_columnDefs = [
  { 'searchable': false, 'targets': 0 },
  { 'visible': false, 'targets': [4, 5, 6, 7] } 
];
// -----------------------------------------------------------------
// ADCS
function renderAdcsDescription(row) {
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
  if (description.length > DESCRIPTION_LENGTH) {
    description = description.substr(0, DESCRIPTION_LENGTH)+'...';
  }
  return renderDescription(description);
}
function renderAdcsEntityName(row) {
  var name = row.Name;
  if (name) {
    name = name;
  }
  else if (row.DictionaryEntryName) {
    name = renderAdcEntityName(row);
  }
  else {
    return '';
  }
  return renderNameByNum(row.num, name);
}
adcs_abie_COL_Table = 2;
adcs_abie_COL_Module = 1;
var adcs_abie_columns = [
  { 'width': '4%',
    'className': 'd-none',
    'data': 'Kind' }, // 0
  { 'width': '5%',
    'data': 'Module' }, // 1
  { 'width': '35%',
    'data': 'Name' }, // 2
  { 'width': '52%',
    'data': 'Description',
    'render': function (data, type, row) {
      return renderAdcsDescription(row); }}, // 3
  { 'width': '4%',
    'className': 'info-control',
    'orderable': false,
    'data': null,
    'defaultContent': '' } // 4
];
var adcs_abie_columnDefs = [
  { 'searchable': false, 'targets': 4 }
];
adcs_entity_COL_ObjectClassTerm = 7;
var adcs_entity_columns = [
  { 'width': '2%',
    'className': 'details-control',
    'orderable': false,
    'data': null,
    'defaultContent': '' }, // 0
  { 'width': '8%',
    'className': 'd-none',
    'data': 'Kind' }, // 1
  { 'width': '2%',
    'data': 'Level' }, // 2
  { 'width': '35%',
    'data': 'Name',
    'render': function(data, type, row) {
      return renderAdcsEntityName(row); }}, // 3
  { 'width': '2%',
    'data': 'Card' }, // 4
  { 'width': '51%',
    'data': 'Description',
    'render': function(data, type, row) {
      return renderDescription(row.Description); }}, // 5
  { 'width': '2%',
    'className': 'info-control',
    'orderable': false,
    'data': null,
    'defaultContent': '' }, // 6
  { 'data': 'ObjectClassTerm' } // 7-
];
var adcs_entity_columnDefs = [
  { 'searchable': false, 'targets': [0,4,6] },
  { 'visible': false, 'targets': [2,7] } 
];
// -----------------------------------------------------------------
// SAF
function renderSafDescription(row) {
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
  if (description.length > DESCRIPTION_LENGTH) {
    description = description.substr(0, DESCRIPTION_LENGTH)+'...';
  }
  return renderDescription(description);
}
function renderSafEntityName(row) {
  var name = row.Name;
  if (name) {
    name = name;
  }
  else if (row.DictionaryEntryName) {
    name = renderAdcEntityName(row);
  }
  else {
    return '';
  }
  return renderNameByNum(row.num, name);
}
saf_abie_COL_Table = 2;
saf_abie_COL_Module = 1;
var saf_abie_columns = [
  { 'width': '4%',
    'className': 'd-none',
    'data': 'Kind' }, // 0
  { 'width': '5%',
    'data': 'Module' }, // 1
  { 'width': '35%',
    'data': 'Name' }, // 2
  { 'width': '52%',
    'data': 'Description',
    'render': function (data, type, row) {
      return renderSafDescription(row); }}, // 3
  { 'width': '4%',
    'className': 'info-control',
    'orderable': false,
    'data': null,
    'defaultContent': '' } // 4
];
var saf_abie_columnDefs = [
  { 'searchable': false, 'targets': 4 }
];
saf_entity_COL_ObjectClassTerm = 7;
var saf_entity_columns = [
  { 'width': '2%',
    'className': 'details-control',
    'orderable': false,
    'data': null,
    'defaultContent': '' }, // 0
  { 'width': '8%',
    'className': 'd-none',
    'data': 'Kind' }, // 1
  { 'width': '2%',
    'data': 'Level' }, // 2
  { 'width': '35%',
    'data': 'Name',
    'render': function(data, type, row) {
      return renderSafEntityName(row); }}, // 3
  { 'width': '2%',
    'data': 'Card' }, // 4
  { 'width': '51%',
    'data': 'Description',
    'render': function(data, type, row) {
      return renderDescription(row.Description); }}, // 5
  { 'width': '2%',
    'className': 'info-control',
    'orderable': false,
    'data': null,
    'defaultContent': '' }, // 6
  { 'data': 'ObjectClassTerm' } // 7-
];
var saf_entity_columnDefs = [
  { 'searchable': false, 'targets': [0,4,6] },
  { 'visible': false, 'targets': [2,7] } 
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
  if (description.length > DESCRIPTION_LENGTH) {
    description = description.substr(0, DESCRIPTION_LENGTH)+'...';
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
ads_abie_COL_Table = 2;
ads_abie_COL_Module = 1;
var ads_abie_columns = [
  { 'width': '4%',
    'className': 'd-none',
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
    'className': 'd-none',
    'data': 'Kind' }, // 1
  { 'width': '4%',
    'className': 'd-none',
    'data': 'No' }, // 2
  { 'width': '35%',
    'data': 'name',
    'render': function(data, type, row) {
      return renderAdsEntityName(row); }}, // 3
  { 'width': '2%',
    'className': 'd-none',
    'data': 'Level' }, // 4
  { 'width': '51%',
    'data': 'description',
    'render': function(data, type, row) {
      return renderDescription(row.Description); }}, // 5
  { 'width': '2%',
    'className': 'info-control',
    'orderable': false,
    'data': null,
    'defaultContent': '' }, // 6
  { 'data': 'Table' }, // 7-
  { 'data': 'ObjectClassTerm' } // 8-
];
var ads_entity_columnDefs = [
  { 'searchable': false, 'targets': [0, 6] },
  { 'visible': false, 'targets': [7, 8] } 
];
// -----------------------------------------------------------------
// GB
function renderGbAbieTable(row) {
  var table = row.Table;
  if (!table) {
    return '';
  }
  table = table.replace(/_/g, ' ');
  return table;
}
function renderGbDescription(row) {
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
  if (description.length > DESCRIPTION_LENGTH) {
    description = description.substr(0, DESCRIPTION_LENGTH)+'...';
  }
  return renderDescription(description);
}
function renderGbEntityName(row) {
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
gb_abie_COL_Module = 1;
gb_abie_COL_Table = 2;
var gb_abie_columns = [
  { 'width': '4%',
    'className': 'd-none',
    'data': 'Kind' }, // 0
  { 'width': '40%',
    'data': 'Module' }, // 1
  { 'width': '52%',
    'data': 'table',
    'render': function (data, type, row) {
      return renderGbAbieTable(row); }}, // 2
  // { 'width': '2%',
  //   'data': 'description',
  //   'render': function (data, type, row) {
  //     return renderGbDescription(row); }}, // 3
  { 'width': '4%',
    'className': 'info-control',
    'orderable': false,
    'data': null,
    'defaultContent': '' } // 3
];
var gb_abie_columnDefs = [
  { 'searchable': false, 'targets': 3 }
];
gb_entity_COL_No = 2;
gb_entity_COL_ObjectClassTerm = 8;
var gb_entity_columns = [
  { 'width': '2%',
    'className': 'details-control',
    'orderable': false,
    'data': null,
    'defaultContent': '' }, // 0
  { 'width': '8%',
    'className': 'd-none',
    'data': 'Kind' }, // 1
  { 'width': '4%',
    'className': 'd-none',
    'data': 'No' }, // 2
  { 'width': '35%',
    'data': 'name',
    'render': function(data, type, row) {
      return renderGbEntityName(row); }}, // 3
  { 'width': '2%',
    'className': 'd-none',
    'data': 'Level' }, // 4
  { 'width': '51%',
    'data': 'description',
    'render': function(data, type, row) {
      return renderDescription(row.Description); }}, // 5
  { 'width': '2%',
    'className': 'info-control',
    'orderable': false,
    'data': null,
    'defaultContent': '' }, // 6
  { 'data': 'Table' }, // 7-
  { 'data': 'ObjectClassTerm' } // 8-
];
var gb_entity_columnDefs = [
  { 'searchable': false, 'targets': [0, 6] },
  { 'visible': false, 'targets': [7, 8] } 
];
// -----------------------------------------------------------------
// Peppol
function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}
function renderPeppolEntityName(row) {
  var name, num;
  num = '' + row.num;
  name = row.Name;
  name = name.split(' ').map(function(d) {return toTitleCase(d)}).join(' ');
  return renderNameByNum(num, name);
}
peppol_abie_COL_DictionaryEntryName = 4;
var peppol_abie_columns = [
  { 'width': '4%',
    'className': 'd-none',
    'data': 'Kind' }, // 0
  { 'width': '35%',
    'data': 'Name'}, // 1
  { 'width': '57%',
    'data': 'Description' },
  { 'width': '4%',
    'className': 'info-control',
    'orderable': false,
    'data': null,
    'defaultContent': '' }, // 3
  { 'data': 'DictionaryEntryName' } // 4
];
var peppol_abie_columnDefs = [
  { 'searchable': false, 'targets': 3 },
  { 'visible': false, 'targets': 4 } 
];
peppol_entity_COL_ObjectClassTerm = 6;
var peppol_entity_columns = [
  { 'width': '3%',
    'className': 'details-control',
    'orderable': false,
    'data': null,
    'defaultContent': '' }, // 0
  { 'width': '1%',
    'className': 'd-none',
    'data': 'Kind' }, // 1
  { 'width': '40%',
    'data': 'Name' }, // 2
  { 'width': '50%',
    'data': 'description',
    'render': function(data, type, row) {
      return renderDescription(row.Description); }}, // 3
  { 'width': '4%',
    'data': 'Card'}, // 4
  { 'width': '3%',
    'className': 'info-control',
    'orderable': false,
    'data': null,
    'defaultContent': '' }, // 5
  { 'data': 'ObjectClassTerm' } // 6
];
var peppol_entity_columnDefs = [
  { 'searchable': false, 'targets': [0, 5] },
  { 'visible': false, 'targets': 6 } 
];
// -----------------------------------------------------------------
// UBL
ubl_abie_COL_ComponentName = 1;
ubl_abie_COL_DictionaryEntryName = 4;
var ubl_abie_columns = [
  { 'width': '4%',
    'className': 'd-none',
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
    'className': 'd-none',
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
// ubl_dt_COL_CategoryCode = 0;
// ubl_dt_COL_DictionaryEntryName = 5; // hidden
ubl_dt_COL_DictionaryEntryName = 2;
ubl_dt_COL_DataType = 4;
var ubl_dt_columns = dt_columns;
/*[
  { 'width': '4%',
    'className': 'd-none',
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
*/
var ubl_dt_columnDefs = dt_columnDefs;
/*[
  { 'searchable': false, 'targets': 0 },
  { 'visible': false, 'targets': 5 } 
];
*/
// -----------------------------------------------------------------
// UN/CEFACT
acc_COL_ObjectClassTerm = 1;
var acc_columns = [
  { 'width': '7%',
    'className': 'd-none',
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
// cc_COL_ShortName = 2;
cc_COL_ObjectClassTerm = 7;
cc_COL_PropertyTerm = 8;
var cc_columns = [
  { 'width': '2%',
    'className': 'details-control',
    'orderable': false,
    'data': null,
    'defaultContent': '' }, // 0
  { 'width': '8%',
    'className': 'd-none',
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
    'className': 'd-none',
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
// bie_compt_COL_ShortName = 3;
bie_compt_COL_DictionaryEntryName = 8;
var bie_compt_columns = [
  { 'width': '2%',
    'className': 'details-control',
    'orderable': false,
    'data': null,
    'defaultContent': '' }, // 0
  { 'width': '8%',
    'className': 'd-none',
    'data': 'Kind' }, // 1
  { 'width': '2%',
    'className': 'd-none',
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
  { 'width': '1%',
    'className': 'd-none',
    'data': 'Kind' }, // 0
  { 'width': '1%',
    'className': 'd-none',
    'data': 'SequenceNumber' }, // 1
  { 'width': '40%',
    'data': 'DictionaryEntryName' }, // 2
  { 'width': '60%',
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
  { 'width': '1%',
    'className': 'd-none',
    'data': 'Kind' }, // 0
  { 'width': '40%',
    'data': 'DictionaryEntryName' }, // 1
  { 'width': '56%',
    'data': 'definition',
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
    case 'xbrlgl': table_id = 'xbrlgl-abie'; break;
    case 'ts5409': table_id = 'ts5409-abie'; break;
    case 'adcs':   table_id = 'adcs-abie';   break;
    case 'saf':    table_id = 'saf-abie';    break;
    case 'ads':    table_id = 'ads-abie';    break;
    case 'gb':     table_id = 'gb-abie';     break;
    case 'peppol': table_id = 'peppol-abie'; break;
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
    case 'xbrlgl': table = xbrlgl_abie_table; break;
    case 'ts5409': table = ts5409_abie_table; break;
    case 'adcs':   table = adcs_abie_table;   break;
    case 'saf':    table = saf_abie_table;    break;
    case 'ads':    table = ads_abie_table;    break;
    case 'ubl':    table = ubl_abie_table;    break;
    case 'peppol': table = peppol_abie_table; break;
    case 'bie':    table = bie_table;         break;
    case 'acc':    table = acc_table;         break;
  }
  return table;
};
getEntityTableID = function(frame) {
  var table_id;
  switch (frame) {
    case 'adc':    table_id = 'adc-entity';    break;
    case 'xbrlgl': table_id = 'xbrlgl-entity'; break;
    case 'ts5409': table_id = 'ts5409-entity'; break;
    case 'adcs':   table_id = 'adcs-entity';   break;
    case 'saf':    table_id = 'saf-entity';    break;
    case 'ads':    table_id = 'ads-entity';    break;
    case 'peppol': table_id = 'peppol-entity'; break;
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
    case 'xbrlgl': table = xbrlgl_entity_table; break;
    case 'ts5409': table = ts5409_entity_table; break;
    case 'adcs':   table = adcs_entity_table;   break;
    case 'saf':    table = saf_entity_table;    break;
    case 'ads':    table = ads_entity_table;    break;
    case 'gb':     table = gb_entity_table;     break;
    case 'peppol': table = peppol_entity_table; break;
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
    case 'xbrlgl': map = xbrlglEntityMap; break;
    case 'ts5409': map = ts5409EntityMap; break;
    case 'adcs':   map = adcsEntityMap;   break;
    case 'saf':    map = safEntityMap;    break;
    case 'ads':    map = adsEntityMap;    break;
    case 'gb':     map = gbEntityMap;     break;
    case 'peppol': map = peppolEntityMap; break;
    case 'ubl':    map = ublEntityMap;    break;
    case 'bie':    map = bieComptMap;     break;
    case 'acc':    map = ccMap;           break;
  }
  return map;
}
function assignEntityRows(frame, rows) {
  switch (frame) {
    case 'adc':    adcEntityRows = rows;    break;
    case 'xbrlgl': xbrlglEntityRows = rows; break;
    case 'ts5409': ts5409EntityRows = rows; break;
    case 'adcs':   adcsEntityRows = rows;   break;
    case 'saf':    safEntityRows = rows;    break;
    case 'ads':    adsEntityRows = rows;    break;
    case 'gb':     gbEntityRows = rows;     break;
    case 'peppol': peppolEntityRows = rows; break;
    case 'ubl':    ublEntityRows = rows;    break;
    case 'bie':    bieComptRows = rows;     break;
    case 'acc':    bie = rows;              break;
  }
}
function checkAssociated(table_id) {
  var rows, i, tr, td_0, td_1, td_2;
  rows = $('#'+table_id+' tbody tr');
  for (i = 0; i < rows.length; i++) {
    tr = rows[i];
    td_0 = tr.cells[0]; td_1 = tr.cells[1]; td_2 = tr.cells[2];
    if ((td_1 && td_1.innerHTML.match(/^ID/)) || (td_2 && td_2.innerHTML.match(/\. ID$/))) {
      td_0.classList.remove('details-control');
      td_0.classList.add('key-control');
    }
    else if (td_1 && ('BBIE' === td_1.innerHTML || 'BCC' === td_1.innerHTML)) {
      td_0.classList.remove('details-control');
    }
    else if (td_1 && ('RFBIE' === td_1.innerHTML || 'RBIE' === td_1.innerHTML || 'RCC' === td_1.innerHTML)) {
      td_0.classList.remove('details-control');
      td_0.classList.add('link-control');
    }
    else if (td_1 && ('ASBIE' === td_1.innerHTML || 'ASCC' === td_1.innerHTML)) {
      td_0.classList.remove('link-control');
      td_0.classList.add('details-control');
    }
    else { // if ('' === td_1.innerHTML) {
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
        item.ancestor = (item.ObjectClassTermQualifier
            ? item.ObjectClassTermQualifier+'_ '
            : ''
          )+item.ObjectClassTerm;
        item.DictionaryEntryName = dictionaryEntryName;
        entityMap.set(dictionaryEntryName, item);
      }
    }
  }

  switch (frame) {
    case 'adc':    adcRows = rows;    adcEntityMap = entityMap;    break;
    case 'xbrlgl': xbrlglRows = rows; xbrlglEntityMap = entityMap; break;
    case 'ts5409': ts5409Rows = rows; ts5409EntityMap = entityMap; break;
    case 'adcs':   adcsRows = rows;   adcsEntityMap = entityMap;   break;
    case 'saf':    safRows = rows;    safEntityMap = entityMap;    break;
    case 'ads':    adsRows = rows;    adsEntityMap = entityMap;    break;
    case 'gb':     gbRows = rows;     gbEntityMap = entityMap;     break;
    case 'peppol': peppolRows = rows; peppolEntityMap = entityMap; break;
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
  'ajax': 'data/list-ADC-udt.json',
  'columns': adc_dt_columns,
  'columnDefs': adc_dt_columnDefs,
  'paging': false,
  'autoWidth': false,
  'ordering': false,
  'select': true
});
// -----------------------------------------------------------------
// xBRL GL
//
xbrlgl_abie_table = $('#xbrlgl-abie').DataTable({
  'ajax': 'data/list-xbrlgl-abie.json',
  'columns': xbrlgl_abie_columns,
  'columnDefs': xbrlgl_abie_columnDefs,
  'paging': false,
  'autoWidth': false,
  'ordering': false,
  'select': true
});
xbrlgl_entity_table = $('#xbrlgl-entity').DataTable({
  'ajax': 'data/list-xbrlgl-entity.json',
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
  'ajax': 'data/list-xbrlgl-entity.json',
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
// TS5409
//
ts5409_abie_table = $('#ts5409-abie').DataTable({
  'ajax': 'data/list-TS5409-abie.json',
  'columns': ts5409_abie_columns,
  'columnDefs': ts5409_abie_columnDefs,
  'paging': false,
  'autoWidth': false,
  'ordering': false,
  'select': true
});
ts5409_entity_table = $('#ts5409-entity').DataTable({
  'ajax': 'data/list-TS5409-entity.json',
  'columns': ts5409_entity_columns,
  'columnDefs': ts5409_entity_columnDefs,
  'paging': false,
  'autoWidth': false,
  'ordering': false,
  'select': true,
  'initComplete': function(settings, json) {
    filterTop('ts5409');
  },
  'drawCallback': function(settings) {
    checkAssociated('ts5409-entity');
    hideOverlay();
  }
});
ts5409_entity2_table = $('#ts5409-entity2').DataTable({
  'ajax': 'data/list-TS5409-entity.json',
  'columns': ts5409_entity_columns,
  'columnDefs': ts5409_entity_columnDefs,
  'paging': false,
  'autoWidth': false,
  'ordering': false,
  'select': true,
  'drawCallback': function(settings) {
    checkAssociated('ts5409-entity2');
  }
});
ts5409_udt_table = $('#ts5409-udt').DataTable({
  'ajax': 'data/list-ADC-udt.json',
  'columns': ts5409_dt_columns,
  'columnDefs': ts5409_dt_columnDefs,
  'paging': false,
  'autoWidth': false,
  'ordering': false,
  'select': true
});
// -----------------------------------------------------------------
// ADCS
//
adcs_abie_table = $('#adcs-abie').DataTable({
  'ajax': 'data/list-adcs-abie.json',
  'columns': adcs_abie_columns,
  'columnDefs': adcs_abie_columnDefs,
  'paging': false,
  'autoWidth': false,
  'ordering': false,
  'select': true,
  'initComplete': function(settings, json) {
    adcs_abie_table
    .column(adcs_abie_COL_Module)
    .search('ADCS', /*regex*/true, /*smart*/false, /*caseInsen*/false).draw();
  }
});
adcs_entity_table = $('#adcs-entity').DataTable({
  'ajax': 'data/list-adcs-entity.json',
  'columns': adcs_entity_columns,
  'columnDefs': adcs_entity_columnDefs,
  'paging': false,
  'autoWidth': false,
  'ordering': false,
  'select': true,
  'initComplete': function(settings, json) {
    filterTop('adcs');
  },
  'drawCallback': function(settings) {
    checkAssociated('adcs-entity');
    hideOverlay();
  }
});
adcs_entity2_table = $('#adcs-entity2').DataTable({
  'ajax': 'data/list-adcs-entity.json',
  'columns': adcs_entity_columns,
  'columnDefs': adcs_entity_columnDefs,
  'paging': false,
  'autoWidth': false,
  'ordering': false,
  'select': true,
  'drawCallback': function(settings) {
    checkAssociated('adcs-entity2');
  }
});
// -----------------------------------------------------------------
// SAF
//
saf_abie_table = $('#saf-abie').DataTable({
  'ajax': 'data/list-SAF-abie.json',
  'columns': saf_abie_columns,
  'columnDefs': saf_abie_columnDefs,
  'paging': false,
  'autoWidth': false,
  'ordering': false,
  'select': true,
  'initComplete': function(settings, json) {
    saf_abie_table
    .column(saf_abie_COL_Module)
    .search('SAF-T', /*regex*/true, /*smart*/false, /*caseInsen*/false).draw();
  }
});
saf_entity_table = $('#saf-entity').DataTable({
  'ajax': 'data/list-SAF-entity.json',
  'columns': saf_entity_columns,
  'columnDefs': saf_entity_columnDefs,
  'paging': false,
  'autoWidth': false,
  'ordering': false,
  'select': true,
  'initComplete': function(settings, json) {
    filterTop('saf');
  },
  'drawCallback': function(settings) {
    checkAssociated('saf-entity');
    hideOverlay();
  }
});
saf_entity2_table = $('#saf-entity2').DataTable({
  'ajax': 'data/list-SAF-entity.json',
  'columns': saf_entity_columns,
  'columnDefs': saf_entity_columnDefs,
  'paging': false,
  'autoWidth': false,
  'ordering': false,
  'select': true,
  'drawCallback': function(settings) {
    checkAssociated('saf-entity2');
  }
});
// -----------------------------------------------------------------
// ADS
//
ads_abie_table = $('#ads-abie').DataTable({
  'ajax': 'data/list-ADS-abie.json',
  'columns': ads_abie_columns,
  'columnDefs': ads_abie_columnDefs,
  'paging': false,
  'autoWidth': false,
  'ordering': false,
  'select': true
});
ads_entity_table = $('#ads-entity').DataTable({
  'ajax': 'data/list-ADS-entity.json',
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
  'ajax': 'data/list-ADS-entity.json',
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
// GB
//
gb_abie_table = $('#gb-abie').DataTable({
  'ajax': 'data/list-GB-abie.json',
  'columns': gb_abie_columns,
  'columnDefs': gb_abie_columnDefs,
  'paging': false,
  'autoWidth': false,
  'ordering': false,
  'select': true
});
gb_entity_table = $('#gb-entity').DataTable({
  'ajax': 'data/list-GB-entity.json',
  'columns': gb_entity_columns,
  'columnDefs': gb_entity_columnDefs,
  'paging': false,
  'autoWidth': false,
  'ordering': false,
  'select': true,
  'initComplete': function(settings, json) {
    filterTop('gb');
  },
  'drawCallback': function(settings) {
    checkAssociated('gb-entity');
    hideOverlay();
  }
});
gb_entity2_table = $('#gb-entity2').DataTable({
  'ajax': 'data/list-GB-entity.json',
  'columns': gb_entity_columns,
  'columnDefs': gb_entity_columnDefs,
  'paging': false,
  'autoWidth': false,
  'ordering': false,
  'select': true,
  'drawCallback': function(settings) {
    checkAssociated('gb-entity2');
  }
});
// -----------------------------------------------------------------
// PEPPOL
//
peppol_abie_table = $('#peppol-abie').DataTable({
  'ajax': 'data/list-peppol-abie.json',
  'columns': peppol_abie_columns,
  'columnDefs': peppol_abie_columnDefs,
  'paging': false,
  'autoWidth': false,
  'ordering': false,
  'select': true
});
peppol_entity_table = $('#peppol-entity').DataTable({
  'ajax': 'data/list-peppol-entity.json',
  'columns': peppol_entity_columns,
  'columnDefs': peppol_entity_columnDefs,
  'paging': false,
  'autoWidth': false,
  'ordering': false,
  'select': true,
  'initComplete': function(settings, json) {
    filterTop('peppol');
  },
  'drawCallback': function(settings) {
    checkAssociated('peppol-entity');
    hideOverlay();
  }
});
peppol_entity2_table = $('#peppol-entity2').DataTable({
  'ajax': 'data/list-peppol-entity.json',
  'columns': peppol_entity_columns,
  'columnDefs': peppol_entity_columnDefs,
  'paging': false,
  'autoWidth': false,
  'ordering': false,
  'select': true,
  'drawCallback': function(settings) {
    checkAssociated('peppol-entity2');
  }
});
// -----------------------------------------------------------------
// UBL
//
ubl_abie_table = $('#ubl-abie').DataTable({
  'ajax': 'data/list-ubl-abie.json',
  'columns': ubl_abie_columns,
  'columnDefs': ubl_abie_columnDefs,
  'paging': false,
  'autoWidth': false,
  'ordering': false,
  'select': true
});
ubl_entity_table = $('#ubl-entity').DataTable({
  'ajax': 'data/list-ubl-entity.json',
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
  'ajax': 'data/list-ubl-entity.json',
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
ubl_qdt_table = $('#ubl-qdt')
.DataTable({
  'ajax': 'data/list-udt.json',
  'columns': dt_columns,
  'columnDefs': dt_columnDefs,
  'paging': false,
  'autoWidth': false,
  'ordering': false,
  'select': true
});
/*.DataTable({
  'ajax': 'data/list-ubl-udt.json',
  'columns': ubl_dt_columns,
  'columnDefs': ubl_dt_columnDefs,
  'paging': false,
  'autoWidth': false,
  'ordering': false,
  'select': true
});*/
ubl_udt_table = $('#ubl-udt')

.DataTable({
  'ajax': 'data/list-udt.json',
  'columns': dt_columns,
  'columnDefs': dt_columnDefs,
  'paging': false,
  'autoWidth': false,
  'ordering': false,
  'select': true
});
/*.DataTable({
  'ajax': 'data/list-ubl-udt.json',
  'columns': ubl_dt_columns,
  'columnDefs': ubl_dt_columnDefs,
  'paging': false,
  'autoWidth': false,
  'ordering': false,
  'select': true
});
uncefact_udt_table = $('#uncefact-udt')
*/
// -----------------------------------------------------------------
// UN/CEFACT
//
bie_table = $('#bie').DataTable({
  'ajax': 'data/list-bie.json',
  'columns': bie_columns,
  'columnDefs': bie_columnDefs,
  'paging': false,
  'autoWidth': false,
  'ordering': false,
  'select': true
});
bie_compt_table = $('#bie-compt').DataTable({
  'ajax': 'data/list-bie_compt.json',
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
  'ajax': 'data/list-bie_compt.json',
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
  'ajax': 'data/list-qdt.json',
  'columns': qdt_columns,
  'columnDefs': qdt_columnDefs,
  'paging': false,
  'autoWidth': false,
  'ordering': false,
  'select': true
});
uncefact_udt_table = $('#uncefact-udt').DataTable({
  'ajax': 'data/list-udt.json',
  'columns': dt_columns,
  'columnDefs': dt_columnDefs,
  'paging': false,
  'autoWidth': false,
  'ordering': false,
  'select': true
});
// -----------------------------------------------------------------
acc_table = $('#acc').DataTable({
  'ajax': 'data/list-acc.json',
  'columns': acc_columns,
  'columnDefs': acc_columnDefs,
  'paging': false,
  'autoWidth': false,
  'ordering': false,
  'select': true
});
cc_table = $('#cc').DataTable({
  'ajax': 'data/list-cc.json',
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
  'ajax': 'data/list-cc.json',
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
  'ajax': 'data/list-udt.json',
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
$('#adc-abie-module').on('change', function(event) {
  var module = $(this).val();
  adc_abie_table
  .column(adc_abie_COL_Module)
  .search(module, /*regex*/true, /*smart*/false, /*caseInsen*/false).draw();
});
// $('#adc-abie-module').val('Base');
// -----
$('#adc-abie tbody').on('click', 'td.info-control', function(event) {
  event.stopPropagation();
  var tr = $(this).closest('tr'), row = adc_abie_table.row(tr);
  if (row.child.isShown()) { // This row is already open - close it
    row.child.hide(); tr.removeClass('shown');
  }
  else { // Open this row
    row.child(adc_entity_format(row.data())).show(); tr.addClass('shown');
  }
});
$('#adc-entity tbody').on('click', 'td.info-control', function(event) {
  event.stopPropagation();
  var tr = $(this).closest('tr'), row = adc_entity_table.row(tr);
  if (row.child.isShown()) { // This row is already open - close it
    row.child.hide(); tr.removeClass('shown');
  }
  else { // Open this row
    row.child(adc_entity_format(row.data())).show(); tr.addClass('shown');
  }
});
$('#adc-entity2 tbody').on('click', 'td.info-control', function(event) {
  event.stopPropagation();
  var tr = $(this).closest('tr'), row = adc_entity2_table.row(tr);
  if (row.child.isShown()) { // This row is already open - close it
    row.child.hide(); tr.removeClass('shown');
  }
  else { // Open this row
    row.child(adc_entity_format(row.data())).show(); tr.addClass('shown');
  }
});
$('#adc-udt tbody').on('click', 'td.info-control', function(event) {
  event.stopPropagation();
  var tr = $(this).closest('tr'), row = adc_udt_table.row(tr);
  if (row.child.isShown()) { // This row is already open - close it
    row.child.hide(); tr.removeClass('shown');
  }
  else { // Open this row
    row.child(adc_dt_format(row.data())).show(); tr.addClass('shown');
  }
});
// -----------------------------------------------------------------
// xBRL GL
//
$('#xbrlgl-abie tbody').on('click', 'td.info-control', function(event) {
  event.stopPropagation();
  var tr = $(this).closest('tr'), row = xbrlgl_abie_table.row(tr);
  if (row.child.isShown()) { // This row is already open - close it
    row.child.hide(); tr.removeClass('shown');
  }
  else { // Open this row
    row.child(xbrlgl_entity_format(row.data())).show(); tr.addClass('shown');
  }
});
$('#xbrlgl-entity tbody').on('click', 'td.info-control', function(event) {
  event.stopPropagation();
  var tr = $(this).closest('tr'), row = xbrlgl_entity_table.row(tr);
  if (row.child.isShown()) { // This row is already open - close it
    row.child.hide(); tr.removeClass('shown');
  }
  else { // Open this row
    row.child(xbrlgl_entity_format(row.data())).show(); tr.addClass('shown');
  }
});
$('#xbrlgl-entity2 tbody').on('click', 'td.info-control', function(event) {
  event.stopPropagation();
  var tr = $(this).closest('tr'), row = xbrlgl_entity2_table.row(tr);
  if (row.child.isShown()) { // This row is already open - close it
    row.child.hide(); tr.removeClass('shown');
  }
  else { // Open this row
    row.child(xbrlgl_entity_format(row.data())).show(); tr.addClass('shown');
  }
});
// -----------------------------------------------------------------
// TS5409
//
$('#ts5409-abie-module').on('change', function(event) {
  var module = $(this).val();
  ts5409_abie_table
  .column(ts5409_abie_COL_Module)
  .search(module, /*regex*/true, /*smart*/false, /*caseInsen*/false).draw();
});
// $('#ts5409-abie-module').val('Base');
// -----
$('#ts5409-abie tbody').on('click', 'td.info-control', function(event) {
  event.stopPropagation();
  var tr = $(this).closest('tr'), row = ts5409_abie_table.row(tr);
  if (row.child.isShown()) { // This row is already open - close it
    row.child.hide(); tr.removeClass('shown');
  }
  else { // Open this row
    row.child(ts5409_entity_format(row.data())).show(); tr.addClass('shown');
  }
});
$('#ts5409-entity tbody').on('click', 'td.info-control', function(event) {
  event.stopPropagation();
  var tr = $(this).closest('tr'), row = ts5409_entity_table.row(tr);
  if (row.child.isShown()) { // This row is already open - close it
    row.child.hide(); tr.removeClass('shown');
  }
  else { // Open this row
    row.child(ts5409_entity_format(row.data())).show(); tr.addClass('shown');
  }
});
$('#ts5409-entity2 tbody').on('click', 'td.info-control', function(event) {
  event.stopPropagation();
  var tr = $(this).closest('tr'), row = ts5409_entity2_table.row(tr);
  if (row.child.isShown()) { // This row is already open - close it
    row.child.hide(); tr.removeClass('shown');
  }
  else { // Open this row
    row.child(ts5409_entity_format(row.data())).show(); tr.addClass('shown');
  }
});
$('#ts5409-udt tbody').on('click', 'td.info-control', function(event) {
  event.stopPropagation();
  var tr = $(this).closest('tr'), row = ts5409_udt_table.row(tr);
  if (row.child.isShown()) { // This row is already open - close it
    row.child.hide(); tr.removeClass('shown');
  }
  else { // Open this row
    row.child(ts5409_dt_format(row.data())).show(); tr.addClass('shown');
  }
});
// -----------------------------------------------------------------
// ADCS
//
$('#adcs-abie-module').on('change', function(event) {
  var module = $(this).val();
  adcs_abie_table
  .column(adcs_abie_COL_Module)
  .search(module, /*regex*/true, /*smart*/false, /*caseInsen*/false).draw();
});
// -----
$('#adcs-abie tbody').on('click', 'td.info-control', function(event) {
  event.stopPropagation();
  var tr = $(this).closest('tr'), row = adcs_abie_table.row(tr);
  if (row.child.isShown()) { // This row is already open - close it
    row.child.hide(); tr.removeClass('shown');
  }
  else { // Open this row
    row.child(adcs_entity_format(row.data())).show(); tr.addClass('shown');
  }
});
$('#adcs-entity tbody').on('click', 'td.info-control', function(event) {
  event.stopPropagation();
  var tr = $(this).closest('tr'), row = adcs_entity_table.row(tr);
  if (row.child.isShown()) { // This row is already open - close it
    row.child.hide(); tr.removeClass('shown');
  }
  else { // Open this row
    row.child(adcs_entity_format(row.data())).show(); tr.addClass('shown');
  }
});
$('#adcs-entity2 tbody').on('click', 'td.info-control', function(event) {
  event.stopPropagation();
  var tr = $(this).closest('tr'), row = adcs_entity2_table.row(tr);
  if (row.child.isShown()) { // This row is already open - close it
    row.child.hide(); tr.removeClass('shown');
  }
  else { // Open this row
    row.child(adcs_entity_format(row.data())).show(); tr.addClass('shown');
  }
});
// -----------------------------------------------------------------
// SAF
//
$('#saf-abie-module').on('change', function(event) {
  var module = $(this).val();
  saf_abie_table
  .column(saf_abie_COL_Module)
  .search(module, /*regex*/true, /*smart*/false, /*caseInsen*/false).draw();
});
// $('#saf-abie-module').val('Base');
// -----
$('#saf-abie tbody').on('click', 'td.info-control', function(event) {
  event.stopPropagation();
  var tr = $(this).closest('tr'), row = saf_abie_table.row(tr);
  if (row.child.isShown()) { // This row is already open - close it
    row.child.hide(); tr.removeClass('shown');
  }
  else { // Open this row
    row.child(saf_entity_format(row.data())).show(); tr.addClass('shown');
  }
});
$('#saf-entity tbody').on('click', 'td.info-control', function(event) {
  event.stopPropagation();
  var tr = $(this).closest('tr'), row = saf_entity_table.row(tr);
  if (row.child.isShown()) { // This row is already open - close it
    row.child.hide(); tr.removeClass('shown');
  }
  else { // Open this row
    row.child(saf_entity_format(row.data())).show(); tr.addClass('shown');
  }
});
$('#saf-entity2 tbody').on('click', 'td.info-control', function(event) {
  event.stopPropagation();
  var tr = $(this).closest('tr'), row = saf_entity2_table.row(tr);
  if (row.child.isShown()) { // This row is already open - close it
    row.child.hide(); tr.removeClass('shown');
  }
  else { // Open this row
    row.child(saf_entity_format(row.data())).show(); tr.addClass('shown');
  }
});
// -----------------------------------------------------------------
// ADS
//
$('#ads-abie-module').on('change', function(event) {
  var module = $(this).val();
  ads_abie_table
  .column(ads_abie_COL_Module)
  .search(module, /*regex*/true, /*smart*/false, /*caseInsen*/false).draw();
});
// $('#ads-abie-module').val('Base');
// -----
$('#ads-abie tbody').on('click', 'td.info-control', function(event) {
  event.stopPropagation();
  var tr = $(this).closest('tr'), row = ads_abie_table.row(tr);
  if (row.child.isShown()) { // This row is already open - close it
    row.child.hide(); tr.removeClass('shown');
  }
  else { // Open this row
    row.child(ads_entity_format(row.data())).show(); tr.addClass('shown');
  }
});
$('#ads-entity tbody').on('click', 'td.info-control', function(event) {
  event.stopPropagation();
  var tr = $(this).closest('tr'), row = ads_entity_table.row(tr);
  if (row.child.isShown()) { // This row is already open - close it
    row.child.hide(); tr.removeClass('shown');
  }
  else { // Open this row
    row.child(ads_entity_format(row.data())).show(); tr.addClass('shown');
  }
});
$('#ads-entity2 tbody').on('click', 'td.info-control', function(event) {
  event.stopPropagation();
  var tr = $(this).closest('tr'), row = ads_entity2_table.row(tr);
  if (row.child.isShown()) { // This row is already open - close it
    row.child.hide(); tr.removeClass('shown');
  }
  else { // Open this row
    row.child(ads_entity_format(row.data())).show(); tr.addClass('shown');
  }
});
// -----------------------------------------------------------------
// GB
//
$('#gb-abie-module').on('change', function(event) {
  var module = $(this).val();
  gb_abie_table
  .column(gb_abie_COL_Module)
  .search(module, /*regex*/true, /*smart*/false, /*caseInsen*/false).draw();
});
$('#gb-abie-module').val('Public Archives');
// -----
$('#gb-abie tbody').on('click', 'td.info-control', function(event) {
  event.stopPropagation();
  var tr = $(this).closest('tr'), row = gb_abie_table.row(tr);
  if (row.child.isShown()) { // This row is already open - close it
    row.child.hide(); tr.removeClass('shown');
  }
  else { // Open this row
    row.child(gb_entity_format(row.data())).show(); tr.addClass('shown');
  }
});
$('#gb-entity tbody').on('click', 'td.info-control', function(event) {
  event.stopPropagation();
  var tr = $(this).closest('tr'), row = gb_entity_table.row(tr);
  if (row.child.isShown()) { // This row is already open - close it
    row.child.hide(); tr.removeClass('shown');
  }
  else { // Open this row
    row.child(gb_entity_format(row.data())).show(); tr.addClass('shown');
  }
});
$('#gb-entity2 tbody').on('click', 'td.info-control', function(event) {
  event.stopPropagation();
  var tr = $(this).closest('tr'), row = gb_entity2_table.row(tr);
  if (row.child.isShown()) { // This row is already open - close it
    row.child.hide(); tr.removeClass('shown');
  }
  else { // Open this row
    row.child(gb_entity_format(row.data())).show(); tr.addClass('shown');
  }
});
// -----------------------------------------------------------------
// PEPPOL
//
$('#peppol-abie tbody').on('click', 'td.info-control', function(event) {
  event.stopPropagation();
  var tr = $(this).closest('tr'), row = peppol_abie_table.row(tr);
  if (row.child.isShown()) { // This row is already open - close it
    row.child.hide(); tr.removeClass('shown');
  }
  else { // Open this row
    row.child(peppol_entity_format(row.data())).show(); tr.addClass('shown');
  }
});
$('#peppol-entity tbody').on('click', 'td.info-control', function(event) {
  event.stopPropagation();
  var tr = $(this).closest('tr'), row = peppol_entity_table.row(tr);
  if (row.child.isShown()) { // This row is already open - close it
    row.child.hide(); tr.removeClass('shown');
  }
  else { // Open this row
    row.child(peppol_entity_format(row.data())).show(); tr.addClass('shown');
  }
});
$('#peppol-entity2 tbody').on('click', 'td.info-control', function(event) {
  event.stopPropagation();
  var tr = $(this).closest('tr'), row = peppol_entity2_table.row(tr);
  if (row.child.isShown()) { // This row is already open - close it
    row.child.hide(); tr.removeClass('shown');
  }
  else { // Open this row
    row.child(peppol_entity_format(row.data())).show(); tr.addClass('shown');
  }
});
// -----------------------------------------------------------------
// UBL
//
$('#ubl-abie tbody').on('click', 'td.info-control', function(event) {
  event.stopPropagation();
  var tr = $(this).closest('tr'), row = ubl_abie_table.row(tr);
  if (row.child.isShown()) { // This row is already open - close it
    row.child.hide(); tr.removeClass('shown');
  }
  else { // Open this row
    row.child(ubl_entity_format(row.data())).show(); tr.addClass('shown');
  }
});
$('#ubl-entity tbody').on('click', 'td.info-control', function(event) {
  event.stopPropagation();
  var tr = $(this).closest('tr'), row = ubl_entity_table.row(tr);
  if (row.child.isShown()) { // This row is already open - close it
    row.child.hide(); tr.removeClass('shown');
  }
  else { // Open this row
    row.child(ubl_entity_format(row.data())).show(); tr.addClass('shown');
  }
});
$('#ubl-entity2 tbody').on('click', 'td.info-control', function(event) {
  event.stopPropagation();
  var tr = $(this).closest('tr'), row = ubl_entity2_table.row(tr);
  if (row.child.isShown()) { // This row is already open - close it
    row.child.hide(); tr.removeClass('shown');
  }
  else { // Open this row
    row.child(ubl_entity_format(row.data())).show(); tr.addClass('shown');
  }
});
$('#ubl-udt tbody').on('click', 'td.info-control', function(event) {
  event.stopPropagation();
  var tr = $(this).closest('tr'), row = ubl_udt_table.row(tr);
  if (row.child.isShown()) { // This row is already open - close it
    row.child.hide(); tr.removeClass('shown');
  }
  else { // Open this row
    row.child(ubl_dt_format(row.data())).show(); tr.addClass('shown');
  }
});
$('#ubl-qdt tbody').on('click', 'td.info-control', function(event) {
  event.stopPropagation();
  var tr = $(this).closest('tr'), row = ubl_udt_table.row(tr);
  if (row.child.isShown()) { // This row is already open - close it
    row.child.hide(); tr.removeClass('shown');
  }
  else { // Open this row
    row.child(qdt_format(row.data())).show(); tr.addClass('shown');
  }
});
// -----------------------------------------------------------------
// UN/CEFACT
//
$('#bie tbody').on('click', 'td.info-control', function(event) {
  event.stopPropagation();
  var tr = $(this).closest('tr'), row = bie_table.row(tr);
  if (row.child.isShown()) { // This row is already open - close it
    row.child.hide(); tr.removeClass('shown');
  }
  else { // Open this row
    row.child(bie_format(row.data())).show(); tr.addClass('shown');
  }
});
$('#bie-compt tbody').on('click', 'td.info-control', function(event) {
  event.stopPropagation();
  var tr = $(this).closest('tr'), row = bie_compt_table.row(tr);
  if (row.child.isShown()) { // This row is already open - close it
    row.child.hide(); tr.removeClass('shown');
  }
  else { // Open this row
    row.child(bie_compt_format(row.data())).show(); tr.addClass('shown');
  }
});
$('#bie-compt2 tbody').on('click', 'td.info-control', function(event) {
  event.stopPropagation();
  var tr = $(this).closest('tr'), row = bie_compt2_table.row(tr);
  if (row.child.isShown()) { // This row is already open - close it
    row.child.hide(); tr.removeClass('shown');
  }
  else { // Open this row
    row.child(bie_compt_format(row.data())).show(); tr.addClass('shown');
  }
});
$('#qdt tbody').on('click', 'td.info-control', function(event) {
  event.stopPropagation();
  var tr = $(this).closest('tr'), row = qdt_table.row(tr);
  if (row.child.isShown()) { // This row is already open - close it
    row.child.hide(); tr.removeClass('shown');
  }
  else { // Open this row
    row.child(qdt_format(row.data())).show(); tr.addClass('shown');
  }
});
$('#uncefact-udt tbody').on('click', 'td.info-control', function(event) {
  event.stopPropagation();
  var tr = $(this).closest('tr'), row = uncefact_udt_table.row(tr);
  if (row.child.isShown()) { // This row is already open - close it
    row.child.hide(); tr.removeClass('shown');
  }
  else { // Open this row
    row.child(dt_format(row.data())).show(); tr.addClass('shown');
  }
});
// -----------------------------------------------------------------
$('#acc tbody').on('click', 'td.info-control', function () {
  event.stopPropagation();
  var tr = $(this).closest('tr'), row = acc_table.row(tr);
  if (row.child.isShown()) { // This row is already open - close it
    row.child.hide(); tr.removeClass('shown');
  }
  else { // Open this row
    row.child(acc_format(row.data())).show(); tr.addClass('shown');
  }
});
$('#cc tbody').on('click', 'td.info-control', function(event) {
  event.stopPropagation();
  var tr = $(this).closest('tr'), row = cc_table.row(tr);
  if (row.child.isShown()) { // This row is already open - close it
    row.child.hide(); tr.removeClass('shown');
  }
  else { // Open this row
    row.child(cc_format(row.data())).show(); tr.addClass('shown');
  }
});
$('#cc2 tbody').on('click', 'td.info-control', function(event) {
  event.stopPropagation();
  var tr = $(this).closest('tr'), row = cc2_table.row(tr);
  if (row.child.isShown()) { // This row is already open - close it
    row.child.hide(); tr.removeClass('shown');
  }
  else { // Open this row
    row.child(cc_format(row.data())).show(); tr.addClass('shown');
  }
}); 
$('#udt tbody').on('click', 'td.info-control', function(event) {
  event.stopPropagation();
  var tr = $(this).closest('tr'), row = udt_table.row(tr);
  if (row.child.isShown()) { // This row is already open - close it
    row.child.hide(); tr.removeClass('shown');
  }
  else { // Open this row
    row.child(dt_format(row.data())).show(); tr.addClass('shown');
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
  var a_num, b_num, a_arr, b_arr;
  a_num = ''+a.num;
  b_num = ''+b.num;
  a_arr = a_num.split('.').map(function(v){ return +v; }),
  b_arr = b_num.split('.').map(function(v){ return +v; });
  while (a_arr.length > 0 && b_arr.length > 0) {
    a_num = a_arr.shift();
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
  if (!objectClassTermQualifier) {
    objectClassTermQualifier = '';
  }
  if (!objectClassTerm) {
    objectClassTerm = '';
  }
  // if ('string' !== typeof objectClassTermQualifier || 'string' !== typeof objectClassTerm) {
  //   return;
  // }
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
        item.ancestor = (item.ObjectClassTermQualifier
            ? item.ObjectClassTermQualifier+'_ '
            : ''
          )+item.ObjectClassTerm;
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
  regex = new RegExp('^'+objectClass+'\\.');
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
function entityRowsUpdate(frame, entityRows, expandedRows, collapsedRows, table_id) {
  var table, table_id, expanded, collapsed, info, rows, i, idx, tr;
  if (table_id) {
    table = $('#'+table_id).DataTable();
  }
  else {
    table = getEntityTable(frame);
  }
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
      rows, i, idx, regex, num, match, qualifier, associated;
  table_id = tr.parent().parent().attr('id');
  table = $('#'+table_id).DataTable();// getEntityTable(frame);
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

    // childRows = {};
    expandedRows.forEach(function(data_) {
      i = 0;
      qualifier = data_.AssociatedObjectClassTermQualifier || '';
      if (qualifier) {
        if (qualifier.match(/^\[.*\]$/)) {
          qualifier = '.*_ ';
        }
        else {
          qualifier = qualifier+'_ ';
        }
      }
      associated = data_.AssociatedObjectClass;
      regex = new RegExp('^'+qualifier+associated+'\\.');
      entityMap.forEach(function(value, key) {
        if (value.ancestor === data_.ancestor) {
          var json = JSON.stringify(value);
          if (json) {
            v = JSON.parse(json);
            appendByNum(entityRows, v);
          }
          // childRows[key] = value;
        }
        if (key && key.match(regex)) {
          var json = JSON.stringify(value);
          if (json) {
            v = JSON.parse(json);
            idx = data_.num+'.'+(i++);
            v.num = idx;
            if (data_.ancestor) {
              v.ancestor = data_.ancestor;
            }
            appendByNum(entityRows, v);
          }
          // childRows[key] = value;
        }
      });
    });

    entityRows.forEach(function(d, key) {
      var num, name, depth, prefix = '', i;
      num = ''+d.num;
      name = d.Name || d.ComponentName || d.ShortName || d.BusinessTerm;
      depth = num.split('.').length - 1;
      prefix = ''
      if (depth > 0 && name && ! name.match(/^&bullet;/)){
        for (var i = 0; i < depth; i++) {
          prefix += '&bullet;';
        }
        prefix += ' ';
      }
      d.Name = prefix + name;
    });
  }

  entityRows.sort(compareNum);

  table.clear();
  table.rows.add(entityRows)
  .draw();

  entityRowsUpdate(frame, entityRows, expandedRows, collapsedRows, table_id);

  return entityRows;
}
// -----------------------------------------------------------------
// ADC
adcEntityRows = [];
// -----------------------------------------------------------------
// xBRL GL
xbrlglEntityRows = [];
// -----------------------------------------------------------------
// TS5409
ts5409EntityRows = [];
// -----------------------------------------------------------------
// ADCS
adcsEntityRows = [];
// -----------------------------------------------------------------
// SAF
safEntityRows = [];
// -----------------------------------------------------------------
// ADS
adsEntityRows = [];
// -----------------------------------------------------------------
// GB
gbEntityRows = [];
// -----------------------------------------------------------------
// PEPPOL
peppolEntityRows = [];
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
var FIRST_RATIO = 0.25;
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
  if (!control[0]) {
    $('#bottom-horizontal-divider-'+num)
    .append('<div id="up-'+num+'" class="d-none"><span class="up-control"></span></div>')
    $('#up-'+num).on('click', function(event) {
      upAssociation(1);
    });
  }
  control.removeClass('d-none');
}
function hideUpControl(num) {
  var control = $('#up-'+num);
  if (!control[0]) {
    $('#bottom-horizontal-divider-'+num)
    .append('<div id="up-'+num+'" class="d-none"><span class="up-control"></span></div>')
    $('#up-'+num).on('click', function(event) {
      upAssociation(1);
    });
  }
  control.addClass('d-none');
}
function showBackControl(num) {
  var control = $('#back-'+num);
  if (!control[0]) {
    $('#bottom-horizontal-divider-'+num)
    .append('<div id="back-'+num+'" class="d-none"><span class="up-control"></span></div>')
    $('#back-'+num).on('click', function(event) {
      previousEntity(num);
    });
  }
  control.removeClass('d-none');
}
function hideBackControl(num) {
  var control = $('#back-'+num);
  if (!control[0]) {
    $('#bottom-horizontal-divider-'+num)
    .append('<div id="back-'+num+'" class="d-none"><span class="up-control"></span></div>')
    $('#back-'+num).on('click', function(event) {
      previousEntity(num);
    });
  }
  control.addClass('d-none');
}
// -----------------------------------------------------------------
function setEntityRows(frame, objectClassTermQualifier, objectClassTerm) {
  switch (frame) {
    case 'adc':
      // objectClassTermQualifier = objectClassTermQualifier || 'ADC';
      adcEntityRows = filterEntity('adc', objectClassTermQualifier, objectClassTerm);
      break;
    case 'xbrlgl':
      xbrlglEntityRows = filterEntity('xbrlgl', objectClassTermQualifier, objectClassTerm);
      break;
    case 'ts5409':
      // objectClassTermQualifier = objectClassTermQualifier || 'TS5409';
      ts5409EntityRows = filterEntity('ts5409', objectClassTermQualifier, objectClassTerm);
      break;
    case 'adcs':
      adcsEntityRows = filterEntity('adcs', objectClassTermQualifier, objectClassTerm);
      break;
    case 'saf':
      safEntityRows = filterEntity('saf', objectClassTermQualifier, objectClassTerm);
      break;
    case 'ads':
      // objectClassTermQualifier = objectClassTermQualifier || 'ADS';
      adsEntityRows = filterEntity('ads', objectClassTermQualifier, objectClassTerm);
      break;
    case 'gb':
        gbEntityRows = filterEntity('gb', objectClassTermQualifier, objectClassTerm);
        break;
    case 'peppol':
      peppolEntityRows = filterEntity('peppol', objectClassTermQualifier, objectClassTerm);
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
  if (!objectClassTermQualifier && ['adc', 'ts5409', 'ads'].indexOf(frame) >= 0) {
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
      row, data, top_id, entity_id, num, qualifier, searchText, tableTitle,
      objectClassTerm;//, count;
  switch (frame) {
    case 'adc':
      table = adc_abie_table; entityMap = adcEntityMap; entityRows = adcEntityRows;
      break;
    case 'xbrlgl':
      table = xbrlgl_abie_table; entityMap = xbrlglEntityMap; entityRows = xbrlglEntityRows;
      break;
    case 'ts5409':
      table = ts5409_abie_table; entityMap = ts5409EntityMap; entityRows = ts5409EntityRows;
      break;
    case 'adcs':
      table = adcs_abie_table; entityMap = adcsEntityMap; entityRows = adcsEntityRows;
      break;
    case 'saf':
      table = saf_abie_table; entityMap = safEntityMap; entityRows = safEntityRows;
      break;
    case 'ads':
      table = ads_abie_table; entityMap = adsEntityMap; entityRows = adsEntityRows;
      break;
    case 'gb':
      table = gb_abie_table; entityMap = gbEntityMap; entityRows = gbEntityRows;
      break;
    case 'peppol':
      table = peppol_abie_table; entityMap = peppolEntityMap; entityRows = peppolEntityRows;
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
  objectClassTerm = data.ObjectClassTerm;
  if (['adc', 'ads', 'adcs', 'saf', 'xbrlgl'].indexOf(frame) >= 0) {
    if ('_'==objectClassTerm.substr(0,1)) {
      objectClassTerm = objectClassTerm.substr(1);
    }
    tableTitle.text(objectClassTerm);
  }
  else if ('peppol' == frame) {
    tableTitle.text(searchText.replace(/_/, ''));
  }
  else {
    tableTitle.text(searchText);
  }
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
      COL_DictionaryEntryName,
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
  // componentType = data.ComponentType || data.Kind;
  switch (frame) {
    case 'adc':
      entity2_table = adc_entity2_table;
      udttable      = adc_udt_table;
      COL_ObjectClassTerm     = adc_entity_COL_ObjectClassTerm;
      COL_DictionaryEntryName = adc_dt_COL_DictionaryEntryName;
      COL_DataType            = adc_dt_COL_DataType;
      break;
    case 'xbrlgl':
      entity2_table = xbrlgl_entity2_table;
      // udttable = xbrlgl_udt_table;
      COL_ObjectClassTerm = xbrlgl_entity_COL_ObjectClassTerm;
      break;
    case 'ts5409':
      entity2_table = ts5409_entity2_table;
      udttable      = ts5409_udt_table;
      COL_ObjectClassTerm     = ts5409_entity_COL_ObjectClassTerm;
      COL_DictionaryEntryName = ts5409_dt_COL_DictionaryEntryName;
      COL_DataType            = ts5409_dt_COL_DataType;
      break;
    case 'adcs':
      entity2_table = adcs_entity2_table;
      // udttable = adcs_udt_table;
      COL_ObjectClassTerm = adcs_entity_COL_ObjectClassTerm;
      break;
    case 'saf':
      entity2_table = saf_entity2_table;
      // udttable = saf_udt_table;
      COL_ObjectClassTerm = saf_entity_COL_ObjectClassTerm;
      break;
    case 'ads':
      entity2_table = ads_entity2_table;
      // udttable = ads_udt_table;
      COL_ObjectClassTerm = ads_entity_COL_ObjectClassTerm;
      break;
    case 'gb':
      entity2_table = gb_entity2_table;
      // udttable      = ubl_udt_table;
      COL_ObjectClassTerm = gb_entity_COL_ObjectClassTerm;
      break;
    case 'peppol':
      entity2_table = peppol_entity2_table;
      // udttable      = ubl_udt_table;
      COL_ObjectClassTerm = peppol_entity_COL_ObjectClassTerm;
      break;
    case 'ubl':
      entity2_table = ubl_entity2_table;
      udttable      = ubl_udt_table;
      qdttable      = ubl_qdt_table;
      COL_ObjectClassTerm     = ubl_entity_COL_ObjectClassTerm;
      COL_DictionaryEntryName = ubl_dt_COL_DictionaryEntryName;
      COL_CategoryCode        = ubl_dt_COL_CategoryCode;
      COL_DataType            = ubl_dt_COL_DataType;
      break;
    case 'bie':
      entity2_table = bie_compt2_table;
      udttable      = uncefact_udt_table;
      qdttable      = qdt_table;
      // COL_ObjectClassTerm     = bie_compt_COL_ObjectClassTerm;
      COL_DictionaryEntryName = bie_compt_COL_DictionaryEntryName;
      COL_UNID                = qdt_COL_UNID;
      COL_DataType            = dt_COL_DataType;
      break;
    case 'acc':
      entity2_table = cc2_table;
      udttable      = udt_table;
      COL_ObjectClassTerm = cc_COL_ObjectClassTerm;
      COL_DataType        = dt_COL_DataType;
      break;
  }
  if (['RFBIE','RBIE','RCC'].indexOf(componentType) >= 0) {
    $('#'+entity2_id+'-frame').removeClass('d-none');
    if (qdt_id) {
      $('#'+qdt_id+'-frame').addClass('d-none');
    }
    else if (udt_id) {
      $('#'+udt_id+'-frame').addClass('d-none');
    }
    if (['adc', 'xbrlgl', 'ts5409', 'ads', 'gb', 'peppol', 'ubl'].indexOf(frame) >= 0) {
      var qualifier, assocClass;
      qualifier = data.AssociatedObjectClassTermQualifier || '';
      qualifier = qualifier ? qualifier.trim()+'_ ' : '';
      assocClass = data.AssociatedObjectClass;
      searchText = qualifier + assocClass;
      entity2_table.columns(COL_ObjectClassTerm)
      .search('^'+searchText+'$', /*regex*/true, /*smart*/false, /*caseInsen*/false)
      .draw();
      var idx;
      if (pane[1]==frame) { idx = 1; }
      if (pane[2]==frame) { idx = 2; }
      if ($('#'+frame+'-entity2 tbody td').hasClass('dataTables_empty')) {
        entity2_table.columns(COL_ObjectClassTerm)
        .search('^'+assocClass+'$', /*regex*/true, /*smart*/false, /*caseInsen*/false)
        .draw();
      }
    }
    else if (['adcs','saf'].indexOf(frame) >= 0) {
      var qualifier, assocClass;
      qualifier = data.ReferencedObjectClassTermQualifier || '';
      qualifier = qualifier ? qualifier.trim()+'_ ' : '';
      referencedClass = data.ReferencedObjectClass;
      searchText = qualifier + referencedClass;
      entity2_table.columns(COL_ObjectClassTerm)
      .search('^'+searchText+'$', /*regex*/true, /*smart*/false, /*caseInsen*/false)
      .draw();
      var idx;
      if (pane[1]==frame) { idx = 1; }
      if (pane[2]==frame) { idx = 2; }
      if ($('#'+frame+'-entity2 tbody td').hasClass('dataTables_empty')) {
        entity2_table.columns(COL_ObjectClassTerm)
        .search('^'+assocClass+'$', /*regex*/true, /*smart*/false, /*caseInsen*/false)
        .draw();
      }
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
    tableTitle.text(searchText);//assocClass);
    showUpControl(num);
  }
  else if (['BBIE','BCC'].indexOf(componentType) >= 0) {
    $('#'+entity2_id+'-frame').addClass('d-none');
    $('#'+qdt_id+'-frame').addClass('d-none');
    $('#'+udt_id+'-frame').addClass('d-none');
    if (qdt_id && data.QualifiedDataTypeUID) {
      $('#'+qdt_id+'-frame').removeClass('d-none');
      searchText = data.QualifiedDataTypeUID;
      if (['bie'].indexOf(frame) >= 0) {
        qdttable.columns(qdt_COL_UNID)
        .search('^'+searchText+'$', /*regex*/true, /*smart*/false, /*caseInsen*/false)
        .draw();
      }
      tableTitle = $('#'+qdt_id+'-frame .table-title');
      tableTitle.text(data.ShortName);
    }
    else if (udt_id) {
      $('#'+udt_id+'-frame').removeClass('d-none');
      searchText = data.RepresentationTerm;
      if (['ubl'].indexOf(frame) >= 0) {
        udttable.columns(COL_DataType)
        .search('^'+searchText+'\\.', /*regex*/true, /*smart*/false, /*caseInsen*/false)
        .draw();
      }
      else if (['bie'].indexOf(frame) >= 0) {
        udttable.columns(COL_DataType)
        .search('^'+searchText+'\\.', true, false, false)
        .draw();
      }
      else if (['adc', 'ts5409', 'acc'].indexOf(frame) >= 0) {
        udttable.columns(COL_DataType)
        .search('^'+searchText+'\\.', /*regex*/true, /*smart*/false, /*caseInsen*/false)
        .draw();
      }
      tableTitle = $('#'+udt_id+'-frame .table-title');
      tableTitle.text(searchText+'\\. Type');
    }
    else {
      tr.removeClass('selected');
      $('#bottom-component-'+num+' .split-pane').splitPane('lastComponentSize', 0);
    }
    hideUpControl(num);
  }
}
// -----------------------------------------------------------------
// ADC
//
  $('#adc-abie tbody').on('click', 'td:not(.info-control)', function (event) {
    event.stopPropagation();
    var tr = $(this).closest('tr'), frame = 'adc';
    showEntity(tr, frame);
  });
  $('#adc-entity tbody').on('click', 'td:not(.info-control)', function (event) {
    event.stopPropagation();
    var tr = $(this).closest('tr'), frame = 'adc', row, data, componentType;
    row = adc_entity_table.row(tr);
    if (!row) { return false; }
    data = row.data();
    if (!data) { return false; }
    componentType = data.ComponentType || data.Kind;
    if ('ASBIE' === componentType || 'ASCC' === componentType) {
      adcEntityRows = expandCollapse(frame, adcEntityMap, tr);      
    }
    else {
      showDetail(tr, frame);
    }
  });
// -----------------------------------------------------------------
// xBRL GL
//
  $('#xbrlgl-abie tbody').on('click', 'td:not(.info-control)', function (event) {
    event.stopPropagation();
    var tr = $(this).closest('tr'), frame ='xbrlgl';
    showEntity(tr, frame);
  });
  $('#xbrlgl-entity tbody').on('click', 'td:not(.info-control)', function (event) {
    event.stopPropagation();
    var tr = $(this).closest('tr'), frame ='xbrlgl', row, data, componentType;
    row = xbrlgl_entity_table.row(tr), data = row.data();
    if (!row) { return false; }
    data = row.data();
    if (!data) { return false; }
    componentType = data.ComponentType || data.Kind;
    if ('ASBIE' === componentType || 'ASCC' === componentType) {
      xbrlglEntityRows = expandCollapse(frame, xbrlglEntityMap, tr);      
    }
    else {
      showDetail(tr, frame);
    }
  });
// -----------------------------------------------------------------
// TS5409
//
$('#ts5409-abie tbody').on('click', 'td:not(.info-control)', function (event) {
  event.stopPropagation();
  var tr = $(this).closest('tr'), frame = 'ts5409';
  showEntity(tr, frame);
});
$('#ts5409-entity tbody').on('click', 'td:not(.info-control)', function (event) {
  event.stopPropagation();
  var tr = $(this).closest('tr'), frame = 'ts5409', row, data, componentType;
  row = ts5409_entity_table.row(tr);
  if (!row) { return false; }
  data = row.data();
  if (!data) { return false; }
  componentType = data.ComponentType || data.Kind;
  if ('ASBIE' === componentType || 'ASCC' === componentType) {
    ts5409EntityRows = expandCollapse(frame, ts5409EntityMap, tr);      
  }
  else {
    showDetail(tr, frame);
  }
});
// -----------------------------------------------------------------
// ADCS
//
$('#adcs-abie tbody').on('click', 'td:not(.info-control)', function (event) {
  event.stopPropagation();
  var tr = $(this).closest('tr'), frame = 'adcs';
  showEntity(tr, frame);
});
$('#adcs-entity tbody').on('click', 'td.details-control', function (event) {
  event.stopPropagation();
  var tr = $(this).closest('tr'), frame = 'adcs';
  adcsEntityRows = expandCollapse(frame, adcsEntityMap, tr);      
});
$('#adcs-entity tbody').on('click', 'td.link-control', function (event) {
  event.stopPropagation();
  var tr = $(this).closest('tr'), frame = 'adcs';
  showDetail(tr, frame);
});
$('#adcs-entity2 tbody').on('click', 'td.details-control', function (event) {
  event.stopPropagation();
  var tr = $(this).closest('tr'), frame = 'adcs', row, data, componentType;
  row = adcs_entity2_table.row(tr), data = row.data();
  if (!row) { return false; }
  data = row.data();
  if (!data) { return false; }
  componentType = data.ComponentType || data.Kind;
  if ('ASBIE' === componentType || 'ASCC' === componentType) {
    adcsEntityRows = expandCollapse(frame, adcsEntityMap, tr);      
  }
  else {
    showDetail(tr, frame);
  }
});
// -----------------------------------------------------------------
// SAF
//
$('#saf-abie tbody').on('click', 'td:not(.info-control)', function (event) {
  event.stopPropagation();
  var tr = $(this).closest('tr'), frame = 'saf';
  showEntity(tr, frame);
});
$('#saf-entity tbody').on('click', 'td.details-control', function (event) {
  event.stopPropagation();
  var tr = $(this).closest('tr'), frame = 'saf';
  safEntityRows = expandCollapse(frame, safEntityMap, tr);      
});
$('#saf-entity tbody').on('click', 'td.link-control', function (event) {
  event.stopPropagation();
  var tr = $(this).closest('tr'), frame = 'saf';
  showDetail(tr, frame);
});
$('#saf-entity2 tbody').on('click', 'td.details-control', function (event) {
  event.stopPropagation();
  var tr = $(this).closest('tr'), frame = 'saf', row, data, componentType;
  row = saf_entity2_table.row(tr), data = row.data();
  if (!row) { return false; }
  data = row.data();
  if (!data) { return false; }
  componentType = data.ComponentType || data.Kind;
  if ('ASBIE' === componentType || 'ASCC' === componentType) {
    safEntityRows = expandCollapse(frame, safEntityMap, tr);      
  }
  else {
    showDetail(tr, frame);
  }
});
// -----------------------------------------------------------------
// ADS
//
  $('#ads-abie tbody').on('click', 'td:not(.info-control)', function (event) {
    event.stopPropagation();
    var tr = $(this).closest('tr'), frame = 'ads';
    showEntity(tr, frame);
  });
  $('#ads-entity tbody').on('click', 'td:not(.info-control)', function (event) {
    event.stopPropagation();
    var tr = $(this).closest('tr'), frame = 'ads', row, data, componentType;
    row = ads_entity_table.row(tr), data = row.data();
    if (!row) { return false; }
    data = row.data();
    if (!data) { return false; }
    componentType = data.ComponentType || data.Kind;
    if ('ASBIE' === componentType || 'ASCC' === componentType) {
      adsEntityRows = expandCollapse(frame, adsEntityMap, tr);      
    }
    else {
      showDetail(tr, frame);
    }
  });
// -----------------------------------------------------------------
// GB
//
$('#gb-abie tbody').on('click', 'td:not(.info-control)', function (event) {
  event.stopPropagation();
  var tr = $(this).closest('tr'), frame ='gb';
  showEntity(tr, frame);
});
$('#gb-entity tbody').on('click', 'td:not(.info-control)', function (event) {
  event.stopPropagation();
  var tr = $(this).closest('tr'), frame ='gb', row, data, componentType;
  row = gb_entity_table.row(tr), data = row.data();
  if (!row) { return false; }
  data = row.data();
  if (!data) { return false; }
  componentType = data.ComponentType || data.Kind;
  if ('ASBIE' === componentType || 'ASCC' === componentType) {
    gbEntityRows = expandCollapse(frame, gbEntityMap, tr);      
  }
  else {
    showDetail(tr, frame);
  }
});
// -----------------------------------------------------------------
// PEPPOL
//
$('#peppol-abie tbody').on('click', 'td:not(.info-control)', function (event) {
  event.stopPropagation();
  var tr = $(this).closest('tr'), frame ='peppol';
  showEntity(tr, frame);
});
$('#peppol-entity tbody').on('click', 'td:not(.info-control)', function (event) {
  event.stopPropagation();
  var tr = $(this).closest('tr'), frame ='peppol', row, data, componentType;
  row = peppol_entity_table.row(tr), data = row.data();
  if (!row) { return false; }
  data = row.data();
  if (!data) { return false; }
  componentType = data.ComponentType || data.Kind;
  if ('ASBIE' === componentType || 'ASCC' === componentType) {
    peppolEntityRows = expandCollapse(frame, peppolEntityMap, tr);      
  }
  else {
    showDetail(tr, frame);
  }
});
// -----------------------------------------------------------------
// UBL
//
  $('#ubl-abie tbody').on('click', 'td:not(.info-control)', function (event) {
    event.stopPropagation();
    var tr = $(this).closest('tr'), frame = 'ubl';
    showEntity(tr, frame);
  });
  $('#ubl-entity tbody').on('click', 'td:not(.info-control)', function (event) {
    event.stopPropagation();
    var tr = $(this).closest('tr'), frame = 'ubl', row, data, componentType;
    row = ubl_entity_table.row(tr), data = row.data();
    if (!row) { return false; }
    data = row.data();
    if (!data) { return false; }
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
  $('#bie tbody').on('click', 'td:not(.info-control)', function (event) {
    event.stopPropagation();
    var tr = $(this).closest('tr'), frame = 'bie';
    showEntity(tr, frame);
  });
  $('#bie-compt tbody').on('click', 'td:not(.info-control)', function (event) {
    event.stopPropagation();
    var tr = $(this).closest('tr'), frame = 'bie', row, data, componentType;
    row = bie_compt_table.row(tr), data = row.data();
    if (!row) { return false; }
    data = row.data();
    if (!data) { return false; }
    componentType = data.ComponentType || data.Kind;
    if ('ASBIE' === componentType || 'ASCC' === componentType) {
      bieComptRows = expandCollapse(frame, bieComptMap, tr);
    }
    else {
      showDetail(tr, frame);
    }
  });
// -----------------------------------------------------------------
  $('#acc tbody').on('click', 'td:not(.info-control)', function (event) {
    event.stopPropagation();
    var tr = $(this).closest('tr'), frame = 'acc';
    showEntity(tr, frame);
  });
  $('#cc tbody').on('click', 'td:not(.info-control)', function (event) {
    event.stopPropagation();
    var tr = $(this).closest('tr'), frame = 'acc', row, data, componentType;
    row = cc_table.row(tr), data = row.data();
    if (!row) { return false; }
    data = row.data();
    if (!data) { return false; }
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
  DESCRIPTION_LENGTH = 200;
  if (tab1 && !tab2) {
    setFrame(1, tab1);
  }
  else {
    tab1 = tab1 || 'adcs'; // 'ts5409';
    tab2 = tab2 || 'saf'; //'ads';
    setFrame(2, tab2);
    setFrame(1, tab1);
  }
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