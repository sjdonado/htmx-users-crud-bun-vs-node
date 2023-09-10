#!/bin/bash

PORT_1="3000"
PORT_2="3001"
SERVICE_1_NAME="nest-swc-handlebars"
SERVICE_2_NAME="hono-bun-jsx"

docker build -t $SERVICE_1_NAME -f ./nest-swc-handlebars/Dockerfile $SERVICE_1_NAME
docker build -t $SERVICE_2_NAME -f ./hono-bun-jsx/Dockerfile $SERVICE_2_NAME

(
  docker run -p $PORT_1:3000 --env-file=./nest-swc-handlebars/.env --name $SERVICE_1_NAME $SERVICE_1_NAME &
  docker run -p $PORT_2:3000 --env-file=./hono-bun-jsx/.env --name $SERVICE_2_NAME $SERVICE_2_NAME
) | {
  # Wait for the services to start 
  sleep 5

  curl -X POST http://127.0.0.1:$PORT_1/seed
  curl -X POST http://127.0.0.1:$PORT_2/seed

  ENDPOINT_1="users/views/create"
  ENDPOINT_2="users/views/edit/10"
  ENDPOINT_3="users/views/cancel/edit/10"

  NUM_REQUESTS=1000
  CONCURRENCY=10

  TMP_FILE1="/tmp/$SERVICE_1_NAME.txt"
  TMP_FILE2="/tmp/$SERVICE_2_NAME.txt"

  { 
    ab -n $NUM_REQUESTS -c $CONCURRENCY "http://127.0.0.1:$PORT_1/$ENDPOINT_1";
    ab -n $NUM_REQUESTS -c $CONCURRENCY "http://127.0.0.1:$PORT_1/$ENDPOINT_2";
    ab -n $NUM_REQUESTS -c $CONCURRENCY "http://127.0.0.1:$PORT_1/$ENDPOINT_3";
  } >> $TMP_FILE1

  { 
    ab -n $NUM_REQUESTS -c $CONCURRENCY "http://127.0.0.1:$PORT_2/$ENDPOINT_1";
    ab -n $NUM_REQUESTS -c $CONCURRENCY "http://127.0.0.1:$PORT_2/$ENDPOINT_2";
    ab -n $NUM_REQUESTS -c $CONCURRENCY "http://127.0.0.1:$PORT_2/$ENDPOINT_3";
  } >> $TMP_FILE2

  SERVICE_1_RPS=$(grep "Requests per second" $TMP_FILE1 | awk '{print $4}')
  SERVICE_2_RPS=$(grep "Requests per second" $TMP_FILE2 | awk '{print $4}')
  # Determine the winner based on Requests per Second (RPS)
  WINNER=$(echo "$SERVICE_1_RPS > $SERVICE_2_RPS" | bc -l)
  if [ "$WINNER" = 1 ]; then
    WINNER=$SERVICE_1_NAME
  else
    WINNER=$SERVICE_2_NAME
  fi

  # Generate a report
  echo "Performance Comparison Report:"
  echo "-----------------------------"
  echo "$SERVICE_1_NAME Requests per Second (RPS): $SERVICE_1_RPS"
  echo "$SERVICE_2_NAME Requests per Second (RPS): $SERVICE_2_RPS"
  echo "-----------------------------"
  echo "Winner: $WINNER"
  echo "-----------------------------"

  docker stop $SERVICE_1_NAME
  docker stop $SERVICE_2_NAME

  docker rm $SERVICE_1_NAME
  docker rm $SERVICE_2_NAME
} 
