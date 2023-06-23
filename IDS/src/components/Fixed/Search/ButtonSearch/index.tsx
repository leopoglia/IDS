import "./style.css";

export default function ButtonTableList(props: any) {

    const onClick = () => {
        if (props.icon === "table_rows") {
            // Se o ícone for "table_rows", envia o estado da tabela para o componente pai (tabela aberta ou fechada)
            return props.sendData(!props.data);

        } else {
            // Se o ícone for "filter_list", envia o estado do filtro para o componente pai (filtro aberto ou fechado)
            return props.sendFilter(!props.filter);
        }
    }

    return (
        <button className={"button-table-list " + props.icon}  onClick={onClick}>
            <span className="material-symbols-outlined">
                {props.icon}
            </span>
        </button>
    );
}