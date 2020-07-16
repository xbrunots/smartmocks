
var KEY_TOKEN = "KEY_TOKEN"
var KEY_MODULE = "KEY_MODULE"

Token = {
    set: function (token) {
        localStorage.setItem(KEY_TOKEN, token)
    },
    get: function () {
        return localStorage.getItem(KEY_TOKEN)
    }
}

Routes = {
    set: function (token) {
        localStorage.setItem(KEY_MODULE, token)
    },
    get: function () {
        return localStorage.getItem(KEY_MODULE)
    },
    json: function () {
        return JSON.parse(localStorage.getItem(KEY_MODULE))
    }
}

RouteEvents = {
    set: function (token) {
        localStorage.setItem("RouteEvents", token)
    },
    get: function () {
        return localStorage.getItem("RouteEvents")
    },
    json: function () {
        return JSON.parse(localStorage.getItem("RouteEvents"))
    }
}
