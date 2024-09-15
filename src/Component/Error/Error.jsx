import { Link, useRouteError } from "react-router-dom";
import error from '../../assets/error.jpg'


const Error = () => {
    const errorDetect=useRouteError();
    return (
        <div>
            <div className=" h-[350] md:h-[500px] lg:h-[600px]  mx-auto my-auto bg-cover w-full " style={{ backgroundImage: `url(${error})` }}>

<h2 className="p-20 lg:mt-36 text-5xl font-bold opacity-60 text-center ">Oops</h2>
            
            {errorDetect.status===404 && <div>
                <h2  className="pt-4 text-2xl font-medium opacity-60 text-center">Page not found <Link to="/"><button className="px-4 py-2 rounded-md bg-slate-700 text-white">Back to home</button></Link>  </h2></div>}
            
        </div>
        </div>
    );
};

export default Error;