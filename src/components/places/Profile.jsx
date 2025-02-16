import React from 'react'
import ProfileImage from '../../assets/player-avatar-head.webp'

const Profile = ({ player, setPlayer }) => {
    const ChangeName = () => {
        const newName = prompt('Enter your new name:');
        if (newName) {
            if (newName.length < 3) {
                alert('Name must be at least 3 characters long!');
                return;
            }
            else if (newName.length > 15) {
                alert('Name must be at most 15 characters long!');
                return;
            }
            else if (newName === player.name) {
                alert('Name is the same!');
                return;
            }
            else if (!/^[a-zA-Z0-9]*$/.test(newName)) {
                alert('Name must contain only letters and numbers!');
                return;
            }
            else {
                let fixedName = newName.replace(/</g, "&lt;").replace(/>/g, "&gt;");
                fixedName = fixedName.replace(/[^a-zA-Z0-9]/g, '');
                fixedName = fixedName.substring(0, 15);
                fixedName = fixedName.trim();
                fixedName = fixedName.charAt(0).toUpperCase() + fixedName.slice(1);
                setPlayer(prevPlayer => {
                    return {
                        ...prevPlayer,
                        name: fixedName
                    }
                });
            }
        }
    }

    return (
        <>
            <div id="profile" className="absolute top-0 left-0 p-2 px-4 z-10">
                <p>Profile info</p>
            </div>
            <div id="game-graphics" className="flex justify-center h-full bg-gray-500 rounded-t-lg relative overflow-hidden">
                <div className="w-96 text-center">
                    <img src={ProfileImage} alt="Player profile avatar" width={200} className='rounded-full mx-auto mt-4 drop-shadow-2xl' />
                    <h1 className='flex justify-center mt-4'>{player.name}&nbsp;
                        <svg onClick={ChangeName} className='text-white w-8 fill-gray-300 cursor-pointer' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152L0 424c0 48.6 39.4 88 88 88l272 0c48.6 0 88-39.4 88-88l0-112c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 112c0 22.1-17.9 40-40 40L88 464c-22.1 0-40-17.9-40-40l0-272c0-22.1 17.9-40 40-40l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24L88 64z" />
                            </svg>
                        </h1>
                    <div className="text-left mt-4">
                        {[
                            { label: 'Health', value: player.health + "% ❤️" },
                            { label: 'Energy', value: player.energy + "% ⚡" },
                            { label: 'Money', value: "$" + player.money.toFixed(2) },
                            { label: 'Energy Consumption', value: player.energyConsumption + "⚡" },
                            { label: 'Diamond Upgrade', value: player.diamondUpgrade + "💎" },
                            { label: 'Cave Room Count', value: `#${player.roomCount}` },
                            { label: 'Cave Room Type', value: player.roomType },
                            { label: 'Diamonds Picked Up', value: player.diamondsPickedUp + "💎" },
                            { label: 'Money Made', value: "$" + player.moneyMade.toFixed(2) },
                            { label: 'Money Spent', value: "$" + player.moneySpent.toFixed(2) },
                            { label: 'Zombies Killed', value: player.zombiesKilled + "🩸" },
                        ].map((item, index) => (
                            <div key={index} className={`flex justify-between ${index % 2 === 1 ? 'bg-gray-300 text-black' : 'bg-transparent'} p-1 px-3`}>
                                <p><strong>{item.label}:</strong></p>
                                <p>{item.value}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile