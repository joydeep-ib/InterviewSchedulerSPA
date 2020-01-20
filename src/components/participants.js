import { createDIV, createNavBar, createTextElement, createLink, createParticipantCard, createFormField } from "../utils/createElement";
import { API_HOST } from '../utils/constants';

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
        const _participantList = await fetch(`/api/v1/participants`);
        const _participantListJSON = await _participantList.json();

        const _content = document.getElementById('ib_content');
        await (new Promise((res, rej) => setTimeout(res(), 1000)));

        _content.innerHTML = '';

        _participantListJSON.forEach(participant => {
            const _column = createDIV('col-sm-4 card-container');
            _column.appendChild(createParticipantCard(router, participant));
            _content.appendChild(_column);
        });

    }
}
export const ParticipantPage = {
    path: '/participant/:id',
    clickable: false,
    title: 'Participant',

    async render(params, router) {
        const rootNode = document.createElement('div');
        rootNode.appendChild(createNavBar(router));

        const _container = createDIV('container');
        _container.appendChild(document.createElement('br'));

        _container.appendChild(createTextElement('h2', `Participant ${params.id}`));
        _container.appendChild(document.createElement('hr'));
        _container.appendChild(document.createElement('br'));

        const _content = createDIV('row');
        _content.id = 'ib_content';

        _container.appendChild(_content);
        rootNode.appendChild(_container);
        // Time to mount the dom
        setImmediate(() => this.loadData(params.id, router));
        return rootNode;
    },
    async afterRender(router) {

    },
    async loadData(id, router) {
        const _content = document.getElementById('ib_content');
        const _participant = await fetch(`/api/v1/participants/${id}`);
        const _participantJSON = await _participant.json();

        const _column1 = createDIV('col-sm-5 card-container');
        _column1.appendChild(createParticipantCard(router, _participantJSON));
        const _column2 = createDIV('col-sm-5 card-container');

        const _column3 = createDIV('col-sm-2 card-container');
        const _editButton = createLink(router, 'Edit', ['participant', id, 'edit'], "btn btn-link btn-md");
        const _deleteButton = createLink(router, 'Delete', ['participant', id, 'delete'], "btn btn-danger btn-md");

        _column3.appendChild(_editButton);
        _column3.appendChild(_deleteButton);

        _content.appendChild(_column1);

        _content.appendChild(_column2);
        _content.appendChild(_column3);


    }
}

export const NewParticipantPage = {
    path: '/participants/new',
    clickable: false,
    title: 'New Participant',
    render(params, router) {
        const rootNode = document.createElement('div');
        rootNode.appendChild(createNavBar(router));

        const _container = createDIV('container');
        _container.appendChild(document.createElement('br'));

        _container.appendChild(createTextElement('h2', 'New Participant'));

        const _form = document.createElement('form');
        _form.id = 'interviewForm';
        _form.onsubmit = (e) => {
            e.preventDefault();
            alert("Thanks for scheduling an interview. As the API part is missing, this won't result a new interview. Sorry for that :P")
        }
        _form.appendChild(createFormField('participantName', 'Name', 'text', 'name'));
        _form.appendChild(createFormField('participantEmail', 'Email', 'email', 'email'));
        _form.appendChild(createFormField('participantResume', 'Resume', 'file', 'resume'));


        const _submitButton = document.createElement('button');
        _submitButton.type = 'submit';
        _submitButton.className = 'btn btn-primary';
        _submitButton.innerHTML = 'Create Participant';
        _form.appendChild(_submitButton);

        _container.appendChild(_form);
        rootNode.appendChild(_container);

        return rootNode;
    },
    afterRender(router) {

    }
}