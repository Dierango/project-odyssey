"use client";
import React, { useState } from "react";

interface FeatureCardProps {
  title: string;
  icon: string;
  desc: string;
  detail: string;
}

export default function FeatureCard({ title, icon, desc, detail }: FeatureCardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="w-full h-64 perspective cursor-pointer"
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d ${
          flipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Ön Yüz */}
        <div className="absolute backface-hidden w-full h-full bg-white/10 border border-white/20 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-lg">
          <div className="text-4xl mb-4">{icon}</div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-sm">{desc}</p>
        </div>

        {/* Arka Yüz */}
        <div className="absolute backface-hidden w-full h-full bg-indigo-600 text-white rounded-2xl p-6 flex items-center justify-center text-center rotate-y-180">
          <p className="text-sm">{detail}</p>
        </div>
      </div>
    </div>
  );
}