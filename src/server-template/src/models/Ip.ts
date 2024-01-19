import axios from 'axios'

export class Ip {
  private readonly _ip: string

  public country: string
  public countryCode: string
  public region: string
  public regionName: string
  public city: string
  public zip: string
  public lat: number
  public lon: number
  public isp: string

  constructor (ip: string) {
    this._ip = ip
  }

  async query (): Promise<void> {
    const { data } = await axios.get(`http://ip-api.com/json/${this._ip}`)

    Object.assign(this, data)
  }
}
