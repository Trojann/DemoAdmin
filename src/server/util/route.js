import 'reflect-metadata';

import Error from './Error';
import ns from './ns';

const routesKey = 'routesKey';

class Route {
    static register({router, target, formatError}) {
        var self = this;
        var routes = this._getRoutes(target);

        formatError = formatError || this.formatError;

        for (let route of routes) {
            let args = [route.path, self._routeHande.bind(self, route, formatError)];
            router[route.method].apply(router, args);
        }
    }

    static formatError(err, debug = false) {

        let result = {
            error: {}
        };
        if (err instanceof Error) {
            result.error.code = err.code;
            result.error.message = err.message;
        } else {
            result.error.code = 20;
            result.error.message = err.message;
        }

        if (!/production/.test(process.env.NODE_ENV) || debug) {
            result.error.stack = err.stack;
        }

        return result;
    }

    static _setContext(req) {
        return new Promise((resolve) => {
            ns.run(function() {
                ns.set('context', req.__context);
                resolve();
            });
        });
    }

    static _routeHande(route, formatError, req, res) {

        let promise = this._setContext(req)
            .then(() => {
                return route.handle(req, res);
            });

        promise.then((result) => {
            if (req.blocked_) {
                return;
            }

            res.set('Content-Type', 'application/json').send(JSON.stringify(result, null, 2));
        })
            .catch(e => {
                let {debug} = req.query;
                let result_error = formatError(e, debug);
                return res.status(400).set('Content-Type', 'application/json').send(JSON.stringify(result_error, null, 2));
            });
    }

    static _getRouteMetadata(target) {
        var routes = Reflect.getMetadata(routesKey, target);

        if (!routes) {
            routes = [];
            Reflect.defineMetadata(routesKey, routes, target);
        }

        return routes;
    } 

    static get(path = '*') {
        return this.route('get', path);
    }

    static post(path = '*') {
        return this.route('post', path);
    }

    static delete(path = '*') {
        return this.route('delete', path);
    }

    static put(path = '*') {
        return this.route('put', path);
    }

    static route(method, path) {
        var self = this;
        return function(target, key, descriptor) {
            let routes = self._getRouteMetadata(target);
            routes.push({method, path, key, handle: descriptor.value.bind(target)});
            return descriptor;
        };
    }

    /**
     * Lấy các route được khai báo của target
     * @param  {Object} target
     * @return {Object[]}
     */
    static _getRoutes(target) {
        let routes = Reflect.getMetadata(routesKey, target) || [];
        return routes;
    }
}

export default Route;
