import React, { useEffect, useRef, useState } from 'react';

const Cave = ({ player, setPlayer }) => {
    const [isActionPending, setIsActionPending] = useState(false);
    const progressBar = useRef(null);
    const [caveImage, setCaveImage] = useState(1);

    const maximumZombieSkins = 4;
    const [zombieSkin, setZombieSkin] = useState(1);

    const randomRoomType = (filterOutCurrentType = true) => {
        let roomTypes = ['zombie', 'diamond', 'empty'];
        if (filterOutCurrentType) {
            roomTypes = roomTypes.filter(type => type !== player.roomType);
        }

        const randomRoomType = roomTypes[Math.floor(Math.random() * roomTypes.length)];

        if (randomRoomType === 'zombie') {
            setZombieSkin(prevSkin => {
                let newSkin = Math.floor(Math.random() * maximumZombieSkins) + 1;
                while (newSkin === prevSkin) {
                    newSkin = Math.floor(Math.random() * maximumZombieSkins) + 1;
                }
                return newSkin;
            });
        }

        return randomRoomType;
    };

    useEffect(() => {
        if (player.energy <= 0 || player.health <= 0) {
            alert('Game over!');
            setPlayer(prev => ({...prev,
                health: 50,
                energy: 90,
                money: 0.50,
                roomCount: 0,
                roomType: randomRoomType(false),
                energyConsumption: 5,
                diamondUpgrade: 1,
                diamondsPickedUp: 0,
                moneyMade: 0,
                moneySpent: 0,
                zombiesKilled: 0,
            }));
        }
    }, [player, setPlayer]);

    useEffect(() => {
        let newCaveImage;
        if (player.roomCount > 500) {
            newCaveImage = 8;
        } else if (player.roomCount > 400) {
            newCaveImage = 7;
        } else if (player.roomCount > 300) {
            newCaveImage = 6;
        } else if (player.roomCount > 200) {
            newCaveImage = 5;
        } else if (player.roomCount > 100) {
            newCaveImage = 4;
        } else if (player.roomCount > 50) {
            newCaveImage = 3;
        } else if (player.roomCount > 25) {
            newCaveImage = 2;
        } else {
            newCaveImage = 1;
        }
        setCaveImage(newCaveImage);
    }, [player.roomCount]);

    const nextRoom = () => {
        setPlayer(prev => ({
            ...prev,
            roomCount: prev.roomCount + 1,
            roomType: randomRoomType()
        }));
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
            if (player.roomType === 'zombie') {
                const zombieMoney = Math.random() * 0.1 * player.diamondUpgrade + player.roomCount / 500;
                setPlayer(prev => ({ ...prev, 
                    energy: prev.energy - player.energyConsumption, 
                    money: prev.money + zombieMoney, 
                    moneyMade: prev.moneyMade + zombieMoney,
                    zombiesKilled: prev.zombiesKilled + 1 }));
                nextRoom();
            } else {
                setPlayer(prev => ({ ...prev, energy: prev.energy - player.energyConsumption * 2 }));
            }
        });
    };

    const pickUp = () => {
        performActionWithDelay(() => {
            if (player.roomType === 'zombie') {
                setPlayer(prev => ({ ...prev, energy: prev.energy - player.energyConsumption * 2, health: prev.health - 10 }));
            } else if (player.roomType === 'diamond') {
                const minimumMoneyEarned = 0.01 + player.diamondUpgrade - 1;
                const maximumMoneyEarned = 1.00 * Math.pow(2, (player.diamondUpgrade - 1)) + player.roomCount / 200;
                const moneyEarned = Number((Math.random() * (maximumMoneyEarned - minimumMoneyEarned) + minimumMoneyEarned).toFixed(2));
                setPlayer(prev => ({ ...prev, money: prev.money + moneyEarned, diamondsPickedUp: prev.diamondsPickedUp + 1, moneyMade: prev.moneyMade + moneyEarned }));
                nextRoom();
            } else {
                setPlayer(prev => ({ ...prev, energy: prev.energy - player.energyConsumption }));
                nextRoom();
            }
        });
    };

    const walk = () => {
        performActionWithDelay(() => {
            if (player.roomType === 'zombie') {
                setPlayer(prev => ({ ...prev, energy: prev.energy - player.energyConsumption * 2, health: prev.health - 10 }));
            } else {
                setPlayer(prev => ({ ...prev, energy: prev.energy - player.energyConsumption }));
                nextRoom();
            }
        });
    };

    return (
        <>
            <div id="roomCount" className="absolute top-0 left-0 p-2 px-4 z-10">
                <p>Cave: #{player.roomCount}</p>
            </div>
            <div id="game-graphics" className="h-39/48 bg-gray-500 rounded-t-lg relative overflow-hidden">
                <div className="h-full" style={{ backgroundImage: `url(/src/assets/caves/cave-${caveImage}.webp)`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                    <div className="w-full h-full bg-radial from-40% to-black opacity-80" />
                </div>
                {player.roomType === 'zombie' && (
                    <img src={`/src/assets/zombies/zombie-${zombieSkin}.webp`} alt="zombie" className="max-h-4/5 drop-shadow-[0_30px_60px_rgba(0,0,0,0.75)] absolute bottom-[-15px] left-1/2 transform -translate-x-1/2" />
                )}
                {player.roomType === 'diamond' && (
                    <img src={`/src/assets/diamonds/diamond-${player.diamondUpgrade}.webp`} alt="diamond" className="max-h-2/5 drop-shadow-[0_30px_60px_rgba(0,0,0,0.75)] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
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
