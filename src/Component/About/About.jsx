import { motion } from "framer-motion"
import about from '../../assets/banner2.png'


const InventoryManagement = () => {
    const headingText = "About";
    const paragraphText="BBM Inventory Management is a web-based application designed to streamline and manage the internal inventory processes of Bangladesh Betar, Mymensingh, a government media institution. The system allows members of the institution to submit requisitions for goods, which are then evaluated by the storekeeper for justification. Upon validation, the final approval is given by the relevant authority. The application tracks entries, exits, and requisitions, ensuring real-time updates on inventory levels. Additionally, it offers the functionality to export data into PDF format, allowing for easy reporting and record-keeping at the discretion of the authority."

    return (
        <section className="pt-20 md:pt-24 lg:pt-32 ">
            
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
            className="flex flex-col md:flex-row lg:flex-row gap-10 px-2 md:px-4 lg:px-6 pt-14" >
                <div className="w-[100%] md:w-[100%] lg:w-[50%] ">
                    <img className="rounded-md" src={about} alt="" />
                </div>
                <div className="w-[100%] md:w-[100%] lg:w-[50%] flex justify-center items-center">
                    

                    {/*  */}
    <motion.p
                    
        className="text-white text-justify break-words "
>
  {paragraphText.split("").map((char, index) => (
    <motion.span
      key={index}
      initial={{ opacity: 0, y: -10, color: '#03A9F4' }}
      whileInView={{ opacity: 1, y: 0, color: ['#03A9F4','#FFFFFF'] }} // Animation when in view
      transition={{
        duration: 1,
        delay: index * 0.01,
      }}
      style={{ display: 'inline-block', minWidth: char === " " ? "0.5em" : "auto" }}
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
  ))}
</motion.p>
                    {/* ?\ */}


                </div>
                  
            </div>
            
        </section>
    );
};

export default InventoryManagement;