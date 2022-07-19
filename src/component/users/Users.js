import { useEffect, useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { AiFillPhone } from "react-icons/ai";
import { TbWorld } from "react-icons/tb";

export default function Users(props) {
  const [image, setImage] = useState("");
  useEffect(() => {
    const url = `https://avatars.dicebear.com/v2/avataaars/${props.username}.svg?options[mood][]=happy`;
    setImage(url);
  }, [props.username]);

  return (
    <>
      <img src={image} className="bg" alt="images" />
      <div className="text-start">{props.name}</div>
      <div className="text-start">
        <HiOutlineMail />
        <span className="ml">{props.email}</span>
      </div>
      <div className="text-start">
        <AiFillPhone />
        <span className="ml">{props.phone}</span>
      </div>
      <div className="text-start">
        <TbWorld />
        <span className="ml">{props.website}</span>
      </div>
    </>
  );
}
