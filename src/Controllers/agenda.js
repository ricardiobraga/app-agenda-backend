import { openDb } from '../dbConfig.js'



export async function createTable(){
    openDb().then(db => {
        db.exec(`CREATE TABLE IF NOT EXISTS agenda (
             id INTEGER PRIMARY KEY,
             imagePath TEXT,
             name VARCHAR(100),
             phoneDDD VARCHAR(2),
             phoneNumber VARCHAR(9),
             email VARCHAR(200)
             )`)
    })
}

export async function deleteTable (tableName) {
    openDb().then(db => {
        db.exec(`DROP TABLE ${tableName}`)
    })
}


export async function insertContact(req, res){    
    let contact = req.body  
    let arquivo = req.files
    console.log("arquivos: ", contact, arquivo);      
    
    if(req.files && contact.name !== '' && contact.phoneDDD !== '' && contact.phoneNumber !== '' && contact.email !== '' ){
        let img = req.files.file
        let fileName = `${Date.now()}${img.name}` 

        img.mv('./src/uploads/'+fileName, (err) => {
            if (err) {
                res.send(`<script>alert("falha ao enviar o cadastro"); window.location.href = "http://localhost:3000/";</script>`)  
            } else {
                openDb().then(db => {
                    db.run('INSERT INTO agenda (imagePath, name, phoneDDD, phoneNumber, email) VALUES (?,?,?,?,?)', [`${fileName}`, contact.name, contact.phoneDDD, contact.phoneNumber, contact.email ])
                })
                res.send(`<script>alert("cadastro enviado com sucesso"); window.location.href = "http://localhost:3000/";</script>`)
            }
        })
        
    } else {
        res.send(`<script>alert("todos os campos do cadastro devem ser preenchidos"); window.location.href = "http://localhost:3000/";</script>`) 
    }
}

export async function selectAgenda(req, res){
    openDb().then(db => {
     db.all('SELECT * FROM agenda')
    .then(pessoas => {
        res.json(pessoas)
        
    })
})
}

export async function deleteContato(req, res){
    let id = req.body.id
    
        openDb().then(db => {
            db.get('DELETE FROM agenda WHERE id=?', [id])
            .then(res=>res)
    })
     res.json({
        "statuscode": 200
    })
}


export async function updateInfo(req, res){
    
    let contato = req.body
    console.log(contato.name);
    
    let fileName = `${Date.now()}${contato.imagePath}`
    if(contato.imagePath !== '' && contato.name !== '' && contato.phoneDDD !== '' && contato.phoneNumber !== '' && contato.email !== ''){
            openDb().then(db => {
                db.run(`
                UPDATE agenda SET imagePath=?, name=?, phoneDDD=?, phoneNumber=?, email=? WHERE id=? `,
                [fileName, contato.name, contato.phoneDDD, contato.phoneNumber, contato.email, contato.id])
            })
            res.json({err: "erro"})
        } else {
            res.json({sucesso:'sucess'})
        }

    }    
    
 export async function updateImage(req, res){


    if( req.files && req.body.id){
        let img = req.files.myFile
        console.log(img);
        
        openDb().then(db => {
            db.get('SELECT imagePath FROM agenda WHERE id=?', [req.body.id])
            .then(res => {
                 img.mv('./src/uploads/'+res.imagePath, (err) => {
                    if (err) {
                        console.log("erro");  
                    } else {
                       
                        console.log("sucesso");
                    }
                })    
                
                  
            })
            
          

             })
    }


}
    
                       
        
       
 