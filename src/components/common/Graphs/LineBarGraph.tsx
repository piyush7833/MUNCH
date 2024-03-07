import { formatDate } from '@/utils/action';
import React from 'react'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, Area } from 'recharts';

type propsType={
  graphData:any,
  XLabel?:string,
  YLabel?:string
  areaColor?:string,
  lineColor?:string,
  barColor?:string,
  valueKey?:string,
  title ?:string
  subTitle?:string
}
const LineBarGraph = ({graphData,XLabel,YLabel,areaColor,lineColor,barColor,title,subTitle}:propsType) => {
  console.log(graphData,"graphData")
  console.log(XLabel,'XLabel')
  const CustomTooltip = ({active, payload, label }:any) => {
    if (active && payload && payload.length) {
      return (
        <div className=" bg-white bg-opacity-40 backdrop-blur-lg p-2">
          <p className="label">{`${XLabel || `Date`} : ${typeof label!=='string'?label.toString().split('T')[1]?formatDate(label):label:label.split('T')[1]?formatDate(label):label}`}</p>
          <p className="label">{`${YLabel || `Value`} : ${payload[0].value}`}</p>
        </div>
      );
    }
  
    return null;
  };
    return (
      <div className="w-[46%] h-fit bg-gray-200 p-4 rounded-lg">
        <h1 className='text-lg'>{title}</h1>
        <h2>{subTitle}</h2>
      <ResponsiveContainer width={"100%"} height={300}>
        <ComposedChart
          width={500}
          height={400}
          data={graphData}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
         <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="date" scale="band" label={{value:XLabel || "Date", position:'insideBottomRight'} }/>
          <YAxis dataKey={"value"} label={{ value: YLabel||'Price', angle: -90, position: 'insideLeft' }} />
          <Tooltip isAnimationActive  content={<CustomTooltip />} />
            <Area type="monotone" dataKey="value" fill={areaColor||"#8884d8" } stroke={areaColor||"#8884d8"} />
            <Bar dataKey="value" barSize={20} fill={barColor || "#413ea0"} />
            <Line type="monotone" dataKey="value" stroke={lineColor || "#ff7300"} />
        </ComposedChart>
        </ResponsiveContainer>
         </div>
      );
    
}

export default LineBarGraph
