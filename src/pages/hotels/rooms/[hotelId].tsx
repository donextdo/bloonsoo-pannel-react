import Content from "@/components/Content/Content";
import { Row, TBody, TD, TH, THead, Table } from "@/components/Shared/Table";
import axios from "axios";
import { useEffect, useState } from "react";
import baseUrl from "../../../../Utils/baseUrl";
import { useRouter } from "next/router";
import Link from "next/link";
import siteUrl from "../../../../Utils/siteUrl";

const RoomPage = () => {
    const [rooms, setRooms] = useState<any>([]);
    const router = useRouter();
    const { hotelId } = router.query;


    useEffect(() => {
        fetchRoom();

    }, [hotelId]);


    let token: any 
      if (typeof localStorage !== 'undefined') {
          token = localStorage.getItem("token");
      }


    const fetchRoom = async () => {
        try {
            const response = await axios.get(`${baseUrl}/rooms/bypropertyid/${hotelId}`)
            setRooms(response.data)
        } catch (error) {
            console.log(error)
        }

    }
    return (

        <Content>
            <div className="w-full flex flex-col">
                <Table>
                    <THead>
                        <TH title={"Room Name"} />
                        <TH title={"Room Type"} />
                        <TH title={"Guests"} />
                        <TH title={"Rooms"} />
                        <TH title={"Beds"} />
                        <TH title={"Room Size"} />
                        <TH title={"Price"} />
                        <TH title={"Breakfast"} />
                        <TH title={"Actions"} />

                    </THead>

                    <TBody>
                        {rooms.map((room: any, index: number) => (
                            <Row key={index}>
                                <TD><Link href={`${siteUrl}/hotels/${room.property_id}`}>{room.room_name}</Link></TD>
                                <TD>{room.room_type}</TD>
                                <TD>{room.guests}</TD>
                                <TD>{room.nbr_of_rooms}</TD>
                                <TD>{room?.beds.map((bed:any, index:number) => (
                                    <div
                                        key={index}
                                        className={`w-60 grid grid-cols-5 ${room?.beds.length > 1 && 'mb-2'}`}>
                                        <p className="col-span-4 max-w-xs">{bed.bed_type}</p>
                                        <p className="ml-auto">{bed.no_of_beds}</p>
                                    </div>
                                ))}</TD>
                                <TD>{room.room_size}</TD>
                                <TD>{room.price_for_one_night}</TD>
                                <TD>{room.is_breakfast_available ? "Available" : 'Not Available'}</TD>
                                <TD>
                                    <div className="w-full flex items-center gap-3">

                                        <button
                                            className="px-4 py-1 text-xs font-semibold bg-red-800 text-white rounded-md">
                                            Delete
                                        </button>
                                    </div>
                                </TD>
                            </Row>
                        ))}
                    </TBody>
                </Table>
            </div>
        </Content>

    );
}

export default RoomPage;