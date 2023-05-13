import React from "react";
import "./contactForm.css";
import GoogleMapReact from "google-map-react";

const ContactForm = () => {
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627,
    },
    zoom: 11,
  };
  return (
    <section className="ftco-section">
      <div className="contactCont">
        <div className="row justify-content-center">
          <div className="row no-gutters my-2 d-flex justify-content-between">
            <div className="col-md-6 col-12">
              <h3 className="mb-4">Contact Us</h3>

              <form
                method="POST"
                id="contactForm"
                name="contactForm"
                className="contactForm"
              >
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="label" htmlFor="name">
                        Full Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        id="name"
                        placeholder="Name"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="label" htmlFor="email">
                        Email Address
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        id="email"
                        placeholder="Email"
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label className="label" htmlFor="subject">
                        Subject
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="subject"
                        id="subject"
                        placeholder="Subject"
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label className="label" htmlFor="#">
                        Message
                      </label>
                      <textarea
                        name="message"
                        className="form-control"
                        id="message"
                        cols={30}
                        rows={4}
                        placeholder="Message"
                        defaultValue={""}
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <input
                        type="submit"
                        defaultValue="Send Message"
                        className="btn "
                        style={{background : "var(--yellow)" , color : "white"}}
                      />
                      <div className="submitting" />
                    </div>
                  </div>
                </div>
              </form>
            </div>

            <div className="col-md-6 d-flex align-items-center justify-content-end col-12">
              <div id="map" style={{  height: "420px" }} className="mapcont">
                <GoogleMapReact
                  bootstrapURLKeys={{ key: "" }}
                  defaultCenter={defaultProps.center}
                  defaultZoom={defaultProps.zoom}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
