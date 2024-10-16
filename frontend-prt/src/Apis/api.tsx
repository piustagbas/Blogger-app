



import axios from 'axios';

const apiURL = 'http://localhost:3001';

export const getBlogs = (cat: string | null | undefined) => {
    if (!cat) {
        cat = 'all'; // Default category
    }
    return axios.get(`${apiURL}/blog/${cat}`)
        .then(result => result.data)
        .catch(error => {
            console.error("Error fetching blogs:", error);
            throw error; // Rethrow for further handling
        });
};


export const createBlog = async (formData: FormData) => {
    try {
        const response = await axios.post(`${apiURL}/blog`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data; // Return created blog data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error creating blog:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
            });
        } else {
            console.error('Unexpected error:', error);
        }
        throw error; // Rethrow error for further handling
    }
};



export const getBlogbyid = async (id: string) => {
    try {
      const response = await axios.get(`http://localhost:3001/blog/${id}`);
      return response;
    } catch (error) {
      console.error('Error fetching blog by id:', error);
      throw error;
    }
  };

export const uploadFile = (file: File) => {
    const formData = new FormData();
    formData.append('file', file); // file should be a File object

    return axios.post(`${apiURL}/blogimage`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    }).then(result => result.data)
    .catch(error => {
        console.error("Error uploading file:", error);
        throw error; // Rethrow error for further handling
    }); 
};
