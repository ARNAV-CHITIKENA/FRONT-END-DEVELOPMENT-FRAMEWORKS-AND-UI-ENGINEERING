function Badge(props) {
    return (
        <h2>
            {props.label}
        </h2>
    );
}

export default function Childrenprop() {
    return (
        <div>
            <Badge label="React" />
            <Badge label="JavaScript" />
        </div>
    );
}