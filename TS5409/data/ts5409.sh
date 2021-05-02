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
{ if (n>0) {
    print "$.data[" n "].ENTITY",$1;
    print "$.data[" n "].ATTRIBUTE",$2;
    print "$.data[" n "].DOMAIN",$3;
    print "$.data[" n "].seq",$4;
    print "$.data[" n "].module",$5;
    print "$.data[" n "].kind",$6;
    print "$.data[" n "].ccl",$7;
    print "$.data[" n "].BusinessTerm",$8;
    print "$.data[" n "].DEN",$9;
    print "$.data[" n "].ObjectClassTQ",$10;
    print "$.data[" n "].ObjectClassTerm",$11;
    print "$.data[" n "].PropertyTQ",$12;
    print "$.data[" n "].PropertyTerm",$13;
    print "$.data[" n "].DatatypeQualifier",$14;
    print "$.data[" n "].RepresentationTerm",$15;
    print "$.data[" n "].AssociateObjectClassTQ",$16;
    print "$.data[" n "].AssociateObjectClassTerm",$17;
    print "$.data[" n "].RelationObjectClassTQ",$18;
    print "$.data[" n "].RelationObjectClassTerm",$19;
    print "$.data[" n "].DESCRIPTION",$20;
  }
  n=n+1;
}' | makrj.sh | sed "s/^\(\"[^\":,]*\":\),/\1null,/" > ts5409.json

cat $Tmp-TS5409 | awk -F'\t' 'BEGIN { n=0; }
{
  if (NR>1 && "A"==$6 && "BIE"==$7) {
    gsub(/[\n\r\\\"]/,"",$0)
    print "$.data[" n "].module",$5;
    print "$.data[" n "].num",$4;
    print "$.data[" n "].Kind",$6$7;
    print "$.data[" n "].Table",$1;
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
    if ($13!="") {print "$.data[" n "].PropertyTerm",$13;}
    if ($14!="") {print "$.data[" n "].DatatypeQualifier",$14;}
    if ($15!="") {print "$.data[" n "].RepresentationTerm",$15;}
    if ($16!="") {print "$.data[" n "].AssociatedObjectClassTermQualifier",$16;}
    if ($17!="") {print "$.data[" n "].AssociatedObjectClass",$17;}
    if ($18!="") {print "$.data[" n "].RelationObjectClassTermQualifier",$18;}
    if ($19!="") {print "$.data[" n "].RelationObjectClassTerm",$19;}
    if ($2!="") {print "$.data[" n "].ATTRIBUTE",$2;}
    if ($3!="") {print "$.data[" n "].DOMAIN",$3;}
    n=n+1;
  }
}' | makrj.sh > list-ADC-abie.json

cat $Tmp-TS5409 | awk -F'\t' 'BEGIN { n=0; }
{
  if (NR>1 && "A"!=$6 && "BIE"==$7) {
    gsub(/[\n\r\\\"]/,"",$0)
    print "$.data[" n "].Module",$5;
    print "$.data[" n "].num",n;
    print "$.data[" n "].Kind",$6$7;
    print "$.data[" n "].Table",$1;
    print "$.data[" n "].No",$4;
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
    if ($13!="") {print "$.data[" n "].PropertyTerm",$13;}
    if ($14!="") {print "$.data[" n "].DatatypeQualifier",$14;}
    if ($15!="") {print "$.data[" n "].RepresentationTerm",$15;}
    if ($16!="") {print "$.data[" n "].AssociatedObjectClassTermQualifier",$16;}
    if ($17!="") {print "$.data[" n "].AssociatedObjectClass",$17;}
    if ("ID"==$6) {
      print "$.data[" n "].PK_REF","PK";
    }
    if ("RL"==$6) {
      print "$.data[" n "].PK_REF","REF";
    }
    if ($18!="") {print "$.data[" n "].RelationObjectClassTermQualifier",$18;}
    if ($19!="") {print "$.data[" n "].RelationObjectClassTerm",$19;}
    if ($2!="") {print "$.data[" n "].ATTRIBUTE",$2;}
    if ($3!="") {print "$.data[" n "].DOMAIN",$3;}
    n=n+1;
  }
}' | makrj.sh > list-ADC-entity.json

cat $Tmp-TS5409 | awk -F'\t' 'BEGIN { n=0; }
{
  if (NR>1 && "A"==$6 && "CC"==$7) {
    gsub(/[\n\r\\\"]/,"",$0)
    print "$.data[" n "].module",$5;
    print "$.data[" n "].num",$4;
    print "$.data[" n "].Kind",$6$7;
    print "$.data[" n "].Table",$1;
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
    if ($13!="") {print "$.data[" n "].PropertyTerm",$13;}
    if ($14!="") {print "$.data[" n "].DatatypeQualifier",$14;}
    if ($15!="") {print "$.data[" n "].RepresentationTerm",$15;}
    if ($16!="") {print "$.data[" n "].AssociatedObjectClassTermQualifier",$16;}
    if ($17!="") {print "$.data[" n "].AssociatedObjectClass",$17;}
    if ($18!="") {print "$.data[" n "].RelationObjectClassTermQualifier",$18;}
    if ($19!="") {print "$.data[" n "].RelationObjectClassTerm",$19;}
    if ($2!="") {print "$.data[" n "].ATTRIBUTE",$2;}
    if ($3!="") {print "$.data[" n "].DOMAIN",$3;}
    n=n+1;
  }
}' | makrj.sh > list-ADC-acc.json

cat $Tmp-TS5409 | awk -F'\t' 'BEGIN { n=0; }
{
  if (NR>1 && ("B"==$6 || "ID"==$6 || "RL"==$6 || "AS"==$6) && "CC"==$7) {
    gsub(/[\n\r\\\"]/,"",$0)
    print "$.data[" n "].Module",$5;
    print "$.data[" n "].num",n;
    print "$.data[" n "].Kind",$6$7;
    print "$.data[" n "].Table",$1;
    print "$.data[" n "].No",$4;
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
    if ($13!="") {print "$.data[" n "].PropertyTerm",$13;}
    if ($14!="") {print "$.data[" n "].DatatypeQualifier",$14;}
    if ($15!="") {print "$.data[" n "].RepresentationTerm",$15;}
    if ($16!="") {print "$.data[" n "].AssociatedObjectClassTermQualifier",$16;}
    if ($17!="") {print "$.data[" n "].AssociatedObjectClass",$17;}
    if ("ID"==$6) {
      print "$.data[" n "].PK_REF","PK";
    }
    if ("RL"==$6) {
      print "$.data[" n "].PK_REF","REF";
    }
    if ($18!="") {print "$.data[" n "].RelationObjectClassTermQualifier",$18;}
    if ($19!="") {print "$.data[" n "].RelationObjectClassTerm",$19;}
    if ($2!="") {print "$.data[" n "].ATTRIBUTE",$2;}
    if ($3!="") {print "$.data[" n "].DOMAIN",$3;}
    n=n+1;
  }
}' | makrj.sh > list-ADC-cc.json

# --------------------------------------------------------------------
rm $Tmp-*
rm ../log/${0##*/}.$$.*
exit 0
# ts5409.sh