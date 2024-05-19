import React from 'react';
import './css/styles.css';

export function Footer() {
    return (
      <footer>
        <p>&copy; 2024 Cherry Company. All rights reserved.</p>
        <ul>
          <li>Phone: +1234567890</li>
          <li>Email: <a href="mailto:support@cherrytracker.com">support@cherrytracker.com</a></li>
          <li>Socials:
            <a href="http://twitter.com/" target="_blank" title="Follow us on Twitter">Twitter</a>,
            <a href="http://facebook.com/" target="_blank" title="Like us on Facebook">Facebook</a>,
            <a href="http://instagram.com/" target="_blank" title="Follow us on Instagram">Instagram</a>
          </li>
        </ul>
      </footer>
    );
  }