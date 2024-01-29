type EventCallback = (...args: any[]) => void;

class EventBus {
  private events: { [eventName: string]: EventCallback[] } = {};

  subscribe(eventName: string, callback: EventCallback): void {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
  }

  publish(eventName: string, ...args: any[]): void {
    const callbacks = this.events[eventName];
    if (callbacks) {
      callbacks.forEach((callback) => {
        callback(...args);
      });
    }
  }

  unsubscribe(eventName: string): void {
    const callbacks = this.events[eventName];
    if (callbacks) {
      this.events[eventName] = [];
    }
  }
}

const eventBus = new EventBus();


interface ShowHttpDetailQuery{
  link?: string;
  requestType?: 'done' | 'error' | string;
  beginTime?: string;
  endTime?: string;
  open?: boolean;
}
export const showHttpDetail = {
  eventKey: 'showHttpDetail',
  subscribe(fn: (query: ShowHttpDetailQuery) => void) {
    eventBus.subscribe(this.eventKey, fn);
  },
  unsubscribe(){
    eventBus.unsubscribe(this.eventKey);
  },
  publish(data: ShowHttpDetailQuery){
    eventBus.publish(this.eventKey, data);
  },
};
