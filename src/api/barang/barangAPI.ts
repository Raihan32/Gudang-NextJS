import axios from "axios";

export interface Barang {
  id: number;
  name: string;
  sizes: { size: string; stock: number }[];
}

export const getBarangList = async (): Promise<Barang[]> => {
  try {
    const response = await axios.get<Barang[]>("/api/barang");
    return response.data;
  } catch (error) {
    console.error("Error fetching barang list:", error);
    throw error;
  }
};

export const addBarang = async (barang: Barang): Promise<void> => {
  try {
    await axios.post("/api/barang", barang);
  } catch (error) {
    console.error("Error adding barang:", error);
    throw error;
  }
};

export const updateBarang = async (id: number, barang: Barang): Promise<void> => {
  try {
    await axios.put(`/api/barang/${id}`, barang);
  } catch (error) {
    console.error("Error updating barang:", error);
    throw error;
  }
};

export const deleteBarang = async (id: number): Promise<void> => {
  try {
    await axios.delete(`/api/barang/${id}`);
  } catch (error) {
    console.error("Error deleting barang:", error);
    throw error;
  }
};
