
echo
echo "restarting the service"
docker-compose -f docker-compose.yml up -d --force-recreate --build

echo
echo "test if service was started"
bash -c 'i=0; while [[ "$(curl -s -o /dev/null -w ''%{http_code}'' localhost:8081/vin/check/WAUZZZF50JN016611)" != "200" && $((i++)) -lt 10 ]]; do echo $(date); sleep 1; done'

echo
echo "run test cases:"
echo "testing (debug): $i"
curl "localhost:8081/vin/check/WAUZZZF50JN016611?debug=true&test=true"
echo
testcases="$(cat api/positivetestcases.test)"
for i in $testcases
do
  echo "testing: $i"
  echo "testing: $i - check"
  curl "localhost:8081/vin/check/$i?test=true"
  echo
  #echo "testing: $i - decode"
  curl "localhost:8081/vin/decode/$i?test=true"
  echo
done

# echo "testing (vin/findInImage): $i"
# curl "localhost:8081/vin/findInImage"
# echo


echo
echo "tail log:"
docker-compose -f docker-compose.yml logs -f

