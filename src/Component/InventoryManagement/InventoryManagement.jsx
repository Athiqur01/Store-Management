import { Link } from "react-router-dom";
import addItem from '../../assets/addItem.jpg'
import itemCatalog from '../../assets/invantory02.jpg'
import updateItem from '../../assets/update.jpg'
import cataloge from '../../assets/catalog.png'
import { motion } from "framer-motion"



const InventoryManagement = () => {
    const headingText = "Inventory Management";

    return (
        <section className="py-20 md:py-24 lg:py-32 ">
            
            <motion.h2
        className="text-white font-bold text-3xl md:text-6xl lg:text-7xl text-center"
>
  {headingText.split("").map((char, index) => (
    <motion.span
      key={index}
      initial={{ opacity: 0, y: -10, color: '#fffff' }}
      whileInView={{ opacity: 1, y: 0, color: '#03A9F4' }} // Animation when in view
      transition={{
        duration: 1,
        delay: index * 0.1,
      }}
      style={{ display: 'inline-block', minWidth: char === " " ? "0.5em" : "auto" }}
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
  ))}
</motion.h2>

            <div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-2 md:px-4 lg:px-6 pt-14"
            >
                <Link className="hover:scale-105 transition duration-500" to='/catalog'><motion.div 
                className="text-3xl md:text-4xl lg:text-5xl font-bold  text-[#4CAF50] bg-[#E1BEE7] min-h-96 rounded-lg shadow-xl flex justify-center items-center bg-cover bg-center"
                 style={{ backgroundImage: `url(${cataloge})` }}
                 initial={{opacity:0, scale:.8}} 
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true, amount: 0.5 }} 
                 transition={{duration:1.2}}>Item Catalog</motion.div></Link>
                
                <Link className="hover:scale-105 transition duration-500" to='/addItem'><motion.div
                 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#4CAF50] text-center bg-[#E1BEE7] min-h-96 rounded-lg shadow-xl flex justify-center items-center bg-cover bg-center" 
                 style={{ backgroundImage: `url(${addItem})` }}
                 initial={{opacity:0, scale:.8}} 
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true, amount: 0.5 }} 
                 transition={{duration:1.2}}
                 >Add Item</motion.div></Link>
                
                <Link className="hover:scale-105 transition duration-500" to='/updateItem'><motion.div className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#4CAF50] text-center bg-[#E1BEE7] min-h-96 rounded-lg shadow-xl flex justify-center items-center bg-cover bg-center " 
                style={{ backgroundImage: `url(${updateItem})` }}
                initial={{opacity:0, scale:.8}} 
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{duration:1.2}}>Updaye Item</motion.div></Link>
            </div>
            
        </section>
    );
};

export default InventoryManagement;