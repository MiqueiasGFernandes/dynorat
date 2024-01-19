export class Connection {
  constructor (
    public readonly ip: string,
    public readonly username: string,
    public readonly hostname: string,
    public readonly country: string,
    public readonly lat: string,
    public readonly lon: string,
    public readonly regionName: string,
    public readonly cpu: string,
    public readonly os: string
  ) {
  }
}
