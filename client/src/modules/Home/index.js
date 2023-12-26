import React from "react";
// import { IoAccessibility } from "react-icons/io5";
import { HiOutlineArrowsExpand } from "react-icons/hi";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { FaCircleUser } from "react-icons/fa6";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Profile from "../../Asset/pexels-pixabay-415829.jpg";
import { CiSettings } from "react-icons/ci";
import { TbMessageShare } from "react-icons/tb";
import { IoAppsSharp, IoHome, IoShareSocial } from "react-icons/io5";
import { CiSaveDown2 } from "react-icons/ci";
// import { IoMdHome } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { FaComments } from "react-icons/fa";
// import { IoShareSocialOutline } from "react-icons/io5";
import { stats } from "../Home/data";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="h-screen bg-[#d2cfdf] flex overflow-hidden">
      <div className="w-[20%] bg-white flex flex-col">
        <div className=" h-[30%] flex justify-center items-center border-b">
          <div className="flex flex-col justify-center items-center">
            <FaCircleUser size={"50px"} height={"300px"} width={"300px"} />
            <p className="my-4">@Lara_Jane</p>
            <div className="h-[50px] flex justify-around w-[300px] text-center">
              {stats.map(({ id, name, stat }) => {
                return (
                  <div
                    key={id}
                    className="flex flex-col justify-around items-center cursor-pointer"
                  >
                    <h4>{stat}</h4>
                    <p>{name}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className=" h-[55%] flex flex-col justify-evenly pl-12 border-b">
          <div className="flex cursor-pointer">
            <IoHome className="mt-1" />
            <div className="ml-1">Feeds</div>
          </div>
          <div className="flex cursor-pointer">
            <HiOutlineArrowsExpand className="mt-1" />
            <div className="ml-1">Explores</div>
          </div>
          <div className="flex cursor-pointer">
            <CiSaveDown2 className="mt-1" />
            <div className="ml-1">My favourite</div>
          </div>
          <div className="flex cursor-pointer">
            <TbMessageShare className="mt-1" />
            <div className="ml-1">Direct</div>
          </div>
          <div className="flex cursor-pointer">
            <IoAppsSharp className="mt-1" />
            <div className="ml-1">Status</div>
          </div>
          <div className="flex cursor-pointer">
            <CiSettings className="mt-1" />
            <div className="ml-1">Settings</div>
          </div>
        </div>
        <div className=" h-[15%]">
          <p className="ml-12 cursor-pointer flex mt-5 ">
            <FaArrowRightFromBracket className="mt-1" />
            <div className="ml-1">Logout</div>
          </p>
        </div>
      </div>
      <div className="w-[60%] overflow-scroll h-full scrollbar-hide">
        <div className="bg-white h-[75px] border-l flex justify-evenly items-center">
          <div className="flex justify-center items-center">
            <Input placeholder="Enter your Search" />
            <Button label="Search" className="mb-4 ml-4" />
          </div>
          <Button
            label="Create a post"
            onClick={() => navigate("/new-post")}
            className="rounded bg-red-300 hover:bg-red-800 mb-4"
          />
        </div>
        <div className="bg-white w-[60%] mx-auto mt-32">
          <div className="border-b flex items-center">
            <FaCircleUser className="ml-2" size={"30px"} />
            <div className="ml-4 mb-4">
              <h3>Lara Jane</h3>
              <p>@lara_jane</p>
            </div>
          </div>
          <div className="border-b mb-4 pb-4">
            <img src={Profile} />
            <p className="my-4 text-sm font-normal">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet
              ullam mollitia qui quia, atque eligendi debitis aperiam? Incidunt,
              repudiandae ad.
            </p>
          </div>

          <div className="flex justify-evenly text-black text-sm font-medium">
            <div className="flex cursor-pointer items-center p-1">
              <span className="mr-2">
                <FaRegHeart />
              </span>
              10.5k likes
            </div>
            <div className="flex cursor-pointer items-center">
              <span className="mr-2">
                <FaComments />
              </span>
              10.5k Comments
            </div>
            <div className="flex cursor-pointer items-center">
              <span className="mr-2">
                <IoShareSocial />
              </span>
              10.5k Shares
            </div>
          </div>
        </div>
      </div>
      <div className="w-[20%] bg-[#f2f5f8]">
        <div className="font-sans">
          <div className="text-black ml-2 mt-2">Trending feeds</div>
          <div className="bg-red-950 h-[200px] w-[300px] mt-2"></div>
        </div>
        <div>
          <div className="text-black ml-2 mt-2">Suggestion for you</div>
          <div className="bg-blue-400 h-[200px] w-[300px] mt-2"></div>
        </div>
        <div>
          <div className="text-black ml-2 mt-2">Active Followers</div>
          <div className="bg-pink-500 h-[200px] w-[300px] mt-2"></div>
        </div>
      </div>
    </div>
  );
}
