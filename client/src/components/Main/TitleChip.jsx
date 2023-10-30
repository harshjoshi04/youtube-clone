"use client";
import { Chip } from "@nextui-org/react";
import React from "react";

export default function TitleChip()  {
  return (
    <div className="flex px-2 gap-3">
      <Chip>All</Chip>
      <Chip color="#0f0f0f" className="bg-gray-100 bg-opacity-10">
        Music
      </Chip>
      <Chip color="#0f0f0f" className="bg-gray-100 bg-opacity-10">
        Gaming
      </Chip>
      <Chip color="#0f0f0f" className="bg-gray-100 bg-opacity-10">
        Web Develepment
      </Chip>
      <Chip color="#0f0f0f" className="bg-gray-100 bg-opacity-10">
        Movie
      </Chip>
      <Chip color="#0f0f0f" className="bg-gray-100 bg-opacity-10">
        Comdey
      </Chip>
      <Chip color="#0f0f0f" className="bg-gray-100 bg-opacity-10">
        News
      </Chip>
      <Chip color="#0f0f0f" className="bg-gray-100 bg-opacity-10">
        GTA 5
      </Chip>
      <Chip color="#0f0f0f" className="bg-gray-100 bg-opacity-10">
        BGMI
      </Chip>
    </div>
  );
}
