function Badge({ label, color = "gray" }) {
    return (
        <button
            style={{
                backgroundColor: color,
                color: "white",
                padding: "10px",
                border: "none",
                margin: "5px"
            }}
        >
            {label}
        </button>
    );
}



export default function Default() {
    return (    

    <div>        
<Badge label="Default Color" />            
<Badge label="Custom Color
" color="purple" />        </div>    );}