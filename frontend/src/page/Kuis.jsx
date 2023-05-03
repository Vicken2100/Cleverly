import React, { useEffect, useState } from "react";
import filter from '../Image/PIcture/settings.png'
import Footer from "../component/footer";
import { Link } from "react-router-dom";
import axios from "axios";
import { url } from "../utils/globalVariabel";

const Kuis = () =>{
    const [Quiz, setQuiz] = useState([]);
    const [loading, setLoading] = useState(true);
    const getQuiz = async() =>{
        const result = await axios.get(url + "/class/quiz");
        return result.data.data;
    };
    useEffect(()=>{
        getQuiz().then((result) => setQuiz(result));
        setLoading(false);
    }, []);
    return (
        <>
            {loading ? <div className="fixed top-0 bottom-0 left-0 right-0 bg-gradient-to-br from-blue-900 to-blue-500 h-screen w-screen flex items-center justify-center opacity-50 z-5">
                <div className="animate-pulse rounded-full h-20 w-20 border-4 border-blue-100"></div>
            </div> : ""}
            <header className="text-black flex mt-[30px] mb-[30px] w-full justify-around">
                <div className="text-[12px] rounded-full w-[45px] bg-white p-2 h-[45px]">
                    <img src={filter} alt="settings" className="w-full h-full object-fill" />
                </div>
                <div className="bg-white text-[12px] rounded-full flex items-center w-max">
                    <p className="px-[10px] text-center mx-[10px]">Matematika</p>
                </div>
                <div className="bg-white text-[12px] rounded-full flex items-center w-max">
                    <p className="px-[10px] text-center mx-[10px]">IPA</p>
                </div>
                <div className="bg-white text-[12px] rounded-full flex items-center w-max">
                    <p className="px-[10px] text-center mx-[10px]">IPS</p>
                </div>
            </header>

            <main className="h-80 scrollable overflow-scroll">
                {Quiz && Quiz.map((result, index) =>
                <div className="bg-white rounded-md p-3 m-auto w-[90%] mt-[20px]" key={index}>
                    <h2 className="mb-6 text-[25px]">{result.judul}</h2>
                    <p className="text-[16px] my-1">Mata Pelajaran</p>
                    <span className="bg-[#1D92AC] text-white rounded-full inline-block px-4 p-2">{result.subclassname}</span>
                    <p className="text-[16px] my-2">Tingkat Kesulitan</p>
                    <span className="bg-[#1D92AC] text-white rounded-full inline-block px-4 p-2 mb-1">{result.tingkatkesulitan}</span>
                    <Link 
                    className="bg-[#1D92AC] text-white rounded-full w-full mt-3 p-1 block text-center"
                    to={"/Kuis/Soal?subclass=" + encodeURIComponent(result.subclassname) 
                    + "&judul=" 
                    + encodeURIComponent(result.judul) + 
                    "&kesulitan=" + encodeURIComponent(result.tingkatkesulitan)}
                    >Pilih</Link>
                </div>
                )}
            </main>
            
            <Footer />
        </>
       
    );
}

export default Kuis;