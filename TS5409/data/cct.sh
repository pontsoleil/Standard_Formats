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
# Tmp="Tmp"
# === Log ============================================================
exec 2>../log/${0##*/}.$$.log
# --------------------------------------------------------------------
# ENTITYNAME ATTRIBUTENAME DOMAINNAME # Module A/B/ID/RL/AS CC/BIE BusinessTerm DictionaryEntryName ObjectClassTQ ObjectClassTerm
# 1          2             3          4 5      6            7      8            9                   10            11
# PropertyTQ PropertyTerm DatatypeQualifier RepresentationTerm AssociateObjectClassTQ AssociateObjectClassTerm
# 12         13           14                15                 16                     17
# RelationObjectClassTQ RelationObjectClassTerm DESCRIPTION
# 18                    19                      20
cat TS5409.tsv| awk -F'\t' -v 'OFS=\t' '{
  sub(/[ \t\r\n]+$/, "", $1);
  sub(/[ \t\r\n]+$/, "", $2);
  sub(/[ \t\r\n]+$/, "", $3);
  sub(/[ \t\r\n]+$/, "", $4);
  sub(/[ \t\r\n]+$/, "", $5);
  sub(/[ \t\r\n]+$/, "", $6);
  sub(/[ \t\r\n]+$/, "", $7);
  sub(/[ \t\r\n]+$/, "", $8);
  sub(/[ \t\r\n]+$/, "", $9);
  sub(/[ \t\r\n]+$/, "", $10);
  sub(/[ \t\r\n]+$/, "", $11);
  sub(/[ \t\r\n]+$/, "", $12);
  sub(/[ \t\r\n]+$/, "", $13);
  sub(/[ \t\r\n]+$/, "", $14);
  sub(/[ \t\r\n]+$/, "", $15);
  sub(/[ \t\r\n]+$/, "", $16);
  sub(/[ \t\r\n]+$/, "", $17);
  sub(/[ \t\r\n]+$/, "", $18);
  sub(/[ \t\r\n]+$/, "", $19);
  sub(/[ \t\r\n]+$/, "", $20);
  print $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20;
}' > $Tmp-TS5409

cat $Tmp-TS5409 | awk -F'\t' 'BEGIN { n=0; }
{
  if (NR>1 && "0.DT"==$5) {
    gsub(/[\n\r\\\"]/,"",$0)
    if ($3!="") {print "$.data[" n "].DataType",$3;}
    print "$.data[" n "].num",$4;
    print "$.data[" n "].Kind",$7;
    if ($8!="") {
      print "$.data[" n "].BusinessTerm",$8;
    } else {
      print "$.data[" n "].BusinessTerm","";
    }
    if ($9!="") {
      print "$.data[" n "].DictionaryEntryName",$9;
    } else {
      print "$.data[" n "].DictionaryEntryName","";
    }
    if ($20!="") {
      print "$.data[" n "].Description",$20;
    } else {
      print "$.data[" n "].Description","";
    }
    if ($10!="") {print "$.data[" n "].ObjectClassTermQualifier",$10;}
    if ($11!="") {
      print "$.data[" n "].ObjectClassTerm",$11;
    } else {
      print "$.data[" n "].ObjectClassTerm","";
    }
    if ($12!="") {print "$.data[" n "].PropertyTermQualifier",$12;}
    if ($13!="") {
      print "$.data[" n "].PropertyTerm",$13;
    } else {
      print "$.data[" n "].PropertyTerm","";
    }
    if ($14!="") {print "$.data[" n "].DatatypeQualifier",$14;}
    if ($15!="") {
      print "$.data[" n "].RepresentationTerm",$15;
    } else {
      print "$.data[" n "].RepresentationTerm","";
    }
    n=n+1;
  }
}' | makrj.sh > cct.json

# --------------------------------------------------------------------
# rm $Tmp-*
# rm ../log/${0##*/}.$$.*
exit 0
# ts5409.sh