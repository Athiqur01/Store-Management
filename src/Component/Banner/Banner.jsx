import banner from '../../assets/Banner.jpg'

const Banner = () => {
    return (
        
            <div className="bg-cover bg-no-repeat w-full min-h-[650px] flex flex-col items-center justify-center space-y-6 rounded-b-lg" style={{ backgroundImage: `url(${banner})` }}>
                <h2 className='text-white text-xl md:text-4xl lg:text-6xl font-semibold lg:font-bold'>Bangladesh Betar Mymensingh</h2>
            
        </div>
    );
};

export default Banner;