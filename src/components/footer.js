import React from 'react';
import './footer.css';

const Footer = props => (
  <div className="footer">
    <p>
      La información de los eventos de este sitio web es tomada de Facebook. Nosotros no
      creamos, modificamos o eliminamos ningún evento. Nuestro sitio
      web tampoco tiene relación alguna con los organizadores.
    </p>
    <p className="made-by">Hecho por <a href="http://www.webondigital.com">Web-On Digital</a> para todos los fiebres del MTB.</p>
  </div>
);

export default Footer;