import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSpring, animated, useTransition } from '@react-spring/web';

export default function ChooseRole() {
    const navigate = useNavigate();
    const [isLeaving, setIsLeaving] = useState(false);
    const [targetPath, setTargetPath] = useState(''); // To store the target path

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
                navigate(targetPath); // Navigate to the stored path
            }
        },
    });

    const handleRoleSelect = (rolePath) => {
        setButtonProps.start({ scale: 0.95 });
        setTargetPath(rolePath); // Store the target path
        setTimeout(() => {
            setButtonProps.start({ scale: 1 });
            setIsLeaving(true);
        }, 150);
    };

    return transition((style, item) =>
            item && (
                <animated.div style={style} className="text-black relative">
                    {/* Welcome Content */}
                    <div
                        className="container mx-auto px-4 py-8 flex flex-col items-center relative z-10"
                        style={{
                            backgroundColor: 'transparent',
                        }}
                    >
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
                        <animated.div style={style} className="text-white relative">
                            {/* Action Buttons */}
                            <div className="w-full max-w-[600px] space-y-4">
                                <animated.button
                                    style={buttonProps}
                                    className="w-full h-14 text-lg font-medium rounded-xl bg-black text-white hover:bg-gray-200 transition-colors"
                                    onClick={() => handleRoleSelect('/add-bakery')}
                                    onMouseEnter={() => setButtonProps.start({ scale: 1.05 })}
                                    onMouseLeave={() => setButtonProps.start({ scale: 1 })}
                                >
                                    I am a Bakery
                                </animated.button>
                                <animated.button
                                    style={buttonProps}
                                    className="w-full h-14 text-lg font-medium rounded-xl bg-black text-white hover:bg-gray-200 transition-colors"
                                    onClick={() => handleRoleSelect('/signup')}
                                    onMouseEnter={() => setButtonProps.start({ scale: 1.05 })}
                                    onMouseLeave={() => setButtonProps.start({ scale: 1 })}
                                >
                                    I am a Bakery Lover
                                </animated.button>

                                <div className="flex items-center justify-between px-4">
                                    <button
                                        className="text-sm text-gray-400 hover:text-white transition-colors"
                                        onClick={() => navigate('/home')}
                                    >
                                        Check out more bakeries
                                    </button>
                                    <button
                                        className="text-sm text-black hover:text-gray-200 transition-colors"
                                        onClick={() => navigate('/login')}
                                    >
                                        Sign in
                                    </button>
                                </div>
                            </div>
                        </animated.div>
                    </div>
                </animated.div>
            )
    );
}