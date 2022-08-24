import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";


import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { abiPlatziFoodAddress } from "../config";
import PlatziFood from "./../utils/abi/PlatziFood.json";


export default function MyDishes() {
  const dishes = [
    {
      url:
        "https://eatyourworld.com/images/content_images/images/gallo-pinto.jpg",
      name: "Gallo Pinto",
      country: "Comida típica de Costa Rica",
    },
  ];
  
  const [dishesOwner, setDishesOwner] = useState([])

  const getMyDishes = async () => {
    const { ethereum } = window;
        if(ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);    
            const signer = provider.getSigner();
            const contract = new ethers.Contract(abiPlatziFoodAddress, PlatziFood.abi, signer);
            const dishes = await contract.getPlatziFoodsByOwner();
            setDishesOwner(dishes);
        }

  }

  useEffect(() => {
    getMyDishes();
  }, []);
  
  return (
    <div className="flex justify-center">
      <div className="px-4" style={{ maxWidth: "1600px" }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {dishesOwner.map((food, i) => (
            <div key={i} className="border shadow rounded-xl overflow-hidden">
              <img style={{ height: "20rem" }} src={food.foodUrl} />
              <div className="p-4">
                <p
                  style={{ height: "64px" }}
                  className="text-2xl font-semibold"
                >
                  {food.foodName}
                </p>
                <div style={{ height: "70px", overflow: "hidden" }}>
                  <p>{dishes.foodName}</p>
                  <p className="text-gray-400">{food.originCountry}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
