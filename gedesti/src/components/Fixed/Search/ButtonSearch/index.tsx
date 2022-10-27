import "./style.css";

export default function ButtonTableList(props:any) {
    return (
        <button className="button-table-list">
            <span className="material-symbols-outlined">
                {props.icon}
            </span>
        </button>
    );
}