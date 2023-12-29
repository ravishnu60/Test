import React from 'react';
import { Scatter } from 'react-chartjs-2';
import annotationPlugin from 'chartjs-plugin-annotation';
import { Chart } from 'chart.js';

Chart.register(annotationPlugin);

const Test3 = () => {

  const samData = {
    title: "Report chart",
    value: { x: 30, y: 45 },
    xTitle: "X label",
    yTitle: "Y label",
    quadrantText: [
      {
        title: "Quadrant1",
        desc: "Quad1 Description "
      },
      {
        title: "Quadrant2",
        desc: "Quad2 Description"
      },
      {
        title: "Quadrant3",
        desc: "Quad3 Description",
      },
      {
        title: "Quadrant4",
        desc: "Quad4 Description"
      }
    ]
  }

  const data = {
    datasets: [
      {
        backgroundColor: 'blue',
        pointRadius: 10,
        pointHoverRadius: 10,
        data: [samData.value],
      },
    ],

  };

  const axesoptions = (type) => {
    return (
      {
        min: 0,
        max: 100,
        title: {
          display: true,
          text: samData[`${type}Title`],
          font: {
            size: 15,
            weight: 'bold'
          },
          color: 'blue'
        },
        ticks: {
          stepSize: 50,
          display: true,
          callback: function (value, index) {
            // Hide every 2nd tick label
            return [0, 50].includes(value) ? type === 'x' && value === 0 ? 'Low' : '' : 'High';
          },
          color: 'black',
          font: {
            size: 15
          }
        },
        grid: {
          lineWidth: 2,
        }
      }
    )
  }

  const quadrantText = () => {
    let axes = [
      { xMin: 10, xMax: 40, yMin: 5, yMax: 10, }, //quadrant1
      { xMin: 60, xMax: 90, yMin: 5, yMax: 10, }, //quadrant2
      { xMin: 10, xMax: 40, yMin: 70, yMax: 95, }, //quadrant3
      { xMin: 60, xMax: 90, yMin: 70, yMax: 95, }, //quadrant4
    ]

    let data = {}
    samData['quadrantText'].forEach((ele, index) => {
      data[`label${index + 1}`] = {
        type: 'label',
        ...axes[index],
        position: { x: 'center', y: 'end' },
        borderWidth: 1,
        borderColor: 'blue',
        content: [ele?.title, ele?.desc],
        font: {
          size: 15
        }
      }
    })
    return data;
  }
  // Configuration for the chart
  const options = {
    scales: {
      x: axesoptions('x'),
      y: axesoptions('y'),
    },
    plugins: {
      title: {
        display: true,
        text: samData?.title,
        color: 'red',
        font: {
          size: 15
        }
      },
      legend: false,
      tooltip: {
        displayColors: false,
        callbacks: {
          title: function (title) { return `${samData.xTitle} : ${title[0]?.raw?.x}` },
          afterTitle: function (title) { return `${samData.xTitle} : ${title[0]?.raw?.y}` },
          label: function (label) { return "" }
        }
      },
      annotation: {
        annotations: {
          ...quadrantText()
        }
      },
      quadrants: {
        topLeft: '#8cffde',
        topRight: '#70ffd6',
        bottomRight: '#8cffde',
        bottomLeft: '#cffff1',
      },
      chartAreaBorder: {
        borderColor: 'black',
      }
    }
  };

  //custom plugins for craph layour border and quadrants color
  const chartAreaBorder = {
    id: 'chartAreaBorder',
    beforeDraw(chart, args, options) {
      const { ctx, chartArea: { left, top, width, height, right, bottom } } = chart;
      ctx.save();
      ctx.strokeStyle = options.borderColor;
      ctx.lineWidth = options.borderWidth;
      ctx.setLineDash(options.borderDash || []);
      ctx.lineDashOffset = options.borderDashOffset;
      ctx.strokeRect(left, top, width, height);
      ctx.restore();
    },
  };

  const quadrants = {
    id: 'quadrants',
    beforeDraw(chart, args, options) {
      const { ctx, chartArea: { left, top, right, bottom }, scales: { x, y } } = chart;
      const midX = x.getPixelForValue(50);
      const midY = y.getPixelForValue(50);
      ctx.save();
      ctx.fillStyle = options.topLeft;
      ctx.fillRect(left, top, midX - left, midY - top);
      ctx.fillStyle = options.topRight;
      ctx.fillRect(midX, top, right - midX, midY - top);
      ctx.fillStyle = options.bottomRight;
      ctx.fillRect(midX, midY, right - midX, bottom - midY);
      ctx.fillStyle = options.bottomLeft;
      ctx.fillRect(left, midY, midX - left, bottom - midY);
      ctx.restore();
    }
  };

  return (
    <div>
      <Scatter data={data} options={options} plugins={[chartAreaBorder, quadrants]} />
    </div >
  );
};

export default Test3;
