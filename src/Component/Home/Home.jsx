import Banner from "../Banner/Banner";
import InventoryManagement from "../InventoryManagement/InventoryManagement";
import RequisitionAndStock from "../RequisitionAndStock/RequisitionAndStock";
import About from "../About/About";


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <About></About>
            <InventoryManagement></InventoryManagement>
            <RequisitionAndStock></RequisitionAndStock>
            
        </div>
    );
};

export default Home;