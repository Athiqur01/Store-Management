import { Link } from "react-router-dom";
import addItem from '../../assets/addItem.jpg'
import itemCatalog from '../../assets/invantory02.jpg'
import updateItem from '../../assets/update.jpg'
import cataloge from '../../assets/catalog.png'



const InventoryManagement = () => {
    return (
        <section className="py-20 md:py-24 ">
            <h2 className="text-white font-bold text-3xl md:text-6xl lg:text-7xl text-center">Inventory Management</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-2 md:px-4 lg:px-6 pt-14">
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold  text-[#4CAF50] bg-[#E1BEE7] min-h-96 rounded-lg shadow-xl flex justify-center items-center bg-cover bg-center" style={{ backgroundImage: `url(${cataloge})` }}>Item Catalog</div>
                
                <Link to='/addItem'><div className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#4CAF50] text-center bg-[#E1BEE7] min-h-96 rounded-lg shadow-xl flex justify-center items-center bg-cover bg-center" style={{ backgroundImage: `url(${addItem})` }}>Add Item</div></Link>
                
                <Link to='/updateItem'><div className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#4CAF50] text-center bg-[#E1BEE7] min-h-96 rounded-lg shadow-xl flex justify-center items-center bg-cover bg-center " style={{ backgroundImage: `url(${updateItem})` }}>Updaye Item</div></Link>
            </div>
            
        </section>
    );
};

export default InventoryManagement;