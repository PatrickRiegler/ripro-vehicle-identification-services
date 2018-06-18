
echo
echo "restarting the service"
docker-compose -f docker-compose.yml up -d --force-recreate --build

echo
echo "test if service was started"
bash -c 'i=0; while [[ "$(curl -s -o /dev/null -w ''%{http_code}'' localhost:8081/vinCheck/WAUZZZF50JN016611)" != "200" && $((i++)) -lt 10 ]]; do echo $(date); sleep 1; done'

echo
echo "run test cases:"
echo "testing (debug): $i"
curl "localhost:8081/vinCheck/WAUZZZF50JN016611?debug=true&test=true"
echo
testcases="$(cat api/positivetestcases.test)"
for i in $testcases
do
  echo "testing: $i"
  echo "testing: $i - check"
  curl "localhost:8081/vinCheck/$i?test=true"
  echo
  #echo "testing: $i - decode"
  curl "localhost:8081/vinDecode/$i?test=true"
  echo
done

# echo "testing (findVinInImage): $i"
# curl "localhost:8081/findVinInImage"
# echo


echo
echo "tail log:"
docker-compose -f docker-compose.yml logs -f

