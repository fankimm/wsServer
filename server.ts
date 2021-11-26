const WebSocketS = require('ws').Server;

export class Server {
    public clients: any = []
    public wss: any = null
    public data = []
    public tmp = ''
    public start(port:number){
        this.wss = new WebSocketS({port:port})
        console.log("websocket initialized",port)
        this.wss.on("connection", (ws:any)=>{
            this.clients.push(ws)
            console.log("connected total:",this.clients.length)
            let strOut = ''
            ws.on("message",(param)=>{
                
                this.tmp = JSON.parse(param.toString())
                console.log(this.tmp)
                this.data.push(this.tmp)
                ws.send(JSON.stringify(this.tmp))
            })
            
            // this.tmp=""
        })
        
        this.wss.on("close",function(error:any){
            console.log("webserver close",error)
        })
        this.wss.on("error",function(error:any){
            console.log(error)
        })
    }
}