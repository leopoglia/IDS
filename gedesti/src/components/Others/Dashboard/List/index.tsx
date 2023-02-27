import './style.css';

export default function List(props: any) {
    return (
        <div className="list-dashboard">
            <div className="list-dashboard-header display-flex">

                <div className='display-flex-space-between'>
                    <div className='display-flex'>
                        <span className='material-symbols-outlined'>{props.icon}</span>

                        <p>{props.title}</p>
                    </div>


                    <div className='display-flex'>
                        <span className='number-list'>{props.number}</span>

                        <div className="display-grid alteration-numbers">

                            <div className="display-flex-center ml10">
                                <div className='span'>1S</div>

                                <div className='display-flex'>
                                    <span className="material-symbols-outlined">
                                        trending_up
                                    </span>
                                    <p>+50%</p>
                                </div>
                            </div>

                            <div className="display-flex-center ml10">
                                <div className='span'>1M</div>
                                <div className='display-flex'>
                                    <span className="material-symbols-outlined">
                                        trending_up
                                    </span>
                                    <p>+50%</p>
                                </div>
                            </div>

                            <div className="display-flex-center ml10">
                                <div className='span'>1A</div>

                                <div className='display-flex'>
                                    <span className="material-symbols-outlined">
                                        trending_up
                                    </span>
                                    <p>+50%</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}