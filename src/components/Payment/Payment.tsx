import { useEffect, useState } from "react";
import Content from "../Content/Content";
import { Row, TBody, TD, TH, THead, Table } from "../Shared/Table";
import axios from "axios";
import baseUrl from "../../../Utils/baseUrl";
import { HiPencilSquare } from "react-icons/hi2";
import PaymentPopup from "./PaymentPopup";

const Payment = () => {
    const [selected, setSelected] = useState(1);
    const [payments, setPayments] = useState([]);
    const [showPaymentStatus, setShowPaymentStatus] = useState(false);
    const [paymentObj, setPaymentObj] = useState({
        _id: "",
        hotel_name: "",
        total_sale_amount: 0,
        amount: 0,
        payment_status: "",
        payment_method: "",
        bloonsoo_discount: 0,
        hotel_discount: 0,
        commission_rate: 0,
        commission: 0,
        date: "",
    });
    let token: any;
    if (typeof localStorage !== "undefined") {
        token = localStorage.getItem("token");
    }

    useEffect(() => {
        fetchAllPayment();
    }, []);

    const fetchAllPayment = async () => {
        try {
            const response = await axios.get(`${baseUrl}/payment`, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });
            console.log(response.data);
            setPayments(response.data);
        } catch (error) {
            console.log(error)
        }

    };

    const handleClick = async (id: any) => {
        setSelected(id);

        if (id == 1) {
            fetchAllPayment()
        } else if(id === 3) {
            try {
                const response = await axios.get(`${baseUrl}/payment/get/approve-payment`, {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                });
                
                setPayments(response.data);
            } catch (error) {
                console.log(error)
            }
        } else if(id === 2) {
            try {
                const response = await axios.get(`${baseUrl}/payment/get/pending-payment`, {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                });
               
                setPayments(response.data);
            } catch (error) {
                console.log(error)
            }
        }
    };

    const handlePaymentPopup = (payment: any) => {
        setShowPaymentStatus(true);
        setPaymentObj(payment)
    };

    return (
        <Content>
            <div className="flex flex-row gap-4">
                <button
                    className={`px-4 py-2 border-b-2   ${selected === 1 ? "border-red-500" : "border-transparent"
                        }`}
                    onClick={() => handleClick(1)}
                >
                    All
                </button>
                <button
                    className={`px-4 py-2 border-b-2   ${selected === 2 ? "border-red-500" : "border-transparent"
                        }`}
                    onClick={() => handleClick(2)}
                >
                    Pending
                </button>
                <button
                    className={`px-4 py-2 border-b-2   ${selected === 3 ? "border-red-500" : "border-transparent"
                        }`}
                    onClick={() => handleClick(3)}
                >
                    Approved
                </button>
            </div>

            <div className="mt-8">
                <Table>
                    <THead>
                        <TH title={"Id"} />
                        <TH title={"Date"} />
                        <TH title={"Hotel Name"} />
                        <TH title={"Commission"} />
                        <TH title={"Bloonsoo Discount"} />
                        <TH title={"Hotel Discount"} />
                        <TH title={"Total Sale Amount"} />
                        <TH title={"Amount"} />
                        <TH title={"Payment Status"} />
                        <TH title={"Payment Method"} />
                    </THead>

                    <TBody>
                        {payments.map((payment: any, index: number) => (
                            <Row key={index}>
                                <TD>{payment._id}</TD>
                                <TD>{payment.date}</TD>
                                <TD>{payment.hotel_name}</TD>
                                <TD>{payment.commission_rate}</TD>
                                <TD>{payment.bloonsoo_discount}</TD>
                                <TD>{payment.hotel_discount}</TD>
                                <TD>{payment.total_sale_amount}</TD>
                                <TD>{payment.commission}</TD>
                                <TD>
                                    <div className="flex gap-4">
                                        <span
                                            className={`px-2 py-[2px] rounded-full text-black text-center ${payment.payment_status === "pending"
                                                    ? "bg-yellow-500"
                                                    : "bg-green-500"
                                                }`}
                                        >
                                            {payment.payment_status}
                                        </span>
                                        <button onClick={() => handlePaymentPopup(payment)}>
                                            <HiPencilSquare className="w-4 h-4 fill-blue-500 cursor-pointer" />
                                        </button>
                                    </div>
                                </TD>
                                <TD>{payment.payment_method}</TD>
                            </Row>
                        ))}
                    </TBody>
                </Table>
            </div>
            {showPaymentStatus && (
                <PaymentPopup
                    setShowPaymentStatus={setShowPaymentStatus}
                    fetchAllPayment={fetchAllPayment}
                    paymentObj={paymentObj}
                />
            )}
        </Content>
    );
};

export default Payment;
