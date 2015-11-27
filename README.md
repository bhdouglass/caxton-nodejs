# Caxton Node JS Wrapper

[Caxton](https://caxton.herokuapp.com/) api wrapper for Node JS.

## Install ##

* For use as a Node JS module: `npm install --save caxton`
* For use as a command: `npm install -g caxton` (may need to use sudo)

## Usage ##

Module:
~~~
var caxton = require('caxton');

//Fetch a token for sending notifications
caxton.token('app name', 'code from the user\'s app', function(err, token) {
    if (err) {
        console.error(err);
    }
    else {
        console.log(token); //String of the token for sending notifications to this user
    }
});

//Send a notification to a user
var options = { //Optional parts of the notification
    message: 'Optional message to include with the url',
    count: 'A number to use in a badge on the Caxton app icon',
    sound: 'The name of a sound to play on the device when the notification arrives',
    tag: 'Notifications with the same tag will be grouped together',
};

caxton.send('app name (same name requested with token)', 'token', 'url', options, function(err) {
    if (err) {
        conosle.error(err);
    }
});

//Alternatively don't specify options in send()
caxton.send('app name (same name requested with token)', 'token', 'url', function(err) {
    if (err) {
        conosle.error(err);
    }
});
~~~

Command Line:
~~~
#Fetch a token for sending notifications
caxton --app="app name" --code="code for the user's app"

#Send a notification to a user (minimum required arguments)
caxton --app="app name" --token="token from above" --url="http://example.com/"

#Send a notification to a user (all arguments)
caxton --app="app name" --token="token from above" --url="http://example.com/" --message="message" --count=3 --sound="ring.wav" --tag="tag"
~~~

## License ##

Copyright (C) 2015 [Brian Douglass](http://bhdouglass.com/)

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License version 3, as published
by the Free Software Foundation.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranties of MERCHANTABILITY, SATISFACTORY QUALITY, or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>.
