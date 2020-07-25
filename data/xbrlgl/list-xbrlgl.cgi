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
  kind=$(echo $kind| tr ' ' '_')
  KIND=${kind:-''}
  echo ${KIND} >&2
fi
# # Kind seq Name DictionaryEntryName Description ObjectClassTermQualifier ObjectClassTerm
# 1 2    3   4    5                   6           7                        8
# PropertyTermQualifier PropertyTerm DatatypeQualifier RepresentationTerm AssociatedObjectClass datatype
# 9                     10           11                12                 13                    14
cat xbrlgl.tsv | awk -v k="${KIND}" -F'\t' 'BEGIN { n=0; }
{
  if (NR>1) {
    if (("ABIE"==k && "ABIE"==$2) || (""==k && "ABIE"!=$2)) {
      gsub(/[\n\r\\\"]/,"",$0)
      print "$.data[" n "].num",$1;
      print "$.data[" n "].Kind",$2;
      print "$.data[" n "].No",$3;
      if ($4!="") {
        print "$.data[" n "].Name",$4;
      } else {
        print "$.data[" n "].Name","";
      }
      if ($5!="") {
        print "$.data[" n "].DictionaryEntryName",$5;
      } else {
        print "$.data[" n "].DictionaryEntryName","";
      }
      if ($6!="") {
        print "$.data[" n "].Description",$6;
      } else {
        print "$.data[" n "].Description","";
      }
      if ($7!="") {print "$.data[" n "].ObjectClassTermQualifier",$7;}
      if ($8!="") {
        print "$.data[" n "].ObjectClassTerm",$8;
      } else {
        print "$.data[" n "].ObjectClassTerm","";
      }
      if ($9!="") {print "$.data[" n "].PropertyTermQualifier",$9;}
      if ($10!="") {print "$.data[" n "].PropertyTerm",$10;}
      if ($11!="") {print "$.data[" n "].DatatypeQualifier",$11;}
      if ($12!="") {print "$.data[" n "].RepresentationTerm",$12;}
      if ($13!="") {print "$.data[" n "].AssociatedObjectClass",$13;}
      if ($14!="") {
        print "$.data[" n "].datatype",$14;
      } else {
        print "$.data[" n "].datatype","";
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
# list-xbrlgl.cgi