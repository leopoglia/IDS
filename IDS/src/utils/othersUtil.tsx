import AgendaService from "../services/agendaService";
import DemandService from "../services/demandService";
import ProposalService from "../services/proposalService";
import MinuteService from "../services/minuteService";


const othersUtil = {


    // Função para mostrar o navigator
    synthesis: (text: string, reader: boolean) => {

        if (reader === true) {
            const synth = window.speechSynthesis;
            const utterThis = new SpeechSynthesisUtterance(text);
            synth.speak(utterThis);
        }
    },
    footer: (url: string[], demands: string | any[], proposals: string | any[], agendas: string | any[], minutes: string | any[], search: string, filter: string, pages: number, page: any, navigate: any, demandsSize: any, table: any) => {

        let nav: any;

        if (url[3] === "demands") {
            nav = demands.length;
        } else if (url[3] === "proposals") {
            nav = proposals.length;
        } else if (url[3] === "agendas") {
            nav = agendas.length;
        } else if (url[3] === "minutes") {
            nav = minutes.length;
        }

        return (
            <div className="h45">
                {search === "" && pages > 1 && filter === "" && (
                    <div className={"navigator navigator-table-" + table}>
                        {page > 1 ? (
                            <div onClick={() => {
                                navigate("/" + url[3] + "/" + (parseInt(page) - 1));
                            }}>{"<"}</div>
                        ) : (
                            <div className="arrow-disabled">{"<"}</div>
                        )}
                        {[...Array(pages)].map((_, index) => {
                            const pageNumber = index + 1;
                            const distance = Math.abs(pageNumber - page);
                            const showPage = distance <= 1 || pageNumber === 1 || pageNumber === pages;
                            return showPage ? (
                                <div
                                    key={pageNumber}
                                    className={pageNumber === parseInt(page) ? "current" : ""}
                                    onClick={() => navigate(`/${url[3]}/${pageNumber}`)}
                                >
                                    {pageNumber}
                                </div>
                            ) : (
                                null
                            );
                        })}
                        {page < pages ? (
                            <div onClick={() => {
                                navigate("/" + url[3] + "/" + (parseInt(page) + 1));
                            }}>{">"}</div>
                        ) : (
                            <div className="arrow-disabled">{">"}</div>
                        )}
                    </div>
                )}
            </div>

        )
    },


    attatchmentType: (demand: { type: string; demandAttachment: { type: string; }; }) => {
        if (demand?.type === "image/png" || demand?.type === "image/jpeg") {
            return "png";
        } else if (demand?.type === "application/pdf") {
            return "pdf";
        } else if (demand?.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
            return "word";
        } else if (demand?.type === "application/msword" || demand?.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
            demand?.type === "application/vnd.ms-excel") {
            return "excel";
        } else if (demand?.type === "application/zip") {
            return "zip";
        } else if (demand?.type === "application/x-rar-compressed") {
            return "rar";
        } else {
            return "others";
        }
    },

    excel: (solicitations: any, solicitationType: any, nameFilter: any, typeFilter: any) => {
        let filteredSolicitations: any = [];
        if (solicitationType === "demand") {
            for (let i = 0; i < solicitations.length; i++) {
                if (typeFilter === "requester" && solicitations[i].requesterRegistration.workerName.toUpperCase().includes(nameFilter.toUpperCase())) {
                    filteredSolicitations.push(solicitations[i]);
                } else if (typeFilter === "status" && solicitations[i]?.demandStatus.toUpperCase() === nameFilter.toUpperCase()) {
                    filteredSolicitations.push(solicitations[i]);
                } else if (typeFilter === "size" && solicitations[i]?.classification?.classificationSize.toUpperCase() === nameFilter.toUpperCase()) {
                    filteredSolicitations.push(solicitations[i]);
                } else if (typeFilter === "ppm" && solicitations[i]?.classification?.ppmCode.toUpperCase() === nameFilter.toUpperCase()) {
                    filteredSolicitations.push(solicitations[i]);
                } else if (typeFilter === "code-demand" && solicitations[i]?.demandCode === parseInt(nameFilter)) {
                    filteredSolicitations.push(solicitations[i]);
                } else if (typeFilter === "home" && solicitations[i]?.requesterRegistration.workerName === nameFilter) {
                    filteredSolicitations.push(solicitations[i]);
                } else if (typeFilter === "department" && solicitations[i]?.requesterRegistration.department === nameFilter) {
                    filteredSolicitations.push(solicitations[i]);
                }
            }
            DemandService.saveExcel(filteredSolicitations).then((response: any) => {
                response.arrayBuffer().then((buffer: ArrayBuffer) => {
                    const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement("a");
                    const data = new Date();
                    const dataFormatada =
                        data.getDate() +
                        "-" +
                        (data.getMonth() + 1) +
                        "-" +
                        data.getFullYear();
                    link.href = url;
                    link.download = "demandas - " + dataFormatada + ".xlsx";
                    link.click();
                });
            });
        } else if (solicitationType === "proposal") {
            for (let i = 0; i < solicitations.length; i++) {
                if (typeFilter === "requester" && solicitations[i]?.demand?.requesterRegistration?.workerName.toUpperCase().includes(nameFilter.toUpperCase())) {
                    filteredSolicitations.push(solicitations[i]);
                } else if (typeFilter === "size" && solicitations[i]?.classification?.classificationSize.toUpperCase() === nameFilter.toUpperCase()) {
                    filteredSolicitations.push(solicitations[i]);
                } else if (typeFilter === "ppm" && solicitations[i]?.classification?.ppmCode.toUpperCase() === nameFilter.toUpperCase()) {
                    filteredSolicitations.push(solicitations[i]);
                } else if (typeFilter === "code-proposal" && solicitations[i]?.proposalCode === parseInt(nameFilter)) {
                    filteredSolicitations.push(solicitations[i]);
                } else if (typeFilter === "department" && solicitations[i].demand?.requesterRegistration.department === nameFilter) {
                    filteredSolicitations.push(solicitations[i]);
                }
            }
            ProposalService.saveExcel(filteredSolicitations).then((response: any) => {
                response.arrayBuffer().then((buffer: ArrayBuffer) => {
                    const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement("a");
                    const data = new Date();
                    const dataFormatada =
                        data.getDate() +
                        "-" +
                        (data.getMonth() + 1) +
                        "-" +
                        data.getFullYear();
                    link.href = url;
                    link.download = "propostas - " + dataFormatada + ".xlsx";
                    link.click();
                });
            });
        } else if (solicitationType === "agenda") {
            for (let i = 0; i < solicitations.length; i++) {
                if (typeFilter === "code-agendas") {
                    for (let j = 0; j < solicitations[i]?.proposals.length; j++) {
                        console.log(solicitations[i]?.proposals[j]?.proposalCode, "name: " + nameFilter)
                        if (solicitations[i].proposals[j]?.proposalCode == parseInt(nameFilter)) {
                            filteredSolicitations.push(solicitations[i]);
                        }
                    }
                }
            }
            AgendaService.saveExcel(filteredSolicitations).then((response: any) => {
                response.arrayBuffer().then((buffer: ArrayBuffer) => {
                    const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement("a");
                    const data = new Date();
                    const dataFormatada =
                        data.getDate() +
                        "-" +
                        (data.getMonth() + 1) +
                        "-" +
                        data.getFullYear();
                    link.href = url;
                    link.download = "pautas - " + dataFormatada + ".xlsx";
                    link.click();
                });
            });
        } else if (solicitationType === "minute") {
            for(let i = 0; i < solicitations.length; i++) {
                let dateFormat: any;

                // se for menos de 9 colocar 0 na frente
                if (solicitations[i].minuteStartDate?.split("/")[1].length === 1) {
                    dateFormat = solicitations[i].minuteStartDate.split("/")[0] + "0" + solicitations[i].minuteStartDate.split("/")[1] + solicitations[i].minuteStartDate.split("/")[2]
                }
    
                if (typeFilter === "code-minutes" && solicitations[i].minuteCode === parseInt(nameFilter)) {
                    filteredSolicitations.push(solicitations[i]);
                } else if (typeFilter === "date" && dateFormat.includes(nameFilter.split("-").reverse().join(""))) {
                    filteredSolicitations.push(solicitations[i]);
                }
            }
            MinuteService.saveExcel(filteredSolicitations).then((response: any) => {
                response.arrayBuffer().then((buffer: ArrayBuffer) => {
                    const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement("a");
                    const data = new Date();
                    const dataFormatada =
                        data.getDate() +
                        "-" +
                        (data.getMonth() + 1) +
                        "-" +
                        data.getFullYear();
                    link.href = url;
                    link.download = "atas - " + dataFormatada + ".xlsx";
                    link.click();
                });
            });
        }
    }

}

export default othersUtil;