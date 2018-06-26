
host=http://localhost:8081
# host=http://ecs-first-run-alb-1772213034.eu-central-1.elb.amazonaws.com

echo
echo "restarting the service"
docker-compose -f docker-compose.yml up -d --force-recreate --build
if [ $? -ne 0 ]; then echo "docker command not successuful"; exit 2; fi

echo
echo "test if service was started"
bash -c 'i=0; while [[ "$(curl -s -o /dev/null -w ''%{http_code}'' '${host}'/vin/check/WAUZZZF50JN016611)" != "200" && $((i++)) -lt 10 ]]; do echo $(date); sleep 1; done'


# run the test cases
#./test.sh full
./test.sh 


echo
echo "tail log:"
docker-compose -f docker-compose.yml logs -f

