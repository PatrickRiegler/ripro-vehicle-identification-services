
host=http://localhost:8081
# host=http://ecs-first-run-alb-1659585136.eu-central-1.elb.amazonaws.com

echo
echo "restarting the service"
docker-compose -f docker-compose.yml up -d --force-recreate --build

echo
echo "test if service was started"
bash -c 'i=0; while [[ "$(curl -s -o /dev/null -w ''%{http_code}'' '${host}'/vin/check/WAUZZZF50JN016611)" != "200" && $((i++)) -lt 10 ]]; do echo $(date); sleep 1; done'

echo
echo "run health check:"
url="${host}/healthcheck"
echo "testing (debug): $i --- ($url)"
curl $url

echo
echo "run test cases:"
url="${host}/vin/check/WAUZZZF50JN016611?debug=true&test=true"
echo "testing (debug): $i --- ($url)"
curl $url
echo
testcases="$(cat api/positivetestcases.test)"
for i in $testcases
do
  echo "testing: $i"
  url="${host}/vin/check/$i?test=true"
  echo "testing: $i - check --- ($url)"
  curl $url
  echo
  url="${host}/vin/decode/$i?test=true"
  echo "testing: $i - decode --- ($url)"
  curl $url
  echo
done

# echo "testing (vin/findInImage): $i"
# curl "${host}/vin/findInImage"
# echo


echo
echo "tail log:"
docker-compose -f docker-compose.yml logs -f

