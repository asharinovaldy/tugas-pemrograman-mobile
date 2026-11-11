import axios from 'axios';

export default class EndPointAccess {
    theUrl: string;
    constructor(url: string){
        this.theUrl = url;
    }
    
    async getRes(params?: Record<string, any>){
        const response = await axios.get(this.theUrl, {params, timeout: 10000})
        return response;
    }
}