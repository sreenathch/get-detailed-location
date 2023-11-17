# getDetailedLocation
Get the detailed info including ipV4, ipV5, device and location details of the user.

### Installation


```shell
npm i get-detailed-location
```

## Usage
Import the functions `ipv4()`, `ipv6()` and `locationDetails()`
```javascript
import { ipv4, ipv6, locationDetails } from 'get-detailed-location'
```
Getting the public IP addresses.
```javascript
    console.log(await ipv4())
    console.log(await ipv6())
    console.log(await locationDetails())
```
OR
```javascript
    ipv4().then((data)=>{
        console.log(data)
    })
    ipv6().then((data)=>{
        console.log(data)
    })
    locationDetails().then((data)=>{
        console.log(data)
    })
```

[npm](https://www.npmjs.com/package/get-detailed-location) 

### For contributions

```shell
$ git clone git@github.com:sreenathch/get-detailed-location.git
```


