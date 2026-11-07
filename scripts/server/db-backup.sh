#!/bin/bash
# Daily dump of the MySQL database behind api.manikstu.com (Laravel). Installed on the server as ~/bin/db-backup.sh and run by a
# cron job from hPanel > Advanced > Cron Jobs:  /bin/bash /home/u304297356/bin/db-backup.sh
# Keeps 14 days in ~/backups/daily. The credentials are read from the API's .env at run time and never written to the log.
set -euo pipefail
umask 077

DIR="$HOME/backups/daily"
KEEP_DAYS=14
ENV_FILE="$HOME/domains/api.manikstu.com/.env"

val() { grep -E "^$1=" "$ENV_FILE" | head -1 | cut -d= -f2- | sed -E 's/^"(.*)"$/\1/'; }

mkdir -p "$DIR"
CNF=$(mktemp "$DIR/.my.cnf.XXXXXX")
trap 'rm -f "$CNF" "${OUT:-}.tmp"' EXIT
printf '[client]\nuser=%s\npassword="%s"\nhost=%s\n' "$(val DB_USERNAME)" "$(val DB_PASSWORD)" "$(val DB_HOST)" > "$CNF"

DB=$(val DB_DATABASE)
OUT="$DIR/$DB-$(date +%F).sql.gz"
mysqldump --defaults-extra-file="$CNF" --single-transaction --routines --triggers --events --no-tablespaces \
  --default-character-set=utf8mb4 "$DB" | gzip -9 > "$OUT.tmp"

# Keep the file only if it is a whole dump: gzip intact and mysqldump's closing line present
gzip -t "$OUT.tmp"
zcat "$OUT.tmp" | tail -1 | grep -q "Dump completed"
mv "$OUT.tmp" "$OUT"
sha256sum "$OUT" > "$OUT.sha256"

find "$DIR" -name "$DB-*.sql.gz*" -mtime +"$KEEP_DAYS" -delete
echo "$(date '+%F %T') backup ok: $(basename "$OUT") ($(du -h "$OUT" | cut -f1)), $(ls "$DIR"/*.sql.gz | wc -l) kept"
