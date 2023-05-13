import React, { useEffect } from "react";
import "./Invoice2.css";
import Logo from "../Invoice/InvoiceImages/xit.png";
import Insta from "../Invoice/InvoiceImages/instagram.png";
import Facebook from "../Invoice/InvoiceImages/fb.png";
import Google from "../Invoice/InvoiceImages/googleicon.png";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState } from "react";

const Invoice2 = () => {
  const [invoiceData, setInvoiceData] = useState({});
  const [customizations, setCustomizations] = useState([]);
  const { booking_id } = useParams();

  useEffect(() => {
    const invoiceUrl = `https://admin.xperienceit.in/api/invoice`;
    console.log(invoiceUrl, "invoiceUrl");
    const val = {
      booking_id: booking_id,
    };
    axios
      .post(invoiceUrl, val)
      .then((res) => {
        if (res.data.status === true) {
          var vals = res.data.body;
          var invoiceDetails = vals[0];
          var custtomiseData = vals[0].customization;
          setCustomizations(custtomiseData);

          console.log(invoiceDetails, "invoice data ");
          setInvoiceData(invoiceDetails);
        }
      })
      .catch((err) => {
        console.log(err, "invoice data not found");
      });
  }, []);

  return (
    <>
      <div className="container invoiceContainer">
        <div className="Invoice-box">
          <div className="row">
            <div className="col-sm-5">
              <div className="Invoice-Logo">
                <img src={Logo} className="Logo-Img" />
              </div>
            </div>
            <div className="col-sm-2">
              <h1 className="invoice-heading">INVOICE</h1>
            </div>
            <div className="col-sm-5"></div>
            <div className="row">
              <div className="col-6">
                <div className="InvoceBill">
                  <h6>Bill To :</h6>
                  <p>
                    {invoiceData.first_name} {invoiceData.last_name}{" "}
                  </p>
                  <p>
                    Contact : <a href="tel:01241234568">{invoiceData.phone}</a>
                  </p>
                  <p>
                    Email : <a href="email">{invoiceData.email}</a>
                  </p>
                  <p>
                    Address : <a>Regd Off. 19/9, Pant Nagar</a>
                  </p>
                </div>
              </div>
              <div className="col-6">
                <div className="invoice-content">
                  <h6>Xperience It Events Pvt Ltd</h6>
                  <p>Regd Off. 19/9, Pant Nagar</p>
                  <p>Jangpura, South Delhi</p>
                  <p>New Delhi, Delhi 110014</p>
                  <p>India</p>
                  <p>
                    Mobile : <a href="tel:01241234568">+ 91-8920933486</a>
                  </p>

                  <p>
                    <a
                      href="https://www.xperienceit.in"
                      style={{ fontWeight: "600" }}
                    >
                      www.xperienceit.in
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6">
            <div className="Invoice-Details">
                <li>
                  <p>Invoice No</p> : <span>{invoiceData.booking_code}</span>
                </li>
                <li>
                  <p>Invoice Date</p> : <span>23 Feb, 2023</span>
                </li>
                <li>
                  <p>Payment Date</p> :<span>23 Feb, 2023</span>
                </li>
                <li>
                  <p>Amount Pay (INR)</p> :{" "}
                  <span>₹{invoiceData.booking_total}/- </span>
                </li>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="Invoice-PackageDetails">
                <h6>Xperience : {invoiceData.package_name}</h6>
                <p>Date : {invoiceData.booking_date}</p>
                <p>
                  Time : <span>{invoiceData.slots}</span>
                </p>
                <p>
                  Venue : <span>Regd Off. 19/9, Pant Nagar</span>
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6"></div>
            <div className="col-sm-6">
             
            </div>
          </div>
          <div className="row">
            <div className="invoice-all-details">
              <table className="table invoice-table">
                <thead>
                  <tr>
                    <th scope="col">Sr. No.</th>
                    <th scope="col">Items</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Rate</th>
                    <th>
                      {" "}
                      {(invoiceData.coupon_price || invoiceData.offer_price) &&
                        "Discount/Coupon"}
                    </th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>{invoiceData.package_name}</td>
                    <td></td>
                    <td>₹ {invoiceData.package_price}</td>
                    <td></td>

                    <td>₹{invoiceData.package_price}</td>
                  </tr>
                  {customizations.map((item, index) => {
                    return (
                      <>
                        <tr>
                          <th scope="row">{index + 2}</th>
                          <td>{item.title}</td>
                          <td>{item.quantity}</td>
                          <td>₹ {item.price}</td>
                          <td></td>
                          <td>₹ {item.total_custom_amount}/-</td>
                        </tr>
                      </>
                    );
                  })}

                  {(invoiceData.coupon_price || invoiceData.offer_price) && (
                    <tr>
                      <th scope="row"></th>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>
                        {invoiceData.coupon_price} {invoiceData.offer_price} fdg
                      </td>
                      <td></td>
                    </tr>
                  )}

                  <tr>
                    <th scope="row"></th>
                    <td></td>
                    <td></td>
                    <td>{invoiceData.gst}</td>
                    <td></td>

                    <td></td>
                  </tr>
                  {/* <tr>
                    <th scope="row"></th>
                    <td></td>
                    <td></td>
                    <td>SGST 9%</td>
                    <td></td>

                    <td></td>
                  </tr> */}
                  <tr style={{ border: "1px solid white" }}>
                    <th scope="row"></th>
                    <td></td>
                    <td></td>
                    <td>Total</td>
                    <td></td>

                    <td>₹{invoiceData.booking_total}/-</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="row">
            <div className="invoice-social-content">
              <p>
                {" "}
                Website :{" "}
                <a href="https://xperienceit.in/">https://xperienceit.in/</a>
              </p>
            </div>
          </div>
          <div className="row">
            <div className="invoice-social-content-text">
              <li>
                <p>
                  Contact :- <a href="tel:7080581133"> +91 7080581133</a>
                </p>{" "}
                <span className="in-line">|</span>{" "}
                <p>
                  {" "}
                  Email :-{" "}
                  <a href="mailto:contact@experienceit.in">
                    contact@experienceit.in
                  </a>
                </p>
              </li>
            </div>
          </div>
          <div className="row">
            <div className="invoice-Social">
              <h6>Follow Us On :</h6>
              <li>
                <a
                  href="https://www.facebook.com/xperienceit.in
"
                >
                  <img src={Facebook} />
                </a>{" "}
                <a href="https://xperienceit.in/">
                  <img src={Google} />
                </a>{" "}
                <a href="https://instagram.com/xperience.it?igshid=OGQ2MjdiOTE=">
                  <img src={Insta} />
                </a>
              </li>
            </div>
          </div>
          <div className="row">
            <div className="invoice-footer-text">
              <h6>
                {" "}
                This is digitaly created Invoice and is valid without Signature
                or Seal
              </h6>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Invoice2;
