var React = require('react');

class HelloMessage extends React.Component {
  render() {
    return <div>Hello {this.props.title}</div>;
  }
}

module.exports = HelloMessage;
