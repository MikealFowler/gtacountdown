'use client';

import { useEffect, useRef, useState } from 'react';
import './globals.css';

const TARGET_DATE = new Date('2026-05-26T00:00:00-03:00'); // Atlantic Time (UTC-3)

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(): TimeLeft {
  const now = new Date().getTime();
  const distance = TARGET_DATE.getTime() - now;

  const total = Math.max(0, distance);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((total / (1000 * 60)) % 60);
  const seconds = Math.floor((total / 1000) % 60);

  return { days, hours, minutes, seconds };
}

export default function CountdownPage() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
  const tickSound = useRef<HTMLAudioElement | null>(null);
  const previousTimeRef = useRef<TimeLeft>(timeLeft);

  useEffect(() => {
  
    const interval = setInterval(() => {
      const next = calculateTimeLeft();
      setTimeLeft(next);
      setTimeout(() => {
        previousTimeRef.current = next;
      }, 50);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative bg-test-background w-full h-screen">
    
      <div className="absolute inset-0 bg-opacity-60"></div>
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white ">
        <div className="flex space-x-6 bg-gray-800 bg-opacity-70 p-6 rounded-2xl shadow-2xl border border-gray-600 mt-[500px]" >
          {[
            { label: 'Days', value: timeLeft.days },
            { label: 'Hours', value: timeLeft.hours },
            { label: 'Minutes', value: timeLeft.minutes },
            { label: 'Seconds', value: timeLeft.seconds },
          ].map((unit) => (
            <div key={unit.label} className="text-center">
              <div className="w-20 h-24 bg-gray-700 rounded-xl flex items-center justify-center text-4xl font-bold shadow-md">
                {unit.value.toString().padStart(2, '0')}
              </div>
              <div className="text-sm mt-2 uppercase tracking-wider">{unit.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}