# ripro-vehicle-identification-services

---

## get started
```
git clone https://github.com/PatrickRiegler/ripro-vehicle-identification-services.git
cd ripro-vehicle-identification-services
git checkout "your-branch-name"
```

This script will start the 
```
./restart.sh
```

---


## run test cases
```
./test.sh [full]
```
(Attention: "full" takes very long)

## single tests
```
curl "http://localhost:8081/vin/check/WAUZZZF50JN016611?debug=true&test=true"
curl "http://localhost:8081/vin/decode/WAUZZZF50JN016611?debug=true&test=true"
```

