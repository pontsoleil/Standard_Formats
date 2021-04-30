#!/bin/sh
# === Initialize shell environment ===================================
set -euvx
# -e  Exit immediately if a command exits with a non-zero status.
# -u  Treat unset variables as an error when substituting.
# -v  Print shell input lines as they are read.
# -x  Print commands and their arguments as they are executed.
export LC_ALL=C
type command >/dev/null 2>&1 && type getconf >/dev/null 2>&1 &&
export PATH=".:./bin:./../bin:$(command -p getconf PATH)${PATH+:}${PATH-}"
export UNIX_STD=2003  # to make HP-UX conform to POSIX
# escape space
VT=$( printf '\v' )
# === temporary file prefix ==========================================
Tmp=/tmp/${0##*/}.$$
# === Log ============================================================
exec 2>log/${0##*/}.$$.log
# --------------------------------------------------------------------
# ENTITYNAME ATTRIBUTENAME DOMAINNAME # Module A/B/ID/RL/AS CC/BIE BusinessTerm DictionaryEntryName ObjectClassTQ ObjectClassTerm
# 1          2             3          4 5      6            7      8            9                   10            11
# PropertyTQ PropertyTerm DatatypeQualifier RepresentationTerm AssociateObjectClassTQ AssociateObjectClassTerm
# 12         13           14                15                 16                     17
# RelationObjectClassTQ RelationObjectClassTerm DESCRIPTION
# 18                    19                      20
cat TS5409.tsv | awk -F'\t' 'BEGIN { n=0; }
{ print "$.data[" n "].ENTITY",$1;
  print "$.data[" n "].ATTRIBUTE",$2;
  print "$.data[" n "].DOMAIN",$3;
  print "$.data[" n "].seq",$4;
  print "$.data[" n "].module",$5;
  print "$.data[" n "].kind",$6;
  print "$.data[" n "].ccl",$7;
  print "$.data[" n "].BT",$8;
  print "$.data[" n "].DEN",$9;
  print "$.data[" n "].ObjectClassTQ",$10;
  print "$.data[" n "].ObjectClassTerm",$11;
  print "$.data[" n "].PropertyTQ",$12;
  print "$.data[" n "].PropertyTerm",$13;
  print "$.data[" n "].DatatypeQualifiry",$14;
  print "$.data[" n "].RepresentationTerm",$15;
  print "$.data[" n "].AssociateObjectClassTQ",$16;
  print "$.data[" n "].AssociateObjectClassTerm",$17;
  print "$.data[" n "].RelationObjectClassTQ",$18;
  print "$.data[" n "].RelationObjectClassTerm",$19;
  print "$.data[" n "].DESCRIPTION",$20;
  n=n+1;
}' | makrj.sh | sed "s/^\(\"[^\":,]*\":\),/\1null,/" > ts5409.json
# --------------------------------------------------------------------
rm $Tmp-*
rm log/${0##*/}.$$.*
exit 0
# list-bie.sh