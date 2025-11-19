from pathlib import Path

FILES = ["index.html", "services.html", "about.html", "contact.html"]

FOOTER = """  <footer class="site-footer">
    <div class="container footer-modern">
      <div class="footer-brand">
        <a href="index.html" class="logo">
          <img src="assets/images/logo.jpeg" alt="BridgePoint Advisory logo" class="logo-img" />
          <span class="logo-text">BridgePoint<span>Advisory</span></span>
        </a>
        <p>Hands-on advisory for entrepreneurs, start-ups and growing businesses across Africa.</p>
        <div class="footer-social">
          <a href="#" aria-label="LinkedIn">
            <svg viewBox="0 0 24 24">
              <path d="M5 3a2 2 0 11.001 4.001A2 2 0 015 3zm0 6h4v12H5zm6 0h4v2h.06c.56-1.06 1.94-2.18 3.99-2.18 4.27 0 5.06 2.81 5.06 6.47V21h-4v-5.5c0-1.31-.02-3-1.83-3-1.84 0-2.12 1.43-2.12 2.9V21h-4z" fill="currentColor" />
            </svg>
          </a>
          <a href="#" aria-label="Twitter">
            <svg viewBox="0 0 24 24">
              <path d="M20 6.5a5.8 5.8 0 01-1.7.47 2.95 2.95 0 001.29-1.63 5.9 5.9 0 01-1.86.71A2.93 2.93 0 0012 8.8a8.31 8.31 0 01-6-3.05 2.93 2.93 0 00.9 3.91 2.92 2.92 0 01-1.33-.36v.04a2.94 2.94 0 002.35 2.87 2.94 2.94 0 01-1.32.05 2.94 2.94 0 002.74 2.04A5.9 5.9 0 014 17.46 8.32 8.32 0 008.49 19c5.66 0 8.76-4.69 8.76-8.76 0-.13 0-.27-.01-.4A6.17 6.17 0 0020 6.5z" fill="currentColor" />
            </svg>
          </a>
          <a href="#" aria-label="YouTube">
            <svg viewBox="0 0 24 24">
              <path d="M21.6 7.2a2.5 2.5 0 00-1.76-1.77C18 5 12 5 12 5s-6 0-7.84.43A2.5 2.5 0 002.4 7.2 26.6 26.6 0 002 12a26.6 26.6 0 00-.4 4.8 2.5 2.5 0 001.76 1.77C6 19 12 19 12 19s6 0 7.84-.43a2.5 2.5 0 001.76-1.77A26.6 26.6 0 0022 12a26.6 26.6 0 00-.4-4.8zM10 15.5v-7l5 3.5z" fill="currentColor" />
            </svg>
          </a>
        </div>
      </div>
      <div class="footer-links">
        <h3>Company</h3>
        <ul>
          <li><a href="about.html">About</a></li>
          <li><a href="services.html#process">Approach</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </div>
      <div class="footer-links">
        <h3>Solutions</h3>
        <ul>
          <li><a href="services.html">Strategy &amp; Growth</a></li>
          <li><a href="services.html">Start-Up Advisory</a></li>
          <li><a href="services.html">Operations Support</a></li>
          <li><a href="services.html">Network Access</a></li>
        </ul>
      </div>
      <div class="footer-cta">
        <p class="footer-cta-title">Ready to partner?</p>
        <p>Schedule a working session with our advisory team.</p>
        <a href="contact.html" class="btn btn-light">Schedule a Session</a>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© <span id="year"></span> BridgePoint Advisory. All rights reserved.</p>
    </div>
  </footer>
"""


for fname in FILES:
  path = Path(fname)
  text = path.read_text()
  token = '  <footer class="site-footer">'
  if token not in text:
    continue
  before, rest = text.split(token, 1)
  _, after = rest.split('</footer>', 1)
  path.write_text(before + FOOTER + "\n\n" + after)




