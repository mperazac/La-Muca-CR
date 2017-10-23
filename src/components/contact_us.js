import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  ControlLabel,
  FormControl,
  FormGroup,
  Modal,
  HelpBlock
} from  'react-bootstrap';
import { sendEmail } from '../api/index';

const propTypes = {
  showModal: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired
};

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

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
      <Modal show={showModal} onHide={this.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>¡Hola!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Envíanos tu comentario o tu evento MTB</h4>
          <p>Si nos vas a enviar tu evento de MTB para que lo publiquenos,
            lo único que nos debes de enviar es el enlace al evento en
            Facebook. <span role="img" aria-label="emoji">😉</span></p>

          <form action="emailHandler.php" method="POST" id="emailForm">
            <FieldGroup
              id="formControlsEmail"
              type="email"
              label="Correo electrónico"
              value={this.state.email}
              onChange={this.handleEmailChange}
            />
            <FormGroup controlId="formControlsTextarea">
              <ControlLabel>Mensaje</ControlLabel>
              <FormControl
                componentClass="textarea"
                value={this.state.message}
                onChange={this.handleMessageChange}
              />
            </FormGroup>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.onHide}>Cerrar</Button>
          <Button bsStyle="primary" onClick={this.onSubmit}>
            Enviar
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

ContactUs.propTypes = propTypes;

export default ContactUs;