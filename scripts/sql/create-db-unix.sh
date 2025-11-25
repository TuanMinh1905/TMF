
#!/usr/bin/env bash
set -euo pipefail
SERVER="localhost"
PORT="1433"
USER="sa"
PASSWORD="YourStrong@Passw0rd"
/opt/mssql-tools18/bin/sqlcmd -S ${SERVER},${PORT} -U ${USER} -P "${PASSWORD}" -C -b -i scripts/sql/create-database.sql || sqlcmd -S ${SERVER},${PORT} -U ${USER} -P "${PASSWORD}" -b -i scripts/sql/create-database.sql
echo "FashionDB is ready."
