# RE: Technical Task
=============

This React web application is to display the current temperature in degrees celsius based on the geolocation by using API from  https://darksky.net/ 

## Components
It includes two parts:
```bash
 server: The server.js is listening on port 3001 which is using express server to proxy resquest to DarkSky so as to avoid the issue of `Cross-Origin Resource Sharing`.
 client: The client folder includes files to satisfy the requirement and listens on port 3000
```

## Geting Started

To get started, please clone and download a zip file and then install it

### To run the application:

```
cd shuo_kang_darksky
npm run server
```

Open another Command line:
```
cd shuo_kang_darksky
cd client 
npm start
```

### Heads-up:
In order to make the application work properly
1. Allow Location on
2. Recommended: Google Chrome
3. Node Version

P.S.: As Math function has been used for Precipitation and Humidity, both of them has been rounded up to integer.
If Precipitation is 0 ,the original value may be too small.


Here is my screen shot:
![](images/screenshotdarksky.png)
