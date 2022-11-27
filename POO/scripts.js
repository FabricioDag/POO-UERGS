class Process{

    constructor(){
        this.id = 1;
        this.arrayProcess = [];
    }

    save(){
        let process = this.readData();
        if(this.validateData(process) == true){
            this.addToArray(process)
        }

        console.log(this.arrayProcess)
        this.showTable()
    }

    addToArray(process){
        this.arrayProcess.push(process);
        this.id ++;
    }

    readData(){
        let process ={}

        process.id = this.id
        process.titleProcess = document.getElementById("process").value;
        process.durationProcess = document.getElementById("duration").value
             
        return process
    }

    validateData(process){
        let msg = ''
        if(process.titleProcess == ''){
            msg += 'Digite um título'
        }
        if(process.durationProcess == ''){
            msg += 'Digite uma duração valida'
        }
        if(msg != ''){
            alert(msg)
            return false
        }
        return true;
    }

    showTable(){
        let tbody = document.getElementById("tbody")

        for(let i = 0 ; i < this.arrayProcess.length; i++){
            let tr = tbody.insertRow();

            let td_id = tr.insertCell();
            let td_title = tr.insertCell();
            let td_duration = tr.insertCell();
            let td_actions = tr.insertCell();

            td_id.innerText = this.arrayProcess[i].id;
            td_title = this.arrayProcess[i].titleProcess;
            td_duration = this.arrayProcess[i].durationProcess;
        }
    }

    add(){
        alert('add sendo chamado');
    }

    exclude(){
        alert('item deletado')
    }

}

var process = new Process()