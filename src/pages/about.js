import React from 'react';
import { connect } from 'react-redux';
import FAQs from '../languages/FAQs';
import { FaPlus } from 'react-icons/fa';

const About = (props) => {
  const revealAnswerHandler = (e) => {
    const answer = e.target.closest('.FAQ_container').childNodes[2];

    answer.classList.toggle('hidden');
  };

  return (
    <div className="about_container">
      <h1>FAQs</h1>
      <section className="FAQ">
        <div className="FAQ_container">
          <h2 className="FAQ_question">{FAQs.Q1[props.locale]}</h2>
          <button
            className="FAQ_reveal_btn"
            onClick={(e) => revealAnswerHandler(e)}
          >
            <FaPlus />
          </button>
          <p className="FAQ_answer hidden">{FAQs.A1[props.locale]}</p>
        </div>
        <hr className="FAQ_line"></hr>
        <div className="FAQ_container">
          <h2 className="FAQ_question">{FAQs.Q2[props.locale]}</h2>
          <button
            className="FAQ_reveal_btn"
            onClick={(e) => revealAnswerHandler(e)}
          >
            <FaPlus />
          </button>
          <p className="FAQ_answer hidden">{FAQs.A2[props.locale]}</p>
        </div>
        <hr className="FAQ_line"></hr>
        <div className="FAQ_container">
          <h2 className="FAQ_question">{FAQs.Q3[props.locale]}</h2>
          <button
            className="FAQ_reveal_btn"
            onClick={(e) => revealAnswerHandler(e)}
          >
            <FaPlus />
          </button>
          <p className="FAQ_answer hidden">{FAQs.A3[props.locale]}</p>
        </div>
        <hr className="FAQ_line"></hr>
      </section>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    locale: state.locale,
    cartModal: state.cartModal,
  };
};

export default connect(mapStateToProps)(About);
