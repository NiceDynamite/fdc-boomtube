
 const timer = () => {setTimeout(Loading,250)}
export default function Loading(props) {
   
    return (
        <>
            <div>Loading{timer()}</div>
        </>
    )
}