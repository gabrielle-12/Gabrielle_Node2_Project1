const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')

const app = express()
const port = 3000;
const db = mysql.createConnection({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '',
    database: "data_pasien"
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))


// CRUD UNTUK Data Pasien Yang Meninggal
app.get('/data', (req, res) => {
    let sql = `
    select nama, umur, asal, tanggal from pasien 
    `

    db.query(sql, (err, result) => {
        if (err) throw err

        res.json({
            message: "Sukses Menampilkan Semua Data",
            data: result
        })
    })
})

app.post('/data', (req, res) => {
    let data = req.body

    let sql = `
        insert into pasien (nama, umur, asal, tanggal)
        values ('`+data.nama+`', '`+data.umur+`', '`+data.asal+`', '`+data.tanggal+`')
    `

    db.query(sql, (err, result) => {
        if (err) throw err

        res.json({
            message: "Data Berhasil Ditambahkan",
            data: result
        })
    })
})

app.get('/data/:id_pasien', (req, res) => {
    let sql = `
        select * from pasien
        where id_pasien = `+req.params.id_pasien+`
        limit 1
    `

    db.query(sql, (err, result) => {
        if (err) throw err

        res.json({
            message: "Sukses Menampilkan Detail Pasien",
            data: result[0]
        })
    })
})

app.put('/data/:id_pasien',(req, res) => {
    let data = req.body

    let sql = `
        update pasien
        set nama = '`+data.nama+`', umur = '`+data.umur+`', asal = '`+data.asal+`', tanggal = '`+data.tanggal+`'
        where id_pasien = '`+req.params.id_pasien+`'
    `
    db.query(sql, (err, result) => {
        if (err) throw err

        res.json({
            message: "Data Berhasil di Ubah",
            data: result
        })
    })
})

app.delete('/data/:id_pasien',(req, res) => {
    let sql = `
        delete from pasien
        where id_pasien = '`+req.params.id_pasien+`'
        `
    
        db.query(sql, (err, result) => {
            if (err) throw err
            
            res.json({
                message: "Data Berhasil Dihapus",
                data: result
            })
        })
    })

app.listen(port, () => {
    console.log('App running on port ' + port)
})
    