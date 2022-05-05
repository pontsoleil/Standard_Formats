#!/usr/bin/env python3
#coding: utf-8
#
# convert SAF-T_Schema_v_2.00.csv to json
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
import re
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
    in_file = dir+'/SAF-T_Schema_v_2.00.csv'
    entity_file = dir+'/list-SAF-T-entity-'+d.isoformat()+'.json'
    abie_file =  dir+'/list-SAF-T-abie-'+d.isoformat()+'.json'

    # csv_header = ['module','num','Kind','Table','Name','DictionaryEntryName','Description','ObjectClassTermQualifier','ObjectClassTerm']
    csv_header = [
        'num',
        'Module',
        'ObjectClassTermQualifier',
        'ObjectClassTerm',
        'Kind',
        'Level',
        'Name',
        'Card',
        'PropertyTermQualifier',
        'PropertyTerm',
        'DatatypeQualifier',
        'RepresentationTerm',
        'AssciatedObjectClassTermQualifier',
        'AssociatedObjectClass',
        'ReferencedObjectClassTermQualifier',
        'ReferencedObjectClass',
        'Type',
        'Description'
    ]
    abie_list = []
    entity_list = []
    with open(in_file, newline='') as csvfile:
        reader = csv.DictReader(csvfile,csv_header)
        next(reader, None)  # skip the headers
        for row in reader:
            num = row['num']
            Module = row['Module']
            Kind = row['Kind']
            Name = row['Name']
            Name = re.sub(r'(.)([A-Z])',r'\1 \2',Name)
            Level = row['Level']
            Card = row['Card']
            Type = row['Type']
            Description = row['Description']
            ObjectClassTermQualifier = row['ObjectClassTermQualifier']
            if ObjectClassTermQualifier:
                ObjectClassTermQualifier = re.sub(r'(.)([A-Z])',r'\1 \2',ObjectClassTermQualifier)
            ObjectClassTerm = row['ObjectClassTerm']
            if ObjectClassTerm:
                ObjectClassTerm = re.sub(r'(.)([A-Z])',r'\1 \2',ObjectClassTerm)
            PropertyTermQualifier = row['PropertyTermQualifier']
            if PropertyTermQualifier:
                PropertyTermQualifier = re.sub(r'(.)([A-Z])',r'\1 \2',PropertyTermQualifier)
            PropertyTerm = row['PropertyTerm']
            if PropertyTerm:
                PropertyTerm = re.sub(r'(.)([A-Z])',r'\1 \2',PropertyTerm)
            DatatypeQualifier = row['DatatypeQualifier']
            if DatatypeQualifier:
                DatatypeQualifier = re.sub(r'(.)([A-Z])',r'\1 \2',DatatypeQualifier)
            RepresentationTerm = row['RepresentationTerm']
            if RepresentationTerm:
                RepresentationTerm = re.sub(r'(.)([A-Z])',r'\1 \2',RepresentationTerm)
            AssciatedObjectClassTermQualifier = row['AssciatedObjectClassTermQualifier']
            AssociatedObjectClass = row['AssociatedObjectClass']
            if RepresentationTerm:
                RepresentationTerm = re.sub(r'(.)([A-Z])',r'\1 \2',RepresentationTerm)
            ReferencedObjectClassTermQualifier = row['ReferencedObjectClassTermQualifier']
            if ReferencedObjectClassTermQualifier:
                ReferencedObjectClassTermQualifier = re.sub(r'(.)([A-Z])',r'\1 \2',ReferencedObjectClassTermQualifier)
            ReferencedObjectClass = row['ReferencedObjectClass']
            if ReferencedObjectClass:
                ReferencedObjectClass = re.sub(r'(.)([A-Z])',r'\1 \2',ReferencedObjectClass)
            Description = row['Description']
            if ObjectClassTermQualifier:
                _ObjectClassTerm = f'{ObjectClassTermQualifier}_ {ObjectClassTerm}'
            else:
                _ObjectClassTerm = ObjectClassTerm
            if PropertyTermQualifier:
                _PropertyTerm =F'{PropertyTermQualifier}_ {PropertyTerm}'
            else:
                _PropertyTerm = PropertyTerm
            if DatatypeQualifier:
                _RepresentationTerm = f'{RepresentationTerm}_ {DatatypeQualifier}'
            else:
                _RepresentationTerm = RepresentationTerm
            if AssciatedObjectClassTermQualifier:
                _AssociatedObjectClass = f'{AssciatedObjectClassTermQualifier}_ {AssociatedObjectClass}'
            else:
                _AssociatedObjectClass = AssociatedObjectClass
            if ReferencedObjectClassTermQualifier:
                _ReferencedObjectClass = f'{ReferencedObjectClassTermQualifier}_ {ReferencedObjectClass}'
            else:
                _ReferencedObjectClass = ReferencedObjectClass
            if 'ABIE'==Kind:
                DictionaryEntryName = f'{_ObjectClassTerm}. Detail'
            elif Kind in ['BBIE','IDBIE']:
                DictionaryEntryName = f'{_ObjectClassTerm}. {_PropertyTerm}. {_RepresentationTerm}'
            elif 'ASBIE'==Kind:
                DictionaryEntryName = f'{_ObjectClassTerm}. {_PropertyTerm}. {_AssociatedObjectClass}'
            elif 'RFBIE'==Kind:
                DictionaryEntryName = f'{_ObjectClassTerm}. {_PropertyTerm}. {_ReferencedObjectClass}'
            else:
                DictionaryEntryName = ''
            SAF = [
                'AuditFile',
                'Header',
                'MasterFiles',
                'GeneralLedgerEntries',
                'SourceDocuments'
            ]
            if 'ABIE'==Kind:
                if 'choice'!=Name[:6] and 'sequence'!=Name[:8] and not '_' in Name and not '-' in Name:
                    abie = {
                        'num': num,
                        'Module': Module,
                        'Kind': Kind,
                        'Table': '',
                        'Name': Name,
                        'Level': Level,
                        'DictionaryEntryName': DictionaryEntryName,
                        'Description': Description,
                        'ObjectClassTermQualifier': ObjectClassTermQualifier,
                        'ObjectClassTerm': ObjectClassTerm
                    }
                    abie_list.append(abie)
            elif num:
                entity = {
                    'num': num,
                    'Module': Module,
                    'Kind': Kind,
                    'Table': '',
                    'Name': Name,
                    'Level': Level,
                    'Card': Card,
                    'Type': Type,
                    'DictionaryEntryName': DictionaryEntryName,
                    'Description': Description,
                    'ObjectClassTermQualifier': ObjectClassTermQualifier,
                    'ObjectClassTerm': ObjectClassTerm,
                    'DatatypeQualifier': DatatypeQualifier,
                    'RepresentationTerm': RepresentationTerm,
                    'AssociatedObjectClassTermQualifier': AssciatedObjectClassTermQualifier,
                    'AssociatedObjectClass': AssociatedObjectClass,
                    'ReferencedObjectClassTermQualifier': ReferencedObjectClassTermQualifier,
                    'ReferencedObjectClass': ReferencedObjectClass,
                }
                entity_list.append(entity)

    abie_sorted = sorted(abie_list, key=lambda x:x['Module']+x['num'])
    with open(abie_file, 'w') as f:
        json.dump({'data': abie_sorted}, f, indent=2)

    entity_sorted = sorted(entity_list, key=lambda x:x['Module']+x['ObjectClassTermQualifier']+x['ObjectClassTerm']+x['num'])
    with open(entity_file, 'w') as f:
        json.dump({'data': entity_sorted}, f, indent=2)

    print('done.')