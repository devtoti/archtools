import styles from '../styles/scales.module.scss'
import { useEffect, useState, useRef } from 'react'
import ScaleFactor from './scaleFactor'
// import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
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
  const suggScales = [
    "1/10", "1/20", "1/50", "1/100", "1/200", "1/500"
  ]
  useEffect(() => {

  }, [])

  useEffect(() => {
    let ratio = +numerator / +denominator
    let userValue2 = Number(userValue)
    let scaledResult = userValue2 * ratio
    let newValue = changeUnits(scaledResult, userUnits, scaledUnits)
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

    // console.log(value, RATIO_IN_MM)
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
        <section>
          <article>
            <label htmlFor="real-length">Distance</label>
            <input type="number" id="real-length" placeholder="user input" value={userValue} onChange={(e) => setUserValue(Number(e.target.value))} />

          </article>
          <article>

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
          </article>
        </section>
        <br></br>

        <h5 className={styles.instruction}>Pick your desired scale</h5>
        <section className={styles.grid}>
          <article>
            <label htmlFor="nominator">Scale</label>
            <input type="number" id="nominator" placeholder="real length" value={numerator} onChange={(e) => setNumerator(Number(e.target.value))} />
          </article>
          <h4>:</h4>

          <article>
            <input type="number" id="denominator" placeholder="scale length" value={denominator} onChange={(e) => setDenominator(Number(e.target.value))} />
          </article>

          <article>
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
          </article>
        </section>

              <h6>Or choose one of the scales below</h6>
          <section>
            <article className={styles.suggScales}>

              {suggScales.map((scale, ix) => <div key={ix}>{scale}</div>)}
              <hr />
            </article>
          </section>


      </div>
        <h5 className={styles.instruction}>Evaluate your results</h5>
      <div className={styles.results}>
        <h5>{`${userValue + " " + userUnits}* ${numerator} / ${denominator} =` + sameUnitsResult + " " + userUnits}</h5>
        <h2>{userValue + " " + userUnits}</h2>
        <h6>scale {numerator}:{denominator}</h6>
        <canvas></canvas>
        <article>

        <h1>
          {scaleResult.toFixed(4).toString().replace(/\B(?=(\d{3})+(?!\d))/g, "") + " " + scaledUnits}</h1>
        <h6>Result</h6>
        </article>
        {/* <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab> */}
      </div>
      <div className={styles.footer}>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <h6>brought to you by ARC</h6>
      </div>
    </div>

  )
}

