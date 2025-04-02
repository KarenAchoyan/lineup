import React, {useContext, useState} from 'react';
import {ArchiveContext} from "@/providers/ArchiveProvider";
import ItemVideo from "@/components/archive/item";
import Modal from "@/components/archive/modal";

const Videos = ({videos}) => {
    const [showModal, setShowModal] = useState(false);
    const [videoStarted, setVideoStarted] = useState(false);
    const [video, setVideo] = useState(null);

    function openModal() {
        setShowModal(!showModal);
        setVideoStarted(!videoStarted);
    }

    return (
        <div>
            <div className='container m-auto my-20'>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                    {videos?.map((item) => (
                        <ItemVideo item={item} setVideo={setVideo} key={item.id} openModal={openModal}/>
                    ))}
                </div>
                {showModal && <Modal openModal={openModal} video={video} videoStarted={videoStarted}/>}
            </div>
        </div>
    );
};

export default Videos;