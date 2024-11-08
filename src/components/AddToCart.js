
import { baseURL } from '../URLs';
export const handleAddToCart = async (productId, quantity, authtoken) => {
    try {
      const response = await fetch(`${baseURL}/cart/addtocart/${productId}/${quantity}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authtoken': authtoken
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to add to cart');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error in adding to cart:', error);
      return { error: error.message };
    }
  };
  