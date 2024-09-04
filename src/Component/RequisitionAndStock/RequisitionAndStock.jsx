import { Link } from "react-router-dom";
import ledger from '../../assets/ledger.png'
import reg from '../../assets/reg.png'
import requisition from '../../assets/requisition.png'
import srb from '../../assets/srb.png'
import sib from '../../assets/sib.png'
import { motion } from "framer-motion"

const RequisitionAndStock = () => {
    const headingText = "Requisition & Stock";
    return (
        <section className="pb-20 md:pb-24 ">
            
            

            <motion.h2
      className="text-white font-bold text-3xl md:text-6xl lg:text-7xl text-center"
    >
      {headingText.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: -10,color: '#000' }}
          animate={{ opacity: 1, y: 0, color: '#03A9F4' }}
          transition={{
            duration: 0.2,
            delay: index * 0.1,
            repeat: Infinity,           // Loop animation
            repeatType: "mirror",       // Alternate direction after each loop
            repeatDelay: 1              // Delay between loops
          }}
          style={{ display: 'inline-block', minWidth: char === " " ? "0.5em" : "auto" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-2 md:px-4 lg:px-6 py-14">
                <Link to='/requisition'><motion.div 
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#4CAF50] text-center bg-[#E1BEE7] min-h-96 rounded-lg shadow-xl flex justify-center items-center bg-cover bg-center" 
                style={{ backgroundImage: `url(${requisition})` }}
                 initial={{opacity:0, scale:0}} 
                 whileInView={{opacity:[0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1], scale:1}} 
                 transition={{duration:1.2}}>Requisition</motion.div></Link>
                <Link to='/srb'><motion.div 
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#4CAF50] text-center bg-[#E1BEE7] min-h-96 rounded-lg shadow-xl flex justify-center items-center bg-cover bg-center" 
                style={{ backgroundImage: `url(${srb})` }}
                initial={{opacity:0, scale:0}} 
                whileInView={{opacity:[0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1], scale:1}} 
                transition={{duration:1.2}}>SRB</motion.div></Link>
                <Link to='/sib'><motion.div  
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#4CAF50] text-center bg-[#E1BEE7] min-h-96 rounded-lg shadow-xl flex justify-center items-center bg-cover bg-center" 
                style={{ backgroundImage: `url(${sib})` }}
                initial={{opacity:0, scale:0}} 
                whileInView={{opacity:[0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1], scale:1}} 
                transition={{duration:1.2}}>SIB</motion.div></Link>
                <Link to='/ledger'><motion.div 
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#4CAF50] text-center bg-[#E1BEE7] min-h-96 rounded-lg shadow-xl flex justify-center items-center bg-cover bg-center" 
                style={{ backgroundImage: `url(${ledger})` }}
                initial={{opacity:0, scale:0}} 
                whileInView={{opacity:[0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1], scale:1}} 
                transition={{duration:1.2}}>Ledger</motion.div></Link>
                <Link to='/reqregester'><motion.div 
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#4CAF50] text-center bg-[#E1BEE7] min-h-96 rounded-lg shadow-xl flex justify-center items-center bg-cover bg-center" 
                style={{ backgroundImage: `url(${reg})` }}
                initial={{opacity:0, scale:0}} 
                whileInView={{opacity:[0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1], scale:1}} 
                transition={{duration:1.2}}>Requisition Register</motion.div></Link>
            </div>
            
        </section>
    );
};

export default RequisitionAndStock;