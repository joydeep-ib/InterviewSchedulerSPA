export const createTextElement = (type, text, clsName='') => {
    const container = document.createElement(type);
    const _child = document.createTextNode(text);
    container.className = clsName;
    container.appendChild(_child);

    return container;
}

export const createLink = (router, text, route, clsName='') => {
    const _anchor = document.createElement('a');
    _anchor.href = "#";
    _anchor.onclick = (e) => {
        e.preventDefault();
        router.loadRoute(...route);
    };
    const _child = document.createTextNode(text);
    _anchor.appendChild(_child);
    _anchor.className = clsName;
    return _anchor;
}

export const createDIV = (name) => {
  const _container = document.createElement("div")
  _container.className = name;
  return _container;
}

export const createNavBar = (router) => {
  const _navBar = document.createElement('nav');
  _navBar.className = "navbar navbar-expand-lg navbar-light bg-light";

  const _homeRouteLink = createLink(router, "InterviewSPA", [""]);
  _homeRouteLink.className = "navbar-brand";
  _navBar.appendChild(_homeRouteLink);

  const _navItemList = document.createElement('ul');
  _navItemList.className = "navbar-nav mr-auto";

  router.routes.forEach(route => {
    if (route.clickable) {
      const _navItem = document.createElement('li');
      _navItem.className = "nav-item";

      if (router.currentRoute === route.path) {
        _navItem.classList.add("active");
      }
      const _navItemLink = createLink(router, route.title, route.path.split("/").slice(1))
      _navItemLink.className = "nav-link";

      _navItem.appendChild(_navItemLink);
      _navItemList.appendChild(_navItem);
    }
  });

  _navBar.appendChild(_navItemList);

  return _navBar;
}

export const createInterviewCard = (router, interview, showParticipants=true) => {
  const _card = createDIV("card");
  console.log(interview);
  const _cardHeader = createLink(router, `Interview#${interview.id}`, ['interview', interview.id], 'card-header')
  const _cardBody = createDIV("card-body");

  _cardBody.appendChild(createTextElement('h4', interview.title.toUpperCase(), 'card-title'));
  _cardBody.appendChild(createTextElement('h6', `Scheduled at: ${interview.startdt}`, 'card-subtitle mb-2 text-muted'));
  _cardBody.appendChild(createTextElement('h6', `Ends at: ${interview.enddt}`, 'card-subtitle mb-2 text-muted'));

  _cardBody.appendChild(createTextElement('p', interview.description, 'card-text'));

  const _cardFooter = createDIV("card-footer");
  _cardFooter.appendChild(createTextElement('h6', `Created at: ${interview.created_at}`, 'card-subtitle mb-2 text-muted'))
  // _cardFooter.appendChild(createTextElement('h6', `Updated at: ${interview.editedAt}`, 'card-subtitle mb-2 text-muted'))

  _card.appendChild(_cardHeader);
  _card.appendChild(_cardBody);
  _card.appendChild(_cardFooter);
  return _card;
}

export const createParticipantCard = (router, participant) => {
  const _card = createDIV("card");
  const _cardBody = createDIV("card-body");
  _cardBody.appendChild(createLink(router, participant.name.toUpperCase(), ['participant', participant.id], 'display-5'));
  _cardBody.appendChild(createTextElement('h6', `Participant ID: ${participant.id}`, ));
  _cardBody.appendChild(createTextElement('p', participant.email, 'card-text'));
  const _cardFooter = createDIV("card-footer");
  const _resumeLink = document.createElement('a');
  _resumeLink.href = participant.resume;
  _resumeLink.download = "";
  _resumeLink.innerHTML = "Download CV"
  _cardFooter.appendChild(_resumeLink);

  _card.appendChild(_cardBody);
  _card.appendChild(_cardFooter);

  return _card;
}
export const createFormField = (id, labelText, type, name) => {
  const _container = createDIV('form-group');
  const _label = document.createElement('label');
  const _input = document.createElement('input');
  _input.id = id;
  _input.type = type;
  _input.name = name;
  _input.className = "form-control";
  _label.setAttribute('for', id);
  _label.appendChild(document.createTextNode(labelText));

  _container.appendChild(_label);
  _container.appendChild(_input);

  return _container;
}

export const createSelectOption = (value, text) => {
  const _option = document.createElement('option');
  _option.value = value;
  _option.text = text;
  return _option;
}

export const createMultiSelect = (id, labelText, name) => {
  const _container = createDIV('form-group');
  const _label = document.createElement('label');
  const _input = document.createElement('select');
  _input.id = id;
  _input.name = name;
  _input.className = "form-control";
  _label.setAttribute('for', id);
  _input.setAttribute('multiple', '');
  _input.appendChild(createSelectOption(-1, 'Loading'));
  _label.appendChild(document.createTextNode(labelText));
  _container.appendChild(_label);
  _container.appendChild(_input);

  return _container;
}