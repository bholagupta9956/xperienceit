import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useHistory, generatePath } from "react-router-dom";
import { endpoints } from "../../../services/endpoints";
import axios from "axios";


const Navbar2 = (props) => {

  const { handleGifts } = props;

  const [taskBarData, setTaskBarData] = useState([]);

  const api = endpoints.home.filterCategory;

  useEffect(() => {
    const pkgLocation = localStorage.getItem("locationDetails");
    const cityLocattion = JSON.parse(pkgLocation);
    const cityID = cityLocattion && cityLocattion.id;


    const headers = {
      "Content-Type": "application/json; charset=utf-8",
      credentials: "same-origin",
    };

    if (cityID) {
      axios
        .post(api, { location_id: cityID, headers: headers })
        .then((res) => {
          if (res.data.status === true) {
            const val = res.data.body;
            //  setFilterCategoryData(val);
            setTaskBarData(val);
          }
        })
        .catch((err) => {
          console.log(err, "Filter Category api not response here...");
        });
    }
  }, [props.updateLocation]);

  const pkgLocation = localStorage.getItem("locationDetails");
  const cityLocattion = JSON.parse(pkgLocation);
  const cityID = cityLocattion && cityLocattion.id;

  const history = useHistory();

  
  const toRenderNextPackeges = (data) => {
  
    const name = data.subcategory_nm;
    const subCategoryName = name.replaceAll(" ", "-");
    const path = generatePath(
      "/experiences/:location/subCategory/:subCategory_name/:subCategory_id",
      {
        subCategory_name: subCategoryName,
        location: cityLocattion.name,
        subCategory_id: data.subcategory_id,
      }
     
    );

    history.push(path, { allpackeges: data });
    window.location.reload();
  };

  return (
    <>
      {[false].map((expand) => (
        <Navbar key={expand} expand={expand} className="right_side_menu" >
          <div className="mobile-menu-containr">
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>XperienceIt</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1">
                

                  {taskBarData &&
                    taskBarData.map((itm, index) => {
                      return (
                        <>
                          <NavDropdown
                            title={itm.name}
                            id={`offcanvasNavbarDropdown-expand-${expand}`}
                            closeButton
                          >
                            {itm &&
                              itm?.sub_category.map((item, index) => {
                                return (
                                  <>
                                    {item?.child_category.map((child, ind) => {
                                      return (
                                        <>
                                          <NavDropdown.Item 
                                            onClick={() =>
                                              toRenderNextPackeges(child)

                                            }
                                            key={ind}
                                          >
                                            {child.name}
                                          </NavDropdown.Item>
                                        </>
                                      );
                                    })}
                                  </>
                                );
                              })}
                          </NavDropdown>
                        </>
                      );
                    })}
                    {taskBarData.length == 0 && <span className="py-2 px-3 text-secondary">Sorry! no package found</span>}
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </div>
        </Navbar>
      ))}
    </>
  );
};

export default Navbar2;
