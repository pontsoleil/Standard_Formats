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
METHOD=${REQUEST_METHOD:-''}
echo ${METHOD} >&2
if [ 'GET' = "$METHOD" ]; then
  #GET
  printf '%s' "${QUERY_STRING:-''}" | cgi-name > $Tmp-cgivars
  kind=$(nameread kind $Tmp-cgivars)
  module=$(nameread m $Tmp-cgivars)
  kind=$(echo $kind| tr ' ' '_')
  KIND=${kind:-''}
  MODULE=${module:-''}
  echo ${KIND} ${MODULE} >&2
fi
# Module Kind Table No Name Level DataType Length XBRLGL ReferencedTable DictionaryEntryName
# 1      2    3     4  5    6     7        8      9      10              11
# Description ObjectClassTermQualifier ObjectClassTerm PropertyTermQualifier PropertyTerm
# 12          13                       14              15                    16
# DatatypeQualifier RepresentationTerm AssociatedObjectClass
# 17                18                 19
cat ADS.tsv | awk -v k="${KIND}" -v m="${MODULE}" -F'\t' 'BEGIN { n=0; }
{
  if (NR>1) {
    if (("ABIE"==k && "ABIE"==$2) || (""==k && "ABIE"!=$2 && (""==m || m==$1 || "Core"==$1 || "Base"==$1))) {
      gsub(/[\n\r\\\"]/,"",$0)
      print "$.data[" n "].Module",$1;
      print "$.data[" n "].Kind",$2;
      if ($3!="") {
        print "$.data[" n "].Table",$3;
      } else {
        print "$.data[" n "].Table","";
      }
      print "$.data[" n "].No",$4;
      if ($5!="") {
        print "$.data[" n "].Name",$5;
      } else {
        print "$.data[" n "].Name","";
      }
      if ($6!="") {
        print "$.data[" n "].Level",$6;
      } else {
        print "$.data[" n "].Level","";
      }
      if ($7!="") {
        print "$.data[" n "].DataType",$7;
      }
      if ($8!="") {
        print "$.data[" n "].Length",$8;
      }
      if ($9!="") {
        print "$.data[" n "].XBRLGL",$9;
      }
      if ($11!="") {
        print "$.data[" n "].DictionaryEntryName",$11;
      }
      if ($12!="") {
        print "$.data[" n "].Description",$12;
      } else {
        print "$.data[" n "].Description","";
      }
      if ($13!="") {
        print "$.data[" n "].ObjectClassTermQualifier",$13;
      }
      if ($14!="") {
        print "$.data[" n "].ObjectClassTerm",$14;
      } else {
        print "$.data[" n "].ObjectClassTerm","";
      }
      if ($15!="") {
        print "$.data[" n "].PropertyTermQualifier",$15;
      }
      if ($16!="") {
        print "$.data[" n "].PropertyTerm",$16;
      }
      if ($17!="") {
        print "$.data[" n "].DatatypeQualifier",$17;
      }
      if ($18!="") {
        print "$.data[" n "].RepresentationTerm",$18;
      }
      if ($19!="") {
        print "$.data[" n "].AssociatedObjectClass",$19;
      }
      n=n+1;
    }
  }
}' | makrj.sh > $Tmp-json #| sed "s/^\(\"[^\":,]*\":\),/\1null,/" > $Tmp-json
# === HTTP response ==================================================
cat <<HTTP_RESPONSE
Content-Type: application/json

$(cat $Tmp-json)
HTTP_RESPONSE
# rm $Tmp-*
# rm log/${0##*/}.$$.*
exit 0
# list-ADS.cgi