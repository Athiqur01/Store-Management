import Banner from "../Banner/Banner";
import InventoryManagement from "../InventoryManagement/InventoryManagement";
import RequisitionAndStock from "../RequisitionAndStock/RequisitionAndStock";


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <InventoryManagement></InventoryManagement>
            <RequisitionAndStock></RequisitionAndStock>
        </div>
    );
};

export default Home;