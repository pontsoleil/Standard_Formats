#!/usr/bin/env python3
#coding: utf-8
#
# convert ADC entity csv to json
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
    in_file = dir+'/list-ADC-entity.csv'
    out_file = dir+'/list-ADC-entity-'+d.isoformat()+'.json'

    csv_header = ['Module','num','Kind','Table','No','Name','DictionaryEntryName','Description','XBRLGL','ObjectClassTermQualifier','ObjectClassTerm','PropertyTerm','RepresentationTerm','Datatype','Representation','AssociatedObjectClassTermQualifier','AssociatedObjectClass','Level','PK_REF','RefField','RefTable','Occurrence']
    entity_list = []
    with open(in_file, newline='') as csvfile:
        reader = csv.DictReader(csvfile,csv_header)
        next(reader, None)  # skip the headers
        for row in reader:
            num = int(row['num'])
            Module = row['Module']
            num = row['num']
            Kind = row['Kind']
            Table = row['Table']
            No = row['No']
            Name = row['Name']
            DictionaryEntryName = row['DictionaryEntryName']
            Description = row['Description']
            XBRLGL = row['XBRLGL']
            ObjectClassTermQualifier = row['ObjectClassTermQualifier']
            ObjectClassTerm = row['ObjectClassTerm']
            PropertyTerm = row['PropertyTerm']
            if 'RepresentationTerm' in row: RepresentationTerm = row['RepresentationTerm']
            else: RepresentationTerm = ''
            if 'Datatype' in row: Datatype = row['Datatype']
            else: Datatype = ''
            if 'Representation' in row: Representation = row['Representation']
            else: Representation = ''
            if 'AssociatedObjectClassTermQualifier' in row:
                AssociatedObjectClassTermQualifier = row['AssociatedObjectClassTermQualifier']
            else: AssociatedObjectClassTermQualifier = ''
            if 'AssociatedObjectClass' in row:
                AssociatedObjectClass = row['AssociatedObjectClass']
            else: AssociatedObjectClass = ''
            Level = row['Level']
            if 'PK_REF' in row: PK_REF = row['PK_REF']
            else: PK_REF = ''
            if 'RefField' in row: RefField = row['RefField']
            else: RefField = ''
            if 'RefTable' in row: RefTable = row['RefTable']
            else: RefTable = ''
            Occurrence = row['Occurrence']
            entity = {
                'Module': Module,
                'num': num,
                'Kind': Kind,
                'Table': Table,
                'No': No,
                'Name': Name,
                'DictionaryEntryName': DictionaryEntryName,
                'Description': Description,
                'XBRLGL': XBRLGL,
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
                'RefField': RefField,
                'RefTable': RefTable,
                'Occurrence': Occurrence
            }
            entity_list.append(entity)

    with open(out_file, 'w') as f:
        json.dump({'data': entity_list}, f, indent=4)

    print('done.')