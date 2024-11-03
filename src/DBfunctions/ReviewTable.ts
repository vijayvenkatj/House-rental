import pg from 'pg';

const { Pool } = pg;
export const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
});

export async function CreateReviewTable() {
    try {
        await pool.query(` 
            CREATE TABLE IF NOT EXISTS Reviews (
                review_id SERIAL PRIMARY KEY,
                property_id INT NOT NULL,
                buyer_id INT NOT NULL,
                rating INT NOT NULL,
                review_text VARCHAR(200),
                FOREIGN KEY (property_id) REFERENCES Property(property_id),
                FOREIGN KEY (buyer_id) REFERENCES Buyer(buyer_id)
            );`);
    }
    catch (error) {
        console.error('Error creating table:', error);
        throw error;
    }
}

export async function AddReview(rating: number, review_text: string, property_id: number, buyer_id: number) {
    try {
        const res = await pool.query(`
            INSERT INTO Reviews (property_id, buyer_id, rating, review_text)
            VALUES ($1, $2, $3, $4);
        `, [
            property_id,
            buyer_id,
            rating,
            review_text,
        ]);
        return res;
    } catch (error) {
        console.error('Error adding review:', error);
        throw error;
    }
}

export async function AllReviews(propertyId: any) {
    try {
        const res = await pool.query(`SELECT * FROM Reviews WHERE property_id = $1;`, [propertyId]);
        return res.rows;
    }
    catch (error) {
        console.error('Error fetching reviews:', error);
        throw error;
    }
}