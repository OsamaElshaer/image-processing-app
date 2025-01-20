CREATE TYPE image_status AS ENUM ('uploaded', 'processing', 'completed');

CREATE TABLE images (
    image_id SERIAL PRIMARY KEY,                
    user_id UUID NOT NULL,                      
    file_name VARCHAR(255) NOT NULL,            
    file_path VARCHAR(512) NOT NULL,           
    status image_status NOT NULL,               
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP   
);
