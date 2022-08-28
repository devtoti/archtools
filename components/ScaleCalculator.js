import styles from '../styles/scales.module.scss'
import { useEffect, useState, useRef } from 'react'
import ScaleFactor from './scaleFactor'

export default function ScaleCalculator(props) {

  const userRef = useRef()
  const scaledRef = useRef()



  const [scaledUnits, setScaledUnits] = useState('m')
  const [userUnits, setUserUnits] = useState('km')
  const [userValue, setUserValue] = useState(37)

  const [scaleResult, setScaleResult] = useState(0)
  const [numerator, setNumerator] = useState(1)
  const [denominator, setDenominator] = useState(125)
  const [simplifiedRatio, setSimplifiedRatio] = useState({ n: 0, d: 0 })

  let ratio = +numerator / +denominator
  let sameUnitsResult = userValue * ratio

  useEffect(() => {

  }, [])

  useEffect(() => {
    let ratio = +numerator / +denominator
    let userValue2 = Number(userValue)
    console.log(userValue2)
    let scaledResult = userValue2 * ratio
    // scaledResult = Number(scaledResult.toFixed(4))

    // console.log(newUnit)

    let newValue = changeUnits(scaledResult, userUnits, scaledUnits)
    // console.log(newUnit)
    console.table({ scaleResult, numerator, denominator, ratio, userValue, newValue, userUnits, scaledUnits })
    setScaleResult(newValue)
  }, [userValue, numerator, denominator, userUnits, scaledUnits])


  const changeUnits = (value, initial_unit, desired_unit) => {
    value = Number(value)
    console.log(initial_unit, desired_unit)
    let conversions = {
      "mm": 1,
      "cm": 1e1,
      "m": 1e3,
      "km": 1e6,
    }

    let RATIO_IN_MM = Number(conversions[initial_unit]) / Number(conversions[desired_unit])

    console.log(value, RATIO_IN_MM)
    let newValue = value * RATIO_IN_MM;
    return newValue
  }



  const ratioTo1 = (n, d) => {
    n = parseInt(n)
    d = parseInt(d)
    let result = {};
    result = {
      "n": (n * 1) / n,
      "d": (d * 1) / n
    }
    // setSimplifiedRatio(result)
    return result

  }



  return (

    <div className={styles.container}>
      <div className={styles.header}>
        <h3><span>Scale</span> Converter</h3>
        <h4>Instant, minimal, efficient scale conversions.</h4>
        <hr></hr>
      </div>
      <div className={styles.body}>
        <h5 className={styles.instruction}>Specify distance to be converted</h5>
      <label htmlFor="real-length">Distance</label>
      <input type="number" id="real-length" placeholder="user input" value={userValue} onChange={(e) => setUserValue(Number(e.target.value))} />

      <label htmlFor="initial-units">Units</label>
      <select id="initial-units" ref={userRef} onChange={() => setUserUnits(userRef.current.value)}>
        <optgroup label="International">
          <option value="mm">milimeters</option>
          <option value="cm">centimeters</option>
          <option value="m" selected>meters</option>
          <option value="km">kilometers</option>
        </optgroup>
        <optgroup label="Imperial">
          <option value="in">inches</option>
          <option value="ft">feet</option>
          <option value="yd">yards</option>
          <option value="mi">miles</option>
        </optgroup>
      </select>
      <br></br>
        <h5 className={styles.instruction}>Pick your desired scale</h5>
      <div className={styles.inputs__scales} onChange={() => ratioTo1(numerator, denominator)}>
        <input type="number" id="real-length" placeholder="real length" value={numerator} onChange={(e) => setNumerator(Number(e.target.value))} />
        <h4>:</h4>
        <input type="number" id="scale-length" placeholder="scale length" value={denominator} onChange={(e) => setDenominator(Number(e.target.value))} />
        <label htmlFor="desiredUnits">Units</label>
        <select id="desiredUnits" ref={scaledRef} onChange={() => setScaledUnits(scaledRef.current.value)}>
          <optgroup label="International">
            <option value="mm">milimeters</option>
            <option value="cm">centimeters</option>
            <option value="m" selected>meters</option>
            <option value="km">kilometers</option>
          </optgroup>
          <optgroup label="Imperial">
            <option value="in">inches</option>
            <option value="ft">feet</option>
            <option value="yd">yards</option>
            <option value="mi">miles</option>
          </optgroup>
        </select>
      </div>
      </div>
      <div className={styles.results}>
  
        <h3>{`${userValue + " " + userUnits}* ${numerator} / ${denominator} =` + sameUnitsResult + " " + userUnits}</h3>

        <h4>scale {numerator}:{denominator}</h4>
      </div>
      <h1>
        {scaleResult.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + scaledUnits}</h1>
    </div>
  )
}

