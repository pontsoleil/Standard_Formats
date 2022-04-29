#!/usr/bin/env python3
#coding: utf-8
#
# convert GB/T 24589.1 entity csv to json
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
    in_file = dir+'/list-GB-entity.csv'
    out_file = dir+'/list-GB-entity-'+d.isoformat()+'.json'

    # num	module	kind	table	no	name	level	DT	length	DEN	Desc	OclassQ	Oclass	P	R	AQ	A
    entity_list = []
    with open(in_file, newline='') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            num = int(row['num'])
            module = row['module']
            kind = row['kind']
            table = row['table']
            no = int(row['no'])
            name = row['name']
            level = int(row['level'])
            DT = row['DT']
            length = int(row['length'])
            DEN = row['DEN']
            Desc = row['Desc']
            OclassQ = row['OclassQ']
            Oclass = row['Oclass']
            P = row['P']
            R = row['R']
            AQ = row['AQ']
            A = row['A']
            entity = {
                'num': num,
                'Module': module,
                'Kind': kind,
                'Table': table,
                'No': no,
                'Name': name,
                'Level': level,
                'DataType': DT,
                'Length': length,
                'DictionaryEntryName': DEN,
                'Description': Desc,
                'ObjectClassTermQualifier': OclassQ,
                'ObjectClassTerm': Oclass,
                'PropertyTerm': P,
                'RepresentationTerm': R,
                'AssociatedObjectClassTermQualifier': AQ,
                'AssociatedObjectClass': A
            }
            entity_list.append(entity)

    with open(out_file, 'w') as f:
        json.dump({'data': entity_list}, f, indent=4)

    print('done.')