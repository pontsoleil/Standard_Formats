#!/usr/bin/env python3
#coding: utf-8
#
# convert GB/T 24589.1 entity json to csv
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
    in_file = dir+'/list-GB-entity.json'
    out_file = dir+'/list-GB-entity.csv'

    csv_list = []
    f = open(in_file, 'r')
    entity_json = json.load(f)
    data = entity_json['data']
    for l in data:
        num = l['num']
        module = l['Module']
        kind = l['Kind']
        table = l['Table']
        no = l['No']
        name = l['Name']
        level = l['Level']
        DT = l['DataType']
        length = l['Length']
        DEN = l['DictionaryEntryName']
        Desc = l['Description']
        if 'ObjectClassTermQualifier' in l:
            OclassQ = l['ObjectClassTermQualifier']
        else: OclassQ = ''
        if 'ObjectClassTerm' in l:
            Oclass = l['ObjectClassTerm']
        else: Oclass = ''
        if 'PropertyTerm' in l:
            P = l['PropertyTerm']
        else: P = ''
        if 'RepresentationTerm' in l:
            R = l['RepresentationTerm']
        else: R = ''
        if 'AssociatedObjectClassTermQualifier' in l:
            AQ = l['AssociatedObjectClassTermQualifier']
        else: AQ = ''
        if 'AssociatedObjectClass' in l:
            A = l['AssociatedObjectClass']
        else: A = ''
        csv_list.append([num,module,kind,table,no,name,level,DT,length,DEN,Desc,OclassQ,Oclass,P,R,AQ,A])

    with open(out_file,'w') as f:
        writer = csv.writer(f)
        writer.writerow(['num','module','kind','table','no','name','level','DT','length','DEN','Desc','OclassQ','Oclass','P','R','AQ','A'])
        for l in csv_list:
            writer.writerow(l)

    print('done.')