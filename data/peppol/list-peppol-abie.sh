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
# Module Kind seq id Name Definition Datatype ObjectClassTermQualifier ObjectClassTerm PropertyTermQualifier PropertyTerm 
# 1      2    3   4  5    6          7        8                        9               10                    11
# DatatypeQualifier RepresentationTerm AssociatedObjectClassTermQualifier AssociatedObjectClass  Occurrence
# 12                13                 14                                 15                     16
#	AdditionalExplanation	日本語訳	説明	追加説明	Example	Rules	Section	Extension	XPath	DataType	Attributes	Cardinality AlignmentOfCardinalities
# 17                    18       19   20       21      22    23      24        25    26        27          28          29
cat  peppol.tsv | awk -F'\t' 'BEGIN { n = 0; }
{
  Kind = $2
  if (NR>1 && Kind!="" && "ABIE"==Kind) {
    gsub(/[\n\r\\\"]/,"",$0)
    print "$.data[" n "].num",n;
    print "$.data[" n "].Module",$1;
    print "$.data[" n "].Kind",Kind;
    print "$.data[" n "].seq",$3;
    print "$.data[" n "].id",$4;
    if ($5!="") {
      print "$.data[" n "].Name",$5;
    } else {
      print "$.data[" n "].Name","";
    }
    ObjectClassTermQualifier = $8;
    ObjectClassTerm = $9;
    PropertyTermQualifier = $10;
    PropertyTerm = $11;
    if (ObjectClassTermQualifier!="") {
      DEN = ObjectClassTermQualifier "_ ";
    } else {
      DEN = ""
    }
    DEN = DEN ObjectClassTerm ". Details"
    print "$.data[" n "].DictionaryEntryName",DEN;
    if (ObjectClassTermQualifier!="") {
      print "$.data[" n "].ObjectClassTermQualifier",ObjectClassTermQualifier;
    } else {
      print "$.data[" n "].ObjectClassTermQualifier","";
    }    
    if (ObjectClassTerm!="") {
      print "$.data[" n "].ObjectClassTerm",ObjectClassTerm;
    } else {
      print "$.data[" n "].ObjectClassTerm","";
    }
    if (PropertyTerm!="") {
      print "$.data[" n "].PropertyTerm",PropertyTerm;
    }
    datatype = $7;
    if ($7!="") {
      print "$.data[" n "].datatype",datatype;
    } else {
      print "$.data[" n "].datatype","";
    }
    Card = $16;
    if (Card!="") {
      print "$.data[" n "].Card",Card;
    } else {
      print "$.data[" n "].Card","";
    }
    Description = $6;
    if (Description!="") {
      print "$.data[" n "].Description",Description;
    } else {
      print "$.data[" n "].Description","";
    }
    AdditionalExplanation = $17;
    if (AdditionalExplanation!="") {
      print "$.data[" n "].AdditionalExplanation",AdditionalExplanation;
    } else {
      print "$.data[" n "].AdditionalExplanation","";
    }
    XPath = $25;
    if (XPath!="") {
      print "$.data[" n "].XPath",XPath;
    } else {
      print "$.data[" n "].XPath","";
    }
    UBL_Datatype = $26;
    if (UBL_Datatype!="") {
      print "$.data[" n "].UBL_Datatype",UBL_Datatype;
    } else {
      print "$.data[" n "].UBL_Datatype","";
    }
    UBL_Cardinality = $28;
    if (UBL_Cardinality!="") {
      print "$.data[" n "].UBL_Cardinality",UBL_Cardinality;
    } else {
      print "$.data[" n "].UBL_Cardinality","";
    }
    n = n + 1;
  }
}' > $Tmp-data
cat $Tmp-data | makrj.sh > list-peppol-abie.json #| sed "s/^\(\"[^\":,]*\":\),/\1null,/" > $Tmp-json
# --------------------------------------------------------------------
rm $Tmp-*
rm log/${0##*/}.$$.*
exit 0
# list-peppol-abie.sh