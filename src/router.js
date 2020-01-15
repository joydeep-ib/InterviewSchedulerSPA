import { _404Page } from "./components/404";

export class Router {
    constructor(routes) {
        this.routes = routes;
        this._loadInitialRoute();
    }
    _matchUrlToRoute(urlSegments) {
        return this.routes.find(route => {
            // Ignore the first one as route.path begins with '/'
            // ie. the first string is going to be empty
            const routePathSegments = route.path.split('/').slice(1);

            // skip this as lengths aren't equal
            if (routePathSegments.length !== urlSegments.length)
                return false;

            return routePathSegments
                // .reduce((matchStatus, pathSegment, idx) =>
                //     !matchStatus?matchStatus:pathSegment === urlSegments[idx],
                //     true
                // )
                .every((pathSegment,i ) => pathSegment === urlSegments[i])
        });

    }
    async loadRoute(...urlSegments) {
        // Get the matching route
        const matchedRoute = this._matchUrlToRoute(urlSegments) || _404Page;

        const url = `/${urlSegments.join('/')}`;
        history.pushState({}, '', url);

        const rootElem = document.getElementById('root')
        // Clear HTML
        rootElem.innerHTML = '';
        const _child = await matchedRoute.render({}, this);
        rootElem.appendChild(_child);
        await matchedRoute.afterRender();
    }

    _loadInitialRoute() {
        const pathnameSplit = window.location.pathname.split('/');
        const pathSegments = pathnameSplit.length > 1?pathnameSplit.slice(1):'';

        this.loadRoute(...pathSegments);
    }
}