export class LolReactDomComponent {
    constructor(element) {
        this._currentElement = element;
    }
    /**
     * This method creates the DOM element & stores it in an instance variable
     * @param {DOMObject} container
     */
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

class CompositeComponentWrapper {
    constructor(elem) {
        this._currentElement = elem;
    }

    mountComponent(container) {
        const Component = this._currentElement.type;
        const componentInstance = new Component(this._currentElement.props);
        const element = componentInstance.render();

        //
        while (typeof element === 'function') {
            element = (new element.type(element.props)).render();
        }

        const domComponentInstance = new LolReactDomComponent(element);

        return domComponentInstance.mountComponent(container);
    }
}

export const LolReact = {
    /**
     * I don't have any idea on how I'm going to implement the JSX parser,
     * I'm using this createElement which works in a
     * same way as the React < 15 used to work
     *
     * Create element expects props & children & returns a virtual element
     *
     * @param {String} type
     * @param {Object} props
     * @param {Array} children
     */
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
    createClass(spec) {
        function Constructor(props) {
            this.props = props;
        }
        Constructor.prototype.render = spec.render;
        return Constructor;
    },

    render(element, container) {
        const componentInstance = new CompositeComponentWrapper(element);

        return componentInstance.mountComponent(container);
    }
};
