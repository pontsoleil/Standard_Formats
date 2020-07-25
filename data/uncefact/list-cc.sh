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
# UniqueID Kind ShortName ParentID ObjectClassTerm OccurrenceMin OccurrenceMax Definition PropertyTerm RepresentationTerm AssociatedObjectClass BusinessTerm UsageRule
cat ccl_20a_cc.tsv | awk -F'\t' 'BEGIN { n=0; }
{
  sub ("unbounded", "*");
  print "$.data[" n "].num",n;
  print "$.data[" n "].UniqueID",$1;
  print "$.data[" n "].Kind",$2;
  print "$.data[" n "].ShortName",$3;
  print "$.data[" n "].ParentID",$4;
  print "$.data[" n "].ObjectClassTerm",$5;
  print "$.data[" n "].Occurrence",$6".."$7;
  print "$.data[" n "].Definition",$8;
  print "$.data[" n "].PropertyTerm",$9;
  print "$.data[" n "].RepresentationTerm",$10;
  print "$.data[" n "].AssociatedObjectClass",$11;
  print "$.data[" n "].BusinessTerm",$12;
  print "$.data[" n "].UsageRule",$13;
  n=n+1;
}' |
makrj.sh | sed "s/^\(\"[^\":,]*\":\),/\1null,/" > list-cc.json
# --------------------------------------------------------------------
rm $Tmp-*
rm log/${0##*/}.$$.*
exit 0
# list-cc.sh