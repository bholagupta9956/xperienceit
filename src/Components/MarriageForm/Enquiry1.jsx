// This is the first enquiry form;

import React, { useEffect, useState } from "react";
import "./marriageForm.css";
import { endpoints } from "../../services/endpoints";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../../utils/Loader";

const Enquiry1 = (props) => {

  const {setShowMarriageForm} = props
  const allWeddingOptions = [
    { id: 1, name: "Venues" },
    { id: 2, name: "Catering" },
    { id: 3, name: " Photography and video" },
    { id: 4, name: "Jewellery" },
    { id: 5, name: "Wedding planners" },
    { id: 5, name: "Wedding cards" },
    { id: 5, name: "Bridal Accessories" },
    { id: 5, name: "Honeymoon" },
    { id: 5, name: "Transportation" },
    { id: 5, name: "Flowers and Decoration" },
    { id: 5, name: "Groom's Accessories" },
    { id: 5, name: "Health and Beauty" },
    { id: 5, name: "Entertainment" },
    { id: 5, name: "Wedding gifts" },
    { id: 5, name: "Ceremony" },
    { id: 5, name: "Mehendi Artist" },
    { id: 5, name: "Choreographers" },
    { id: 5, name: "Cakes" },
    { id: 5, name: "Other" },
  ];

  const [vendorsType, setVendorType] = useState([]);
  const [selectedVendorType, setSelectedVendorType] = useState([]);
  const [marriageData, setMarriageData] = useState({
    firstPartner: "",
    secondPartner: "",
    dateOfWedding: "",
    noOfGifts: 0,
    city: "",
    country: "India",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const getAllVendorType = () => {
    const url = endpoints.marriage.vendorType;
    axios
      .get(url)
      .then((res) => {
        if (res.data.status) {
          const val = res.data?.body;
          setVendorType(val);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllVendorType();
  }, []);

  const handleVendorType = (e) => {
    const val = e.target.value;
    if (selectedVendorType.includes(val)) {
      const filterArray = selectedVendorType.filter((item) => {
        return item !== val;
      });
      setSelectedVendorType(filterArray);
    } else {
      setSelectedVendorType((item) => {
        return [...item, val];
      });
    }
  };

  const clearFields = () => {
    setMarriageData({
      firstPartner: "",
      secondPartner: "",
      dateOfWedding: "",
      noOfGifts: 0,
      city: "",
      country: "India",
    });
  };

  const submit = () => {
    if (!marriageData?.firstPartner) {
      setErrors({ firstPartner: "Please enter name" });
    } else if (!marriageData?.secondPartner) {
      setErrors({ secondPartner: "Please enter partner name" });
    } else if (!marriageData?.dateOfWedding) {
      setErrors({ dateOfWedding: "Please select date of wedding" });
    } else if (!marriageData?.city) {
      setErrors({ city: "Please enter city name" });
    } else if (!marriageData?.country) {
      setErrors({ country: "Please enter country" });
    } else {
      setErrors({});
      setLoading(true)
      const url = endpoints.marriage.bookMarriage;
      const data = {
        partner_one: marriageData.firstPartner,
        partner_two: marriageData.secondPartner,
        date: marriageData.dateOfWedding,
        number_of_gifts: marriageData.noOfGifts,
        city: marriageData.city,
        country: marriageData.country,
        wedding_vendors: selectedVendorType,
      };

      axios
        .post(url, data)
        .then((res) => {
          setLoading(false)
          if (res.data.status) {
            toast("Your Enquiry submitted", { type: "success" });
            clearFields()
            setShowMarriageForm(false)
          }
        })
        .catch((err) => {
          setLoading(false)
          console.log(err, "this is the error");
        });
    }
  };

  return (
    <div className="container  py-5 px-4">
      <h5>About Us</h5>
      <div className="row ">
        <div className="col-lg-6 col-md-12 col-12  mt-2">
          <h6>I AM</h6>
          <div className="input-group ">
            <input
              type="text"
              className="form-control"
              aria-label="Text input with dropdown button"
              value={marriageData.firstPartner}
              onChange={(e) =>
                setMarriageData((dta) => {
                  return { ...dta, firstPartner: e.target.value };
                })
              }
            />
            <div className="input-group-append ">
              <select class="custom-select" id="inputGroupSelect01">
                <option selected>Choose</option>
                <option value="bride">Bride</option>
                <option value="groom">Groom</option>
                <option value="relative">Relative</option>
                <option value="guest">Guest</option>
              </select>
            </div>
          </div>
          {errors.firstPartner && <span className="mrgFormError">{errors.firstPartner}</span>}
        </div>
        <div className="col-lg-6 col-md-12 col-12 mt-2">
          <h6>MY PARTNER IS</h6>
          <div className="input-group ">
            <input
              type="text"
              className="form-control"
              aria-label="Text input with dropdown button"
              value={marriageData.secondPartner}
              onChange={(e) =>
                setMarriageData((dta) => {
                  return { ...dta, secondPartner: e.target.value };
                })
              }
            />
            <div className="input-group-append">
              <select class="custom-select" id="inputGroupSelect01">
                <option selected>Choose</option>
                <option value="bride">Bride</option>
                <option value="groom">Groom</option>
                <option value="relative">Relative</option>
                <option value="guest">Guest</option>
              </select>
            </div>
          </div>
          {errors.secondPartner && <span className="mrgFormError">{errors.secondPartner}</span>}
        </div>

        <div className=" my-3">
          <h5>Wedding Details</h5>
          <div className="row py-2">
            <div className="col-lg-6 col-md-6 col-sm-12 mt-3">
              <h6>DATE</h6>
              <div className="input-group">
                <input
                  type="date"
                  className="form-control"
                  aria-label="Text input with dropdown button"
                  min={new Date()}
                  value={marriageData.dateOfWedding}
                  onChange={(e) =>
                    setMarriageData((dta) => {
                      return { ...dta, dateOfWedding: e.target.value };
                    })
                  }
                />
              </div>
              {errors.dateOfWedding && <span className="mrgFormError">{errors.dateOfWedding}</span>}
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 mt-3">
              <h6>NUMBER OF GUESTS</h6>
              <div className="input-group">
                <input
                  type="number"
                  className="form-control"
                  aria-label="Text input with dropdown button"
                  min={1}
                  value={marriageData.noOfGifts}
                  onChange={(e) =>
                    setMarriageData((dta) => {
                      return { ...dta, noOfGifts: e.target.value };
                    })
                  }
                />
              </div>
              
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 mt-3">
              <h6>BUDGET</h6>
              <div className="input-group">
                <input
                  type="number"
                  className="form-control"
                  aria-label="Text input with dropdown button"
                  min={1}
                  // value={marriageData.noOfGifts}
                  // onChange={(e) =>
                  //   setMarriageData((dta) => {
                  //     return { ...dta, noOfGifts: e.target.value };
                  //   })
                  // }
                  placeholder="Enter Budget"
                />
              </div>
              
            </div>

          </div>
          <div className="row d-flex">
            <div className="col-lg-6 col-md-6 col-sm-12 mt-3 ">
              <h6>CITY/TOWN</h6>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control "
                  aria-label="Text input with dropdown button"
                  placeholder="Enter city"
                  value={marriageData.city}
                  onChange={(e) =>
                    setMarriageData((dta) => {
                      return { ...dta, city: e.target.value };
                    })
                  }
                />
              </div>
              {errors.city && <span className="mrgFormError">{errors.city}</span>}
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 mt-3 ">
              <h6>COUNTRY</h6>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  aria-label="Text input with dropdown button"
                  placeholder="Enter Country"
                  value={marriageData.country}
                  onChange={(e) =>
                    setMarriageData((dta) => {
                      return { ...dta, country: e.target.value };
                    })
                  }
                />
              </div>
              {errors.country && <span className="mrgFormError">{errors.country}</span>}
            </div>
          </div>

          <div className="row mt-3">
            <h5>Which wedding vendors do you still need?</h5>
            <div className="row my-2 mx-1">
              {vendorsType.map((item, index) => {
                return (
                  <div
                    className="col-lg-6 col-md-6 col-sm-12 form-check my-2 d-flex align-items-center"
                    key={index}
                  >
                    <input
                      className="form-check-input mrgCheck "
                      type="checkbox"
                      defaultValue
                      id={item?.vendor_en}
                      value={item?.vendor_en}
                      onChange={(e) => handleVendorType(e)}
                      checked={selectedVendorType.includes(item?.vendor_en)}
                    />
                    <label
                      className="form-check-label mrgLabel"
                      htmlFor={item?.vendor_en}
                    >
                      {item?.vendor_en}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
          <button type="button" class="btn enquiryBtn" onClick={submit}>
            Submit
          </button>

          {loading && <Loader />}
        </div>
      </div>
    </div>
  );
};

export default Enquiry1;
