#!/bin/sh
chown -R node:node /app/db.json /app/backups /app/.backup 2>/dev/null
exec gosu node node server.js
