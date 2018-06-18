
echo
echo "restarting the service"
docker-compose -f docker-compose.yml up -d --force-recreate

echo
echo "test if service was started"
bash -c 'i=0; while [[ "$(curl -s -o /dev/null -w ''%{http_code}'' localhost:8081/vinCheck/WAUZZZF50JN016611)" != "200" && $((i++)) -lt 10 ]]; do echo $(date); sleep 1; done'

echo
echo "run test cases:"
echo "testing (debug): $i"
curl "localhost:8081/vinCheck/WAUZZZF50JN016611?debug=true"
echo
testcases="WAUZZZF50JN016611 WAUZZZF50JN016611 WBADX7C58BE579982 WVWZZZ3CZEE140287"
for i in $testcases
do
  echo "testing: $i"
  echo "testing: $i - check"
  curl "localhost:8081/vinCheck/$i"
  echo
  #echo "testing: $i - decode"
  curl "localhost:8081/vinDecode/$i"
  echo
done

echo
echo "tail log:"
docker-compose -f docker-compose.yml logs -f

