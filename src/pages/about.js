import React from 'react';
import { useSelector } from 'react-redux';
import FAQs from '../languages/FAQs';
import { FaPlus } from 'react-icons/fa';
import { GatsbySeo } from 'gatsby-plugin-next-seo';
import { selectLocale } from '../store.js';

const About = () => {
  const locale = useSelector(selectLocale).locale || 'en';
  const revealAnswerHandler = (e) => {
    document
      .querySelectorAll('.FAQ_answer')
      .forEach((answer) => answer.classList.add('hidden'));
    const answer = e.target.closest('.FAQ_container').childNodes[2];

    answer.classList.toggle('hidden');
  };

  return (
    <div className="about_container">
      <GatsbySeo
        title="Grethen Edition | About"
        description="About page for Grethen Edition with FAQs."
        language="en"
        noindex={false}
        nofollow={false}
      />
      <h1>FAQs</h1>
      <section className="FAQ">
        <div className="FAQ_container">
          <h2 className="FAQ_question">{FAQs.Q1[locale]}</h2>
          <button
            className="FAQ_reveal_btn"
            onClick={(e) => revealAnswerHandler(e)}
          >
            <FaPlus />
          </button>
          <p className="FAQ_answer hidden">{FAQs.A1[locale]}</p>
        </div>
        <hr className="FAQ_line"></hr>
        <div className="FAQ_container">
          <h2 className="FAQ_question">{FAQs.Q2[locale]}</h2>
          <button
            className="FAQ_reveal_btn"
            onClick={(e) => revealAnswerHandler(e)}
          >
            <FaPlus />
          </button>
          <p className="FAQ_answer hidden">{FAQs.A2[locale]}</p>
        </div>
        <hr className="FAQ_line"></hr>
        <div className="FAQ_container">
          <h2 className="FAQ_question">{FAQs.Q3[locale]}</h2>
          <button
            className="FAQ_reveal_btn"
            onClick={(e) => revealAnswerHandler(e)}
          >
            <FaPlus />
          </button>
          <p className="FAQ_answer hidden">{FAQs.A3[locale]}</p>
        </div>
        <hr className="FAQ_line"></hr>
      </section>
    </div>
  );
};

export default About;
