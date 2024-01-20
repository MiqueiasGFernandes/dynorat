type EventsEnum = 'INIT' | 'INFO' | 'COMMAND'

export interface EventType<T = Record<string, unknown>> {
  type: EventsEnum
  data: T
}
