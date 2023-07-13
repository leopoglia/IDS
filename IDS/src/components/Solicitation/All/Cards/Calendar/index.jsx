import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'



export default function Calendarer() {

    const localizer = momentLocalizer(moment)

    const MyCalendar = () => (
        <div className="myCustomHeight">
            <Calendar
                localizer={localizer}
                events={[1, 2, 3]}
                startAccessor="start"
                endAccessor="end"
            />
        </div>
    )

    return (
        <div className='background-modal'>


            {MyCalendar()}

        </div>
    )
}