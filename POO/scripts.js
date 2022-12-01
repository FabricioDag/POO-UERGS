class Process{

    constructor(){
        this.id = 1;
        this.arrayProcess = [{"id":1,"titleProcess":"teste","durationProcess":21}];
        this.editId = null;
    }

    save(){
        let process = this.readData();
        if(this.validateData(process) == true){
            if(this.editId == null){
                this.addToArray(process)
            } else{
                this.atualizeProcess(this.editId,process)
            }
        }  

        console.log(this.arrayProcess)
        this.showTable()
        this.cancel()
    }


    searchInArray(){
        let searchProcess = document.getElementById("searchProcess").value
        console.log(searchProcess)

        for(let i = 0 ; i < this.arrayProcess.length; i++){
            if(this.arrayProcess[i].titleProcess.includes(searchProcess)){
                alert('achou um igual id: ' + this.arrayProcess[i].id)
            }
        }
    }

    addToArray(process){
        process.durationProcess = parseFloat(process.durationProcess)
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

    atualizeProcess(id, process){
        for(let i = 0; i< this.arrayProcess.length ;i++){
            if(this.arrayProcess[i].id == id){
                this.arrayProcess[i].titleProcess = process.titleProcess;
                this.arrayProcess[i].durationProcess = process.durationProcess;
            }
        }
    }

    showTable(){
        let tbody = document.getElementById("tbody")
        tbody.innerText = '';

        for(let i = 0 ; i < this.arrayProcess.length; i++){
            console.log(i)
            let tr = tbody.insertRow();

            let td_id = tr.insertCell();
            td_id.classList.add('center')
            let td_title = tr.insertCell();
            let td_duration = tr.insertCell();
            let td_actions = tr.insertCell();
            td_actions.classList.add('center')

            let editBtn = document.createElement("button")
            let editIcon = document.createElement("i")
            editIcon.classList.add("fa-solid")
            editIcon.classList.add("fa-pen-to-square")
            editBtn.appendChild(editIcon);
            editBtn.setAttribute("onClick","process.editProcess(" + JSON.stringify(this.arrayProcess[i]) + ")")

            let deleteBtn = document.createElement("button")
            let deleteIcon = document.createElement("i")
            deleteIcon.classList.add("fa-solid")
            deleteIcon.classList.add("fa-trash")
            deleteBtn.appendChild(deleteIcon);
            deleteBtn.setAttribute("onClick","process.delete(" + this.arrayProcess[i].id + ")")

            let viewBtn = document.createElement("button")
            let viewIcon = document.createElement("i")
            viewIcon.classList.add("fa-solid")
            viewIcon.classList.add("fa-eye")
            viewBtn.appendChild(viewIcon);
            viewBtn.setAttribute("onClick","process.searchOnInternet(" + this.arrayProcess[i].id + ")")

            td_id.innerText = this.arrayProcess[i].id;
            td_title.innerText = this.arrayProcess[i].titleProcess;
            td_duration.innerText = this.arrayProcess[i].durationProcess;
            td_actions.appendChild(editBtn)
            td_actions.appendChild(deleteBtn)
            td_actions.appendChild(viewBtn)
        }
    }

    editProcess(data){
        this.editId = data.id

        document.getElementById('process').value = data.titleProcess
        document.getElementById('duration').value = data.durationProcess

        document.getElementById('saveBtn').value = 'att'
    }

    cancel(){
        document.getElementById("process").value = ''
        document.getElementById("duration").value = ''

        document.getElementById("saveBtn").value = '+'
        this.editId = null;
    }

    delete(id){
        if(confirm('Deseja deletar o produto ID' + id +"?")){

            let tbody = document.getElementById("tbody")

            for(let i = 0; i<this.arrayProcess.length; i++){
                if(this.arrayProcess[i].id == id){
                    this.arrayProcess.splice(i,1);
                    tbody.deleteRow(i);
                }
            }
        }
          
    }

    searchOnInternet(id){
        alert('item pesquisado '+ id)
        for(let i = 0; i<this.arrayProcess.length; i++){
            if(this.arrayProcess[i].id == id)
            {   
                const a = document.createElement('a')
                document.body.appendChild(a)
                console.log(this.arrayProcess[i].titleProcess)
                let keysearch = this.arrayProcess[i].titleProcess
                let urllink = 'http://google.com/search?q='+ keysearch
                console.log(urllink)
                a.href = urllink
                a.target = '_blank'
                a.click();
            }
        }
    }

    import(){
        alert('Arquivo Importado')
        console.log(this.files)
        /*
        const archive = this.files[0]
        const reader = new FileReader()

        reader.addEventListener('load', function(){
            console.log(reader.result)
        })

        if(archive){
            reader.readAsText(archive)
        }*/
    }


    export(){
        //array de objs para array arrays
        var arr = this.arrayProcess.map(function(obj){

            return Object.keys(obj).map(function(key){
                return obj[key]
            })
        })

        console.log(arr)
        const dataInJson = JSON.stringify(arr)
        console.log('data in json :' + dataInJson)
        //acaba aq

        const dataParaJson = JSON.stringify(this.arrayProcess)
        console.log('data para json' + dataParaJson)
        alert(dataParaJson)

        this.download()(dataInJson, 'teste.json')
    }


    download(){
        const a =  document.createElement('a')
        a.style =  'display: none'
        document.body.appendChild(a)
        return function(content, archiveName){
            const blob = new Blob([content], {type: 'octet/stream'})
            const url = window.URL.createObjectURL(blob);
            a.href = url
            a.download = archiveName
            a.click()
            window.URL.revokeObjectURL(url)
        }
    }

    

}



var process = new Process()