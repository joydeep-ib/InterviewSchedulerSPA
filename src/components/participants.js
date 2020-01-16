import { createDIV, createNavBar, createTextElement, createLink, createParticipantCard } from "../utils/createElement";

export const ParticipantsPage = {
    path: '/participants',
    clickable: true,
    title: 'Participants',
    async render(params, router) {
        const rootNode = document.createElement('div');
        rootNode.appendChild(createNavBar(router));

        const _container = createDIV('container');
        _container.appendChild(document.createElement('br'));

        _container.appendChild(createTextElement('h2', 'Participants List'));
        _container.appendChild(document.createElement('hr'));
        _container.appendChild(document.createElement('br'));
        const _newButton = createLink(router, 'Add Participant', ['participants', 'new'], "btn btn-primary btn-md");
        _newButton.setAttribute('role', 'button');
        _container.appendChild(_newButton);

        const _content = createDIV('row');
        _content.id = 'ib_content';
        _content.appendChild(createTextElement('p', 'Loading', 'card-container'));
        _container.appendChild(_content);
        rootNode.appendChild(_container);

        return rootNode;
    },
    async afterRender(router) {
        const _participantList = await fetch('http://5e1c4ab6db8a52001414ccdd.mockapi.io/api/v1/Participants');
        const _participantListJSON = await _participantList.json();

        const _content = document.getElementById('ib_content');
        await (new Promise((res, rej) => setTimeout(res(), 1000)));

        _content.innerHTML = '';

        _participantListJSON.forEach(participant => {
            const _column = createDIV('col-sm-4 card-container');
            _column.appendChild(createParticipantCard(participant));
            _content.appendChild(_column);
        });

    }
}
export const ParticipantPage = {
    path: '/participants/:id',
    clickable: false,
    title: 'Participant',

    async render(params, router) {
        const rootNode = document.createElement('div');
        rootNode.appendChild(createNavBar(router));

        const _container = createDIV('container');
        _container.appendChild(document.createElement('br'));

        _container.appendChild(createTextElement('h2', 'Participants List'));
        _container.appendChild(document.createElement('hr'));
        _container.appendChild(document.createElement('br'));

        const _content = createDIV('row');
        _content.id = 'ib_content';
        _content.appendChild(createTextElement('p', 'Loading', 'card-container'));
        _container.appendChild(_content);
        rootNode.appendChild(_container);

        return rootNode;
    },
    async afterRender() {

    },
}