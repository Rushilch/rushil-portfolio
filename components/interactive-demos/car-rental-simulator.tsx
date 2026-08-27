"use client";

import React, { useState } from "react";
import { Car, Key, ShieldCheck, Calendar, DollarSign, CheckCircle2, RotateCcw, Sparkles } from "lucide-react";
import { sound } from "@/lib/sound";
import { computeRentalCost, INSURANCE_RATE_PER_DAY } from "@/lib/rental-calc";

interface Vehicle {
  id: string;
  name: string;
  category: "Economy" | "SUV" | "Luxury Sedan";
  dailyRate: number;
  available: boolean;
  specs: string;
}

const FLEET: Vehicle[] = [
  { id: "V101", name: "Toyota Camry Hybrid", category: "Economy", dailyRate: 45, available: true, specs: "2.5L 4-Cyl • 52 MPG • FWD" },
  { id: "V102", name: "Hyundai Tucson AWD", category: "SUV", dailyRate: 65, available: true, specs: "2.5L AWD • 5 Seats • Roof Rack" },
  { id: "V103", name: "BMW 530i M-Sport", category: "Luxury Sedan", dailyRate: 110, available: true, specs: "2.0L Turbo • Leather • Adaptive Cruise" },
  { id: "V104", name: "Ford Explorer XLT", category: "SUV", dailyRate: 85, available: false, specs: "3.0L EcoBoost • 7 Seats • Tow Package" },
];

