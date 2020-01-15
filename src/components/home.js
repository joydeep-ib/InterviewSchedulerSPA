import { createTextElement, createLink, createNavBar, createDIV } from "../utils/createElement";

export const HomePage = {
    path: '/',
    clickable: true,
    title: 'Home',
    async render(params, router) {
        const rootNode = document.createElement('div');
        rootNode.appendChild(createNavBar(router));
        const _container = createDIV('container');
        _container.appendChild(document.createElement('br'));

        const _jumbotron = createDIV('jumbotron');
        _jumbotron.appendChild(createTextElement('h1', 'Interview Scheduler', 'display-3'));
        _jumbotron.appendChild(createTextElement('p', 'Schedule your interviews with other people with this single page application', 'lead'));
        _jumbotron.appendChild(document.createElement('hr'));
        _jumbotron.appendChild(createTextElement('p', 'Frontend: Simplex Bootstrap & Vanilla Javascript, Routing: HTML5 history, Backend: REST API using Ruby on Rails :)'));
        _jumbotron.appendChild(createTextElement('p', 'InterviewBit Assignment: joydeep@interviewbit.com'));
        const _jumbotronButton = createLink(router, 'Get All Interviews', ['interviews'], "btn btn-primary btn-lg");
        _jumbotronButton.setAttribute('role', 'button');
        _jumbotron.appendChild(_jumbotronButton);
        _container.appendChild(_jumbotron);
        // _container.appendChild();
        _container.appendChild(document.createElement('br'));

        rootNode.appendChild(_container);

        return rootNode;
    },
    async afterRender() {
        console.log("After Render Called");
    }
};