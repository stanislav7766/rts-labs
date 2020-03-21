import React from 'react';
import {ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import './Plot.css';

const Plot = ({dots}) => (
  <div className="plot">
    <ResponsiveContainer>
      <LineChart data={dots}>
        <CartesianGrid strokeDasharray="2 2" />
        <XAxis tick={{fill: 'white'}} dataKey="name" />
        <YAxis tick={{fill: 'white'}} />
        <Tooltip />
        <Legend />

        <Line type="monotone" dataKey="value" dot={false} stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default Plot;
