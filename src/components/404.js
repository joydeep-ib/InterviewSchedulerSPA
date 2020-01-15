import { createTextElement, createLink } from "../utils/createElement";

export const _404Page = {
    path: '/404',
    clickable: false,
    title: 'Page Not Found',
    async render(params, router) {
        const rootNode = document.createElement('div');
        rootNode.appendChild(createTextElement('h2', '404: Route not found'));
        rootNode.appendChild(createLink(router, 'Go Back Home', ['']))
        return rootNode;
    },
    async afterRender() {

    }
};