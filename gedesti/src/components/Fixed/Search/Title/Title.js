import "./Title.css"

export default function Title(props) {
    return (
        <div className="Title">
            <span>{props.nav}</span>
            <h1>{props.title}</h1>
        </div>
    );
}