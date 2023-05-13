import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Express from "./ServicesImages/4.png";
import Medal from "./ServicesImages/1.png";
import Star from "./ServicesImages/2.png";
import Teamwork from "./ServicesImages/3.png";
import Girl from "./ServicesImages/Girl.png";
import Balloon from "./ServicesImages/Gubbara.png"

import "./Services2.css";
const Services2 = () => {

    return (
        <>
            <Container className='why_chhose_us_section'>

                <div className='row'>

                    <h2 className='text-center'>Why Choose Us ?</h2>
                    <div className='col-lg-6 col-md-12 col-sm-12 col-xs-12 services_left'>
                        <div className='row'>
                            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12  border-right border-bottom text-center whoose_us_box">
                                <div className='choose-us-col'>
                                    <div className="icon whychoose-icons">
                                        <img src={Star} alt="star icon" />

                                    </div>
                                    <h5>Curate New and innovative <br /> ways to amaze you
                                    </h5>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12  border-bottom text-center whoose_us_box">
                                <div className="choose-us-col">
                                    <div className="icon whychoose-icons">
                                        <img src={Medal} alt="star icon" />

                                    </div>

                                    <h5> No compromising with <br /> the quality
                                    </h5>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12  border-right  text-center whoose_us_box">
                                <div className="choose-us-col">
                                    <div className="icon whychoose-icons">
                                        <img src={Express} alt="star icon" />

                                    </div>

                                    <h5> Assured on-time <br /> services
                                    </h5>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 text-center whoose_us_box">
                                <div className="choose-us-col">
                                    <div className="icon whychoose-icons">
                                        <img src={Teamwork} alt="medal" />
                                    </div>

                                    <h5>

                                        our dedicated team <br /> is always at your help
                                    </h5>
                                </div>
                            </div>
                           

                        </div>
                    </div>
                    <div className='col-lg-6 col-md-12 col-sm-12 col-xs-12'>
                        <div className='what_we_offer_box'>
                            <h2>What we offer</h2>
                            <p>
                                Xperience It is considered one of India's premier event management firms, providing a wide range of unique event management services. Our specialised staff manages the end-to-end implementation, offering packages customized to your unique objectives. We are a full-service solution provider for all elements of events and entertainment, including planning, management, coordination, and execution, focusing on cost-effectiveness and quality.

                            </p>
                            <p>
                                Xperience It is considered one of India's premier event management firms, providing a wide range of unique event management services. Our specialised staff manages the end-to-end implementation, offering packages customized to your unique objectives. We are a full-service solution provider for all elements of events and entertainment, including planning, management, coordination, and execution, focusing on cost-effectiveness and quality.

                            </p>
                        </div>
                    </div>
                    <div className="girlsballoon">
                                <div className="footer_ballun_2" data-aos="fade-left" data-aos-duration="800" >
                                    <img src={Balloon} alt="balloon "  />
                                </div>
                                <div className="footer_gir_1" data-aos="fade-up" data-aos-duration="800">
                                    <img src={Girl} alt="girl " />

                                </div>
                                
                            </div>
                </div>
            </Container>
        </>
    )
}
export default Services2;