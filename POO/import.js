const input = document.querySelector('#file')

input.addEventListener('change',()=>{
    alert(this.files)
})

class Animal{
    constructor(name){
        this.name = name;
        
    }

    speak(){
        console.log(this.name + 'falou algo')
    }
}

class Cat extends Animal{
    constructor(name){
        super(name);
    }
}

const sora = new Cat('Sora')
sora.speak()