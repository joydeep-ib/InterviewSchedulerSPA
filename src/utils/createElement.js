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

export const createInterviewCard = (router, interview, i) => {
  const _card = createDIV("card");
  const _cardHeader = createTextElement('h3', `Interview #${i}`, 'card-header')
  const _cardBody = createDIV("card-body");

  _cardBody.appendChild(createTextElement('h4', interview.title.toUpperCase(), 'card-title'));
  _cardBody.appendChild(createTextElement('h6', `Scheduled at: ${interview.scheduledAt}`, 'card-subtitle mb-2 text-muted'));
  _cardBody.appendChild(createTextElement('p', interview.description, 'card-text'));
  interview.participants.forEach((id) => {
    _cardBody.appendChild(createLink(router, `Participant #${id}`, ['participants',id], 'card-link'))

  })
  const _cardFooter = createDIV("card-footer");
  _cardFooter.appendChild(createTextElement('h6', `Created at: ${interview.createdAt}`, 'card-subtitle mb-2 text-muted'))
  _cardFooter.appendChild(createTextElement('h6', `Updated at: ${interview.editedAt}`, 'card-subtitle mb-2 text-muted'))

  _card.appendChild(_cardHeader);
  _card.appendChild(_cardBody);
  _card.appendChild(_cardFooter);
  return _card;
}