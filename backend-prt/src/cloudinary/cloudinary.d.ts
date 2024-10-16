declare module 'cloudinary' {
    export interface CloudinaryConfig {
        cloud_name: string;
        api_key: string;
        api_secret: string;
    }

    export const config: (config: CloudinaryConfig) => void;

  
}
