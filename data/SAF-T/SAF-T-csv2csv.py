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
import re
import csv
from datetime import date

def file_path(pathname):
    if '/' == pathname[0:1]:
        return pathname
    else:
        dir = os.path.dirname(__file__)
        new_path = os.path.join(dir, pathname)
        return new_path

def CC2TC(name):
    if not name:
        return ''
    name = re.sub(r'(choice|sequence)_',r'\1:',name)
    name = re.sub(r'(?<!^)(?=[A-Z])',' ',name)
    name = re.sub(r'([^\s])([\/\-\:])',r'\1 \2',name)
    name = re.sub(r'([\/\-\:])([^\s])',r'\1 \2',name)
    return name

if __name__ == '__main__':
    d = date.today()
    dir = os.path.dirname(__file__)
    in_file = dir+'/SAF-T_Schema_v_2.00.csv'
    csv_file = dir+'/SAF-T_Schema_v_2.00'+d.isoformat()+'.csv'

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
    # moduleMap = {}
    csv_list = []
    with open(in_file, newline='') as csvfile:
        reader = csv.DictReader(csvfile,csv_header)
        next(reader, None)  # skip the headers
        for row in reader:
            num = row['num']
            Module = row['Module']
            Kind = row['Kind']
            Name = row['Name']
            Name = CC2TC(Name)
            Level = row['Level']
            Card = row['Card']
            Type = row['Type']
            Description = row['Description']
            ObjectClassTermQualifier = CC2TC(row['ObjectClassTermQualifier'])
            ObjectClassTerm = CC2TC(row['ObjectClassTerm'])
            PropertyTermQualifier = CC2TC(row['PropertyTermQualifier'])
            PropertyTerm = CC2TC(row['PropertyTerm'])
            DatatypeQualifier = CC2TC(row['DatatypeQualifier'])
            RepresentationTerm = CC2TC(row['RepresentationTerm'])
            AssciatedObjectClassTermQualifier = CC2TC(row['AssciatedObjectClassTermQualifier'])
            AssociatedObjectClass = CC2TC(row['AssociatedObjectClass'])
            RepresentationTerm = CC2TC(row['RepresentationTerm'])
            ReferencedObjectClassTermQualifier = CC2TC(row['ReferencedObjectClassTermQualifier'])
            ReferencedObjectClass = CC2TC(row['ReferencedObjectClass'])
            # if ObjectClassTermQualifier:
            #     _ObjectClassTerm = f'{ObjectClassTermQualifier}_ {ObjectClassTerm}'
            # else:
            #     _ObjectClassTerm = ObjectClassTerm
            # if PropertyTermQualifier:
            #     _PropertyTerm =F'{PropertyTermQualifier}_ {PropertyTerm}'
            # else:
            #     _PropertyTerm = PropertyTerm
            # if DatatypeQualifier:
            #     _RepresentationTerm = f'{RepresentationTerm}_ {DatatypeQualifier}'
            # else:
            #     _RepresentationTerm = RepresentationTerm
            # if AssciatedObjectClassTermQualifier:
            #     _AssociatedObjectClass = f'{AssciatedObjectClassTermQualifier}_ {AssociatedObjectClass}'
            # else:
            #     _AssociatedObjectClass = AssociatedObjectClass
            # if ReferencedObjectClassTermQualifier:
            #     _ReferencedObjectClass = f'{ReferencedObjectClassTermQualifier}_ {ReferencedObjectClass}'
            # else:
            #     _ReferencedObjectClass = ReferencedObjectClass
            # if 'ABIE'==Kind:
            #     DictionaryEntryName = f'{_ObjectClassTerm}. Detail'
            # elif Kind in ['BBIE','IDBIE']:
            #     DictionaryEntryName = f'{_ObjectClassTerm}. {_PropertyTerm}. {_RepresentationTerm}'
            # elif 'ASBIE'==Kind:
            #     DictionaryEntryName = f'{_ObjectClassTerm}. {_PropertyTerm}. {_AssociatedObjectClass}'
            # elif 'RFBIE'==Kind:
            #     DictionaryEntryName = f'{_ObjectClassTerm}. {_PropertyTerm}. {_ReferencedObjectClass}'
            # else:
            #     DictionaryEntryName = ''
            record = {
                'num': num,
                'Module': Module,
                'ObjectClassTermQualifier': ObjectClassTermQualifier,
                'ObjectClassTerm': ObjectClassTerm,
                'Kind': Kind,
                'Level': Level,
                'Name': Name,
                'Card': Card,
                'PropertyTermQualifier': PropertyTermQualifier,
                'PropertyTerm': PropertyTerm,
                'DatatypeQualifier': DatatypeQualifier,
                'RepresentationTerm': RepresentationTerm,
                'AssciatedObjectClassTermQualifier': AssciatedObjectClassTermQualifier,
                'AssociatedObjectClass': AssociatedObjectClass,
                'ReferencedObjectClassTermQualifier': ReferencedObjectClassTermQualifier,
                'ReferencedObjectClass': ReferencedObjectClass,
                'Type': Type,
                'Description': Description
            }
            csv_list.append(record)

    csv_list = sorted(csv_list, key=lambda x:x['module']+x['ObjectClassTermQualifier']+x['ObjectClassTerm']+x['num'])

    with open(csv_file, 'w') as f:
        writer = csv.DictWriter(f,csv_header)
        writer.writeheader()
        writer.writerows(csv_list)

    print(f'done. {csv_file}')