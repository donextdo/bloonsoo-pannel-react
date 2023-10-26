import Content from "@/components/Content/Content";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import baseUrl from "../../../../Utils/baseUrl";
import RouteNavigationBar from "@/components/NavBar/RouteNavigationBar";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faTrash } from "@fortawesome/free-solid-svg-icons";
import FormCard from "@/components/Shared/FormCard";
import noimage from '../../../../assets/icons/image.png'


const ImagesPage = () => {
    const [editMode, setEditMode] = useState(false)
    const router = useRouter();
    const [image, setImage] = useState(false);
    const [imageValue, setImageValue] = useState('');
    const [preview, setPreview] = useState('');
    const [images, setImages] = useState(false);
    const [previews, setPreviews] = useState<any[]>([]);
    const [galleryImages, setGalleryImages] = useState([]);


    let token: any;
    if (typeof localStorage !== "undefined") {
        token = localStorage.getItem("token");
    }
    const { hotelId } = router.query;


    useEffect(() => {
        console.log(hotelId)
        getCurrentHotel()
    }, [hotelId,previews])

    const getCurrentHotel = async () => {
        try {
            const response = await axios.get(`${baseUrl}/hotel/${hotelId}`)
            console.log(response.data)
            const data = response.data
            const galleryImage = response.data.gallery_images
            setGalleryImages(galleryImage)
            setPreview(data.cover_image)
            if (data.cover_image) {
                setImage(true)
            }
            setPreviews(data.gallery_images)
            if (data.gallery_images.length > 0) {
                setImages(true)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleEditToggle = () => {
        setEditMode(!editMode)
    }

    const handleNext = () => {
        router.push(`/hotels/${hotelId}/policies`)
    }

    const handlePrevious = () => {
        router.push(`/hotels/${hotelId}/facility`)
    }

    const inputRef = useRef(null);

    const onChange = async (event: any) => {
        const input = event.target;
        console.log(input)
        if (input.files) {
            const file = input.files[0];
            setImage(file);

            let formData = new FormData();
            formData.append('cover_img', file);

            console.log(formData)


            try {
                const response = await axios.patch(`${baseUrl}/hotel/coverphoto/${hotelId}`, formData, {
                    headers: {
                        authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                });

                const hotel = response.data;
                console.log(hotel);

                setPreview(hotel.cover_image);
            } catch (error) {
                console.error(error);
            }


        }

    }

    const onMultipleChange = async (event: any) => {
        const input = event.target;
        console.log(input)
        if (input.files) {
            const fileList = input.files;
            setImages(fileList);

            for (let i = 0; i < fileList.length; i++) {
                const file = fileList[i];
                let formData = new FormData();
                formData.append('gallery_img', file);

                try {
                    const response = await axios.patch(`${baseUrl}/hotel/gallery/${hotelId}`, formData, {
                        headers: {
                            authorization: `Bearer ${token}`
                        }
                    });

                    const path = response.data;
                    console.log(path);
                    setPreviews(prevPreviews => [...prevPreviews, path]);
                } catch (error) {
                    // Handle any errors that occurred during the request
                    console.error(error);
                }
            }
        }
    };


    const clearGallery = async (imglink: any) => {
        setPreviews((prevPreviews) => prevPreviews.filter((path) => path !== imglink));
        try {
            const response = await axios.delete(`${baseUrl}/rooms/gallery/delete/${hotelId}`, {
                data: { imgPath: imglink },
            });

        } catch (error) {
            // Handle any errors that occurred during the request
            console.error(error);
        }
    };

    const handleSave = () => {
        setEditMode(!editMode)
    };

    const clear = () => {
        setImage(false)
    }

    console.log(preview)
    const deletephoto = async (imglink: any) => {
        console.log(imglink)
        setGalleryImages((prevGalleryImages) => prevGalleryImages.filter((path) => path !== imglink));
        setPreviews((prevPreviews) => prevPreviews.filter((path) => path !== imglink));

        try {
            const response = await axios.delete(`${baseUrl}/rooms/gallery/delete/${hotelId}`, {
                data: { imgPath: imglink },
            });

        } catch (error) {
            // Handle any errors that occurred during the request
            console.error(error);
        }
    };
    return (
        <Content>
            <RouteNavigationBar previous={"Facilities and Amenities"} current={"Images"} next={"Policies"} handleEditToggle={handleEditToggle} editMode={editMode} handleNext={handleNext} handlePrevious={handlePrevious} handleSave={handleSave}/>

            <section className=" flex flex-col gap-8 text-black font-montserrat mt-[26px]">

                <FormCard label="Add Cover photo" >

                    <div className="px-4 flex flex-col gap-6">

                        <h4 className="text-sm font-semibold text-gray-600">
                            Add at least cover photo now. You can always add more later.
                        </h4>

                        <div className="w-full h-70vh border rounded-lg border-slate-500 border-dashed">

                            {!image ? (
                                <div className="w-full h-full py-24 flex flex-col items-center justify-between">
                                    <div className="w-32 h-32">
                                        <Image
                                            src={noimage}
                                            alt="item1"
                                            style={{
                                                objectFit: "contain",
                                                backgroundColor: "white",
                                                width: "100%",
                                                height: "100%",
                                            }}
                                            width={450}
                                            height={400}
                                        />
                                    </div>

                                    <p className="text-base text-gray-400 text-center">Upload your cover photo here</p>

                                    <label
                                        htmlFor="cover-img"
                                        className="py-3 px-4 text-blue-500 text-sm font-semibold rounded-lg border border-blue-500 cursor-pointer "
                                    >
                                        <FontAwesomeIcon icon={faCamera} className="text-blue-500 text-base mr-2" />
                                        Upload photo
                                    </label>

                                    <input
                                        className="hidden"
                                        id="cover-img"
                                        type="file"
                                        onChange={onChange}
                                        accept="image/*"
                                        ref={inputRef}
                                        readOnly={!editMode}
                                    />
                                </div>
                            ) : (
                                <div className="relative w-full h-full bg-slate-300">
                                    <img
                                        src={preview}
                                        alt="item1"
                                        style={{
                                            objectFit: "contain",
                                            backgroundColor: "white",
                                            width: "100%",
                                            height: "100%",
                                        }}
                                    />

                                    {editMode && (
                                        <button
                                            onClick={clear}
                                            className="w-8 h-8 rounded-full bg-red-500 absolute top-2 right-2"
                                        >
                                            <FontAwesomeIcon icon={faTrash} className="text-white text-sm" />
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                </FormCard>

                <FormCard label="What does your place look like?" >
                    <div className="px-4 flex flex-col gap-6">
                        <h4 className="text-sm font-semibold text-gray-600">
                            Add at least 3 photos now. You can always add more later.
                        </h4>

                        <div className="w-full border rounded-lg border-slate-500 border-dashed">
                            {!images ? (
                                <div className="w-full h-full py-24 flex flex-col items-center gap-8">
                                    <div className="w-32 h-32">
                                        <Image
                                            src={noimage}
                                            alt="item1"
                                            style={{
                                                objectFit: "contain",
                                                backgroundColor: "white",
                                                width: "100%",
                                                height: "100%",
                                            }}
                                            width={450}
                                            height={400}
                                        />
                                    </div>

                                    <p className="text-base text-gray-400 text-center">Upload your gallery photos here</p>

                                    <label
                                        htmlFor="gallery-img"
                                        className="py-3 px-4 text-blue-500 text-sm font-semibold rounded-lg border border-blue-500 cursor-pointer"
                                    >
                                        <FontAwesomeIcon icon={faCamera} className="text-blue-500 text-base mr-2" />
                                        Upload photo
                                    </label>

                                    <input
                                        className="hidden"
                                        id="gallery-img"
                                        type="file"
                                        onChange={onMultipleChange}
                                        accept="image/*"
                                        ref={inputRef}
                                        readOnly={!editMode}
                                    />
                                </div>
                            ) : (
                                <div className="w-full grid grid-cols-4 bg-slate-300">
                                    {previews.map((preview: any, index: number) => (
                                        <div key={index} className="w-full aspect-square relative">
                                            <img
                                                src={preview}
                                                alt="item1"
                                                style={{
                                                    objectFit: "contain",
                                                    backgroundColor: "white",
                                                    width: "100%",
                                                    height: "100%",
                                                }}
                                            />

                                            {editMode && (
                                                <button
                                                    onClick={() => clearGallery(preview)}
                                                    className="w-8 h-8 rounded-full bg-red-500 absolute top-2 right-2"
                                                >
                                                    <FontAwesomeIcon icon={faTrash} className="text-white text-sm" />
                                                </button>
                                            )}

                                        </div>
                                    ))}

                                    {editMode && (
                                        <div className="w-full aspect-square grid place-items-center">
                                            <label
                                                htmlFor="gallery-img"
                                                className="py-3 px-4 text-blue-500 text-sm font-semibold rounded-lg border border-blue-500 cursor-pointer"
                                            >
                                                <FontAwesomeIcon icon={faCamera} className="text-blue-500 text-base mr-2" />
                                                Add more
                                            </label>

                                            <input
                                                className="hidden"
                                                id="gallery-img"
                                                type="file"
                                                onChange={onMultipleChange}
                                                accept="image/*"
                                                ref={inputRef}
                                                readOnly={!editMode}
                                            />
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                </FormCard>

                <FormCard label="All the Photos of a Hotel">
                <div className="px-4 flex flex-col gap-6">
                    {/* <h4 className="text-sm font-semibold text-gray-600">
                        Add at least 3 photos now. You can always add more later.
                    </h4> */}

                    <div className="w-full grid grid-cols-6 bg-slate-300">
                        {galleryImages.map((preview: any, index: number) => (
                            <div key={index} className="w-full aspect-square relative border">
                                <Image
                                    src={preview}
                                    alt="item1"
                                    className="w-full h-full object-contain bg-white"
                                    width={450}
                                    height={400}
                                />
                                <button
                                    onClick={() => deletephoto(preview)}
                                    className="w-8 h-8 rounded-full bg-red-500 absolute top-2 right-2"
                                >
                                    <FontAwesomeIcon icon={faTrash} className="text-white text-sm" />
                                </button>
                            </div>
                        ))}

                    </div>
                </div>
            </FormCard>

                {editMode && (
                        <button onClick={handleSave} className="w-full py-4 btn-accent">  Next
                        </button>
                    )}                 
            </section>
        </Content>
    );
}

export default ImagesPage;