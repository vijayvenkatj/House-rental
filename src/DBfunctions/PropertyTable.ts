import pg from 'pg';

const { Pool } = pg;
export const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
});


export async function CreatePropertyTable() {
    try {
        const res = await pool.query(`
            CREATE TABLE IF NOT EXISTS property (
                property_id SERIAL PRIMARY KEY,
                property_name VARCHAR(100) NOT NULL,
                address VARCHAR(100) NOT NULL,        
                rent INT NOT NULL,    
                area INT NOT NULL,                 
                bedrooms INT NOT NULL,             
                description VARCHAR(200),       
                image VARCHAR(200),
                owner_id INT,
                FOREIGN KEY (owner_id) REFERENCES owner(owner_id)               
            );
        `);
        return res;
    } catch (error) {
        console.error('Error creating table:', error);
        throw error;
    }
}


export async function AddProperty(property: Property) {
    try {
        const res = await pool.query(`
            INSERT INTO property (property_name, address, rent, area, bedrooms, description, image, owner_id)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
        `, [
            property.property_name,
            property.address,
            property.rent,
            property.area,
            property.bedrooms,
            property.description,
            property.image,
            property.owner_id
        ]);
        return res;
    } catch (error) {
        console.error('Error adding property:', error);
        throw error;
    }
}

export async function AllProperty() {
    try {
        const res = await pool.query(`
            SELECT * FROM property;
        `);
        return res.rows;
    } catch (error) {
        console.error('Error fetching properties:', error);
        throw error;
    }
}

export async function DeleteProperty(property_id: number) {
    try {
        const res = await pool.query(`
            DELETE FROM property WHERE property_id = $1;
        `, [property_id]);
        return res;
    } catch (error) {
        console.error('Error deleting property:', error);
        throw error;
    }
}

export async function FindProperty(search: string, value: string) {
    try {
        const res = await pool.query(`
            SELECT * FROM property WHERE ${search} = $1;
        `, [value]);
        return res.rows;
    } catch (error) {
        console.error('Error finding property:', error);
        throw error;
    }
}

export async function FindOwnerId(property_id: number) {
    try {
        const res = await pool.query(`
            SELECT owner_id FROM property WHERE property_id = $1;
        `, [property_id]);
        return res.rows;
    } catch (error) {
        console.error('Error finding owner:', error);
        throw error;
    }
}

interface Property {
    property_name: string;
    address: string;
    rent: number;
    area: number;
    bedrooms: number;
    description: string;
    image: string;
    owner_id: number;
}
