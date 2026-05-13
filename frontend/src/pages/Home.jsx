import { React, useState, useEffect } from "react";
import GraphicLine from "../components/Recharts/GraphicLine";

function Home() {
    const chartData = [
        { name: "Ene", ventas: 4000, usuarios: 2400 },
        { name: "Feb", ventas: 3000, usuarios: 1398 },
        { name: "Mar", ventas: 2000, usuarios: 9800 },
        { name: "Abr", ventas: 2780, usuarios: 3908 },
        { name: "May", ventas: 1890, usuarios: 4800 },
        { name: "Jun", ventas: 2390, usuarios: 3800 },
        { name: "Jul", ventas: 3490, usuarios: 4300 },
    ];
    
    return(
        <main className="p-4 w-screen max-h-screen flex flex-col gap-3">
             <div className="h-15 items-center p-4 w-full flex flex-row justify-between bg-red-600/50 rounded-xl">
                <h2 className="text-xl text-white font-bold">Bienvenido</h2>
                <div></div>
             </div>
             <div>
                <div></div>
                <div className="h-70 w-full">
                    <GraphicLine 
                        data={chartData}
                        dataKey1="ventas"
                        dataKey2="usuarios"
                        color1="#ef4333"
                        color2="#3b82f6"
                    />
                </div>
             </div>
        </main>
    )
}

export default Home;