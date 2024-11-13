// src/pages/WelcomePage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSpring, animated, useTransition } from '@react-spring/web';
import ParticlesBackground from '../components/ParticlesBackground';

export default function WelcomePage() {
  const navigate = useNavigate();
  const [isLeaving, setIsLeaving] = useState(false);

  const [buttonProps, setButtonProps] = useSpring(() => ({
    scale: 1,
    config: { tension: 300, friction: 10 },
  }));

  const transition = useTransition(!isLeaving, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 300 },
    onRest: () => {
      if (isLeaving) {
        navigate('/signup');
      }
    },
  });

  const handleGetStarted = () => {
    setButtonProps.start({ scale: 0.95 });
    setTimeout(() => {
      setButtonProps.start({ scale: 1 });
      setIsLeaving(true);
    }, 150);
  };

  return transition((style, item) =>
    item && (
      <animated.div style={style} className="min-h-screen text-white relative">
        {/* Particle Background */}
        <ParticlesBackground /> 

        {/* Welcome Content */}
        <div className="container mx-auto px-4 py-8 flex flex-col items-center relative z-10 bg-transparent">
          <div className="text-center space-y-4 mb-8">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Connect with
              <br />
              Bakeries
            </h1>
            <p className="text-gray-400 max-w-[600px] mx-auto">
              Explore bakeries, view products, and place custom orders.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="w-full max-w-[600px] space-y-4">
            <animated.button
              style={buttonProps}
              className="w-full h-14 text-lg font-medium rounded-xl bg-white text-gray-950 hover:bg-gray-200 transition-colors"
              onClick={handleGetStarted}
              onMouseEnter={() => setButtonProps.start({ scale: 1.05 })}
              onMouseLeave={() => setButtonProps.start({ scale: 1 })}
            >
              Get Started
            </animated.button>

            <div className="flex items-center justify-between px-4">
              <button
                className="text-sm text-gray-400 hover:text-white transition-colors"
                onClick={() => navigate('/home')}
              >
                Check out more bakeries
              </button>
              <button
                className="text-sm font-medium hover:text-gray-200 transition-colors"
                onClick={() => navigate('/login')}
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
      </animated.div>
    )
  );
}
