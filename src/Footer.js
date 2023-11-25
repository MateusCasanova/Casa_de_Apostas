import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <div className="footer">
      <div className="brand">
        <h2>Betpix</h2>
        <a href="/twitter">Twitter</a>
        <a href="/instagram">Instagram</a>
      </div>

      <div className="links-uteis">
        <h3>LINKS ÚTEIS</h3>
        <a href="/crash">Crash</a>
        <a href="/double">Double</a>
        <a href="/blaze-mirror">Blaze Mirror</a>
        <a href="/fairness">Fairness</a>
        <a href="/clube-vip">Clube VIP</a>
      </div>

      <div className="sobre-nos">
        <h3>SOBRE NÓS</h3>
        <a href="/termos-servico">Termos de Serviço</a>
        <a href="/politica-privacidade">Política de Privacidade</a>
        <a href="/termos-bonus">Termos de Bônus</a>
        <a href="/jogo-responsavel">Jogo Responsável</a>
        <a href="/central-apoio">Central de Apoio</a>
      </div>
    </div>
  );
}

export default Footer;
