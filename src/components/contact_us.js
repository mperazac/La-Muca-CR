import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Form,
  FormGroup,Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody
} from  'reactstrap';
import { sendEmail } from '../api/index';

const propTypes = {
  showModal: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired
};

class ContactUs extends Component {
  constructor() {
    super();
    this.state = {
      email:'',
      message: '',
      facebook: ''
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.handleFacebookChange = this.handleFacebookChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onHide = this.onHide.bind(this);
  }

  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }

  handleFacebookChange(event) {
    this.setState({facebook: event.target.value});
  }

  handleMessageChange(event) {
    this.setState({message: event.target.value});
  }

  onHide() {
    this.setState({
      email: '',
      message: '',
      facebook: ''
    });
    this.props.onHide();
  }

  onSubmit() {
    sendEmail(this.state.email, this.state.message, this.state.facebook);
    this.onHide();
  }
  render() {
    const { showModal } = this.props;
    return (
      <Modal isOpen={showModal} toggle={this.onHide}>
        <ModalHeader closeButton>
          Envíanos tu comentario o tu evento MTB
        </ModalHeader>
        <ModalBody>
          <p>Si nos vas a enviar tu evento de MTB para que lo publiquenos,
            lo único que nos debes de enviar es el enlace al evento en
            Facebook. ¡Es gratis! <span role="img" aria-label="emoji">😉</span></p>

          <Form action="emailHandler.php" method="POST" id="emailForm">
            <FormGroup>
              <Label for="formControlsEmail">Correo electrónico</Label>
              <Input
                type="email"
                name="email"
                id="formControlsEmail"
                value={this.state.email}
                onChange={this.handleEmailChange}
              />
            </FormGroup>
            <FormGroup controlId="formControlsTextarea">
              <Label for="message">Mensaje</Label>
              <Input
                type="textarea"
                id="message"
                value={this.state.message}
                onChange={this.handleMessageChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="formControlsFacebook">Enlace al evento en Facebook</Label>
              <Input
                type="facebook"
                name="facebook"
                id="formControlsFacebook"
                value={this.state.facebook}
                placeholder="https://www.facebook.com/events/id_evento"
                onChange={this.handleFacebookChange}
              />
            </FormGroup>
            <div className="g-recaptcha" data-sitekey="6LeJdTUUAAAAAJscEPeq0GQXH3PpuJmfdt_WxiI0"></div>
            <Button onClick={this.onHide}>Cerrar</Button>
            <Button color="primary" onClick={this.onSubmit}>
              Enviar
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    );
  }
}

ContactUs.propTypes = propTypes;

export default ContactUs;