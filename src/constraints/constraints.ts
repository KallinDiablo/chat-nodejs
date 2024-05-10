export default class Constraints{
    public api_server:string = process.env.REACT_APP_API_HOST?process.env.REACT_APP_API_HOST: 'http://localhost:4040'
    public api_client:string = process.env.REACT_APP_HOST?process.env.REACT_APP_HOST: 'http://localhost:3000'
}
