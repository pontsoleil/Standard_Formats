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
# UniqueID Kind ObjectClassTermQualifier ObjectClassTerm DictionaryEntryName ShortName Definition Publicationcomments 
# $1       $2   $3                       $4              $5                  $6        $7         $8
#  PropertyTermQualifier PropertyTerm DatatypeQualifier RepresentationTerm QualifiedDataTypeUID AssociatedObjectClassTermQualifier AssociatedObjectClass
#  $9                    $10          $11               $12                $13                  $14                                $15
#  BusinessTerm UsageRule SequenceNumber Occurrence(Min..Max)
#  $16          $17       $18            $19" .. "$20
#  BusinessProcess Product Industry RegionGeopolitical OfficialConstraints Role SupportingRole SystemConstraints Example
#  $21             $22     $23      $24                $25                 $26  $27            $28               $29
cat ccl_20a_mbie_compt.tsv | awk -F'\t' 'BEGIN { n=0; }
{ 
  sub ("unbounded", "*");
  print "$.data[" n "].num",n;
  print "$.data[" n "].UniqueID",$1;
  print "$.data[" n "].Kind",$2;
  print "$.data[" n "].ObjectClassTermQualifier",$3;
  print "$.data[" n "].ObjectClassTerm",$4;
  print "$.data[" n "].DictionaryEntryName",$5;
  print "$.data[" n "].ShortName",$6;
  print "$.data[" n "].Definition",$7;
  print "$.data[" n "].Publicationcomments",$8;
  print "$.data[" n "].PropertyTermQualifier",$9;
  print "$.data[" n "].PropertyTerm",$10;
  print "$.data[" n "].DatatypeQualifier",$11;
  print "$.data[" n "].RepresentationTerm",$12;
  print "$.data[" n "].QualifiedDataTypeUID",$13;
  print "$.data[" n "].AssociatedObjectClassTermQualifier",$14;
  print "$.data[" n "].AssociatedObjectClass",$15;
  print "$.data[" n "].BusinessTerm",$16;
  print "$.data[" n "].UsageRule",$17;
  print "$.data[" n "].SequenceNumber",$18;
  print "$.data[" n "].Occurrence",$19".."$20;
  print "$.data[" n "].BusinessProcess",$21;
  print "$.data[" n "].Product",$22;
  print "$.data[" n "].Industry",$23;
  print "$.data[" n "].RegionGeopolitical",$24;
  print "$.data[" n "].OfficialConstraints",$25;
  print "$.data[" n "].Role",$26;
  print "$.data[" n "].SupportingRole",$27;
  print "$.data[" n "].SystemConstraints",$28;
  print "$.data[" n "].Example",$29;
  n=n+1;
}' |
makrj.sh | sed "s/^\(\"[^\":,]*\":\),/\1null,/" > list-bie_compt.json
# --------------------------------------------------------------------
rm $Tmp-*
rm log/${0##*/}.$$.*
exit 0
# list-bie_compt.sh