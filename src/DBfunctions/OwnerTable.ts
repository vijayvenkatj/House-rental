import pg from 'pg';
import bcrypt from 'bcrypt';

const { Pool } = pg;
export const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
});

export async function CreateOwnerTable() {
    try {
        const res = await pool.query(`
            CREATE TABLE IF NOT EXISTS Owner (
            Owner_ID SERIAL PRIMARY KEY,
            Name VARCHAR(100) NOT NULL,        
            Password VARCHAR(100) NOT NULL,    
            Phone_no CHAR(10),                 
            ID_proof VARCHAR(50)                               
        );`);
        return res;
    } catch (error) {
        console.error('Error creating table:', error);
        throw error;
    }
}

export async function AddOwner(Owner: Owner){
    try{
        const hashedPassword = await bcrypt.hash(Owner.Password,10);
        const res = await pool.query(`
            INSERT INTO Owner (Name, Password, Phone_no, ID_proof)
            VALUES ($1, $2, $3, $4)`,
            [Owner.Name, hashedPassword, Owner.Phone_no, Owner.ID_proof]);
        return res;
    }
    catch(error){
        console.error('Error adding owner:', error);
        throw error;
    }
}

export async function FindOwner(Name: string) {
    try {
        const res = await pool.query(`SELECT * FROM Owner WHERE Name = $1`, [Name])
        return res.rows[0];
    } catch (error) {
        console.error('Error finding owner:', error);
        throw error;
    }
}

export async function FindOwnerByImage(image: string) {
    try {
        const res = await pool.query(`SELECT name,phone_no FROM Owner join Property on property.owner_id = Owner.owner_id where property.image='${image}'`);
        console.log(res.rows[0]);
        return res.rows[0];
    }
    catch (error) {
        console.error('Error finding owner by image:', error);
        throw error;
    }
}

export async function VerifyOwner(Name: string, Password: string) {
    try {
        const owner = await FindOwner(Name);
        if (owner) {
            const match = await bcrypt.compare(Password, owner.password);
            if (match) {
                return true;
            }
        }
        return false;
    } catch (error) {
        console.error('Error verifying owner:', error);
        return false;
    }
}

interface Owner {
    Name: string;
    Password: string;
    Phone_no: string;
    ID_proof: string;
}
