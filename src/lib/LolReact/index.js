export class LolReactDomComponent {
    constructor(element) {
        this._currentElement = element;
    }
    mountComponent(container) {
        const { type, props: { children } } = this._currentElement;

        const domElement = document.createElement(type);
        const textNode = document.createTextNode(children);

        domElement.appendChild(textNode);
        container.appendChild(domElement);

        this._hostNode = domElement;
        return domElement;
    }
}

export const LolReact = {
    
    createElement(type, props, children) {
        props = props || {};
        const element = {
            type,
            props,
        };
        
        if (children) {
            element.props.children = children;
        }

        return element;        
    },
    render(element, container) {
        const componentInstance = new LolReactDomComponent(element);

        return componentInstance.mountComponent(container);
    }
};
