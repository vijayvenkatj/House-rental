import pg from 'pg';
import bcrypt from 'bcrypt';

const { Pool } = pg;
export const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
});

export async function CreateUserTable() {
    try {
        const res = await pool.query(`
            CREATE TABLE IF NOT EXISTS Buyer (
            Buyer_ID SERIAL PRIMARY KEY,
            Name VARCHAR(100) NOT NULL,        
            Password VARCHAR(100) NOT NULL,    
            Phone_no CHAR(10),                 
            ID_proof VARCHAR(50),             
            Marital_status VARCHAR(20),       
            Family_size INT                   
        );`);
        return res;
    } catch (error) {
        console.error('Error creating table:', error);
        throw error;
    }
}

export async function AddUser(Buyer: Buyer) {
    try {
        const hashedPassword = await bcrypt.hash(Buyer.Password,10);
        const res = await pool.query(`
            INSERT INTO Buyer (Name, Password, Phone_no, ID_proof, Marital_status, Family_size)
            VALUES ($1, $2, $3, $4, $5, $6)`,
            [Buyer.Name, hashedPassword, Buyer.Phone_no, Buyer.ID_proof, Buyer.Marital_status, Buyer.Family_size]);
        return res;
    } catch (error) {
        console.error('Error adding user:', error);
        throw error;
    }
}

export async function FindUser(Name: string) {
    try {
        const res = await pool.query(`SELECT * FROM Buyer WHERE Name = $1`, [Name])
        return res.rows[0];
    } catch (error) {
        console.error('Error finding user:', error);
        throw error;
    }
}

export async function FindUserById(Buyer_ID: number) {
    try {
        const res = await pool.query(`SELECT * FROM Buyer WHERE Buyer_ID = $1`, [Buyer_ID])
        return res.rows[0];
    } catch (error) {
        console.error('Error finding user:', error);
        throw error;
    }
}

export async function FindUserId(Name: string) {
    try {
        const res = await pool.query(`SELECT Buyer_ID FROM Buyer WHERE Name = $1`, [Name])
        return res.rows[0];
    }
    catch (error) {
        console.error('Error finding user:', error);
        throw error;
    }
}


export async function VerifyUser(Name: string, Password: string) {
    try {
        const user = await FindUser(Name);
        if (user) {
            const match = await bcrypt.compare(Password, user.password);
            if (match) {
                return true;
            }
        }
        return false;
    } catch (error) {
        console.error('Error verifying user:', error);
        return false;
    }
}

interface Buyer {
    Name: string;
    Password: string;
    Phone_no: string;
    ID_proof: string;
    Marital_status: string;
    Family_size: number;
}
