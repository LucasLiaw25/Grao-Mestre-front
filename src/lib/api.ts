import axios from "axios";
import type {
    UserResponseDTO, UserRequestDTO, UserRegisterRequestDTO, UserLoginRequestDTO,
    AuthResponseDTO,
    CategoryResponseDTO, CategoryRequestDTO,
    ProductResponseDTO, ProductRequestDTO,
    OrderResponseDTO, OrderRequestDTO,
    AddressResponseDTO, AddressRequestDTO,
    ScopeResponseDTO, ScopeRequestDTO,
    OrderStatus, PaymentStatus, TimePeriod, TimeRange,
    OrderItemRequestDTO,
} from "@/types";

const API_BASE_URL = 'http://localhost:8081/api';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("grao_token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
            console.warn("Requisição não autorizada ou proibida. Verifique as permissões ou o token.");
        }
        return Promise.reject(error);
    }
);

export const authApi = {
    validate: () => apiClient.get<UserResponseDTO>("/users/validate"),
};

export const usersApi = {
    getAll: () => apiClient.get<UserResponseDTO[]>("/users"),
    getById: (id: number) => apiClient.get<UserResponseDTO>(`/users/${id}`),
    create: (data: UserRequestDTO) => apiClient.post<UserResponseDTO>("/users", data),
    update: (id: number, data: UserRequestDTO) => apiClient.put<UserResponseDTO>(`/users/${id}`, data),
    updatePassword: (id: number, newPassword: string) => apiClient.put<UserResponseDTO>(`/users/${id}/password`, { newPassword }),
    updateScopes: (id: number, scopeIds: number[]) => apiClient.put<UserResponseDTO>(`/users/${id}/scopes`, scopeIds),
    delete: (id: number) => apiClient.delete<void>(`/users/${id}`),
    activate: (token: string) => apiClient.get<UserResponseDTO>(`/users/activate?token=${token}`),
};

export const productsApi = {
    getAll: () => apiClient.get<ProductResponseDTO[]>("/products"),
    getById: (id: number) => apiClient.get<ProductResponseDTO>(`/products/${id}`),
    getByCategory: (categoryId: number) => apiClient.get<ProductResponseDTO[]>(`/products/category/${categoryId}`),
    getByPriceRange: (minPrice: number, maxPrice: number) => apiClient.get<ProductResponseDTO[]>(`/products/price-range`, { params: { minPrice, maxPrice } }),
    search: (searchTerm: string) => apiClient.get<ProductResponseDTO[]>(`/products/search`, { params: { searchTerm } }),
    create: (product: ProductRequestDTO, imageFile?: File) => {
        const formData = new FormData();
        formData.append("product", new Blob([JSON.stringify(product)], { type: "application/json" }));
        if (imageFile) {
            formData.append("image", imageFile);
        }
        return apiClient.post<ProductResponseDTO>("/products", formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    },
    update: (id: number, product: ProductRequestDTO, imageFile?: File) => {
        const formData = new FormData();
        formData.append("product", new Blob([JSON.stringify(product)], { type: "application/json" }));
        if (imageFile) {
            formData.append("image", imageFile);
        }
        return apiClient.put<ProductResponseDTO>(`/products/${id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    },
    deactivate: (id: number) => apiClient.put<ProductResponseDTO>(`/products/${id}/deactivate`),
    activate: (id: number) => apiClient.put<ProductResponseDTO>(`/products/${id}/activate`),
};

export const categoriesApi = {
    getAll: () => apiClient.get<CategoryResponseDTO[]>("/categories"),
    getById: (id: number) => apiClient.get<CategoryResponseDTO>(`/categories/${id}`),
    create: (data: CategoryRequestDTO) => apiClient.post<CategoryResponseDTO>("/categories", data),
    update: (id: number, data: CategoryRequestDTO) => apiClient.put<CategoryResponseDTO>(`/categories/${id}`, data),
    delete: (id: number) => apiClient.delete<void>(`/categories/${id}`),
};

export const ordersApi = {
    create: (data: OrderRequestDTO) => apiClient.post<OrderResponseDTO>("/orders", data),
    getMyOrderHistory: () => apiClient.get<OrderResponseDTO[]>("/orders/my"),
    getMyOrderDetails: (orderId: number) => apiClient.get<OrderResponseDTO>(`/orders/my/${orderId}`),
    getMyOrdersByStatus: (status: OrderStatus) => apiClient.get<OrderResponseDTO[]>(`/orders/my/status/${status}`),
    getAll: (pageable?: { page?: number; size?: number; sort?: string }) => apiClient.get<any>("/orders", { params: pageable }),
    filter: (params: { status?: OrderStatus; startDate?: string; endDate?: string; userId?: number; page?: number; size?: number; sort?: string }) => apiClient.get<any>("/orders/filter", { params }),
    getOrderDetailsForAdmin: (orderId: number) => apiClient.get<OrderResponseDTO>(`/orders/${orderId}`),
    updateOrderStatus: (orderId: number, newStatus: OrderStatus) => apiClient.put<OrderResponseDTO>(`/orders/${orderId}/status`, null, { params: { newStatus } }),
    // Métodos para gerenciamento de itens no pedido (carrinho)
    addItemToOrder: (orderId: number, item: OrderItemRequestDTO) => apiClient.post<OrderResponseDTO>(`/orders/${orderId}/items`, item),
    removeItemFromOrder: (orderId: number, orderItemId: number) => apiClient.delete<OrderResponseDTO>(`/orders/${orderId}/items/${orderItemId}`),
    updateOrderItemQuantity: (orderId: number, orderItemId: number, quantity: number) => apiClient.put<OrderResponseDTO>(`/orders/${orderId}/items/${orderItemId}/quantity`, null, { params: { quantity } }),
};

export const addressesApi = {
    getAll: () => apiClient.get<AddressResponseDTO[]>("/addresses"),
    getById: (id: number) => apiClient.get<AddressResponseDTO>(`/addresses/${id}`),
    getByUserId: (userId: number) => apiClient.get<AddressResponseDTO[]>(`/addresses/user/${userId}`),
    create: (data: AddressRequestDTO) => apiClient.post<AddressResponseDTO>("/addresses", data),
    update: (id: number, data: AddressRequestDTO) => apiClient.put<AddressResponseDTO>(`/addresses/${id}`, data),
    delete: (id: number) => apiClient.delete<void>(`/addresses/${id}`),
};

export const scopesApi = {
    getAll: () => apiClient.get<ScopeResponseDTO[]>("/scopes"),
    getById: (id: number) => apiClient.get<ScopeResponseDTO>(`/scopes/${id}`),
    create: (data: ScopeRequestDTO) => apiClient.post<ScopeResponseDTO>("/scopes", data),
    update: (id: number, data: ScopeRequestDTO) => apiClient.put<ScopeResponseDTO>(`/scopes/${id}`, data),
    delete: (id: number) => apiClient.delete<void>(`/scopes/${id}`),
};

export default apiClient;
