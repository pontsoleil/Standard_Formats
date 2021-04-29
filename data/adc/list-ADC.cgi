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
# # Kind Table No. Name DictionaryEntryName Description ObjectClassTermQualifier ObjectClassTerm PropertyTermQualifier
# 1 2    3     4   5    6                   7           8                        9               10
# PropertyTerm RepresentationTermQualifier Representationterm AssociatedObjectClass Datatype Representation
# 11           12                          13                 14                    15       16 
# Level PK_REF RefField RefTable OccurrenceMin OccurrenceMax Enumeration RestrictionValue
# 17    18     19       20       21            22            23          24
cat ADC.tsv | awk -v k="${KIND}" -F'\t' 'BEGIN { n=0; }
{
  if (NR>1) {
    if (("ABIE"==k && "ABIE"==$2) || (""==k && "ABIE"!=$2)) {
      gsub(/[\n\r\\\"]/,"",$0)
      print "$.data[" n "].num",$1;
      print "$.data[" n "].Kind",$2;
      print "$.data[" n "].Table",$3;
      print "$.data[" n "].No",$4;
      if ($5!="") {
        print "$.data[" n "].Name",$5;
      } else {
        print "$.data[" n "].Name","";
      }
      if ($6!="") {
        print "$.data[" n "].DictionaryEntryName",$6;
      } else {
        print "$.data[" n "].DictionaryEntryName","";
      }
      if ($7!="") {
        print "$.data[" n "].Description",$7;
      } else {
        print "$.data[" n "].Description","";
      }
      if ($8!="") {print "$.data[" n "].ObjectClassTermQualifier",$8;}
      if ($9!="") {
        print "$.data[" n "].ObjectClassTerm",$9;
      } else {
        print "$.data[" n "].ObjectClassTerm","";
      }
      if ($10!="") {print "$.data[" n "].PropertyTermQualifier",$10;}
      if ($11!="") {print "$.data[" n "].PropertyTerm",$11;}
      if ($12!="") {print "$.data[" n "].DatatypeQualifier",$12;}
      if ($13!="") {print "$.data[" n "].RepresentationTerm",$13;}
      if ($14!="") {print "$.data[" n "].AssociatedObjectClass",$14;}
      if ($15!="") {
        print "$.data[" n "].Datatype",$15;
      } else {
        print "$.data[" n "].Datatype","";
      }
      if ($16!="") {
        print "$.data[" n "].Representation",$16;
      } else {
        print "$.data[" n "].Representation","";
      }
      if ($17!="") {
        print "$.data[" n "].Level",$17;
      } else {
        print "$.data[" n "].Level","";
      }
      if ($18!="") {print "$.data[" n "].PK_REF",$18;}
      if ($19!="") {print "$.data[" n "].RefField",$19;}
      if ($20!="") {print "$.data[" n "].RefTable",$20;}
      if ($21!="" && $22!="") {print "$.data[" n "].Occurrence",$21".."$22;}
      if ($23!="") {print "$.data[" n "].Enumeration",$23;}
      if ($24!="") {print "$.data[" n "].RestrictionValue",$24;}
      n=n+1;
    }
  }
}' | makrj.sh > $Tmp-json #| sed "s/^\(\"[^\":,]*\":\),/\1null,/" > $Tmp-json
# === HTTP response ==================================================
cat <<HTTP_RESPONSE
Content-Type: application/json

$(cat $Tmp-json)
HTTP_RESPONSE
rm $Tmp-*
rm log/${0##*/}.$$.*
exit 0
# list-ADC.cgi
