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
# Module num Kind Table No Name DictionaryEntryName Description XBRLGL
# 1      2   3    4     5  6    7                   8           9      
# ObjectClassTermQualifier ObjectClassTerm PropertyTermQualifier PropertyTerm
# 10                       11              12                    13
# DatatypeQualifier Representationterm AssociatedObjectClassTermQualifier AssociatedObjectClass
# 14                15                 16                                 17
# Datatype Representation Level Key RefField RefTable OccurrenceMin OccurrenceMax
# 18       19             20    21  22       23       24            25
cat ADC.tsv | awk -F'\t' 'BEGIN { n=0; }
{
  if (NR>1 && "ABIE"==$3) {
    gsub(/[\n\r\\\"]/,"",$0)
    print "$.data[" n "].module",$1;
    print "$.data[" n "].num",$2;
    print "$.data[" n "].Kind",$3;
    print "$.data[" n "].Table",$4;
    if ($6!="") {
      print "$.data[" n "].Name",$6;
    } else {
      print "$.data[" n "].Name","";
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
    if ($10!="") {print "$.data[" n "].ObjectClassTermQualifier",$10;}
    if ($11!="") {
      print "$.data[" n "].ObjectClassTerm",$11;
    } else {
      print "$.data[" n "].ObjectClassTerm","";
    }
    n=n+1;
  }
}' | makrj.sh > list-ADC-abie.json #| sed "s/^\(\"[^\":,]*\":\),/\1null,/" > $Tmp-json
# --------------------------------------------------------------------
rm $Tmp-*
rm log/${0##*/}.$$.*
exit 0
# list-ADC-abie.sh
