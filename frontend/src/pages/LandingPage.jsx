import React from 'react'
import { Link } from "react-router-dom";

const LandingPage = () => {
    return (
        <div className='relative w-full h-[90vh] flex flex-col justify-center items-center'>
            <img
                src="/purple.svg"
                alt="Purple Blob"
                className="z-1 absolute top-0 left-1/2 -translate-x-1/2 w-[40vw] h-auto opacity-40 pointer-events-none animate-purpleBlob"
                style={{ animation: 'purpleBlobMove 8s ease-in-out infinite alternate', filter: 'blur(60px)' }}
            />
            <img
                src="/orange.svg"
                alt="Orange Blob"
                className="z-1 absolute top-0 left-1/2 -translate-x-1/2 w-[40vw] h-auto opacity-40 pointer-events-none animate-orangeBlob"
                style={{ animation: 'orangeBlobMove 10s ease-in-out infinite alternate', filter: 'blur(60px)' }}
            />
            <h1
                className=' hello text-6xl z-2 font-bold mb-8 text-gray-800'
            >
                Your Hub for <span className='text-7xl text-violet-700'>Beautiful</span>  <br /> <span className='text-4xl text-violet-700'>Stays</span>  Around the World.
            </h1>
            <Link to="/">
                <button className='px-6 z-2 py-3 bg-violet-600 text-white rounded-2xl shadow-md hover:bg-blue-700 transition-colors font-semibold font-sans'>
                    Explore Hotel
                </button>
            </Link>
            <style>
                {`
                @keyframes purpleBlobMove {
                    0% { transform: translate(0%, 10) scale(1);}
                    25% { transform: translate(-20%, 20%) scale(1.05);}
                    50% { transform: translate(90%, 30%) scale(0.98);}
                    75% { transform: translate(-35%, 20%) scale(1.02);}
                    100% { transform: translate(90%, 10%) scale(1);}
                }
                @keyframes orangeBlobMove {
                    0% { transform: translate(-0%, 0) scale(1);}
                    20% { transform: translate(-95%, -22%) scale(2.08);}
                    50% { transform: translate(25%, 25%) scale(0.95);}
                    80% { transform: translate(-58%, -20%) scale(1.03);}
                    100% { transform: translate(20%, 20%) scale(1);}
                }
                `}
            </style>
        </div>
    )
}

export default LandingPage