import "./style.css"

export default function TextArea(props) {

    return (
        <div className="text-area">
            <label>{props.label} {props.required}</label>
            <textarea />
        </div>
    );
}