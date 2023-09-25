import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import baseUrl from "../../../Utils/baseUrl";

const PaymentPopup = ({ setShowPaymentStatus, fetchAllPayment, paymentObj }: any) => {

    let token: any
    if (typeof localStorage !== 'undefined') {
        token = localStorage.getItem("token");
    }

    const handleClose = () => {
        setShowPaymentStatus(false)
    }

    const handleApprove = async (paymentObj: any) => {
        try {
            //   setApproveLoading(true);
            const res = await axios.patch(`${baseUrl}/payment/approve/${paymentObj._id}`, {}, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            });

            fetchAllPayment()
            setShowPaymentStatus(false)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-5 backdrop-blur-sm grid place-items-center z-20">
            <div className="w-80 py-8 px-6 bg-white shadow-lg flex flex-col gap-6 rounded-md relative">
                <button
                    onClick={handleClose}
                    className="absolute right-4 top-4 w-6 h-6 z-50"
                >
                    <FontAwesomeIcon icon={faTimes} className="text-red-600 text-xl" />
                </button>
                <div className="flex justify-between mt-4">
                    <button
                        onClick={() => handleApprove(paymentObj)}
                        className="py-2 px-6 bg-blue-500 rounded-sm text-white font-semibold"
                    >
                        Approve
                    </button>
                    <button
                        // onClick={() => handleReject(bookingObj._id)}
                        className="py-2 px-6 bg-red-500 rounded-sm text-white font-semibold"
                    >
                        Pending
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PaymentPopup;