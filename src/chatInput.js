import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ChatInput extends Component {
    static PropTypes = {
        onSubmitMessage: PropTypes.func.isRequired
    }

    state = {
        message: ''
    }

    handleSubmit = event => {
        event.preventDefault();

        this.props.onSubmitMessage(this.state.message);
        
        this.setState({
            message: ''
        })
    }

    handleChange = event => {
        this.setState({
            message: event.target.value
        })
    }

    render() {
        return (
            <form
                action="."
                onSubmit={this.handleSubmit}
            >
                <input
                    type="text"
                    placeholder="Enter message..."
                    value={this.state.message}
                    onChange={this.handleChange}
                />
            </form>
        )
    }
}

export default ChatInput;
