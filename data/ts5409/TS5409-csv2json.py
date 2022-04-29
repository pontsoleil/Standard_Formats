#!/usr/bin/env python3
#coding: utf-8
#
# convert TS5409 csv to json
#
# designed by SAMBUICHI, Nobuyuki (Sambuichi Professional Engineers Office)
# written by SAMBUICHI, Nobuyuki (Sambuichi Professional Engineers Office)
#
# MIT License
#
# Copyright (c) 2021 SAMBUICHI Nobuyuki (Sambuichi Professional Engineers Office)
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in all
# copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
# SOFTWARE.
import os
import argparse
import json
import csv
from datetime import date

def file_path(pathname):
    if '/' == pathname[0:1]:
        return pathname
    else:
        dir = os.path.dirname(__file__)
        new_path = os.path.join(dir, pathname)
        return new_path

if __name__ == '__main__':
    d = date.today()
    dir = os.path.dirname(__file__)
    in_file = dir+'/list-TS5409.csv'
    abie_file = dir+'/list-TS5409-abie-'+d.isoformat()+'.json'
    entity_file = dir+'/list-TS5409-entity-'+d.isoformat()+'.json'

    abie_list = []
    entity_list = []
    header = ['Module','num','Kind','Table','No','BusinessTerm','DictionaryEntryName','Description','ObjectClassTermQualifier','ObjectClassTerm','PropertyTerm','RepresentationTerm','Datatype','Representation','AssociatedObjectClassTermQualifier','AssociatedObjectClass','Level','PK_REF','ATTRIBUTE','DOMAIN']

    with open(in_file, newline='') as csvfile:
        reader = csv.DictReader(csvfile,header)
        next(reader, None)  # skip the headers
        for row in reader:
            if not row['num']: continue
            num = int(row['num'])
            Module = row['Module'].strip()
            Kind = row['Kind'].strip()
            Table = row['Table'].strip()
            No = int(row['No'])
            BusinessTerm = row['BusinessTerm'].strip()
            Description = row['Description']
            ObjectClassTermQualifier = row['ObjectClassTermQualifier'].strip()
            ObjectClassTerm = row['ObjectClassTerm'].strip()
            PropertyTerm = row['PropertyTerm'].strip()
            if 'RepresentationTerm' in row: RepresentationTerm = row['RepresentationTerm'].strip()
            else: RepresentationTerm = ''
            if 'Datatype' in row: Datatype = row['Datatype'].strip()
            else: Datatype = ''
            if 'Representation' in row: Representation = row['Representation'].strip()
            else: Representation = ''
            if 'AssociatedObjectClassTermQualifier' in row:
                AssociatedObjectClassTermQualifier = row['AssociatedObjectClassTermQualifier'].strip()
            else: AssociatedObjectClassTermQualifier = ''
            if 'AssociatedObjectClass' in row:
                AssociatedObjectClass = row['AssociatedObjectClass'].strip()
            else: AssociatedObjectClass = ''
            Level = row['Level']
            _DictionaryEntryName = row['DictionaryEntryName'].strip()
            DictionaryEntryName = None
            if ObjectClassTermQualifier:
                DictionaryEntryName = ObjectClassTermQualifier+'_ '+ObjectClassTerm+'. '
            else: DictionaryEntryName = ObjectClassTerm+'. '
            if 'ABIE' == Kind:
                DictionaryEntryName += 'Details'
            elif 'IDBIE' == Kind:
                DictionaryEntryName += 'ID'
            elif 'ASBIE' == Kind or 'RBIE' == Kind or 'RLBIE' == Kind:
                DictionaryEntryName += PropertyTerm+'. '
                if AssociatedObjectClassTermQualifier:
                    DictionaryEntryName += AssociatedObjectClassTermQualifier+'_ '
                DictionaryEntryName += AssociatedObjectClass
            elif 'BBIE' == Kind:
                DictionaryEntryName += PropertyTerm+'. '+RepresentationTerm
            if DictionaryEntryName != _DictionaryEntryName:
                print(_DictionaryEntryName+' NE '+DictionaryEntryName)
            if 'PK_REF' in row: PK_REF = row['PK_REF']
            else: PK_REF = ''
            if 'ATTRIBUTE' in row: ATTRIBUTE = row['ATTRIBUTE']
            else: ATTRIBUTE = ''
            if 'DOMAIN' in row: DOMAIN = row['DOMAIN']
            else: DOMAIN = ''
            if 'ABIE' == Kind:
                abie = {
                    'module': Module,
                    'num': num,
                    'Kind': Kind,
                    'Table': Table,
                    'BusinessTerm': BusinessTerm,
                    'DictionaryEntryName': DictionaryEntryName,
                    'Description': Description,
                    'ObjectClassTermQualifier': ObjectClassTermQualifier,
                    'ObjectClassTerm': ObjectClassTerm
                }
                abie_list.append(abie)
            else:
                entity = {
                    'Module': Module,
                    'num': num,
                    'Kind': Kind,
                    'Table': Table,
                    'No': No,
                    'BusinessTerm': BusinessTerm,
                    'DictionaryEntryName': DictionaryEntryName,
                    'Description': Description,
                    'ObjectClassTermQualifier': ObjectClassTermQualifier,
                    'ObjectClassTerm': ObjectClassTerm,
                    'PropertyTerm': PropertyTerm,
                    'RepresentationTerm': RepresentationTerm,
                    'Datatype': Datatype,
                    'Representation': Representation,
                    'AssociatedObjectClassTermQualifier': AssociatedObjectClassTermQualifier,
                    'AssociatedObjectClass': AssociatedObjectClass,
                    'Level': Level,
                    'PK_REF': PK_REF,
                    'ATTRIBUTE': ATTRIBUTE,
                    'DOMAIN': DOMAIN
                }
                entity_list.append(entity)

    with open(abie_file, 'w') as f:
        json.dump({'data': abie_list}, f, indent=4)

    with open(entity_file, 'w') as f:
        json.dump({'data': entity_list}, f, indent=4)

    print('done.')