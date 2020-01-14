/**
 * Not able to solve issues
 * Tried to implement a react style declarative library.
 *  https://www.mattgreer.org/articles/react-internals-part-one-basic-rendering/
 *
 * Wasn't able to solve multi child render issues.
 * Example:
 * <div>
 *   <hr />
 *   <hr />
 * </div>
 *
 */
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

        // this._hostNode = domElement;
        // return domElement;
    }
}

const TopLevelWrapper = function(props) {
    this.props = props;
}

TopLevelWrapper.prototype.render = function() {
    return this.props;
}

class CompositeComponentWrapper {
    constructor(elem) {
        this._currentElement = elem;
    }

    mountComponent(container) {
        const Component = this._currentElement.type;
        const componentInstance = new Component(this._currentElement.props);

        let renderedElement = componentInstance.render();

        while (typeof renderedElement.type === 'function') {
            renderedElement = (new renderedElement.type(renderedElement.props)).render();
        }

        const domComponentInstance = new LolReactDomComponent(renderedElement);
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
        Constructor.prototype = Object.assign(Constructor.prototype, spec);
        return Constructor;
    },

    render(element, container) {
        const wrapperElement = this.createElement(TopLevelWrapper, element)
        const componentInstance = new CompositeComponentWrapper(wrapperElement);

        return componentInstance.mountComponent(container);
    }
};

const MyH1 = LolReact.createClass({
    render() {
          return LolReact.createElement('h1', null, this.props.message);
    }
});

const MyMessage = LolReact.createClass({
    render() {
          if (this.props.asTitle) {
                  return LolReact.createElement(MyH1, { message: this.props.message });
          } else {
                return LolReact.createElement('p', null, this.props.message);
          }
    }
});

LolReact.render(
    LolReact.createElement(MyMessage, { asTitle: false, message: 'this is an h1 message' }),
    document.getElementById('root')
);