import pg from 'pg';

const { Pool } = pg;
export const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
});


export async function FilterByLocation(location: string) {
    location = location.toLowerCase();
    try {
        const res = await pool.query(`SELECT * FROM Property WHERE LOWER(address) LIKE '%${location}%'`);
        return res.rows;
    }
    catch (error) {
        console.error('Error filtering by location:', error);
        throw error;
    }
}

export async function FilterByPrice(price: number) {
    try {
        const res = await pool.query(`SELECT * FROM Property WHERE rent <= ${price}`);
        return res.rows;
    }
    catch (error) {
        console.error('Error filtering by price:', error);
        throw error;
    }
}

export async function FilterByArea(area: number) {
    try {
        const res = await pool.query(`SELECT * FROM Property WHERE area >= ${area}`);
        return res.rows;
    }
    catch (error) {
        console.error('Error filtering by area:', error);
        throw error;
    }
}

export async function FilterByBhk(bhk: number) {
    try {
        const res = await pool.query(`SELECT * FROM Property WHERE bedrooms >= ${bhk}`);
        return res.rows;
    }
    catch (error) {
        console.error('Error filtering by bhk:', error);
        throw error;
    }
}

export async function FilterByName(name: string) {
    try{
        const res = await pool.query(`SELECT * FROM PROPERTY WHERE LOWER(property_name) LIKE '%${name.toLowerCase()}%'`);
        return res.rows;
    }
    catch(error){
        console.error('Error filtering by name:', error);
        throw error;
    }
}