"use client"
import {useState} from "react";

export default function ToggleTabs({activeTab, setActiveTab, dict}) {

    return (
        <div className="flex items-center space-x-4 p-10 rounded-lg">
            <button
                onClick={() => setActiveTab("Photos")}
                className={`relative px-6 py-2 rounded-full transition font-semibold cursor-pointer ${
                    activeTab === "Photos"
                        ? " bg-gray-300 text-orange-500 border border-orange-500"
                        : "text-gray-400"
                }`}
            >
                {dict.photos}
            </button>
            <button
                onClick={() => setActiveTab("Videos")}
                className={`relative px-6 py-2 text-white rounded-full transition font-semibold cursor-pointer ${
                    activeTab === "Videos"
                        ? "bg-gray-300 text-orange-500 border border-orange-500"
                        : "text-gray-400"
                }`}
            >
                {dict.videos}
                {activeTab === "Videos" && (
                    <span className="absolute inset-0 border-2 border-orange-500 rounded-full"></span>
                )}
            </button>
        </div>
    );
}
