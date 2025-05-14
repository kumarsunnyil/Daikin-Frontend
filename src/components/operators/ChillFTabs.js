import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import MoveFromComp from "../chillers/MoveFromComp";
/**
 * 
 * @returns Need to add for the different pick lists 
 */
const ChillFTabs = () => {
  return (
    <Tabs
      defaultActiveKey="piclkist"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="piclkist" title="Home">
        <MoveFromComp />
      </Tab>
      <Tab eventKey="chillerFactory" title="chillerFactory">
        Chiller Storage Factory
      </Tab>
    </Tabs>
  );
};
export default ChillFTabs;
