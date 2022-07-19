import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";
import { useState } from "react";
import { signUpFormValidation } from "../../utils/signupformvalidation";

export default function Model(props) {
  const [show, setShow] = useState(true);
  const [error, setError] = useState({});
  const [inputVal, setInputVal] = useState({
    name: props.name,
    email: props.email,
    phone: props.phone,
    website: props.website
  });

  const handleClose = () => {
    setShow(false);
    props.setModelShow(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputVal({ ...inputVal, [name]: value });
    setError(signUpFormValidation(event.target.name, event.target.value));
    // if (inputVal.name === "" || inputVal.email === "" || inputVal.website === "" || inputVal.phone === "" || Object.keys(error).length !== 0 ) {
        
    //     setButDis(true);
    //   } else {
    //     setButDis(false);
    //   }  
};

  const handleSave = () => {
    let obj = {};
    for (let i = 0; i < props.data.length; i++) {
      if (props.data[i].id === props.id) {
        obj = props.data[i];
      }
    }
    const val = {
      ...obj,
      name: inputVal.name,
      email: inputVal.email,
      phone: inputVal.phone,
      website: inputVal.website
    };

    let arr = [];
    for (let i = 0; i < props.data.length; i++) {
      if (props.data[i].id === props.id) {
        arr[i] = val;
      } else {
        arr[i] = props.data[i];
      }
    }

    props.setData(arr);

    handleClose();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group-row">
              <label>Name: </label>
              <input
                className="form-control"
                name="name"
                onChange={handleChange}
                value={inputVal.name}
              />
              <span className="text-danger">{error.name}</span>
            </div>
            <div className="form-group-row">
              <label>Email: </label>
              <input
                className="form-control"
                name="email"
                onChange={handleChange}
                value={inputVal.email}
              />
              <span className="text-danger">{error.email}</span>
            </div>
            <div className="form-group-row">
              <label>Phone: </label>
              <input
                className="form-control"
                name="phone"
                onChange={handleChange}
                value={inputVal.phone}
              />
              <span className="text-danger">{error.phone}</span>
            </div>
            <div className="form-group-row">
              <label>Website: </label>
              <input
                className="form-control"
                name="website"
                onChange={handleChange}
                value={inputVal.website}
              />
            </div>
            <span className="text-danger">{error.website}</span>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave} disabled={(inputVal.name === "" || inputVal.email === "" || inputVal.website === "" || inputVal.phone === "" || Object.keys(error).length !== 0) ? true : false}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
