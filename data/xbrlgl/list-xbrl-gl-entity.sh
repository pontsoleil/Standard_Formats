#!/bin/sh
# === Initialize shell environment ===================================
set -euvx
# -e  Exit immediately if a command exits with a non-zero status.
# -u  Treat unset variables as an error when substituting.
# -v  Print shell input lines as they are read.
# -x  Print commands and their arguments as they are executed.
export LC_ALL=C
type command >/dev/null 2>&1 && type getconf >/dev/null 2>&1 &&
export PATH=".:./bin:../bin:$(command -p getconf PATH)${PATH+:}${PATH-}"
export UNIX_STD=2003  # to make HP-UX conform to POSIX
# escape space
VT=$( printf '\v' )
# === temporary file prefix ==========================================
Tmp=/tmp/${0##*/}.$$
# === Log ============================================================
exec 2>log/${0##*/}.$$.log
# --------------------------------------------------------------------
# num,Module,Kind,#,BusinessTerm,element,DictionaryEntryName,Description,datatype,objectClassTermQualifier,ObjectClassTerm,PropertyTermQualifier,
# 1   2      3    4 5            6       7                   8           9        10                       11              12
# PropertyTerm,DatatypeQualifier,RepresentationTerm,AssociatedObjectClassTermQualifier,AssociatedObjectClass
# 13           14                15                 16                                 17
cat xbrl-gl.tsv | awk -F'\t' 'BEGIN { n=0; }
{
  if (NR>1 && $3!="" && "ABIE"!=$3) {
    gsub(/[\n\r\\\"]/,"",$0)
    print "$.data[" n "].num",n;
    print "$.data[" n "].No",$1;
    print "$.data[" n "].Module",$2;
    print "$.data[" n "].Kind",$3;
    print "$.data[" n "].seq",$4;
    if ($5!="") {
      print "$.data[" n "].Name",$5;
    } else {
      print "$.data[" n "].Name","";
    }
    if ($6!="") {
      print "$.data[" n "].element",$6;
    } else {
      print "$.data[" n "].element","";
    }
    if ($7!="") {
      print "$.data[" n "].DictionaryEntryName",$7;
    } else {
      print "$.data[" n "].DictionaryEntryName","";
    }
    if ($8!="") {
      print "$.data[" n "].Description",$8;
    } else {
      print "$.data[" n "].Description","";
    }
    if ($9!="") {
      print "$.data[" n "].datatype",$9;
    } else {
      print "$.data[" n "].datatype","";
    }
    if ($10!="") {print "$.data[" n "].ObjectClassTermQualifier",$10;}
    if ($11!="") {
      print "$.data[" n "].ObjectClassTerm",$11;
    } else {
      print "$.data[" n "].ObjectClassTerm","";
    }
    if ($12!="") {print "$.data[" n "].PropertyTermQualifier",$12;}
    if ($13!="") {print "$.data[" n "].PropertyTerm",$13;}
    if ($14!="") {print "$.data[" n "].DatatypeQualifier",$14;}
    if ($15!="") {print "$.data[" n "].RepresentationTerm",$15;}
    if ($16!="") {print "$.data[" n "].AssociatedObjectClassTermQualifier",$16;}
    if ($17!="") {print "$.data[" n "].AssociatedObjectClass",$17;}
  }
  n=n+1;
}' | makrj.sh > list-xbrlgl-entity.json #| sed "s/^\(\"[^\":,]*\":\),/\1null,/" > $Tmp-json
# --------------------------------------------------------------------
# rm $Tmp-*
rm log/${0##*/}.$$.*
exit 0
# list-xbrlgl-entity.sh
