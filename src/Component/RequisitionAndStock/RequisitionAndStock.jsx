import { Link } from "react-router-dom";
import ledger from '../../assets/ledger.png'
import reg from '../../assets/reg.png'
import requisition from '../../assets/requisition.png'
import srb from '../../assets/srb.png'
import sib from '../../assets/sib.png'
import { motion } from "framer-motion"
import alert from '../../assets/alert.png'

const RequisitionAndStock = () => {
    const headingText = "Requisition & Stock";
    return (
        <section className="pb-20 md:pb-24 lg:pb-32 ">
            
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-2 md:px-4 lg:px-6 py-14">
                <Link className="hover:scale-105 transition duration-500" to='/requisition'><motion.div 
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#4CAF50] text-center bg-[#E1BEE7] min-h-96 rounded-lg shadow-xl flex justify-center items-center bg-cover bg-center" 
                style={{ backgroundImage: `url(${requisition})` }}
                 initial={{opacity:0, scale:.8}} 
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true, amount: 0.5 }}
                 transition={{duration:1.2}}>Requisition</motion.div></Link>
                <Link className="hover:scale-105 transition duration-500" to='/srb'><motion.div 
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#4CAF50] text-center bg-[#E1BEE7] min-h-96 rounded-lg shadow-xl flex justify-center items-center bg-cover bg-center" 
                style={{ backgroundImage: `url(${srb})` }}
                initial={{opacity:0, scale:.8}} 
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{duration:1.2}}>SRB</motion.div></Link>
                <Link className="hover:scale-105 transition duration-500" to='/sib'><motion.div  
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#4CAF50] text-center bg-[#E1BEE7] min-h-96 rounded-lg shadow-xl flex justify-center items-center bg-cover bg-center" 
                style={{ backgroundImage: `url(${sib})` }}
                initial={{opacity:0, scale:.8}} 
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{duration:1.2}}>SIB</motion.div></Link>
                <Link className="hover:scale-105 transition duration-500" to='/ledger'><motion.div 
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#4CAF50] text-center bg-[#E1BEE7] min-h-96 rounded-lg shadow-xl flex justify-center items-center bg-cover bg-center" 
                style={{ backgroundImage: `url(${ledger})` }}
                initial={{opacity:0, scale:.8}} 
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{duration:1.2}}>Stock Ledger</motion.div></Link>
                <Link className="hover:scale-105 transition duration-500" to='/reqregester'><motion.div 
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#4CAF50] text-center bg-[#E1BEE7] min-h-96 rounded-lg shadow-xl flex justify-center items-center bg-cover bg-center" 
                style={{ backgroundImage: `url(${reg})` }}
                initial={{opacity:0, scale:.8}} 
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{duration:1.2}}>Requisition Register</motion.div></Link>

                <Link className="hover:scale-105 transition duration-500" to='/alart'><motion.div 
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#4CAF50] text-center bg-[#E1BEE7] min-h-96 rounded-lg shadow-xl flex justify-center items-center bg-cover bg-center" 
                style={{ backgroundImage: `url(${alert})` }}
                initial={{opacity:0, scale:.8}} 
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{duration:1.2}}>Stock Alert</motion.div></Link>
            </div>
            
        </section>
    );
};

export default RequisitionAndStock;