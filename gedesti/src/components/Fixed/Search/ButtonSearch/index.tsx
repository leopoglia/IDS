import "./style.css";

export default function ButtonTableList(props: any) {

    const onClick = () => {

        if (props.icon === "table_rows") {
            return props.sendData(!props.data);

        } else {
            return props.sendFilter(!props.filter);
        }
    }


    return (

        <button className="button-table-list" onClick={onClick}>
            <span className="material-symbols-outlined">
                {props.icon}
            </span>
        </button>
    );
}