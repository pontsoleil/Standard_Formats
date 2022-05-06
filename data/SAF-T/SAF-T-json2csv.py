#!/usr/bin/env python3
#coding: utf-8
#
# convert ADC entity json to csv
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
    abie_file = dir+'/list-SAF-abie.json'
    entity_file = dir+'/list-SAF-entity.json'
    csv_file = dir+'/list-SAF.csv'

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
    csv_list = []
    f = open(abie_file, 'r')
    abie_json = json.load(f)
    data = abie_json['data']
    for l in data:
        num = l['num']
        Module = l['Module']
        Kind = l['Kind']
        Table = l['Table']
        Name = l['Name']
        Level = l['Level']
        DictionaryEntryName = l['DictionaryEntryName']
        Description = l['Description']
        ObjectClassTermQualifier = l['ObjectClassTermQualifier']
        ObjectClassTerm = l['ObjectClassTerm']
        Description = l['Description']
        csv_list.append([
            num,Module,Kind,Table,
            Name,Level,'','',DictionaryEntryName,Description,
            ObjectClassTermQualifier,ObjectClassTerm,
            '','','','','','','',''])

    f = open(entity_file, 'r')
    entity_json = json.load(f)
    data = entity_json['data']
    for l in data:
        num = l['num']
        Module = l['Module']
        Kind = l['Kind']
        Name = l['Name']
        Level = l['Level']
        Card = l['Card']
        Type = l['Type']
        Description = l['Description']
        ObjectClassTermQualifier = l['ObjectClassTermQualifier']
        ObjectClassTerm = l['ObjectClassTerm']
        DatatypeQualifier = l['DatatypeQualifier']
        RepresentationTerm = l['RepresentationTerm']
        AssociatedObjectClassTermQualifier = l['AssociatedObjectClassTermQualifier']
        AssociatedObjectClass = l['AssociatedObjectClass']
        ReferencedObjectClassTermQualifier = l['ReferencedObjectClassTermQualifier']
        ReferencedObjectClass = l['ReferencedObjectClass']
        csv_list.append([
            num,Module,Kind,Table,
            Name,Level,Card,Type,DictionaryEntryName,Description,
            ObjectClassTermQualifier,ObjectClassTerm,
            DatatypeQualifier,RepresentationTerm,
            AssociatedObjectClassTermQualifier,AssociatedObjectClass,
            ReferencedObjectClassTermQualifier,ReferencedObjectClass,
            Type,Description
        ])

    csv_list = sorted(csv_list, key=lambda x:x[1]+x[10]+x[11]+x[0])

    with open(csv_file, 'w') as f:
        writer = csv.writer(f)
        writer.writerow(['num','Module','Kind','Table',
            'Name','Level','Card','Type','DictionaryEntryName','Description',
            'ObjectClassTermQualifier','ObjectClassTerm',
            'DatatypeQualifier','RepresentationTerm',
            'AssociatedObjectClassTermQualifier','AssociatedObjectClass',
            'ReferencedObjectClassTermQualifier','ReferencedObjectClass','Type','Description'])
        for l in csv_list:
            writer.writerow(l)

    print(f'done. {csv_file}')
