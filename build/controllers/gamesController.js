"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gamesController = void 0;
const database_1 = __importDefault(require("../database"));
class GamesController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'SELECT * FROM games';
            const games = yield database_1.default.query(sql, (error, results, fields) => {
                if (error)
                    throw error;
                res.json(results);
            });
        });
    }
    ;
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const sql = 'SELECT * FROM games WHERE id = ?';
            database_1.default.query('SELECT * FROM games WHERE id = ?', [id], (error, results, fields) => {
                if (error)
                    throw error;
                if (results.length > 0) {
                    return res.json(results[0]);
                }
                else {
                    res.status(404).json({ message: 'El juego no fue encontrado o no existe.' });
                }
            });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'INSERT INTO games set ?';
            let title = req.body.title;
            let description = req.body.description;
            let image = req.body.image;
            if ((title == '' || title == null) || (description == '' || description == null) || (image == '' || image == null)) {
                res.send('Es necesario ingresar datos.');
            }
            else {
                yield database_1.default.query(sql, [req.body], (error) => {
                    if (error)
                        throw error;
                    console.log(req.body);
                    res.json({ text: 'Los datos se guardaron correctamente.' });
                });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.body.id;
            const title = req.body.title;
            const description = req.body.description;
            const image = req.body.image;
            const sqlQ = 'SELECT * FROM games WHERE id = ?';
            const sqlU = 'UPDATE games set ? WHERE id = ?';
            if (id == '' || id == null) {
                res.send('Por favor ingrese el ID para poder actualizar los datos.');
            }
            yield database_1.default.query(sqlQ, [id], (error, result) => {
                if (error)
                    throw error;
                if (result == '') {
                    res.send(`No hay registros para id ${req.body.id}.`);
                }
                else {
                    database_1.default.query(sqlU, [req.body, id], error => {
                        if (error)
                            throw error;
                        res.json({ message: 'Los datos se actualizaron correctamente.' });
                    });
                }
            });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.body.id;
            const sqlQ = 'SELECT * FROM games WHERE id = ?';
            const sqlD = 'DELETE FROM games WHERE id = ?';
            if (id == '' || id == null) {
                res.send('Por favor ingrese el ID para poder eliminar el juego.');
            }
            yield database_1.default.query(sqlQ, [req.body.id], (error, result) => {
                if (error)
                    throw error;
                if (result == '') {
                    res.send(`No hay registros para id ${req.body.id}`);
                }
                else {
                    database_1.default.query(sqlD, [req.body.id], error => {
                        if (error)
                            throw error;
                        res.json({ message: 'Los datos se eliminaron correctamente.' });
                    });
                }
            });
        });
    }
}
exports.gamesController = new GamesController();
exports.default = exports.gamesController;
