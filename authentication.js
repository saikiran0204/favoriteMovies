const jwt = require('jsonwebtoken');
const _ = require("lodash")

const routeList = [{
    "path": "/login",
    "methodType": "GET"
  },
  {
    "path": "/login",
    "methodType": "POST"
  },
  {
    "path": "/register",
    "methodType": "GET"
  },
  {
    "path": "/register",
    "methodType": "POST"
  }
];

const jwtConfig ={
    "secret": "test@1234",
    "expiryInSec": 8640000
  };

class Authentication {

    constructor() { 
        
    }

    static routeWhiteListCheck(currentRoute, methodtype) {
        let flag = false;
        for (let index = 0; index < routeList.length; index++) {
            const element = routeList[index];
            if (element.path.indexOf(currentRoute) > -1 && methodtype === element.methodType) {
                flag = true;
                break;
            }
        }

        return flag;
    }


    validate(req, res, next) {
        try {
            if (!Authentication.routeWhiteListCheck(req.path, req.method)) {
                const token = req.cookies.authorization;
                if (_.isEmpty(token)) return res.send("You are not authenticated");
                const validateToken = Authentication.verify(token);
                if (validateToken.success) {
                    req.user = validateToken.data;
                    return next();
                } else {
                    return res.send("You are not authenticated");
                }
            }
            else {
                next();
            }
        } catch (error) {
            console.log(error);
        }       
    }

    create(args) {
        try {
              const token = jwt.sign(Object.assign({}, args), jwtConfig.secret, {
                    expiresIn: jwtConfig.expiryInSec
              });

              return token;
        } catch (error) {
              console.error(error);
              return false;
        }
    }

    static verify(token) {
            try {
            const decoded = jwt.verify(token, jwtConfig.secret);
            return { success: true, data: decoded };
            } catch (err) {
                return { success: false, error: err };
            }
    }
}


module.exports = new Authentication();
