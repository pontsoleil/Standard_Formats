var 
    acc_table, cc_table, udt_table, cc2_table,
    mbie_table, mbie_compt_table, mbie_compt2_table, qdt_table,
    adc_abie_table, adc_entity_table, adc_entity2_table, adc_udt_table,
    adc_abie_COL_ComponentName, adc_abie_COL_DictionaryEntryName,
    adc_entity_COL_DictionaryEntryName, adc_entity_COL_ObjectClass,
    adc_dt_COL_CategoryCode, adc_dt_COL_ObjectClass, adc_dt_COL_DictionaryEntryName,  
    acc_COL_ObjectClassTerm, cc_COL_ObjectClassTerm, cc_COL_ShortName,
    dt_COL_DataType, dt_COL_DictionaryEntryName,
    mbie_COL_ObjectClassTerm,
    mbie_compt_COL_DictionaryEntryName, mbie_compt_COL_ShortName,
    qdt_COL_UNID,
    ubl_abie_table, ubl_abie_COL_ComponentName, ubl_abie_COL_DictionaryEntryName,
    ubl_entity_table, ubl_entity_COL_DictionaryEntryName, ubl_entity_COL_ObjectClass,
    ubl_udt_table, ubl_dt_COL_CategoryCode, ubl_dt_COL_DictionaryEntryName,
    ubl_acc_table, ubl_cc_table, ubl_un_udt_table, ubl_cc2_table;

// TAB
function openTab(evt, tabName) {
  // Declare all variables
  var i, tabcontent, tablinks;
  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName('tabcontent');
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = 'none';
  }
  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName('tablinks');
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].classList.remove('active');
  }
  // Show the current tab, and add an "active" class to the link that opened the tab
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.classList.add('active');
}

function resetFilter() {
  // UNCEFACT
  mbie_table.columns(mbie_COL_ObjectClassTerm)
  .search('', /*regex*/false, /*smart*/false, /*caseInsen*/false).draw();
  mbie_compt_table.columns(mbie_compt_COL_DictionaryEntryName)
  .search('', /*regex*/false, /*smart*/false, /*caseInsen*/false).draw();
  acc_table.columns(acc_COL_ObjectClassTerm)
  .search('', /*regex*/false, /*smart*/false, /*caseInsen*/false).draw();
  cc_table.columns(cc_COL_ObjectClassTerm)
  .search('', /*regex*/false, /*smart*/false, /*caseInsen*/false).draw();
  //ADC
  adc_ubl_abie_table.columns(ubl_abie_COL_ComponentName)
  .search('', /*regex*/false, /*smart*/false, /*caseInsen*/false).draw();
  // UBL
  ubl_abie_table.columns(ubl_abie_COL_DictionaryEntryName)
  .search('', /*regex*/false, /*smart*/false, /*caseInsen*/false).draw();
  ubl_abie_table
  .search('', /*regex*/false, /*smart*/false, /*caseInsen*/false).draw();
  ubl_entity_table.columns(ubl_entity_COL_ObjectClass)
  .search('', /*regex*/false, /*smart*/false, /*caseInsen*/false).draw();
  ubl_entity2_table.columns(ubl_entity_COL_ObjectClass)
  .search('', /*regex*/false, /*smart*/false, /*caseInsen*/false).draw();
  ubl_udt_table.columns(ubl_entity_COL_DictionaryEntryName)
  .search('', /*regex*/false, /*smart*/false, /*caseInsen*/false).draw();
  ubl_acc_table//.columns(acc_COL_ObjectClassTerm)
  .search('', /*regex*/false, /*smart*/false, /*caseInsen*/false).draw();
  ubl_cc_table.columns(cc_COL_ObjectClassTerm)
  .search('', /*regex*/false, /*smart*/false, /*caseInsen*/false).draw();
  ubl_cc2_table.columns(cc_COL_ObjectClassTerm)
  .search('', /*regex*/false, /*smart*/false, /*caseInsen*/false).draw();
  ubl_un_udt_table.columns(dt_COL_DataType)
  .search('', /*regex*/false, /*smart*/false, /*caseInsen*/false).draw();
  ubl_cc_table.columns(cc_COL_ObjectClassTerm)
  .search('', /*regex*/false, /*smart*/false, /*caseInsen*/false).draw();
}

/* Formatting function for row details */
function adc_entity_format(d) { // `d` is the original data object for the row
  if (!d) { return null; }
  const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }
  var name = `${d.Name ? `${d.Name}` : d.Table ? `${d.Table}` : ''}`;
  var nameC3 = name.split('_');
  if ('ABIE' === d.Kind) {
    nameC3.shift();
  }
  nameC3 = nameC3.map(n => capitalize(n)).join('');
  return `<table cellpadding="4" cellspacing="0" border="0" style="width:100%; padding-left:16px;">
    <colgroup>
      <col span="1" style="width: 30%;">
      <col span="1" style="width: 70%;">
    </colgroup>
    <tr><td>CSV</td><td>Name: ${name}</td></tr>
    </tr>
    ${d.PK_REF ? `<tr><td></td><td>${d.PK_REF} ${d.RefField ? `${d.RefField} ( ${d.RefTable} )` : ''}</td></tr>` : ''}
    ${d.Representation
      ? `<tr><td></td><td>Datatype: ${d.Datatype} Representation: ${d.Representation}${d.Occurence ? ` Occurence: ${d.Occurence}` : ''}</td></tr>`
      : ''
    }
    <tr><td>XML</td><td>Name: ${nameC3}</td></tr>
    <tr><td>JSON</td><td>Name: ${nameC3}</td></tr>
    <tr><td>XBRL GL</td><td>Name: TBD</td></tr>
    <tr><td>${d.DictionaryEntryName ? `Dictionary entry name:</td><td>${d.DictionaryEntryName}` : '</td><td>'}</td></tr>
    ${d.ObjectClassTerm
      ? `<tr><td>&nbsp;&nbsp;Object class:</td><td>
        ${d.ObjectClassTermQualifier ? `${d.ObjectClassTermQualifier}_ ` : ''}
        ${d.ObjectClassTerm}</td></tr>`
      : ''}
    ${d.PropertyTerm
      ? `<tr><td>&nbsp;&nbsp;Property term:</td><td>
        ${d.PropertyTermQualifier ? `${d.PropertyTermQualifier}_ ` : ''}
        ${d.PropertyTerm}</td></tr>`
      : ''}
    ${d.RepresentationTerm
      ? `<tr><td>&nbsp;&nbsp;Representation term:</td><td>${d.RepresentationTerm}</td></tr>`
      : ''}
    ${d.UsageRule
      ? `<tr><td>Usage rule:</td><td>${d.UsageRule}</td></tr>`
      : ''}
    ${d.AssociatedObjectClass
      ? `<tr><td>Associated object class:</td><td>
        ${d.AssociatedObjectClassQualifier ? `${d.PropertyTermQualifierQualifier}_ ` : ''}
        ${d.AssociatedObjectClass}</td></tr>`
      : ''}
  </table>`;
}

function adc_dt_format(d) { // `d` is the original data object for the row
  if (!d) { return null; }
  return `<table cellpadding="4" cellspacing="0" border="0" style="width:100%; padding-left:16px;">
    <colgroup>
      <col span="1" style="width: 40%;">
      <col span="1" style="width: 60%;">
    </colgroup>
    ${d.ObjectClassTerm
      ? `<tr><td>&nbsp;&nbsp;Object class term:</td><td>
        ${d.ObjectClassTermQualifier ? `${d.ObjectClassTermQualifier}_ ` : ''}
        ${d.ObjectClassTerm}</td></tr>` : ''}
    ${d.PropertyTerm
      ? `<tr><td>&nbsp;&nbsp;Property term:</td><td>${d.PropertyTerm}</td></tr>` : ''}
    ${d.RepresentationTerm
      ? `<tr><td>&nbsp;&nbsp;Representation term:</td><td>
        ${d.DatatypeQualifier ? `${d.DatatypeQualifier}_ ` : ''}
        ${d.RepresentationTerm}</td></tr>` : ''}
    ${d.Enumeration
      ? `<tr><td>Enumeration:</td><td>${d.Enumeration}</td></tr>` : ''}
    ${d.RestrictionValue
      ? `<tr><td>Restriction value:</td><td>${d.RestrictionValue}</td></tr>` : ''}
  </table>`;
}

