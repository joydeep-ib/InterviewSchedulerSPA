import { LolReact } from "./lib/LolReact";

console.log("Hello World");

LolReact.render(
    LolReact.createElement('h1', null, 'Hello LolReact'),
    document.getElementById('root')
);