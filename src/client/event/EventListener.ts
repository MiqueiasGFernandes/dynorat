import { EventEmitter } from 'node:events'

export class EventListener {
  private static eventEmitter: EventEmitter = null

  static getEventEmitter (): EventEmitter {
    if (!EventListener.eventEmitter) {
      EventListener.eventEmitter = new EventEmitter({
        captureRejections: true
      })
    }
    return EventListener.eventEmitter
  }
}