function acc_format(d) { // `d` is the original data object for the row
  if (!d) { return null; }
  return `<table cellpadding="4" cellspacing="0" border="0" style="width:100%; padding-left:16px;">
    <colgroup>
      <col span="1" style="width: 25%;">
      <col span="1" style="width: 75%;">
    </colgroup>
    <tr><td>${d.UniqueID}</td><td>${d.DictionaryEntryName}</td></tr>
  </table>`;
}

function cc_format(d) { // `d` is the original data object for the row
  if (!d) { return null; }
  return `<table cellpadding="4" cellspacing="0" border="0" style="width:100%; padding-left:16px;">
    <colgroup>
      <col span="1" style="width: 25%;">
      <col span="1" style="width: 75%;">
    </colgroup>
    <tr>
      <td>${d.UniqueID}</td>
      <td>
        ${'BCC' === d.Kind
          ? `${d.ObjectClassTerm}. ${d.PropertyTerm}. ${d.RepresentationTerm}`
          : `${d.ObjectClassTerm}. ${d.PropertyTerm}. ${d.AssociatedObjectClass}`}</td>
    </tr>
  </table>`;
}

function dt_format(d) { // `d` is the original data object for the row
  if (!d) { return null; }
  return `<table cellpadding="4" cellspacing="0" border="0" style="width:100%; padding-left:16px;">
    <tr><td>${d.Definition}</td></tr>
  </table>`;
}

function bie_format(d) { // `d` is the original data object for the row
  if (!d) { return null; }
  return `<table cellpadding="4" cellspacing="0" border="0" style="width:100%; padding-left:16px;">
    <colgroup>
      <col span="1" style="width: 25%;">
      <col span="1" style="width: 75%;">
    </colgroup>
    <tr><td>${d.UniqueID}</td><td>${d.DictionaryEntryName}</td></tr>
    ${d.Publicationcomments
      ? `<tr><td>Publication comments:</td><td>${d.Publicationcomments}</td></tr>` : ''}
    ${d.BusinessProcess
      ? `<tr><td>Business process:</td><td>${d.BusinessProcess}</td></tr>` : ''}
    ${d.Product
      ? `<tr><td>Product:</td><td>${d.Product}</td></tr>` : ''}
    ${d.Industry
      ? `<tr><td>Industry:</td><td>${d.Industry}</td></tr>` : ''}
    ${d.RegionGeopolitical
      ? `<tr><td>Region geopolitical:</td><td>${d.RegionGeopolitical}</td></tr>` : ''}
    ${d.OfficialConstraints
      ? `<tr><td>Official constraints:</td><td>${d.OfficialConstraints}</td></tr>` : ''}
    ${d.Role
      ? `<tr><td>Role:</td><td>${d.Role}</td></tr>` : ''}
    ${d.SupportingRole
      ? `<tr><td>Supporting role:</td><td>${d.SupportingRole}</td></tr>` : ''}
    ${d.SystemConstraints
      ? `<tr><td>System constraints:</td><td>${d.SystemConstraints}</td></tr>` : ''}
    ${d.Example
      ? `<tr><td>Example:</td><td>${d.Example}</td></tr>` : ''}
  </table>`;
}

function bie_compt_format(d) {
  // `d` is the original data object for the row
  if (!d) { return null; }
  return `<table cellpadding="4" cellspacing="0" border="0" style="width:100%; padding-left:16px;">
    <colgroup>
      <col span="1" style="width: 25%;">
      <col span="1" style="width: 75%;">
    </colgroup>
    <tr><td>${d.UniqueID}</td><td>${d.DictionaryEntryName}</td></tr>
    ${d.Publicationcomments
      ? `<tr><td>Publication comments:</td><td>${d.Publicationcomments}</td></tr>` : ''}
    ${d.AssociatedObjectClass
      ? `<tr><td>Associated object class:</td><td>
        ${d.AssociatedObjectClassTermQualifier ? `${d.AssociatedObjectClassTermQualifier}_ ` : ''}
        ${d.AssociatedObjectClass}</td></tr>` : ''}
    ${d.QualifiedDataTypeUID
      ? `<tr><td>Qualified datatype UID:</td><td>${d.QualifiedDataTypeUID}</td></tr>` : ''}
    ${d.BusinessTerm
      ? `<tr><td>Business term:</td><td>${d.BusinessTerm}</td></tr>` : ''}
    ${d.UsageRule
      ? `<tr><td>Usage rule:</td><td>${d.UsageRule}</td></tr>` : ''}
    ${d.BusinessProcess
      ? `<tr><td>Business process:</td><td>${d.BusinessProcess}</td></tr>` : ''}
    ${d.Product
      ? `<tr><td>Product:</td><td>${d.Product}</td></tr>` : ''}
    ${d.Industry
      ? `<tr><td>Industry:</td><td>${d.Industry}</td></tr>` : ''}
    ${d.RegionGeopolitical
      ? `<tr><td>Region geopolitical:</td><td>${d.RegionGeopolitical}</td></tr>` : ''}
    ${d.OfficialConstraints
      ? `<tr><td>Official constraints:</td><td>${d.OfficialConstraints}</td></tr>` : ''}
    ${d.Role
      ? `<tr><td>Role:</td><td>${d.Role}</td></tr>` : ''}
    ${d.SupportingRole
      ? `<tr><td>Supporting role:</td><td>${d.SupportingRole}</td></tr>` : ''}
    ${d.SystemConstraints
      ? `<tr><td>System constraints:</td><td>${d.SystemConstraints}</td></tr>` : ''}
    ${d.Example
      ? `<tr><td>Example:</td><td>${d.Example}</td></tr>` : ''}
  </table>`;
}

function qdt_format(d) { // `d` is the original data object for the row
  if (!d) { return null; }
  return `<table cellpadding="4" cellspacing="0" border="0" style="width:100%; padding-left:16px;">
    <colgroup>
      <col span="1" style="width: 40%;">
      <col span="1" style="width: 60%;">
    </colgroup>
    ${d.ObjectClassTerm
      ? `<tr><td>&nbsp;&nbsp;Object class term:</td><td>
        ${d.ObjectClassTermQualifier ? `${d.ObjectClassTermQualifier}_ ` : ''}
        ${d.ObjectClassTerm}</td></tr>` : ''}
    ${d.PropertyTerm
      ? `<tr><td>&nbsp;&nbsp;Property term:</td><td>${d.PropertyTerm}</td></tr>` : ''}
    ${d.RepresentationTerm
      ? `<tr><td>&nbsp;&nbsp;Representation term:</td><td>
        ${d.DatatypeQualifier ? `${d.DatatypeQualifier}_ ` : ''}
        ${d.RepresentationTerm}</td></tr>` : ''}
    ${d.Enumeration
      ? `<tr><td>Enumeration:</td><td>${d.Enumeration}</td></tr>` : ''}
    ${d.RestrictionValue
      ? `<tr><td>Restriction value:</td><td>${d.RestrictionValue}</td></tr>` : ''}
  </table>`;
}

function ubl_entity_format(d) { // `d` is the original data object for the row
  if (!d) { return null; }
  return `<table cellpadding="4" cellspacing="0" border="0" style="width:100%; padding-left:16px;">
    <colgroup>
      <col span="1" style="width: 40%;">
      <col span="1" style="width: 60%;">
    </colgroup>
    <tr><td>${d.DictionaryEntryName ? `Dictionary entry name:</td><td>${d.DictionaryEntryName}` : '</td><td>'}</td></tr>
    ${d.PrimitiveType
      ? `<tr><td>PrimitiveType:${d.PrimitiveType}</td><td>${d.base ? ` base:${d.base}` : ''}</td></tr>` : ''}
    ${d.ObjectClass
      ? `<tr><td>&nbsp;&nbsp;Object class:</td><td>
        ${d.ObjectClassQualifier ? `${d.ObjectClassQualifier}_ ` : ''}
        ${d.ObjectClass}</td></tr>` : ''}
    ${d.PropertyTerm
      ? `<tr><td>&nbsp;&nbsp;Property term:</td><td>
        ${d.PropertyTermQualifier ? `${d.PropertyTermQualifier}_ ` : ''}
        ${d.PropertyTerm}</td></tr>` : ''}
    ${d.RepresentationTerm
      ? `<tr><td>&nbsp;&nbsp;Representation term:</td><td>${d.RepresentationTerm}</td></tr>` : ''}
    ${d.UsageRule
      ? `<tr><td>Usage rule:</td><td>${d.UsageRule}</td></tr>` : ''}
    ${d.AssociatedObjectClass
      ? `<tr><td>Associated object class:</td><td>
        ${d.AssociatedObjectClassQualifier ? `${d.PropertyTermQualifierQualifier}_ ` : ''}
        ${d.AssociatedObjectClass}</td></tr>` : ''}
  </table>`;
}

