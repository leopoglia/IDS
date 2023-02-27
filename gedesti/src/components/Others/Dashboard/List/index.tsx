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
                    <span className='number-list'>{props.number}</span>
                </div>
            </div>
        </div>
    )
}