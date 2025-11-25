
@echo off
setlocal
set SERVER=localhost
set PORT=1433
set USER=sa
set PASSWORD=YourStrong@Passw0rd
sqlcmd -S %SERVER%,%PORT% -U %USER% -P %PASSWORD% -b -i scripts\\sql\\create-database.sql
if %errorlevel% neq 0 (
  echo Failed to create/check database.
  exit /b 1
)
echo FashionDB is ready.
