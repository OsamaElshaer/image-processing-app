CREATE TYPE image_status AS ENUM ('failed', 'processing', 'completed');

CREATE TABLE images (
    image_id SERIAL PRIMARY KEY,                
    user_id UUID NOT NULL,
    image_hash VARCHAR(64) UNIQUE,                      
    file_name VARCHAR(255) NOT NULL,            
    file_path VARCHAR(512) NOT NULL, 
    processed_path VARCHAR(512),         
    status image_status NOT NULL,               
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP   
);
