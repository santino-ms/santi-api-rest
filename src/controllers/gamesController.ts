import { Request, Response } from 'express';

import pool from '../database';
 
class GamesController {

   public async list(req: Request, res:Response) {
       const sql = 'SELECT * FROM games';

      const games = await pool.query(sql, (error, results, fields) => {
        if(error) throw error;
        res.json(results);
      });
    };
    
    
    public async getOne(req: Request, res:Response) {
       const { id } = req.params;
       const sql = 'SELECT * FROM games WHERE id = ?';

       pool.query('SELECT * FROM games WHERE id = ?', [id], (error, results, fields) => {
           if (error) throw error;

           if (results.length > 0) {
               return res.json(results[0]);
            } else {
                res.status(404).json({message:'El juego no fue encontrado o no existe.'});
            }
        });
    } 



    public async create (req: Request, res:Response)  {
        
        const sql = 'INSERT INTO games set ?';

        let title = req.body.title;
        let description = req.body.description;
        let image = req.body.image;
       
        if ((title == '' || title == null) || (description == '' || description == null) || (image == '' || image == null)) {

            res.send('Es necesario ingresar datos.');
        } else {
            await pool.query(sql, [req.body], (error) => {
                if (error) throw error;
                console.log(req.body);
                res.json({text: 'Los datos se guardaron correctamente.'});
            });
        }
    }




    public async update (req:Request, res:Response) {
        const  id  = req.body.id;
        const title = req.body.title;
        const description = req.body.description;
        const image = req.body.image;

        const sqlQ = 'SELECT * FROM games WHERE id = ?';
        const sqlU = 'UPDATE games set ? WHERE id = ?';


        if (id == '' || id == null){
            res.send('Por favor ingrese el ID para poder actualizar los datos.');
        } 
        
        await pool.query(sqlQ, [id], (error,result) => {
            if(error) throw error;
            if (result=='' ) { 
                res.send(`No hay registros para id ${req.body.id}.`);
               } else {
                    pool.query(sqlU, [req.body,id], error => {
                        if(error) throw error;
                        
                        res.json({message: 'Los datos se actualizaron correctamente.'});
                    });
                }
        });

    }

    public async delete (req:Request, res:Response) {
       const  id  = req.body.id;
       const sqlQ = 'SELECT * FROM games WHERE id = ?';
       const sqlD = 'DELETE FROM games WHERE id = ?';

        if (id == '' || id == null){
            res.send('Por favor ingrese el ID para poder eliminar el juego.');
        } 
        
        await pool.query(sqlQ, [req.body.id], (error,result) => {
            if(error) throw error;
            if (result=='' ) { 
                res.send(`No hay registros para id ${req.body.id}`);
               } else {
                    pool.query(sqlD, [req.body.id], error => {
                        if(error) throw error;
                    
                        res.json({message: 'Los datos se eliminaron correctamente.'});
                    });
                }
        });
         
      
    }

}

export const gamesController = new GamesController();
export default gamesController; 