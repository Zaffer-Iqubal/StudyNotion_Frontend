import toast from 'react-hot-toast';
import { catalogEndpoint } from '../apis';
import { apiConnector } from '../apiConector';

const { CATALOG_DATA_API } = catalogEndpoint;

export const getCatalogPageData = async(categoryId) => {
    const toastId = toast.loading('Loading...')
    let result = [];

    try {
        const response = await apiConnector("POST", CATALOG_DATA_API, {
            categoryId: categoryId
        })
        
        if(!response.data.success){
            throw new Error(response.data.message);
        }

        result = response?.data;

    } catch (error) {
        toast.error(error.message);
        result = error.response?.data;
    }
    toast.dismiss(toastId);
    return result;
}