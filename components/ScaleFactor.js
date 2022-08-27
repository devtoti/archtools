
// export async function getStaticProps(context) {
//     return {
//         props: {},
//     }
// }

export default function ScaleFactor(props) {
    const {setRealLength, setScaledLength, realLength, scaledLength} = props
    console.log(realLength)
    return (
        <div>
            <h1>SCALE FACTOR</h1>
            <h2>sjdja</h2>
            <p>
                {realLength} : {scaledLength}
            </p>
            <input type="number" placeholder="real length" value={realLength} onChange={(e) => setRealLength(e.target.value)} />
            <input type="number" value={scaledLength} onChange={(e) => setScaledLength(e.target.value)}/>
            <h4>what</h4>
        </div>
    )

}
