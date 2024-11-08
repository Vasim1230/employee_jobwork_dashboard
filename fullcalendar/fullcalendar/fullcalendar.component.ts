import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import { Draggable } from '@fullcalendar/interaction';  
import InteractionPlugin from '@fullcalendar/interaction';
import DayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';

@Component({
  selector: 'app-fullcalendar',
  templateUrl: './fullcalendar.component.html',
  styleUrls: ['./fullcalendar.component.scss']
})
export class FullcalendarComponent implements OnInit {

  @ViewChild('externalEvents') externalEvents: ElementRef | undefined;
  @ViewChild('calendar') calendar: ElementRef | undefined;
  
  calendarOptions: CalendarOptions;
  dropRemove: boolean = false;  // Use Angular binding for checkbox

  constructor() {
    this.calendarOptions = {
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      editable: true,
      droppable: true,  // Allow events to be dropped
      drop: this.handleDropEvent.bind(this),  // Handle event drop
      events: [], 
      plugins: [InteractionPlugin, DayGridPlugin,timeGridPlugin ]  
    };
  }

  ngOnInit(): void {
    this.setupDraggable();
  }

  // Handle the event drop
  handleDropEvent(info: any): void {
    if (this.dropRemove) {
      // If "remove after drop" is checked, remove the event from the external list
      info.draggedEl.parentNode.removeChild(info.draggedEl);
    }
  }

  setupDraggable(): void {
    const containerEl = this.externalEvents?.nativeElement;

    if (containerEl) {
      console.log('Initializing Draggable for:', containerEl);
      new Draggable(containerEl, {
        
        itemSelector: '.fc-event',
        eventData: (eventEl: any) => {
          return {
            title: eventEl.innerText.trim()  // Ensure title is captured correctly
          };
        }
      });
    }
  }
}
