import { Router } from "./router";
import { routes } from "./routes";

const router = new Router(routes);

window.router = router;

window.addEventListener('popstate', (e) => {
    const updatedRoute = window.location.pathname.split('/').slice(1);

    console.log(updatedRoute);


    router.loadRoute(...updatedRoute)

});
