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
# ENTITY_NAME ATTRIBUTE_NAME TAG CODE DESCRIPTION COMMENTS XMLTAG DOMAIN_NAME VALID_FROM VALID_TO VALIDITY_INFO SAMPLE_VALUES
# 1           2              3   4    5           6        7      8           9          10       11            12
cat ts5409attributes.txt| awk -F'\t' -v 'OFS=\t' '{
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
  print $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12;
}' > $Tmp-ts5409attributes
# ENTITY_NAME ATTRIBUTE_NAME TAG CODE DESCRIPTION COMMENTS XMLTAG DOMAIN_NAME VALID_FROM VALID_TO VALIDITY_INFO SAMPLE_VALUES
# 1           2              3   4    5           6        7      8           9          10       11            12
cat $Tmp-ts5409attributes | awk -F'\t' 'BEGIN { n=0; }
{ if (n>0) {
    print "$.data[" n "].entity_name",$1;
    print "$.data[" n "].attribute_name",$2;
    print "$.data[" n "].tag",$3;
    print "$.data[" n "].code",$4;
    print "$.data[" n "].description",$5;
    print "$.data[" n "].comments",$6;
    print "$.data[" n "].xmltag",$7;
    print "$.data[" n "].domain_name",$8;
    print "$.data[" n "].valid_from",$9;
    print "$.data[" n "].valid_to",$10;
    print "$.data[" n "].validity_info",$11;
    print "$.data[" n "].sample_values",$12;
  }
  n=n+1;
}' | makrj.sh > attributes.json
# --------------------------------------------------------------------
rm $Tmp-*
rm ../log/${0##*/}.$$.*
exit 0
# head.sh