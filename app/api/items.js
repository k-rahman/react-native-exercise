import api from "./api";

const endpoint = "/items";

const getItems = params => api.get(endpoint, { params });

const getItemById = itemId => api.get(`${endpoint}/${itemId}`);

const getUserItems = () => api.get(`${endpoint}/me`);

const addItem = (item, onUploadProgress) => {
  const data = new FormData();

  data.append("title", item.title);
  data.append("description", item.description);
  data.append("price", item.price);
  data.append("country", item.country);
  data.append("city", item.city);
  data.append("categoryId", item.category.id);
  data.append("deliveryTypeId", item.deliveryType.id);

  item.images.forEach(image => {
    const imageType = image.split(".");

    data.append("images", {
      uri: image,
      type: `image/${imageType[imageType.length - 1]}`,
      name: image,
    });
  });

  return api.post(endpoint, data, {
    onUploadProgress: progress =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

const editItem = (item, itemId, onUploadProgress) => {
  const data = new FormData();

  data.append("title", item.title);
  data.append("description", item.description);
  data.append("price", item.price);
  data.append("country", item.country);
  data.append("city", item.city);
  data.append("categoryId", item.category.id);
  data.append("deliveryTypeId", item.deliveryType.id);

  item.images.forEach(image => {
    const imageType = image.split(".");

    data.append("images", {
      uri: image,
      type: `image/${imageType[imageType.length - 1]}`,
      name: `kirpputori.${imageType[imageType.length - 1]}`,
    });
  });

  return api.put(`${endpoint}/${itemId}`, data, {
    onUploadProgress: progress =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

const deleteItem = itemId => api.delete(`${endpoint}/${itemId}`);

export default {
  getItems,
  getItemById,
  getUserItems,
  addItem,
  editItem,
  deleteItem,
};
