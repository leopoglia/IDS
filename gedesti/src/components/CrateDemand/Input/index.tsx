import "./style.css"

export default function Input(props: {
    label: string;
    required: string;
}) {

    return (
        <div className="input">
            <label>{props.label} {props.required}</label>
            <input type="text" />
        </div>
    );
}