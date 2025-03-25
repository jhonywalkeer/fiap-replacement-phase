#!/bin/sh
# wait-for-it.sh: Wait for a service to become available

set -e

TIMEOUT=15
HOST=$1
shift
PORT=$1
shift

cmd="$@"

for i in $(seq $TIMEOUT); do
  nc -z "$HOST" "$PORT" && break
  echo "Waiting for $HOST:$PORT..."
  sleep 1
done

if ! nc -z "$HOST" "$PORT"; then
  echo "Timeout reached: $HOST:$PORT is not available."
  exit 1
fi

exec $cmd