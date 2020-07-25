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
# === temporary file prefix ==========================================
Tmp=/tmp/${0##*/}.$$
# === Log ============================================================
exec 2>log/${0##*/}.$$.log
# --------------------------------------------------------------------
# UNID UniqueID Kind DictionaryEntryName Definition ObjectClassTermQualifier ObjectClassTerm PropertyTerm DatatypeQualifier
# $1   $2       $3   $4                  $5         $6                       $7              $8           $9
#  RepresentationTerm Occurrence Enumeration RestrictionValue RefCRID
#  $10                $11 .. $12 $13         $14              $15
cat ccl_20a_mqdt_compt.tsv |
awk -F'\t' '
BEGIN { n=0; }
{
  sub ("unbounded", "*");
  print "$.data[" n "].UNID",$1;
  print "$.data[" n "].UniqueID",$2;
  print "$.data[" n "].Kind",$3;
  print "$.data[" n "].DictionaryEntryName",$4;
  print "$.data[" n "].Definition",$5;
  print "$.data[" n "].ObjectClassTermQualifier",$6;
  print "$.data[" n "].ObjectClassTerm",$7;
  print "$.data[" n "].PropertyTerm",$8;
  print "$.data[" n "].DatatypeQualifier",$9;
  print "$.data[" n "].RepresentationTerm",$10;
  print "$.data[" n "].Occurrence",$11".."$12;
  print "$.data[" n "].Enumeration",$13;
  print "$.data[" n "].RestrictionValue",$14;
  n=n+1;
}' | makrj.sh | sed "s/^\(\"[^\":,]*\":\),/\1null,/" > $Tmp-data
# === HTTP response ==================================================
cat <<HTTP_RESPONSE
Content-Type: application/json

$(cat $Tmp-data)
HTTP_RESPONSE
# rm $Tmp-*
# rm log/${0##*/}.$$.*
exit 0
# list-qdt.cgi