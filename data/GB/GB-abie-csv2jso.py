#!/usr/bin/env python3
#coding: utf-8
#
# convert GB/T 24589.1 abie csv to json
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
    in_file = dir+'/list-GB-abie.csv'
    out_file = dir+'/list-GB-abie-'+d.isoformat()+'.json'

    entity_list = []
    with open(in_file, newline='') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            Module = row['Module']
            Kind = row['Kind']
            Table = row['Table']
            Name = row['Name']
            Level = row['Level']
            DictionaryEntryName = row['DictionaryEntryName']
            Description = row['Description']
            ObjectClassTermQualifier = row['ObjectClassTermQualifier']
            ObjectClassTerm = row['ObjectClassTerm']
            entity = {
                'Module': Module,
                'Kind': Kind,
                'Table': Table,
                'Name': Name,
                'Level': Level,
                'DictionaryEntryName': DictionaryEntryName,
                'Description': Description,
                'ObjectClassTermQualifier': ObjectClassTermQualifier,
                'ObjectClassTerm': ObjectClassTerm
            }
            entity_list.append(entity)

    with open(out_file, 'w') as f:
        json.dump({'data': entity_list}, f, indent=4)

    print('done.')