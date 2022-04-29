#!/usr/bin/env python3
#coding: utf-8
#
# convert TS5409 entity json to csv
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

def file_path(pathname):
    if '/' == pathname[0:1]:
        return pathname
    else:
        dir = os.path.dirname(__file__)
        new_path = os.path.join(dir, pathname)
        return new_path

if __name__ == '__main__':
    dir = os.path.dirname(__file__)
    in_file = dir+'/list-TS5409-entity.json'
    out_file = dir+'/list-TS5409-entity.csv'

    csv_list = []
    f = open(in_file, 'r')
    entity_json = json.load(f)
    data = entity_json['data']
    for l in data:
        Module = l['Module']
        num = l['num']
        Kind = l['Kind']
        Table = l['Table']
        No = l['No']
        BusinessTerm = l['BusinessTerm']
        DictionaryEntryName = l['DictionaryEntryName']
        Description = l['Description']
        if 'ObjectClassTermQualifier' in l:
            ObjectClassTermQualifier = l['ObjectClassTermQualifier']
        else:
            ObjectClassTermQualifier = ''
        ObjectClassTerm = l['ObjectClassTerm']
        if 'PropertyTerm' in l: PropertyTerm = l['PropertyTerm']
        else: PropertyTerm = ''
        if 'RepresentationTerm' in l: RepresentationTerm = l['RepresentationTerm']
        else: RepresentationTerm = ''
        if 'Datatype' in l: Datatype = l['Datatype']
        else: Datatype = ''
        if 'Representation' in l: Representation = l['Representation']
        else: Representation = ''
        if 'RelationObjectClassTermQualifier' in l:
            RelationObjectClassTermQualifier = l['RelationObjectClassTermQualifier']
        else: RelationObjectClassTermQualifier = ''
        if 'RelationObjectClassTerm' in l:
            RelationObjectClassTerm = l['RelationObjectClassTerm']
        else: RelationObjectClassTerm = ''
        if 'Level' in l: Level = l['Level']
        else: Level = ''
        if 'PK_REF' in l: PK_REF = l['PK_REF']
        else: PK_REF = ''
        if 'ATTRIBUTE' in l: ATTRIBUTE = l['ATTRIBUTE']
        else: ATTRIBUTE = ''
        if 'DOMAIN' in l: DOMAIN = l['DOMAIN']
        else: DOMAIN = ''

        csv_list.append([Module,num,Kind,Table,No,BusinessTerm,DictionaryEntryName,Description,ObjectClassTermQualifier,ObjectClassTerm,PropertyTerm,RepresentationTerm,Datatype,Representation,RelationObjectClassTermQualifier,RelationObjectClassTerm,Level,PK_REF,ATTRIBUTE,DOMAIN])

    with open(out_file, 'w') as f:
        writer = csv.writer(f)
        writer.writerow(['Module','num','Kind','Table','No','BusinessTerm','DictionaryEntryName','Description','ObjectClassTermQualifier','ObjectClassTerm','PropertyTerm','RepresentationTerm','Datatype','Representation','RelationObjectClassTermQualifier','RelationObjectClassTerm','Level','PK_REF','ATTRIBUTE','DOMAIN'])
        for l in csv_list:
            writer.writerow(l)

    print('done.')
