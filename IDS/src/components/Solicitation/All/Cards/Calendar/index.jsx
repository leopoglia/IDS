import { Calendar, momentLocalizer } from 'react-big-calendar'
import { useEffect, useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import moment from 'moment'
import ServicesAgendas from '../../../../../services/agendaService';
import './style.css'


export default function Calendarer(props) {

    const localizer = momentLocalizer(moment);
    const [events, setEvents] = useState([])
    const { t } = useTranslation();
    const navigate = useNavigate();

    useEffect(() => {
        ServicesAgendas.findAll().then(res => {

            let events = res.map((agenda, index) => {
                return {
                    id: index,
                    code: agenda.agendaCode,
                    title: agenda.commission.commissionName,
                    start: new Date(agenda.initialDate),
                    end: new Date(agenda.finalDate),
                }
            })

            console.log(events)

            setEvents(events)
        })

    }, []);

    const handleSelectEvent = useCallback(
        (event) => navigate("/agenda/view/" + event.code),
        []
    )


    const MyCalendar = () => (
        <div className="myCustomHeight">

            <div className='header-calendar display-flex-space-between'>
                <span className='title'>Calendário</span>

                <span className='material-symbols-outlined' onClick={() => props.setCalendar(!props.calendar)}>close</span>
            </div>

            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                onSelectEvent={handleSelectEvent}
                messages={{
                    month: t('month'),
                    day: t('day'),
                    today: t('today'),
                    week: t('week'),
                    agenda: t('schedule'),
                    date: t('date'),
                    time: t('time'),
                    previous: "<",
                    next: ">",
                }}
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