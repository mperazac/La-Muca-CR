import React, { Component } from 'react';
import ContactUs from './../components/contact_us';
import TermsAndConditions from './../components/terms_and_conditions';

import './footer.css';


class Footer extends Component {
  constructor() {
    super();
    this.state = {
      showContactUsModal: false,
      showTermsAndConditions: false
    };
    this.openContactUsModal = this.openContactUsModal.bind(this);
    this.closeContactUsModal = this.closeContactUsModal.bind(this);
    this.openTermsAndConditions = this.openTermsAndConditions.bind(this);
    this.closeTermsAndConditions = this.closeTermsAndConditions.bind(this);
  }

  closeContactUsModal() {
    this.setState({ showContactUsModal: false });
  }

  openContactUsModal() {
    this.setState({ showContactUsModal: true });
  }

  closeTermsAndConditions() {
    this.setState({ showTermsAndConditions: false });
  }

  openTermsAndConditions() {
    this.setState({ showTermsAndConditions: true });
  }

  render() {
    return (
      <div className="footer">
        <div className="mg-b-lg">
          <a
            onClick={this.openContactUsModal}
            className="mg-r-lg"
          > Contáctanos
          </a>
          <a onClick={this.openTermsAndConditions}>
            Términos y condiciones
          </a>
        </div>
        <p className="made-by">Hecho por <a href="http://www.webondigital.com">Web-On Digital</a> para todos los fiebres del MTB.</p>
        <ContactUs
          showModal={this.state.showContactUsModal}
          onHide={this.closeContactUsModal}
        />
        <TermsAndConditions
          showModal={this.state.showTermsAndConditions}
          onHide={this.closeTermsAndConditions}
        />
      </div>
    );
  }
}

export default Footer;