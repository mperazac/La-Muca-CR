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
  }

  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }

  handleMessageChange(event) {
    this.setState({message: event.target.value});
  }

  onSubmit() {
    alert(this.state.message + this.state.email);
    this.props.onHide();
  }
  render() {
    const { showModal, onHide } = this.props;
    return (
      <Modal show={showModal} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>¡Hola!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Envíanos tu comentario o tu evento MTB</h4>
          <p>Si nos vas a enviar tu evento de MTB para que lo publiquenos,
            lo único que nos debes de enviar es el enlace al evento en
            Facebook. <span role="img" aria-label="emoji">😉</span></p>
          <form>
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
          <Button onClick={this.onSubmit}>
            Enviar
          </Button>
          <Button onClick={onHide}>Cerrar</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

ContactUs.propTypes = propTypes;

export default ContactUs;