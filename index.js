const axios = require('axios');
const querystring = require('querystring');

const API_BASE = 'https://caxton.herokuapp.com/api';
const OPTION_MESSAGE = 'message';
const OPTION_COUNT = 'count';
const OPTION_SOUND = 'sound';
const OPTION_TAG = 'tag';
const VALID_OPTIONS = [
    OPTION_MESSAGE,
    OPTION_COUNT,
    OPTION_SOUND,
    OPTION_TAG,
];

module.exports = {
    token(appname, code) {
        return axios.post(`${API_BASE}/gettoken`, querystring.stringify({
            appname: appname,
            code: code,
        })).then((res) => {
            if (res.data && res.data.token) {
                return res.data.token;
            }

            throw new Error('An unexpected error has occured');
        }).catch((error) => {
            if (
                error &&
                error.response &&
                error.response.data &&
                error.response.data.error
            ) {
                throw new Error(error.response.data.error);
            }

            throw new Error(error);
        });
    },

    send(appname, token, url, options) {
        options = options || {};

        let data = {
            appname: appname,
            url: url,
            token: token,
        };

        VALID_OPTIONS.forEach((key) => {
            if (key in options && options[key]) {
                data[key] = options[key];
            }
        });

        return axios.post(`${API_BASE}/send`, querystring.stringify(data)).then((res) => {
            if (res.data && res.data.ok && res.data.ok.toLowerCase() == 'ok') {
                return 'ok';
            }

            throw new Error('An unexpected error has occured');
        }).catch((error) => {
            if (
                error &&
                error.response &&
                error.response.data &&
                error.response.data.error
            ) {
                throw new Error(error.response.data.error);
            }

            throw error;
        });
    },

    OPTION_MESSAGE: OPTION_MESSAGE,
    OPTION_COUNT: OPTION_COUNT,
    OPTION_SOUND: OPTION_SOUND,
    OPTION_TAG: OPTION_TAG,
    VALID_OPTIONS: VALID_OPTIONS,
};
