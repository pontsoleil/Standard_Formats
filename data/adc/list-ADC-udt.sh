#!/bin/sh
# === Initialize shell environment ===================================
set -euvx
# -e  Exit immediately if a command exits with a non-zero status.
# -u  Treat unset variables as an error when substituting.
# -v  Print shell input lines as they are read.
# -x  Print commands and their arguments as they are executed.
export LC_ALL=C
type command >/dev/null 2>&1 && type getconf >/dev/null 2>&1 &&
export PATH=".:./bin:$(command -p getconf PATH)${PATH+:}${PATH-}"
export UNIX_STD=2003  # to make HP-UX conform to POSIX
# escape space
VT=$( printf '\v' )
# === temporary file prefix ==========================================
Tmp=/tmp/${0##*/}.$$
# === Log ============================================================
exec 2>log/${0##*/}.$$.log
# --------------------------------------------------------------------
# UNID Kind DictionaryEntryName Definition ObjectClassTermQualifier ObjectClassTerm PropertyTerm
# 1    2    3                   4          5                        6               7
# DatatypeQualifier RepresentationTerm sequence OccurrenceMin OccurrenceMax	
# 8                 9                  10       11            12
cat ADC_qDT.tsv | awk -F'\t' 'BEGIN { n=0; }
{
  if (NR>1 && ""!=$2 && "END"!=$2 && ""!=$3 ) {
    print "$.data[" n "].Kind",$2;
    if ("DT"==$2) {
      datatype=$3;
      unid=$1;
      i=0;
      print "$.data[" n "].UNID",$1;
    }
    if ("CC"==$2) {
      print "$.data[" n "].UNID",unid"-CC";
    }
    if ("SC"==$2) {
      i=i+1;
      print "$.data[" n "].UNID",unid"-SC"i;
    }
    print "$.data[" n "].DataType",datatype;
    if ($3!="") {print "$.data[" n "].DictionaryEntryName",$3;}
    if ($4!="") {
      print "$.data[" n "].Definition",$4;
    } else {
      print "$.data[" n "].Definition",""; 
    }
    if ($5!="") {print "$.data[" n "].ObjectClassTermQualifier",$5;}
    if ($6!="") {
      print "$.data[" n "].ObjectClassTerm",$6;
    } else {
      print "$.data[" n "].ObjectClassTerm","";
    }
    if ($7!="") {
      print "$.data[" n "].PropertyTerm",$7;
    } else {
      print "$.data[" n "].PropertyTerm","";
    }
    if ($8!="") {
      print "$.data[" n "].DatatypeQualifier",$8;
    } else {
      print "$.data[" n "].DatatypeQualifier","";
    }
    if ($9!="") {
      print "$.data[" n "].RepresentationTerm",$9;
    } else {
      print "$.data[" n "].RepresentationTerm","";
    }
    if ($10!="") {print "$.data[" n "].sequence",$10;}
    if ($11!="" && $12!="") {print "$.data[" n "].Occurrence",$11".."$12;}
    n=n+1;
  }
}' | makrj.sh | sed "s/^\(\"[^\":,]*\":\),/\1null,/" > list-ADC-udt.json
# --------------------------------------------------------------------
rm $Tmp-*
rm log/${0##*/}.$$.*
exit 0
# list-ADC-udt.sh