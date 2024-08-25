import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider/AuthProvider";

const RequestDetail = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);

    // Local state to manage the demand for each item
    const [demandState, setDemandState] = useState({});

    // Fetch the logged-in user data
    const { data: loggedUser } = useQuery({
        queryKey: ['loggedUser', user?.email],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5012/user?email=${user?.email}`);
            return res.data;
        },
        enabled: !!(user?.email),
        retry: 2,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        staleTime: 0,
    });

    const userStatus = loggedUser?.status;

    // Fetch the detail data
    const { data: detailData, isLoading, error } = useQuery({
        queryKey: ['detailData', id],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5012/storeKeepers/${id}`);
            return res.data;
        },
        enabled: !!id,
        retry: 2,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        staleTime: 0,
        onSuccess: (data) => {
            const initialDemandState = data?.LocalStorageItem.reduce((acc, item) => {
                acc[item._id] = parseInt(item.demand);
                return acc;
            }, {});
            setDemandState(initialDemandState || {});
        }
    });

    // Handling loading state
    if (isLoading) {
        return <div>Loading...</div>;
    }

    // Handling error state
    if (error) {
        return <div>Error fetching data: {error.message}</div>;
    }

    // Check if detailData is defined
    if (!detailData || !loggedUser) {
        return <div><span className="loading loading-dots loading-lg"></span></div>;
    }

    // Function to handle increase in demand
    const handleIncrease = (itemId) => {
        setDemandState((prevState) => {
            const newDemand = prevState[itemId] + 1;
            updateDemandInBackend(itemId, newDemand);
            return {
                ...prevState,
                [itemId]: newDemand,
            };
        });
    };

    // Function to handle decrease in demand
    const handleDecrease = (itemId) => {
        setDemandState((prevState) => {
            const newDemand = Math.max(prevState[itemId] - 1, 0);
            updateDemandInBackend(itemId, newDemand);
            return {
                ...prevState,
                [itemId]: newDemand,
            };
        });
    };

    // Function to update demand in the backend
    const updateDemandInBackend = (itemId, newDemand) => {
        axios.patch(`http://localhost:5012/storeKeepers/${id}/items/${itemId}`, {
            demand: newDemand
        })
        .then(res => {
            console.log("Demand updated:", res.data);
        })
        .catch(err => {
            console.error("Error updating demand:", err);
        });
    };

    // Send to RE function
    const handleSendToRE = () => {
        axios.patch(`http://localhost:5012/keeper/${id}`, { isChecked: true })
            .then(res => {
                console.log(res);
            });

        document.getElementById('kepper-hidden').classList.add('hidden');
        document.getElementById('keeper-button').classList.add('hidden');
    };

    const view = detailData?.LocalStorageItem;
    const isChecked = detailData?.isChecked;

    return (
        <div className="flex flex-col justify-center">
            <div className="text-white w-full px-2 md:px-40 lg:px-60 flex flex-col items-center py-10 md:py-14 lg:py-20">
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-center mb-2 md:mb-6 lg:mb-8">All Items</h2>
                <table className="table">
                    <thead>
                        <tr className="text-sm md:text-base font-bold text-white text-center">
                            <th>#</th>
                            <th>Item Name</th>
                            <th>Stock</th>
                            <th>Demand</th>
                            <th>Purpose</th>
                        </tr>
                    </thead>
                    <tbody id="kepper-hidden">
                        {view?.map((item, index) => (
                            !isChecked && userStatus === 'keeper' && (
                                <tr key={item._id} className="lg:text-xl text-white text-center">
                                    <th>{index + 1}</th>
                                    <td>{item?.itemName}</td>
                                    <td>{item?.quantity}</td>
                                    <td className="flex text-center justify-center">
                                        <button
                                            onClick={() => handleDecrease(item._id)}
                                            className="text-xl bg-[#7C4DFF] px-3 w-10"
                                        >
                                            -
                                        </button>
                                        <input
                                            className="bg-white min-w-10 max-w-14 text-center text-black"
                                            value={demandState[item._id]}
                                            readOnly
                                        />
                                        <button
                                            onClick={() => handleIncrease(item._id)}
                                            className="bg-[#7C4DFF] px-3 w-10"
                                        >
                                            +
                                        </button>
                                    </td>
                                    <td>
                                        <p className="text-white text-center">{item?.purpose}</p>
                                    </td>
                                </tr>
                            )
                        ))}
                    </tbody>
                </table>
                <div className="flex justify-center">
                    {!isChecked && userStatus === 'keeper' && (
                        <button
                            id="keeper-button"
                            onClick={handleSendToRE}
                            className="px-3 md:px-4 lg:px-4 py-1 md:py-2 lg:py-2 text-base md:text-lg lg:text-lg mt-4 md:mt-6 lg:mt-6 text-white font-bold rounded-md bg-[#4CAF50]"
                        >
                            Send To RE
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RequestDetail;