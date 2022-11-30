import "./style.css"
import { useTranslation } from "react-i18next";

export default function Situation(props: any) {

    const { t, i18n } = useTranslation();

    const situation = () => {
        if (props.situation === "Backlog") {
            return (<div className="situation-backlog" />);
        } else if (props.situation === "Assesment") {
            return (<div className="situation-assesment" />);
        } else if (props.situation === "Business Case") {
            return (<div className="situation-business-case" />);
        } else if (props.situation === "To-do") {
            return (<div className="situation-to-do" />);
        } else if (props.situation === "Design and Build") {
            return (<div className="situation-design-and-build" />);
        } else if (props.situation === "Cancelled") {
            return (<div className="situation-cancelled">{t("canceled")}</div>);
        } else if (props.situation === "Support") {
            return (<div className="situation-support">{t("support")}</div>);
        } else if (props.situation === "Done") {
            return (<div className="situation-done" />);
        }
    }

    return (
        <div className="graphic">
            {situation()}
        </div>
    );
}