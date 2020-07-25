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
cat ubl/UBL-UnqualifiedDataTypes.dat ubl/CCTS_CCT_SchemaModule.dat |
makrj.sh | sed "s/^\(\"[^\":,]*\":\),/\1null,/" > list-ubl-udt.json
# --------------------------------------------------------------------
rm $Tmp-*
rm log/${0##*/}.$$.*
exit 0
# list-ubl-udt.sh