export function CarRentalSimulator() {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle>(FLEET[0]);
  const [rentalDays, setRentalDays] = useState(3);
  const [includeInsurance, setIncludeInsurance] = useState(true);
  const [customerName, setCustomerName] = useState("Jane Doe");
  const [isBooked, setIsBooked] = useState(false);

  const { subtotal, insuranceTotal, tax, grandTotal } = computeRentalCost({
    dailyRate: selectedVehicle.dailyRate,
    days: rentalDays,
    includeInsurance,
  });

  const handleSelect = (v: Vehicle) => {
    if (!v.available) {
      sound.playCancel();
      return;
    }
    sound.playSelect();
    setSelectedVehicle(v);
    setIsBooked(false);
  };

  const handleBook = () => {
    sound.playSelect();
    setIsBooked(true);
  };

  const handleReset = () => {
    sound.playCancel();
    setIsBooked(false);
  };

  return (
    <div className="bg-[#030712] border-2 border-[#00d2ff]/40 p-4 sm:p-6 p3-cut-corner text-xs font-mono space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Car className="w-4 h-4 text-[#00d2ff]" />
          <span className="font-bold text-[#f0f8ff] tracking-wide text-sm">
            Java OOP Fleet &amp; Reservation Engine
          </span>
        </div>
        <span className="text-[10px] text-[#10b981] font-bold bg-[#060e22] px-2 py-0.5 border border-[#10b981]/40">
          ● Runtime: Java 17 OOP
        </span>
      </div>

      {/* Fleet Grid */}
      <div>
        <div className="text-[10px] text-slate-400 font-bold mb-2">
          Select Vehicle Object (Polymorphic Domain Model):
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {FLEET.map((v) => {
            const isSelected = selectedVehicle.id === v.id;
            return (
              <button
                key={v.id}
                disabled={!v.available}
                onClick={() => handleSelect(v)}
                onMouseEnter={() => sound.playHover()}
                className={`p-3 text-left border transition-all flex flex-col justify-between ${
                  !v.available
                    ? "bg-[#060a14] border-slate-900 opacity-50 cursor-not-allowed"
                    : isSelected
                    ? "bg-[#060e22] border-[#00d2ff] shadow-[0_0_15px_rgba(0,210,255,0.3)]"
                    : "bg-[#060e22] border-slate-800 hover:border-slate-600"
                }`}
              >
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[9px] font-bold text-[#00d2ff] bg-[#030712] px-1.5 py-0.2">
                      {v.id}
                    </span>
                    <span
                      className={`text-[9px] font-bold ${
                        v.available ? "text-[#10b981]" : "text-[#ff2a5f]"
                      }`}
                    >
                      {v.available ? "AVAILABLE" : "RENTED OUT"}
                    </span>
                  </div>
                  <div className="font-black text-[#f0f8ff] text-xs uppercase">{v.name}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{v.specs}</div>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-800 flex justify-between items-center text-[11px] font-bold">
                  <span className="text-slate-400">{v.category}</span>
                  <span className="text-[#ffea00]">${v.dailyRate}/day</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Reservation Configurator */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 pt-2 border-t border-slate-800">
        {/* Left Form */}
        <div className="space-y-3 bg-[#060e22] p-4 border border-slate-800">
          <div className="text-[10px] text-[#00d2ff] font-bold uppercase">
            RESERVATION PARAMETERS:
          </div>

          <div>
            <label className="block text-slate-400 mb-1">CUSTOMER NAME (RECORD KEY)</label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full bg-[#030712] border border-slate-700 text-slate-100 px-2.5 py-1.5 focus:outline-none focus:border-[#00d2ff]"
            />
          </div>

          <div>
            <div className="flex justify-between text-slate-400 mb-1">
              <span>RENTAL DURATION:</span>
              <strong className="text-[#00d2ff]">{rentalDays} DAYS</strong>
            </div>
            <input
              type="range"
              min="1"
              max="14"
              value={rentalDays}
              onChange={(e) => {
                sound.playHover();
                setRentalDays(Number(e.target.value));
              }}
              className="w-full h-1.5 bg-slate-800 rounded appearance-none accent-[#00d2ff] cursor-pointer"
            />
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="insurance"
              checked={includeInsurance}
              onChange={(e) => {
                sound.playSelect();
                setIncludeInsurance(e.target.checked);
              }}
              className="w-4 h-4 accent-[#00d2ff]"
            />
            <label htmlFor="insurance" className="text-slate-300 cursor-pointer">
              Comprehensive Collision Coverage (+${INSURANCE_RATE_PER_DAY}/day)
            </label>
          </div>
        </div>

        {/* Right Tariff Summary & Action */}
        <div className="space-y-3 bg-[#060e22] p-4 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="text-[10px] text-[#ffea00] font-bold uppercase mb-2">
              BILLING INVOICE CALCULATION:
            </div>
            <div className="space-y-1.5 text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-400">Base Rate ({selectedVehicle.name}):</span>
                <span>${selectedVehicle.dailyRate} × {rentalDays}d = ${subtotal}</span>
              </div>
              {includeInsurance && (
                <div className="flex justify-between text-[#10b981]">
                  <span>Insurance Policy:</span>
                  <span>+${insuranceTotal}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-400">
                <span>Tax &amp; Municipal Surcharge (8%):</span>
                <span>+${tax}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-700 text-sm font-black text-[#f0f8ff]">
                <span>TOTAL BILLED AMOUNT:</span>
                <span className="text-[#ffea00]">${grandTotal}</span>
              </div>
            </div>
          </div>

          <div className="pt-3">
            {isBooked ? (
              <div className="space-y-2">
                <div className="p-2.5 bg-emerald-950/60 border border-[#10b981] text-[#10b981] font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>RESERVATION DISPATCHED // CONFIRMATION ID: #RENT-{Math.floor(Math.random() * 89999 + 10000)}</span>
                </div>
                <button
                  onClick={handleReset}
                  className="w-full py-1.5 bg-[#030712] border border-slate-700 hover:border-slate-500 text-slate-300 font-bold flex items-center justify-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>NEW RESERVATION</span>
                </button>
              </div>
            ) : (
              <button
                onClick={handleBook}
                className="w-full py-2.5 bg-[#00d2ff] hover:bg-[#00f0ff] text-[#030712] font-black uppercase tracking-wider shadow-[0_0_20px_#00d2ff] transition-all flex items-center justify-center gap-2"
              >
                <Key className="w-4 h-4" />
                <span>CONFIRM VEHICLE BOOKING</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
