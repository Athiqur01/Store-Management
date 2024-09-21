import { Swiper, SwiperSlide } from 'swiper/react';
import banner from '../../assets/Banner.jpg';
import banner2 from '../../assets/banner2.png'
import banner3 from '../../assets/banner3.jpg'
import banner4 from '../../assets/banner4.jpg'
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation, Autoplay } from 'swiper/modules'; // Import Autoplay
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider/AuthProvider';

const Banner = () => {
  const {dropdownRef,}=useContext(AuthContext)
  return (
    <div ref={dropdownRef}>
      <Swiper
        navigation={true}
        modules={[Navigation, Autoplay]} // Add Autoplay module
        className="mySwiper min-h-80"
        autoplay={{
          delay: 3000, // 3 seconds delay between slides
          disableOnInteraction: false, // Keeps autoplay even after interaction
        }}
      >
        
     
        <SwiperSlide>
          <div
            className="bg-cover bg-no-repeat w-full min-h-[650px] flex flex-col items-center justify-center space-y-6 rounded-b-lg"
            style={{ backgroundImage: `url(${banner2})` }}
          >
            
            <div className="flex space-x-3 w-full justify-center">
            <Link to='/ledger'><button  className="bg-[#8255EF] text-white font-bold text-xl rounded-md md:px-6 py-2">Stock Ledger</button></Link>
            </div>
          </div>
        </SwiperSlide>


        <SwiperSlide>
          <div
            className="bg-cover bg-no-repeat w-full min-h-[650px] flex flex-col items-center justify-center space-y-6 rounded-b-lg"
            style={{ backgroundImage: `url(${banner})` }}
          >
            
            <div className="flex space-x-3 w-full justify-center">
            <Link to='/requisition'><button  className="bg-[#8255EF] text-white font-bold text-xl rounded-md md:px-6 py-2">Requisition</button></Link>
            </div>
          </div>
        </SwiperSlide>


        <SwiperSlide>
          <div
            className="bg-cover bg-no-repeat w-full min-h-[650px] flex flex-col items-center justify-center space-y-6 rounded-b-lg"
            style={{ backgroundImage: `url(${banner3})` }}
          >
            
            <div className="flex space-x-3 w-full justify-center">
            <Link to='/addItem'><button  className="bg-[#8255EF] text-white font-bold text-xl rounded-md md:px-6 py-2">Add Item</button></Link>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="bg-cover bg-no-repeat w-full min-h-[650px] flex flex-col items-center justify-center space-y-6 rounded-b-lg"
            style={{ backgroundImage: `url(${banner4})` }}
          >
            
            <div className="flex space-x-3 w-full justify-center">
            <Link to='/reqregester'><button  className="bg-[#8255EF] text-white font-bold text-xl rounded-md md:px-6 py-2">Requisition Register</button></Link>
            </div>
          </div>
        </SwiperSlide>

        
      </Swiper>
    </div>
  );
};

export default Banner;
