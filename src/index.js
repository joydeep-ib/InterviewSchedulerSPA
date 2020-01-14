import { LolReact } from "./lib/LolReact";
import { Title } from "./components";

console.log("Hello World");

LolReact.render(
    LolReact.createElement(
        Title,
        { message: 'Hello Custom Component' }
    ),
    document.getElementById('root')
);
