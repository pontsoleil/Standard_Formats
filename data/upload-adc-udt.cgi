#! /bin/sh
# === Initialize shell environment ===================================
set -eux
# -e  Exit immediately if a command exits with a non-zero status.
# -u  Treat unset variables as an error when substituting.
# -v  Print shell input lines as they are read.
# -x  Print commands and their arguments as they are executed.
export LC_ALL=C
type command >/dev/null 2>&1 && type getconf >/dev/null 2>&1 &&
export PATH=".:./bin:$(command -p getconf PATH)${PATH+:}${PATH-}"
export UNIX_STD=2003  # to make HP-UX conform to POSIX
Tmp=/tmp/${0##*/}.$$
# === Log ============================================================
exec 2>log/${0##*/}.$$.log
# === Upload =========================================================
dd bs=${CONTENT_LENGTH:-0} count=1 > $Tmp-cgivars
mime-read file $Tmp-cgivars        > $Tmp-uploadfile
# === Check if uploaded file contains records  =======================
count=$(cat $Tmp-uploadfile | wc -l)
if [ $count -gt 0 ]; then
  # --- Copy file from temp  -----------------------------------------
  filename="./ADC_qDT.tsv"
  cp $Tmp-uploadfile $filename
  # --- file stat ----------------------------------------------------
  totalsize=$(stat -c %s ${filename})
  lastmodified=$(stat -c %y ${filename})
  # --- Return result ------------------------------------------------
  cat <<HTML_CONTENT
Content-Type: application/json

{ "file":"${filename}",
  "totalsize":"${totalsize}",
  "lastmodified":"${lastmodified}"
}
HTML_CONTENT
  # --- generate json ------------------------------------------------
  sh ./list-ADC-udt.sh &
# === Return null result =============================================
else
  cat <<HTML_CONTENT
Content-Type: application/json

{ "file":"",
  "totalsize":"",
  "lastmodified":""
}
HTML_CONTENT
fi
# rm -f $Tmp-*
exit 0
# upload-adc-udt.cgi