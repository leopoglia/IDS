import "./style.css"

export default function Input(props) {

    return (
        <div className="input">
            <label>{props.label} {props.required}</label>
            <input></input>
        </div>
    );
}