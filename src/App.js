import "./App.css";
import { useEffect, useState } from "react";
import Users from "./component/users/Users";
import "bootstrap/dist/css/bootstrap.min.css";
import { HiHeart } from "react-icons/hi";
import { AiFillDelete } from "react-icons/ai";
import { TbEdit } from "react-icons/tb";
import Model from "./component/forms/Model";

const editValue = {
  name: "",
  email: "",
  phone: "",
  website: "",
  id: ""
};

export default function App() {
  const [data, setData] = useState([]);
  const [heart, setHeart] = useState([]);
  const [modelShow, setModelShow] = useState(false);
  const [editItem, setEditItem] = useState(editValue);

  const [isLoading, setIsLoading] = useState(true);

  // for fetching data
  useEffect(() => {
    const url = "https://jsonplaceholder.typicode.com/users";
    const fetchData = async () => {
      const res = await fetch(url);
      const data = await res.json();
      setData(data);
    };
    fetchData();
    setIsLoading(false);
  }, []);

  //for selecting heart

  useEffect(() => {
    const arr = [];
    for (let i = 1; i <= 10; i++) {
      const obj = { id: i, curr: false };
      arr.push(obj);
    }
    setHeart(arr);
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="spinner" />
      ) : (
        <div className="App">
          <div className="container">
            <div className="row">
              {data.map((item) => {
                return (
                  <div className="col-md-3 mt-3">
                    <Users
                      key={item.id}
                      username={item.username}
                      name={item.name}
                      email={item.email}
                      phone={item.phone}
                      website={item.website}
                    />
                    <div className="row bg">
                      <div className="col">
                        <HiHeart
                          style={{
                            color:
                              heart.filter((dt) => dt.id === item.id)[0]
                                .curr === true
                                ? "red"
                                : ""
                          }}
                          onClick={() => {
                            const arr = [];
                            const currId = item.id;
                            for (let el of heart) {
                              let obj;
                              if (el.id === currId) {
                                obj = { id: el.id, curr: !el.curr };
                              } else {
                                obj = { id: el.id, curr: el.curr };
                              }
                              arr.push(obj);
                            }
                            setHeart(arr);
                          }}
                          className="hover"
                        />
                      </div>
                      <div className="col">
                        <TbEdit
                          onClick={() => {
                            setModelShow(!modelShow);

                            const newEditValue = {
                              name: item.name,
                              email: item.email,
                              phone: item.phone,
                              website: item.website,
                              id: item.id
                            };
                            setEditItem(newEditValue);
                          }}
                          className="hover"
                        />
                      </div>
                      <div className="col">
                        <AiFillDelete
                          onClick={() => {
                            const idToDelete = item.id;
                            let newArray = [];
                            for (const el of data) {
                              if (el.id !== idToDelete) {
                                newArray.push(el);
                              }
                            }
                            setData(newArray);
                          }}
                          className="hover"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
      {modelShow && (
        <Model
          name={editItem.name}
          email={editItem.email}
          phone={editItem.phone}
          website={editItem.website}
          id={editItem.id}
          data={data}
          setData={setData}
          setModelShow={setModelShow}
        />
      )}
    </>
  );
}
