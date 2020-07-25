#
# UDT
#
# for f in "CCTS_CCT_SchemaModule UBL-UnqualifiedDataTypes"
# do
  f="UBL-UnqualifiedDataTypes"
  rgx='^[0-9]+$'
  i=0
  j=0
  k=1
  xsd="ubl/common/${f}-2.3.xsd"
  dat="ubl/${f}.dat"
  # dat="ubl/CCTS_CCT_SchemaModule.dat"  # xsd="ubl/common/CCTS_CCT_SchemaModule-2.3.xsd"
  bin/parsrx.sh -n $xsd |
  awk  -F' '  '{
    gsub(/\"\"/, "\\\"");
    gsub(/\\n/, "");
    gsub("ccts:","");
    gsub("@xml:","");
    gsub("@","");
    sub(/\/xsd:schema\[1\]\/xsd:complexType/, "data");
    sub(/\/xsd:attribute/,"att");
    sub(/\/xsd:annotation\[1\]\/xsd:documentation\[1\]/,"");
    sub(/\/xsd:simpleContent\[1\]\/xsd:extension\[1\]/,"");
    sub(/xsd:simpleContent\[1\]\/xsd:restriction\[1\]/,"");
    gsub(/\//,"");
    sub(/\[1\] /," ");
    if ($2=="") {
    } else {
      print $0;
    }
  }' > Tmp-data
  cat /dev/null > $dat
  cat Tmp-data |
  while read line; do
    n=$(echo "$line"|sed -e 's/^data\[\([0-9]*\)\]att\[\([0-9]*\)\]\([^ ]*\) \(.*\)$/\1/g')
    m=$(echo "$line"|sed -e 's/^data\[\([0-9]*\)\]att\[\([0-9]*\)\]\([^ ]*\) \(.*\)$/\2/g')
    key=$(echo "$line"|sed -e 's/^data\[\([0-9]*\)\]att\[\([0-9]*\)\]\([^ ]*\) \(.*\)$/\3/g')
    val=$(echo "$line"|sed -e 's/^data\[\([0-9]*\)\]att\[\([0-9]*\)\]\([^ ]*\) \(.*\)$/\4/g')
    if [[ ! $n =~ $rgx ]] || [[ ! $m =~ $rgx ]]; then
      n=$(echo "$line"|sed -e 's/^data\[\([0-9]*\)\]\([^ ]*\) \(.*\)$/\1/g')
      m=0
      key=$(echo "$line"|sed -e 's/^data\[\([0-9]*\)\]\([^ ]*\) \(.*\)$/\2/g')
      val=$(echo "$line"|sed -e 's/^data\[\([0-9]*\)\]\([^ ]*\) \(.*\)$/\3/g')
    fi
    if [[ $n =~ $rgx ]] && [[ $m =~ $rgx ]]; then
      if [[ $j != $n ]] || [[ $k != $m ]] ; then
        i=$((i + 1)) 
      fi
      echo "$.data[${i}].${key} ${val}" >> $dat
      j=$n
      k=$m
    fi
  done
# done

#
# maindoc
#
for file in `find ubl/maindoc -maxdepth 1 -type f | awk /UBL-.*.xsd/`
# this is command substitution i.e back quote
do
  bin/parsrx.sh -n $file | sed 's/\\n//g' | sed 's/[\n\r\"]//g' |
  awk '{
    if (""!=$2 && " "!=$2) {
      sub(/\/xsd:schema\[1\]\/xsd:complexType\[1\]/, "$.data");
      sub(/\/xsd:complexType\[1\]/,"");
      sub(/\/xsd:sequence\[1\]\/xsd:element/,"");
      sub(/\/xsd:annotation\[1\]\/xsd:documentation\[1\]\/ccts:Component/,"");
      gsub("@","");
      gsub(/\//,"");
      gsub(/\]\[1\]/,"]");
      gsub(/\[1\] /," ");
      sub("ccts:","");
      sub(/\]/,"].");
      sub("dataname","data[0].name");
      if ("\n"!=$1 && ""!=$1) {
        print $0;
      }
    }
  }' | grep -v '^xsd:schema' | grep -v '^$.dataxsd:annotation'
