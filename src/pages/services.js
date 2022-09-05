import React from 'react';
import { useSelector } from 'react-redux';
import languages from '../languages/languages';
import { selectLocale } from '../store';
import axios from 'axios';
import { IoClose } from 'react-icons/io5';

const Services = () => {
  const locale = useSelector(selectLocale).locale;

  const contactFormHandler = (e) => {
    e.preventDefault();

    const subject = document.querySelector('.services_select').value;
    const userMail = document.querySelector('.services_input_mail').value;
    const userProject = JSON.stringify(
      document.querySelector('.services_input_description').value
    );

    axios
      .post('https://backend-webshop-v1.herokuapp.com/contactform', {
        subject,
        userMail,
        userProject,
      })
      .then((res) => {
        if (res.status === 200)
          document.querySelector('.services_input_mail').value = '';
        document.querySelector('.services_input_description').value = '';
        document
          .querySelector('.services_contactform_success')
          .classList.remove('hidden');
        document.querySelector('.services_form').classList.add('hidden');
        return;
      })
      .catch((err) => {
        alert(
          'Sorry! Something went wrong, please try again or contact info@grethen-edition.com directly.'
        );
        console.error('GG', err);
      });
  };

  const closeSuccessHandler = () => {
    document
      .querySelector('.services_contactform_success')
      .classList.add('hidden');
    document.querySelector('.services_form').classList.remove('hidden');
  };

  return (
    <div className="services">
      <section>
        <h1>{languages.engraving[locale]}</h1>
        <p>{languages.engraving_description[locale]}</p>
      </section>
      <section>
        <h1>Arrangement</h1>
        <p>{languages.arrangement_description[locale]}</p>
      </section>
      <section>
        <h1>{languages.composition[locale]}</h1>
        <p>{languages.composition_description[locale]}</p>
      </section>
      <div className="services_contactform">
        <div className="services_form">
          <form onSubmit={(e) => contactFormHandler(e)}>
            <h1>{languages.contactus[locale]}</h1>
            <select className="services_select">
              <option value="engraving">{languages.engraving[locale]}</option>
              <option value="arrangement">Arrangement</option>
              <option value="composition">
                {languages.composition[locale]}
              </option>
            </select>
            <input
              className="services_input_mail"
              type="email"
              placeholder="Email"
              required
            />
            <textarea
              className="services_input_description"
              name="user_input_description"
              placeholder={languages.describe[locale]}
              required
            ></textarea>
            <button className="pill_btn_accent" type="submit">
              {languages.submit[locale]}
            </button>
          </form>
        </div>
        <div className="services_contactform_success services_contactform hidden">
          <button
            className="services_contactform_success_closeBtn"
            onClick={closeSuccessHandler}
          >
            <IoClose />
          </button>
          <h1>{languages.alertcontactform[locale]}</h1>
        </div>
      </div>
    </div>
  );
};

export default Services;
