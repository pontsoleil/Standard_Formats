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
# === function =======================================================
error500_exit() {
  cat <<HTTP_RESPONSE
Status: 500 Internal Server Error
Content-Type: text/plain

500 Internal Server Error
$@
HTTP_RESPONSE
  exit 1
}
# --------------------------------------------------------------------
error_exit() {
  cat <<HTTP_RESPONSE
Content-Type: text/plain

ERROR $@
HTTP_RESPONSE
  exit 1
}
# === Login check ====================================================
# user_info=$(is-login)
# [ -n "$user_info" ] || error_exit 'NOT LOGGED IN'
# user_id=$(echo $user_info | awk '{print $1}')
# --------------------------------------------------------------------
METHOD=${REQUEST_METHOD:-''}
echo ${METHOD} >&2
if [ 'GET' = "$METHOD" ]; then
  #GET
  printf '%s' "${QUERY_STRING:-''}" |# tee log/${0##*/}.$$.step1.log |
  cgi-name > $Tmp-cgivars
  object=$(nameread o $Tmp-cgivars)
  OBJECT=${object:-''}
  echo ${OBJECT} >&2
fi
# --------------------------------------------------------------------
# UniqueID Kind DictionaryEntryName ObjectClassTerm Definition
cat ccl_20a_cc_acc.tsv |
awk -v object="$OBJECT" -F'\t' 'BEGIN { n=0; }
{ if (""==object || $4==object) {
    print "$.data[" n "].UniqueID",$1;
    print "$.data[" n "].Kind",$2;
    print "$.data[" n "].DictionaryEntryName",$3;
    print "$.data[" n "].ObjectClassTerm",$4;
    print "$.data[" n "].Definition",$5;
    n=n+1;
  }
}' |
makrj.sh | sed "s/^\(\"[^\":,]*\":\),/\1null,/" > $Tmp-data
# === HTTP response ==================================================
cat <<HTTP_RESPONSE
Content-Type: application/json

$(cat $Tmp-data)
HTTP_RESPONSE
rm $Tmp-*
rm log/${0##*/}.$$.*
exit 0
# list-acc.cgi