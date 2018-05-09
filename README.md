# Caxton Node JS Wrapper

[Caxton](https://caxton.herokuapp.com/) api wrapper for Node JS.

## Install

* For use as a Node JS module: `npm install --save caxton`
* For use as a command: `npm install -g caxton` (may need to use sudo)

## Usage

Node JS:
~~~
const caxton = require('caxton');

// Fetch a token for sending notifications
caxton.token('appname', 'code from the app').then((token) => {
    console.log(token); // String of the token for sending notifications to this user
}).catch((err) => {
    console.error(err);
});

// Send a notification to a user
let options = { // This may be left out of the call to caxton.send()
    message: 'Optional message to include with the url',
    count: 'Optional number to use in a badge on the Caxton app icon',
    sound: 'Optional name of a sound to play on the device when the notification arrives',
    tag: 'Notifications with the same tag will be grouped together, optional',
};

caxton.send('appname (same name requested with token)', 'token', 'url', options).catch((err) => {
    console.error(err);
});
~~~

Command Line:
~~~
# Fetch a token for sending notifications
caxton token -a hello-world -c xyz

# Send a notification to a user
caxton -a hello-world -t "XY...Z" -u http://example.com/

# Send a notification to a user with a message
caxton -a hello-world -t "XY...Z" -u http://example.com/ =m "Hello World!"
~~~

## License

Copyright (C) 2018 [Brian Douglass](http://bhdouglass.com/)

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License version 3, as published
by the Free Software Foundation.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranties of MERCHANTABILITY, SATISFACTORY QUALITY, or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>.
