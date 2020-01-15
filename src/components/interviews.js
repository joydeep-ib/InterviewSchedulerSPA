import { createTextElement, createLink } from "../utils/createElement";

export const InterviewsPage = {
    path: '/interviews',
    async render(params, router) {
        const rootNode = document.createElement('div');
        rootNode.appendChild(createTextElement('h2', 'Interviews Page'));
        rootNode.appendChild(createLink(router, 'Go Back Home', ['']))
        return rootNode;
    },
    async afterRender() {
        console.log("After Render Called");
    }
};4