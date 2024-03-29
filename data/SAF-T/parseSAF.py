#!/usr/bin/env python3
#coding: utf-8
#
# parse SAF-T XML Schema and produce TSV
# 
# This software was designed by SAMBUICHI,Nobuyuki (Sambuichi Professional Engineers Office)
# and it was written by SAMBUICHI,Nobuyuki (Sambuichi Professional Engineers Office).
#
# ==== MIT License ====
# 
# Copyright (c) 2021-2022 SAMBUICHI Nobuyuki (Sambuichi Professional Engineers Office)
# 
# Permission is hereby granted,free of charge,to any person obtaining a copy
# of this software and associated documentation files (the "Software"),to deal
# in the Software without restriction,including without limitation the rights
# to use,copy,modify,merge,publish,distribute,sublicense,and/or sell
# copies of the Software,and to permit persons to whom the Software is
# furnished to do so,subject to the following conditions:
# 
# The above copyright notice and this permission notice shall be included in all
# copies or substantial portions of the Software.
# 
# THE SOFTWARE IS PROVIDED "AS IS",WITHOUT WARRANTY OF ANY KIND,EXPRESS OR
# IMPLIED,INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,DAMAGES OR OTHER
# LIABILITY,WHETHER IN AN ACTION OF CONTRACT,TORT OR OTHERWISE,ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
# SOFTWARE.
import csv
from collections import OrderedDict
import re
import json
import sys 
import os
import argparse

def file_path(pathname):
	if '/' == pathname[0:1]:
		return pathname
	else:
		dir = os.path.dirname(__file__)
		new_path = os.path.join(dir,pathname)
		return new_path

if __name__ == '__main__':

  in_file = file_path('SAF-T_Schema_v_2.00ABIE.txt')
  out_file = file_path('SAF-T_Schema_v_2.00ABIE.csv')
  in_xsd = file_path('SAF-T_Schema_v_2.00ABIE.xsd')
  key_file = file_path('key.txt')
  keyref_file = file_path('keyref.txt')

  header = [
    'kind',
    'level',
    'name',
    '@name',
    'parent',
    '@base',
    '@type',
    'restriction@base',
    'enumeration@value',
    '@minOccurs',
    '@maxOccurs',
    '@desc',
    'path',
    'refpath',
    'any@namespace',
    'any@minOccurs',
    'any@desc',
    'any@namespace',
    'any@minOccurs',
    'any@desc'
  ]
  simpleType = {
    'SAFmonetaryType',
    'SAFexchangerateType',
    'SAFquantityType',
    'SAFweightType',
    'SAFcodeType',
    'SAFshorttextType',
    'SAFmiddle1textType',
    'SAFmiddle2textType',
    'SAFlongtextType',
    'ISOCountryCode',
    'ISOCurrencyCode',
    'date',
    'decimal'
  }
  complexType = {}

  keyMap = {}
  key = []
  with open(key_file) as f:
    for s_line in f:
      s_list = s_line.split(' ')
      id = s_list[0]
      path = re.sub('\n','',s_list[1])
      path = f'AuditFile/{path}'
      keyMap[id] = path
      key.append(path)

  keyrefMap = {}
  keyref = []
  with open(keyref_file) as f:
    for s_line in f:
      s_list = s_line.split(' ')
      id = s_list[0]
      ref = s_list[1]
      path = re.sub('\n','',s_list[2])
      path = f'AuditFile/{path}'
      keyrefMap[path] = ref
      keyref.append(path)

  map = {}
  with open(in_file) as f:
    for s_line in f:
      head = s_line[:s_line.index(' ')]
      d = head[1:].split('/')
      level = len(d) - 2
      value =  s_line[s_line.index(' ')+1:-1]
      path = '/'.join(d[:-1])
      name =''
      parent = ''
      if len(d) > 1:
        name = d[-2]
        if len(d) > 2:
          parent = d[-3]
      attr = d[-1]
      if not path in map:
        map[path] = {}
      map[path][attr] = value
      kind = ''
      if 0==level:
        kind = 'ABIE'
      elif '@type'==attr:
        if value in simpleType:
          kind = 'BBIE'
        else:
          kind = 'ASBIE'
      elif '@base'==attr:
        if len(value) > 0 and not value in simpleType:
          kind='ASBIE'
      if path in key:
        kind = 'IDBIE'
      if path in keyref:
        kind = 'RFBIE'
        refid = keyrefMap[path]
        refpath = keyMap[refid]
        map[path]['refpath'] = refpath
      if kind:
        map[path]['kind'] = kind
      if level:
        map[path]['level'] = level
      if parent:
        map[path]['parent'] = parent
      if name:
        map[path]['name'] = name
      map[path]['path'] = path
      if '@minOccurs'==attr and '0'==map[path]['@minOccurs']:
        map[path]['@minOccurs']="zero"
  
  for path,data in map.items():
    if not 'kind' in data:
      data['kind'] = 'ASBIE'

  records = []
  records.append(header)
  for path,data in map.items():
    record = []
    for k in header:
      if k in data:
        record.append(data[k])
      else:
        record.append('')
    records.append(record)
  
  # print(records)
  with open(out_file, 'w') as f:
    writer = csv.writer(f)
    writer.writerows(records)

  print('** END')


