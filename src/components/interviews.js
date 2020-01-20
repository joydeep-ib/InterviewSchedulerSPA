import {
    createTextElement,
    createLink,
    createNavBar,
    createDIV,
    createInterviewCard,
    createFormField,
    createMultiSelect,
    createSelectOption,
    createParticipantCard,
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
        const _interviewList = await fetch('/api/v1/interviews');
        const _interviewListJSON = await _interviewList.json();
        _content.innerHTML = '';
        _interviewListJSON.forEach((interview, i) => {
            const _column = createDIV('col-sm-4 card-container');
            _column.appendChild(createInterviewCard(router, interview));
            _content.appendChild(_column);
        });
    }
};

export const InterviewPage = {
    path: '/interview/:id',
    clickable: false,
    title: 'Interview',
    async render(params, router) {
        const rootNode = document.createElement('div');
        rootNode.appendChild(createNavBar(router));

        const _container = createDIV('container');
        _container.appendChild(document.createElement('br'));

        _container.appendChild(createTextElement('h2', `Interview ${params.id}`));
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
    async afterRender() {
    },
    async loadData(id, router) {
        const _interview = await fetch(`/api/v1/interviews/${id}`);
        const _interviewJSON = await _interview.json();

        const _content = document.getElementById('ib_content');

        const _column1 = createDIV('col-sm-5');
        _column1.appendChild(createInterviewCard(router, _interviewJSON, false));

        const _column2 = createDIV('col-sm-5');
        _column2.id = 'ib_content_participants';

        const _column3 = createDIV('col-sm-2');
        const _editButton = createLink(router, 'Edit', ['interview', id, 'edit'], "btn btn-link btn-md");
        const _deleteButton = createLink(router, 'Delete', ['interview', id, 'delete'], "btn btn-danger btn-md");
        _column3.appendChild(_editButton);
        _column3.appendChild(_deleteButton);

        setImmediate(() => this.loadParticipants(_interviewJSON.participants));
        _content.appendChild(_column1);
        _content.appendChild(_column2);
        _content.appendChild(_column3);

    },
    async loadParticipants(participants) {
        const _column2 = document.getElementById('ib_content_participants');
        for (const _participant of participants) {
            // const _participant = await fetch(`/api/v1/participants/${id}`);
            // const _participantJSON = await _participant.json();
            _column2.appendChild(createParticipantCard(router, _participant));
            _column2.appendChild(document.createElement('br'));
        }
    }
}
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
        _form.onsubmit = async (e) => {
            e.preventDefault();
            const data  = {};
            for (const elem of e.srcElement.elements) {
                if (elem.type !== "select-multiple") {
                    data[elem.name] = elem.value;
                } else {
                    data[elem.name] = [];
                    for (const option of elem.options) {
                        if (option.selected) {
                            data[elem.name].push(option.value);
                        }
                    }
                }
            }
            console.log(data);
            const _formResp = await fetch('/api/v1/interviews', {
                method: 'post',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (_formResp.status === 200) {
                alert('Interview Scheduled');
            }
            e.preventDefault();
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
        const _participantList = await fetch('/api/v1/participants');
        const _participantListJSON = await _participantList.json();
        const optionsElem = document.getElementById('interviewParticipants');
        optionsElem.innerHTML = '';
        _participantListJSON.forEach((participant) => {
            optionsElem.appendChild(createSelectOption(participant.id, participant.name));
        })
    }
};