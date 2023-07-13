import { Calendar, momentLocalizer } from 'react-big-calendar'
import { useEffect, useState } from 'react'
import moment from 'moment'
import ServicesAgendas from '../../../../../services/agendaService';
import './style.css'


export default function Calendarer() {

    useEffect(() => {
        ServicesAgendas.findAll().then(res => {

            let events = res.map((agenda, index) => {
                return {
                    id: index,
                    title: agenda.commission.commissionName,
                    start: new Date(agenda.initialDate),
                    end: new Date(agenda.finalDate),
                }
            })

            console.log(events)

            setEvents(events)
        })

    }, [])


    const localizer = momentLocalizer(moment);
    const [events, setEvents] = useState([])

    const MyCalendar = () => (
        <div className="myCustomHeight">

            <div className='header-calendar display-flex-space-between'>
                <span className='title'>Calendário</span>

                <span className='material-symbols-outlined'>close</span>
            </div>

            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
            />
        </div>
    )

    return (
        <div className='calendar'>
            <div className='container'>

                {MyCalendar()}

            </div>

        </div>
    )
}