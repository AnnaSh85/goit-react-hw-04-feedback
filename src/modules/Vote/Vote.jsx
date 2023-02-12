import style from './vote.module.css';
import { useState } from 'react';
import Statistics from './Statistics/Statistics';
import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
import Section from 'modules/Section/Section';
import Notification from './Notification/Notification';

const voteOptions = ['good', 'bad', 'neutral'];

const Vote = () => {
  const [votes, setVotes] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const leaveVote = name => {
    setVotes(prevState => {
      const value = prevState[name];
      return { ...prevState, [name]: value + 1 };
    });
  };

  const countTotalFeedback = () => {
    const { good, bad, neutral } = votes;
    const total = good + bad + neutral;
    return total;
  };

  const countPositiveFeedbackPercentage = () => {
    const total = countTotalFeedback();
    if (!total) {
      return 0;
    }
    const result = ((votes.good / total) * 100).toFixed(0);
    return Number(result);
  };

  const positivePercentage = countPositiveFeedbackPercentage();
  const total = votes.good + votes.bad + votes.neutral;

  return (
    <div className={style.wrapper}>
      <Section title="Please leave feedback">
        <FeedbackOptions options={voteOptions} leaveVote={leaveVote} />
      </Section>

      <Section title="Statistic">
        {countTotalFeedback() !== 0 ? (
          <Statistics
            total={total}
            good={votes.good}
            bad={votes.bad}
            neutral={votes.neutral}
            positivePercentage={positivePercentage}
          />
        ) : (
          <Notification message="There is no feedback"></Notification>
        )}
      </Section>
    </div>
  );
};

export default Vote;
