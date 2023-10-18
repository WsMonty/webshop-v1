import React from 'react';
import { useSelector } from 'react-redux';
import languages from '../languages/languages';
import { selectLocale } from '../store';
// import axios from 'axios';
import { IoClose } from 'react-icons/io5';
// import Select from 'react-select';

const Services = () => {
  const locale = useSelector(selectLocale).locale;

  // const contactFormHandler = (e) => {
  //   e.preventDefault();

  //   const subject = document.querySelector(
  //     '.services_contactform_select'
  //   ).textContent;
  //   const userMail = document.querySelector('.services_input_mail').value;
  //   const userProject = JSON.stringify(
  //     document.querySelector('.services_input_description').value
  //   );

  //   axios
  //     .post('https://backend-webshop-v1.herokuapp.com/contactform', {
  //       subject,
  //       userMail,
  //       userProject,
  //     })
  //     .then((res) => {
  //       if (res.status === 200)
  //         document.querySelector('.services_input_mail').value = '';
  //       document.querySelector('.services_input_description').value = '';
  //       document
  //         .querySelector('.services_contactform_success')
  //         .classList.remove('hidden');
  //       document.querySelector('.services_form').classList.add('hidden');
  //       return;
  //     })
  //     .catch((err) => {
  //       alert(
  //         'Sorry! Something went wrong, please try again or contact info@grethen-edition.com directly.'
  //       );
  //       console.error('GG', err);
  //     });
  // };

  const closeSuccessHandler = () => {
    document
      .querySelector('.services_contactform_success')
      .classList.add('hidden');
    document.querySelector('.services_form').classList.remove('hidden');
  };

  // const customStylesSelect = {
  //   control: (provided, state) => ({
  //     ...provided,
  //     borderRadius: '2em',
  //     paddingLeft: '1em',
  //     border: '1px solid black',
  //     background: 'transparent',
  //     cursor: 'pointer',
  //   }),
  //   menu: (provided, state) => ({
  //     ...provided,
  //   }),
  // };

  // const customThemeSelect = (theme) => ({
  //   ...theme,
  //   colors: {
  //     ...theme.colors,
  //     primary: '#FFCC4A',
  //     primary25: '#CCCCCC',
  //     primary50: '#B3B3B3',
  //   },
  // });

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
          <h2>
            <a href="/contact" className="services_contactLink">
              Contact me
            </a>{' '}
            if you need any of these services! I am looking forward to hearing
            from you.
          </h2>
          {/* <form onSubmit={(e) => contactFormHandler(e)}>
            <h1>{languages.contactus[locale]}</h1>
            <Select
              className="services_contactform_select"
              options={[
                { value: 'engraving', label: languages.engraving[locale] },
                { value: 'arrangement', label: 'Arrangement' },
                { value: 'composition', label: languages.composition[locale] },
              ]}
              styles={customStylesSelect}
              theme={customThemeSelect}
              isClearable
              placeholder={languages.selectCategory[locale]}
            />
            {/* <select className="services_select">
              <option value={''} default disabled selected hidden>
                <IoCaretDown />
              </option>
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
          </form> */}
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
