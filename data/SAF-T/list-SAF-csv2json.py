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

# Elegant Python function to convert CamelCase to snake_case?
# https://stackoverflow.com/questions/1175208/elegant-python-function-to-convert-camelcase-to-snake-case
def camel_to_title(name):
    name = re.sub('(.)([A-Z][a-z]+)', r'\1 \2', name)
    return re.sub('([a-z0-9])([A-Z])', r'\1 \2', name)

if __name__ == '__main__':
    d = date.today()
    dir = os.path.dirname(__file__)
    in_file = dir+'/SAF-T_Schema_v_2.00.csv'
    entity_file = dir+'/list-SAF-T-entity-'+d.isoformat()+'.json'
    abie_file =  dir+'/list-SAF-T-abie-'+d.isoformat()+'.json'

    # csv_header = ['module','num','Kind','Table','Name','DEN','Description','ObjectClassTermQualifier','ObjectClassTerm']
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
            Name = camel_to_title(Name)
            Level = row['Level']
            Card = row['Card']
            Type = row['Type']
            Description = row['Description']
            ObjectClassTermQualifier = camel_to_title(row['ObjectClassTermQualifier'])
            ObjectClassTerm = camel_to_title(row['ObjectClassTerm'])
            PropertyTermQualifier = camel_to_title(row['PropertyTermQualifier'])
            PropertyTerm = camel_to_title(row['PropertyTerm'])
            DatatypeQualifier = camel_to_title(row['DatatypeQualifier'])
            RepresentationTerm = camel_to_title(row['RepresentationTerm'])
            AssciatedObjectClassTermQualifier = camel_to_title(row['AssciatedObjectClassTermQualifier'])
            AssociatedObjectClass = camel_to_title(row['AssociatedObjectClass'])
            RepresentationTerm = camel_to_title(row['RepresentationTerm'])
            ReferencedObjectClassTermQualifier = camel_to_title(row['ReferencedObjectClassTermQualifier'])
            ReferencedObjectClass = camel_to_title(row['ReferencedObjectClass'])
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
                DEN = f'{_ObjectClassTerm}. Detail'
            elif Kind in ['BBIE','IDBIE']:
                DEN = f'{_ObjectClassTerm}. {_PropertyTerm}. {_RepresentationTerm}'
            elif 'ASBIE'==Kind:
                DEN = f'{_ObjectClassTerm}. {_PropertyTerm}. {_AssociatedObjectClass}'
            elif 'RFBIE'==Kind:
                DEN = f'{_ObjectClassTerm}. {_PropertyTerm}. {_ReferencedObjectClass}'
            else:
                DEN = ''
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
                        'DEN': DEN,
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
                    'DEN': DEN,
                    'Description': Description,
                    'ObjectClassTermQualifier': ObjectClassTermQualifier,
                    'ObjectClassTerm': ObjectClassTerm,
                    'PropertyTermQualifier': PropertyTermQualifier,
                    'PropertyTerm': PropertyTerm,
                    'DatatypeQualifier': DatatypeQualifier,
                    'RepresentationTerm': RepresentationTerm,
                    'AssociatedObjectClassTermQualifier': AssciatedObjectClassTermQualifier,
                    'AssociatedObjectClass': AssociatedObjectClass,
                    'ReferencedObjectClassTermQualifier': ReferencedObjectClassTermQualifier,
                    'ReferencedObjectClass': ReferencedObjectClass,
                }
                entity_list.append(entity)

    abie_sorted = sorted(abie_list, key=lambda x:x['num'])
    with open(abie_file, 'w') as f:
        json.dump({'data': abie_sorted}, f, indent=2)

    entity_sorted = sorted(entity_list, key=lambda x:x['num'])
    with open(entity_file, 'w') as f:
        json.dump({'data': entity_sorted}, f, indent=2)

    print('done.')