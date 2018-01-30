import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';

const propTypes = {
  showModal: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};

const TermsAndConditions = (props) => {
  const { showModal, onHide } = props;
  return (
    <Modal isOpen={showModal} toggle={onHide}>
      <ModalHeader closeButton>
        Términos y condiciones
      </ModalHeader>
      <ModalBody>
        <ul>
          <li>La información de los eventos de este sitio web es tomada de Facebook.</li>
          <li>Nosotros no creamos, modificamos o eliminamos ningún evento.</li>
          <li>Nuestro sitio web tampoco tiene relación alguna con los organizadores.</li>
        </ul>
      </ModalBody>
      <ModalFooter>
        <Button onClick={onHide}>Cerrar</Button>
      </ModalFooter>
    </Modal>
  );
};

TermsAndConditions.propTypes = propTypes;

export default TermsAndConditions;