done >Tmp-data
#
# common
#
for file in `find ubl/common -maxdepth 1 -type f|awk /UBL-.*.xsd/|grep -v '[Ss]ig'|grep -v 'XAdES'` 
# this is command substitution i.e back quote
do
  f=$(echo $file|sed -Ee 's/ubl\/common\/UBL-(.*)-2.3.xsd$/\1/')
  dt0="ubl/UBL-${f}.dt0"
  bin/parsrx.sh -n $file | sed 's/\\n//g' | sed 's/[\n\r\"]//g' |
  awk '{
    if (""!=$2 && " "!=$2) {
      sub(/\/xsd:schema\[1\]\/xsd:element/, "$.data");
      sub(/\/xsd:schema\[1\]\/xsd:complexType/, "$.data");
      sub(/\/xsd:sequence\[1\]\/xsd:element/,"");
      sub(/\/xsd:annotation\[1\]\/xsd:documentation\[1\]\/ccts:Component\[1\]\/ccts:/, "");
      sub(/\/xsd:annotation\[1\]\/xsd:documentation\[1\]\/ccts:/,"");
      sub(/\/xsd:attribute\[1\]\/xsd:annotation\[1\]\/xsd:documentation\[1\]\/ccts:/,"");
      sub(/\/xsd:annotation\[1\]\/xsd:/,"");
      sub(/\/xsd:simpleContent\[1\]\/xsd:restriction\[1\]/,"");
      sub(/\/xsd:simpleContent\[1\]\/xsd:extension\[1\]/,"");
      sub(/\/xsd:attribute\[1\]/,"");
      sub(/\/@/,"");
      sub(/\[1\] /," ")
      gsub(/\]/,"].");
      if ("\n"!=$1 && ""!=$1) {
        print $0;
      }
    }
  }'|grep -v 'xsd:schema'|grep -v 'xml:lang en'| sed 's/  */ /g' > $dt0
done

# for file in "ubl/UBL-CommonAggregateComponents-2.3.dt0 ubl/UBL-CommonExtensionComponents-2.3.dt0"
# do
file="ubl/UBL-CommonAggregateComponents.dt0"
f=$(echo $file |sed -Ee 's/ubl\/UBL-(.*).dt0$/\1/')

f="CommonAggregateComponents"
file="ubl/UBL-${f}.dt0"
dat="ubl/UBL-${f}.dat"
json="ubl/UBL-${f}.json"
# echo $dat
cat $file |
awk 'BEGIN{
  componentTyp="";
  ObjectClass="";
  j=0;
  prev_j=0
}
{
  i=gensub(/^\$\.data\[([0-9]+)\]\./, "\\1", "g", $1);
  i=+i;
  key=gensub(/^\$\.data\[([0-9]+)\]\.(.*)$/, "\\2", "g", $1);
  j=gensub(/^\$\.data\[([0-9]+)\]\.\[([0-9]+)\]\./, "\\2", "g", $1);
  j=+j;
  if(j>0) {
    key=gensub(/^\$\.data\[([0-9]+)\]\.\[([0-9]+)\]\.(.*)/, "\\3", "g", $1);
  }
  if ($1~/ComponentType/) {
    componentType=$2;
  }
  if ($1~/ObjectClass/) {
    $1="";
    ObjectClass=$0;
  }
  else {
    $1="";
  }
  gsub("  "," ",$0);
  if ("ABIE"==componentType || "BBIE"==componentType || "ASBIE"==componentType) {
    if ("ABIE"==componentType && j>0 && prev_j < j) {
      printf "$.data[%d].ObjectClass %s\n",10*i+j,ObjectClass;
    }
    printf "$.data[%d].%s %s\n",10*i+j,key,$0;
  }
  # else {
  #   printf "$.data[%d].%s %s\n",i,key,$0;
  # }
  prev_j=j
}'| sed 's/  */ /g' > $dat
cat $dat | bin/makrj.sh | sed "s/^\(\"[^\":,]*\":\),/\1null,/" > $json
# done | sed  > ubl/UBL-CommonComponents-2.3.dat