import { Request, Response, NextFunction } from 'express';

export function corsHandler(req: Request, res: Response, next: NextFunction) {
    const allowedOrigins = ['https://www.thunderclient.com', 'http://localhost:1337']; // izin verilen origin'ler listesi
    const origin = req.header('origin');

    if (!origin || allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin);
    } else {
        // İzin verilmeyen bir origin ile karşılaşıldığında
        return res.status(403).json({ message: 'CORS policy does not allow access from this origin.' });
    }

    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.sendStatus(200); // JSON yanıt yerine boş yanıt döndürüldü
    }

    next();
}
