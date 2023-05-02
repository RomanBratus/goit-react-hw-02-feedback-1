import React, { Component } from 'react';
import Section from './Section/Section';
import Statistics from './Statistics/Statistics';
import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
import Notification from './Notification/Notification';

class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  handleClickButton = option => {
    this.setState(prevState => {
      console.log(prevState);
      console.log(name);
      return { [option]: prevState[name] + 1 };
    });
  };

  totalFeedbacks = () =>
    Object.values(this.state).reduce((acc, value) => acc + value, 0);

  countPositivePercent = () => {
    return this.totalFeedbacks()
      ? ((this.state.good / this.totalFeedbacks()) * 100).toFixed(0)
      : '0';
  };
  render() {
    const buttonNames = Object.keys(this.state);
    const { good, neutral, bad } = this.state;
    const total = this.totalFeedbacks();
    const positivePercentage = this.countPositivePercent();

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'right',
          marginLeft: '50px',
          fontSize: 30,
          color: '#010101',
        }}
      >
        <Section title="Please leave feedback">
          <FeedbackOptions
            options={buttonNames}
            onLeaveFeedback={this.handleClickButton}
          />
        </Section>

        <Section title={'Statistics'}>
          {total ? (
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={total}
              positivePercentage={positivePercentage}
            />
          ) : (
            <Notification message="No feedback given" />
          )}
        </Section>

      </div>
    );
  }
}
export default App;
