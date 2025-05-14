import Menu from "./navbar/Menu";

import dashscreen from "../assets/dashscreen.png";
import { Image } from "react-bootstrap";
import ThreeColumnLayout from "./compressors/ThreeColumnLayout";


const Home = () => {

  

  let leftContent = "Left";
  let centerContent = "Center";
  let rightContent = "Right";

  /*
  Compressor Factory
  */




  return (
    <>
     
      <Menu></Menu>
      <div>

        <ThreeColumnLayout />
      </div>
      
    </>
  );
};

export default Home;
