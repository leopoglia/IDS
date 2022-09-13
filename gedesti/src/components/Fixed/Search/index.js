import "./style.css";
import ButtonTableList from "./ButtonTableList";
import Title from "./Title";

export default function Search(props) {
    return (
        <div className="search">
            <Title  nav={props.nav} title={props.title}/>
            <ButtonTableList />
        </div>
    );
}