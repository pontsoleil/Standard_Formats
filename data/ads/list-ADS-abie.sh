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
# Module # Kind Table No Name Level DataType Length XBRLGL ReferencedTable DictionaryEntryName
# 1      2 3    4     5  6    7     8        9      10     11              12
# Description ObjectClassTermQualifier ObjectClassTerm PropertyTermQualifier PropertyTerm
# 13          14                       15              16                    17
# DatatypeQualifier Representationterm AssociatedObjectClassTermQualifier AssociatedObjectClass
# 18                19                 20                                 21
cat ADS.tsv | awk -F'\t' 'BEGIN { n=0; }
{
  if (NR>1 && "ABIE"==$3) {
    gsub(/[\n\r]/,"",$0);
    gsub(/\"\"/,"\\\"",$0);
    gsub(/\"/,"'\''",$0);
    print "$.data[" n "].Module",$1;
    print "$.data[" n "].Kind",$3;
    if ($4!="") {
      print "$.data[" n "].Table",$4;
    } else {
      print "$.data[" n "].Table","";
    }
    if ($6!="") {
      print "$.data[" n "].Name",$6;
    } else {
      print "$.data[" n "].Name","";
    }
    if ($7!="") {
      print "$.data[" n "].Level",$7;
    } else {
      print "$.data[" n "].Level","";
    }
    if ($10!="") {
      print "$.data[" n "].XBRLGL",$10;
    }
    if ($12!="") {
      print "$.data[" n "].DictionaryEntryName",$12;
    }
    if ($13!="") {
      print "$.data[" n "].Description",$13;
    } else {
      print "$.data[" n "].Description","";
    }
    if ($14!="") {
      print "$.data[" n "].ObjectClassTermQualifier",$14;
    }
    if ($15!="") {
      print "$.data[" n "].ObjectClassTerm",$15;
    } else {
      print "$.data[" n "].ObjectClassTerm","";
    }
    n=n+1;
  }
}' | makrj.sh > list-ADS-abie.json
# rm $Tmp-*
# rm log/${0##*/}.$$.*
exit 0
# list-ADS-abie.sh