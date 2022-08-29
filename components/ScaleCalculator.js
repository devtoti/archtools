import styles from '../styles/scales.module.scss'
import { useEffect, useState, useRef, useContext } from 'react'
import ScaleFactor from './scaleFactor'
import { ChartBarIcon, ArrowDownIcon } from '@heroicons/react/24/solid'
export default function ScaleCalculator(props) {

  const userRef = useRef()
  const scaledRef = useRef()
  const canvasRef = useRef()
  const suggScalesRef = useRef()



  const [scaledUnits, setScaledUnits] = useState('m')
  const [userUnits, setUserUnits] = useState('m')
  const [userValue, setUserValue] = useState(3)

  const [scaleResult, setScaleResult] = useState(0)
  const [numerator, setNumerator] = useState(1)
  const [denominator, setDenominator] = useState(10)
  const [simplifiedRatio, setSimplifiedRatio] = useState()

  let ratio = +numerator / +denominator
  let sameUnitsResult = userValue * ratio
  const suggScales = [
    "1:10", "1:20", "1:50", "1:100", "1:200", "1:500"
  ]


  useEffect(() => {
    let canvas = canvasRef.current
    let context = canvas.getContext('2d')
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = 'rgb(0 0 0 / 0.3';
    context.fillRect(0, 50, canvas.width - 16, 25)
    context.fillRect(0, 100, canvas.width * 1 / denominator - 16, 25)
  }, [userValue, numerator, denominator, userUnits, scaledUnits])

  useEffect(() => {
    let ratio = +numerator / +denominator
    let userValue2 = Number(userValue)
    let scaledResult = userValue2 * ratio
    let newValue = changeUnits(scaledResult, userUnits, scaledUnits)
    // console.table({ scaleResult, numerator, denominator, ratio, userValue, newValue, userUnits, scaledUnits })
    setScaleResult(newValue)
    ratioTo1(numerator, denominator)
  }, [userValue, numerator, denominator, userUnits, scaledUnits])
  
  useEffect(() => {

    suggScalesRef.current.childNodes.forEach(div => div.classList.remove('active'))
    if (suggScales.includes(simplifiedRatio)) {
      let ix = suggScales.indexOf(simplifiedRatio)
      suggScalesRef.current.childNodes[ix].classList.add('active')
      return
    }
    
  }, [simplifiedRatio])

  const changeUnits = (value, initial_unit, desired_unit) => {
    value = Number(value)
    // console.log(initial_unit, desired_unit)
    let conversions = {
      "mm": 1,
      "cm": 1e1,
      "m": 1e3,
      "km": 1e6,
      "in": 254e-1,
      "ft": 3048e-1,
      "yd": 9144e-1,
      "mi": 1.609e6,
    }

    let RATIO_IN_MM = Number(conversions[initial_unit]) / Number(conversions[desired_unit])

    // console.log(value, RATIO_IN_MM)
    let newValue = value * RATIO_IN_MM;
    return newValue
  }



  const ratioTo1 = (n, d) => {
    n = parseInt(n)
    d = parseInt(d)

    let result = {
      "n": 1 / (n / d),
      "d": 1 / (d / n),
    }
    let scaleDown = `1:${result.n.toFixed(2).replace(/(\.[0-9]*[1-9])0+$|\.0*$/, '$1')}`
    let scaleUp = `${result.d.toFixed(2).replace(/(\.[0-9]*[1-9])0+$|\.0*$/, '$1')}:1`

    if (n < d) {
      setSimplifiedRatio(scaleDown)
      return scaleDown
    }
    setSimplifiedRatio(scaleUp)
    return scaleUp
  }


  const updateRatio = (e) => {
    // e.target.parentElement.childNodes.forEach(div => div.classList.remove('active'))
    // e.target.classList.toggle('active')
    let clickedRatio = e.target.innerText.split(":")
    setNumerator(clickedRatio[0])
    setDenominator(clickedRatio[1])
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
            <input type="number" id="real-length" cplaceholder="user input" value={userValue} onChange={(e) => setUserValue(Number(e.target.value))} />

          </article>
          <article>

            <label htmlFor="initial-units">Units</label>
            <select id="initial-units" ref={userRef} onChange={() => setUserUnits(userRef.current.value)}>
              <optgroup label="International">
                <option value="mm">mm</option>
                <option value="cm">cm</option>
                <option value="m" selected>m</option>
                <option value="km">km</option>
              </optgroup>
              <optgroup label="Imperial">
                <option value="in">in</option>
                <option value="ft">ft</option>
                <option value="yd">yd</option>
                <option value="mi">mi</option>
              </optgroup>
            </select>
          </article>
        </section>
        <br></br>
        {/* <StraightenIcon /> */}
        <h5 className={styles.instruction}>Pick your desired scale</h5>
        <section className={styles.grid}>
          <article>
            <label htmlFor="nominator">Scale</label>
            <input type="number" id="nominator" min="0" placeholder="real length" value={numerator} onChange={(e) => setNumerator(Number(e.target.value))} />
          </article>
          <h4>:</h4>

          <article>
            <input type="number" id="denominator" min="0" placeholder="scale length" value={denominator} onChange={(e) => setDenominator(Number(e.target.value))} />
          </article>

          <article>
            <label htmlFor="desiredUnits">Units</label>
            <select id="desiredUnits" ref={scaledRef} onChange={() => setScaledUnits(scaledRef.current.value)}>
              <optgroup label="International">
                <option value="mm">mm</option>
                <option value="cm">cm</option>
                <option value="m" selected>m</option>
                <option value="km">km</option>
              </optgroup>
              <optgroup label="Imperial">
                <option value="in">in</option>
                <option value="ft">ft</option>
                <option value="yd">yd</option>
                <option value="mi">mi</option>
              </optgroup>
            </select>
          </article>
        </section>

        <h6>Or choose one of the scales below</h6>
        <section>
          <article className={styles.suggScales} ref={suggScalesRef}>

            {suggScales.map((scale, ix) =>
              <div key={ix} onClick={updateRatio}>
                <ChartBarIcon />
                {scale}
              </div>)}

            {/* <hr /> */}
          </article>
        </section>


      </div>
      <h5 className={styles.instruction}>Evaluate your results</h5>
      <div className={styles.res}>

        <div className={styles.results}>
          <h5>{`${userValue + " " + userUnits}* ${numerator} / ${denominator} = ` + sameUnitsResult.toFixed(2) + " " + userUnits}</h5>
          <h2>{userValue + " " + userUnits}</h2>

          <article>
            <h4> {numerator + ":" + denominator + " "}({simplifiedRatio})</h4>
            <h6>Scale</h6>
          </article>

          <article>
            <canvas ref={canvasRef} height="300"></canvas>

            <ArrowDownIcon />
            <h1>
              {scaleResult.toFixed(4).toString().replace(/\B(?=(\d{3})+(?!\d))/g, "") + " " + scaledUnits}</h1>
            <h6>Result</h6>
          </article>
          {/* <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab> */}
        </div>
        <div className={styles.footer}>
          <div className={styles.footer__icons}>

            <p></p>
            <p></p>
            <p></p>
            <p></p>
          </div>
          <h6>brought to you by ARC</h6>
        </div>
      </div>
    </div>

  )
}

