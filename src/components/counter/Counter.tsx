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

    this.state = {
      count: props.initValue,
    };

    this.incrementCount = this.incrementCount.bind(this);
    this.decrementCount = this.decrementCount.bind(this);
  }

  incrementCount() {
    this.setState((prevState) => ({ count: prevState.count + 1 }));
  }

  decrementCount() {
    this.setState((prevState) => ({ count: prevState.count - 1 }));
  }

  render() {
    return React.createElement(
      'div',
      { className: 'greeting-component' },
      React.createElement(
        'div',
        {
          style: {
            marginBottom: '.5rem',
            fontSize: '2rem',
            color: '#F65261',
          },
          'data-testid': 'counter-value',
        },
        this.state.count
      ),
      React.createElement(
        'button',
        {
          style: {
            background: 'none',
            border: '1px solid #F65261',
            color: '#F65261',
            marginRight: '.5rem',
          },
          'data-testid': 'counter-btn-increment',
          onClick: this.incrementCount,
        },
        '+1'
      ),
      React.createElement(
        'button',
        {
          style: {
            background: 'none',
            border: '1px solid #F65261',
            color: '#F65261',
          },
          'data-testid': 'counter-btn-decrement',
          onClick: this.decrementCount,
        },
        '-1'
      )
    );
  }
}

export default Counter;