-- Add reset token fields to users table
ALTER TABLE users 
ADD COLUMN reset_token VARCHAR(255) NULL,
ADD COLUMN reset_token_expiry DATETIME NULL;

-- Add index for better performance
CREATE INDEX idx_reset_token ON users(reset_token);
CREATE INDEX idx_reset_token_expiry ON users(reset_token_expiry);
