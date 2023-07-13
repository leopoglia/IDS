import "./style.css";

export default function ButtonTableList(props: any) {

    const onClick = () => {
        if (props.icon === "table_rows") {
            // Se o ícone for "table_rows", envia o estado da tabela para o componente pai (tabela aberta ou fechada)
            return props.sendData(!props.data);

        } else if (props.icon === "filter_list") {
            // Se o ícone for "filter_list", envia o estado do filtro para o componente pai (filtro aberto ou fechado)
            return props.sendFilter(!props.filter);
        } else if (props.icon === "calendar_month") {
            // Se o ícone for "search", envia o estado do filtro para o componente pai (filtro aberto ou fechado)
            return props?.setCalendar(!props.calendar);
        } else {
            return props.sendFilter(!props.filter);
        }
    }

    return (
        <button className={"button-table-list " + props.icon} onClick={onClick}>
            <span className="material-symbols-outlined">
                {props.icon}
            </span>
        </button>
    );
}