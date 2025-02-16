import React, { useEffect, useRef, useState } from 'react';
import ZombieImage from '../../assets/zombies/zombie-1.webp';
import DiamondImage from '../../assets/diamonds/diamond-1.webp';

const Cave = ({ player, setPlayer }) => {
    const [roomCount, setRoomCount] = useState(1);
    const [roomType, setRoomType] = useState(null);
    const [isActionPending, setIsActionPending] = useState(false);
    const progressBar = useRef(null);
    const [caveImage, setCaveImage] = useState(1);

    const randomRoomType = (filterOutCurrentType=true) => {
        let roomTypes = ['zombie', 'diamond', 'empty'];
        if (filterOutCurrentType) {
            roomTypes = roomTypes.filter(type => type !== roomType);
        }
        return roomTypes[Math.floor(Math.random() * roomTypes.length)];
    };

    useEffect(() => {
        setRoomType(randomRoomType());
    }, []);

    useEffect(() => {
        if (player.energy <= 0 || player.health <= 0) {
            alert('Game over!');
            setPlayer({
                name: 'Player',
                health: 100,
                energy: 100,
                money: 0.89
            });
            setRoomCount(0);
            setRoomType(randomRoomType(false));
        }
    }, [player, setPlayer]);

    useEffect(() => {
        let newCaveImage;
        switch (true) {
            case (roomCount >= 100 && roomCount < 200):
                newCaveImage = 2;
                break;
            case (roomCount >= 200 && roomCount < 300):
                newCaveImage = 3;
                break;
            case (roomCount >= 300 && roomCount < 400):
                newCaveImage = 4;
                break;
            case (roomCount >= 400 && roomCount < 500):
                newCaveImage = 5;
                break;
            case (roomCount >= 500 && roomCount < 600):
                newCaveImage = 6;
                break;
            case (roomCount >= 600 && roomCount < 700):
                newCaveImage = 7;
                break;
            case (roomCount >= 700):
                newCaveImage = 8;
                break;
            default:
                newCaveImage = 1;
        }
        setCaveImage(newCaveImage);
    }, [roomCount]);

    const nextRoom = () => {
        setRoomType(randomRoomType());
        setRoomCount(prevCount => prevCount + 1);
    };

    const performActionWithDelay = (action) => {
        if (isActionPending) return;
        setIsActionPending(true);

        const buttons = document.querySelectorAll('#game-controls button');
        buttons.forEach(button => button.disabled = true);

        let progress = 100;
        const timer = setInterval(() => {
            progress -= 1;
            if (progressBar.current) {
                progressBar.current.value = progress;
            }
            if (progress <= 0) {
                clearInterval(timer);
                if (progressBar.current) {
                    progressBar.current.value = 100;
                }
                action();
                setIsActionPending(false);
                buttons.forEach(button => button.disabled = false);
            }
        }, 10);
    };

    const attack = () => {
        performActionWithDelay(() => {
            if (roomType === 'zombie') {
                setPlayer(prev => ({ ...prev, energy: prev.energy - 5 }));
            } else {
                setPlayer(prev => ({ ...prev, energy: prev.energy - 10 }));
            }
            nextRoom();
        });
    };

    const pickUp = () => {
        performActionWithDelay(() => {
            if (roomType === 'zombie') {
                setPlayer(prev => ({ ...prev, energy: prev.energy - 10, health: prev.health - 10 }));
            } else if (roomType === 'diamond') {
                setPlayer(prev => ({ ...prev, money: prev.money + Number(Math.random().toFixed(2)) }));
            } else {
                setPlayer(prev => ({ ...prev, energy: prev.energy - 5 }));
            }
            nextRoom();
        });
    };

    const walk = () => {
        performActionWithDelay(() => {
            if (roomType === 'zombie') {
                setPlayer(prev => ({ ...prev, energy: prev.energy - 10, health: prev.health - 10 }));
            } else {
                setPlayer(prev => ({ ...prev, energy: prev.energy - 5 }));
            }
            nextRoom();
        });
    };

    return (
        <>
            <div id="roomCount" className="absolute top-0 left-0 p-2 px-4 z-10">
                <p>Room: {roomCount}</p>
            </div>
            <div id="game-graphics" className="h-39/48 bg-gray-500 rounded-t-lg relative">
                <div className="h-full" style={{ backgroundImage: `url(/src/assets/caves/cave-${caveImage}.webp)`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                    <div className="w-full h-full bg-radial from-40% to-black opacity-80" />
                </div>
                {roomType === 'zombie' && (
                    <img src={ZombieImage} alt="zombie" className="max-h-4/5 drop-shadow-[0_30px_60px_rgba(0,0,0,0.75)] absolute bottom-[-15px] left-1/2 transform -translate-x-1/2" />
                )}
                {roomType === 'diamond' && (
                    <img src={DiamondImage} alt="diamond" className="max-h-2/5 drop-shadow-[0_30px_60px_rgba(0,0,0,0.75)] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                )}
            </div>
            <div id="game-controls" className="h-8/48 bg-gray-700 grid grid-cols-3 p-4 gap-2 text-4xl relative">
                {isActionPending && 
                    <div className="absolute top-0 left-0 w-full h-full bg-[#36415390] flex justify-center items-center">
                        <p className="text-4xl logo">⏳</p>
                    </div>
                }
                <button id="attack" title="Attack!" onClick={attack} disabled={isActionPending}>⚔️</button>
                <button id="walk" title="Go!" onClick={walk} disabled={isActionPending}>⛏️</button>
                <button id="pick-up" title="Pick up!" onClick={pickUp} disabled={isActionPending}>🫳</button>
            </div>
            <div className="h-1/48 bg-gray-700 rounded-b-lg flex justify-center items-center">
                <progress ref={progressBar} id="timeout" value="100" max="100" className="h-full w-full bg-gray-700"></progress>
            </div>
        </>
    );
};

export default Cave;
