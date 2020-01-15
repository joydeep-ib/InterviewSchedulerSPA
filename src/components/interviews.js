import {
    createTextElement,
    createLink,
    createNavBar,
    createDIV,
    createInterviewCard,
    createFormField,
    createMultiSelect,
    createSelectOption,
} from "../utils/createElement";
import './interview.scss';

export const InterviewsPage = {
    path: '/interviews',
    clickable: true,
    title: 'Interviews',
    async render(params, router) {
        const rootNode = document.createElement('div');
        rootNode.appendChild(createNavBar(router));

        const _container = createDIV('container');
        _container.appendChild(document.createElement('br'));

        _container.appendChild(createTextElement('h2', 'Interviews Page'));
        _container.appendChild(document.createElement('hr'));
        _container.appendChild(document.createElement('br'));
        const _newButton = createLink(router, 'Schedule New', ['interviews', 'new'], "btn btn-primary btn-md");
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
        const _content = document.getElementById('ib_content');
        await (new Promise((res, rej) => setTimeout(res(), 1000)));
        const _interviewList = await fetch('http://5e1c4ab6db8a52001414ccdd.mockapi.io/api/v1/Interviews');
        const _interviewListJSON = await _interviewList.json();
        _content.innerHTML = '';
        _interviewListJSON.forEach((interview, i) => {
            const _column = createDIV('col-sm-4 card-container');
            _column.appendChild(createInterviewCard(router, interview, i));
            _content.appendChild(_column);
        });
        console.log(_interviewListJSON);
    }
};

export const NewInterviewPage = {
    path: '/interviews/new',
    clickable: false,
    title: 'New Interview',
    async render(params, router) {
        const _rootNode = createDIV('');
        _rootNode.appendChild(createNavBar(router));
        const _container = createDIV('container');
        _container.appendChild(document.createElement('br'));
        _container.appendChild(createTextElement('h2', 'Schedule New Interview'));
        _container.appendChild(document.createElement('br'));

        const _form = document.createElement('form');
        _form.id = 'interviewForm';
        _form.onsubmit = (e) => {
            e.preventDefault();
            alert("Thanks for scheduling an interview. As the API part is missing, this won't result a new interview. Sorry for that :P")
        }
        _form.appendChild(createFormField('interviewTitle', 'Title', 'text', 'title'));
        _form.appendChild(createFormField('interviewDescription', 'Description', 'text', 'description'));
        _form.appendChild(createMultiSelect('interviewParticipants', 'Participants', 'participants'));
        _form.appendChild(createFormField('interviewStartDate', 'Start Date', 'date', 'startDate'));
        _form.appendChild(createFormField('interviewStartTime', 'Start Time', 'time', 'startTime'));
        _form.appendChild(createFormField('interviewEndDate', 'End Date', 'date', 'endDate'));
        _form.appendChild(createFormField('interviewEndTime', 'End Time', 'time', 'endTime'));
        const _submitButton = document.createElement('button');
        _submitButton.type = 'submit';
        _submitButton.className = 'btn btn-primary';
        _submitButton.innerHTML = 'Create Interview';
        _form.appendChild(_submitButton);
        _container.appendChild(_form);
        _container.appendChild(document.createElement('br'));
        _rootNode.appendChild(_container);
        return _rootNode;
    },
    async afterRender(router) {
        await (new Promise((res, rej) => setTimeout(res(), 1000)));
        const _participantList = await fetch('http://5e1c4ab6db8a52001414ccdd.mockapi.io/api/v1/Participants');
        const _participantListJSON = await _participantList.json();
        const optionsElem = document.getElementById('interviewParticipants');
        optionsElem.innerHTML = '';
        _participantListJSON.forEach((participant) => {
            optionsElem.appendChild(createSelectOption(participant.id, participant.name));
        })
    }
};