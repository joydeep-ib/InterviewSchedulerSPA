import { createTextElement, createLink } from "../utils/createElement";

export const HomePage = {
    path: '/',
    async render(params, router) {
        const rootNode = document.createElement('div');
        rootNode.appendChild(createTextElement('h2', 'Home Page'));
        rootNode.appendChild(createLink(router, 'Get All Interviews', ['interviews']));
        rootNode.appendChild(document.createElement('br'));
        rootNode.appendChild(createLink(router, 'Get All Participants', ['participants']))

        return rootNode;
    },
    async afterRender() {
        console.log("After Render Called");
    }
};