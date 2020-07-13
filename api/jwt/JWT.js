
exports.verifyJWT = (req, res, next) => {
    require("dotenv-safe").config();
    var jwt = require('jsonwebtoken');
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).json({ success: false, message: 'Nenhum provedor de token encontrado.' });

    jwt.verify(token, process.env.SECRET, function (err, decoded) {
        if (err) return res.status(500).json({ success: false, message: 'Token inválido.' });

        // se tudo estiver ok, salva no request para uso posterior
        req.userId = decoded.id;
        next();
    });
}


exports.verifyCacheJWT = (req, res, next) => {
    if (req.path != "/login" && req.path != "/register" && req.path != "/apple-app-site-association") {
        require("dotenv-safe").config();
        var token = req.cookies.token;
        var jwt = require('jsonwebtoken');
        console.log(token)
        if (!token) return res.status(401).json({ success: false, message: 'Nenhum provedor de token encontrado.', token: req.cookies.token });

        jwt.verify(token, process.env.SECRET, function (err, decoded) {
            if (err) return res.status(500).json({ success: false, message: 'Token inválido.' });

            // se tudo estiver ok, salva no request para uso posterior
            req.userId = decoded.id;
            next();
        });
    } else {
        next()
    }
}


