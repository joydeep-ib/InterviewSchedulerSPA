import { _404Page } from "./components/404";

export class Router {
    constructor(routes) {
        this.routes = routes;
        this.currentRoute = null;
        this._loadInitialRoute();
    }
    _matchUrlToRoute(urlSegments) {
        const routeParams = {};
        const matchedRoute =  this.routes.find(route => {
            // Ignore the first one as route.path begins with '/'
            // ie. the first string is going to be empty
            const routePathSegments = route.path.split('/').slice(1);

            // skip this as lengths aren't equal
            if (routePathSegments.length !== urlSegments.length)
                return false;

            // return routePathSegments
            //     // .reduce((matchStatus, pathSegment, idx) =>
            //     //     !matchStatus?matchStatus:pathSegment === urlSegments[idx],
            //     //     true
            //     // )
            const match = routePathSegments
                .every((pathSegment, i) => {
                    return pathSegment === urlSegments[i] || pathSegment[0] === ':';
                });

            if (match) {
                routePathSegments.forEach((segment, i) => {
                    if (segment[0] === ':') {
                        const propName = segment.slice(1);
                        routeParams[propName] = decodeURIComponent(urlSegments[i]);
                    }
                });
            }
            return match;
        });
        if (matchedRoute)
            return { ...matchedRoute, params: routeParams };

        return;
    }
    async loadRoute(...urlSegments) {
        // Get the matching route
        const matchedRoute = this._matchUrlToRoute(urlSegments) || _404Page;

        const url = `/${urlSegments.join('/')}`;

        this.currentRoute = url;

        history.pushState({}, '', url);

        const rootElem = document.getElementById('root')
        // Clear HTML
        rootElem.innerHTML = '';
        const _child = await matchedRoute.render(matchedRoute.params, this);
        rootElem.appendChild(_child);
        await matchedRoute.afterRender(this);
    }

    _loadInitialRoute() {
        const pathnameSplit = window.location.pathname.split('/');
        const pathSegments = pathnameSplit.length > 1?pathnameSplit.slice(1):'';

        this.loadRoute(...pathSegments);
    }
}