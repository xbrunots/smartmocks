
var KEY_TOKEN = "KEY_TOKEN"

Token = {
    set: function (token) {
        localStorage.setItem(KEY_TOKEN, token)
    },
    get: function () {
        return localStorage.getItem(KEY_TOKEN)
    }
}
