import { Router } from "express"
import bodyParser from 'body-parser'
import { deleteContato, insertContact, selectAgenda, updateImage, updateInfo } from "./Controllers/agenda.js"




const router = Router()

let urlEncoderParser = bodyParser.urlencoded({extended: false})

router.get('/', (req, res) => {
    res.json({
        "statuscode": 200,
        "msg": "API rodando"
    })
})

router.get('/agenda',urlEncoderParser, selectAgenda)
router.post('/',urlEncoderParser, insertContact)

router.delete('/agenda',urlEncoderParser, deleteContato)
router.post('/updateImage', urlEncoderParser, updateImage)
router.put('/updateInfo', urlEncoderParser, updateInfo)

export default router