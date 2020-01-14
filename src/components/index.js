import { LolReact } from "../lib/LolReact";

export const Title = LolReact.createClass({
    render() {
        return LolReact.createElement('h1', null, this.props.message);
    }
});