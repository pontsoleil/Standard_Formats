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
# DOMAIN_NAME FORMAT DATATYPE COMPOUND MIN_LENGTH MAX_LENGTH VAR_FIXED
# 1           2      3        4        5          6          7
# TOTAL_DIGITS DECIMALS SIGNED_UNSIGNED MIN_VALUE MIN_EXCLUSIVE MAX_VALUE
# 8            9        10              11        12            13
# MAX_EXCLUSIVE PATTERN CODELISTS DESCRIPTION XMLTAG
# 14            15      16        17          18
cat ts5409domains.txt| awk -F'\t' -v 'OFS=\t' '{
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
}' > $Tmp-ts5409domains
# 
cat $Tmp-ts5409domains | awk -F'\t' 'BEGIN { n=0; }
{ if (n>0) {
    print "$.data[" n "].domain_name",$1;
    print "$.data[" n "].format",$2;
    print "$.data[" n "].datatype",$3;
    print "$.data[" n "].compound",$4;
    print "$.data[" n "].min_length",$5;
    print "$.data[" n "].max_length",$6;
    print "$.data[" n "].var_fixed",$7;
    print "$.data[" n "].total_digits",$8;
    print "$.data[" n "].decimals",$9;
    print "$.data[" n "].signed_unsigned",$10;
    print "$.data[" n "].min_value",$11;
    print "$.data[" n "].min_exclusive",$12;
    print "$.data[" n "].max_value",$13;
    print "$.data[" n "].max_exclusive",$14;
    print "$.data[" n "].pattern",$15;
    print "$.data[" n "].codelists",$16;
    print "$.data[" n "].description",$17;
    print "$.data[" n "].xmltag",$18;
    print "$.data[" n "].ISO21378_datatype",$19;
    print "$.data[" n "].ISO21378_representation",$20;
  }
  n=n+1;
}' | makrj.sh | sed "s/^\(\"[^\":,]*\":\),/\1null,/" > domains.json
# --------------------------------------------------------------------
rm $Tmp-*
rm ../log/${0##*/}.$$.*
exit 0
# head.sh