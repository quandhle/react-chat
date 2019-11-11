import React, { Component } from 'react';
import ChatInput from './chatInput';
import ChatMessage from './chatMessage';

const URL = 'ws://localhost:3030';

class Chat extends Component {
    state = {
        name: 'Bob',
        messages: []
    }

    ws = new WebSocket(URL);

    componentDidMount() {
        this.ws.onopen = () => {
            console.log('Connected')
        }

        this.ws.onmessage = event => {
            const message = JSON.parse(event.data);
            
            this.addMessage(message);
        }

        this.ws.onclose = () => {
            console.log('Disconnected')

            this.setState({
                ws: new WebSocket(URL)
            })
        }
    }

    addMessage = message => {
        this.setState( state => ({
            messages: [message, ...state.messages]
        }))
    }

    submitMessage = messageString => {
        const message = {
            name: this.state.name,
            message: messageString
        }

        this.ws.send(JSON.stringify(message))
        this.addMessage(message)
    }

    handleChange = event => {
        this.setState({
            name: event.target.value
        })
    }

    handleSubmitMessage = messageString => {
        this.submitMessage(messageString)
    }

    render() {
        const { name } = this.state;

        return (
            <div>
                <label htmlFor="name">
                    Name: &nbsp;
                    <input
                        type="text"
                        id={'name'}
                        placeholder={'Enter your name...'}
                        value={name}
                        onChange={this.handleChange}
                    />
                </label>
                <ChatInput
                    ws={this.ws}
                    onSubmitMessage={this.handleSubmitMessage}
                />
                {this.state.messages.map((message, index) => 
                    <ChatMessage
                        key={index}
                        message={message.message}
                        name={message.name}
                    />
                )}
            </div>
        )
    }
}

export default Chat;
