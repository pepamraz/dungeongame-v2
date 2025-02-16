import React, { use, useEffect, useRef, useState } from 'react';
import FarmImage from '../../assets/farm/farm.webp';

const Farm = ({ player, setPlayer }) => {
    const progressBar = useRef(null);
    const farmingTime = 60 * 1000;
    const tick = 10;
    const [progress, setProgress] = useState(0);
    const [isActionPending, setIsActionPending] = useState(false);
    const [farmStateNow, setFarmStateNow] = useState('Nothing planted here.');

    useEffect(() => {
        if (player.farmState === 'plant' && player.farmTimeEnd > Date.now()) {
            setFarmStateNow('Planting...');
        } else if (player.farmState === 'plant' && player.farmTimeEnd <= Date.now()) {
            setFarmStateNow('Planted.');
        } else if (player.farmState === 'water' && player.farmTimeEnd > Date.now()) {
            setFarmStateNow('Watering...');
        } else if (player.farmState === 'water' && player.farmTimeEnd <= Date.now()) {
            setFarmStateNow('Watered.');
        } else if (player.farmState === 'harvest' && player.farmTimeEnd > Date.now()) {
            setFarmStateNow('Harvesting...');
        } else if (player.farmState === 'harvest' && player.farmTimeEnd <= Date.now()) {
            setFarmStateNow('Harvested.');
            setPlayer((prev) => ({ ...prev, farmState: 'none', farmTimeEnd: 0 }));
        } else {
            setFarmStateNow('Nothing planted here.');
        }
    }, [player.farmState, player.farmTimeEnd]);

    useEffect(() => {
        let timer;
        
        if (player.farmTimeEnd > Date.now()) {
            setIsActionPending(true);
            const remainingTime = player.farmTimeEnd - Date.now();
            setProgress((remainingTime / farmingTime) * 100);

            timer = setInterval(() => {
                setProgress((prev) => {
                    if (prev <= 0) {
                        clearInterval(timer);
                        setIsActionPending(false);
                        return 0;
                    }
                    return prev - (tick / farmingTime) * 100;
                });
            }, tick);
        }
        else if(player.farmState === 'harvest') {
            setPlayer((prev) => ({
                ...prev,
                farmState: 'none',
                farmTimeEnd: 0,
                money: prev.money + 5,
                moneyMade: prev.moneyMade + 5,
            }));
        }
        return () => clearInterval(timer);
    }, [player.farmTimeEnd]);

    const startFarmingProcess = (newState) => {
        setIsActionPending(true);
        const endTime = Date.now() + farmingTime;
        setPlayer((prev) => ({ ...prev, farmState: newState, farmTimeEnd: endTime }));
        setProgress(100);

        let timer = setInterval(() => {
            setProgress((prev) => {
                if (prev <= 0) {
                    clearInterval(timer);
                    setIsActionPending(false);
                    if(newState === 'plant') {
                        setFarmStateNow('Planted!');
                    } else if(newState === 'water') {
                        setFarmStateNow('Watered!');
                    } else if(newState === 'harvest') {
                        setFarmStateNow('Harvested!');
                    }
                    return 0;
                }
                return prev - (tick / farmingTime) * 100;
            });
        }, tick);
    };

    const plant = () => {
        if (player.farmState !== 'none' && player.farmState !== 'harvest') {
            alert('You are already farming!');
            return;
        }
        setFarmStateNow('Planting...');
        startFarmingProcess('plant');
    };

    const water = () => {
        if (player.farmState !== 'plant') {
            alert('You need to plant first!');
            return;
        }
        setFarmStateNow('Watering...');
        startFarmingProcess('water');
    };

    const harvest = () => {
        if (player.farmState !== 'water') {
            alert('You need to water first!');
            return;
        }
        setFarmStateNow('Harvesting...');
        startFarmingProcess('harvest');

        setTimeout(() => {
            setPlayer((prev) => ({
                ...prev,
                farmState: 'none',
                farmTimeEnd: 0,
                money: prev.money + 10,
                moneyMade: prev.moneyMade + 10,
            }));
        }, farmingTime);
    };

    return (
        <>
            <div id="shop" className="absolute top-0 left-0 p-2 px-4 z-10">
                <p>Farm - {farmStateNow}</p>
            </div>
            <div id="game-graphics" className="h-39/48 bg-gray-500 rounded-t-lg relative overflow-hidden">
                <div
                    className="h-full"
                    style={{ backgroundImage: `url(${FarmImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                >
                    <div className="w-full h-full bg-radial from-40% to-black opacity-80" />
                </div>
            </div>
            <div id="game-controls" className="h-8/48 bg-gray-700 grid grid-cols-3 p-4 gap-2 text-2xl relative">
                {isActionPending && (
                    <div className="absolute top-0 left-0 w-full h-full bg-[#36415390] flex justify-center items-center">
                        <p className="text-4xl logo">⏳</p>
                    </div>
                )}
                <button id="plant" title="Plant!" onClick={plant} disabled={isActionPending}>
                    🌱 Plant
                </button>
                <button id="water" title="Water!" onClick={water} disabled={isActionPending}>
                    🚿 Water
                </button>
                <button id="harvest" title="Harvest!" onClick={harvest} disabled={isActionPending}>
                    🌽 Harvest and sell
                </button>
            </div>
            <div className="h-1/48 bg-gray-700 rounded-b-lg flex justify-center items-center">
                <progress ref={progressBar} id="timeout" value={progress} max={100} className="h-full w-full bg-gray-700"></progress>
            </div>
        </>
    );
};

export default Farm;
