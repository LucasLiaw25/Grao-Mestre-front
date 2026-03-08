export enum TimeRange {
    FIFTEEN_MINUTES = "15 minutos",
    THIRTY_MINUTES = "30 minutos",
    ONE_HOUR = "1 hora",
    TWO_HOURS = "2 horas",
}

export enum TimePeriod {
    TODAY = "Hoje",
    YESTERDAY = "Ontem",
    THIS_WEEK = "Esta Semana",
    LAST_WEEK = "Semana Passada",
    THIS_MONTH = "Este Mês",
    LAST_MONTH = "Mês Passado",
    CUSTOM = "Personalizado",
}

export enum PaymentStatus {
    PENDING = "PENDING",
    COMPLETE = "COMPLETE",
    FAILED = "FAILED",
    CANCELED = "CANCELED",
    PAID = "PAID",
}

export enum PaymentMethod {
    PIX = "PIX",
    CREDIT_CARD = "CREDIT_CARD",
    DEBIT_CARD = "DEBIT_CARD",
}

export enum OrderStatus {
    PENDING = "PENDING",
    COMPLETED = "COMPLETED",
    CANCELED = "CANCELED",
    PAID = "PAID",
    PROCESSING = "PROCESSING",
    SENDED = "SENDED",
    RECUSE = "RECUSE",
}

// --- DTOs de Resposta (Response DTOs) ---

export interface ScopeResponseDTO {
    id: number;
    name: string;
    description: string;
}

export interface UserResponseDTO {
    id: number;
    email: string;
    name: string;
    phone: string;
    registerDate: string; // LocalDateTime no Java -> string ISO 8601 no TypeScript
    active: boolean;
    scopes: ScopeResponseDTO[];
}

export interface AuthResponseDTO {
    token: string; // Corresponde ao 'token' do seu AuthResponseDTO.java
    user: UserResponseDTO; // Corresponde ao 'user' do seu AuthResponseDTO.java
}

export interface CategoryResponseDTO {
    id: number;
    name: string;
    description: string;
}

export interface ProductResponseDTO {
    id: number;
    name: string;
    description: string;
    storage: number;
    imageUrl: string;
    registerDate: string; // LocalDateTime no Java -> string ISO 8601 no TypeScript
    price: number; // BigDecimal no Java -> number no TypeScript
    active: boolean;
    category: CategoryResponseDTO;
}

export interface OrderItemResponseDTO {
    id: number;
    productId: number;
    productName: string;
    quantity: number;
    priceAtTime: number; // BigDecimal no Java -> number no TypeScript
    subtotal: number; // BigDecimal no Java -> number no TypeScript
}

export interface PaymentResponseDTO {
    id: number;
    orderId: number;
    paymentMethod: PaymentMethod;
    paymentStatus: PaymentStatus;
    txId: string;
    totalPrice: number; // BigDecimal no Java -> number no TypeScript
}

export interface OrderResponseDTO {
    id: number;
    userId: number;
    userEmail: string;
    items: OrderItemResponseDTO[];
    orderStatus: OrderStatus;
    paymentMethod: PaymentMethod;
    payment: PaymentResponseDTO;
    orderDate: string; // LocalDateTime no Java -> string ISO 8601 no TypeScript
    totalPrice: number; // BigDecimal no Java -> number no TypeScript
}

export interface AddressResponseDTO {
    id: number;
    street: string;
    number: string;
    complement: string;
    state: string;
    city: string;
    cep: string;
    isDefault: boolean;
    userId: number;
}

// --- DTOs de Requisição (Request DTOs) ---

export interface UserLoginRequestDTO {
    email: string;
    password: string;
}

export interface ScopeRequestDTO{
    name: string;
    description: string;
}

export interface UserRegisterRequestDTO {
    email: string;
    name: string;
    phone: string;
    password: string;
}

export interface UserRequestDTO { // Para atualização de usuário
    email: string;
    name: string;
    phone: string;
    password?: string; // Senha pode ser opcional na atualização, dependendo da lógica
    active?: boolean;
    scopeIds?: number[];
}

export interface CategoryRequestDTO {
    name: string;
    description?: string;
}

export interface ProductRequestDTO {
    name: string;
    description: string;
    storage: number;
    price: number; // BigDecimal no Java -> number no TypeScript
    active: boolean;
    categoryId: number; // Assumindo que o backend espera o ID da categoria
    // imageUrl não está aqui, pois é enviado como MultipartFile
}

export interface OrderItemRequestDTO {
    productId: number;
    quantity: number;
}

export interface OrderRequestDTO {
    paymentMethod: PaymentMethod;
    items: OrderItemRequestDTO[];
}

export interface AddressRequestDTO {
    street: string;
    number: string;
    complement?: string;
    state: string;
    city: string;
    cep: string;
    isDefault?: boolean;
    userId: number;
}
