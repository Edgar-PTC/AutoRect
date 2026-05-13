// src/components/Recharts/GraphicLine.jsx
import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const GraphicLine = ({ data, dataKey1 = "value1", dataKey2 = "value2", color1, color2 }) => {
  // Validar que haya datos
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full min-h-400px bg-gray-900 rounded-lg">
        <p className="text-gray-400">No hay datos disponibles</p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
        <XAxis 
          dataKey="name" 
          stroke="#888" 
          tick={{ fill: "#888" }}
        />
        <YAxis 
          stroke="#888" 
          tick={{ fill: "#888" }}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: "#1f1f1f", 
            border: "1px solid #444",
            borderRadius: "8px",
            color: "#fff"
          }}
          labelStyle={{ color: "#fff" }}
        />
        <Legend 
          wrapperStyle={{ color: "#888" }}
        />
        <Line 
          type="monotone" 
          dataKey={dataKey1} 
          stroke={color1} 
          strokeWidth={2}
          dot={{ fill: color1, r: 4 }}
          activeDot={{ r: 6 }}
        />
        <Line 
          type="monotone" 
          dataKey={dataKey2} 
          stroke={color2} 
          strokeWidth={2}
          dot={{ fill: color2, r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default GraphicLine;