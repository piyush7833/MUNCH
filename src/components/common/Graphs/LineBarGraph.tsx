import React, { useState } from 'react';
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
import { formatDate } from '@/utils/action';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, Area } from 'recharts';

type PropsType = {
  graphData: any[],
  XLabel?: string,
  YLabel?: string,
  areaColor?: string,
  lineColor?: string,
  barColor?: string,
  valueKey?: string,
  title?: string,
  subTitle?: string,
};

const LineBarGraph = ({ graphData, XLabel, YLabel, areaColor, lineColor, barColor, title, subTitle, valueKey }: PropsType) => {
  const [dateRange, setDateRange] = useState<{ startDate: Date, endDate: Date }>({
    startDate: new Date("2024-01-01"),
    endDate: new Date(),
  });

  const handleDateChange = (newValue: DateValueType) => {
    if (newValue!.startDate && newValue!.endDate) {
      setDateRange({ startDate: new Date(newValue!.startDate), endDate: new Date(newValue!.endDate) });
    }
  };
  console.log(graphData, "graphData")
  const filteredGraphData = graphData.filter(data => {
    const date = new Date(data.date); // Assuming the key for date in graphData is 'date'
    return date >= dateRange.startDate && date <= dateRange.endDate;
  });

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className=" bg-white bg-opacity-40 dark:bg-opacity-10 backdrop-blur-lg p-2">
          <p className="label">{`${XLabel || `Date`} : ${typeof label !== 'string' ? label.toString().split('T')[1] ? formatDate(label) : label : label.split('T')[1] ? formatDate(label) : label}`}</p>
          <p className="label">{`${YLabel || `Value`} : ${payload[0].value}`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="w-[46%] h-fit bg-gray-200 dark:bg-slate-600 p-4 rounded-lg">
      <div className="flex items-center justify-end">
        <div className="flex flex-col w-[60%]">
          <h1 className='text-lg'>{title}</h1>
          <h2>{subTitle}</h2>
        </div>
        <div className="w-[40%]">
          <Datepicker
            value={dateRange as DateValueType}
            onChange={handleDateChange}
            showShortcuts={true}
            separator={"->"}
            displayFormat={"DD/MM/YYYY"}
            toggleClassName={'text-main absolute right-2 disabled:opacity-40 disabled:cursor-not-allowed top-0 bottom-0'}
            minDate={new Date("2024-01-01")}
            maxDate={new Date()}
            primaryColor={"orange"}

          />
        </div>
      </div>
      <ResponsiveContainer width={"100%"} height={300}>
        <ComposedChart
          width={500}
          height={400}
          data={filteredGraphData}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey={XLabel || "date"} scale="band" label={{ value: XLabel || "Date", position: 'insideBottomRight' }} />
          <YAxis dataKey={valueKey || "value"} label={{ value: YLabel || 'Price', angle: -90, position: 'insideLeft' }} />
          <Tooltip isAnimationActive content={<CustomTooltip />} />
          <Area type="monotone" dataKey={valueKey || "value"} fill={areaColor || "#8884d8"} stroke={areaColor || "#8884d8"} />
          <Bar dataKey={valueKey || "value"} barSize={20} fill={barColor || "#413ea0"} />
          <Line type="monotone" dataKey={valueKey || "value"} stroke={lineColor || "#ff7300"} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineBarGraph;
