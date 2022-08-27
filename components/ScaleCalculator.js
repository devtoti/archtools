import styles from '../styles/scales.module.scss'
import { useEffect, useState, useRef } from 'react'
import ScaleFactor from './scaleFactor'


// export async function getStaticProps(context) {
//   return {
//     props: {}, // will be passed to the page component as props
//   }
// }


export default function ScaleCalculator(props) {

  const userRef = useRef()
  const scaledRef = useRef()

  const [scaledUnits, setScaledUnits] = useState('cm')


  const [userUnits, setUserUnits] = useState('m')
  const [userValue, setUserValue] = useState(6)
  const [numerator, setNumerator] = useState(3)
  const [denominator, setDenominator] = useState(12)
  const [scaleResult, setScaleResult] = useState(0)


  let ratio = numerator / denominator


  useEffect(() => {
    let result = userValue * ratio
    result = Number(result.toFixed(4))
    setScaleResult(result)
  }, [userValue, numerator, denominator])

  // const changeUnits = (val, un) => {
  //   let un = {
  //     "mm": 1,
  //     "cm": 1e-1,
  //     "m": 1e-3,
  //     "km": 1e-6,
  //   }
  // }

  // let newUnits = getEquivalence(scaleResult, scaledUnits)


  const ratioTo1 = (n, d) => {
    n = parseInt(n)
    d = parseInt(d)
    let result = {};
    // console.log(Number(n * (1 / n).toFixed(2)))
    // if (n < d) result = Number(n * (1 / n).toFixed(2)) + ":" + Number(d * (1 / n).toFixed(2))
    // if (n < d) {
      result = {
        "n":(n * 1) / n,
        "d": (d * 1) / n
      }
    
      console.log(result)
    // if (n < d) result = n * (1 / n) + ":" + d * (1 / n)
    // if (n > d) result = (n * (1 / d) + ":" + d * (1 / d))
    // return Number(result.toFixed(2))
    // return result
  }


  // const scaleNumb = (value, n1, n2) => {
  //   value = parseInt(value)
  //   n1 = parseInt(n1)
  //   n2 = parseInt(n2)
  //   let result = value * (n1 / n2)
  //   result = Number(result.toFixed(4))
  //   setScaleResult(result)
  //   return result
  // }


  // let proof = scaleNumb(userValue, numerator, denominator)

  const simplifiedScale = (val, numer, denom) => {
    let result;
    if (numer > denom) {
      let n = 1 / numer
      result = (numer * n) + ":" + (denom * n);
      return result
    }
    else if (denom > numer && numer / denom !== 1) {
      result = (numer * (1 / val)) / (denom * (1 / val))
    }
    return result
  }



  return (

    <div className={styles.container}>
      <h1>SCALE CALC</h1>
      <label htmlFor="user">Distance</label>
      <input type="number" id="user" placeholder="user input" value={userValue} onChange={(e) => setUserValue(e.target.value)} />
      {/* <select id="units" ref={userRef} onChange={() => setUserUnits(userRef.current)}> */}
      <select id="units" ref={userRef} onChange={() => setUserUnits(userRef.current.value)}>
        <option value="mm">milimeters</option>
        <option value="cm">centimeters</option>
        <option value="m">meters</option>
        <option value="km">kilometers</option>
      </select>
      <br></br>
      <div className={styles.inputs__scales}>

        <input type="number" id="real-length" placeholder="real length" value={numerator} onChange={(e) => setNumerator(e.target.value)} />
        <h4>:</h4>
        <input type="number" id="scale-length" placeholder="scale length" value={denominator} onChange={(e) => setDenominator(e.target.value)} />
        {/* <label htmlFor="units2">Units</label>
        <select id="units" ref={scaledRef} onChange={() => setScaledUnits(scaledRef.current.value)}>
          <option value="mm">milimeters</option>
          <option value="cm">centimeters</option>
          <option value="m">meters</option>
          <option value="km">kilometers</option>
        </select> */}
      </div>
      <div className="results">

        <h3>{`${userValue} * ${numerator} / ${denominator} =` + scaleResult + userUnits}</h3>

        {/* <h6>{getEquivalence(scaleNumb(userValue, numerator, denominator), userUnits, ratio, scaledUnits)}</h6>
 */}


        <h4>scale {numerator}:{denominator} ({ratioTo1(numerator, denominator)})</h4>

      </div>
      <h6>{scaleResult}</h6>
    </div>
  )
}

