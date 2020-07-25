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
# UniqueID Kind DictionaryEntryName ShortName Definition Publicationcomments ObjectClassTermQualifier ObjectClassTerm
# $1       $2   $3                  $4        $5         $6                  $7                       $8
#  BusinessProcess Product Industry RegionGeopolitical OfficialConstraints Role SupportingRole SystemConstraints Example
#  $9              $10     $11      $12                $13                 $14  $15            $16               $17
cat ccl_20a_mbie.tsv | awk -F'\t' 'BEGIN { n=0; }
{ print "$.data[" n "].UniqueID",$1;
  print "$.data[" n "].Kind",$2;
  print "$.data[" n "].DictionaryEntryName",$3;
  print "$.data[" n "].ShortName",$4;
  print "$.data[" n "].Definition",$5;
  print "$.data[" n "].Publicationcomments",$6;
  print "$.data[" n "].ObjectClassTermQualifier",$7;
  print "$.data[" n "].ObjectClassTerm",$8;
  print "$.data[" n "].BusinessProcess",$9;
  print "$.data[" n "].Product",$10;
  print "$.data[" n "].Industry",$11;
  print "$.data[" n "].RegionGeopolitical",$12;
  print "$.data[" n "].OfficialConstraints",$13;
  print "$.data[" n "].Role",$14;
  print "$.data[" n "].SupportingRole",$15;
  print "$.data[" n "].SystemConstraints",$16;
  print "$.data[" n "].Example",$17;
  n=n+1;
}' | makrj.sh | sed "s/^\(\"[^\":,]*\":\),/\1null,/" > list-bie.json
# --------------------------------------------------------------------
rm $Tmp-*
rm log/${0##*/}.$$.*
exit 0
# list-bie.sh