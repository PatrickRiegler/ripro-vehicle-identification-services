
echo
echo "restarting the service"
docker-compose -f docker-compose.yml up -d --force-recreate --build

echo
echo "test if service was started"
bash -c 'i=0; while [[ "$(curl -s -o /dev/null -w ''%{http_code}'' localhost:8081/vin/check/WAUZZZF50JN016611)" != "200" && $((i++)) -lt 10 ]]; do echo $(date); sleep 1; done'

echo
echo "run test cases:"
url="localhost:8081/vin/check/WAUZZZF50JN016611?debug=true&test=true"
echo "testing (debug): $i --- ($url)"
curl $url
echo
testcases="$(cat api/positivetestcases.test)"
for i in $testcases
do
  echo "testing: $i"
  url="localhost:8081/vin/check/$i?test=true"
  echo "testing: $i - check --- ($url)"
  curl $url
  echo
  url="localhost:8081/vin/decode/$i?test=true"
  echo "testing: $i - decode --- ($url)"
  curl $url
  echo
done

# echo "testing (vin/findInImage): $i"
# curl "localhost:8081/vin/findInImage"
# echo


echo
echo "tail log:"
docker-compose -f docker-compose.yml logs -f

