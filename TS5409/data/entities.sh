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
# ENTITY_NAME TAG CODE DESCRIPTION COMMENTS XMLTAG
# 1           2   3    4           5        6
cat ts5409entities.txt| awk -F'\t' -v 'OFS=\t' '{
  sub(/[ \t\r\n]+$/, "", $1);
  sub(/[ \t\r\n]+$/, "", $2);
  sub(/[ \t\r\n]+$/, "", $3);
  sub(/[ \t\r\n]+$/, "", $4);
  sub(/[ \t\r\n]+$/, "", $5);
  sub(/[ \t\r\n]+$/, "", $6);
  print $1, $2, $3, $4, $5, $6;
}' > $Tmp-ts5409entities
# 
cat $Tmp-ts5409entities | awk -F'\t' 'BEGIN { n=0; }
{ if (n>0) {
    print "$.data[" n "].entity_name",$1;
    print "$.data[" n "].tag",$2;
    print "$.data[" n "].code",$3;
    print "$.data[" n "].description",$4;
    print "$.data[" n "].comments",$5;
    print "$.data[" n "].xmltag",$6;
  }
  n=n+1;
}' | makrj.sh > entities.json
# --------------------------------------------------------------------
rm $Tmp-*
rm ../log/${0##*/}.$$.*
exit 0
# head.sh