function ubl_dt_format(d) { // `d` is the original data object for the row
  if (!d) { return null; }
  var uniqueID = d.UniqueID;
  var num = uniqueID.match(/^(UBLUDT|UNDT)([0-9]*)/);
  var found;
  if (num) {
    var regx = `UNDT${num[2]}`;
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
  for (let i = 0; i < found.length; i++) {
    let _d = found[i];
    foundArray = appendByID(foundArray, _d);
  }
  foundArray.sort(function(a,b) {
    return a.UniqueID < b.UniqueID;
  })
  for (let _d of foundArray) {
    related += `
      <tr><td>${_d.UniqueID}</td><td>${_d.CategoryCode} ${_d.DictionaryEntryName}</td></tr>
      <tr><td>&nbsp;&nbsp;&nbsp;name:</td><td>${_d.name}</td></tr>
      <tr><td>&nbsp;&nbsp;&nbsp;Definition:</td><td>${_d.Definition}</td></tr>
      ${_d.UsageRule
        ? `<tr><td>&nbsp;&nbsp;&nbsp;Usage rule:</td><td>${_d.UsageRule}</td></tr>` : ''}
      ${_d.ObjectClass
        ? `<tr><td>&nbsp;&nbsp;&nbsp;Object class:</td><td>${_d.ObjectClass}</td></tr>` : ''}
      ${_d.PropertyTermName
        ? `<tr><td>&nbsp;&nbsp;&nbsp;Property term:</td><td>${_d.PropertyTermName}</td></tr>` : ''}
      ${_d.RepresentationTermName
        ? `<tr><td>&nbsp;&nbsp;&nbsp;Representation term:</td><td>${_d.RepresentationTermName}</td></tr>` : ''}
      <tr><td></td>
        <td>${_d.type ? `${_d.type}` : ''} ${_d.PrimitiveType ? `Primitive type:${_d.PrimitiveType}` : ''} ${_d.use ? `use:${_d.use}` : ''}</td></tr>
    `;
  }

  return `<table cellpadding="4" cellspacing="0" border="0" style="width:100%; padding-left:16px;">
    <colgroup>
      <col span="1" style="width: 30%;">
      <col span="1" style="width: 70%;">
    </colgroup>
    <tr><td>${d.UniqueID}</td><td>${d.DictionaryEntryName}</td></tr>
    <td></td><td>Primitive type:${d.PrimitiveType}${d.base ? ` base:${d.base}` : ''}</td></tr>
    ${d.ObjectClass
      ? `<tr><td>&nbsp;&nbsp;Object class:</td><td>${d.ObjectClass}</td></tr>` : ''}
    ${d.PropertyTermName
      ? `<tr><td>&nbsp;&nbsp;Property term:</td><td>${d.PropertyTermName}</td></tr>` : ''}
    ${d.RepresentationTermName
      ? `<tr><td>&nbsp;&nbsp;Representation term:</td><td>${d.RepresentationTermName}</td></tr>` : ''}
    ${d.UsageRule
      ? `<tr><td>Usage rule:</td><td>${d.UsageRule}</td></tr>` : ''}
    ${found.length > 0
      ? `${related}` : ''}
  </table>`;
}

var initModule = function () {
  //
  // columns
  //
  // ADC
  adc_abie_COL_ComponentName = 1;
  adc_abie_COL_DictionaryEntryName = 5;
  var adc_abie_columns = [
    { 'width': '4%',
      'className': 'details-control',
      'orderable': false,
      'data': null,
      'defaultContent': '' }, // 0
    { 'width': '4%',
      'data': 'Kind' }, // 1
    { 'width': '8%',
      'data': 'module',
      'render': function (data, type, row) {
        var module = row.Table, match, map;
        if (!module) { return ''; }
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
    }, // 2
    { 'width': '20%',
      'data': 'ObjectClassTerm' }, // 3
    { 'data': 'description',
      'render': function (data, type, row) {
        var description = row.Description;
        var match;
        match = description.match(/^(.*)( (is|are) contained in Table [0-9]*)(.*)$/);
        if (match) {
          description = `${match[1]}${match[4]}`;
        }
        description = description.replace(/ \(Table [0-9]*\)/g, '');
        description = description.replace(/ \(4.4.2 and 4.4.3\)/g, '');
        description = description.replace(/ \(see 4.4.2 and 4.4.3\)/g, '');
        return description;
      }
    }, // 4
    { 'data': 'DictionaryEntryName' } // 5
  ];
  var adc_abie_columnDefs = [
    { 'searchable': false, 'targets': 0 },
    { 'visible': false, 'targets': 5 } 
  ];
  adc_entity_COL_DictionaryEntryName = 6;
  adc_entity_COL_ObjectClass = 7;
  var adc_entity_columns = [
    { 'width': '4%',
      'className': 'details-control',
      'orderable': false,
      'data': null,
      'defaultContent': '' }, // 0
    { 'width': '10%',
      'data': 'Kind' }, // 1
    { 'width': '35%',
      'data': 'name',
      'render': function (data, type, row) {
        var dictionaryEntryName = row.DictionaryEntryName,
            match, match2;
        if (!dictionaryEntryName) { return ''; }
        match = dictionaryEntryName.match(/^([^\.]+.) ([^_]+_ )?([^\.]+.) (.*)$/);
        if (match) {
          if ('ID' === match[4]) {
            match2 = dictionaryEntryName.match(/([^_]+_ )?(.*)$/);
            return match2[2];
          }
          if (match[3].indexOf(match[4]) > 1) {
            return match[3].slice(0, -1); // remove last period
          }
          return `${match[3]} ${match[4]}`;
        }
        return dictionaryEntryName;
      }
    }, // 2
    { 'width': '47%',
      'data': 'description',
      'render': function (data, type, row) {
        var description = row.Description;
        var match;
        match = description.match(/^(.*)(Shall match .* table.)(.*)$/);
        if (match) {
          description = `${match[1]}${match[3]}`;
        }
        match = description.match(/^(.*)(Otherwise set NULL.)(.*)$/);
        if (match) {
          description = `${match[1]}${match[3]}`;
        }
        match = description.match(/^(.*)(Typically auto-generated by the system.)(.*)$/);
        if (match) {
          description = `${match[1]}${match[3]}`;
        }
        match = description.match(/^(.*)EXAMPLE(.*)$/);
        if (match) {
          description = `${match[1]}<br>EXAMPLE<br>${match[2]}`;
        }
        return description;
      }
    }, // 3
    { 'width': '4%',
      'data': 'Level' }, // 4
    { 'data': 'Datatype' }, // 5
    { 'data': 'DictionaryEntryName' }, // 6
    { 'data': 'ObjectClassTerm' } // 7
  ];
  var adc_entity_columnDefs = [
    { 'searchable': false, 'targets': 0 },
    { 'visible': false, 'targets': [5, 6, 7] } 
  ];
  adc_dt_COL_CategoryCode = 1;
  adc_dt_COL_DictionaryEntryName = 2;
  adc_dt_COL_ObjectClass = 4;
  var adc_dt_columns = [
    { 'width': '4%',
      'className': 'details-control',
      'orderable': false,
      'data': null,
      'defaultContent': '' }, // 0
    { 'width': '3%',
      'data': 'Kind' }, // 1
    { 'width': '30%',
      'data': 'DictionaryEntryName' }, // 2
    { 'width': '48%',
      'data': 'Definition' }, // 3
    { 'width': '15%',
      'data': 'ObjectClass' }, // 4
    { 'data': 'PropertyTerm' }, // 5
    { 'data': 'RepresentationTerm' } // 6
  ];
  var adc_dt_columnDefs = [
    { 'searchable': false, 'targets': 0 },
    { 'visible': false, 'targets': [4, 5, 6] } 
  ];
  // UBL
  ubl_abie_COL_ComponentName = 2;
  ubl_abie_COL_DictionaryEntryName = 4;
  var ubl_abie_columns = [
    { 'width': '4%',
      'className': 'details-control',
      'orderable': false,
      'data': null,
      'defaultContent': '' }, // 0
    { 'width': '4%',
      'data': 'ComponentType' }, // 1
    { 'width': '20%',
      'data': 'ComponentName' }, // 2
    { 'data': 'Definition' }, // 3
    { 'data': 'DictionaryEntryName' } // 4
  ];
  var ubl_abie_columnDefs = [
    { 'searchable': false, 'targets': 0 },
    { 'visible': false, 'targets': 4 } 
  ];
  ubl_entity_COL_DictionaryEntryName = 6;
  ubl_entity_COL_ObjectClass = 7;
  var ubl_entity_columns = [
    { 'width': '4%',
      'className': 'details-control',
      'orderable': false,
      'data': null,
      'defaultContent': '' }, // 0
    { 'width': '10%',
      'data': 'ComponentType' }, // 1
    { 'width': '20%',
      'data': 'ComponentName' }, // 2
    { 'width': '10%',
      'data': 'DataType' }, // 3
    { 'width': '50%',
      'data': 'Definition' }, // 4
    { 'width': '5%',
      'data': 'Cardinality' }, // 5
    { 'data': 'DictionaryEntryName' }, // 6
    { 'data': 'ObjectClass' } // 7
  ];
  var ubl_entity_columnDefs = [
    { 'searchable': false, 'targets': 0 },
    { 'visible': false, 'targets': [6, 7] } 
  ];
  ubl_dt_COL_CategoryCode = 1;
  ubl_dt_COL_DictionaryEntryName = 5;
  var ubl_dt_columns = [
    { 'width': '4%',
      'className': 'details-control',
      'orderable': false,
      'data': null,
      'defaultContent': '' }, // 0
    { 'width': '3%',
      'data': 'CategoryCode' }, // 1
    { 'width': '10%',
      'data': 'name' }, // 2
    { 'data': 'RepresentationTermName' }, // 3
    { 'data': 'Definition' }, // 4
    { 'width': '15%',
      'data': 'DictionaryEntryName' } // 5
  ];
  var ubl_dt_columnDefs = [
    { 'searchable': false, 'targets': 0 },
    { 'visible': false, 'targets': 5 } 
  ];
  // UN/CEFACT
  acc_COL_ObjectClassTerm = 2;
  var acc_columns = [
    { 'width': '4%',
      'className': 'details-control',
      'orderable': false,
      'data': null,
      'defaultContent': '' }, // 0
    { 'width': '7%',
      'data': 'Kind' }, // 1
    { 'width': '20%',
      'data': 'ObjectClassTerm' }, // 2
    { 'data': 'Definition' }, // 3
    { 'data': 'UniqueID' }, // 4
    { 'data': 'DictionaryEntryName' } // 5
  ];
  var acc_columnDefs = [
    { 'searchable': false, 'targets': 0 },
    { 'visible': false, 'targets': [4, 5] }
  ];
  cc_COL_ShortName = 2;
  cc_COL_ObjectClassTerm = 6;
  var cc_columns = [
    { 'width': '4%',
      'className': 'details-control',
      'orderable': false,
      'data': null,
      'defaultContent': '' }, // 0
    { 'width': '7%',
      'data': 'Kind' }, // 1
    { 'width': '20%',
      'data': 'ShortName' }, // 2
    { 'data': 'Definition' }, // 3
    { 'data': 'Occurrence' }, // 4
    { 'data': 'UniqueID' }, // 5
    { 'data': 'ObjectClassTerm' } // 6
  ];
  var cc_columnDefs = [
    { 'searchable': false, 'targets': [0, 4] },
    { 'visible': false, 'targets': [5, 6] }
  ];
  mbie_COL_ObjectClassTerm = 5;
  var mbie_columns = [
    { 'width': '4%',
      'className': 'details-control',
      'orderable': false,
      'data': null,
      'defaultContent': '' }, // 0
    { 'width': '7%',
      'data': 'Kind' }, // 1
    { 'width': '20%',
      'data': 'ShortName' }, // 2
    { 'data': 'Definition' }, // 3          
    { 'data': 'UniqueID' }, // 4
    { 'data': 'ObjectClassTerm' } // 5
  ];
  var mbie_columnDefs = [
    { 'searchable': false, 'targets': 0 },
    { 'visible': false, 'targets': [4, 5] },
  ];
  mbie_compt_COL_ShortName = 3;
  mbie_compt_COL_DictionaryEntryName = 7;
  var mbie_compt_columns = [
    { 'width': '4%',
      'className': 'details-control',
      'orderable': false,
      'data': null,
      'defaultContent': '' }, // 0
    { 'width': '7%',
      'data': 'Kind' }, // 1
    { 'width': '3%',
      'data': 'SequenceNumber' }, // 2
    { 'width': '20%',
      'data': 'ShortName' }, // 3
    { 'data': 'Definition' }, // 4
    { 'data': 'Occurrence' }, // 5
    { 'data': 'UniqueID' }, // 6
    { 'data': 'DictionaryEntryName' } // 7
  ];
  var mbie_compt_columnDefs = [
    { 'searchable': false, 'targets': [0, 2, 5] },
    { 'visible': false, 'targets': [6, 7] }
  ];
  dt_COL_DictionaryEntryName = 2;
  dt_COL_DataType = 4;
  var dt_columns = [
    { 'width': '7%',
      'data': 'Kind' }, // 0
    { 'width': '3%',
      'data': 'SequenceNumber' }, // 1
    { 'width': '20%',
      'data': 'DictionaryEntryName' }, // 2
    { 'data': 'Definition' }, // 3
    { 'data': 'DataType' }, // 4
  ];
  var dt_columnDefs = [
    { 'searchable': false, 'targets': 1 },
    { 'visible': false , 'targets': 4}
  ];
  qdt_COL_UNID = 5;
  var qdt_columns = [
    { 'width': '4%',
      'className': 'details-control',
      'orderable': false,
      'data': null,
      'defaultContent': '' }, // 0
    { 'width': '7%',
      'data': 'Kind' }, // 1
    { 'width': '20%',
      'data': 'DictionaryEntryName' }, // 2
    { 'data': 'Definition' }, // 3
    { 'data': 'ObjectClassTermQualifier' }, // 4
    { 'data': 'UNID' } // 5
  ];
  var qdt_columnDefs = [
    { 'searchable': false, 'targets': 0 },
    { 'visible': false, 'targets': 5 } 
  ];
  // UBL
  ubl_abie_COL_ComponentName = 2;
  ubl_abie_COL_DictionaryEntryName = 4;
  var ubl_abie_columns = [
    { 'width': '4%',
      'className': 'details-control',
      'orderable': false,
      'data': null,
      'defaultContent': '' }, // 0
    { 'width': '4%',
      'data': 'ComponentType' }, // 1
    { 'width': '20%',
      'data': 'ComponentName' }, // 2
    { 'data': 'Definition' }, // 3
    { 'data': 'DictionaryEntryName' } // 4
  ];
  var ubl_abie_columnDefs = [
    { 'searchable': false, 'targets': 0 },
    { 'visible': false, 'targets': 4 } 
  ];
  ubl_entity_COL_DictionaryEntryName = 6;
  ubl_entity_COL_ObjectClass = 7;
  var ubl_entity_columns = [
    { 'width': '4%',
      'className': 'details-control',
      'orderable': false,
      'data': null,
      'defaultContent': '' }, // 0
    { 'width': '10%',
      'data': 'ComponentType' }, // 1
    { 'width': '20%',
      'data': 'ComponentName' }, // 2
    { 'width': '10%',
      'data': 'DataType' }, // 3
    { 'width': '50%',
      'data': 'Definition' }, // 4
    { 'width': '5%',
      'data': 'Cardinality' }, // 5
    { 'data': 'DictionaryEntryName' }, // 6
    { 'data': 'ObjectClass' } // 7
  ];
  var ubl_entity_columnDefs = [
    { 'searchable': false, 'targets': 0 },
    { 'visible': false, 'targets': [6, 7] } 
  ];
  ubl_dt_COL_CategoryCode = 1;
  ubl_dt_COL_DictionaryEntryName = 5;
  var ubl_dt_columns = [
    { 'width': '4%',
      'className': 'details-control',
      'orderable': false,
      'data': null,
      'defaultContent': '' }, // 0
    { 'width': '3%',
      'data': 'CategoryCode' }, // 1
    { 'width': '10%',
      'data': 'name' }, // 2
    { 'data': 'RepresentationTermName' }, // 3
    { 'data': 'Definition' }, // 4
    { 'width': '15%',
      'data': 'DictionaryEntryName' } // 5
  ];
  var ubl_dt_columnDefs = [
    { 'searchable': false, 'targets': 0 },
    { 'visible': false, 'targets': 5 } 
  ];
  //
  // ADC
  //
  var adc_loaded = [];
  //
  adc_abie_table = $('#adc-abie').DataTable({
    'ajax': 'data/list-ADC.cgi?kind=ABIE',
    'columns': adc_abie_columns,
    'columnDefs': adc_abie_columnDefs,
    'autoWidth': false,
    'ordering': false,
    'select': true,
    'initComplete': function(settings, json) {
      adc_loaded.push('adc_abie_table');
      if (2 === adc_loaded.length) {
        $('#adc .overlay').addClass('d-none');
      }
    }
  });
  adc_entity_table = $('#adc-entity').DataTable({
    'ajax': 'data/list-ADC.cgi',
    'columns': adc_entity_columns,
    'columnDefs': adc_entity_columnDefs,
    'autoWidth': false,
    'ordering': false,
    'select': true
  });
  adc_entity2_table = $('#adc-entity2').DataTable({
    'ajax': 'data/list-ADC.cgi',
    'columns': adc_entity_columns,
    'columnDefs': adc_entity_columnDefs,
    'autoWidth': false,
    'ordering': false,
    'select': true
  });
  adc_udt_table = $('#adc-udt').DataTable({
    'ajax': 'data/list-ADC-udt.cgi',
    'columns': adc_dt_columns,
    'columnDefs': adc_dt_columnDefs,
    'autoWidth': false,
    'ordering': false,
    'select': true
  });
  //
  adc_ubl_abie_table = $('#adc-ubl-abie').DataTable({
    'ajax': 'data/list-ubl-abie.cgi',
    'columns': ubl_abie_columns,
    'columnDefs': ubl_abie_columnDefs,
    'autoWidth': false,
    'ordering': false,
    'select': true,
    'initComplete': function(settings, json) {
      adc_loaded.push('adc_ubl_abie_table');
      if (2 === adc_loaded.length) {
        $('#adc .overlay').addClass('d-none');
      }
    }
  });
  adc_ubl_entity_table = $('#adc-ubl-entity').DataTable({
    'ajax': 'data/list-ubl-entity.cgi',
    'columns': ubl_entity_columns,
    'columnDefs': ubl_entity_columnDefs,
    'autoWidth': false,
    'ordering': false,
    'select': true
  });
  adc_ubl_entity2_table = $('#adc-ubl-entity2').DataTable({
    'ajax': 'data/list-ubl-entity.cgi',
    'columns': ubl_entity_columns,
    'columnDefs': ubl_entity_columnDefs,
    'autoWidth': false,
    'ordering': false,
    'select': true
  });
  adc_ubl_udt_table = $('#adc-ubl-udt').DataTable({
    'ajax': 'data/list-ubl-udt.cgi',
    'columns': ubl_dt_columns,
    'columnDefs': ubl_dt_columnDefs,
    'autoWidth': false,
    'ordering': false,
    'select': true
  });
  //
  // UN/CEFACT
  //
  var uncefact_loaded = [];
  mbie_table = $('#uncefact-mbie').DataTable({
    'ajax': 'data/list-mbie.cgi',
    'columns': mbie_columns,
    'columnDefs': mbie_columnDefs,
    'autoWidth': false,
    'ordering': false,
    'select': true,
    'initComplete': function(settings, json) {
      uncefact_loaded.push('mbie_table');
      if (2 === uncefact_loaded.length) {
        $('#uncefact .overlay').addClass('d-none');
      }
    }
  });
  mbie_compt_table = $('#uncefact-mbie_compt').DataTable({
    'ajax': 'data/list-mbie_compt.cgi',
    'columns': mbie_compt_columns,
    'columnDefs': mbie_compt_columnDefs,
    'autoWidth': false,
    'ordering': false,
    'select': true
  });
  mbie_compt2_table = $('#uncefact-mbie_compt2').DataTable({
    'ajax': 'data/list-mbie_compt.cgi',
    'columns': mbie_compt_columns,
    'columnDefs': mbie_compt_columnDefs,
    'autoWidth': false,
    'ordering': false,
    'select': true
  });
  qdt_table = $('#uncefact-qdt').DataTable({
    'ajax': 'data/list-mqdt.cgi',
    'columns': qdt_columns,
    'columnDefs': qdt_columnDefs,
    'autoWidth': false,
    'ordering': false,
    'select': true
  });
  //
  acc_table = $('#uncefact-acc').DataTable({
    'ajax': 'data/list-acc.cgi',
    'columns': acc_columns,
    'columnDefs': acc_columnDefs,
    'autoWidth': false,
    'ordering': false,
    'select': true,
    'initComplete': function(settings, json) {
      uncefact_loaded.push('acc_table');
      if (2 === uncefact_loaded.length) {
        $('#uncefact .overlay').addClass('d-none');
      }
    }
  });
  cc_table = $('#uncefact-cc').DataTable({
    'ajax': 'data/list-cc.cgi',
    'columns': cc_columns,
    'columnDefs': cc_columnDefs,
    'autoWidth': false,
    'ordering': false,
    'select': true
  });
  cc2_table = $('#uncefact-cc2').DataTable({
    'ajax': 'data/list-cc.cgi',
    'columns': cc_columns,
    'columnDefs': cc_columnDefs,
    'autoWidth': false,
    'ordering': false,
    'select': true
  });
  udt_table = $('#uncefact-udt').DataTable({
    'ajax': 'data/list-udt.cgi',
    'columns': dt_columns,
    'columnDefs': dt_columnDefs,
    'autoWidth': false,
    'ordering': false,
    'select': true
  });
  //
  // UBL
  //
  var ubl_loaded = [];
  ubl_abie_table = $('#ubl-abie').DataTable({
    'ajax': 'data/list-ubl-abie.cgi',
    'columns': ubl_abie_columns,
    'columnDefs': ubl_abie_columnDefs,
    'autoWidth': false,
    'ordering': false,
    'select': true,
    'initComplete': function(settings, json) {
      ubl_loaded.push('ubl_abie_table');
      if (2 === ubl_loaded.length) {
        $('#ubl .overlay').addClass('d-none');
      }
    }
  });
  ubl_entity_table = $('#ubl-entity').DataTable({
    'ajax': 'data/list-ubl-entity.cgi',
    'columns': ubl_entity_columns,
    'columnDefs': ubl_entity_columnDefs,
    'autoWidth': false,
    'ordering': false,
    'select': true
  });
  ubl_entity2_table = $('#ubl-entity2').DataTable({
    'ajax': 'data/list-ubl-entity.cgi',
    'columns': ubl_entity_columns,
    'columnDefs': ubl_entity_columnDefs,
    'autoWidth': false,
    'ordering': false,
    'select': true
  });
  ubl_udt_table = $('#ubl-udt').DataTable({
    'ajax': 'data/list-ubl-udt.cgi',
    'columns': ubl_dt_columns,
    'columnDefs': ubl_dt_columnDefs,
    'autoWidth': false,
    'ordering': false,
    'select': true
  });
  //
  ubl_acc_table = $('#ubl-acc').DataTable({
    'ajax': 'data/list-acc.cgi',
    'columns': acc_columns,
    'columnDefs': acc_columnDefs,
    'autoWidth': false,
    'ordering': false,
    'select': true,
    'initComplete': function(settings, json) {
      ubl_loaded.push('ubl_acc_table');
      if (2 === ubl_loaded.length) {
        $('#ubl .overlay').addClass('d-none');
      }
    }
  });
  ubl_cc_table = $('#ubl-cc').DataTable({
    'ajax': 'data/list-cc.cgi',
    'columns': cc_columns,
    'columnDefs': cc_columnDefs,
    'autoWidth': false,
    'ordering': false,
    'select': true
  });
  ubl_cc2_table = $('#ubl-cc2').DataTable({
    'ajax': 'data/list-cc.cgi',
    'columns': cc_columns,
    'columnDefs': cc_columnDefs,
    'autoWidth': false,
    'ordering': false,
    'select': true
  });
  ubl_un_udt_table = $('#ubl-un-udt').DataTable({
    'ajax': 'data/list-udt.cgi',
    'columns': dt_columns,
    'columnDefs': dt_columnDefs,
    'autoWidth': false,
    'ordering': false,
    'select': true
  });
  //
  // Add event listener for opening and closing details
  //
  // ADC
  //
  // adc_abie_table, adc_entity_table, adc_entity2_table, adc_udt_table,
  $('#adc-abie tbody').on('click', 'td.details-control',  function () {
    var tr = $(this).closest('tr'), row = adc_abie_table.row(tr);
    if (row.child.isShown()) { // This row is already open - close it
      row.child.hide(); tr.removeClass('shown');
    }
    else { // Open this row
      row.child(adc_entity_format(row.data())).show(); tr.addClass('shown');
    }
  });
  $('#adc-entity tbody').on('click', 'td.details-control',  function () {
    var tr = $(this).closest('tr'), row = adc_entity_table.row(tr);
    if (row.child.isShown()) { // This row is already open - close it
      row.child.hide(); tr.removeClass('shown');
    }
    else { // Open this row
      row.child(adc_entity_format(row.data())).show(); tr.addClass('shown');
    }
  });
  $('#adc-entity2 tbody').on('click', 'td.details-control',  function () {
    var tr = $(this).closest('tr'), row = adc_entity2_table.row(tr);
    if (row.child.isShown()) { // This row is already open - close it
      row.child.hide(); tr.removeClass('shown');
    }
    else { // Open this row
      row.child(adc_entity_format(row.data())).show(); tr.addClass('shown');
    }
  });
  $('#adc-udt tbody').on('click', 'td.details-control',  function () {
    var tr = $(this).closest('tr'), row = adc_udt_table.row(tr);
    if (row.child.isShown()) { // This row is already open - close it
      row.child.hide(); tr.removeClass('shown');
    }
    else { // Open this row
      row.child(adc_dt_format(row.data())).show(); tr.addClass('shown');
    }
  });
  $('#adc-ubl-abie tbody').on('click', 'td.details-control',  function () {
    var tr = $(this).closest('tr'), row = adc_ubl_abie_table.row(tr);
    if (row.child.isShown()) { // This row is already open - close it
      row.child.hide(); tr.removeClass('shown');
    }
    else { // Open this row
      row.child(ubl_entity_format(row.data())).show(); tr.addClass('shown');
    }
  });
  $('#adc-ubl-entity tbody').on('click', 'td.details-control',  function () {
    var tr = $(this).closest('tr'), row = adc_ubl_entity_table.row(tr);
    if (row.child.isShown()) { // This row is already open - close it
      row.child.hide(); tr.removeClass('shown');
    }
    else { // Open this row
      row.child(ubl_entity_format(row.data())).show(); tr.addClass('shown');
    }
  });
  $('#adc-ubl-entity2 tbody').on('click', 'td.details-control',  function () {
    var tr = $(this).closest('tr'), row = adc_ubl_entity2_table.row(tr);
    if (row.child.isShown()) { // This row is already open - close it
      row.child.hide(); tr.removeClass('shown');
    }
    else { // Open this row
      row.child(ubl_entity_format(row.data())).show(); tr.addClass('shown');
    }
  });
  $('#adc-ubl-udt tbody').on('click', 'td.details-control',  function () {
    var tr = $(this).closest('tr'), row = adc_ubl_udt_table.row(tr);
    if (row.child.isShown()) { // This row is already open - close it
      row.child.hide(); tr.removeClass('shown');
    }
    else { // Open this row
      row.child(ubl_dt_format(row.data())).show(); tr.addClass('shown');
    }
  });
  //
  // UN/CEFACT
  //
  $('#uncefact-mbie tbody').on('click', 'td.details-control',  function () {
    var tr = $(this).closest('tr'), row = mbie_table.row(tr);
    if (row.child.isShown()) { // This row is already open - close it
      row.child.hide(); tr.removeClass('shown');
    }
    else { // Open this row
      row.child(bie_format(row.data())).show(); tr.addClass('shown');
    }
  });
  $('#uncefact-mbie_compt tbody').on('click', 'td.details-control',  function () {
    var tr = $(this).closest('tr'), row = mbie_compt_table.row(tr);
    if (row.child.isShown()) { // This row is already open - close it
      row.child.hide(); tr.removeClass('shown');
    }
    else { // Open this row
      row.child(bie_compt_format(row.data())).show(); tr.addClass('shown');
    }
  });
  $('#uncefact-mbie_compt2 tbody').on('click', 'td.details-control',  function () {
    var tr = $(this).closest('tr'), row = mbie_compt2_table.row(tr);
    if (row.child.isShown()) { // This row is already open - close it
      row.child.hide(); tr.removeClass('shown');
    }
    else { // Open this row
      row.child(bie_compt_format(row.data())).show(); tr.addClass('shown');
    }
  });
  $('#uncefact-qdt tbody').on('click', 'td.details-control',  function () {
    var tr = $(this).closest('tr'), row = qdt_table.row(tr);
    if (row.child.isShown()) { // This row is already open - close it
      row.child.hide(); tr.removeClass('shown');
    }
    else { // Open this row
      row.child(qdt_format(row.data())).show(); tr.addClass('shown');
    }
  });
  $('#uncefact-acc tbody').on('click', 'td.details-control', function () {
    var tr = $(this).closest('tr'), row = acc_table.row(tr);
    if (row.child.isShown()) { // This row is already open - close it
      row.child.hide(); tr.removeClass('shown');
    }
    else { // Open this row
      row.child(acc_format(row.data())).show(); tr.addClass('shown');
    }
  });
  $('#uncefact-cc tbody').on('click', 'td.details-control',  function () {
    var tr = $(this).closest('tr'), row = cc_table.row(tr);
    if (row.child.isShown()) { // This row is already open - close it
      row.child.hide(); tr.removeClass('shown');
    }
    else { // Open this row
      row.child(cc_format(row.data())).show(); tr.addClass('shown');
    }
  });
  $('#uncefact-cc2 tbody').on('click', 'td.details-control',  function () {
    var tr = $(this).closest('tr'), row = cc2_table.row(tr);
    if (row.child.isShown()) { // This row is already open - close it
      row.child.hide(); tr.removeClass('shown');
    }
    else { // Open this row
      row.child(cc_format(row.data())).show(); tr.addClass('shown');
    }
  }); 
  $('#uncefact-udt tbody').on('click', 'td.details-control',  function () {
    var tr = $(this).closest('tr'), row = udt_table.row(tr);
    if (row.child.isShown()) { // This row is already open - close it
      row.child.hide(); tr.removeClass('shown');
    }
    else { // Open this row
      row.child(dt_format(row.data())).show(); tr.addClass('shown');
    }
  });
  //
  // UBL
  //
  $('#ubl-abie tbody').on('click', 'td.details-control',  function () {
    var tr = $(this).closest('tr'), row = ubl_abie_table.row(tr);
    if (row.child.isShown()) { // This row is already open - close it
      row.child.hide(); tr.removeClass('shown');
    }
    else { // Open this row
      row.child(ubl_entity_format(row.data())).show(); tr.addClass('shown');
    }
  });
  $('#ubl-entity tbody').on('click', 'td.details-control',  function () {
    var tr = $(this).closest('tr'), row = ubl_entity_table.row(tr);
    if (row.child.isShown()) { // This row is already open - close it
      row.child.hide(); tr.removeClass('shown');
    }
    else { // Open this row
      row.child(ubl_entity_format(row.data())).show(); tr.addClass('shown');
    }
  });
  $('#ubl-entity2 tbody').on('click', 'td.details-control',  function () {
    var tr = $(this).closest('tr'), row = ubl_entity2_table.row(tr);
    if (row.child.isShown()) { // This row is already open - close it
      row.child.hide(); tr.removeClass('shown');
    }
    else { // Open this row
      row.child(ubl_entity_format(row.data())).show(); tr.addClass('shown');
    }
  });
  $('#ubl-udt tbody').on('click', 'td.details-control',  function () {
    var tr = $(this).closest('tr'), row = ubl_udt_table.row(tr);
    if (row.child.isShown()) { // This row is already open - close it
      row.child.hide(); tr.removeClass('shown');
    }
    else { // Open this row
      row.child(ubl_dt_format(row.data())).show(); tr.addClass('shown');
    }
  });
  $('#ubl-acc tbody').on('click', 'td.details-control', function () {
    var tr = $(this).closest('tr'), row = ubl_acc_table.row(tr);
    if (row.child.isShown()) { // This row is already open - close it
      row.child.hide(); tr.removeClass('shown');
    }
    else { // Open this row
      row.child(acc_format(row.data())).show(); tr.addClass('shown');
    }
  });
  $('#ubl-cc tbody').on('click', 'td.details-control',  function () {
    var tr = $(this).closest('tr'), row = ubl_cc_table.row(tr);
    if (row.child.isShown()) { // This row is already open - close it
      row.child.hide(); tr.removeClass('shown');
    }
    else { // Open this row
      row.child(cc_format(row.data())).show(); tr.addClass('shown');
    }
  });
  $('#ubl-cc2 tbody').on('click', 'td.details-control',  function () {
    var tr = $(this).closest('tr'), row = ubl_cc2_table.row(tr);
    if (row.child.isShown()) { // This row is already open - close it
      row.child.hide(); tr.removeClass('shown');
    }
    else { // Open this row
      row.child(cc_format(row.data())).show(); tr.addClass('shown');
    }
  }); 
  //
  // click row to show related
  //
  // ADC
  //
  $('#adc-abie tbody').on('click', 'td:not(.details-control)', function () {
    var td = $(this);
    if (td.hasClass('details-control')) { return; }
    var tr = $(this).closest('tr');
    $('#adc-component-1').removeClass('init');
    $('#adc-abie tr.selected').removeClass('selected');
    tr.addClass('selected');
    $('.pretty-split-pane-component-inner.adc-entity').removeClass('d-none');
    var row = adc_abie_table.row(tr);
    var data = row.data();
    var searchText = data.ObjectClassTerm;
    var tableTitle = $('.adc-entity .table-title');
    var title = tableTitle.text();
    tableTitle.text(`${searchText} - ${title}`);
    adc_entity_table.columns(adc_entity_COL_ObjectClass)
    .search(`^${searchText}$`, /*regex*/true, /*smart*/false, /*caseInsen*/false)
    .draw();
  });
  $('#adc-entity tbody').on('click', 'td:not(.details-control)', function () {
    var td = $(this);
    if (td.hasClass('details-control')) { return; }
    var tr = $(this).closest('tr');
    $('#adc-component-1').removeClass('no-datatype');
    $('#adc-entity tr.selected').removeClass('selected');
    tr.addClass('selected');
    var row = adc_entity_table.row(tr);
    var data = row.data();
    var componentType = data.Kind;
    if ('ASBIE' === componentType) {
      $('.pretty-split-pane-component-inner.adc-entity2').removeClass('d-none');
      $('.pretty-split-pane-component-inner.adc-udt').addClass('d-none');
      var searchText = data.AssociatedObjectClass;
      var tableTitle = $('.adc-entity2 .table-title');
      var title = tableTitle.text();
      tableTitle.text(`${searchText} - ${title}`);
      adc_entity2_table.columns(adc_entity_COL_ObjectClass)
      .search(`^${searchText}$`, /*regex*/true, /*smart*/false, /*caseInsen*/false)
      .draw();
    }
    else if ('BBIE' === componentType) {
      $('.pretty-split-pane-component-inner.adc-entity2').addClass('d-none');
      $('.pretty-split-pane-component-inner.adc-udt').removeClass('d-none');
      var representationTerm = `${data.DatatypeQualifier ? `${data.DatatypeQualifier}_ ` : ''}${data.RepresentationTerm}`;
      var tableTitle = $('.adc-udt .table-title');
      var title = tableTitle.text();
      tableTitle.text(`${representationTerm} - ${title}`);
      adc_udt_table.columns(adc_dt_COL_ObjectClass)
      .search(`^${representationTerm}$`, /*regex*/true, /*smart*/false, /*caseInsen*/false)
      .draw();
    }
  });
  $('#adc-ubl-abie tbody').on('click', 'td:not(.details-control)', function () {
    var td = $(this);
    if (td.hasClass('details-control')) { return; }
    var tr = $(this).closest('tr');
    $('#adc-component-2').removeClass('init');
    $('#adc-ubl-abie tr.selected').removeClass('selected');
    tr.addClass('selected');
    $('.pretty-split-pane-component-inner.adc-ubl-entity').removeClass('d-none');
    // $('.pretty-split-pane-component-inner.mbie').removeClass('d-none');
    var row = adc_ubl_abie_table.row(tr);
    var data = row.data();
    var searchText = data.ObjectClass;
    var tableTitle = $('.adc-ubl-entity .table-title');
    var title = tableTitle.text();
    tableTitle.text(`${searchText} - ${title}`);
    adc_ubl_entity_table.columns(ubl_entity_COL_ObjectClass)
    .search(`^${searchText}$`, /*regex*/true, /*smart*/false, /*caseInsen*/false)
    .draw();
  });
  $('#adc-ubl-entity tbody').on('click', 'td:not(.details-control)', function () {
    var td = $(this);
    if (td.hasClass('details-control')) { return; }
    var tr = $(this).closest('tr');
    $('#adc-component-2').removeClass('no-datatype');
    $('#adc-ubl-entity tr.selected').removeClass('selected');
    tr.addClass('selected');
    var row = adc_ubl_entity_table.row(tr);
    var data = row.data();
    var componentType = data.ComponentType;
    if ('ASBIE' === componentType) {
      $('.pretty-split-pane-component-inner.adc-ubl-entity2').removeClass('d-none');
      $('.pretty-split-pane-component-inner.adc-ubl-udt').addClass('d-none');
      var searchText = data.AssociatedObjectClass;
      var tableTitle = $('.adc-ubl-entity2 .table-title');
      var title = tableTitle.text();
      tableTitle.text(`${searchText} - ${title}`);
      adc_ubl_entity2_table.columns(ubl_entity_COL_ObjectClass)
      .search(`^${searchText}$`, /*regex*/true, /*smart*/false, /*caseInsen*/false)
      .draw();
    }
    else if ('BBIE' === componentType) {
      $('.pretty-split-pane-component-inner.adc-ubl-entity2').addClass('d-none');
      $('.pretty-split-pane-component-inner.adc-ubl-udt').removeClass('d-none');
      var searchText = data.DataType;
      var tableTitle = $('.adc-ubl-udt .table-title');
      var title = tableTitle.text();
      tableTitle.text(`${searchText} - ${title}`);
      adc_ubl_udt_table.columns(ubl_dt_COL_DictionaryEntryName)
      .search(`^${searchText}$`, /*regex*/true, /*smart*/false, /*caseInsen*/false)
      .column(ubl_dt_COL_CategoryCode).search('UDT')
      .draw();
    }
  });
  //
  // UN/CEFACT
  //
  $('#uncefact-mbie tbody').on('click', 'td:not(.details-control)', function () {
    var td = $(this);
    if (td.hasClass('details-control')) { return; }
    var tr = $(this).closest('tr');
    $('#uncefact-component-1').removeClass('init');
    $('#uncefact-component-2').removeClass('init');
    $('#uncefact-mbie tr.selected').removeClass('selected');
    tr.addClass('selected');
    $('.pretty-split-pane-component-inner.mbie_compt').removeClass('d-none');
    $('.pretty-split-pane-component-inner.acc').removeClass('d-none');
    $('.pretty-split-pane-component-inner.cc').removeClass('d-none');
    var row = mbie_table.row(tr);
    var data = row.data();
    var searchText;
    searchText = `${data.ObjectClassTermQualifier}_ ${data.ObjectClassTerm}`;
    mbie_compt_table.columns(mbie_compt_COL_DictionaryEntryName)
    .search(`^${searchText}\\.`, /*regex*/true, /*smart*/false, /*caseInsen*/false)
    .draw();
    searchText = data.ObjectClassTerm;
    acc_table.columns(acc_COL_ObjectClassTerm)
    .search(`^${searchText}$`, /*regex*/true, /*smart*/false, /*caseInsen*/false)
    .draw();
    cc_table.columns(cc_COL_ObjectClassTerm)
    .search(`^${searchText}$`, /*regex*/true, /*smart*/false, /*caseInsen*/false)
    .draw();
  });
  $('#uncefact-mbie_compt tbody').on('click', 'td:not(.details-control)', function () {
    var td = $(this);
    if (td.hasClass('details-control')) { return; }
    var tr = $(this).closest('tr');
    $('#uncefact-mbie_compt tr.selected').removeClass('selected');
    tr.addClass('selected');
    var row = mbie_compt_table.row(tr);
    var data = row.data();
    var kind = data.Kind;
    var searchText;
    if ('ASBIE' === kind) {
      $('#uncefact-component-1').removeClass('no-datatype');
      $('.pretty-split-pane-component-inner.mbie_compt2').removeClass('d-none');
      $('.pretty-split-pane-component-inner.qdt').addClass('d-none');
      searchText = `${data.AssociatedObjectClassTermQualifier}_ ${data.AssociatedObjectClass}`;
      mbie_compt2_table.columns(mbie_compt_COL_DictionaryEntryName)
      .search(`^${searchText}\\.`, /*regex*/true, /*smart*/false, /*caseInsen*/false)
      .draw();
    }
    else if ('BBIE' === kind) {
      if (data.QualifiedDataTypeUID) {
        $('#uncefact-component-1').removeClass('no-datatype');
        $('#uncefact-component-2').removeClass('no-datatype');
        $('.pretty-split-pane-component-inner.mbie_compt2').addClass('d-none');
        $('.pretty-split-pane-component-inner.qdt').removeClass('d-none');
        $('.pretty-split-pane-component-inner.udt').removeClass('d-none');
        searchText = data.QualifiedDataTypeUID;
        qdt_table.columns(qdt_COL_UNID)
        .search(`^${searchText}$`, /*regex*/true, /*smart*/false, /*caseInsen*/false)
        .draw();
        searchText =data.RepresentationTerm;//TODO data.DataType
        udt_table.columns(dt_COL_DataType)
        .search(`^${searchText}. Type$`, /*regex*/true, /*smart*/false, /*caseInsen*/false)
        .draw();
      }
      else {
        $('#uncefact-component-2').removeClass('no-datatype');
        $('.pretty-split-pane-component-inner.mbie_compt2').addClass('d-none');
        $('.pretty-split-pane-component-inner.qdt').addClass('d-none');
        $('#uncefact-component-1').addClass('no-datatype');
        $('.pretty-split-pane-component-inner.udt').removeClass('d-none');
        searchText = data.RepresentationTerm;
        udt_table.columns(dt_COL_DataType)
        .search(`^${searchText}. Type$`, /*regex*/true, /*smart*/false, /*caseInsen*/false)
        .draw();              
      }
    }

    var short_name = tr[0].cells[mbie_compt_COL_ShortName].textContent;
    $('#uncefact-cc tr.selected').removeClass('selected');
    $('#uncefact-cc tr').each(function(i, _tr) {
      if (short_name  === _tr.cells[cc_COL_ShortName].textContent) {
        $(_tr).addClass('selected');
      }
    });
  });
  $('#uncefact-acc tbody').on('click', 'td:not(.details-control)', function () {
    var td = $(this);
    if (td.hasClass('details-control')) { return; }
    var tr = $(this).closest('tr');
    $('#uncefact-component-2').removeClass('init');
    $('#uncefact-acc tr.selected').removeClass('selected');
    tr.addClass('selected');
    $('.pretty-split-pane-component-inner.cc').removeClass('d-none');
    $('.pretty-split-pane-component-inner.mbie').removeClass('d-none');
    var row = acc_table.row(tr);
    var data = row.data();
    var searchText = data.ObjectClassTerm;
    cc_table.columns(cc_COL_ObjectClassTerm)
    .search(`^${searchText}$`, /*regex*/true, /*smart*/false, /*caseInsen*/false)
    .draw();
    mbie_table.columns(mbie_COL_ObjectClassTerm)
    .search(`^${searchText}$`, /*regex*/true, /*smart*/false, /*caseInsen*/false)
    .draw();
  });
  $('#uncefact-cc tbody').on('click', 'td:not(.details-control)', function () {
    var td = $(this);
    if (td.hasClass('details-control')) { return; }
    var tr = $(this).closest('tr');
    $('#uncefact-component-2').removeClass('no-datatype');
    $('#uncefact-cc tr.selected').removeClass('selected');
    tr.addClass('selected');
    var row = cc_table.row(tr);
    var data = row.data();
    var kind = data.Kind;
    var searchText;
    if ('ASCC' === kind) {
      $('.pretty-split-pane-component-inner.cc2').removeClass('d-none');
      $('.pretty-split-pane-component-inner.udt').addClass('d-none');
      searchText = data.AssociatedObjectClass;
      cc2_table.columns(cc_COL_ObjectClassTerm)
      .search(`^${searchText}$`, /*regex*/true, /*smart*/false, /*caseInsen*/false)
      .draw();
    }
    else if ('BCC' === kind) {
      $('.pretty-split-pane-component-inner.cc2').addClass('d-none');
      $('.pretty-split-pane-component-inner.udt').removeClass('d-none');
      var searchText = data.RepresentationTerm; //TODO data.DataType
      udt_table.columns(dt_COL_DataType)
      .search(`^${searchText}. Type$`, /*regex*/true, /*smart*/false, /*caseInsen*/false)
      .draw();
    }
  });
  //
  // UBL
  //
  $('#ubl-abie tbody').on('click', 'td:not(.details-control)', function () {
    var td = $(this);
    if (td.hasClass('details-control')) { return; }
    var tr = $(this).closest('tr');
    $('#ubl-component-1').removeClass('init');
    $('#ubl-abie tr.selected').removeClass('selected');
    tr.addClass('selected');
    $('.pretty-split-pane-component-inner.ubl-entity').removeClass('d-none');
    // $('.pretty-split-pane-component-inner.mbie').removeClass('d-none');
    var row = ubl_abie_table.row(tr);
    var data = row.data();
    var searchText = data.ObjectClass;
    ubl_entity_table.columns(ubl_entity_COL_ObjectClass)
    .search(`^${searchText}$`, /*regex*/true, /*smart*/false, /*caseInsen*/false)
    .draw();
  });
  $('#ubl-entity tbody').on('click', 'td:not(.details-control)', function () {
    var td = $(this);
    if (td.hasClass('details-control')) { return; }
    var tr = $(this).closest('tr');
    $('#ubl-component-1').removeClass('no-datatype');
    $('#ubl-entity tr.selected').removeClass('selected');
    tr.addClass('selected');
    var row = ubl_entity_table.row(tr);
    var data = row.data();
    var componentType = data.ComponentType;
    var searchText;
    if ('ASBIE' === componentType) {
      $('.pretty-split-pane-component-inner.ubl-entity2').removeClass('d-none');
      $('.pretty-split-pane-component-inner.ubl-udt').addClass('d-none');
      searchText = data.AssociatedObjectClass;
      ubl_entity2_table.columns(ubl_entity_COL_ObjectClass)
      .search(`^${searchText}$`, /*regex*/true, /*smart*/false, /*caseInsen*/false)
      .draw();
    }
    else if ('BBIE' === componentType) {
      $('.pretty-split-pane-component-inner.ubl-entity2').addClass('d-none');
      $('.pretty-split-pane-component-inner.ubl-udt').removeClass('d-none');
      var searchText = data.DataType;
      ubl_udt_table.columns(ubl_dt_COL_DictionaryEntryName)
      .search(`^${searchText}$`, /*regex*/true, /*smart*/false, /*caseInsen*/false)
      .column(ubl_dt_COL_CategoryCode).search('UDT')
      .draw();
    }
  });
  $('#ubl-acc tbody').on('click', 'td:not(.details-control)', function () {
    var td = $(this);
    if (td.hasClass('details-control')) { return; }
    var tr = $(this).closest('tr');
    $('#ubl-component-2').removeClass('init');
    $('#ubl-acc tr.selected').removeClass('selected');
    tr.addClass('selected');
    $('.pretty-split-pane-component-inner.ubl-cc').removeClass('d-none');
    var row = ubl_acc_table.row(tr);
    var data = row.data();
    var searchText = data.ObjectClassTerm;
    ubl_cc_table.columns(cc_COL_ObjectClassTerm)
    .search(`^${searchText}$`, /*regex*/true, /*smart*/false, /*caseInsen*/false)
    .draw();
    searchText = data.ObjectClassTerm;
    ubl_abie_table.columns(ubl_abie_COL_DictionaryEntryName)
    .search(`^.*${searchText}. Details$`, /*regex*/true, /*smart*/false, /*caseInsen*/false)
    .draw();
  });
  $('#ubl-cc tbody').on('click', 'td:not(.details-control)', function () {
    var td = $(this);
    if (td.hasClass('details-control')) { return; }
    var tr = $(this).closest('tr');
    $('#ubl-component-2').removeClass('no-datatype');
    $('#ubl-cc tr.selected').removeClass('selected');
    tr.addClass('selected');
    var row = ubl_cc_table.row(tr);
    var data = row.data();
    var kind = data.Kind;
    var searchText;
    if ('ASCC' === kind) {
      $('.pretty-split-pane-component-inner.ubl-cc2').removeClass('d-none');
      $('.pretty-split-pane-component-inner.ubl-un-udt').addClass('d-none');
      searchText = data.AssociatedObjectClass;
      ubl_cc2_table.columns(cc_COL_ObjectClassTerm)
      .search(`^${searchText}$`, /*regex*/true, /*smart*/false, /*caseInsen*/false)
      .draw();
    }
    else if ('BCC' === kind) {
      $('.pretty-split-pane-component-inner.ubl-cc2').addClass('d-none');
      $('.pretty-split-pane-component-inner.ubl-un-udt').removeClass('d-none');
      searchText = data.RepresentationTerm;
      ubl_un_udt_table.columns(dt_COL_DataType)
      .search(`^${searchText}. Type$`, /*regex*/true, /*smart*/false, /*caseInsen*/false)
      .draw();
    }
  });

  $('div.split-pane').splitPane();

  $('.overlay').click(function() {
    $( this ).addClass('d-none');
  });
}
