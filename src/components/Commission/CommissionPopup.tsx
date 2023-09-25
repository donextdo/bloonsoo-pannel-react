import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TextInput from "../Shared/TextInput";
import { useState } from "react";

const CommissionPopup = ({setShowPopup, updateRate}:any) => {

    const [rate, setRate] = useState('');

    const handleClose = () => {
        setShowPopup(false)
    }

    

    return (
        <div className="fixed inset-0 bg-black bg-opacity-5 backdrop-blur-sm grid place-items-center z-20">
            <div className="w-96 py-8 px-6 bg-white shadow-lg flex flex-col gap-6 rounded-md relative">
                <button
                    onClick={handleClose}
                    className="absolute right-4 top-4 w-6 h-6 z-50"
                >
                    <FontAwesomeIcon icon={faTimes} className="text-red-600 text-xl" />
                </button>


                <TextInput
                    type="number"
                    label="Change Commision Rate"
                    placeholder="enter your new rate"
                    value={rate}
                    onChange={(e: any) => setRate(e.target.value)}
                />

                <button
                    onClick={updateRate}
                    className="bg-blue-500 rounded-sm text-white py-2 px-4 hover:bg-blue-700"
                >
                    Save
                </button>
            </div>
        </div>
    );
};

export default CommissionPopup;
