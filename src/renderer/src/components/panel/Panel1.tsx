import { useState } from 'react'
import { GaugeComponent } from 'react-gauge-component'

const CustomGauge = (): JSX.Element => {
  const [value, setValue] = useState<number>(4) // Initial value
  const [minValue, setMinValue] = useState<number>(0) // Minimum value
  const [maxValue, setMaxValue] = useState<number>(30) // Maximum value
  const step: number = 1 // Numerical changes (one by one)

  // Function to generate dynamic subArcs
  const generateSubArcs = (): { limit: number }[] => {
    const range: number = maxValue - minValue
    const stepSize: number = range / 5 // Divide the range into 5 parts
    const subArcs: { limit: number }[] = []
    for (let i = 1; i <= 5; i++) {
      subArcs.push({ limit: minValue + stepSize * i })
    }
    return subArcs
  }

  // Function to generate dynamic ticks with a condition for ranges 0-30 and greater than 30
  const generateTicks = (): { value: number }[] => {
    const ticks: { value: number }[] = []
    const tickStep: number = maxValue < 30 ? 1 : 2 // If the range is small (<=30), display one by one, otherwise two by two
    for (let i = minValue; i <= maxValue; i += tickStep) {
      ticks.push({ value: i })
    }
    return ticks
  }

  return (
    <div className="w-full p-4 flex flex-col items-center">
      <h2 className="font-semibold mb-4">Dynamic Gauge</h2>

      {/* Gauge */}
      <div className="w-[450px] h-[250px] relative">
        <GaugeComponent
          value={value} // Dynamic value
          type="radial" // Gauge type (radial)
          arc={{
            colorArray: ['#FF5F6D', '#FFC371', '#FFEA00', '#00C851', '#007E33'], // Gradient colors
            padding: 0.02, // Padding between sections
            width: 0.2, // Gauge thickness
            subArcs: generateSubArcs() // Dynamic subArcs
          }}
          pointer={{
            type: 'needle', // Pointer type (needle for a classic look)
            color: '#464A4F', // Pointer color
            length: 0.5, // Pointer length (larger)
            width: 15, // Pointer width (larger)
            elastic: false // Disable pointer elasticity
          }}
          labels={{
            valueLabel: {
              formatTextValue: (value: number) => `${value}`, // Display numerical value (without percentage)
              style: { fill: '#000000', fontSize: '24px', fontWeight: 'bold' } // Style for the numerical value
            },
            tickLabels: {
              type: 'inner', // Display numbers inside the gauge
              defaultTickValueConfig: {
                formatTextValue: (value: number) => `${value}`, // Format numbers
                style: { fontSize: '14px', fill: '#000' } // Style for numbers
              },
              ticks: generateTicks() // Dynamic ticks with range condition
            }
          }}
          minValue={minValue} // Minimum value
          maxValue={maxValue} // Maximum value
        />
      </div>
    </div>
  )
}

export default CustomGauge
