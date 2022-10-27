import "./style.css"

export default function TextArea(props: {
    label: string;
    required: string;
}) {

    return (
        <div className="text-area">
            <label>{props.label} {props.required}</label>
            <textarea />
        </div>
    );
}