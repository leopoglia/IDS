
const othersUtil = {

    // Função para mostrar o navigator
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
        if (demand.type === "image/png" || demand.type === "image/jpeg") {
            return "png";
        } else if (demand.type === "application/pdf") {
            return "pdf";
        } else if (demand.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
            return "word";
        } else if (demand.type === "application/msword" || demand.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
            demand.demandAttachment.type === "application/vnd.ms-excel") {
            return "excel";
        } else if (demand.type === "application/zip") {
            return "zip";
        } else if (demand.type === "application/x-rar-compressed") {
            return "rar";
        }
    },


}

export default othersUtil;