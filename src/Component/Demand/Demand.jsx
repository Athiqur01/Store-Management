import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../Provider/AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const Demand = () => {
    const {user,loading}=useContext(AuthContext)
    

    const {data:loggedUser}=useQuery({
        queryKey:['loggedUser'],
        queryFn:async()=>{
          const res=await axios.get(`http://localhost:5012/user?email=${user?.email}`)
          return res.data
        }
    })

    const userName=loggedUser?.name
    // State to manage local storage items
    const [localStorageItems, setLocalStorageItems] = useState([]);

    // Function to load items from local storage
    const loadLocalStorageItems = () => {
        const items = JSON.parse(localStorage.getItem('localData')) || [];
        setLocalStorageItems(items);
    };

    // Load items when the component mounts
    useEffect(() => {
        loadLocalStorageItems();
    }, []);

    // Handle increase in demand
    const handleIncrease = (e, item) => {
        const id = item?._id;
        const updatedItems = localStorageItems.map(i => 
            i._id === id ? { ...i, demand: parseInt(i.demand) + 1 } : i
        );
        localStorage.setItem('localData', JSON.stringify(updatedItems));
        setLocalStorageItems(updatedItems); // Update state to trigger UI update
    };

    // Handle decrease in demand
    const handleDecrease = (e, item) => {
        const id = item?._id;
        const updatedItems = localStorageItems.map(i => 
            i._id === id && i.demand > 0 ? { ...i, demand: parseInt(i.demand) - 1 } : i
        );
        localStorage.setItem('localData', JSON.stringify(updatedItems));
        setLocalStorageItems(updatedItems); // Update state to trigger UI update
    };

    //if user does not exist
    
    if (!user && !loggedUser) {
        return <div><span className="loading loading-ring loading-lg text-white text-center"></span></div>;
    }
    

    // Post Operation to send data to storekeeper
    const handleStoreKeeper = () => {
        const requisitionBy = userName;
        const isChecked = false;

        axios.post('http://localhost:5012/storeKeeper', { LocalStorageItem: localStorageItems, requisitionBy, isChecked })
            .then(res => {
                if (res.data) {
                    localStorage.removeItem('localData');
                    setLocalStorageItems([]); // Clear state to update the UI
                }
            });
    };

    

    return (
        <div className="text-white w-[100%] md:w-[20%] lg:w-[20%] px-2 flex flex-col items-center">
            <h2 className="text-3xl font-bold text-center mb-2 display md:hidden lg:hidden">Issued Items</h2>
            <table className="table">
                <thead>
                    <tr className="text-sm md:text-base font-bold text-white text-center">
                        <th></th>
                        <th>Item Name</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {localStorageItems.map((item, index) => (
                        <tr className="lg:text-xl text-white text-center" key={item._id}>
                            <th>{index + 1}</th>
                            <td>{item?.itemName}</td>
                            <td className="flex justify-center">
                                <button onClick={(e) => handleDecrease(e, item)} className="text-xl bg-[#7C4DFF] px-3">-</button>
                                <input className="bg-white min-w-6 max-w-10 text-center text-black" value={item?.demand} readOnly />
                                <button onClick={(e) => handleIncrease(e, item)} className="bg-[#7C4DFF] px-3">+</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
            <button onClick={handleStoreKeeper} className="font-semibold px-3 py-2 mt-2 rounded-md bg-[#4CAF50]">Send To Store Keeper</button>
        </div>
    );
};

export default Demand;