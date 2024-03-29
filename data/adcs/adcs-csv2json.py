#!/usr/bin/env python3
#coding: utf-8
#
# convert audit data collection standard csv to json
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
    in_file = dir+'/list-adcs.csv'
    abie_file = dir+'/list-adcs-abie-'+d.isoformat()+'.json'
    entity_file = dir+'/list-adcs-entity-'+d.isoformat()+'.json'

    # csv_header = ['module','num','Kind','Table','Name','DictionaryEntryName','Description','ObjectClassTermQualifier','ObjectClassTerm']
    csv_header = [
        'seq',
        'module',
        'ObjectClassTermQualifier',
        'ObjectClassTerm',
        'num',
        'Kind',
        'Name',
        'Occurrence',
        'PropertyTerm',
        'RepresentationTerm',
        'AssociatedObjectClassTermQualifier',
        'AssociatedObjectClass',
        'ReferencedObjectClassQualifier',
        'ReferencedObjectClass',
        'Description',
        'DictionaryEntryName',
        'Table',
        'PK_REF',
        'RefField',
        'RefTable',
        'Datatype',
        'Representation',
        'XBRLGL',
    ]
    abie_list = []
    entity_list = []
    with open(in_file, newline='') as csvfile:
        reader = csv.DictReader(csvfile,csv_header)
        next(reader, None)  # skip the headers
        for row in reader:
            seq = row['seq']
            module = row['module']
            ObjectClassTermQualifier = row['ObjectClassTermQualifier']
            ObjectClassTerm = row['ObjectClassTerm']
            if ObjectClassTermQualifier:
                _ObjectClassTerm = f'{ObjectClassTermQualifier}_ {ObjectClassTerm}'
            else:
                _ObjectClassTerm = ObjectClassTerm
            num = row['num']
            Kind = row['Kind']
            Name = row['Name']
            Occurrence = row['Occurrence']
            PropertyTerm = row['PropertyTerm']
            RepresentationTerm = row['RepresentationTerm']
            AssociatedObjectClassTermQualifier = row['AssociatedObjectClassTermQualifier']
            AssociatedObjectClass = row['AssociatedObjectClass']
            if AssociatedObjectClassTermQualifier:
                _AssociatedObjectClass = f'{AssociatedObjectClassTermQualifier}_ {AssociatedObjectClass}'
            else:
                _AssociatedObjectClass = AssociatedObjectClass
            ReferencedObjectClassTermQualifier = row['ReferencedObjectClassQualifier']
            ReferencedObjectClass = row['ReferencedObjectClass']
            if ReferencedObjectClassTermQualifier:
                _ReferencedObjectClass = f'{ReferencedObjectClassTermQualifier}_ {ReferencedObjectClass}'
            else:
                _ReferencedObjectClass = ReferencedObjectClass
            Description = row['Description']
            DictionaryEntryName = row['DictionaryEntryName']
            if 'ABIE'==Kind:
                DEN = f'{_ObjectClassTerm}. Details'
            elif 'ASBIE'==Kind:
                DEN = f'{_ObjectClassTerm}. {PropertyTerm}. {_AssociatedObjectClass}'
            elif 'RFBIE'==Kind:
                DEN = f'{_ObjectClassTerm}. {PropertyTerm}. {_ReferencedObjectClass}'
            elif Kind in ['BBIE','IDBIE']:
                DEN = f'{_ObjectClassTerm}. {PropertyTerm}. {RepresentationTerm}'
            else:
                DEN = ''
            Table = row['Table']
            PK_REF = row['PK_REF']
            RefField = row['RefField']
            RefTable = row['RefTable']
            Datatype = row['Datatype']
            Representation = row['Representation']
            XBRLGL = row['XBRLGL']
            if 'ABIE'==Kind:
                if 'choice'!=Name[:6] and 'sequence'!=Name[:8] and not '_' in Name and not '-' in Name:
                    abie = {
                        'seq': seq,
                        'Module': module,
                        'Kind': Kind,
                        'Table': '',
                        'Name': Name,
                        'Level': 0,
                        'DictionaryEntryName': DEN,
                        'Description': Description,
                        'ObjectClassTermQualifier': ObjectClassTermQualifier,
                        'ObjectClassTerm': ObjectClassTerm,
                        'Table': Table
                    }
                    abie_list.append(abie)
            elif num:
                entity = {
                    'Module': module,
                    'num': num,
                    'Kind': Kind,
                    'Table': '',
                    'Name': Name,
                    'Level': 0,
                    'Card': Occurrence,
                    'Type': RepresentationTerm,
                    'DictionaryEntryName': DEN,
                    'Description': Description,
                    'ObjectClassTermQualifier': ObjectClassTermQualifier,
                    'ObjectClassTerm': ObjectClassTerm,
                    'PropertyTerm': PropertyTerm,
                    'DatatypeQualifier': '',
                    'RepresentationTerm': RepresentationTerm,
                    'AssociatedObjectClassTermQualifier': AssociatedObjectClassTermQualifier,
                    'AssociatedObjectClass': AssociatedObjectClass,
                    'ReferencedObjectClassTermQualifier': ReferencedObjectClassTermQualifier,
                    'ReferencedObjectClass': ReferencedObjectClass,
                    'Table': Table,
                    'PK_REF': PK_REF,
                    'RefField': RefField,
                    'RefTable': RefTable,
                    'Datatype': Datatype,
                    'Representation': Representation,
                    'XBRLGL': XBRLGL
                }
                entity_list.append(entity)

    abie_sorted = sorted(abie_list, key=lambda x:x['seq'])
    with open(abie_file, 'w') as f:
        json.dump({'data': abie_sorted}, f, indent=2)

    entity_sorted = sorted(entity_list, key=lambda x:x['Module']+x['ObjectClassTermQualifier']+x['ObjectClassTerm']+x['num'])
    with open(entity_file, 'w') as f:
        json.dump({'data': entity_sorted}, f, indent=2)

    print('done.')