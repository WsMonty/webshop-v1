import React from 'react';
import { connect } from 'react-redux';
// import languages from '../languages/languages';
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
          <h2 className="FAQ_question">How long will the shipping take?</h2>
          <button
            className="FAQ_reveal_btn"
            onClick={(e) => revealAnswerHandler(e)}
          >
            <FaPlus />
          </button>
          <p className="FAQ_answer hidden">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
            corrupti minus laudantium ex culpa delectus ut ratione libero error
            a.
          </p>
        </div>
        <hr className="FAQ_line"></hr>
        <div className="FAQ_container">
          <h2 className="FAQ_question">How long will the shipping take?</h2>
          <button
            className="FAQ_reveal_btn"
            onClick={(e) => revealAnswerHandler(e)}
          >
            <FaPlus />
          </button>
          <p className="FAQ_answer hidden">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
            corrupti minus laudantium ex culpa delectus ut ratione libero error
            a.
          </p>
        </div>
        <hr className="FAQ_line"></hr>
        <div className="FAQ_container">
          <h2 className="FAQ_question">How long will the shipping take?</h2>
          <button
            className="FAQ_reveal_btn"
            onClick={(e) => revealAnswerHandler(e)}
          >
            <FaPlus />
          </button>
          <p className="FAQ_answer hidden">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
            corrupti minus laudantium ex culpa delectus ut ratione libero error
            a.
          </p>
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
