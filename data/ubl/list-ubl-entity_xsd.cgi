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
METHOD=${REQUEST_METHOD:-''}
echo ${METHOD} >&2
if [ 'GET' = "$METHOD" ]; then
  #GET
  printf '%s' "${QUERY_STRING:-''}" | cgi-name > $Tmp-cgivars
  class=$(nameread class $Tmp-cgivars)
  class=$(echo $class| tr ' ' '_')
  CLASS=${class:-''}
  echo ${CLASS} >&2
fi
# --------------------------------------------------------------------
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
done | makrj.sh | sed "s/^\(\"[^\":,]*\":\),/\1null,/" > $Tmp-json
# === HTTP response ==================================================
cat <<HTTP_RESPONSE
Content-Type: application/json

$(cat $Tmp-json)
HTTP_RESPONSE
# rm $Tmp-*
# rm log/${0##*/}.$$.*
exit 0
# list-ubl-entity.cgi