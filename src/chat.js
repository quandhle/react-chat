import React, { Compoent } from 'react';
import ChatInput from './chatInput';
import ChatMessage from './chatMessage';

const URL = 'ws://localhost:3030';

class Chat extends Compoent {
    state = {
        name: 'Bob',
        message: []
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
}