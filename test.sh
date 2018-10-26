
host=http://localhost:8081
# host="ripro-svis-lb-96fd9452b00ef973.elb.eu-central-1.amazonaws.com"

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

fns="api/positivetestcases.test"
if [ "$1" != "" ]; then
  fn="api/positivetestcases.test.$1"
  if [ -f ${fn} ]; then
    echo "1"
    testcases="$(cat $fn)"
  else
    echo "2"
    testcases="$(cat $fns)"
  fi
else
  testcases="$(cat $fns)"
fi

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


echo
echo "run test cases:"
#url="${host}/vin/check/WAUZZZF50JN016611?test=true"
url="${host}/vin/check"
echo "testing (post): --- ($url)"
curl -X POST -H "Content-Type: application/json" -d '{"vins":["WAUZZZF50JN016611","WDD2210561A233135","WDC1660241A815681"]}' $url
echo


# echo "testing (vin/findInImage): $i"
# curl "${host}/vin/findInImage"
# echo


echo
echo "run mocha test cases:"
cd api
npm install
npm test
cd ..


