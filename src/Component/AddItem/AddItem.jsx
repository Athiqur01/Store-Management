

const AddItem = () => {
    return (
        <section className="max-w-[1000px] mx-auto text-center py-6 md:py-8 lg:py-10">
            <h2 className="text-white text-3xl md:text-4xl lg:text-6xl font-bold pb-4 md:pb-10">Add Item</h2>
            <div className="border-white border-2 rounded-md mx-2">
                <form action="" className="space-y-4 p-10 "   >
                <input type="text" name='itemName' placeholder="Item Name" className="input input-bordered text-black w-full " />
                <textarea   id="" name='message' placeholder="Item's Description" className="w-full rounded-lg h-16 p-4 text-black"></textarea>
                <input type="text" name='firstName' placeholder="Catagory" className="input input-bordered text-black w-full " />
                <input type="text" name='firstName' placeholder="quantity" className="input input-bordered text-black w-full " />
                <input type="text" name="lastName" placeholder="Entry Date" className="input input-bordered text-black w-full " />
                <input type="text" name='email' placeholder="Store Location" className="input input-bordered text-black w-full " />
                
                
                <button type="submit" className='px-4 py-2 bg-[#487DF0] rounded-md border border-2 border-transparent hover:border-[#FF00FF] transition duration-500 ease-in-out text-lg font-bold '>Save Item</button>
                </form>
                </div>
        </section>
    );
};

export default AddItem;