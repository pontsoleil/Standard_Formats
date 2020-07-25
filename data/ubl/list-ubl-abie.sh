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
# this is command substitution i.e back quote
do
  cat $file | awk -v f=$file -F'\t' '{
    if (NR>1 && "END"!=$19 && "ABIE"==$19) {
      n=NR-1;
      gsub(/\n/,"",$0);
      rgx="^ubl\\/UBL-([^-0-9]*).*\\.txt$";
      f=gensub(rgx, "\\1", "g", f);
      print "$.data[" n "].EntityName",f;
      print "$.data[" n "].ComponentName",$1;
      if ($2!="") {print "$.data[" n "].Subset",$2;}
      print "$.data[" n "].Cardinality",$3;
      print "$.data[" n "].Definition",$4;
      if ($5!="") {print "$.data[" n "].AlternativeBusinessTerms",$5;}
      # if ($6!="") {print "$.data[" n "].Examples",$6;} #TODO newline escape in field
      print "$.data[" n "].DictionaryEntryName",$7;
      if ($8!="") {print "$.data[" n "].ObjectClassTermQualifier",$8;}
      print "$.data[" n "].ObjectClassTerm",$9;
      if ($10!="") {print "$.data[" n "].PropertyTermQualifier",$10;}
      if ($11!="") {print "$.data[" n "].PropertyTermPossessiveNoun",$11;}
      if ($12!="") {print "$.data[" n "].PropertyTermPrimaryNoun",$12;}
      if ($13!="") {print "$.data[" n "].PropertyTerm",$13;}
      if ($14!="") {print "$.data[" n "].RepresentationTerm",$14;}
      if ($15!="") {print "$.data[" n "].DataTypeQualifier",$15;}
      print "$.data[" n "].DataType",$16;
      if ($17!="") {print "$.data[" n "].AssociatedObjectClassQualifier",$17;}
      if ($18!="") {print "$.data[" n "].AssociatedObjectClass",$18;}
      print "$.data[" n "].ComponentType",$19;
      if ($20!="") {print "$.data[" n "].UNTDEDCode",$20;}
      if ($21!="") {print "$.data[" n "].CurrentVersion",$21;}
    }
  }' < $file
done | makrj.sh | sed "s/^\(\"[^\":,]*\":\),/\1null,/" > list-ubl-abie.json
# === HTTP response ==================================================
rm $Tmp-*
rm log/${0##*/}.$$.*
exit 0
# list-ubl-abie.sh