



const othersUtil = {

    // Função para mostrar o navigator
    footer: (url: string[], demands: string | any[], proposals: string | any[], agendas: string | any[], minutes: string | any[], search: string, pages: number, page: any, navigate: any) => {


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

        console.log(nav);


        return (
            <div className="h45">
                {search === "" && pages > 1 && (
                    <div className="navigator">
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
    }

}

export default othersUtil;