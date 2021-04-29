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
for file in `find ubl -maxdepth 1 -type f | awk /UBL-.*.txt/`
do
  cat $file | awk -F'\t' '{
    if (NR>1 && "END"!=$19 && "ABIE"!=$19) {
      print $0
    }
  }' >> $Tmp-ubl-entity
done

cat $Tmp-ubl-entity | awk -F'\t' 'BEGIN {n=0; l=0}
{
  gsub(/[\n\r\\\"]/,"",$0);
  print "$.data[" n "].num",n;
  if ($1!="" && length($1)>l) { print "$.data[" n "].ComponentName",$1; }
  else { print "$.data[" n "].ComponentName",""; }
  if ($2!="" && length($2)>l) { print "$.data[" n "].Subset",$2; }
  if ($3!="" && length($3)>l) { print "$.data[" n "].Cardinality",$3; }
  else { print "$.data[" n "].Cardinality",""; }
  if ($4!="" && length($4)>l) { print "$.data[" n "].Definition",$4; }
  else { print "$.data[" n "].Definition",""; }
  if ($5!="" && length($5)>l) { print "$.data[" n "].AlternativeBusinessTerms",$5; }
  if ($6!="" && length($6)>l) { print "$.data[" n "].Examples",$6; }
  if ($7!="" && length($7)>l) { print "$.data[" n "].DictionaryEntryName",$7; }
  else { print "$.data[" n "].DictionaryEntryName",""; }
  if ($8!="" && length($8)>l) { print "$.data[" n "].ObjectClassTermQualifier",$8; }
  else { print "$.data[" n "].ObjectClassTermQualifier",""; }
  if ($9!="" && length($9)>l) { print "$.data[" n "].ObjectClassTerm",$9; }
  else { print "$.data[" n "].ObjectClassTerm",""; }
  if ($10!="" && length($10)>l) { print "$.data[" n "].PropertyTermQualifier",$10; }
  else { print "$.data[" n "].PropertyTermQualifier",""; }
  if ($11!="" && length($11)>l) { print "$.data[" n "].PropertyTermPossessiveNoun",$11; }
  if ($12!="" && length($12)>l) { print "$.data[" n "].PropertyTermPrimaryNoun",$12; }
  if ($13!="" && length($13)>l) { print "$.data[" n "].PropertyTerm",$13; }
  else { print "$.data[" n "].PropertyTerm",""; }
  if ($14!="" && length($14)>l) { print "$.data[" n "].RepresentationTerm",$14; }
  else { print "$.data[" n "].RepresentationTerm",""; }
  if ($15!="" && length($15)>l) { print "$.data[" n "].DataTypeQualifier",$15; }
  else { print "$.data[" n "].DataTypeQualifier",""; }
  if ($16!="" && length($16)>l) { print "$.data[" n "].DataType",$16; }
  else { print "$.data[" n "].DataType",""; }
  if ($17!="" && length($17)>l) { print "$.data[" n "].AssociatedObjectClassQualifier",$17; }
  else { print "$.data[" n "].AssociatedObjectClassQualifier",""; }
  if ($18!="" && length($18)>l) { print "$.data[" n "].AssociatedObjectClass",$18; }
  else { print "$.data[" n "].AssociatedObjectClass",""; }
  if ($19!="" && length($19)>l) { print "$.data[" n "].ComponentType",$19; }
  else { print "$.data[" n "].ComponentType",""; }
  if ($20!="" && length($20)>l) { print "$.data[" n "].UNTDEDCode",$20; }
  if ($21!="" && length($21)>l) { print "$.data[" n "].CurrentVersion",$21; }
  n=n+1;
}' | ./bin/makrj.sh | sed "s/^\(\"[^\":,]*\":\),/\1null,/" > list-ubl-entity.json
# --------------------------------------------------------------------
rm $Tmp-*
rm log/${0##*/}.$$.*
exit 0
# list-ubl-entity.sh