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
          <li>Nuestro sitio web tampoco tiene relación alguna con los organizadores o sus eventos.</li>
        </ul>
        <h5 className="mg-t-lg">Política de Privacidad</h5>
        <p>Nuestro website utiliza el API de Facebook para consultar los eventos de reconocidos
        organizadores de carreras de MTB en Costa Rica. Con el fin de hacer esta consulta,
        es necesario que los usuario inicien sesión con su usuario y contraseña de
        Facebook con el objectivo de generar un token y así realizar la consulta al API de Facebook.
        Nuestro sitio web no almacena en ninguna base de datos o cookie el usuario, correo
        electrónico o contraseña utilizados por el usuario.
        </p>
      </ModalBody>
      <ModalFooter>
        <Button onClick={onHide}>Cerrar</Button>
      </ModalFooter>
    </Modal>
  );
};

TermsAndConditions.propTypes = propTypes;

export default TermsAndConditions;
