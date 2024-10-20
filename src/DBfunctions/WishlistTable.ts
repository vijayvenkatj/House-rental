import pg from 'pg';

const { Pool } = pg;
export const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
});

export async function CreateWishlistTable(){
    try{
        const res = await pool.query(`
            CREATE TABLE IF NOT EXISTS Wishlist (
                Wishlist_ID SERIAL PRIMARY KEY,
                Buyer_ID INT,
                Property_ID INT,
                FOREIGN KEY (Buyer_ID) REFERENCES Buyer(Buyer_ID),
                FOREIGN KEY (Property_ID) REFERENCES Property(Property_ID)
            );
        `);
        return res;
    }
    catch(error){
        console.error('Error creating table:', error);
        throw error;
    }
}

export async function AddWishlist(Wishlist: Wishlist){
    let res
    try{
        res = await pool.query(`
            INSERT INTO Wishlist (Buyer_ID, Property_ID)
            VALUES (${Wishlist.buyer_id}, ${Wishlist.property_id});
        `);
        return res 
    }
    catch(error){
        console.error('Error adding Wishlist:', error);
        console.log(Wishlist)
        throw error;
    }
}

export async function DeleteWishlist(Wishlist_ID: number){
    try{
        const res = await pool.query(`
            DELETE FROM Wishlist WHERE Wishlist_ID = ${Wishlist_ID};
        `);
        return res;
    }
    catch(error){
        console.error('Error deleting Wishlist:', error);
        throw error;
    }
}

export async function AllWishlist(){
    try{
        const res = await pool.query(`
            SELECT * FROM Wishlist;
        `);
        return res.rows;
    }
    catch(error){
        console.error('Error getting all Wishlist:', error);
        throw error;
    }
}



interface Wishlist {
    buyer_id: number;
    property_id: number;
}
