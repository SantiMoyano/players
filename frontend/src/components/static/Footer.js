import React from "react";
import { FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <footer>
      <span>&copy; COPYRIGHT SANTI</span>
      <a
        href="https://github.com/SantiMoyano"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaGithub size={48} />
      </a>
    </footer>
  );
}

export default Footer;
