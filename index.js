var request = require('request');

var api_url = 'https://caxton.herokuapp.com/api/';
var send_options = ['message', 'count', 'sound', 'tag'];

function isFunction(functionToCheck) {
    var getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

function isJson(string) {
    var value = true;
    try {
        JSON.parse(string);
    }
    catch (e) {
        value = false;
    }

    return value;
}

function token(app, code, callback) {
    request({
        url: api_url + 'gettoken',
        method: 'POST',
        form: {
            appname: app,
            code: code,
        },
    }, function (err, response, body) {
        if (err) {
            callback(err);
        }
        else {
            if (response.statusCode == 200) {
                if (isJson(body)) {
                    var data = JSON.parse(body);
                    if (data.token) {
                        callback(null, data.token);
                    }
                    else {
                        callback('Token response did not contain a token: ' + body);
                    }
                }
                else {
                    callback('Token response contained invalid json data');
                }
            }
            else {
                err = '';
                if (isJson(body)) {
                    var error = JSON.parse(body);
                    if (error.error) {
                        err = error.error;
                    }
                }

                if (err) {
                    callback('Token request failed: "' + err + '" (' + response.statusCode + ')');
                }
                else {
                    callback('Token request failed with code: ' + response.statusCode);
                }
            }
        }
    });
}

function send(app, token, url, optionsOrCallback, callback) {
    var options = {};
    if (isFunction(optionsOrCallback)) {
        callback = optionsOrCallback;
    }
    else if (optionsOrCallback) {
        options = optionsOrCallback;
    }

    var form = {
        appname: app,
        token: token,
        url: url,
    };

    for (var i = 0; i < send_options.length; i++) {
        var key = send_options[i];
        if (options[key]) {
            form[key] = options[key];
        }
    }

    request({
        url: api_url + 'send',
        method: 'POST',
        form: form,
    }, function (err, response, body) {
        if (err) {
            callback(err);
        }
        else {
            if (response.statusCode == 200) {
                if (isJson(body)) {
                    var data = JSON.parse(body);
                    if (data.ok && data.ok.toLowerCase() == 'ok') {
                        callback();
                    }
                    else {
                        callback('Message not sent: ' + body);
                    }
                }
                else {
                    callback('Message response contained invalid json data');
                }
            }
            else {
                err = '';
                if (isJson(body)) {
                    var error = JSON.parse(body);
                    if (error.error) {
                        err = error.error;
                    }
                }

                if (err) {
                    callback('Message failed to send: "' + err + '" (' + response.statusCode + ')');
                }
                else {
                    callback('Message failed to send with code: ' + response.statusCode);
                }
            }
        }
    });
}

exports.token = token;
exports.send = send;
exports._send_options = send_options;
