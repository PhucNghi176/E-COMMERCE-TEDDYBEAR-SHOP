import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import type { ReactNode } from 'react';

export type NextPageWithLayout = NextPage & {
  getLayout?: () => ReactNode;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export type ChildrenProps = {
  children: ReactNode;
};

export type IToken = {
  accessToken: string;
  refreshToken?: string;
};

export interface ApiResult<T> {
  value: T;
  isSuccess: boolean;
  isFailure: boolean;
  error: {
    code: string;
    message: string;
  };
}

export interface SearchParams {
  searchTerm: string;
  sortColumn?: string;
  sortOrder: string;
}
export interface PaginationParams {
  pageIndex: number;
  pageSize: number;
}
export interface SearchParamsPaginated extends SearchParams, PaginationParams { }
export interface PaginatedResponse<T> {
  items: T[];
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface CurrentUserProps {
  currentUser?: {
    createdAt: string;
    updatedAt: string;
    emailVerified: string | null;
    id: string;
    name: string | null;
    email: string | null;
    image: string | null;
    password: string | null;
    isAdmin: boolean;
  } | null;
}
export interface ILogin {
  email: string;
  password: string;
}

export interface Product {
  id: string;
  name: string;
  size?: string;
  quantity: number;
  price: number;
  color?: string[];
  primaryImageUrl?: string;
  imgUrl?: string[];
  tags?: ProductTag[];
  createdAt: string;
  updatedAt?: string;
  deletedAt?: string;
}

export interface ProductTag {
  id: string;
  name: string;
}
export interface Tag {
  id: string;
  name: string;
}
export interface ErrorResponse {
  title: string;
  status: number;
  detail: string;
  errors?: string[];
}
