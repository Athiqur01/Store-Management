import { Link } from "react-router-dom";
import ledger from '../../assets/ledger.jpg'

const RequisitionAndStock = () => {
    return (
        <section className="pb-20 md:pb-24 ">
            <h2 className="text-white font-bold text-3xl md:text-6xl lg:text-7xl text-center">Requisition & Stock</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-2 md:px-4 lg:px-6 py-14">
                <Link to='/requisition'><div className="text-3xl md:text-4xl font-bold text-white text-center bg-[#E1BEE7] min-h-96 rounded-lg shadow-xl flex justify-center items-center">Requisition</div></Link>
                <Link to='/srb'><div className="text-3xl md:text-4xl font-bold text-white text-center bg-[#E1BEE7] min-h-96 rounded-lg shadow-xl flex justify-center items-center">SRB</div></Link>
                <Link to='/sib'><div  className="text-3xl md:text-4xl font-bold text-white text-center bg-[#E1BEE7] min-h-96 rounded-lg shadow-xl flex justify-center items-center">SIB</div></Link>
                <Link to='/ledger'><div className="text-3xl md:text-4xl font-bold text-white text-center bg-[#E1BEE7] min-h-96 rounded-lg shadow-xl flex justify-center items-center" style={{ backgroundImage: `url(${ledger})` }}>Ledger</div></Link>
            </div>
            
        </section>
    );
};

export default RequisitionAndStock;