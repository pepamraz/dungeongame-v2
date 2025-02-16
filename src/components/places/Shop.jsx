import React, { useState } from 'react'
import ShopImage from '../../assets/shop/shop.webp'

const Shop = ({player, setPlayer}) => {
    const [diamondUpgradePrice, setDiamondUpgradePrice] = useState(20.00*player.diamondUpgrade);
    const [energyConsumptionPrice, setEnergyConsumptionPrice] = useState(10.00);
    const foodPrice = 1.00 + player.roomCount/100;
    const potionPrice = 3.00 + (player.roomCount/100*3);
    
    const buyFood = () => {
        if(player.energy >= 100) {
            alert('Your energy is at its highest!');
        }
        else if (player.money >= foodPrice) {
            setPlayer(prevPlayer => {
                return {
                    ...prevPlayer,
                    energy: prevPlayer.energy + 30 > 100 ? 100 : prevPlayer.energy + 30,
                    money: prevPlayer.money - foodPrice,
                    moneySpent: prevPlayer.moneySpent + foodPrice
                }
            });
        } else {
            alert('Not enough money!');
        }
    }

    const buyPotion = () => {
        if(player.health >= 100) {
            alert('Your health is at its highest!');
        }
        else if (player.money >= potionPrice) {
            setPlayer(prevPlayer => {
                return {
                    ...prevPlayer,
                    health: prevPlayer.health + 30 > 100 ? 100 : prevPlayer.health + 30,
                    money: prevPlayer.money - potionPrice,
                    moneySpent: prevPlayer.moneySpent + potionPrice
                }
            });
        } else {
            alert('Not enough money!');
        }
    }

    const buyStrength = () => {
        if(player.energyConsumption <= 0) {
            alert('Your energy consumption is at its lowest!');
        }
        else if (player.money >= energyConsumptionPrice) {
            setPlayer(prevPlayer => {
                return {
                    ...prevPlayer,
                    energyConsumption: prevPlayer.energyConsumption - 1,
                    money: prevPlayer.money - energyConsumptionPrice,
                    moneySpent: prevPlayer.moneySpent + energyConsumptionPrice
                }
            });
            setEnergyConsumptionPrice(10.00*(6-player.energyConsumption));
        } else if (player.money < energyConsumptionPrice) {
            alert('Not enough money!');
        }
    }

    const buyDiamondUpgrade = () => {
        if(player.diamondUpgrade >= 7) {
            alert('Your diamond upgrade is at its highest!');
        }
        else if (player.money >= diamondUpgradePrice) {
            setPlayer(prevPlayer => {
                return {
                    ...prevPlayer,
                    diamondUpgrade: prevPlayer.diamondUpgrade + 1,
                    money: prevPlayer.money - diamondUpgradePrice,
                    moneySpent: prevPlayer.moneySpent + diamondUpgradePrice
                }
            });
            setDiamondUpgradePrice(20.00*(player.diamondUpgrade+1));
        } else if (player.money < diamondUpgradePrice) {
            alert('Not enough money!');
        }
    }

    return (
        <>
            <div id="shop" className="absolute top-0 left-0 p-2 px-4 z-10">
                <p>Shop</p>
            </div>
            <div id="game-graphics" className="h-40/48 bg-gray-500 rounded-t-lg relative overflow-hidden">
                <div className="h-full" style={{ backgroundImage: `url(${ShopImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                    <div className="w-full h-full bg-radial from-40% to-black opacity-80" />
                </div>
            </div>
            <div id="game-controls" className="h-8/48 bg-gray-700 grid grid-cols-4 p-4 gap-2 text-3xl relative">
                <button id="food" title="Buy food!" onClick={buyFood}>🍞 ${foodPrice.toFixed(2)}</button>
                <button id="health" title="Buy health!" onClick={buyPotion}>💊 ${potionPrice.toFixed(2)}</button>
                <button id="strength" title="Buy better energy consumption!" onClick={buyStrength}>💪 $10.00</button>
                <button id="diamonds" title="Buy better diamonds!" onClick={buyDiamondUpgrade}>💎 ${diamondUpgradePrice.toFixed(2)}</button>
            </div>
        </>
    );
}

export default Shop