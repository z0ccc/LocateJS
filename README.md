# LocateJS

Check it out here: [https://z0ccc.github.io/LocateJS/](https://z0ccc.github.io/LocateJS/).

## About

LocateJS predicts your location by analysing your connection and system data. This scan allows you to understand how your location can be pinpointed even while using a vpn, location spoofer or private mode.

Accuracy of the location prediction depends on how much authentic info your computer is exposing. LocateJS will not be able to detect your location 100% of the time.

## How to hide location

The best way to hide your location is to use [Tor](https://www.torproject.org/). Tor will completely hide both your connection and system data.

As it's not always practical to use Tor (slow speeds, captcha loops, etc) the following are instructions on how to obscure your location without Tor.

To hide your connection data you will need to use a VPN or proxy

To hide your system data you will need to change your system settings. You can change your timezone to one with the same timezone offset so that the date on your computer stays the same. 

Timezone/location spoofing extensions will not help as they cannot spoof data in [web workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers). 

You should select a language that has no country associated with it (‘en’ instead of ‘en-US’). You should remove all other languages. 

Although adding multiple random languages will help obscure your location, it's not the best idea as it will give you a very unique [device fingerprint](https://en.wikipedia.org/wiki/Device_fingerprint).
It's also a good idea to make sure your connection data matches your system data because if the data contradicts each other it would reveal that some of your data is inaccurate. 
