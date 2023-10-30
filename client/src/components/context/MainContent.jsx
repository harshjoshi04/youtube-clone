"use client";
import { CraeteChannel } from "@/helper/Channel";
import { createChannel } from "@/redux/user/userSlice";
import useDebouncing from "@/utils/Debouncing";
import {
  Avatar,
  Button,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@nextui-org/react";
import React, { useState } from "react";
import { MdDone } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

export default function MainContent({ onClose }) {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData.userInfo);
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(userData?.image);
  const [cname, setcname] = useState("");
  const [cusername, setcusername] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [debounce, loading] = useDebouncing(cusername);

  const handleSubmitData = async () => {
    try {
      let obj = {
        cname,
        cusername,
        image: file || image,
        change: file && true,
      };
      setisLoading(true);
      const result = await CraeteChannel(obj);
      dispatch(createChannel(result));
      setisLoading(false);
      onClose();
    } catch (error) {
      if (error) console.log(error);
    }
  };

  return (
    <div>
      <ModalHeader className="flex flex-col gap-1">Create Channel</ModalHeader>
      <ModalBody>
        <div className=" flex gap-3 flex-col">
          <div className="flex justify-center py-3">
            <input
              type="file"
              name=""
              id="imageUp"
              className="hidden"
              onChange={(e) => {
                setImage(URL.createObjectURL(e.target.files[0]));
                let reader = new FileReader();

                // Convert the file to base64 text
                reader.readAsDataURL(e.target.files[0]);

                // on reader load somthing...
                reader.onload = () => {
                  // Make a fileInfo Object
                  setFile(reader.result);
                };
              }}
            />
            <label htmlFor="imageUp">
              <Avatar src={image} className="w-16 h-16 cursor-pointer" />
            </label>
          </div>
          <div className="flex flex-col gap-6 relative">
            <input
              type="text"
              className="bg-transparent border-b-2 px-2 py-1 transition-all"
              placeholder="Your Channel Name"
              onChange={(e) => setcname(e.target.value)}
              value={cname}
            />

            <input
              type="text"
              className={`bg-transparent border-b-2 px-2 py-1 transition-all ${
                debounce && "border-red-500 text-red-500"
              } `}
              placeholder="Your Channel Username"
              onChange={(e) => {
                setcusername(e.target.value);
              }}
              value={cusername}
            />
            {loading && (
              <Spinner
                className="transition-all absolute bottom-2 right-1"
                size="sm"
              />
            )}
            {!loading && !debounce && (
              <MdDone
                className="transition-all absolute bottom-2 right-1 text-green-400"
                size={16}
              />
            )}
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="danger" variant="light" onPress={onClose} type="button">
          Close
        </Button>

        <div className="transition-opacity">
          <Button
            color="primary"
            type="submit"
            onClick={handleSubmitData}
            isDisabled={!cname || !cusername || debounce || loading}
            isLoading={isLoading}
          >
            Create
          </Button>
        </div>
      </ModalFooter>
    </div>
  );
}
