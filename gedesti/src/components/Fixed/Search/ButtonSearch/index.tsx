import "./style.css";

export default function ButtonTableList(props: any) {

    const onClick = () => {
        props.sendData(!props.data);
    }


    return (

        <button className="button-table-list" onClick={onClick}>
            <span className="material-symbols-outlined">
                {props.icon}
            </span>
        </button>
    );
}