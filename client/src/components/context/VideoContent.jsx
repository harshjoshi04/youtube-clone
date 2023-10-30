"use client";
import {
  Button,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Spinner,
  Tooltip,
} from "@nextui-org/react";
import React, { useRef, useState } from "react";
import { RiVideoUploadFill } from "react-icons/ri";
import { HiOutlinePhoto } from "react-icons/hi2";
import axios from "axios";
import { VideoUpload } from "@/helper/Channel";

export default function VideoContent({ onClose }) {
  const [file, setfile] = useState(null);
  const [loading, setloading] = useState(false);
  const [title, settitle] = useState("");
  const [desc, setdec] = useState("");
  const videoRef = useRef();
  const imageRef = useRef();
  const handleUploadVideo = async () => {
    try {
      setloading(true);
      let formData1 = new FormData();

      formData1.append("file", videoRef.current.files[0]);
      formData1.append("upload_preset", "youtube-clone");
      formData1.append("cloud_name", "dqrt1jrea");
      const { data } = await axios.post(
        "https://api.cloudinary.com/v1_1/dqrt1jrea/video/upload",
        formData1
      );

      const obj = {
        videoSrc: data?.secure_url,
        image: file,
        videoTitle: title,
        videoDescription: desc,
      };
      await VideoUpload(obj);
      setloading(false);
      onClose();
    } catch (er) {
      if (er) console.log(er);
    }
  };
  return (
    <>
      {loading ? (
        <>
          <ModalHeader>Uploading...</ModalHeader>
          <ModalBody>
            <Spinner className="mb-6" />
            <p className="text-center">Its Take Few Minutes...</p>
          </ModalBody>
        </>
      ) : (
        <div>
          <ModalHeader className="flex flex-col gap-1">
            Upload Video
          </ModalHeader>
          <ModalBody>
            <div className=" flex gap-3 flex-col">
              <div className="flex justify-between   py-3 px-16">
                <input
                  type="file"
                  ref={videoRef}
                  name=""
                  id="videoUp"
                  className="hidden"
                />
                <input
                  type="file"
                  name=""
                  ref={imageRef}
                  id="imageUp"
                  className="hidden"
                  onChange={(e) => {
                    let reader = new FileReader();

                    // Convert the file to base64 text
                    reader.readAsDataURL(e.target.files[0]);

                    // on reader load somthing...
                    reader.onload = () => {
                      // Make a fileInfo Object
                      setfile(reader.result);
                    };
                  }}
                />
                <Tooltip
                  content="Upload Video"
                  className="bg-transparent"
                  placement="bottom"
                >
                  <label htmlFor="videoUp">
                    <RiVideoUploadFill
                      size={35}
                      className={`cursor-pointer `}
                    />
                  </label>
                </Tooltip>
                <Tooltip
                  content="Upload Thumbnail"
                  className="bg-transparent"
                  placement="bottom"
                >
                  <label htmlFor="imageUp">
                    <HiOutlinePhoto size={35} className="cursor-pointer " />
                  </label>
                </Tooltip>
              </div>
              <div className="flex flex-col gap-6 relative">
                <input
                  type="text"
                  className="bg-transparent border-b-2 px-2 py-1 transition-all"
                  placeholder="Video Title"
                  onChange={(e) => settitle(e.target.value)}
                  value={title}
                />

                <textarea
                  type="text"
                  className={`bg-transparent border-b-2 px-2 py-1 transition-all outline-none`}
                  placeholder="Video Description"
                  onChange={(e) => setdec(e.target.value)}
                  value={desc}
                ></textarea>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="light"
              onPress={onClose}
              type="button"
            >
              Close
            </Button>

            <div className="transition-opacity">
              <Button
                color="primary"
                type="submit"
                onClick={handleUploadVideo}
                disabled={!title || !desc}
              >
                Upload
              </Button>
            </div>
          </ModalFooter>
        </div>
      )}
    </>
  );
}
