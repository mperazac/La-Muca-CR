import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Modal
} from  'react-bootstrap';

const propTypes = {
  showModal: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired
};

class TermsAndConditions extends Component {
  render() {
    const { showModal, onHide } = this.props;
    return (
      <Modal show={showModal} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Términos y condiciones</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            <li>La información de los eventos de este sitio web es tomada de Facebook.</li>
            <li>Nosotros no creamos, modificamos o eliminamos ningún evento.</li>
            <li>Nuestro sitio web tampoco tiene relación alguna con los organizadores.</li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide}>Cerrar</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

TermsAndConditions.propTypes = propTypes;

export default TermsAndConditions;