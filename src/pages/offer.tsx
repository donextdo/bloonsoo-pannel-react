import Content from "@/components/Content/Content";
import OfferPopup from "@/components/Offer/OfferPopup";
import { Row, TBody, TD, TH, THead, Table } from "@/components/Shared/Table";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import baseUrl from "../../Utils/baseUrl";

const OfferPage = () => {
    const [showOffer, setShowOffer] = useState(false)
    const [offers, setOffers] = useState([])

    let token: any
    if (typeof localStorage !== 'undefined') {
        token = localStorage.getItem("token");
    }

    useEffect(() => {
        fetchOffer()
    },[])

    const fetchOffer = async () => {
        try {
            const response = await axios.get(`${baseUrl}/offer/all`, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            })
            console.log(response.data)
            setOffers(response.data)
        } catch (error) {
            console.log(error)
        }

    }

    const handleOffer = () => {
        setShowOffer(true)
    }

    return (
        <Content>
            <div className="w-full flex flex-col">

                <button
                    onClick={handleOffer}
                    className="py-2 px-6 mb-6 w-max bg-gray-800 text-white text-sm font-semibold rounded-md">
                    Add a offer
                </button>

                {/* {loading && <Spinner className="mx-auto" />} */}


                <Table>
                    <THead>
                        <TH title={"Offer Code"} />
                        <TH title={"Start Date"} />
                        <TH title={"Expiry Date"} />
                        <TH title={"Days to Expire"} />
                        <TH title={"Discount"} />
                        <TH title={"Hotel"} />
                        <TH title={"Note"} />
                    </THead>
                    <TBody>
                        {offers.map((offer: any, index: number) => (
                            <Row key={index}>
                                <TD>
                                    {offer.offer_code}
                                </TD>
                                <TD>{offer.startdate}</TD>
                                <TD>{offer.expiredate}</TD>
                                <TD>
                                    {offer.days}    
                                </TD>
                                <TD>{offer.discount}</TD>
                                <TD>
                                    {offer.hotel_name}
                                </TD>
                                <TD>
                                    {offer.note}   
                                </TD>
                            </Row>
                        ))}
                    </TBody>
                </Table>


                {showOffer && (
                    <OfferPopup setShowOffer={setShowOffer} />
                )}
            </div>
        </Content>
    );
}

export default OfferPage;