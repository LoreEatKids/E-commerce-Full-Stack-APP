import { faInstagram, faTiktok } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./styles/footer.scss";

export default function Footer() {
  return (
    <footer className="main-footer">
      <div className="container">
        <div className="widgets-section">
          <div className="row clearfix">
            <div className="big-column col-lg-6 col-md-12 col-sm-12">
              <div className="row clearfix">
                <div className="footer-column col-lg-7 col-md-6 col-sm-12">
                  <div className="footer-widget about-widget">
                    <div className="logo">
                      <h1 className="logo">Personal Coaching</h1>
                    </div>
                    <div className="text">
                      <p>Il sito ufficiale per il coaching di Pesce Spalla.</p>
                    </div>
                  </div>
                </div>

                <div className="footer-column col-lg-5 col-md-6 col-sm-12">
                  <div className="footer-widget links-widget">
                    <h2>Links</h2>
                    <ul className="footer-list">
                      <li>
                        <a href="#">Company History</a>
                      </li>
                      <li>
                        <a href="#">About Us</a>
                      </li>
                      <li>
                        <a href="#">Contact Us</a>
                      </li>
                      <li>
                        <a href="#">Services</a>
                      </li>
                      <li>
                        <a href="#">Privacy Policy</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="big-column col-lg-6 col-md-12 col-sm-12">
              <div className="row clearfix">
                <div className="footer-column col-lg-6 col-md-6 col-sm-12">
                  <div className="footer-widget info-widget">
                    <h2>Contact Info</h2>
                    <ul className="info-list">
                      <li>numero di telefono</li>
                      <li>email</li>
                    </ul>
                    <ul className="social-links">
                      <li className="google">
                        <a href="#">
                          <FontAwesomeIcon icon={faInstagram} />
                        </a>
                      </li>
                      <li className="facebook">
                        <a href="#">
                          <FontAwesomeIcon icon={faTiktok} />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <div className="row clearfix">
            <div className="column col-lg-6 col-md-12 col-sm-12">
              <div className="copyright">
                <span className="theme_color">Created By:</span>{" "}
                <a href="#" className="link">
                  LoreEatKids
                </a>
              </div>
            </div>
            <div className="column col-lg-6 col-md-12 col-sm-12">
              <ul className="footer-nav">
                <li>
                  <a href="#">Terms of Service</a>
                </li>
                <li>
                  <a href="#">Privacy Policy</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
