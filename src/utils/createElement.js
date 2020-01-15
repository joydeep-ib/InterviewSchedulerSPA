export const createTextElement = (type, text) => {
    const container = document.createElement(type);
    const _child = document.createTextNode(text);
    container.appendChild(_child);

    return container;
}

export const createLink = (router, text, route) => {
    const _anchor = document.createElement('a');
    _anchor.href = "#";
    _anchor.onclick = (e) => {
        e.preventDefault();
        router.loadRoute(...route);
    };
    const _child = document.createTextNode(text);
    _anchor.appendChild(_child);
    return _anchor;
}

export const createNavBar = (router) => {
    /*
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">InterviewSPA</a>
    <div class="collapse navbar-collapse" id="navbarColor03">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a class="nav-link" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Features</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Pricing</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">About</a>
        </li>
      </ul>
    </div>
  </nav>
  */
}