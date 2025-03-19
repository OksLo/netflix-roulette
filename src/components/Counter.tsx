import React, { Component } from 'react';

interface ICounterProps {
  initValue: number;
}

interface ICounterState {
  count: number;
}

class Counter extends Component<ICounterProps, ICounterState> {
  constructor(props: { initValue: number }) {
    super(props);

    // Initialize state
    this.state = {
      count: props.initValue,
    };

    // Bind the changeGreeting method to this instance
    this.incrementCount = this.incrementCount.bind(this);
    this.decrementCount = this.decrementCount.bind(this);
  }

  // Methods to change count
  incrementCount() {
    this.setState((prevState) => ({ count: prevState.count + 1 }));
  }

  decrementCount() {
    this.setState((prevState) => ({ count: prevState.count - 1 }));
  }

  render() {
    return React.createElement(
      'div', // Parent container element
      { className: 'greeting-component' }, // Props for the container element
      React.createElement(
        'div', // Header element
        {
          style: {
            marginBottom: '.5rem',
            fontSize: '2rem',
            color: '#F65261',
          }
        }, // No props for the header element
        this.state.count // Content of the header (state-based)
      ),
      React.createElement(
        'button', // Button element
        {
          style: {
            background: 'none',
            border: '1px solid #F65261',
            color: '#F65261',
            marginRight: '.5rem',
          },
          onClick: this.incrementCount, // Callback for the button click
        },
        '+1'
      ),
      React.createElement(
        'button', // Button element
        {
          style: {
            background: 'none',
            border: '1px solid #F65261',
            color: '#F65261',
          },
          onClick: this.decrementCount, // Callback for the button click
        },
        '-1'
      )
    );
  }
}

export default Counter;