import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Form,
  FormGroup,Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
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
      message: ''
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onHide = this.onHide.bind(this);
  }

  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }

  handleMessageChange(event) {
    this.setState({message: event.target.value});
  }

  onHide() {
    this.setState({
      email: '',
      message: ''
    });
    this.props.onHide();
  }

  onSubmit() {
    sendEmail(this.state.email, this.state.message);
    this.onHide();
  }
  render() {
    const { showModal } = this.props;
    return (
      <Modal isOpen={showModal} toggle={this.onHide}>
        <ModalHeader closeButton>
          ¡Hola!
        </ModalHeader>
        <ModalBody>
          <h4>Envíanos tu comentario o tu evento MTB</h4>
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
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button onClick={this.onHide}>Cerrar</Button>
          <Button color="primary" onClick={this.onSubmit}>
            Enviar
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

ContactUs.propTypes = propTypes;

export default ContactUs;